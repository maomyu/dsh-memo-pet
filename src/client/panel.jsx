import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CopyButton, Icon, LinkText, linkHost, relativeDay } from './shared.jsx'

function dueLabel(dueAt, now) {
  if (!dueAt) return ''
  const date = new Date(dueAt)
  const time = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
  const offset = Math.round((new Date(dueAt).setHours(0, 0, 0, 0) - new Date(now).setHours(0, 0, 0, 0)) / 86_400_000)
  if (offset === 0) return `今天 ${time}`
  if (offset === 1) return `明天 ${time}`
  if (offset === -1) return `昨天 ${time}`
  if (offset > 1 && offset < 7) return `周${'日一二三四五六'[date.getDay()]} ${time}`
  return `${date.getMonth() + 1}/${date.getDate()} ${time}`
}

function CreatureMark() {
  return (
    <span className="mp-mark" aria-hidden="true">
      <span className="mp-mark-body">
        <i className="mp-mark-eye" />
        <i className="mp-mark-eye" />
      </span>
    </span>
  )
}

/* ------------------------------------------------------------------- rows */

function MemoRow({
  memo, now, mode = 'open', onToggle, onRemove, onPin, onEdit, onSchedule,
  onRestore, onPurge, onOpenLink, busy,
}) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(memo.title)
  const [body, setBody] = useState(memo.body ?? '')
  const [sched, setSched] = useState(false)
  const [schedText, setSchedText] = useState('')
  const input = useRef(null)

  useEffect(() => {
    if (!editing) return
    const node = input.current
    node?.focus()
    node?.setSelectionRange(node.value.length, node.value.length)
  }, [editing])

  useEffect(() => {
    setTitle(memo.title)
    setBody(memo.body ?? '')
  }, [memo.id, memo.title, memo.body])

  const commit = useCallback(() => {
    const next = title.trim()
    if (!next) { setTitle(memo.title); setEditing(false); return }
    setEditing(false)
    if (next !== memo.title || body !== (memo.body ?? '')) onEdit(memo, { title: next, body })
  }, [title, body, memo, onEdit])

  const pick = useCallback(text => {
    setSched(false)
    setSchedText('')
    onSchedule(memo, text)
  }, [memo, onSchedule])

  const overdue = !memo.done && memo.dueAt && memo.dueAt < now - 60_000
  const due = memo.dueAt ? dueLabel(memo.dueAt, now) : ''
  const copyValue = [memo.title, memo.body, due, memo.tags.map(tag => `#${tag}`).join(' '), memo.link].filter(Boolean).join(' · ')

  return (
    <li className={`mp-row ${memo.done ? 'is-done' : ''} ${memo.pinned ? 'is-pinned' : ''}`} data-id={memo.id}>
      {editing || mode === 'trash' ? null : (
        <button
          type="button"
          className="mp-check"
          role="checkbox"
          aria-checked={memo.done}
          aria-label={memo.done ? '标回未完成' : '标成完成'}
          onClick={() => onToggle(memo)}
          disabled={busy}
        >
          <span className="mp-check-ring"><Icon name="check" size={11} /></span>
        </button>
      )}
      <div className="mp-row-main">
        {editing ? (
          <form
            className="mp-edit"
            onSubmit={event => { event.preventDefault(); commit() }}
            onKeyDown={event => { if (event.key === 'Escape') { setTitle(memo.title); setBody(memo.body ?? ''); setEditing(false) } }}
          >
            <input
              ref={input}
              className="mp-row-edit"
              value={title}
              maxLength={160}
              onChange={event => setTitle(event.target.value)}
            />
            <textarea
              className="mp-row-body"
              rows={2}
              value={body}
              maxLength={4000}
              placeholder="补一句正文，可留空"
              onChange={event => setBody(event.target.value)}
            />
            <div className="mp-edit-actions">
              <button type="submit" className="mp-mini">保存</button>
              <button type="button" className="mp-mini mp-mini-quiet" onClick={() => { setTitle(memo.title); setBody(memo.body ?? ''); setEditing(false) }}>取消</button>
            </div>
          </form>
        ) : (
          <div
            className="mp-row-title"
            onDoubleClick={() => setEditing(true)}
            title={`${memo.body ? memo.body + ' · ' : ''}双击改标题和正文`}
          >
            <LinkText text={memo.title} onOpen={onOpenLink} />
          </div>
        )}
        {!editing && mode !== 'trash' ? (
          <div className="mp-row-meta">
            {due ? (mode === 'open' ? (
              <button
                type="button"
                className={`mp-chip mp-chip-btn ${overdue ? 'is-alert' : ''}`}
                onClick={() => { setSched(value => !value); setSchedText('') }}
                title="改时间"
              >
                <Icon name="clock" size={11} />{due}
              </button>
            ) : (
              <span className={`mp-chip ${overdue ? 'is-alert' : ''}`}><Icon name="clock" size={11} />{due}</span>
            )) : null}
            {memo.tags.map(tag => <span key={tag} className="mp-tag">#{tag}</span>)}
            {memo.link ? (
              <a
                className="mp-link"
                href={memo.link}
                target="_blank"
                rel="noreferrer"
                title={`在右侧栏打开 ${memo.link}`}
                onClick={event => { event.preventDefault(); event.stopPropagation(); onOpenLink(memo.link) }}
              >
                <Icon name="link" size={11} />
                {linkHost(memo.link) || '链接'}
              </a>
            ) : null}
            {!due && !memo.tags.length && !memo.link ? <span className="mp-meta">{relativeDay(memo.createdAt, now)}</span> : null}
          </div>
        ) : null}
        {sched ? (
          <form className="mp-sched" onSubmit={event => { event.preventDefault(); if (schedText.trim()) pick(schedText.trim()) }}>
            <input
              autoFocus
              className="mp-sched-input"
              value={schedText}
              placeholder="明天 9:00 / 周五下午三点"
              onChange={event => setSchedText(event.target.value)}
            />
            <div className="mp-sched-quick">
              <button type="button" onClick={() => pick('今天 18:00')}>今天</button>
              <button type="button" onClick={() => pick('明天 09:00')}>明天</button>
              <button type="button" onClick={() => pick('下周一 09:00')}>下周一</button>
              <button type="button" onClick={() => pick('')}>清空</button>
            </div>
          </form>
        ) : null}
      </div>
      <div className="mp-row-actions">
        {mode === 'trash' ? (
          <>
            <button type="button" className="mp-text-btn" onClick={() => onRestore(memo)}>恢复</button>
            <button
              type="button"
              className="mp-icon mp-icon-danger"
              onClick={() => onPurge(memo)}
              aria-label="彻底删除"
              title="彻底删除"
            >
              <Icon name="trash" size={13} />
            </button>
          </>
        ) : (
          <>
            <CopyButton text={copyValue} iconOnly label="复制这条" />
            {mode === 'open' ? (
              <button
                type="button"
                className={`mp-icon ${memo.pinned ? 'is-on' : ''}`}
                onClick={() => onPin(memo)}
                aria-label={memo.pinned ? '取消钉住' : '钉住'}
                title={memo.pinned ? '取消钉住' : '钉住'}
              >
                <Icon name="pin" size={13} />
              </button>
            ) : null}
            <button
              type="button"
              className="mp-icon mp-icon-danger"
              onClick={() => onRemove(memo)}
              aria-label={mode === 'done' ? '从已完成里移除' : '移到回收站'}
              title={mode === 'done' ? '从已完成里移除' : '移到回收站'}
            >
              <Icon name="trash" size={13} />
            </button>
          </>
        )}
      </div>
    </li>
  )
}

/* ---------------------------------------------------------------- composer */

function Composer({ draft, setDraft, onSend, busy, placeholder, hint }) {
  const area = useRef(null)
  const grow = useCallback(() => {
    const node = area.current
    if (!node) return
    node.style.height = 'auto'
    node.style.height = `${Math.min(96, node.scrollHeight)}px`
  }, [])
  useEffect(grow, [draft, grow])
  return (
    <form
      className="mp-composer"
      onSubmit={event => { event.preventDefault(); onSend() }}
    >
      <textarea
        ref={area}
        className="mp-input"
        rows={1}
        value={draft}
        placeholder={placeholder}
        spellCheck={false}
        onChange={event => setDraft(event.target.value)}
        onKeyDown={event => {
          if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
            event.preventDefault()
            onSend()
          }
        }}
      />
      <div className="mp-composer-foot">
        <span className="mp-hint">{hint}</span>
        <button className="mp-send" type="submit" disabled={!draft.trim() || busy} aria-label="发送">
          <span className="mp-send-ring" aria-hidden="true" />
          <Icon name="send" size={15} />
        </button>
      </div>
    </form>
  )
}

/* ----------------------------------------------------------------- opinion */

/**
 * One opinion at a time, cycling on demand. A strip reads faster than a stack
 * of cards and gives the pet a way to "offer another thought".
 */
function Opinion({ items, now, onAct }) {
  const [index, setIndex] = useState(0)
  useEffect(() => { if (index >= items.length) setIndex(0) }, [items.length, index])
  if (!items.length) return null
  const item = items[index % items.length]
  return (
    <div className="mp-opinion" data-tone={item.tone}>
      <span className="mp-op-index" aria-hidden="true">{String((index % items.length) + 1).padStart(2, '0')}</span>
      <div className="mp-op-body">
        <span className="mp-op-label">{item.label}</span>
        <p>{item.line}</p>
      </div>
      <div className="mp-op-actions">
        {item.act ? (
          <button type="button" className="mp-op-do" onClick={() => onAct?.(item.act)}>{item.act.label}</button>
        ) : null}
        <CopyButton text={item.copy} label="复制" doneLabel="已复制" />
        {items.length > 1 ? (
          <button
            type="button"
            className="mp-op-next"
            onClick={() => setIndex(value => (value + 1) % items.length)}
            aria-label="换一条意见"
            title="换一条"
          >
            <Icon name="arrow" size={12} />
          </button>
        ) : null}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------- panel */

export function Panel({
  data, placement, line, thinking, suggestions, busy, error,
  draft, setDraft, onSend, onClose, onToggle, onRemove, onPin, onEdit, onOpenLink,
  onCopyAll, onClearDone, onReset, search, setSearch, onSettings,
  onSchedule, onRestore, onPurge, onAct,
  alert, onAlertDone, onAlertSnooze, onAlertDismiss,
}) {
  const now = data.now ?? Date.now()
  const memos = data.memos ?? []
  const open = memos.filter(memo => !memo.done)
  const done = memos.filter(memo => memo.done)
  const trash = data.trash ?? []
  const [view, setView] = useState('open')
  const pool = view === 'trash' ? trash : view === 'done' ? done : open
  const term = search.trim().toLowerCase()
  const shown = (term
    ? pool.filter(memo => `${memo.title} ${memo.body} ${memo.tags.join(' ')}`.toLowerCase().includes(term))
    : pool)
  const [searching, setSearching] = useState(false)
  const searchRef = useRef(null)
  useEffect(() => { if (searching) searchRef.current?.focus() }, [searching])

  return (
    <section className="mp-panel" data-side={placement.side} aria-label="备忘精灵">
      <header className="mp-head">
        <CreatureMark />
        <div className="mp-id">
          <b>{data.pet?.name ?? '阿墨'}</b>
          <span className="mp-status" data-dot={thinking ? 'busy' : 'idle'}>
            {thinking ? '在想' : data.stats?.open ? `${data.stats.open} 条待办` : '清单是空的'}
          </span>
        </div>
        <div className="mp-head-actions">
          <button
            type="button"
            className={`mp-icon ${searching ? 'is-on' : ''}`}
            onClick={() => { setSearching(v => !v); if (searching) setSearch('') }}
            aria-label="搜索备忘"
            title="搜索"
          >
            <Icon name="search" size={14} />
          </button>
          <button type="button" className="mp-icon" onClick={onSettings} aria-label="宠物设置" title="设置">
            <Icon name="spark" size={14} />
          </button>
          <button type="button" className="mp-icon" onClick={onClose} aria-label="收起" title="收起（Esc）">
            <Icon name="close" size={14} />
          </button>
        </div>
      </header>

      {searching ? (
        <div className="mp-search">
          <Icon name="search" size={13} />
          <input
            ref={searchRef}
            value={search}
            placeholder="搜标题、正文或标签"
            onChange={event => setSearch(event.target.value)}
            onKeyDown={event => { if (event.key === 'Escape') { setSearching(false); setSearch('') } }}
          />
        </div>
      ) : null}

      <div className="mp-hero">
        <div className="mp-hero-head">
          <span className="mp-eyebrow">阿墨说</span>
          {!thinking && line ? <CopyButton text={line} label="复制" doneLabel="已复制" /> : null}
        </div>
        {thinking ? (
          <span className="mp-typing" aria-label="正在想"><i /><i /><i /></span>
        ) : (
          <p className="mp-line"><LinkText text={line} onOpen={onOpenLink} className="mp-line-text" /></p>
        )}
      </div>

      {suggestions.length && !searching ? <Opinion items={suggestions.slice(0, 3)} now={now} /> : null}

      <Composer
        draft={draft}
        setDraft={setDraft}
        onSend={onSend}
        busy={busy}
        placeholder="记一句，或者问我…"
        hint="Enter 记下 · 支持「明天 18:00」「#标签」"
      />

      {error ? <p className="mp-error" role="status">{error}</p> : null}

      {alert ? (
        <div className="mp-alert" role="status">
          <span className="mp-alert-dot" aria-hidden="true" />
          <div className="mp-alert-body">
            <b>{alert.title}</b>
            <small>{dueLabel(alert.dueAt, now)} 到点了</small>
          </div>
          <button type="button" className="mp-alert-do" onClick={() => onAlertDone(alert)}>完成</button>
          <button type="button" className="mp-alert-later" onClick={() => onAlertSnooze(alert, 10)}>10 分钟</button>
          <button type="button" className="mp-alert-close" onClick={() => onAlertDismiss(alert)} aria-label="今天不提醒">
            <Icon name="close" size={12} />
          </button>
        </div>
      ) : null}

      <div className="mp-views" role="tablist" aria-label="清单视图">
        {[['open', '待办', open.length], ['done', '完成', done.length], ['trash', '回收站', trash.length]].map(([key, label, count]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={view === key}
            data-on={view === key}
            onClick={() => setView(key)}
          >
            {label}<b>{count}</b>
          </button>
        ))}
      </div>

      <div className="mp-list-head">
        <span>{term ? `搜索「${search.trim()}」` : view === 'trash' ? '回收站 · 保留 7 天' : view === 'done' ? '已完成' : '清单'}</span>
        <span className="mp-list-count">{term ? `${shown.length} 条结果` : `${pool.length} 条`}</span>
      </div>

      <ul className="mp-list">
        {shown.length === 0 ? (
          <li className="mp-empty">
            <div className="mp-empty-art" aria-hidden="true"><span /><span /></div>
            <p>{term ? '没搜到。换个词试试？' : view === 'trash' ? '回收站是空的。删掉的备忘会在这里留七天。' : view === 'done' ? '还没有做完的。勾掉一条，它就来这里。' : '还没有备忘。说一句，我替你记着。'}</p>
            {!term && view === 'open' ? (
              <div className="mp-starters">
                {(data.starters ?? []).slice(0, 3).map(text => (
                  <button key={text} type="button" onClick={() => setDraft(text)}>
                    <span aria-hidden="true">＋</span>{text}
                  </button>
                ))}
              </div>
            ) : null}
          </li>
        ) : shown.map(memo => (
          <MemoRow
            key={memo.id}
            memo={memo}
            now={now}
            mode={view}
            busy={busy}
            onToggle={onToggle}
            onRemove={onRemove}
            onPin={onPin}
            onEdit={onEdit}
            onSchedule={onSchedule}
            onRestore={onRestore}
            onPurge={onPurge}
            onOpenLink={onOpenLink}
          />
        ))}
      </ul>

      <footer className="mp-foot">
        <div className="mp-foot-left">
          <button type="button" className="mp-text-btn" onClick={onCopyAll}>
            <Icon name="copy" size={12} />复制清单
          </button>
          {view === 'open' && done.length ? (
            <button type="button" className="mp-text-btn" onClick={onClearDone}>
              归档已完成 {done.length}
            </button>
          ) : null}
          {view === 'trash' && trash.length ? (
            <button type="button" className="mp-text-btn" onClick={() => onPurge(null)}>
              清空回收站
            </button>
          ) : null}
        </div>
        <div className="mp-foot-right">
          <button type="button" className="mp-text-btn mp-quiet" onClick={onReset}>重开对话</button>
          <kbd className="mp-kbd">⌘⇧M</kbd>
        </div>
      </footer>
    </section>
  )
}

/* ------------------------------------------------------------- peek bubble */

export function Peek({
  line, side, onEnter, onLeave, onOpen, count,
  alert, onAlertDone, onAlertSnooze, onAlertDismiss,
}) {
  if (alert) {
    return (
      <div className="mp-peek mp-peek-alert" data-side={side} onPointerEnter={onEnter} onPointerLeave={() => {}}>
        <span className="mp-peek-label">到点了</span>
        <p className="mp-peek-line">{alert.title}</p>
        <div className="mp-peek-foot">
          <button type="button" className="mp-peek-do" onClick={() => onAlertDone(alert)}>完成</button>
          <button type="button" className="mp-peek-snooze" onClick={() => onAlertSnooze(alert, 10)}>10 分钟</button>
          <button type="button" className="mp-peek-dismiss" onClick={() => onAlertDismiss(alert)} aria-label="今天不提醒">
            <Icon name="close" size={12} />
          </button>
        </div>
        <span className="mp-peek-tail" aria-hidden="true" />
      </div>
    )
  }
  return (
    <div
      className="mp-peek"
      data-side={side}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      <p className="mp-peek-line">{line}</p>
      <div className="mp-peek-foot">
        <CopyButton text={line} label="复制" doneLabel="已复制" />
        <button type="button" className="mp-peek-open" onClick={onOpen}>
          {count ? `看这 ${count} 条` : '打开'} <Icon name="arrow" size={12} />
        </button>
      </div>
      <span className="mp-peek-tail" aria-hidden="true" />
    </div>
  )
}

/* -------------------------------------------------------------- settings */

export function PetSettings({ data, onClose, onRename, onQuiet, onClearAll }) {
  const [name, setName] = useState(data.pet?.name ?? '阿墨')
  return (
    <section className="mp-panel mp-settings" aria-label="宠物设置">
      <header className="mp-head">
        <CreatureMark />
        <div className="mp-id"><b>阿墨</b><span className="mp-status">设置</span></div>
        <div className="mp-head-actions">
          <button type="button" className="mp-icon" onClick={onClose} aria-label="关闭"><Icon name="close" size={14} /></button>
        </div>
      </header>
      <div className="mp-set-body">
        <label className="mp-field">
          <span>名字</span>
          <input
            value={name}
            maxLength={12}
            onChange={event => setName(event.target.value)}
            onBlur={() => onRename(name)}
            onKeyDown={event => { if (event.key === 'Enter') onRename(name) }}
          />
        </label>
        <label className="mp-switch">
          <span>
            <b>安静模式</b>
            <small>藏起来，不主动冒出来说话</small>
          </span>
          <input type="checkbox" checked={data.pet?.quiet === true} onChange={event => onQuiet(event.target.checked)} />
          <i aria-hidden="true" />
        </label>
        <div className="mp-set-meta">
          <p>备忘存在 <code>{data.directory}</code></p>
          <p>{data.stats?.open ?? 0} 条待办 · 共 {data.stats?.total ?? 0} 条 · 对话 {data.chat?.turns ?? 0} 轮</p>
          {data.hasModel ? null : <p className="mp-warn">还没选默认模型，阿墨只能记录、不能答话。</p>}
        </div>
        <button type="button" className="mp-danger" onClick={onClearAll}>清空全部备忘与对话</button>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ toast */

export function Toast({ toast, onUndo }) {
  if (!toast) return null
  return (
    <div className="mp-toast" role="status" data-tone={toast.tone ?? 'calm'}>
      <span>{toast.text}</span>
      {toast.undo ? <button type="button" onClick={() => { onUndo(toast.undo); }}>撤销</button> : null}
    </div>
  )
}
