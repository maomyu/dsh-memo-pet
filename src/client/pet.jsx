import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const SPRING = { stiffness: 168, damping: 21, mass: 1 }
const SIZE = 132
const HOME = { right: 74, bottom: 150 }

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now())

function prefersReduced() {
  try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches } catch { return false }
}

/** One rAF loop drives position, lean, eyes, blink and the trailing ribbon. */
export function usePetRig({ onDragChange, onSettle, initial }) {
  const float = useRef(null)
  const creature = useRef(null)
  const rig = useRef({
    x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0,
    lean: 0, eyeX: 0, eyeY: 0, blink: 0,
    nextBlink: 0, dragging: false, grabX: 0, grabY: 0,
    pointerX: 0, pointerY: 0, lastInput: now(), wakeUntil: 0,
    mood: 'idle', moodUntil: 0, ready: false, landing: 0,
  }).current

  const place = useCallback((x, y) => {
    rig.x = x
    rig.y = y
    rig.tx = x
    rig.ty = y
    rig.vx = 0
    rig.vy = 0
    if (float.current) float.current.style.transform = `translate3d(${x - SIZE / 2}px, ${y - SIZE / 2}px, 0)`
  }, [rig])

  const setTarget = useCallback((x, y) => {
    rig.tx = clamp(x, 58, window.innerWidth - 58)
    rig.ty = clamp(y, 60, window.innerHeight - 54)
  }, [rig])

  const wake = useCallback(() => {
    rig.lastInput = now()
  }, [rig])

  const pulse = useCallback((mood = 'happy', ms = 900) => {
    rig.mood = mood
    rig.moodUntil = now() + ms
  }, [rig])

  const setMood = useCallback((mood, ms = 0) => {
    rig.mood = mood
    rig.moodUntil = ms ? now() + ms : 0
  }, [rig])

  /* initial placement: saved point, else bottom-right */
  useEffect(() => {
    const x = initial?.x ?? window.innerWidth - HOME.right - SIZE / 2
    const y = initial?.y ?? window.innerHeight - HOME.bottom - SIZE / 2
    place(clamp(x, 58, window.innerWidth - 58), clamp(y, 60, window.innerHeight - 54))
  }, [initial, place])

  /* one loop; idle when the tab is hidden */
  useEffect(() => {
    if (prefersReduced()) {
      const node = creature.current
      if (node) {
        node.style.setProperty('--mp-eye-x', '0px')
        node.style.setProperty('--mp-eye-y', '0px')
      }
      return undefined
    }
    let raf = 0
    let last = now()
    let alive = true
    const loop = () => {
      if (!alive) return
      const t = now()
      const dt = Math.min(0.034, Math.max(0.001, (t - last) / 1000))
      last = t
      const r = rig
      const node = creature.current
      const stage = float.current

      if (r.dragging) {
        // follow the pointer a touch behind: the pet feels held, not nailed
        const k = 1 - Math.pow(0.0016, dt)
        r.x += (r.tx - r.x) * k
        r.y += (r.ty - r.y) * k
      } else {
        const ax = (r.tx - r.x) * SPRING.stiffness - r.vx * SPRING.damping
        const ay = (r.ty - r.y) * SPRING.stiffness - r.vy * SPRING.damping
        r.vx += ax * dt
        r.vy += ay * dt
        r.x += r.vx * dt
        r.y += r.vy * dt
        const minX = 58
        const maxX = window.innerWidth - 58
        const minY = 60
        const maxY = window.innerHeight - 54
        if (r.x < minX) { r.x = minX; r.vx = Math.abs(r.vx) * 0.42 }
        if (r.x > maxX) { r.x = maxX; r.vx = -Math.abs(r.vx) * 0.42 }
        if (r.y < minY) { r.y = minY; r.vy = Math.abs(r.vy) * 0.42 }
        if (r.y > maxY) { r.y = maxY; r.vy = -Math.abs(r.vy) * 0.42 }
      }

      if (stage) stage.style.transform = `translate3d(${r.x - SIZE / 2}px, ${r.y - SIZE / 2}px, 0)`
      if (!node) {
        raf = requestAnimationFrame(loop)
        return
      }

      const speed = Math.hypot(r.vx, r.vy)
      const idleMs = t - r.lastInput
      if (r.moodUntil && t > r.moodUntil) { r.mood = 'idle'; r.moodUntil = 0 }
      if (r.mood === 'idle') {
        if (idleMs < 60) r.mood = 'listening'
        else if (idleMs > 32000 && !r.dragging) r.mood = 'dozing'
        else if (idleMs > 9000) r.mood = 'idle'
      }

      // pointer-relative gaze, with a slow drift so it never looks frozen
      const px = (r.pointerX || r.x) - r.x
      const py = (r.pointerY || r.y) - r.y
      const dist = Math.max(1, Math.hypot(px, py))
      const gazeX = clamp((px / dist) * Math.min(3.6, dist / 26), -3.6, 3.6)
      const gazeY = clamp((py / dist) * Math.min(2.8, dist / 30), -2.8, 2.8)
      const driftX = Math.sin(t / 3400) * 0.9
      const driftY = Math.cos(t / 4100) * 0.6
      r.eyeX += (gazeX + driftX - r.eyeX) * Math.min(1, dt * 9)
      r.eyeY += (gazeY + driftY - r.eyeY) * Math.min(1, dt * 9)

      // lean follows horizontal momentum, capped so it stays a creature
      const leanTarget = clamp(r.vx * 0.012, -7.5, 7.5)
      r.lean += (leanTarget - r.lean) * Math.min(1, dt * 7)

      // blink scheduling
      if (!r.nextBlink) r.nextBlink = t + 2200 + Math.random() * 3200
      let blink = 0
      if (t > r.nextBlink) {
        const phase = (t - r.nextBlink) / 150
        blink = phase < 0.5 ? phase * 2 : Math.max(0, 2 - phase * 2)
        if (phase >= 1) {
          r.nextBlink = t + 2400 + Math.random() * 4200
          blink = 0
        }
      }

      const squash = clamp(speed / 1400, 0, 0.11)
      const breath = Math.sin(t / 2400) * 0.5 + 0.5
      const tailLag = clamp(-r.vx * 0.016, -12, 12)
      const antenna = clamp(-r.vx * 0.006 + Math.sin(t / 1700) * 1.6, -7, 7)

      node.style.setProperty('--mp-lean', `${(r.lean + Math.sin(t / 3000) * 0.8).toFixed(2)}deg`)
      node.style.setProperty('--mp-squash', squash.toFixed(3))
      node.style.setProperty('--mp-eye-x', `${r.eyeX.toFixed(2)}px`)
      node.style.setProperty('--mp-eye-y', `${r.eyeY.toFixed(2)}px`)
      node.style.setProperty('--mp-blink', blink.toFixed(3))
      node.style.setProperty('--mp-breath', breath.toFixed(3))
      node.style.setProperty('--mp-tail', `${tailLag.toFixed(2)}px`)
      node.style.setProperty('--mp-antenna', `${antenna.toFixed(2)}deg`)
      node.dataset.mood = r.dragging ? 'held' : r.mood
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
        raf = 0
      } else if (!raf) {
        last = now()
        raf = requestAnimationFrame(loop)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      alive = false
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [rig])

  /* pointer tracking: gaze + waking the pet */
  useEffect(() => {
    const onMove = event => {
      rig.pointerX = event.clientX
      rig.pointerY = event.clientY
      rig.lastInput = now()
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [rig])

  /* drag */
  const onPointerDown = useCallback(event => {
    if (event.button !== 0) return
    const r = rig
    r.dragging = true
    r.grabX = (r.pointerX || event.clientX) - r.x
    r.grabY = (r.pointerY || event.clientY) - r.y
    r.lastInput = now()
    event.currentTarget.setPointerCapture?.(event.pointerId)
    onDragChange?.(true)
  }, [rig, onDragChange])

  const onPointerMove = useCallback(event => {
    const r = rig
    if (!r.dragging) return
    r.tx = clamp(event.clientX - r.grabX, 58, window.innerWidth - 58)
    r.ty = clamp(event.clientY - r.grabY, 60, window.innerHeight - 54)
    r.pointerX = event.clientX
    r.pointerY = event.clientY
  }, [rig])

  const onPointerUp = useCallback(event => {
    const r = rig
    if (!r.dragging) return
    r.dragging = false
    event.currentTarget.releasePointerCapture?.(event.pointerId)
    // throw with inertia, then let the edge pull it home
    const glide = { x: r.x + r.vx * 0.13, y: r.y + r.vy * 0.13 }
    const edge = window.innerWidth
    if (glide.x > edge - 110) glide.x = edge - 70
    else if (glide.x < 110) glide.x = 70
    setTarget(glide.x, glide.y)
    onDragChange?.(false)
    r.lastInput = now()
    onSettle?.({ x: Math.round(r.tx), y: Math.round(r.ty) })
  }, [rig, onDragChange, onSettle, setTarget])

  return { float, creature, rig, place, setTarget, wake, pulse, setMood, onPointerDown, onPointerMove, onPointerUp }
}

/* ---------------------------------------------------------------- creature */

export function Creature({ rig, size = SIZE }) {
  return (
    <div
      ref={rig.creature}
      className="mp-creature"
      style={{ width: size, height: size }}
      data-mood="idle"
      role="img"
      aria-label="备忘精灵阿墨"
    >
      <div className="mp-aura" aria-hidden="true" />
      <svg className="mp-orbit" viewBox="0 0 132 132" aria-hidden="true">
        <ellipse className="mp-ring" cx="66" cy="68" rx="57" ry="21" transform="rotate(-15 66 68)" />
        <g className="mp-mote mp-mote-a"><circle cx="123" cy="68" r="1.7" /></g>
        <g className="mp-mote mp-mote-b"><circle cx="112" cy="68" r="1.2" /></g>
      </svg>
      <svg className="mp-thread" viewBox="0 0 132 132" aria-hidden="true">
        <g className="mp-antenna">
          <path d="M66 37c1.2-7.4 3.6-12.6 8.4-16.2" />
          <circle cx="75.4" cy="19.4" r="3.4" className="mp-tip" />
          <circle cx="75.4" cy="19.4" r="7" className="mp-tip-halo" />
        </g>
        <g className="mp-ribbon">
          <path d="M84 94c9.4 3 15.6 9.4 18.6 19" className="mp-r1" />
          <path d="M88 101c6.2 2 10.4 6 12.4 12.4" className="mp-r2" />
        </g>
      </svg>

      <div className="mp-body">
        <div className="mp-gloss" aria-hidden="true" />
        <div className="mp-rim" aria-hidden="true" />
        <div className="mp-face">
          <div className="mp-eye mp-eye-left"><i /></div>
          <div className="mp-eye mp-eye-right"><i /></div>
          <div className="mp-cheek mp-cheek-left" aria-hidden="true" />
          <div className="mp-cheek mp-cheek-right" aria-hidden="true" />
          <div className="mp-mouth" aria-hidden="true" />
        </div>
      </div>
      <div className="mp-zzz" aria-hidden="true"><span>z</span><span>z</span></div>
    </div>
  )
}

/* ------------------------------------------------------------------- perch */

/**
 * The hidden entrance: a hairline tab on the edge the pet went to. Hovering
 * it wakes the pet into a peek; clicking opens the panel.
 */
export function Perch({ edge = 'right', top = 0.42, count = 0, onPeek, onOpen, expanded, label }) {
  const [hot, setHot] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => clearTimeout(timer.current), [])

  const enter = () => {
    clearTimeout(timer.current)
    setHot(true)
    onPeek?.(true)
  }
  const leave = () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setHot(false)
      onPeek?.(false)
    }, 260)
  }

  return (
    <button
      type="button"
      className={`mp-perch is-${edge} ${hot || expanded ? 'is-hot' : ''}`}
      style={{ top: `calc(${(top * 100).toFixed(2)}% - 46px)` }}
      onPointerEnter={enter}
      onPointerLeave={leave}
      onFocus={enter}
      onBlur={leave}
      onClick={onOpen}
      aria-label={label ?? '打开备忘精灵'}
      title={`${label ?? '备忘精灵'} · ${count} 条`}
    >
      <span className="mp-perch-rail" aria-hidden="true" />
      <span className="mp-perch-dots" aria-hidden="true"><i /><i /><i /></span>
      {count > 0 ? <span className="mp-perch-count" aria-hidden="true">{count > 99 ? '99+' : count}</span> : null}
    </button>
  )
}
