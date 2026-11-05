import { useEffect, useRef, useState } from 'react'
import { steps } from '../content/content'
import { field, progressToMorph } from '../three/store'
import { ScrollTrigger } from '../lib/scroll'

const pad = (n: number) => String(n + 1).padStart(2, '0')

export default function Sequence() {
  const ref = useRef<HTMLElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: ref.current,
      // starts one screen early so the dust gathers straight into the tunnel
      start: 'top bottom',
      end: 'bottom bottom',
      onUpdate(self) {
        const h = ref.current!.offsetHeight
        const vh = window.innerHeight
        const p = (self.progress * h - vh) / (h - vh)
        const { morph, step } = progressToMorph(Math.max(p, 0), steps.length)
        // stage 0 is the head (hero); the sequence covers stages 1..5
        field.morph = 1 + (field.reduced ? Math.round(morph) : morph)
        setActive(step)
        if (bar.current) bar.current.style.transform = `scaleY(${Math.max(p, 0)})`
      },
      onLeaveBack() {
        field.morph = 0
      },
    })
    return () => st.kill()
  }, [])

  return (
    <section
      id="process"
      ref={ref}
      aria-label="What I do: from sensor to production"
      style={{ height: `${steps.length * 100 + 40}vh` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-svh items-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/45 to-transparent md:via-ink/30 md:to-60%" />
        <div className="container-x relative">
          <p className="eyebrow mb-8">What I do · from sensor to production</p>
          <div className="relative min-h-[22rem] max-w-xl md:min-h-[24rem]">
            {steps.map((s, i) => (
              <article
                key={s.id}
                aria-hidden={i !== active}
                className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(.2,.7,.1,1)] ${
                  i === active ? 'translate-y-0 opacity-100 blur-0' : i < active ? '-translate-y-6 opacity-0 blur-sm' : 'translate-y-6 opacity-0 blur-sm'
                }`}
              >
                <p className="font-mono text-sm text-signal">{pad(i)}</p>
                <h2 className="display mt-4 text-[clamp(2.6rem,6.4vw,5.6rem)]">
                  {s.verb} <span className="accent">{s.object}</span>
                </h2>
                <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-paper/75">{s.body}</p>
                <p className="label mt-6">↳ {s.ref}</p>
              </article>
            ))}
          </div>
        </div>

        {/* vertical index, right edge */}
        <ol className="absolute right-[clamp(1rem,3vw,2.5rem)] top-1/2 hidden -translate-y-1/2 gap-3 md:flex md:flex-col" aria-hidden>
          <div className="absolute -left-4 top-0 h-full w-px bg-line">
            <div ref={bar} className="h-full origin-top scale-y-0 bg-signal" />
          </div>
          {steps.map((s, i) => (
            <li key={s.id} className={`font-mono text-[0.68rem] transition-colors ${i === active ? 'text-signal' : 'text-mute/60'}`}>
              {pad(i)}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
