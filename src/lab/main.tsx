import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter-tight'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource/instrument-serif/400-italic.css'
import '../styles.css'
import partSource from '../../cad/part.py?raw'
import CadViewer from './CadViewer'
import Code from './Code'
import { Mark } from '../components/Nav'
import { hasWebGL } from '../three/store'

function Lab() {
  const [showCode, setShowCode] = useState(false)
  const webgl = hasWebGL()
  return (
    <div className="flex h-svh flex-col">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-line px-4 md:px-6">
        <a href="/" className="flex items-center gap-3">
          <Mark />
          <span className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.22em]">Ayoub Adil</span>
        </a>
        <h1 className="hidden text-sm md:block">
          Flanged hub · <span className="accent text-base">build123d × three.js</span>
        </h1>
        <div className="flex items-center gap-2">
          <button
            aria-pressed={showCode}
            onClick={() => setShowCode((s) => !s)}
            className={`rounded-[4px] border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider ${
              showCode ? 'border-signal text-signal' : 'border-line text-mute hover:text-paper'
            }`}
          >
            part.py
          </button>
          <a href="/#cad" className="rounded-[4px] border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-mute hover:text-paper">
            ← Back
          </a>
        </div>
      </header>
      <main className="relative min-h-0 flex-1 p-3 md:p-4">
        {webgl ? (
          <CadViewer className="h-full !rounded-lg [&>div:first-child]:min-h-0" />
        ) : (
          <p className="label p-8">WebGL is not available in this browser.</p>
        )}
        {showCode && (
          <div className="absolute inset-y-4 left-4 z-30 w-[min(36rem,calc(100%-2rem))] overflow-hidden rounded-lg border border-line bg-ink/95 p-5 backdrop-blur">
            <p className="label mb-3">cad/part.py</p>
            <Code src={partSource} className="h-[calc(100%-2rem)]" />
          </div>
        )}
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Lab />
  </StrictMode>,
)
