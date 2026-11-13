import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const out = join(root, 'docs/shots')
const bin = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const CHROME_FLAGS = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--headless',
  '--disable-gpu',
  '--in-process-gpu',
  '--disable-software-rasterizer',
  '--hide-scrollbars',
  '--force-prefers-reduced-motion',
]
const base = process.env.BASE ?? 'http://127.0.0.1:4173/index.html'

const shots = [
  { name: 'open-dark', query: '?mode=open&theme=dark', size: [1440, 900] },
  { name: 'peek-dark', query: '?mode=peek&theme=dark', size: [1440, 900] },
  { name: 'closed-dark', query: '?mode=closed&theme=dark', size: [1440, 900] },
  { name: 'open-light', query: '?mode=open&theme=light', size: [1440, 900] },
  { name: 'empty-dark', query: '?mode=empty&theme=dark', size: [1440, 900] },
  { name: 'after-add', query: '?mode=after-add&theme=dark', size: [1440, 900] },
  { name: 'mobile-open', query: '?mode=open&theme=dark', size: [390, 844] },
]

await mkdir(out, { recursive: true })

function run(shot) {
  return new Promise(resolve => {
    const target = join(out, `${shot.name}.png`)
    const args = [
      ...CHROME_FLAGS,
      '--force-device-scale-factor=2',
      `--window-size=${shot.size[0]},${shot.size[1]}`,
      '--virtual-time-budget=6000',
      `--screenshot=${target}`,
      base + shot.query,
    ]
    const child = spawn(bin, args, { stdio: ['ignore', 'pipe', 'pipe'] })
    let stderr = ''
    child.stderr.on('data', chunk => { stderr += chunk.toString() })
    child.on('close', code => {
      const problems = stderr
        .split('\n')
        .filter(line => /Uncaught|TypeError|ReferenceError|CONSOLE.*error/i.test(line) && !/DevTools/i.test(line))
      resolve({ name: shot.name, code, problems, target })
    })
  })
}

const results = []
for (const shot of shots) results.push(await run(shot))
let failed = false
for (const result of results) {
  if (result.code !== 0 || result.problems.length) {
    failed = true
    console.error(`${result.name}: exit ${result.code} ${result.problems.join(' | ')}`)
  } else {
    console.log(`${result.name} ok`)
  }
}
if (failed) process.exitCode = 1
