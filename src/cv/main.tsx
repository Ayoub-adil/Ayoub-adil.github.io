import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter-tight'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource/instrument-serif/400-italic.css'
import '../styles.css'
import './cv.css'
import { academic, certifications, education, experience, featured, hero, isTodo, profile, skills } from '../content/content'
import { T } from '../components/ui'

// Same data as the site. Print to PDF from the browser (A4, no margins).

function H({ children }: { children: string }) {
  return <h2 className="cv-h">{children}</h2>
}

function CV() {
  return (
    <>
      <div className="no-print fixed right-4 top-4 z-10 flex gap-2">
        <a href="/" className="rounded-[4px] border border-[#0a0d12]/20 bg-white px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#0a0d12]">
          ← Site
        </a>
        <button onClick={() => window.print()} className="rounded-[4px] bg-signal px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ink">
          Print / Save PDF
        </button>
      </div>

      <article className="sheet">
        <header className="flex items-center gap-5 border-b border-[#0a0d12]/15 pb-4">
          <img src="/img/ayoub-600.webp" alt="" className="h-[22mm] w-[22mm] rounded-full object-cover object-[50%_20%]" />
          <div className="flex-1">
            <h1 className="text-[26pt] font-medium leading-none tracking-tight">{profile.name}</h1>
            <p className="mt-1.5 text-[12pt]">
              {hero.title[0]} <span className="accent text-[13.5pt] text-[#c24a22]">{hero.title[1]}</span>
            </p>
          </div>
          <ul className="text-right font-mono text-[7.6pt] leading-relaxed">
            <li>{profile.location}</li>
            <li>{isTodo(profile.email) ? <T>{profile.email}</T> : profile.email}</li>
            <li>{profile.linkedin.replace('https://www.', '')}</li>
            <li>{profile.github.replace('https://', '')}</li>
          </ul>
        </header>

        <p className="mt-3.5 text-[9pt] leading-relaxed">{hero.lede}</p>

        <div className="mt-4 grid grid-cols-[1fr_58mm] gap-7">
          <div>
            <H>Experience</H>
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
                      <span className="shrink-0 font-mono text-[7pt] text-[#5b6470]">
                        {r.from} – {r.to}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <H>Selected industrial projects · R&D Vision</H>
            {featured.map((p) => (
              <div key={p.id} className="mb-2 break-inside-avoid">
                <div className="flex justify-between gap-3 text-[8.9pt]">
                  <b className="font-semibold">{p.title}</b>
                  <span className="shrink-0 font-mono text-[7pt] text-[#5b6470]">
                    {p.status} · {p.year}
                  </span>
                </div>
                <p className="text-[8pt] leading-snug">
                  <span className="italic text-[#5b6470]">{p.client}.</span> {p.did.join(', ')}.{' '}
                  <span className="font-mono text-[6.9pt] text-[#5b6470]">{p.stack.join(' · ')}</span>
                </p>
              </div>
            ))}

            <H>Academic & personal projects</H>
            {academic.map((a) => (
              <p key={a.id} className="mb-1 text-[8pt] leading-snug">
                <b className="font-semibold">{a.title}</b> <span className="text-[#5b6470]">· {a.context} · {a.year}</span>{' '}
                <span className="font-mono text-[6.9pt] text-[#5b6470]">{a.stack.join(' · ')}</span>
              </p>
            ))}
          </div>

          <aside>
            <H>Education</H>
            {education.map((e) => (
              <div key={e.title} className="mb-2 text-[8.2pt] leading-snug">
                <p className="font-mono text-[7pt] text-[#c24a22]">{e.years}</p>
                <p className="font-semibold">{e.title}</p>
                <p className="text-[#5b6470]">{e.org}</p>
              </div>
            ))}

            <H>Skills</H>
            {Object.entries(skills).map(([k, v]) => (
              <div key={k} className="mb-1.5">
                <p className="font-mono text-[6.6pt] uppercase tracking-wider text-[#c24a22]">{k}</p>
                <p className="text-[8pt] leading-snug">{v.join(', ')}</p>
              </div>
            ))}

            <H>Languages</H>
            {profile.languages.map((l) => (
              <p key={l.name} className="flex justify-between text-[8.2pt]">
                {l.name} <T>{l.level}</T>
              </p>
            ))}

            <H>Certifications</H>
            {certifications.map((c) => (
              <p key={c} className="text-[8pt]">
                {c}
              </p>
            ))}
          </aside>
        </div>
      </article>
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CV />
  </StrictMode>,
)
