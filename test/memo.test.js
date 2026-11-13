import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  detectIntent,
  endOfDay,
  exportText,
  formatDue,
  memoText,
  parseDue,
  parseMemo,
  petLines,
  sortMemos,
  splitTitle,
  startOfDay,
  statsFor,
  suggestionsFor,
  readNumber,
} from '../src/pet.js'
import { cleanMemo, cleanState, emptyState, LIMITS } from '../src/store.js'

const DAY = 86_400_000
const now = new Date(2026, 10, 13, 19, 20, 0).getTime() // Friday 2026-11-13 19:20 local

const iso = value => (value === null ? null : new Date(value).toISOString())

test('readNumber reads Chinese numerals and digits', () => {
  assert.equal(readNumber('3'), 3)
  assert.equal(readNumber('三'), 3)
  assert.equal(readNumber('十'), 10)
  assert.equal(readNumber('十一'), 11)
  assert.equal(readNumber('十二'), 12)
  assert.equal(readNumber('二十'), 20)
  assert.equal(readNumber('两'), 2)
  assert.equal(readNumber(''), null)
})

test('parseDue understands the everyday ways people say "when"', () => {
  assert.equal(iso(parseDue('明天下午三点', now)), iso(new Date(2026, 10, 14, 15, 0).getTime()))
  assert.equal(iso(parseDue('今天 18:30', now)), iso(new Date(2026, 10, 13, 18, 30).getTime()))
  assert.equal(iso(parseDue('后天', now)), iso(new Date(2026, 10, 15, 9, 0).getTime()))
  assert.equal(iso(parseDue('晚上八点跑步', now)), iso(new Date(2026, 10, 13, 20, 0).getTime()))
  // a bare "3点半" is 03:30; it already passed at 19:20, so it means tomorrow
  assert.equal(iso(parseDue('3点半开会', now)), iso(new Date(2026, 10, 14, 3, 30).getTime()))
  assert.equal(iso(parseDue('下周一 10:00 复盘', now)), iso(new Date(2026, 10, 16, 10, 0).getTime()))
  assert.equal(iso(parseDue('3月2日 交材料', now)), iso(new Date(2027, 2, 2, 9, 0).getTime()))
  assert.equal(parseDue('没有时间的话就先放着', now), null)
})

test('parseDue rolls a passed clock time to tomorrow', () => {
  assert.equal(iso(parseDue('18:00 交表', now)), iso(new Date(2026, 10, 14, 18, 0).getTime()))
  const morning = new Date(2026, 10, 13, 9, 0).getTime()
  assert.equal(iso(parseDue('18:00 交表', morning)), iso(new Date(2026, 10, 13, 18, 0).getTime()))
})

test('parseMemo lifts the deadline, tags and the first clause', () => {
  const memo = parseMemo('记一下：明天下午三点 牙医复查 #生活 #健康', now)
  assert.equal(memo.title, '牙医复查')
  assert.deepEqual(memo.tags, ['生活', '健康'])
  assert.equal(iso(memo.dueAt), iso(new Date(2026, 10, 14, 15, 0).getTime()))
})

test('parseMemo strips trailing 前 / 之前 with the date', () => {
  assert.equal(parseMemo('周五前把方案发出去 #工作', now).title, '把方案发出去')
  assert.equal(parseMemo('下周三之前回复客户', now).title, '回复客户')
})

test('parseMemo keeps a long thought inside the title limit', () => {
  const sentence = '想一个更轻的 onboarding：先让用户说出今天要做的一件事，再谈别的，然后把这件事变成一条可以勾掉的备忘，最后再谈设置。'
  const memo = parseMemo(sentence, now)
  assert.ok(memo.title.length <= 60)
  assert.ok(memo.body.length > 0, 'the overflow becomes the body')
})

test('parseMemo ignores empty input', () => {
  assert.equal(parseMemo('   ', now), null)
  assert.equal(parseMemo('', now), null)
})

test('splitTitle cuts at the first sentence end', () => {
  const { title, body } = splitTitle('先做这个，再做那个。后面还有一堆。')
  assert.equal(title, '先做这个，再做那个')
  assert.equal(body, '后面还有一堆。')
})

test('detectIntent routes questions to the model and notes to the list', () => {
  assert.equal(detectIntent('帮我记一下明天的会'), 'memo')
  assert.equal(detectIntent('我今天要先做什么？'), 'ask')
  assert.equal(detectIntent('怎么安排这三件事'), 'ask')
  assert.equal(detectIntent('买牛奶'), 'memo')
  assert.equal(detectIntent(''), 'memo')
})

test('sortMemos keeps open + pinned + soonest on top', () => {
  const base = { body: '', tags: [], done: false, pinned: false, dueAt: null, createdAt: 1, updatedAt: 1 }
  const list = [
    { ...base, id: 'done', title: 'done', done: true },
    { ...base, id: 'later', title: 'later', dueAt: now + 3 * DAY },
    { ...base, id: 'pinned', title: 'pinned', pinned: true, createdAt: now + 5 * DAY },
    { ...base, id: 'soon', title: 'soon', dueAt: now + DAY },
  ]
  assert.deepEqual(sortMemos(list).map(memo => memo.id), ['pinned', 'soon', 'later', 'done'])
})

test('statsFor counts open, overdue and today', () => {
  const base = { body: '', tags: [], done: false, pinned: false, createdAt: 1, updatedAt: 1 }
  const stats = statsFor([
    { ...base, id: 'a', title: 'a', dueAt: now - 1000 },
    { ...base, id: 'b', title: 'b', dueAt: startOfDay(now) + 23 * 3_600_000 },
    { ...base, id: 'c', title: 'c', done: true },
    { ...base, id: 'd', title: 'd' },
  ], now)
  assert.deepEqual(
    { open: stats.open, done: stats.done, overdue: stats.overdue, dueToday: stats.dueToday },
    { open: 3, done: 1, overdue: 1, dueToday: 2 },
  )
})

test('suggestionsFor surfaces overdue first and copies a real list', () => {
  const base = { body: '', tags: [], done: false, pinned: false, createdAt: now, updatedAt: now }
  const list = [
    { ...base, id: 'a', title: '寄发票', dueAt: now - DAY },
    { ...base, id: 'b', title: '回邮件', dueAt: endOfDay(now) - 60_000 },
  ]
  const items = suggestionsFor(list, now)
  assert.equal(items[0].id, 'overdue')
  assert.match(items[0].copy, /寄发票/)
  assert.ok(items.some(item => item.id === 'today'))
})

test('suggestionsFor stays quiet when there is nothing to say', () => {
  assert.deepEqual(suggestionsFor([], now), [])
})

test('exportText is a paste-ready checklist', () => {
  const base = { body: '', tags: [], done: false, pinned: false, createdAt: now, updatedAt: now }
  const text = exportText([
    { ...base, id: 'a', title: '寄发票', dueAt: now - DAY, tags: ['工作'] },
    { ...base, id: 'b', title: '已完成的事', done: true },
  ], now)
  assert.match(text, /^备忘清单 · 11 月 13 日/)
  assert.match(text, /1\. 寄发票/)
  assert.match(text, /#工作/)
  assert.match(text, /已完成 1 条/)
})

test('petLines has a voice for overdue, empty and done', () => {
  assert.ok(petLines([], now).length >= 1)
  const base = { body: '', tags: [], done: false, pinned: false, createdAt: now, updatedAt: now }
  assert.match(petLines([{ ...base, id: 'a', title: 'a', dueAt: now - DAY }], now)[0], /过了时间/)
})

test('formatDue reads naturally', () => {
  assert.equal(formatDue(new Date(2026, 10, 13, 18, 5).getTime(), now), '今天 18:05')
  assert.equal(formatDue(new Date(2026, 10, 14, 9, 0).getTime(), now), '明天 09:00')
  assert.equal(formatDue(new Date(2026, 10, 12, 9, 0).getTime(), now), '昨天 09:00')
  assert.equal(formatDue(new Date(2027, 0, 2, 9, 0).getTime(), now), '2027年1月2日 09:00')
})

test('cleanMemo drops empty titles, clamps fields and normalises tags', () => {
  const memo = cleanMemo({
    title: '  写周报  ',
    body: 'x'.repeat(9000),
    tags: ['#工作', '工作', '', '生活', 'a', 'b', 'c', 'd'],
    dueAt: 'nope',
    done: 'yes',
    createdAt: 5,
  }, now)
  assert.equal(memo.title, '写周报')
  assert.equal(memo.body.length, LIMITS.body)
  assert.deepEqual(memo.tags, ['工作', '生活', 'a', 'b', 'c', 'd'].slice(0, 6))
  assert.equal(memo.dueAt, null)
  assert.equal(memo.done, false)
  assert.equal(cleanMemo({ title: '' }), null)
  assert.equal(cleanMemo(null), null)
})

test('cleanState repairs a file that was hand-edited or corrupted', () => {
  const state = cleanState({
    memos: [
      { title: 'a', id: 'one' },
      { title: 'a', id: 'one' },
      { title: '' },
      'nonsense',
    ],
    pet: { name: '  ', position: { x: 'NaN', y: 4 }, edge: 'up' },
    chat: { sessionId: 7 },
  })
  assert.equal(state.memos.length, 1)
  assert.equal(state.pet.name, emptyState().pet.name)
  assert.equal(state.pet.position, null)
  assert.equal(state.pet.edge, 'right')
  assert.equal(state.chat.sessionId, '')
  assert.equal(cleanState(null).memos.length, 0)
})

test('links are lifted out of the sentence and kept on the memo', () => {
  const now = Date.now()
  const memo = parseMemo('把方案发出去 https://www.notion.so/team/plan-v3 。', now)
  assert.equal(memo.title, '把方案发出去')
  assert.equal(memo.link, 'https://www.notion.so/team/plan-v3')
  assert.equal(memoText(memo).includes('https://www.notion.so/team/plan-v3'), true)
})

test('a bare link becomes a memo named after its host', () => {
  const memo = parseMemo('https://github.com/maomyu/dsh-memo-pet', Date.now())
  assert.equal(memo.title, 'github.com')
  assert.equal(memo.link, 'https://github.com/maomyu/dsh-memo-pet')
})

test('only http(s) links are accepted, other schemes stay as text', () => {
  const script = parseMemo('javascript:alert(1) 别点', Date.now())
  assert.equal(script.link, '')
  assert.match(script.title, /javascript/)
  const stored = cleanMemo({ title: '坏链接', link: 'javascript:alert(1)' }, Date.now())
  assert.equal(stored.link, '')
  const good = cleanMemo({ title: '好链接', link: 'https://example.com/x' }, Date.now())
  assert.equal(good.link, 'https://example.com/x')
})
