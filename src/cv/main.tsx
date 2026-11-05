import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter-tight'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource/instrument-serif/400-italic.css'
import '../styles.css'
import './cv.css'
import { education, experience, isTodo, profile, projects, skills } from '../content/content'
import { T } from '../components/ui'

// Same data as the site. Print to PDF from the browser (A4, no margins).
const cvProjects = projects.filter((p) => p.visual)

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
        <header className="flex items-end justify-between border-b border-[#0a0d12]/15 pb-5">
          <div>
            <h1 className="text-[30pt] font-medium leading-none tracking-tight">{profile.name}</h1>
            <p className="mt-2 text-[12.5pt]">
              {profile.role} · <span className="accent text-[14pt]">{profile.focus}</span>
            </p>
          </div>
          <ul className="text-right font-mono text-[8pt] leading-relaxed">
            <li>{profile.location}</li>
            <li>{isTodo(profile.email) ? <T>{profile.email}</T> : profile.email}</li>
            <li>{profile.linkedin.replace('https://www.', '')}</li>
            <li>{profile.github.replace('https://', '')}</li>
          </ul>
        </header>

        <p className="mt-5 text-[9.5pt] leading-relaxed">
          Software engineer building 3D and computer-vision software for industrial systems: LiDAR and depth cameras, point clouds, synchronised acquisition and
          the operator interfaces that run in production.
        </p>

        <div className="mt-6 grid grid-cols-[1fr_15rem] gap-8">
          <div>
            <h2 className="cv-h">Experience</h2>
            {experience.map((x) => (
              <div key={x.from} className="mb-2.5">
                <div className="flex justify-between text-[9.5pt]">
                  <b className="font-semibold">
                    {x.title} · {x.org}
                  </b>
                  <span className="font-mono text-[7.5pt] text-[#5b6470]">
                    {x.from} – {x.to}
                  </span>
                </div>
                <p className="text-[8.5pt] text-[#5b6470]">{x.note}</p>
              </div>
            ))}

            <h2 className="cv-h mt-5">Selected projects</h2>
            {cvProjects.map((p) => (
              <div key={p.id} className="mb-3 break-inside-avoid">
                <div className="flex justify-between gap-3 text-[9.5pt]">
                  <b className="font-semibold">{p.title}</b>
                  <span className="shrink-0 font-mono text-[7.5pt] text-[#5b6470]">
                    {p.status} · {p.year}
                  </span>
                </div>
                <p className="text-[8.3pt] italic text-[#5b6470]">
                  {p.client}
                  {p.role && ` · ${p.role}`}
                </p>
                <p className="mt-0.5 text-[8.6pt] leading-snug">{p.summary}</p>
                <p className="mt-0.5 font-mono text-[7.3pt] text-[#5b6470]">{p.stack.join(' · ')}</p>
              </div>
            ))}
          </div>

          <aside>
            <h2 className="cv-h">Skills</h2>
            {Object.entries(skills).map(([k, v]) => (
              <div key={k} className="mb-3">
                <p className="font-mono text-[7pt] uppercase tracking-wider text-[#c24a22]">{k}</p>
                <p className="text-[8.6pt] leading-snug">{v.join(', ')}</p>
              </div>
            ))}

            <h2 className="cv-h mt-5">Education</h2>
            {education.map((e, i) => (
              <div key={i} className="mb-2.5 text-[8.6pt]">
                <p className="font-semibold">
                  <T>{e.title}</T>
                </p>
                <p className="text-[#5b6470]">
                  {e.org} · <T>{e.years}</T>
                </p>
              </div>
            ))}

            <h2 className="cv-h mt-5">Languages</h2>
            {profile.languages.map((l) => (
              <p key={l.name} className="flex justify-between text-[8.6pt]">
                {l.name} <T>{l.level}</T>
              </p>
            ))}

            <h2 className="cv-h mt-5">Lab</h2>
            <p className="text-[8.6pt] leading-snug">
              CAD viewer: build123d part exported with B-rep topology, face / edge picking in three.js. Online on the portfolio.
            </p>
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
