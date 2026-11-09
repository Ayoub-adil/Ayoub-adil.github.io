import { useEffect, useRef, useState } from 'react'
import { useContent } from '../i18n'
import { field } from '../three/store'
import { ScrollTrigger } from '../lib/scroll'

const pad = (n: number) => String(n + 1).padStart(2, '0')

export default function Sequence() {
  const { steps, ui } = useContent()
  const ref = useRef<HTMLElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    if (reduced) {
      // no pinned scroll: the steps are a plain list and the scene stays on the first one
      field.morph = 0
      return
    }
    const st = ScrollTrigger.create({
      trigger: ref.current,
      // starts one screen early so the dust gathers straight into the tunnel
      start: 'top bottom',
      end: 'bottom bottom',
      onUpdate(self) {
        const h = ref.current!.offsetHeight
        const vh = window.innerHeight
        const p = Math.max((self.progress * h - vh) / (h - vh), 0)
        // one page per step: the step whose page is on screen is shown, and its cloud
        // animates in on its own (time-based easing in the renderer), not scrubbed by scroll
        const step = Math.min(steps.length - 1, Math.floor(p * steps.length))
        // stage 0 is the head (hero); the sequence covers stages 1..5, from when the section is reached
        const reached = self.progress * h >= vh * 0.65
        field.morph = reached ? 1 + step : 0
        setActive(step)
        // within a step, every scroll tick still moves the view: the camera orbits with it
        field.stepFrac = Math.min(Math.max(p * steps.length - step, 0), 1)
        if (bar.current) bar.current.style.transform = `scaleY(${p})`
      },
      onLeaveBack() {
        field.morph = 0
      },
    })
    return () => st.kill()
  }, [reduced])

  const Refs = ({ refs }: { refs: [string, string][] }) => (
    <p className="label mt-6 flex flex-wrap gap-x-3 gap-y-1">
      <span aria-hidden>↳</span>
      {refs.map(([label, id], k) => (
        <a key={id} href={`#p-${id}`} className="underline decoration-paper/25 underline-offset-4 transition-colors hover:text-signal hover:decoration-signal">
          {label}
          {k < refs.length - 1 && <span className="sr-only">,</span>}
        </a>
      ))}
    </p>
  )

  if (reduced) {
    return (
      <section id="process" ref={ref} aria-label={ui.whatIDo} className="relative py-[12svh]">
        <div className="container-x relative">
          <p className="eyebrow mb-8">{ui.whatIDo}</p>
          <ol className="grid gap-10 md:grid-cols-2">
            {steps.map((s, i) => (
              <li key={s.id} className="max-w-xl">
                <p className="font-mono text-sm text-signal">{pad(i)}</p>
                <h2 className="display mt-3 text-[clamp(2rem,4vw,3.2rem)]">
                  {s.verb} <span className="accent">{s.object}</span>
                </h2>
                <p className="mt-4 leading-relaxed text-paper/80">{s.body}</p>
                <Refs refs={s.refs} />
              </li>
            ))}
          </ol>
        </div>
      </section>
    )
  }

  return (
    <section
      id="process"
      ref={ref}
      aria-label={ui.whatIDo}
      // ~45 % of a screen of scroll per step, so each step is a few wheel ticks
      style={{ height: `${steps.length * 45 + 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-svh items-start pt-[12svh] md:items-center md:pt-0">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/40 to-transparent md:bg-gradient-to-r md:from-ink/90 md:via-ink/30 md:to-transparent md:to-60% rtl:md:bg-gradient-to-l" />
        <div className="container-x relative">
          <p className="eyebrow mb-8">{ui.whatIDo}</p>
          <div className="relative min-h-[22rem] max-w-xl md:min-h-[24rem]">
            {steps.map((s, i) => (
              // inactive steps are only faded out, so screen readers still read all five
              <article
                key={s.id}
                className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(.2,.7,.1,1)] ${
                  i === active
                    ? 'translate-y-0 opacity-100 blur-0'
                    : `pointer-events-none ${i < active ? '-translate-y-6' : 'translate-y-6'} opacity-0 blur-sm`
                }`}
              >
                <p className="font-mono text-sm text-signal">
                  {pad(i)} <span className="text-mute">/ {pad(steps.length - 1)}</span>
                </p>
                <h2 className="display mt-4 text-[clamp(2.6rem,6.4vw,5.6rem)]">
                  {s.verb} <span className="accent">{s.object}</span>
                </h2>
                <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-paper/80">{s.body}</p>
                <Refs refs={s.refs} />
              </article>
            ))}
          </div>
        </div>

        {/* vertical index, right edge */}
        <ol className="absolute end-[clamp(1rem,3vw,2.5rem)] top-1/2 hidden -translate-y-1/2 gap-3 md:flex md:flex-col" aria-hidden>
          <div className="absolute -start-4 top-0 h-full w-px bg-line">
            <div ref={bar} className="h-full origin-top scale-y-0 bg-signal" />
          </div>
          {steps.map((s, i) => (
            <li key={s.id} className={`font-mono text-[0.75rem] transition-colors ${i === active ? 'text-signal' : 'text-mute'}`}>
              {pad(i)}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
