import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, readFile, readdir, symlink, mkdir, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

/**
 * The host half imports the Harness packages the app provides. This test wires
 * minimal stand-ins into node_modules, then imports src/host.js for real and
 * drives the remote service end to end (store, memos, suggestions, chat guard).
 */
async function loadHost() {
  const scope = join(root, 'node_modules/@deepseek-ai')
  await mkdir(scope, { recursive: true })
  const links = {
    'cordis': 'cordis',
    'dsh-typert-protocol': 'typert-protocol',
    'dsh-tools': 'dsh-tools',
    'dsh-llm': 'dsh-llm',
  }
  for (const [name, stub] of Object.entries(links)) {
    const link = join(scope, name)
    if (!existsSync(link)) await symlink(join(root, 'test/stubs', stub), link, 'dir')
  }
  const { default: MemoPet } = await import('../src/host.js')
  const { Service } = await import('@deepseek-ai/cordis')
  return { MemoPet, Service }
}

function makeContext() {
  const registered = []
  const prompts = []
  const agent = {
    id: 'agent-1',
    ctx: { tools: { register(tool) { registered.push(tool); return () => {} }, get() { return undefined } } },
  }
  const ctx = {
    logger: { warn() {}, info() {} },
    effect(fn) {
      const dispose = fn()
      return () => { if (typeof dispose === 'function') dispose() }
    },
    inject(names, fn) {
      const scope = {
        agents: { list: () => [agent], create: async () => {} },
        on() { return () => {} },
        systemPrompt: { context(section) { prompts.push(section) } },
        dispose() {},
      }
      const result = fn(scope)
      return { dispose: typeof result === 'function' ? result : () => {} }
    },
    get() { return undefined },
    agentDefaultModel: { currentSelection: () => ({}) },
    sessions: { flush: async () => true },
    agents: {
      async create() { throw Object.assign(new Error('no factory'), { code: 'test' }) },
      async resume() { throw Object.assign(new Error('no factory'), { code: 'test' }) },
      list: () => [],
    },
    tools: {
      register(tool) { registered.push(tool); return () => {} },
      get() { return undefined },
    },
  }
  return { ctx, registered, prompts }
}

test('host service records, reads back and survives a restart', async () => {
  const { MemoPet, Service } = await loadHost()
  const dir = await mkdtemp(join(tmpdir(), 'memo-pet-host-'))
  try {
    const { ctx, registered } = makeContext()
    const pet = new MemoPet(ctx, { directory: dir })
    await pet[Service.init]()
    assert.equal(registered.length, 1, 'the memo_pet tool mounts on every agent')

    const boot = await pet.request({ op: 'bootstrap' })
    assert.equal(boot.memos.length, 0)
    assert.ok(Array.isArray(boot.lines) && boot.lines.length)
    assert.equal(boot.stats.open, 0)

    const added = await pet.request({ op: 'say', text: '明天下午三点 牙医复查 #生活' })
    assert.equal(added.kind, 'memo')
    assert.equal(added.memo.title, '牙医复查')
    assert.deepEqual(added.memo.tags, ['生活'])
    assert.equal(added.stats.open, 1)
    assert.match(added.reply, /记下了/)

    const duplicate = await pet.request({ op: 'say', text: '明天下午三点 牙医复查 #生活' })
    assert.equal(duplicate.duplicate, true)
    assert.equal(duplicate.memos.length, 1)

    const toggled = await pet.request({ op: 'memo/toggle', id: added.memo.id })
    assert.equal(toggled.stats.done, 1)
    assert.equal(toggled.stats.open, 0)

    const updated = await pet.request({ op: 'memo/update', id: added.memo.id, patch: { title: '牙医（改约）', pinned: true } })
    assert.equal(updated.memos[0].title, '牙医（改约）')
    assert.equal(updated.memos[0].pinned, true)

    const exported = await pet.request({ op: 'memo/export' })
    assert.match(exported.text, /牙医（改约）/)

    const positioned = await pet.request({ op: 'pet/update', patch: { position: { x: 900, y: 700 }, edge: 'right' } })
    assert.deepEqual(positioned.pet.position, { x: 900, y: 700 })

    // a new process must read the same file
    const { ctx: ctx2 } = makeContext()
    const again = new MemoPet(ctx2, { directory: dir })
    await again[Service.init]()
    const reborn = await again.request({ op: 'bootstrap' })
    assert.equal(reborn.memos.length, 1)
    assert.equal(reborn.memos[0].title, '牙医（改约）')
    assert.deepEqual(reborn.pet.position, { x: 900, y: 700 })

    const removed = await again.request({ op: 'memo/remove', id: reborn.memos[0].id })
    assert.equal(removed.memos.length, 0)

    const saved = JSON.parse(await readFile(join(dir, 'state.json'), 'utf8'))
    assert.equal(saved.memos.length, 0)
    const backups = (await readdir(dir)).filter(name => name.includes('broken'))
    assert.equal(backups.length, 0, 'a healthy file is never renamed')
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

test('host tool ops work from an ordinary conversation', async () => {
  const { MemoPet, Service } = await loadHost()
  const dir = await mkdtemp(join(tmpdir(), 'memo-pet-tool-'))
  try {
    const { ctx } = makeContext()
    const pet = new MemoPet(ctx, { directory: dir })
    await pet[Service.init]()
    const tool = pet.tool
    assert.equal(tool.name, 'memo_pet')

    assert.match(await tool.execute({ op: 'add', text: '周五前把方案发出去 #工作' }), /记下了/)
    const list = await tool.execute({ op: 'list' })
    assert.match(list, /把方案发出去/)
    assert.match(list, /\d{1,2}月\d{1,2}日\s\d{2}:\d{2}/, 'the due time is shown')

    const again = await tool.execute({ op: 'add', text: '周五前把方案发出去 #工作' })
    assert.match(again, /已经在清单里/)

    assert.match(await tool.execute({ op: 'done', id: '1' }), /标成做完了/)
    assert.match(await tool.execute({ op: 'list', done: true }), /\[x\]/)
    assert.match(await tool.execute({ op: 'reopen', id: '1' }), /放回清单/)
    assert.match(await tool.execute({ op: 'update', id: '1', title: '把方案提前发出去' }), /改好了/)
    assert.match(await tool.execute({ op: 'export' }), /备忘清单/)
    assert.match(await tool.execute({ op: 'remove', id: '1' }), /删掉了/)
    assert.match(await tool.execute({ op: 'list' }), /还没有/)
    assert.match(await tool.execute({ op: 'nope' }), /没能完成/)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

test('asking a question without a model fails with a useful message', async () => {
  const { MemoPet, Service } = await loadHost()
  const dir = await mkdtemp(join(tmpdir(), 'memo-pet-chat-'))
  try {
    const { ctx } = makeContext()
    const pet = new MemoPet(ctx, { directory: dir })
    await pet[Service.init]()
    await assert.rejects(
      () => pet.request({ op: 'say', text: '我今天先做什么？' }),
      error => /模型/.test(error.message) && error.code === 'no-model',
    )
    assert.equal((await pet.request({ op: 'bootstrap' })).memos.length, 0, 'a question is not stored as a memo')
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

test('a corrupt state file is set aside instead of crashing', async () => {
  const { MemoPet, Service } = await loadHost()
  const dir = await mkdtemp(join(tmpdir(), 'memo-pet-corrupt-'))
  try {
    const { writeFile } = await import('node:fs/promises')
    await writeFile(join(dir, 'state.json'), '{ not json')
    const { ctx } = makeContext()
    const pet = new MemoPet(ctx, { directory: dir })
    await pet[Service.init]()
    const boot = await pet.request({ op: 'bootstrap' })
    assert.equal(boot.memos.length, 0)
    const files = await readdir(dir)
    assert.ok(files.some(name => name.startsWith('state.json.broken-')), 'the broken file is kept for inspection')
    assert.match(await pet.request({ op: 'say', text: '重新开始' }).then(r => r.reply), /记下了/)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

test('a relative directory resolves under home, an absolute one is kept', async () => {
  const { MemoPet, Service } = await loadHost()
  const { ctx, registered } = makeContext()
  const relative = new MemoPet(ctx, { directory: 'memo-pet-test/notes' })
  assert.equal(relative.directory, join(process.env.HOME, 'memo-pet-test/notes'))
  const absolute = new MemoPet(ctx, { directory: '/tmp/memo-pet-absolute' })
  assert.equal(absolute.directory, '/tmp/memo-pet-absolute')
  assert.equal(registered.length, 0, 'tools mount during init, not construction')
  await relative[Service.init]()
  assert.equal(registered.length, 1, 'the tool lands on every live agent once initialised')
  await rm('/tmp/memo-pet-absolute', { recursive: true, force: true })
  await rm(join(process.env.HOME, 'memo-pet-test'), { recursive: true, force: true })
})
