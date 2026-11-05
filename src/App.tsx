import { lazy, Suspense, useEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Sequence from './components/Sequence'
import Work from './components/Work'
import Architecture from './components/Architecture'
import About from './components/About'
import Experience from './components/Experience'
import Education from './components/Education'
import Skills from './components/Skills'
import Contact from './components/Contact'
import { field, hasWebGL, MOBILE_QUERY } from './three/store'
import { startSmoothScroll } from './lib/scroll'

const Stage = lazy(() => import('./three/Stage'))

function useMedia(q: string) {
  const [m, setM] = useState(() => window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const on = () => setM(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [q])
  return m
}

export default function App() {
  const reduced = useMedia('(prefers-reduced-motion: reduce)')
  const mobile = useMedia(MOBILE_QUERY)
  const [webgl] = useState(hasWebGL)
  field.reduced = reduced

  useEffect(() => startSmoothScroll(reduced), [reduced])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      field.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      field.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    // The point field is the subject in the hero and the "What I do" sequence;
    // everywhere else it dissolves into dust behind the content.
    const hero = document.getElementById('top')!
    const seq = document.getElementById('process')!
    const clamp = (v: number) => Math.min(Math.max(v, 0), 1)
    const onScroll = () => {
      const vh = window.innerHeight
      const h = hero.getBoundingClientRect()
      const s = seq.getBoundingClientRect()
      const afterHero = clamp((0.75 * vh - h.bottom) / (0.5 * vh))
      const beforeSeq = clamp((s.top - 0.15 * vh) / (0.5 * vh))
      const afterSeq = clamp((0.85 * vh - s.bottom) / (0.6 * vh))
      field.dim = Math.max(afterSeq, Math.min(afterHero, beforeSeq))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <>
      <div className="fixed inset-0 z-0" aria-hidden>
        {webgl ? (
          <Suspense fallback={<Backdrop />}>
            <Stage active mobile={mobile} />
          </Suspense>
        ) : (
          <Backdrop />
        )}
      </div>
      <Nav />
      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <Sequence />
        <Experience />
        <Education />
        <Work />
        <Architecture />
        <Skills />
        <Contact />
      </main>
    </>
  )
}

/** Static stand-in when WebGL is missing or still loading. */
function Backdrop() {
  return (
    <div
      className="h-full w-full"
      style={{
        background:
          'radial-gradient(60% 50% at 70% 45%, rgba(255,106,61,.10), transparent 70%), radial-gradient(circle at 1px 1px, rgba(236,232,225,.13) 1px, transparent 0) 0 0/22px 22px, #0a0d12',
      }}
    />
  )
}
