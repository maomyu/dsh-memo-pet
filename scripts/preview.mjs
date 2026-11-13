import { mkdir, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { spawn } from 'node:child_process'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const require = createRequire(join(root, 'package.json'))

function resolve(id) {
  try { return require.resolve(id) } catch {}
  throw new Error(`${id} is not installed. Run \`npm install\` first.`)
}

// React and esbuild come from the local devDependencies; the preview runs the
// real client code against an in-memory host.
const nodePaths = []
const esbuildPath = resolve('esbuild')

const { build } = await import(pathToFileURL(esbuildPath).href)
const result = await build({
  entryPoints: [join(root, 'preview/entry.jsx')],
  bundle: true,
  write: false,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  charset: 'utf8',
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  loader: { '.css': 'text', '.svg': 'dataurl' },
  nodePaths,
  define: { 'process.env.NODE_ENV': '"development"' },
  logLevel: 'warning',
  absWorkingDir: root,
})
await mkdir(join(root, 'preview'), { recursive: true })
await writeFile(join(root, 'preview/bundle.js'), result.outputFiles[0].text)

const html = `<!doctype html>
<html lang="zh-CN" data-theme="${process.env.THEME ?? 'dark'}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>备忘精灵 · 预览</title>
<style>
  :root {
    --dsw-alias-bg-base: #16161a;
    --dsw-alias-bg-layer-1: #1e1e24;
    --dsw-alias-bg-layer-2: #26262e;
    --dsw-alias-bg-overlay: #1b1b21;
    --dsw-alias-border-l1: rgba(255, 255, 255, 0.10);
    --dsw-alias-border-l2: rgba(255, 255, 255, 0.20);
    --dsw-alias-label-primary: #f2f1f4;
    --dsw-alias-label-secondary: #b3b1ba;
    --dsw-alias-label-tertiary: #7e7c87;
    --dsw-alias-state-error-primary: #ff6b6b;
    --dsw-alias-brand-primary: #6f8cff;
    color-scheme: dark;
  }
  html[data-theme="light"] {
    --dsw-alias-bg-base: #f7f5f2;
    --dsw-alias-bg-layer-1: #fffefc;
    --dsw-alias-bg-layer-2: #f1eee9;
    --dsw-alias-bg-overlay: #fffefc;
    --dsw-alias-border-l1: rgba(20, 16, 12, 0.10);
    --dsw-alias-border-l2: rgba(20, 16, 12, 0.22);
    --dsw-alias-label-primary: #221f1b;
    --dsw-alias-label-secondary: #5d5850;
    --dsw-alias-label-tertiary: #8c867c;
    --dsw-alias-state-error-primary: #d2453a;
    color-scheme: light;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; height: 100%; }
  body {
    background:
      radial-gradient(120% 90% at 78% 0%, color-mix(in oklab, var(--dsw-alias-bg-layer-2) 70%, transparent), transparent 60%),
      var(--dsw-alias-bg-base);
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", system-ui, sans-serif;
    color: var(--dsw-alias-label-primary);
    overflow: hidden;
  }
  .app { display: flex; height: 100vh; font-size: 13px; }
  .rail {
    width: 232px; flex: 0 0 auto; padding: 18px 14px;
    background: color-mix(in oklab, var(--dsw-alias-bg-layer-1) 70%, transparent);
    border-right: 1px solid var(--dsw-alias-border-l1);
  }
  .rail h1 { font-size: 13px; margin: 0 0 18px; font-weight: 600; letter-spacing: .02em; }
  .rail .row { height: 30px; border-radius: 8px; display: flex; align-items: center; padding: 0 9px; color: var(--dsw-alias-label-secondary); margin-bottom: 2px; }
  .rail .row.on { background: color-mix(in oklab, var(--dsw-alias-bg-layer-2) 90%, transparent); color: var(--dsw-alias-label-primary); }
  .main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
  .top { height: 48px; display: flex; align-items: center; padding: 0 22px; border-bottom: 1px solid var(--dsw-alias-border-l1); font-size: 12.5px; color: var(--dsw-alias-label-secondary); }
  .chat { flex: 1; padding: 32px 8%; overflow: hidden; }
  .msg { max-width: 620px; margin: 0 auto 18px; line-height: 1.7; color: var(--dsw-alias-label-secondary); }
  .msg strong { color: var(--dsw-alias-label-primary); font-weight: 600; display: block; margin-bottom: 4px; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; }
  .composer { margin: 0 auto 26px; width: min(680px, 84%); height: 74px; border-radius: 14px; border: 1px solid var(--dsw-alias-border-l1); background: color-mix(in oklab, var(--dsw-alias-bg-layer-1) 86%, transparent); }
  .mp-host { position: fixed; inset: 0; pointer-events: none; }
  .mp-host > * { pointer-events: auto; }
</style>
</head>
<body>
  <div class="app">
    <aside class="rail">
      <h1>DeepSeek Harness</h1>
      <div class="row on">备忘精灵 · 设计预览</div>
      <div class="row">新会话</div>
      <div class="row">工作室</div>
      <div class="row">插件</div>
      <div class="row">设置</div>
    </aside>
    <div class="main">
      <div class="top">会话 / 备忘精灵</div>
      <div class="chat">
        <div class="msg"><strong>你</strong>把今天的琐事都记下来，我一会儿回来看。</div>
        <div class="msg"><strong>DeepSeek</strong>好，我记在备忘精灵里了。窗口右下角那只小东西会替你盯着时间。</div>
        <div class="composer"></div>
      </div>
    </div>
  </div>
  <script>const q=new URLSearchParams(location.search);if(q.get("theme"))document.documentElement.dataset.theme=q.get("theme")</script>
<script type="module" src="./bundle.js"></script>
</body>
</html>`
await writeFile(join(root, 'preview/index.html'), html)

const port = Number(process.env.PORT ?? 4173)
await mkdir(join(root, 'preview'), { recursive: true })
const server = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'], {
  cwd: join(root, 'preview'),
  stdio: 'ignore',
  detached: false,
})
console.log(`preview: http://127.0.0.1:${port}/index.html?mode=${process.env.MODE ?? 'open'}&theme=${process.env.THEME ?? 'dark'}`)
if (process.env.SERVE !== '0') {
  await new Promise(resolve => setTimeout(resolve, 500))
  console.log('serving (ctrl-c to stop)')
  process.on('SIGINT', () => { server.kill(); process.exit(0) })
  await new Promise(() => {})
} else {
  server.kill()
}
