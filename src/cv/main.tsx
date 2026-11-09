import { StrictMode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter-tight'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource-variable/noto-sans-arabic'
import '../styles.css'
import './cv.css'
import { isTodo } from '../content/content'
import { T } from '../components/ui'
import LangSwitcher from '../components/LangSwitcher'
import { LangProvider, useLang, type Content } from '../i18n'

// Same data as the site. Print to PDF from the browser (A4, no margins).

function H({ children }: { children: string }) {
  return <h2 className="cv-h">{children}</h2>
}

const cvTitle = (c: Content) => `${c.ui.nav.cv} · ${c.name}`

function CV() {
  const { lang, c } = useLang()
  const { academic, education, experience, hero, profile, projects, skills, status, ui } = c
  const inner = useRef<HTMLDivElement>(null)

  // On every visit: a line-scan sweep reveals the sheet (like a line-scan camera building an image).
  // Also replayed on a language switch. Never with reduced motion, never in print (see cv.css).
  const [scan] = useState(() => !matchMedia('(prefers-reduced-motion: reduce)').matches)
  // Back/forward can restore the page from the browser cache without reloading it: replay the scan then too
  const [visit, setVisit] = useState(0)
  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => e.persisted && setVisit((v) => v + 1)
    addEventListener('pageshow', onShow)
    return () => removeEventListener('pageshow', onShow)
  }, [])

  // Longer languages (FR, DE) would spill onto a second page: when printing, the sheet is scaled
  // down just enough to fit one A4 page (210 x 297 mm, 12 mm vertical padding in print).
  useLayoutEffect(() => {
    let alive = true
    const fit = () => {
      const h = inner.current?.offsetHeight ?? 0
      const available = ((297 - 2 * 12) / 25.4) * 96 - 2 // px at 96 dpi, small safety margin
      const f = h > available ? Math.floor((available / h) * 1000) / 1000 : 1
      if (alive) document.documentElement.style.setProperty('--cv-fit', String(f))
    }
    fit()
    document.fonts.ready.then(fit)
    return () => {
      alive = false
    }
  }, [lang])
  return (
    // Two parts on screen: the toolbar on top, and below it the viewer, which scrolls on its own
    // (both directions). The toolbar never moves and never covers the sheet. Print shows the sheet only.
    <div className="cv-app">
      <div className="no-print relative z-10 shrink-0 border-b border-[#0a0d12]/10">
        <div className="mx-auto flex max-w-[210mm] flex-wrap justify-end gap-2 px-4 py-3 sm:px-0">
        <a href="/" className="rounded-[4px] border border-[#0a0d12]/20 bg-white px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#0a0d12]">
          <span className="inline-block rtl:-scale-x-100">←</span> {ui.cv.site}
        </a>
        <button
          onClick={() => window.print()}
          className="rounded-[4px] border border-[#0a0d12]/20 bg-white px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#0a0d12]"
        >
          {ui.cv.print}
        </button>
        {/* pre-rendered per language by tools/cv_pdf.mjs (npm run cv:pdf) */}
        <a
          href={`/Ayoub-ADIL-CV-${lang.toUpperCase()}.pdf`}
          download
          className="rounded-[4px] bg-signal px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ink"
        >
          {ui.cv.download}
        </a>
        <LangSwitcher tone="light" />
        </div>
      </div>
      <main className="cv-view">

      {/* a new key remounts the sheet, which replays the scan: on each visit and on each language switch */}
      <article key={`${visit}-${lang}`} className={scan ? 'sheet sheet-in' : 'sheet'}>
        <div ref={inner} className={scan ? 'cv-scan' : undefined}>
        <header className="flex items-center gap-5 border-b border-[#0a0d12]/15 pb-4">
          {/* whole photo at the circle's width: the head stays complete, the circle only hides the straight cut at the bottom */}
          <div className="h-[23mm] w-[23mm] shrink-0 overflow-hidden rounded-full">
            <img src="/img/ayoub-cutout-600.webp" alt="" className="block h-auto w-full" />
          </div>
          <div className="flex-1">
            <h1 className="text-[26pt] font-medium leading-none tracking-tight">{profile.name}</h1>
            <p className="mt-1.5 text-[12pt]">
              {hero.title[0]} <span className="accent text-[13.5pt] text-[#a8740a]">{hero.title[1]}</span>
            </p>
          </div>
          <ul className="text-end font-mono text-[7.6pt] leading-relaxed">
            <li>{profile.location}</li>
            <li>
              {isTodo(profile.email) ? (
                <T>{profile.email}</T>
              ) : (
                <a href={`mailto:${profile.email}`} dir="ltr" className="hover:text-[#a8740a] hover:underline">
                  {profile.email}
                </a>
              )}
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" dir="ltr" className="hover:text-[#a8740a] hover:underline">
                {profile.linkedin.replace('https://www.', '')}
              </a>
            </li>
            {/* only in the printed / PDF version: on screen the "← Site" button already leads there */}
            <li className="hidden print:list-item">
              <a href={`${profile.site}?lang=${lang}`} dir="ltr" className="font-semibold">
                {profile.site.replace('https://', '').replace(/\/$/, '')}
              </a>
            </li>
          </ul>
        </header>

        <p className="mt-3 text-[8.8pt] leading-snug">{hero.lede}</p>

        <div className="mt-4 grid grid-cols-[1fr_58mm] gap-7">
          <div>
            <H>{ui.cv.experience}</H>
            {experience.map((j) => (
              <div key={j.org} className="mb-2.5 break-inside-avoid">
                <div className="flex justify-between gap-3 text-[9.2pt]">
                  <b className="font-semibold">{j.org}</b>
                  <span className="shrink-0 font-mono text-[7.2pt] text-[#5b6470]">
                    {j.from} – {j.to}
                  </span>
                </div>
                <ul className="mt-0.5 text-[8.3pt]">
                  {j.roles.map((r) => (
                    <li key={r.title + r.from} className="flex justify-between gap-3">
                      <span>
                        {r.title}
                        {r.note && <span className="text-[#5b6470]"> · {r.note}</span>}
                      </span>
                      {j.roles.length > 1 && (
                        <span className="shrink-0 font-mono text-[7pt] text-[#5b6470]">
                          {r.from} – {r.to}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="mt-1 text-[8.2pt] leading-snug">{j.summary}</p>
              </div>
            ))}

            <H>{ui.cv.industrial}</H>
            {projects
              .filter((p) => p.id !== 'slam-tunnels')
              .map((p) => (
                <div key={p.id} className="mb-1 break-inside-avoid">
                  <div className="flex justify-between gap-3 text-[8.7pt]">
                    <b className="font-semibold">{p.title}</b>
                    <span className="shrink-0 font-mono text-[6.8pt] text-[#5b6470]">
                      {status(p.status)} · {p.year}
                    </span>
                  </div>
                  <p className="text-[7.9pt] leading-snug">
                    <span className="italic text-[#5b6470]">{p.client}.</span> {p.did.join(' · ')}.{' '}
                    <span className="whitespace-nowrap font-mono text-[6.7pt] text-[#5b6470]">{p.stack.join(' · ')}</span>
                  </p>
                </div>
              ))}

            <H>{ui.cv.academic}</H>
            {projects
              .filter((p) => p.id === 'slam-tunnels')
              .map((p) => (
                <p key={p.id} className="mb-1 text-[8pt] leading-snug">
                  <b className="font-semibold">{p.title}</b> <span className="text-[#5b6470]">· {p.client} · 03/2024 – 08/2024</span>
                  <span className="block">
                    {p.did.join(' · ')}. <span className="font-mono text-[6.7pt] text-[#5b6470]">{p.stack.join(' · ')}</span>
                  </span>
                </p>
              ))}
            {academic.map((a) => (
              <p key={a.id} className="mb-1 text-[8pt] leading-snug">
                <b className="font-semibold">{a.title}</b> <span className="text-[#5b6470]">· {a.context} · {a.year}</span>
{' '}
                <span className="font-mono text-[6.7pt] text-[#5b6470]">{a.stack.join(' · ')}</span>
              </p>
            ))}
          </div>

          <aside>
            <H>{ui.cv.education}</H>
            {education.map((e) => (
              <div key={e.title} className="mb-2 text-[8.2pt] leading-snug">
                <p className="font-mono text-[7pt] text-[#a8740a]">{e.years}</p>
                <p className="font-semibold">{e.title}</p>
                <p className="text-[#5b6470]">{e.org}</p>
              </div>
            ))}

            <H>{ui.cv.skills}</H>
            {Object.entries(skills).map(([k, v]) => (
              <div key={k} className="mb-1.5">
                <p className="font-mono text-[6.6pt] uppercase tracking-wider text-[#a8740a]">{k}</p>
                <p className="text-[8pt] leading-snug">{v.join(', ')}</p>
              </div>
            ))}

            <H>{ui.cv.languages}</H>
            {profile.languages.map((l) => (
              <p key={l.name} className="flex justify-between text-[8.2pt]">
                <span>{l.name}</span>
                <span className="text-[#5b6470]">
                  <T>{l.level}</T>
                </span>
              </p>
            ))}
          </aside>
        </div>
        </div>
      </article>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider title={cvTitle}>
      <CV />
    </LangProvider>
  </StrictMode>,
)
