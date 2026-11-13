import { readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const file = join(root, 'dist', 'client.js')

const info = await stat(file).catch(() => null)
if (!info) {
  console.error('dist/client.js is missing — run `npm run build` first.')
  process.exit(1)
}
const text = await readFile(file, 'utf8')
const checks = [
  [text.startsWith('window.__ModuleLoader__.load({id:\'dsh-memo-pet\''), 'module loader wrapper'],
  [text.includes('dsh-memo-pet'), 'package id'],
  [text.includes('shell.overlay'), 'overlay slot'],
  [text.includes('mp-creature'), 'creature styles'],
  [text.includes('memoPet'), 'remote service'],
  [info.size > 40_000, 'bundle has the styles and components'],
]
let failed = 0
for (const [ok, label] of checks) {
  if (!ok) {
    failed += 1
    console.error(`check-dist: missing ${label}`)
  }
}
if (failed) process.exit(1)
console.log(`check-dist ok (${(info.size / 1024).toFixed(1)} kB)`)
