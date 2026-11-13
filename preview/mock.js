/* A stand-in host for the preview page: same request shapes as src/host.js,
 * with the same pure logic from src/pet.js. No DSH needed to look at the UI. */
import {
  detectIntent,
  exportText,
  parseMemo,
  petLines,
  sortMemos,
  statsFor,
  suggestionsFor,
  STARTERS,
  formatDue,
} from '../src/pet.js'

const HOUR = 3_600_000
const DAY = 86_400_000

function seed() {
  const now = Date.now()
  const at = (dayOffset, hour, minute = 0) => {
    const date = new Date(now)
    date.setHours(hour, minute, 0, 0)
    return date.getTime() + dayOffset * DAY
  }
  const memo = (id, title, extra = {}) => ({
    id,
    title,
    body: '',
    tags: [],
    done: false,
    pinned: false,
    dueAt: null,
    color: null,
    source: 'pet',
    createdAt: now - 2 * HOUR,
    updatedAt: now - 2 * HOUR,
    ...extra,
  })
  return [
    memo('m1', '把发票寄给财务', { dueAt: at(-1, 17, 30), tags: ['工作'], createdAt: now - 30 * HOUR }),
    memo('m2', '周三前把方案发出去', { dueAt: at(5, 18), tags: ['工作'], pinned: true, createdAt: now - 5 * HOUR, link: 'https://www.notion.so/team/plan-v3' }),
    memo('m3', '给阿岚回邮件，问清预算口径', { dueAt: at(0, 19), createdAt: now - 3 * HOUR }),
    memo('m4', '牙医 · 下午三点', { dueAt: at(1, 15), tags: ['生活'], createdAt: now - 26 * HOUR }),
    memo('m5', '读完《技术的本质》第三章', { tags: ['阅读'], createdAt: now - 12 * DAY, link: 'https://book.douban.com/subject/25898809/' }),
    memo('m6', '想一个更轻的 onboarding 第一屏', { tags: ['想法'], createdAt: now - 8 * HOUR }),
    memo('m7', '订周五的会议室', { done: true, tags: ['工作'], createdAt: now - 28 * HOUR }),
  ]
}

export function createMock({ empty = false, alert = false } = {}) {
  let alertOnce = alert
  const state = {
    now: Date.now(),
    pet: { name: '阿墨', position: null, edge: 'right', quiet: false, collapsed: true, seenAt: 0 },
    memos: empty ? [] : seed(),
    chat: { sessionId: 'mock', turns: 3, updatedAt: Date.now() },
    directory: '~/.dsh/memo-pet',
    model: 'deepseek-flash',
    hasModel: true,
  }

  const snap = extra => {
    const now = Date.now()
    const memos = sortMemos(state.memos.filter(memo => !memo.removedAt))
    const trash = state.memos.filter(memo => memo.removedAt).sort((a, b) => (b.removedAt ?? 0) - (a.removedAt ?? 0))
    return {
      ...state,
      now,
      memos,
      trash,
      stats: statsFor(memos, now),
      suggestions: suggestionsFor(memos, now),
      lines: petLines(memos, now),
      starters: STARTERS,
      ...extra,
    }
  }

  let chatRunning = false

  async function request(input) {
    await new Promise(resolve => setTimeout(resolve, 90))
    const op = input?.op
    if (op === 'bootstrap') return snap()
    if (op === 'say') {
      const text = String(input.text ?? '').trim()
      if (!text) throw Object.assign(new Error('先说一句。'), { code: 'empty' })
      if (detectIntent(text) === 'memo') {
        const parsed = parseMemo(text)
        if (!parsed) throw Object.assign(new Error('没读懂这句话。'), { code: 'empty' })
        const memo = {
          id: `m_${Date.now().toString(36)}`,
          title: parsed.title,
          body: parsed.body,
          tags: parsed.tags,
          dueAt: parsed.dueAt,
          done: false,
          pinned: false,
          color: null,
          source: 'pet',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }
        state.memos.unshift(memo)
        const next = snap()
        return {
          kind: 'memo',
          memo,
          duplicate: false,
          reply: parsed.dueAt ? `记下了，${formatDue(parsed.dueAt)} 我会叫你。` : `记下了。现在 ${next.stats.open} 条。`,
          memos: next.memos,
          stats: next.stats,
          suggestions: next.suggestions,
          lines: next.lines,
          now: next.now,
        }
      }
      chatRunning = true
      return { kind: 'ask', cursor: 0, sessionId: 'mock', running: true }
    }
    if (op === 'chat/poll') {
      const running = input.cursor === 0 ? false : false
      chatRunning = false
      return {
        running,
        cursor: 1,
        error: '',
        messages: [{ role: 'assistant', text: '今天最紧的是那封邮件——先把预算口径问清，方案才写得动。其余两条不用今天动。' }],
      }
    }
    if (op === 'memo/toggle') {
      const memo = state.memos.find(item => item.id === input.id)
      if (memo) memo.done = !memo.done
      return snap()
    }
    if (op === 'memo/update') {
      const memo = state.memos.find(item => item.id === input.id)
      if (memo) Object.assign(memo, input.patch ?? {}, { updatedAt: Date.now() })
      return snap()
    }
    if (op === 'memo/remove') {
      const memo = state.memos.find(item => item.id === input.id)
      if (memo) { memo.removedAt = Date.now(); memo.snoozedUntil = null }
      return snap()
    }
    if (op === 'memo/restore') {
      const memo = state.memos.find(item => item.id === input.id)
      if (memo) memo.removedAt = null
      return snap()
    }
    if (op === 'memo/purge') {
      state.memos = input.id ? state.memos.filter(item => item.id !== input.id) : state.memos.filter(item => !item.removedAt)
      return snap()
    }
    if (op === 'memo/schedule') {
      const memo = state.memos.find(item => item.id === input.id)
      if (memo) {
        memo.dueAt = String(input.text ?? '').trim() ? parseDue(String(input.text)) : null
        memo.nudgedAt = 0
        memo.snoozedUntil = null
        memo.updatedAt = Date.now()
      }
      return snap()
    }
    if (op === 'memo/snooze') {
      const memo = state.memos.find(item => item.id === input.id)
      if (memo) {
        memo.snoozedUntil = Date.now() + Number(input.minutes ?? 10) * 60_000
        memo.nudgedAt = 0
      }
      return snap()
    }
    if (op === 'memo/bulk-due') {
      const ids = Array.isArray(input.ids) ? input.ids : []
      const dueAt = String(input.text ?? '').trim() ? parseDue(String(input.text)) : null
      for (const memo of state.memos) if (ids.includes(memo.id)) { memo.dueAt = dueAt; memo.nudgedAt = 0; memo.snoozedUntil = null }
      return snap()
    }
    if (op === 'alerts') {
      if (!alertOnce) return { alert: null }
      alertOnce = false
      const memo = state.memos.find(item => !item.done && !item.removedAt)
      if (!memo) return { alert: null }
      memo.nudgedAt = Date.now()
      return { alert: { id: memo.id, title: memo.title, body: memo.body, dueAt: memo.dueAt ?? Date.now(), link: memo.link } }
    }
    if (op === 'memo/add') {
      const parsed = parseMemo(String(input.text ?? ''))
      if (parsed) {
        state.memos.unshift({
          id: `m_${Date.now().toString(36)}`,
          title: parsed.title,
          body: parsed.body,
          tags: Array.isArray(input.tags) && input.tags.length ? input.tags : parsed.tags,
          dueAt: input.dueAt ?? parsed.dueAt,
          done: false,
          pinned: false,
          color: null,
          source: 'pet',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        })
      }
      return snap()
    }
    if (op === 'memo/clear-done') {
      const now = Date.now()
      state.memos.forEach(item => { if (item.done && !item.removedAt) { item.removedAt = now; item.updatedAt = now } })
      return snap()
    }
    if (op === 'memo/clear-all') {
      state.memos = []
      return snap()
    }
    if (op === 'memo/export') return { text: exportText(state.memos) }
    if (op === 'pet/update') {
      Object.assign(state.pet, input.patch ?? {})
      return { pet: state.pet }
    }
    if (op === 'chat/reset') return snap()
    throw Object.assign(new Error(`unknown op ${op}`), { code: 'bad-op' })
  }

  return { request, state }
}
