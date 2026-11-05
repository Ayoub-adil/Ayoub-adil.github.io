import { lazy, Suspense, useEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Sequence from './components/Sequence'
import Work from './components/Work'
import Architecture from './components/Architecture'
import CadSection from './components/CadSection'
import Products from './components/Products'
import About from './components/About'
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
  const [stageActive, setStageActive] = useState(true)
  field.reduced = reduced

  useEffect(() => startSmoothScroll(reduced), [reduced])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      field.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      field.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    // dim the point field once the reader reaches the content sections
    const work = document.getElementById('work')!
    const onScroll = () => {
      const top = work.getBoundingClientRect().top
      const vh = window.innerHeight
      field.dim = Math.min(Math.max((0.85 * vh - top) / (0.6 * vh), 0), 1)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    // pause the background renderer while the CAD viewer has the GPU
    const io = new IntersectionObserver(([e]) => setStageActive(!e.isIntersecting), { rootMargin: '-30% 0px -30% 0px' })
    io.observe(document.getElementById('cad')!)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  return (
    <>
      <div className="fixed inset-0 z-0" aria-hidden>
        {webgl ? (
          <Suspense fallback={<Backdrop />}>
            <Stage active={stageActive} mobile={mobile} />
          </Suspense>
        ) : (
          <Backdrop />
        )}
      </div>
      <Nav />
      <main id="main" className="relative z-10">
        <Hero />
        <Sequence />
        <Work />
        <Architecture />
        <CadSection webgl={webgl} />
        <Products />
        <About />
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
