import { mkdir, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')

function resolveEsbuild() {
  const require = createRequire(join(root, 'package.json'))
  const candidates = [
    process.env.ESBUILD_PATH,
    'esbuild',
  ].filter(Boolean)
  for (const candidate of candidates) {
    try { return require.resolve(candidate) } catch {}
  }
  throw new Error('esbuild is not installed. Run `npm install` (or set ESBUILD_PATH) first.')
}

async function bundle(entry, outfile, { format, minify, define } = {}) {
  const { build } = await import(pathToFileURL(resolveEsbuild()).href)
  const result = await build({
    entryPoints: [entry],
    bundle: true,
    write: false,
    format: format ?? 'cjs',
    platform: 'browser',
    target: 'es2022',
    minify: minify ?? true,
    charset: 'utf8',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    external: ['react', 'react-dom'],
    loader: { '.css': 'text', '.svg': 'dataurl' },
    legalComments: 'inline',
    define: define ?? {},
    logLevel: 'warning',
  })
  const text = result.outputFiles[0].text
  await mkdir(dirname(outfile), { recursive: true })
  await writeFile(outfile, text)
  return text
}

const esbuildPath = resolveEsbuild()
process.env.ESBUILD_PATH = esbuildPath

const entry = join(root, 'src/client.jsx')
const body = await bundle(entry, join(root, '.build/client.body.js'))
const client = [
  "window.__ModuleLoader__.load({id:'dsh-memo-pet',factory(require){",
  'const module={exports:{}};let exports=module.exports;',
  body,
  'return module.exports;}});',
].join('\n')
await mkdir(join(root, 'dist'), { recursive: true })
await writeFile(join(root, 'dist/client.js'), client)
console.log(`built dist/client.js (${Buffer.byteLength(client)} bytes)`)
