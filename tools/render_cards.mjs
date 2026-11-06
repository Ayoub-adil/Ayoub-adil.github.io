// Render the project-card videos from the dev card page.
//   npm run dev                       (in another terminal)
//   node tools/render_cards.mjs [id ...] [--url http://localhost:5173]
// Writes public/img/cards/<id>.mp4 and <id>.jpg (poster). Needs a Chromium-based
// browser (BROWSER env, default: Edge) and ffmpeg (FFMPEG env, default: the one
// bundled with imageio-ffmpeg in tools/.venv, else `ffmpeg` on PATH).
import { chromium } from 'playwright-core'
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const ROOT = join(import.meta.dirname, '..')
const OUT = join(ROOT, 'public', 'img', 'cards')
const FPS = 24
const LOOP = 8

const args = process.argv.slice(2)
const urlIdx = args.indexOf('--url')
const base = urlIdx >= 0 ? args[urlIdx + 1] : 'http://localhost:5173'
const allIds = [...readFileSync(join(ROOT, 'src/dev/cardScenes.ts'), 'utf8').matchAll(/id: '([\w-]+)'/g)].map((m) => m[1])
const ids = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--url')
const todo = ids.length ? ids : allIds

const browserPath = process.env.BROWSER ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
const venvFF = join(ROOT, 'tools/.venv/Lib/site-packages/imageio_ffmpeg/binaries')
const ffmpeg = process.env.FFMPEG ?? (existsSync(venvFF) ? join(venvFF, readdirSync(venvFF).find((f) => f.startsWith('ffmpeg'))) : 'ffmpeg')

mkdirSync(OUT, { recursive: true })
const browser = await chromium.launch({ executablePath: browserPath, args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader'] })
const page = await browser.newPage({ viewport: { width: 960, height: 600 } })

for (const id of todo) {
  const dir = join(tmpdir(), `card-${id}`)
  rmSync(dir, { recursive: true, force: true })
  mkdirSync(dir, { recursive: true })
  await page.goto(`${base}/dev/card/?id=${id}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  await page.evaluate(() => (window.__capturing = true))
  const canvas = page.locator('canvas')
  const frames = FPS * LOOP
  for (let f = 0; f < frames; f++) {
    await page.evaluate((t) => new Promise((res) => { window.__frame(t); requestAnimationFrame(() => requestAnimationFrame(res)) }), f / FPS)
    await canvas.screenshot({ path: join(dir, `f${String(f).padStart(4, '0')}.png`) })
    if (f % 48 === 0) process.stdout.write(`${id}: ${f}/${frames}\r`)
  }
  const run = (a) => spawnSync(ffmpeg, ['-y', '-loglevel', 'error', ...a], { stdio: 'inherit' })
  // point clouds compress poorly: 720 px wide and CRF 30 keeps a card around 0.6 MB
  run(['-framerate', String(FPS), '-i', join(dir, 'f%04d.png'), '-vf', 'scale=720:-2:flags=lanczos', '-c:v', 'libx264', '-preset', 'veryslow', '-crf', '30', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', join(OUT, `${id}.mp4`)])
  run(['-i', join(dir, 'f0000.png'), '-vf', 'scale=720:-2:flags=lanczos', '-q:v', '4', join(OUT, `${id}.jpg`)])
  rmSync(dir, { recursive: true, force: true })
  console.log(`${id}: done`)
}
await browser.close()
