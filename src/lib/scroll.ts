import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

export function startSmoothScroll(reduced: boolean) {
  if (reduced || lenis) return () => {}
  lenis = new Lenis({ autoRaf: false, lerp: 0.11 })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (t: number) => lenis?.raf(t * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  // in-page anchors go through Lenis so they stay smooth
  const onClick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
    if (!a || !lenis) return
    const el = document.querySelector(a.getAttribute('href')!)
    if (!el) return
    e.preventDefault()
    lenis.scrollTo(el as HTMLElement, { offset: 0 })
    history.replaceState(null, '', a.getAttribute('href'))
  }
  document.addEventListener('click', onClick)

  return () => {
    document.removeEventListener('click', onClick)
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

export { gsap, ScrollTrigger }
