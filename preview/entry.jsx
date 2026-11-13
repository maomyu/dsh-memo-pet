import React from 'react'
import { createRoot } from 'react-dom/client'
import { apply } from '../src/client.jsx'
import { createMock } from './mock.js'

const params = new URLSearchParams(location.search)
const mode = params.get('mode') ?? 'open'

const mock = createMock({ empty: mode === 'empty' })
let Overlay = null

const opened = []
const ctx = {
  get(name) {
    if (name === 'sidebarRight') {
      return {
        openTab(kind, options) { opened.push({ kind, url: options?.params?.url }) },
      }
    }
    if (name === 'sidebarRightTabs') return { get: id => (id === 'browser' ? {} : undefined) }
    return undefined
  },
  effect(fn) {
    const dispose = fn()
    return () => { if (typeof dispose === 'function') dispose() }
  },
  inject(names, fn) {
    return fn(ctx)
  },
  remote: {
    $mount: async () => async () => {},
    memoPet: {
      async request(input) {
        try {
          return { ok: true, value: await mock.request(input) }
        } catch (error) {
          return { ok: false, value: { error: { code: error?.code ?? 'error', message: error?.message ?? String(error) } } }
        }
      },
    },
  },
  slots: {
    inject(name, fn) { return fn(ctx) },
    register(options, component) {
      if (options.name === 'shell.overlay') Overlay = component
      return () => {}
    },
  },
}

await apply(ctx)

const host = document.createElement('div')
host.className = 'mp-host'
document.body.append(host)
const root = createRoot(host)
root.render(React.createElement(Overlay))

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

if (mode === 'open' || mode === 'settings') {
  await wait(360)
  document.querySelector('.mp-grab')?.click()
}
if (mode === 'settings') {
  await wait(500)
  document.querySelector('.mp-head-actions .mp-icon:nth-child(2)')?.click()
}
if (mode === 'peek') {
  await wait(300)
  const perch = document.querySelector('.mp-perch')
  perch?.dispatchEvent(new PointerEvent('pointerover', { bubbles: true, pointerType: 'mouse' }))
  perch?.dispatchEvent(new PointerEvent('pointerenter', { bubbles: false, pointerType: 'mouse' }))
}
if (mode === 'after-add') {
  await wait(360)
  document.querySelector('.mp-grab')?.click()
  await wait(500)
  const input = document.querySelector('.mp-input')
  if (input) {
    const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set
    setter.call(input, '明天下午三点 牙医复查 #生活')
    input.dispatchEvent(new Event('input', { bubbles: true }))
  }
  await wait(200)
  document.querySelector('.mp-send')?.click()
  await wait(700)
}
if (mode === 'settings') {
  await wait(360)
  document.querySelector('.mp-grab')?.click()
  await wait(400)
  document.querySelectorAll('.mp-head-actions .mp-icon')[1]?.click()
}
if (mode === 'empty') {
  await wait(360)
  document.querySelector('.mp-grab')?.click()
}
if (mode === 'link') {
  await wait(360)
  document.querySelector('.mp-grab')?.click()
  await wait(600)
  document.querySelector('.mp-link')?.click()
  await wait(300)
  document.body.dataset.opened = JSON.stringify(opened)
}

await wait(400)
const rect = selector => {
  const node = document.querySelector(selector)
  if (!node) return null
  const r = node.getBoundingClientRect()
  return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }
}
document.body.dataset.probe = JSON.stringify({
  innerWidth: window.innerWidth,
  innerHeight: window.innerHeight,
  dpr: window.devicePixelRatio,
  panel: rect('.mp-panel'),
  shell: rect('.mp-panel-shell'),
  computed: (() => { const n = document.querySelector('.mp-panel'); return n ? getComputedStyle(n).width : null })(),
  shellLeft: document.querySelector('.mp-panel-shell')?.style.left,
  shellTop: document.querySelector('.mp-panel-shell')?.style.top,
  side: document.querySelector('.mp-root')?.dataset.side,
  clientWidth: document.documentElement.clientWidth,
  viewportWidth: window.visualViewport?.width,
  float: rect('.mp-float'),
  pet: rect('.mp-creature'),
  link: rect('.mp-link'),
  opened,
})
window.__ready = true
