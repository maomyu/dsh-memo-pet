import React, { useCallback, useEffect, useRef, useState } from 'react'

/* ------------------------------------------------------------------ icons */

const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }

export function Icon({ name, size = 15, ...rest }) {
  const common = { width: size, height: size, viewBox: '0 0 20 20', 'aria-hidden': 'true', ...base, ...rest }
  switch (name) {
    case 'send':
      return <svg {...common}><path d="M4.5 10h11M11 5.5 15.5 10 11 14.5" /></svg>
    case 'search':
      return <svg {...common}><circle cx="9" cy="9" r="4.6" /><path d="m12.6 12.6 3 3" /></svg>
    case 'copy':
      return <svg {...common}><rect x="7" y="7" width="8.5" height="8.5" rx="2" /><path d="M12.5 5.2V5a1.6 1.6 0 0 0-1.6-1.6H5.6A1.6 1.6 0 0 0 4 5v5.3c0 .9.7 1.6 1.6 1.6h.2" /></svg>
    case 'check':
      return <svg {...common}><path d="m4.8 10.4 3.4 3.4 7-7.6" /></svg>
    case 'pin':
      return <svg {...common}><path d="M7.2 3.6h5.6l-.7 4.2 2.4 2.5H5.5l2.4-2.5z" /><path d="M10 10.3v6" /></svg>
    case 'trash':
      return <svg {...common}><path d="M4.4 6.2h11.2M8 6.2V4.6c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v1.6M6.4 6.2l.6 9c0 .6.5 1 1 1h4c.5 0 1-.4 1-1l.6-9" /></svg>
    case 'minus':
      return <svg {...common}><path d="M5 10h10" /></svg>
    case 'close':
      return <svg {...common}><path d="m5.6 5.6 8.8 8.8M14.4 5.6l-8.8 8.8" /></svg>
    case 'spark':
      return <svg {...common}><path d="M10 3.4c.6 3 1.9 4.3 4.9 4.9-3 .6-4.3 1.9-4.9 4.9-.6-3-1.9-4.3-4.9-4.9 3-.6 4.3-1.9 4.9-4.9Z" /><path d="M15.2 13.4c.3 1.4.9 2 2.3 2.3-1.4.3-2 .9-2.3 2.3-.3-1.4-.9-2-2.3-2.3 1.4-.3 2-.9 2.3-2.3Z" /></svg>
    case 'clock':
      return <svg {...common}><circle cx="10" cy="10" r="6.4" /><path d="M10 6.4V10l2.6 1.6" /></svg>
    case 'inbox':
      return <svg {...common}><path d="M3.6 10.4 6 4.6h8l2.4 5.8v4.2c0 .6-.4 1-1 1H4.6c-.6 0-1-.4-1-1z" /><path d="M3.8 10.6h3l.8 1.8h4.8l.8-1.8h3" /></svg>
    case 'edit':
      return <svg {...common}><path d="m12.4 4.6 3 3L8 15H5v-3z" /></svg>
    case 'arrow':
      return <svg {...common}><path d="M7 4.8 12.2 10 7 15.2" /></svg>
    default:
      return <svg {...common}><circle cx="10" cy="10" r="6" /></svg>
  }
}

/* ------------------------------------------------------------------- copy */

export async function copyText(text) {
  const value = String(text ?? '')
  if (!value) return false
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value)
      return true
    }
  } catch {}
  try {
    const area = document.createElement('textarea')
    area.value = value
    area.setAttribute('readonly', '')
    area.style.cssText = 'position:fixed;top:-1000px;opacity:0'
    document.body.append(area)
    area.select()
    const ok = document.execCommand('copy')
    area.remove()
    return ok
  } catch {
    return false
  }
}

/** Copy button that confirms in place, then returns to its label. */
export function CopyButton({ text, label = '复制', doneLabel = '已复制', className = '', title, iconOnly = false, onCopied }) {
  const [state, setState] = useState('idle')
  const timer = useRef(0)
  useEffect(() => () => clearTimeout(timer.current), [])
  const onClick = useCallback(async event => {
    event.stopPropagation()
    const ok = await copyText(typeof text === 'function' ? text() : text)
    setState(ok ? 'done' : 'fail')
    if (ok) onCopied?.()
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setState('idle'), 1600)
  }, [text, onCopied])
  const done = state === 'done'
  return (
    <button
      type="button"
      className={`mp-copy ${done ? 'is-done' : ''} ${iconOnly ? 'is-icon' : ''} ${className}`}
      onClick={onClick}
      title={title ?? label}
      aria-label={title ?? label}
      data-state={state}
    >
      <span className="mp-copy-icon">{done ? <Icon name="check" size={13} /> : <Icon name="copy" size={13} />}</span>
      {iconOnly ? null : <span className="mp-copy-label">{done ? doneLabel : state === 'fail' ? '复制失败' : label}</span>}
      <span className="mp-copy-burst" aria-hidden="true" />
    </button>
  )
}

/* --------------------------------------------------------------- utilities */

export function formatTime(timestamp) {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

export function relativeDay(timestamp, now = Date.now()) {
  const day = 86_400_000
  const start = new Date(now); start.setHours(0, 0, 0, 0)
  const other = new Date(timestamp); other.setHours(0, 0, 0, 0)
  const offset = Math.round((other - start) / day)
  if (offset === 0) return '今天'
  if (offset === -1) return '昨天'
  if (offset === 1) return '明天'
  if (offset < 0 && offset > -7) return `${-offset} 天前`
  const d = new Date(timestamp)
  return `${d.getMonth() + 1} 月 ${d.getDate()} 日`
}

export function useLatest(value) {
  const ref = useRef(value)
  ref.current = value
  return ref
}
