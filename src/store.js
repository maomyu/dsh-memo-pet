import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { dirname, isAbsolute, join, normalize, resolve } from 'node:path'
import { homedir } from 'node:os'

/**
 * Every byte the pet owns lives in one JSON file under the plugin's directory:
 * memos, the pet's own state (position, name, mood) and the pointer to the
 * dedicated pet conversation. Writes are atomic (temp file + rename) so a
 * crash mid-save can never truncate the user's memos.
 */

export const SCHEMA = 1
export const LIMITS = {
  memos: 2000,
  title: 160,
  body: 4000,
  tags: 6,
  tagLength: 20,
  search: 200,
}

export function expandHome(value) {
  const text = String(value ?? '').trim()
  if (!text) return ''
  if (text === '~') return homedir()
  if (text.startsWith('~/')) return join(homedir(), text.slice(2))
  return text
}

export function resolveDirectory(config) {
  const raw = expandHome(config?.directory ?? config?.dir ?? '')
  const home = normalize(homedir())
  const fallback = join(home, '.dsh', 'memo-pet')
  if (!raw) return fallback
  // Absolute paths are an explicit choice; relative ones resolve under the
  // home directory so a bad config can never scatter files around the cwd.
  const chosen = isAbsolute(raw) ? normalize(resolve(raw)) : normalize(resolve(join(home, raw)))
  return chosen
}

export function emptyState() {
  return {
    schema: SCHEMA,
    memos: [],
    pet: {
      name: '阿墨',
      position: null,
      edge: 'right',
      quiet: false,
      collapsed: false,
      seenAt: 0,
    },
    chat: { sessionId: '', turns: 0, updatedAt: 0 },
    updatedAt: 0,
  }
}

function cleanString(value, max) {
  return typeof value === 'string' ? value.slice(0, max) : ''
}

function cleanTags(list) {
  const seen = new Set()
  const out = []
  for (const item of Array.isArray(list) ? list : []) {
    const tag = String(item ?? '').replace(/^#/, '').trim().slice(0, LIMITS.tagLength)
    if (!tag) continue
    const key = tag.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push(tag)
    if (out.length >= LIMITS.tags) break
  }
  return out
}

export function cleanMemo(raw, now = Date.now()) {
  if (!raw || typeof raw !== 'object') return null
  const id = cleanString(raw.id, 64) || `m_${now.toString(36)}_${Math.random().toString(36).slice(2, 8)}`
  const title = cleanString(raw.title, LIMITS.title).trim()
  if (!title) return null
  const createdAt = Number.isFinite(raw.createdAt) ? Number(raw.createdAt) : now
  const rawLink = typeof raw.link === 'string' ? raw.link.trim() : ''
  const link = /^https?:\/\//i.test(rawLink) ? rawLink.slice(0, 2048) : ''
  const done = raw.done === true
  return {
    id,
    title,
    link,
    body: cleanString(raw.body, LIMITS.body),
    tags: cleanTags(raw.tags),
    done,
    pinned: raw.pinned === true,
    dueAt: Number.isFinite(raw.dueAt) ? Number(raw.dueAt) : null,
    doneAt: done ? (Number.isFinite(raw.doneAt) ? Number(raw.doneAt) : null) : null,
    snoozedUntil: Number.isFinite(raw.snoozedUntil) ? Number(raw.snoozedUntil) : null,
    nudgedAt: Number.isFinite(raw.nudgedAt) ? Number(raw.nudgedAt) : 0,
    removedAt: Number.isFinite(raw.removedAt) ? Number(raw.removedAt) : null,
    color: ['ember', 'moss', 'sky', 'plum'].includes(raw.color) ? raw.color : null,
    source: ['pet', 'tool', 'chat', 'quick'].includes(raw.source) ? raw.source : 'pet',
    createdAt,
    updatedAt: Number.isFinite(raw.updatedAt) ? Number(raw.updatedAt) : createdAt,
  }
}

export function cleanPet(raw) {
  const base = emptyState().pet
  if (!raw || typeof raw !== 'object') return base
  const position = raw.position && Number.isFinite(raw.position.x) && Number.isFinite(raw.position.y)
    ? { x: Math.round(Number(raw.position.x)), y: Math.round(Number(raw.position.y)) }
    : null
  return {
    name: cleanString(raw.name, 24).trim() || base.name,
    position,
    edge: raw.edge === 'left' ? 'left' : 'right',
    quiet: raw.quiet === true,
    collapsed: raw.collapsed === true,
    seenAt: Number.isFinite(raw.seenAt) ? Number(raw.seenAt) : 0,
  }
}

export function cleanState(raw) {
  const state = emptyState()
  if (!raw || typeof raw !== 'object') return state
  const seen = new Set()
  const memos = []
  for (const item of Array.isArray(raw.memos) ? raw.memos : []) {
    const memo = cleanMemo(item)
    if (!memo || seen.has(memo.id)) continue
    seen.add(memo.id)
    memos.push(memo)
    if (memos.length >= LIMITS.memos) break
  }
  state.memos = memos
  state.pet = cleanPet(raw.pet)
  if (raw.chat && typeof raw.chat === 'object') {
    state.chat = {
      sessionId: cleanString(raw.chat.sessionId, 120),
      turns: Number.isFinite(raw.chat.turns) ? Number(raw.chat.turns) : 0,
      updatedAt: Number.isFinite(raw.chat.updatedAt) ? Number(raw.chat.updatedAt) : 0,
    }
  }
  state.updatedAt = Number.isFinite(raw.updatedAt) ? Number(raw.updatedAt) : 0
  return state
}

export class MemoStore {
  constructor(directory) {
    this.directory = directory
    this.file = join(directory, 'state.json')
    this.state = emptyState()
    this.ready = false
    this.queue = Promise.resolve()
  }

  async load() {
    if (this.ready) return this.state
    await mkdir(this.directory, { recursive: true })
    try {
      const text = await readFile(this.file, 'utf8')
      this.state = cleanState(JSON.parse(text))
    } catch (error) {
      if (error?.code !== 'ENOENT') {
        // A corrupt file must not brick the pet: keep it aside for inspection
        // and start from a valid empty state.
        try { await rename(this.file, `${this.file}.broken-${Date.now()}`) } catch {}
      }
      this.state = emptyState()
    }
    this.ready = true
    return this.state
  }

  /** Serialise writes: the UI fires several mutations in quick succession. */
  save() {
    const snapshot = JSON.stringify(this.state, null, 2)
    this.queue = this.queue.then(async () => {
      await mkdir(dirname(this.file), { recursive: true })
      const temp = `${this.file}.${process.pid}.tmp`
      await writeFile(temp, snapshot, 'utf8')
      await rename(temp, this.file)
    }).catch(() => {})
    return this.queue
  }

  /** Mutate through one serialised path; the callback never sees a stale copy. */
  async update(mutator) {
    await this.load()
    const result = await mutator(this.state)
    this.state.updatedAt = Date.now()
    await this.save()
    return result
  }
}
