// Render the CV page to the downloadable PDF (A4, one page, clickable links).
//   npm run dev                       (in another terminal)
//   npm run cv:pdf [-- --url http://localhost:5173]
// Writes public/Ayoub-ADIL-CV-<EN|FR|DE|AR>.pdf. Re-run it whenever the CV content changes, before deploying.
// Needs a Chromium-based browser (BROWSER env, default: Edge).
import { chromium } from 'playwright-core'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(import.meta.url), '../..')
const LANGS = ['en', 'fr', 'de', 'ar']
const args = process.argv.slice(2)
const urlIdx = args.indexOf('--url')
const base = urlIdx >= 0 ? args[urlIdx + 1] : 'http://localhost:5173'
const browserPath = process.env.BROWSER ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'

const browser = await chromium.launch({ executablePath: browserPath })
let failed = false
for (const lang of LANGS) {
  const out = join(ROOT, `public/Ayoub-ADIL-CV-${lang.toUpperCase()}.pdf`)
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 } })
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto(`${base}/cv/?lang=${lang}`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  if (errors.length) {
    console.error(`[${lang}] CV page errors:`, errors)
    failed = true
    continue
  }
  const pdf = await page.pdf({ path: out, format: 'A4', printBackground: true, margin: { top: 0, bottom: 0, left: 0, right: 0 } })
  await page.close()
  const pages = (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length
  console.log(`${out}: ${pages} page(s)${pages !== 1 ? '  <- WARNING: no longer fits on one A4 page' : ''}`)
  if (pages !== 1) failed = true
}
await browser.close()
if (failed) process.exit(1)
