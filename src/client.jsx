import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { PACKAGE, SERVICE, descriptors } from './typert.js'
import css from './styles.css'
import { copyText, useLatest } from './client/shared.jsx'
import { Creature, Perch, usePetRig } from './client/pet.jsx'
import { Panel, Peek, PetSettings, Toast } from './client/panel.jsx'

export const inject = ['slots', 'remote']

const INJECT = inject
const POLL_MS = 700
const PET_HALF = 66
const PANEL_FALLBACK = { width: 392, height: 566 }
const SAY_TTL = 45_000

function viewport() {
  return { w: window.innerWidth, h: window.innerHeight }
}

/** Where the panel wants to sit, in viewport coordinates. */
function computePlacement(petX, petY, size, vw, vh) {
  if (vw < 720) return { side: 'sheet', x: 10, y: Math.max(10, vh - size.height - 10) }
  const side = petX > vw / 2 ? 'left' : 'right'
  const rawX = side === 'left' ? petX - PET_HALF - 20 - size.width : petX + PET_HALF + 20
  const x = Math.min(Math.max(12, rawX), Math.max(12, vw - size.width - 12))
  // the pet sits near the lower corner of its own card, like it is holding it
  const y = Math.min(Math.max(14, petY - size.height + 152), Math.max(14, vh - size.height - 14))
  return { side, x, y }
}

function homeFor(edge, vw, vh) {
  return edge === 'left' ? { x: 70, y: vh - 170 } : { x: vw - 70, y: vh - 170 }
}

/* ---------------------------------------------------------------- transport */

function createClient(scope) {
  return async function request(input) {
    let response
    try {
      response = await scope.remote[SERVICE].request(input)
    } catch (reason) {
      throw Object.assign(new Error(reason?.message || '连接中断，请稍后再试。'), { code: reason?.code || 'transport' })
    }
    const failure = !response?.ok ? (response?.value?.error ?? response?.error ?? {}) : response?.value?.error
    if (!response?.ok || failure) {
      throw Object.assign(new Error(failure?.message || '操作没完成，再试一次。'), { code: failure?.code || 'unavailable' })
    }
    return response.value
  }
}

/* -------------------------------------------------------------------- stage */

function Stage({ request, ctx }) {
  const [data, setData] = useState(null)
  const [open, setOpen] = useState(false)
  const [peek, setPeek] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [petPos, setPetPos] = useState(null)
  const [draft, setDraft] = useState('')
  const [thinking, setThinking] = useState(false)
  const [say, setSay] = useState('')
  const [error, setError] = useState('')
  const [toast, setToast] = useState(null)
  const [settings, setSettings] = useState(false)
  const [alert, setAlert] = useState(null)
  const [search, setSearch] = useState('')
  const [busy, setBusy] = useState(false)
  const [size, setSize] = useState(PANEL_FALLBACK)
  const [vie, setVie] = useState(() => viewport())
  const openLink = useCallback(url => {
    const target = String(url ?? '')
    if (!/^https?:\/\//i.test(target)) return
    const sidebar = ctx?.get?.('sidebarRight')
    const tabs = ctx?.get?.('sidebarRightTabs')
    if (sidebar?.openTab && (typeof tabs?.get !== 'function' || tabs.get('browser'))) {
      try {
        sidebar.openTab('browser', { params: { url: target } })
        // The panel floats above the right column; fold it so the new tab is visible.
        setOpen(false)
        return
      } catch (error) {
        console.error('MEMO_PET_LINK_TAB_FAILED', error)
      }
    }
    try { window.open(target, '_blank', 'noopener,noreferrer') } catch (error) {
      console.error('MEMO_PET_LINK_OPEN_FAILED', error)
    }
  }, [ctx])

  const shell = useRef(null)
  const toastTimer = useRef(0)
  const pollTimer = useRef(0)
  const sayTimer = useRef(0)

  const dataRef = useLatest(data)
  const openRef = useLatest(open)

  const showToast = useCallback((text, extra = {}) => {
    setToast({ text, ...extra })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), extra.undo ? 6500 : 2200)
  }, [])

  useEffect(() => () => {
    clearTimeout(toastTimer.current)
    clearTimeout(sayTimer.current)
    clearTimeout(pollTimer.current)
  }, [])

  /* ---------------------------------------------------------------- rig */

  const onDragChange = useCallback(value => setDragging(value), [])

  const onSettle = useCallback(async ({ x, y }) => {
    setPetPos({ x, y })
    const edge = x > window.innerWidth / 2 ? 'right' : 'left'
    try {
      const result = await request({ op: 'pet/update', patch: { position: { x, y }, edge } })
      setData(current => current ? { ...current, pet: result.pet } : current)
    } catch {}
  }, [request])

  const initial = data?.pet?.position ?? null
  const rig = usePetRig({ onDragChange, onSettle, initial })

  useEffect(() => {
    if (data && !petPos) setPetPos({ x: rig.rig.x, y: rig.rig.y })
  }, [data, petPos, rig])

  /* reminders: ask the host every half minute; the peek card carries the nudge */
  useEffect(() => {
    let alive = true
    const check = async () => {
      try {
        const result = await request({ op: 'alerts' })
        if (!alive || !result?.alert) return
        setAlert(result.alert)
        rig.pulse('alert', 1400)
        if (!openRef.current) setPeek(true)
      } catch {}
    }
    check()
    const timer = setInterval(check, 30_000)
    return () => { alive = false; clearInterval(timer) }
  }, [request, rig, openRef])

  useEffect(() => {
    const onResize = () => {
      const next = viewport()
      setVie(next)
      const r = rig.rig
      rig.setTarget(Math.min(r.x, next.w - 58), Math.min(r.y, next.h - 54))
      setPetPos({ x: Math.min(r.x, next.w - 58), y: Math.min(r.y, next.h - 54) })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [rig])

  /* the panel is measured so the placement can keep it on screen */
  useEffect(() => {
    const node = shell.current
    if (!node) return undefined
    const measure = () => {
      const rect = node.getBoundingClientRect()
      if (rect.width > 40) {
        const next = { width: Math.round(rect.width), height: Math.round(rect.height) }
        setSize(current => current.width === next.width && current.height === next.height ? current : next)
      }
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [data, open, settings, thinking, say, search])

  /* ------------------------------------------------------------ lifecycle */

  const refresh = useCallback(async () => {
    const next = await request({ op: 'bootstrap' })
    setData(next)
    return next
  }, [request])

  useEffect(() => {
    let alive = true
    refresh().catch(reason => {
      if (alive) setError(reason?.message ?? '备忘精灵没有起来。')
    })
    return () => { alive = false }
  }, [refresh])

  const placePetAtPerch = useCallback(() => {
    const { w, h } = viewport()
    const home = dataRef.current?.pet?.position ?? homeFor(dataRef.current?.pet?.edge ?? 'right', w, h)
    rig.setTarget(home.x, home.y)
  }, [rig, dataRef])

  const openPanel = useCallback(() => {
    setPeek(false)
    setOpen(true)
    setError('')
    const { w, h } = viewport()
    const home = dataRef.current?.pet?.position ?? homeFor(dataRef.current?.pet?.edge ?? 'right', w, h)
    rig.wake()
    rig.setTarget(home.x, home.y)
    setPetPos({ x: rig.rig.x, y: rig.rig.y })
    request({ op: 'pet/update', patch: { collapsed: false, touch: true } }).catch(() => {})
  }, [rig, request, dataRef])

  const closePanel = useCallback(() => {
    setOpen(false)
    setPeek(false)
    setSettings(false)
    setError('')
    request({ op: 'pet/update', patch: { collapsed: true, touch: true } }).catch(() => {})
  }, [request])

  const togglePanel = useCallback(() => {
    if (openRef.current) closePanel()
    else openPanel()
  }, [openRef, closePanel, openPanel])

  useEffect(() => {
    const onKey = event => {
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && (event.key === 'm' || event.key === 'M')) {
        event.preventDefault()
        togglePanel()
        return
      }
      if (event.key === 'Escape' && openRef.current) closePanel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [togglePanel, openRef, closePanel])

  useEffect(() => {
    if (!open) return undefined
    const onDown = event => {
      if (!event.target?.closest?.('.mp-panel, .mp-grab, .mp-perch, .mp-peek, .mp-toast')) closePanel()
    }
    document.addEventListener('pointerdown', onDown, true)
    return () => document.removeEventListener('pointerdown', onDown, true)
  }, [open, closePanel])

  /* ------------------------------------------------------------ mutations */

  const sayNow = useCallback(text => {
    setSay(String(text ?? '').slice(0, 1400))
    clearTimeout(sayTimer.current)
    sayTimer.current = setTimeout(() => setSay(''), SAY_TTL)
  }, [])

  const poll = useCallback((startCursor, sessionId) => {
    let cursor = startCursor
    const tick = async () => {
      try {
        const result = await request({ op: 'chat/poll', cursor, sessionId })
        if (Number.isInteger(result.cursor) && result.cursor > cursor) cursor = result.cursor
        const latest = [...(result.messages ?? [])].reverse().find(item => item.role === 'assistant')
        if (latest?.text) sayNow(latest.text)
        if (!result.running) {
          setThinking(false)
          if (result.error) setError(result.error)
          try { await refresh() } catch {}
          return
        }
        pollTimer.current = setTimeout(tick, POLL_MS)
      } catch (reason) {
        setThinking(false)
        setError(reason?.message ?? '没有收到回复。')
      }
    }
    clearTimeout(pollTimer.current)
    pollTimer.current = setTimeout(tick, POLL_MS)
  }, [request, sayNow, refresh])

  const send = useCallback(async () => {
    const text = draft.trim()
    if (!text || busy) return
    setDraft('')
    setError('')
    setSay('')
    rig.wake()
    setBusy(true)
    try {
      const result = await request({ op: 'say', text })
      if (result.kind === 'memo') {
        setData(current => current ? {
          ...current,
          memos: result.memos,
          stats: result.stats,
          suggestions: result.suggestions,
          lines: result.lines,
          now: result.now,
        } : current)
        sayNow(result.reply)
        rig.pulse(effectFor(result))
        showToast(result.duplicate ? '这条已经有了' : '记下了')
      } else {
        setThinking(true)
        poll(result.cursor, result.sessionId)
      }
    } catch (reason) {
      setError(reason?.message ?? '没发出去。')
      setDraft(text)
    } finally {
      setBusy(false)
    }
  }, [draft, busy, rig, request, sayNow, showToast, poll])

  const run = useCallback(async (op, payload, after) => {
    setBusy(true)
    try {
      const result = await request({ op, ...payload })
      if (result?.memos) setData(current => current ? { ...current, ...result } : current)
      after?.(result)
      return result
    } catch (reason) {
      showToast(reason?.message ?? '没完成')
      return null
    } finally {
      setBusy(false)
    }
  }, [request, showToast])

  const onToggle = useCallback(memo => {
    rig.pulse(memo.done ? 'listening' : 'happy', 700)
    run('memo/toggle', { id: memo.id })
  }, [run, rig])

  const onRemove = useCallback(async memo => {
    const result = await run('memo/remove', { id: memo.id })
    if (result) {
      rig.pulse('held', 500)
      showToast('移到回收站了，七天内都能恢复')
    }
  }, [run, rig, showToast])

  const undo = useCallback(async extra => {
    setToast(null)
    await run('memo/add', { text: extra.title, dueAt: extra.dueAt ?? null, tags: extra.tags ?? [] })
    showToast('放回来了')
  }, [run, showToast])

  const onPin = useCallback(memo => {
    run('memo/update', { id: memo.id, patch: { pinned: !memo.pinned } })
  }, [run])

  const onEdit = useCallback((memo, patch) => {
    run('memo/update', { id: memo.id, patch })
  }, [run])

  const onSchedule = useCallback((memo, text) => {
    run('memo/schedule', { id: memo.id, text })
  }, [run])

  const onRestore = useCallback(memo => {
    run('memo/restore', { id: memo.id })
  }, [run])

  const onPurge = useCallback(memo => {
    run('memo/purge', { id: memo?.id ?? '' })
  }, [run])

  const onAct = useCallback(action => {
    if (action?.kind === 'move-today') run('memo/bulk-due', { ids: action.ids, text: '今天 18:00' })
  }, [run])

  const dropAlert = useCallback(() => setAlert(null), [])

  const alertDone = useCallback(memo => {
    setAlert(null)
    run('memo/toggle', { id: memo.id })
  }, [run])

  const alertSnooze = useCallback((memo, minutes) => {
    setAlert(null)
    run('memo/snooze', { id: memo.id, minutes })
  }, [run])

  const alertDismiss = useCallback(memo => {
    setAlert(null)
    const now = new Date()
    const next = new Date(now)
    next.setDate(now.getDate() + 1)
    next.setHours(9, 0, 0, 0)
    const minutes = Math.max(60, Math.round((next.getTime() - now.getTime()) / 60_000))
    run('memo/snooze', { id: memo.id, minutes })
  }, [run])

  const onClearDone = useCallback(() => { run('memo/clear-done', {}) }, [run])

  const onCopyAll = useCallback(async () => {
    try {
      const result = await request({ op: 'memo/export' })
      const ok = await copyText(result.text)
      showToast(ok ? '清单复制好了' : '复制没成功，再点一次')
    } catch (reason) {
      showToast(reason?.message ?? '复制失败')
    }
  }, [request, showToast])

  const onResetChat = useCallback(async () => {
    setBusy(true)
    try {
      await request({ op: 'chat/reset' })
      setSay('')
      setThinking(false)
      showToast('对话重开了，备忘还在')
    } catch (reason) {
      showToast(reason?.message ?? '没完成')
    } finally {
      setBusy(false)
    }
  }, [request, showToast])

  const onClearAll = useCallback(async () => {
    setBusy(true)
    try {
      await request({ op: 'memo/clear-all' })
      const next = await refresh()
      setData(next)
      setSay('')
      setThinking(false)
      setSettings(false)
      showToast('全部清空了')
    } catch (reason) {
      showToast(reason?.message ?? '没完成')
    } finally {
      setBusy(false)
    }
  }, [request, refresh, showToast])

  const onRename = useCallback(async name => {
    const clean = String(name ?? '').trim().slice(0, 12)
    if (!clean) return
    const result = await request({ op: 'pet/update', patch: { name: clean } })
    setData(current => current ? { ...current, pet: result.pet } : current)
  }, [request])

  const onQuiet = useCallback(async value => {
    const result = await request({ op: 'pet/update', patch: { quiet: value } })
    setData(current => current ? { ...current, pet: result.pet } : current)
  }, [request])

  /* ----------------------------------------------------------- derived */

  const stats = data?.stats ?? { open: 0, overdue: 0, dueToday: 0, total: 0 }
  const line = useMemo(() => {
    if (say) return say
    const lines = data?.lines ?? []
    if (!lines.length) return '我先坐在这儿。想到什么，说一句就行。'
    const bucket = Math.floor(Date.now() / 60000)
    return lines[bucket % lines.length]
  }, [say, data])

  const edge = data?.pet?.edge ?? 'right'
  const anchor = petPos ?? homeFor(edge, vie.w, vie.h)
  const placement = useMemo(
    () => computePlacement(anchor.x, anchor.y, size, vie.w, vie.h),
    [anchor, size, vie],
  )
  // .mp-float sits exactly on the pet's centre; children are laid out from it
  const offset = { x: placement.x - anchor.x, y: placement.y - anchor.y }

  const perchTop = useMemo(() => {
    const y = anchor.y
    return Math.min(0.84, Math.max(0.14, y / Math.max(1, vie.h)))
  }, [anchor, vie])

  const mode = open ? 'open' : peek ? 'peek' : 'closed'

  return (
    <div
      className="mp-root"
      data-mode={mode}
      data-side={placement.side}
      data-dragging={dragging ? 'true' : 'false'}
    >
      <div className="mp-layer">
        <div
          ref={rig.float}
          className="mp-float"
          data-hidden={mode === 'closed' || (open && placement.side === 'sheet') ? 'true' : 'false'}
        >
          <div
            className="mp-grab"
            onPointerDown={event => { rig.onPointerDown(event); rig.wake() }}
            onPointerMove={rig.onPointerMove}
            onPointerUp={rig.onPointerUp}
            onPointerCancel={rig.onPointerUp}
            onDoubleClick={openPanel}
            onClick={() => { if (!open) openPanel() }}
            role="button"
            tabIndex={0}
            aria-label="阿墨，点一下打开备忘"
            onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openPanel() } }}
          >
            <Creature rig={rig} />
          </div>

          {open ? (
            <div
              ref={shell}
              className="mp-panel-shell"
              data-side={placement.side}
              style={{ left: `${offset.x}px`, top: `${offset.y}px` }}
            >
              {settings && data ? (
                <PetSettings
                  data={data}
                  onClose={() => setSettings(false)}
                  onRename={onRename}
                  onQuiet={onQuiet}
                  onClearAll={onClearAll}
                />
              ) : data ? (
                <Panel
                  data={data}
                  placement={placement}
                  line={line}
                  thinking={thinking}
                  suggestions={search ? [] : (data.suggestions ?? [])}
                  busy={busy}
                  error={error}
                  draft={draft}
                  setDraft={setDraft}
                  onSend={send}
                  onClose={closePanel}
                  onToggle={onToggle}
                  onRemove={onRemove}
                  onPin={onPin}
                  onEdit={onEdit}
                  onOpenLink={openLink}
                  onSchedule={onSchedule}
                  onRestore={onRestore}
                  onPurge={onPurge}
                  onAct={onAct}
                  alert={alert}
                  onAlertDone={alertDone}
                  onAlertSnooze={alertSnooze}
                  onAlertDismiss={alertDismiss}
                  onCopyAll={onCopyAll}
                  onClearDone={onClearDone}
                  onReset={onResetChat}
                  search={search}
                  setSearch={setSearch}
                  onSettings={() => setSettings(true)}
                />
              ) : (
                <div className="mp-panel mp-loading"><span className="mp-typing"><i /><i /><i /></span></div>
              )}
            </div>
          ) : null}

          {!open && peek && data ? (
            <Peek
              line={say || (data.lines?.[0] ?? line)}
              side={edge}
              count={stats.open}
              alert={alert}
              onAlertDone={alertDone}
              onAlertSnooze={alertSnooze}
              onAlertDismiss={alertDismiss}
              onEnter={() => setPeek(true)}
              onLeave={() => { if (!alert) setPeek(false) }}
              onOpen={() => { setPeek(false); openPanel() }}
            />
          ) : null}
        </div>

        {mode !== 'open' ? (
          <Perch
            edge={edge}
            top={perchTop}
            count={stats.open}
            expanded={peek}
            onPeek={value => {
              setPeek(value)
              if (value) placePetAtPerch()
            }}
            onOpen={openPanel}
            label={`打开备忘精灵 · ${data?.pet?.name ?? '阿墨'}`}
          />
        ) : null}
      </div>
      <Toast toast={toast} onUndo={undo} />
    </div>
  )
}

function effectFor(result) {
  if (result.duplicate) return 'listening'
  if (result.memo?.dueAt) return 'alert'
  return 'happy'
}

/* -------------------------------------------------------------- bootstrap */

async function install(ctx) {
  const style = document.createElement('style')
  style.dataset.memoPet = 'true'
  style.textContent = css
  document.head.append(style)
  ctx.effect(() => () => style.remove())

  const unmount = await ctx.remote.$mount({ package: PACKAGE, descriptors })
  const mounted = ctx.inject(['remote.' + SERVICE], scoped => {
    const request = createClient(scoped)
    scoped.effect(() => scoped.slots.inject('shell.overlay', () => scoped.slots.register({
      name: 'shell.overlay',
      id: 'memo-pet',
      order: 70,
    }, () => <Stage request={request} ctx={scoped} />)), 'memo-pet: overlay')
  })
  try {
    await mounted
  } catch (error) {
    console.error('MEMO_PET_INSTALL_FAILED', error && (error.stack || error.message || String(error)))
    await mounted.dispose?.()
    await unmount?.()
    throw error
  }
  return async () => {
    await mounted.dispose?.()
    await unmount?.()
  }
}

install.inject = INJECT
export const apply = install
export default install
