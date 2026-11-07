import { lazy, Suspense, useEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Sequence from './components/Sequence'
import Work from './components/Work'
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
    const seq = document.getElementById('process')!
    const photo = document.getElementById('about-photo')
    const about = document.getElementById('about')
    // without WebGL or with reduced motion the photo is simply shown
    const handoff = webgl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const clamp = (v: number) => Math.min(Math.max(v, 0), 1)
    const onScroll = () => {
      const vh = window.innerHeight
      const s = seq.getBoundingClientRect()

      // hero -> About portrait handoff, driven by the scroll position of the photo
      if (photo) {
        const r = photo.getBoundingClientRect()
        const vw = window.innerWidth
        field.photoRect = [(r.left / vw) * 2 - 1, 1 - (r.top / vh) * 2, (r.right / vw) * 2 - 1, 1 - (r.bottom / vh) * 2]
        // the handoff ends just before the About section is framed at the top of the screen,
        // so the photo is complete exactly when the page is aligned (no text cut off)
        const aboutTop = (about?.getBoundingClientRect().top ?? r.top) + window.scrollY
        const end = Math.max(aboutTop * 0.94, 1)
        const t = clamp(window.scrollY / end)
        field.toPhoto = t
        // the photo only appears at the very end, when the points have become it
        const fade = handoff ? clamp((t - 0.9) / 0.1) : 1
        photo.style.opacity = String(fade)
      }

      // dust behind the content after the "What I do" sequence; and once the head has
      // become the photo, its points live on as that star field until the sequence is
      // reached (same threshold as Sequence.tsx), where the tunnel gathers from them
      const afterSeq = clamp((0.85 * vh - s.bottom) / (0.6 * vh))
      const starsAfterPhoto = field.toPhoto >= 0.999 && s.top > 0.35 * vh ? 1 : 0
      field.dim = Math.max(afterSeq, starsAfterPhoto)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
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
          'radial-gradient(60% 50% at 70% 45%, rgba(250,181,41,.10), transparent 70%), radial-gradient(circle at 1px 1px, rgba(236,232,225,.13) 1px, transparent 0) 0 0/22px 22px, #0a0d12',
      }}
    />
  )
}
