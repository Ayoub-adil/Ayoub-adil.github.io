// Dev-only page to review every point cloud and card visual without scrolling.
// Served by `npm run dev` at /dev/clouds/ ; not part of the production build.
// Delete dev/ and src/dev/ once the renders are final.
import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter-tight'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource/instrument-serif/400-italic.css'
import '../styles.css'
import Stage from '../three/Stage'
import { field } from '../three/store'
import { featured, steps } from '../content/content'
import { ProjectVisual } from '../components/visuals/Visuals'

const STAGES = [{ n: '00', label: 'Head (hero)' }, ...steps.map((s, i) => ({ n: String(i + 1).padStart(2, '0'), label: `${s.verb} ${s.object}` }))]

function Clouds() {
  const [m, setM] = useState(0)
  const [play, setPlay] = useState(false)

  useEffect(() => {
    field.dim = 0
    field.morph = m
  }, [m])

  useEffect(() => {
    if (!play) return
    const t = setInterval(() => setM((v) => (Math.round(v) + 1) % STAGES.length), 5000)
    return () => clearInterval(t)
  }, [play])

  return (
    <>
      <div className="fixed inset-0">
        <Stage active mobile={false} />
      </div>
      <aside className="fixed left-4 top-4 z-10 w-80 rounded-lg border border-line bg-ink/85 p-4 backdrop-blur">
        <p className="label mb-3">Point clouds · dev only</p>
        <ul className="space-y-1">
          {STAGES.map((s, i) => (
            <li key={s.n}>
              <button
                onClick={() => {
                  setPlay(false)
                  setM(i)
                }}
                className={`w-full rounded px-2 py-1.5 text-left text-sm ${Math.round(m) === i ? 'bg-signal text-ink' : 'text-paper/80 hover:bg-paper/10'}`}
              >
                <span className="mr-2 font-mono text-xs opacity-70">{s.n}</span>
                {s.label}
              </button>
            </li>
          ))}
        </ul>
        <label className="label mt-4 block">Morph {m.toFixed(2)}</label>
        <input
          type="range"
          min={0}
          max={STAGES.length - 1}
          step={0.01}
          value={m}
          onChange={(e) => {
            setPlay(false)
            setM(+e.target.value)
          }}
          className="mt-2 w-full accent-[var(--color-signal)]"
        />
        <div className="mt-3 flex gap-2">
          <button onClick={() => setPlay((p) => !p)} className="rounded border border-line px-3 py-1.5 font-mono text-xs uppercase text-paper hover:border-paper">
            {play ? 'Pause' : 'Play all'}
          </button>
          <a href="#cards" className="rounded border border-line px-3 py-1.5 font-mono text-xs uppercase text-paper hover:border-paper">
            Card visuals ↓
          </a>
        </div>
      </aside>

      <section id="cards" className="relative z-10 mt-[100svh] bg-ink p-8">
        <p className="label mb-6">Card visuals (SVG) · dev only</p>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((p, i) => (
            <figure key={p.id} className="overflow-hidden rounded-lg border border-line">
              <div className="aspect-[16/10] bg-ink">{p.visual && <ProjectVisual kind={p.visual} />}</div>
              <figcaption className="border-t border-line p-3 text-sm">
                <span className="mr-2 font-mono text-xs text-signal">B{i + 1}</span>
                {p.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Clouds />
  </StrictMode>,
)
