/**
 * The pet's brain without a model: reading a sentence into a memo, deciding
 * whether the user wants it remembered or answered, and turning the pile into
 * a short list of suggestions the user can copy. Everything here is pure so it
 * can be unit-tested and reused by both the host and the panel.
 */

const DAY = 86_400_000

const MEMO_CUE = /^(请|帮我|麻烦)?\s*(记一下|记下来|记下|记一笔|记个|记：|记:|备忘一下|备忘|提醒我|记住|别忘了|存一下|存个|记录一下|收藏一下|memo[:：]?)\s*/i
const ASK_CUE = /^(怎么|怎样|如何|为什么|为啥|能不能|可不可以|可以吗|要不要|该不该|帮我(想|看|分析|整理|总结|写|规划|判断)|建议|推荐|分析|总结|整理一下|看看|你觉得|有没有|是不是)/i
const QUESTION_TAIL = /[?？]\s*$/
const TAG = /#([\p{Script=Han}\p{L}\p{N}_-]{1,20})/gu
const URL = /https?:\/\/[^\s，。；、）)]+/u
const SENTENCE_END = /[。；;！!？?\n]/
const CLAUSE = /[，,、]/

const WEEKDAY = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 日: 0, 天: 0, 七: 0 }
const CN_DIGIT = { 零: 0, 一: 1, 两: 2, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10 }

/** "三点" / "十一点" / "十点" → 3 / 11 / 10; digits pass through. */
export function readNumber(raw) {
  const text = String(raw ?? '').trim()
  if (/^\d+$/.test(text)) return Number(text)
  if (!text) return null
  if (text === '十') return 10
  if (text.startsWith('十')) return 10 + (CN_DIGIT[text[1]] ?? 0)
  if (text.endsWith('十')) return (CN_DIGIT[text[0]] ?? 0) * 10
  if (text.includes('十')) {
    const [tens, ones] = text.split('十')
    return (CN_DIGIT[tens] ?? 0) * 10 + (CN_DIGIT[ones] ?? 0)
  }
  return CN_DIGIT[text] ?? null
}

const pad = value => String(value).padStart(2, '0')

export function startOfDay(timestamp) {
  const date = new Date(timestamp)
  date.setHours(0, 0, 0, 0)
  return date.getTime()
}

export function endOfDay(timestamp) {
  return startOfDay(timestamp) + DAY - 1
}

/** `#tag` extraction; the cues themselves are dropped from the stored title. */
export function splitTags(text) {
  const tags = []
  const cleaned = String(text ?? '').replace(TAG, (_, tag) => {
    tags.push(tag)
    return ' '
  })
  return { text: cleaned, tags }
}

/**
 * Read a Chinese deadline out of free text. Recognises 今天/明天/后天, weekday
 * names, `3月14日`, `2026-03-14`, `周五 18:00`, `下午3点半`. Returns the epoch of
 * the deadline, or null when the sentence carries no date.
 */
export function parseDue(text, now = Date.now()) {
  const raw = String(text ?? '')
  if (!raw) return null
  let day = null
  let explicitDay = false

  const anchor = startOfDay(now)
  if (/大后天/.test(raw)) { day = anchor + 3 * DAY; explicitDay = true }
  else if (/后天/.test(raw)) { day = anchor + 2 * DAY; explicitDay = true }
  else if (/明天|明日|次日/.test(raw)) { day = anchor + DAY; explicitDay = true }
  else if (/今天|今日|今晚|今早|今儿/.test(raw)) { day = anchor; explicitDay = true }

  const weekday = raw.match(/(下周|下星期|下礼拜|本周|这周|这星期|周|星期|礼拜)\s*([一二三四五六日天七])/)
  if (weekday && day === null) {
    const target = WEEKDAY[weekday[2]]
    const current = new Date(now).getDay()
    let delta = (target - current + 7) % 7
    const next = /^下/.test(weekday[1])
    if (next) delta = delta === 0 ? 7 : delta + (delta < 7 ? 0 : 0)
    if (!next && delta === 0 && /本周|这周|这星期/.test(weekday[1])) delta = 0
    if (!next && delta === 0) delta = 7
    day = anchor + delta * DAY
    explicitDay = true
  }

  const monthDay = raw.match(/(?:(\d{4})\s*[年/-])?\s*(\d{1,2})\s*[月/-]\s*(\d{1,2})\s*[日号]?/)
  if (!explicitDay && monthDay) {
    const year = monthDay[1] ? Number(monthDay[1]) : new Date(now).getFullYear()
    const month = Number(monthDay[2]) - 1
    const date = Number(monthDay[3])
    if (month >= 0 && month < 12 && date >= 1 && date <= 31) {
      let stamp = new Date(year, month, date).getTime()
      if (!monthDay[1] && stamp < anchor) stamp = new Date(year + 1, month, date).getTime()
      day = stamp
      explicitDay = true
    }
  }

  if (!explicitDay && /周末/.test(raw)) {
    const current = new Date(now).getDay()
    const delta = (6 - current + 7) % 7
    day = anchor + (delta === 0 ? 0 : delta) * DAY
    explicitDay = true
  }

  let hour = null
  let minute = 0
  const clock = raw.match(/(\d{1,2})\s*[:：]\s*(\d{2})/)
  if (clock) {
    hour = Number(clock[1])
    minute = Number(clock[2])
  } else {
    const point = raw.match(/(\d{1,2}|[零一两二三四五六七八九十]{1,3})\s*点\s*(半|[零一两二三四五六七八九十\d]{1,3}\s*分?)?/)
    if (point) {
      hour = readNumber(point[1])
      const rest = String(point[2] ?? '').trim()
      minute = rest === '半' ? 30 : readNumber(rest.replace(/分/g, '')) || 0
    }
  }
  if (hour !== null) {
    if (!Number.isFinite(hour)) hour = null
    else if (/下午|傍晚|晚上|今晚|夜里/.test(raw) && hour < 12) hour += 12
    if (/中午/.test(raw) && hour < 11) hour += 12
    if (/凌晨/.test(raw) && hour === 12) hour = 0
    if (hour > 23 || minute > 59) { hour = null; minute = 0 }
  }

  if (day === null && hour === null) return null
  const base = day === null ? startOfDay(now) : day
  if (hour === null) {
    if (!explicitDay) return null
    hour = 9
  }
  const stamp = new Date(base)
  stamp.setHours(hour, minute, 0, 0)
  if (day === null && stamp.getTime() < now - 60_000) return stamp.getTime() + DAY
  return stamp.getTime()
}

/** Remove the date phrase so the title stays readable. */
export function stripDue(text) {
  return String(text ?? '')
    .replace(/(大后天|后天|明天|明日|今天|今日|今晚|今早|今儿)\s*(之前|以前|前)?\s*/g, ' ')
    .replace(/(下周|下星期|下礼拜|本周|这周|这星期|周|星期|礼拜)\s*[一二三四五六日天七]\s*(之前|以前|前)?\s*/g, ' ')
    .replace(/(\d{4}\s*[年/-]\s*)?\d{1,2}\s*[月/-]\s*\d{1,2}\s*[日号]?\s*(之前|以前|前)?\s*/g, ' ')
    .replace(/(上午|下午|中午|晚上|傍晚|凌晨|清晨)\s*/g, ' ')
    .replace(/\d{1,2}\s*[:：]\s*\d{2}\s*/g, ' ')
    .replace(/(\d{1,2}|[零一两二三四五六七八九十]{1,3})\s*点\s*(半|[零一两二三四五六七八九十\d]{1,3}\s*分?)?\s*/g, ' ')
    .replace(/周末\s*(之前|以前|前)?\s*/g, ' ')
    .replace(/\s{2,}/g, ' ')
}

/** Split a sentence into a title line and the rest. */
export function splitTitle(text, limit = 60) {
  const body = String(text ?? '').replace(/\s+/g, ' ').trim()
  if (!body) return { title: '', body: '' }
  let cut = body.length
  const sentence = body.search(SENTENCE_END)
  if (sentence > 0) cut = Math.min(cut, sentence)
  if (cut > limit) {
    const clause = body.slice(0, limit).search(CLAUSE)
    cut = clause > 12 ? clause : limit
  }
  const title = body.slice(0, cut).replace(/[，,、：:；;。\s]+$/, '').trim()
  const rest = body.slice(cut).replace(/^[。；;，,、\s]+/, '').trim()
  return { title: title || body.slice(0, limit), body: rest }
}

/**
 * One sentence in, one memo out. The title keeps the user's own words; the
 * date phrase becomes `dueAt` and the tags are lifted out.
 */
export function parseMemo(text, now = Date.now()) {
  const raw = String(text ?? '').trim().slice(0, 4000)
  if (!raw) return null
  const withoutCue = raw.replace(MEMO_CUE, '').trim() || raw
  const dueAt = parseDue(withoutCue, now)
  const tagSplit = splitTags(withoutCue)
  const dated = dueAt ? stripDue(tagSplit.text) : tagSplit.text
  const tidy = dated.replace(/\s{2,}/g, ' ').replace(/^[，,、：:；;\s]+/, '').trim()
  const { title, body } = splitTitle(tidy)
  if (!title) return null
  const url = raw.match(URL)?.[0] ?? ''
  return {
    title,
    body,
    tags: tagSplit.tags.slice(0, 6),
    dueAt,
    source: 'pet',
    link: url,
  }
}

/** Does this message want an answer, or does it want to be remembered? */
export function detectIntent(text) {
  const raw = String(text ?? '').trim()
  if (!raw) return 'memo'
  if (MEMO_CUE.test(raw)) return 'memo'
  if (ASK_CUE.test(raw)) return 'ask'
  if (QUESTION_TAIL.test(raw) && raw.length < 220) return 'ask'
  return 'memo'
}

export function sortMemos(memos) {
  return [...memos].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
    const aDue = a.dueAt ?? Infinity
    const bDue = b.dueAt ?? Infinity
    if (aDue !== bDue) return aDue - bDue
    return b.createdAt - a.createdAt
  })
}

export function statsFor(memos, now = Date.now()) {
  const open = memos.filter(memo => !memo.done)
  return {
    total: memos.length,
    open: open.length,
    done: memos.length - open.length,
    pinned: open.filter(memo => memo.pinned).length,
    dueToday: open.filter(memo => memo.dueAt !== null && memo.dueAt >= startOfDay(now) && memo.dueAt <= endOfDay(now)).length,
    overdue: open.filter(memo => memo.dueAt !== null && memo.dueAt < now).length,
  }
}

export function formatDue(dueAt, now = Date.now()) {
  if (!dueAt) return ''
  const offset = Math.round((startOfDay(dueAt) - startOfDay(now)) / DAY)
  const date = new Date(dueAt)
  const time = `${pad(date.getHours())}:${pad(date.getMinutes())}`
  if (offset === 0) return `今天 ${time}`
  if (offset === 1) return `明天 ${time}`
  if (offset === 2) return `后天 ${time}`
  if (offset === -1) return `昨天 ${time}`
  const sameYear = date.getFullYear() === new Date(now).getFullYear()
  return `${sameYear ? '' : `${date.getFullYear()}年`}${date.getMonth() + 1}月${date.getDate()}日 ${time}`
}

export function memoText(memo, now = Date.now()) {
  const parts = [memo.title]
  if (memo.body) parts.push(memo.body)
  if (memo.dueAt) parts.push(formatDue(memo.dueAt, now))
  if (memo.tags.length) parts.push(memo.tags.map(tag => `#${tag}`).join(' '))
  return parts.join(' · ')
}

export function exportText(memos, now = Date.now()) {
  const open = sortMemos(memos).filter(memo => !memo.done)
  const done = memos.filter(memo => memo.done)
  const date = new Date(now)
  const lines = [`备忘清单 · ${date.getMonth() + 1} 月 ${date.getDate()} 日`, '']
  if (!open.length) lines.push('（没有未完成的备忘）')
  open.forEach((memo, index) => {
    lines.push(`${index + 1}. ${memoText(memo, now)}`)
  })
  if (done.length) {
    lines.push('', `已完成 ${done.length} 条：`)
    done.slice(0, 12).forEach(memo => lines.push(`- ${memo.title}`))
  }
  return lines.join('\n')
}

function plural(count) {
  return `${count} 条`
}

/**
 * Suggestions are the "意见" the pet offers: short, specific, and each one
 * carries a ready-to-paste string so the copy button does real work.
 */
export function suggestionsFor(memos, now = Date.now()) {
  const open = memos.filter(memo => !memo.done)
  const overdue = open.filter(memo => memo.dueAt !== null && memo.dueAt < now - 60_000)
  const today = open.filter(memo => memo.dueAt !== null && memo.dueAt >= startOfDay(now) && memo.dueAt <= endOfDay(now))
  const stale = open.filter(memo => now - memo.createdAt > 10 * DAY && !memo.pinned)
  const pinned = open.filter(memo => memo.pinned)
  const result = []

  if (overdue.length) {
    result.push({
      id: 'overdue',
      tone: 'alert',
      label: '过期',
      line: `${plural(overdue.length)}已经过了时间，要挪到今天还是先放下？`,
      copy: overdue.map(memo => `- ${memoText(memo, now)}`).join('\n'),
      action: { kind: 'filter', value: 'overdue' },
    })
  }
  if (today.length) {
    result.push({
      id: 'today',
      tone: 'due',
      label: '今天',
      line: `今天有 ${plural(today.length)}，我按时间排好了。`,
      copy: today
        .sort((a, b) => (a.dueAt ?? 0) - (b.dueAt ?? 0))
        .map(memo => `${formatDue(memo.dueAt, now)} · ${memo.title}`)
        .join('\n'),
      action: { kind: 'filter', value: 'today' },
    })
  }
  if (stale.length && result.length < 3) {
    result.push({
      id: 'stale',
      tone: 'calm',
      label: '搁着',
      line: `这几条放了十来天。还想做的话，挑一条今天推一下？`,
      copy: stale.slice(0, 5).map(memo => `- ${memo.title}`).join('\n'),
      action: { kind: 'filter', value: 'stale' },
    })
  }
  if (open.length >= 10 && result.length < 3) {
    result.push({
      id: 'crowded',
      tone: 'calm',
      label: '收一收',
      line: `${plural(open.length)}挂着，一眼看不清。要不要把不急的标成今天之后？`,
      copy: exportText(memos, now),
      action: { kind: 'export' },
    })
  }
  if (pinned.length && result.length < 3) {
    result.push({
      id: 'pinned',
      tone: 'idea',
      label: '钉住',
      line: `你钉住的 ${pinned[0].title}，今天要不要推进一小步？`,
      copy: memoText(pinned[0], now),
      action: { kind: 'focus', value: pinned[0].id },
    })
  }
  if (!open.length && memos.length) {
    result.push({
      id: 'clear',
      tone: 'calm',
      label: '清空',
      line: '清单清空了。做得好。',
      copy: '今天没有未完成的备忘。',
      action: { kind: 'none' },
    })
  }
  return result.slice(0, 3)
}

/** The pet's own voice: short lines, varied by time of day and workload. */
export function petLines(memos, now = Date.now()) {
  const stats = statsFor(memos, now)
  const hour = new Date(now).getHours()
  if (stats.overdue > 0) return [
    `有 ${stats.overdue} 条过了时间。我不催，但先看一眼？`,
    '过了时间的还在那儿。要我帮你挪到今天吗？',
  ]
  if (stats.dueToday > 0) return [
    `今天有 ${stats.dueToday} 件。我替你记着。`,
    '到点了我会冒出来。你继续忙。',
  ]
  if (!stats.total) return [
    '我先坐在这儿。想到什么，说一句就行。',
    '把脑子里那句丢给我，我替你记。',
  ]
  if (stats.done && stats.open === 0) return ['都做完了。今天可以收工。', '清单干净了。要我记点别的吗？']
  if (hour < 6) return ['这么晚还在。要记的先丢给我，明天再看。', '夜深了。我只留一盏小灯。']
  if (hour < 11) return ['早上好。今天想先记哪一件？', '早。把今天的事说给我，我排好。']
  if (hour < 18) return [`还有 ${plural(stats.open)}挂着。要不要挑一条先做？`, '我在。要记什么直接说。']
  return ['晚上了。今天的可以收一收，明天的先说给我。', '收工前，把明天的事丢给我。']
}

/** Conversation starters shown when the thread is empty. */
export const STARTERS = [
  '记一下：周五前把方案发出去 #工作',
  '帮我看看有哪些该今天做',
  '明天下午三点 牙医 #生活',
]

export function greetingFor(name, memos, now = Date.now()) {
  const stats = statsFor(memos, now)
  if (stats.overdue) return `${name}在。有 ${stats.overdue} 条过了时间。`
  if (stats.dueToday) return `${name}在。今天 ${stats.dueToday} 件，我都记着。`
  if (!stats.total) return `${name}刚醒。说一句，我就记住。`
  return `${name}在。${stats.open} 条待办，都不急。`
}
