import { Service } from '@deepseek-ai/cordis'
import { createUserMessage } from '@deepseek-ai/dsh-llm'
import { Remote, TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol'
import { randomUUID } from 'node:crypto'
import {
  LIMITS,
  MemoStore,
  cleanMemo,
  resolveDirectory,
} from './store.js'
import {
  STARTERS,
  detectIntent,
  exportText,
  formatDue,
  memoText,
  parseDue,
  parseMemo,
  petLines,
  sortMemos,
  splitTitle,
  statsFor,
  suggestionsFor,
} from './pet.js'
import { createMemoTool } from './tools.js'
import { SERVICE } from './typert.js'

let markRequest

const CHAT_TIMEOUT_MS = 120_000
const MAX_TEXT = 4000

function publicError(error, fallback = '备忘精灵没能完成这件事。') {
  const code = typeof error?.code === 'string' ? error.code : 'unavailable'
  const message = typeof error?.message === 'string' && error.message.trim() ? error.message : fallback
  return { code, message }
}

function fail(code, message) {
  return Object.assign(new Error(message), { code })
}

const PET_GUIDE = `# 备忘精灵 · 阿墨
你在用户桌面右下角的「备忘精灵」悬浮窗里，是宠物阿墨的对话侧。窗口很窄，用户读你的话只要一眼。
- 用中文。短。一般 1-3 句，最多 6 行。不用标题、代码块、表格。
- 只做三件事：把用户的话变成备忘、整理现有备忘、给一条具体可执行的建议。
- 记新备忘用 memo_pet(op='add')，把用户的整句原话传进去，日期和 #标签 会被自动解析。记完回一句「记下了」即可，不要复述一遍。
- 问「今天做什么」「接下来干嘛」时先用 memo_pet(op='list')，再按时间给 1-3 条建议，每条一行。
- 需要拍板时给 2-3 个很短的选项，不要长篇解释。
- 不确定的直接说不确定，不要编。`

export default class MemoPet extends TypertRemoteService {
  static inject = ['sessions', 'agents', 'agentDefaultModel']

  constructor(ctx, config) {
    super(ctx, SERVICE)
    markRequest.call(this)
    this.directory = resolveDirectory(config)
    this.store = new MemoStore(this.directory)
    this.tool = createMemoTool(this)
    this.chat = null
    this.lastOrder = []
  }

  async [Service.init]() {
    await this.store.load()
    this.installTools()
    this.installPrompt()
  }

  /* -------------------------------------------------------------- agents */

  /** The tool lives on every agent, so "记一下" works in ordinary chats too. */
  installTools() {
    const root = this.ctx
    if (!root?.inject) return
    const register = agent => {
      const tools = agent?.ctx?.tools
      if (!tools?.register) return
      try {
        if (tools.get?.(this.tool.name, agent)) return
        tools.register(this.tool)
      } catch (error) {
        this.ctx.logger?.warn?.('memo-pet: tool mount failed (%s)', error?.message ?? error)
      }
    }
    root.effect(() => {
      const scope = root.inject(['tools', 'agents'], inner => {
        for (const agent of inner.agents.list()) register(agent)
        inner.on('agent/created', ({ agent }) => register(agent))
      })
      return () => scope.dispose()
    }, 'memo-pet: tools')
  }

  installPrompt() {
    const root = this.ctx
    if (!root?.inject) return
    root.effect(() => {
      const scope = root.inject(['systemPrompt'], inner => {
        inner.systemPrompt.context({
          name: 'memo-pet:routing',
          order: 232,
          interpolate: false,
          text: () => '用户说「记一下」「备忘」「提醒我」「别忘了」或让你整理他的备忘时，调用 `memo_pet` 工具（不必先问）。查看看用 op=list，新增用 op=add 并把用户原话传进 text；日期和 #标签 会自动解析。',
        })
      })
      return () => scope.dispose()
    }, 'memo-pet: prompt')
  }

  /* --------------------------------------------------------------- state */

  async snapshot(extra = {}) {
    const state = this.store.state
    const memos = sortMemos(state.memos)
    const now = Date.now()
    this.lastOrder = memos.map(memo => memo.id)
    return {
      now,
      pet: state.pet,
      memos,
      stats: statsFor(memos, now),
      suggestions: suggestionsFor(memos, now),
      lines: petLines(memos, now),
      starters: STARTERS,
      chat: {
        sessionId: state.chat.sessionId,
        turns: state.chat.turns,
        running: this.chat?.running === true,
      },
      directory: this.directory,
      ...extra,
    }
  }

  async persist() {
    await this.store.update(() => {})
  }

  async addMemo(input, now = Date.now()) {
    const text = String(input?.text ?? input?.title ?? '').trim().slice(0, MAX_TEXT)
    if (!text) throw fail('empty', '先说一句要记什么。')
    const parsed = parseMemo(text, now)
    if (!parsed) throw fail('empty', '这句话里没有可记的内容。')
    const title = input?.title ? String(input.title).slice(0, LIMITS.title) : parsed.title
    const tags = Array.isArray(input?.tags) && input.tags.length ? input.tags : parsed.tags
    const existing = this.store.state.memos.find(memo => !memo.done && memo.title === title)
    if (existing) {
      return { duplicate: true, memo: existing, memos: sortMemos(this.store.state.memos) }
    }
    const memo = cleanMemo({
      id: `m_${now.toString(36)}_${randomUUID().slice(0, 6)}`,
      title,
      body: parsed.body,
      tags,
      dueAt: input?.dueAt === null ? null : (Number.isFinite(input?.dueAt) ? input.dueAt : parsed.dueAt),
      source: input?.source === 'tool' ? 'tool' : 'pet',
      createdAt: now,
      updatedAt: now,
    }, now)
    if (!memo) throw fail('empty', '这句话里没有可记的内容。')
    await this.store.update(state => {
      state.memos.unshift(memo)
      if (state.memos.length > LIMITS.memos) state.memos.length = LIMITS.memos
    })
    return { duplicate: false, memo, memos: sortMemos(this.store.state.memos) }
  }

  resolveRef(ref) {
    const raw = String(ref ?? '').trim()
    if (!raw) return null
    const direct = this.store.state.memos.find(memo => memo.id === raw)
    if (direct) return direct
    const index = Number(raw)
    if (Number.isInteger(index) && index >= 1) {
      const ordered = sortMemos(this.store.state.memos)
      return ordered[index - 1] ?? null
    }
    return null
  }

  async mutate(ref, patch) {
    const memo = this.resolveRef(ref)
    if (!memo) throw fail('not-found', '找不到这条备忘，可能已经删了。')
    await this.store.update(state => {
      const target = state.memos.find(item => item.id === memo.id)
      if (!target) return
      if (typeof patch.title === 'string' && patch.title.trim()) target.title = patch.title.trim().slice(0, LIMITS.title)
      if (typeof patch.body === 'string') target.body = patch.body.slice(0, LIMITS.body)
      if (Array.isArray(patch.tags)) target.tags = cleanMemo({ ...target, tags: patch.tags }).tags
      if (typeof patch.done === 'boolean') target.done = patch.done
      if (typeof patch.pinned === 'boolean') target.pinned = patch.pinned
      if ('dueAt' in patch) target.dueAt = Number.isFinite(patch.dueAt) ? patch.dueAt : null
      target.updatedAt = Date.now()
    })
    return this.store.state.memos.find(item => item.id === memo.id) ?? memo
  }

  async removeMemo(ref) {
    const memo = this.resolveRef(ref)
    if (!memo) throw fail('not-found', '找不到这条备忘。')
    await this.store.update(state => {
      state.memos = state.memos.filter(item => item.id !== memo.id)
    })
    return memo
  }

  /* ------------------------------------------------------------ pet chat */

  selection() {
    const active = this.ctx?.agentDefaultModel?.currentSelection?.() ?? {}
    return { provider: active.provider, model: active.model }
  }

  async ensureChat(signal) {
    if (this.chat?.agent) return this.chat
    const { provider, model } = this.selection()
    if (!provider || !model) {
      throw fail('no-model', '还没有可用的对话模型。打开「设置 → 模型」选一个默认模型，阿墨就能答话了（只记录不答话也可以照常用）。')
    }
    const guide = () => {
      const memos = sortMemos(this.store.state.memos).filter(memo => !memo.done).slice(0, 12)
      const digest = memos.length
        ? memos.map((memo, index) => `${index + 1}. ${memoText(memo)}`).join('\n')
        : '（没有未完成的备忘）'
      return `${PET_GUIDE}\n\n## 当前的备忘\n${digest}`
    }
    const setup = agentCtx => {
      try { agentCtx.tools?.register(this.tool) } catch {}
      try {
        agentCtx.systemPrompt?.context?.({
          name: 'memo-pet:panel',
          order: 206,
          interpolate: false,
          text: guide,
        })
      } catch {}
    }
    const previous = this.store.state.chat.sessionId
    let handle
    if (previous) {
      try {
        handle = await this.ctx.agents.resume({ resumeSessionId: previous, agentOptions: { provider, model }, setup })
      } catch (error) {
        this.ctx.logger?.warn?.('memo-pet: resume failed (%s)', error?.message ?? error)
        handle = null
      }
    }
    if (!handle) {
      const sessionId = `session-${randomUUID()}`
      handle = await this.ctx.agents.create({
        sessionId,
        meta: { cwd: this.directory, origin: 'subagent' },
        agentOptions: { provider, model },
        setup,
        signal,
      })
      await this.store.update(state => {
        state.chat = { sessionId: handle.agent?.session?.id ?? sessionId, turns: 0, updatedAt: Date.now() }
      })
    }
    this.chat = { agent: handle.agent, handle, running: false }
    return this.chat
  }

  async send(message, signal) {
    const text = String(message ?? '').trim().slice(0, 2000)
    if (!text) throw fail('empty', '先说一句。')
    const chat = await this.ensureChat(signal)
    if (chat.running) throw fail('chat-busy', '上一句还在想，等它回完再发。')
    const cursor = chat.agent.session.snapshotEvents().length
    chat.running = true
    const started = Date.now()
    try {
      await chat.agent.runMaintenance(async activity => {
        activity.throwIfAborted()
        chat.agent.followup(createUserMessage({
          content: [{ type: 'text', text }],
          source: { kind: 'user' },
        }))
        if (!(await this.ctx.sessions.flush(chat.agent.session))) throw new Error('这一轮没有写进会话。')
      })
    } catch (error) {
      chat.running = false
      throw error
    }
    chat.agent.whenIdle()
      .catch(() => {})
      .finally(() => { chat.running = false })
    const timeout = setTimeout(() => {
      try { chat.agent.cancel?.({ kind: 'user' }) } catch {}
    }, CHAT_TIMEOUT_MS)
    timeout.unref?.()
    chat.agent.whenIdle().catch(() => {}).finally(() => clearTimeout(timeout))
    await this.store.update(state => {
      state.chat.turns += 1
      state.chat.updatedAt = Date.now()
    })
    return { cursor, sessionId: this.store.state.chat.sessionId, running: true, startedAt: started }
  }

  summarize(events) {
    const messages = []
    let error = ''
    for (const event of events) {
      const data = event?.data ?? {}
      if (event?.type === 'user/message' && data.source?.kind === 'user') {
        const text = (data.content ?? []).filter(block => block.type === 'text').map(block => block.text).join('\n').trim()
        if (text) messages.push({ role: 'user', text })
      } else if (event?.type === 'assistant/message') {
        const text = (data.message?.content ?? []).filter(block => block.type === 'text').map(block => block.text).join('\n').trim()
        if (text) messages.push({ role: 'assistant', text })
      } else if (event?.type === 'turn/end' && data.reason?.kind === 'error') {
        error = String(data.reason.error?.message ?? '这一轮出错了。')
      }
    }
    return { messages, error }
  }

  poll(cursor, signal) {
    const chat = this.chat
    if (!chat?.agent) {
      return { messages: [], running: false, cursor: 0, error: '', cold: true }
    }
    const events = chat.agent.session.snapshotEvents()
    const from = Number.isInteger(cursor) && cursor >= 0 && cursor <= events.length ? cursor : 0
    const summary = this.summarize(events.slice(from))
    return {
      messages: summary.messages,
      error: summary.error,
      cursor: events.length,
      running: chat.running,
      cold: false,
      sessionId: this.store.state.chat.sessionId,
    }
  }

  async resetChat() {
    const chat = this.chat
    this.chat = null
    try { await chat?.handle?.dispose?.() } catch {}
    await this.store.update(state => {
      state.chat = { sessionId: '', turns: 0, updatedAt: Date.now() }
    })
    return this.snapshot()
  }

  /* -------------------------------------------------------- tool backend */

  async runTool(args) {
    const op = String(args?.op ?? 'list')
    if (op === 'list') {
      const query = String(args?.query ?? '').trim().toLowerCase()
      let memos = sortMemos(this.store.state.memos)
      if (typeof args?.done === 'boolean') memos = memos.filter(memo => memo.done === args.done)
      if (query) memos = memos.filter(memo => `${memo.title} ${memo.body} ${memo.tags.join(' ')}`.toLowerCase().includes(query))
      if (!memos.length) return '清单里还没有符合条件的备忘。'
      return memos.slice(0, 40).map((memo, index) => {
        const mark = memo.done ? '[x]' : '[ ]'
        const due = memo.dueAt ? ` · ${formatDue(memo.dueAt)}` : ''
        const tags = memo.tags.length ? ` · ${memo.tags.map(tag => `#${tag}`).join(' ')}` : ''
        const pin = memo.pinned ? ' · 钉住' : ''
        return `${index + 1}. ${mark} ${memo.title}${due}${tags}${pin}\n   id: ${memo.id}`
      }).join('\n')
    }
    if (op === 'add') {
      const text = String(args?.text ?? args?.title ?? '').trim()
      const result = await this.addMemo({
        text,
        tags: args?.tags,
        dueAt: args?.due ? parseDue(String(args.due)) : undefined,
        source: 'tool',
      })
      if (result.duplicate) return `这条已经在清单里了：「${result.memo.title}」。`
      const due = result.memo.dueAt ? `，${formatDue(result.memo.dueAt)}` : ''
      const tags = result.memo.tags.length ? `，${result.memo.tags.map(tag => `#${tag}`).join(' ')}` : ''
      return `记下了：「${result.memo.title}」${due}${tags}。`
    }
    if (op === 'export') {
      return exportText(this.store.state.memos)
    }
    if (op === 'done' || op === 'reopen') {
      const memo = await this.mutate(args?.id ?? args?.text, { done: op === 'done' })
      return op === 'done' ? `「${memo.title}」标成做完了。` : `「${memo.title}」放回清单了。`
    }
    if (op === 'remove') {
      const memo = await this.removeMemo(args?.id ?? args?.text)
      return `删掉了「${memo.title}」。`
    }
    if (op === 'update') {
      const patch = {}
      if (args?.title) patch.title = String(args.title)
      if (Array.isArray(args?.tags)) patch.tags = args.tags
      if ('due' in (args ?? {})) patch.dueAt = args.due ? parseDue(String(args.due)) : null
      const memo = await this.mutate(args?.id ?? args?.text, patch)
      return `改好了：「${memo.title}」${memo.dueAt ? ` · ${formatDue(memo.dueAt)}` : ''}。`
    }
    throw fail('bad-op', `不认识的 op：${op}`)
  }

  /* -------------------------------------------------------------- remote */

  async request(input, signal) {
    const op = String(input?.op ?? 'bootstrap')
    try {
      signal?.throwIfAborted?.()
      if (op === 'bootstrap') return await this.bootstrap()
      if (op === 'memo/add') return await this.onAdd(input)
      if (op === 'memo/toggle') {
        const memo = this.resolveRef(input?.id)
        if (!memo) throw fail('not-found', '找不到这条备忘。')
        await this.mutate(memo.id, { done: !memo.done })
        return this.snapshot()
      }
      if (op === 'memo/update') {
        await this.mutate(input?.id, input?.patch ?? {})
        return this.snapshot()
      }
      if (op === 'memo/remove') {
        await this.removeMemo(input?.id)
        return this.snapshot()
      }
      if (op === 'memo/clear-done') {
        await this.store.update(state => {
          state.memos = state.memos.filter(memo => !memo.done)
        })
        return this.snapshot()
      }
      if (op === 'memo/export') {
        const ids = Array.isArray(input?.ids) ? input.ids : []
        const memos = ids.length
          ? this.store.state.memos.filter(memo => ids.includes(memo.id))
          : this.store.state.memos
        return { text: exportText(memos.length ? memos : this.store.state.memos) }
      }
      if (op === 'suggestions') {
        const memos = sortMemos(this.store.state.memos)
        return { suggestions: suggestionsFor(memos), lines: petLines(memos), stats: statsFor(memos) }
      }
      if (op === 'pet/update') {
        const patch = input?.patch ?? {}
        await this.store.update(state => {
          if (typeof patch.name === 'string' && patch.name.trim()) state.pet.name = patch.name.trim().slice(0, 24)
          if (patch.position && Number.isFinite(patch.position.x) && Number.isFinite(patch.position.y)) {
            state.pet.position = { x: Math.round(patch.position.x), y: Math.round(patch.position.y) }
          }
          if (patch.edge === 'left' || patch.edge === 'right') state.pet.edge = patch.edge
          if (typeof patch.quiet === 'boolean') state.pet.quiet = patch.quiet
          if (typeof patch.collapsed === 'boolean') state.pet.collapsed = patch.collapsed
          if (patch.touch) state.pet.seenAt = Date.now()
        })
        return { pet: this.store.state.pet }
      }
      if (op === 'say') {
        const text = String(input?.text ?? '').trim().slice(0, 2000)
        if (!text) throw fail('empty', '先说一句。')
        if (detectIntent(text) === 'memo') return { kind: 'memo', ...(await this.onAdd({ text })) }
        return { kind: 'ask', ...(await this.send(text, signal)) }
      }
      if (op === 'memo/clear-all') {
        await this.store.update(state => { state.memos = [] })
        await this.resetChat()
        return await this.bootstrap()
      }
      if (op === 'chat/send') return await this.send(input?.message, signal)
      if (op === 'chat/poll') return this.poll(Number(input?.cursor), signal)
      if (op === 'chat/reset') return await this.resetChat()
      throw fail('bad-op', `不认识的 op：${op}`)
    } catch (error) {
      if (error?.name === 'AbortError' || signal?.aborted) throw error
      this.ctx.logger?.warn?.('memo-pet: %s failed (%s)', op, error?.message ?? error)
      throw Object.assign(new Error(publicError(error).message), { code: publicError(error).code })
    }
  }

  async bootstrap() {
    const payload = await this.snapshot()
    const selection = this.selection()
    return {
      ...payload,
      model: selection.model ? selection.model : '',
      hasModel: Boolean(selection.provider && selection.model),
    }
  }

  /**
   * The fast path: a memo intent never waits for a model. The reply is the
   * pet's own line, so recording something feels instant even offline.
   */
  async onAdd(input) {
    const now = Date.now()
    const raw = String(input?.text ?? '').trim()
    if (!raw) throw fail('empty', '先说一句要记什么。')
    const parsed = parseMemo(raw, now)
    if (!parsed) throw fail('empty', '这句话里没有可记的内容。')
    const result = await this.addMemo({ text: raw, dueAt: input?.dueAt ?? undefined }, now)
    const memos = sortMemos(this.store.state.memos)
    const stats = statsFor(memos, now)
    const intent = detectIntent(raw)
    const reply = result.duplicate
      ? '这条我记过了，还在清单里。'
      : parsed.dueAt
        ? `记下了，${formatDue(parsed.dueAt, now)} 我会叫你。`
        : stats.open === 1
          ? '第一条，记下了。'
          : `记下了。现在 ${stats.open} 条。`
    return {
      memo: result.memo,
      duplicate: result.duplicate,
      intent,
      reply,
      memos,
      stats,
      suggestions: suggestionsFor(memos, now),
      lines: petLines(memos, now),
      now,
    }
  }

  async dispose() {
    try { await this.chat?.handle?.dispose?.() } catch {}
    this.chat = null
  }
}

Remote(MemoPet.prototype.request, {
  name: 'request',
  private: false,
  static: false,
  addInitializer(initializer) {
    markRequest = initializer
  },
})
