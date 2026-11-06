import { academic, featured, more, products, type Media as MediaItem, type Project } from '../content/content'
import { ProjectVisual } from './visuals/Visuals'
import { useEffect, useRef, useState } from 'react'
import { Reveal, SectionHead, StatusPill, T } from './ui'

/**
 * Media shown one after the other: videos play to the end, images stay 4.5 s.
 * Plays only while on screen; manual dots / arrows; no autoplay with reduced motion.
 */
function MediaCarousel({ items, title }: { items: MediaItem[]; title: string }) {
  const box = useRef<HTMLDivElement>(null)
  const vids = useRef<(HTMLVideoElement | null)[]>([])
  const [i, setI] = useState(0)
  const [inView, setInView] = useState(false)
  const [hover, setHover] = useState(false)
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const many = items.length > 1
  const next = () => setI((k) => (k + 1) % items.length)
  const prev = () => setI((k) => (k - 1 + items.length) % items.length)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 })
    if (box.current) io.observe(box.current)
    return () => io.disconnect()
  }, [])

  // play the active video, pause the others
  useEffect(() => {
    vids.current.forEach((v, k) => {
      if (!v) return
      if (k === i && inView && !reduced) {
        v.currentTime = 0
        v.play().catch(() => {})
      } else v.pause()
    })
  }, [i, inView, reduced])

  // images advance on a timer
  useEffect(() => {
    if (!many || reduced || !inView || hover || items[i].type === 'video') return
    const t = setTimeout(next, 4500)
    return () => clearTimeout(t)
  }, [i, inView, hover, many, reduced, items])

  const cls = 'absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 group-hover:scale-[1.03]'
  return (
    <div
      ref={box}
      className="relative aspect-[16/10] overflow-hidden bg-ink"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      role={many ? 'region' : undefined}
      aria-roledescription={many ? 'carousel' : undefined}
      aria-label={many ? `${title}: media` : undefined}
    >
      {items.map((m, k) => {
        const on = k === i
        const style = `${cls} ${on ? 'opacity-100' : 'opacity-0'}`
        return m.type === 'video' && !reduced ? (
          <video
            key={m.src}
            ref={(el) => {
              vids.current[k] = el
            }}
            className={style}
            src={m.src}
            poster={m.poster}
            muted
            playsInline
            loop={!many}
            preload={k === 0 ? 'metadata' : 'none'}
            onEnded={() => many && on && next()}
            aria-label={m.alt}
            aria-hidden={!on}
          />
        ) : (
          <img
            key={m.src}
            src={m.type === 'video' ? (m.poster ?? m.src) : m.src}
            alt={on ? m.alt : ''}
            aria-hidden={!on}
            loading="lazy"
            decoding="async"
            className={style}
          />
        )
      })}

      {many && (
        <>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink/70 to-transparent" />
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {items.map((m, k) => (
              <button
                key={m.src}
                onClick={() => setI(k)}
                aria-label={`Show ${m.type} ${k + 1} of ${items.length}`}
                aria-current={k === i}
                className={`h-1.5 rounded-full transition-all duration-300 ${k === i ? 'w-6 bg-signal' : 'w-1.5 bg-paper/50 hover:bg-paper'}`}
              />
            ))}
          </div>
          {[
            ['‹', prev, 'left-2', 'Previous'],
            ['›', next, 'right-2', 'Next'],
          ].map(([ch, fn, pos, label]) => (
            <button
              key={label as string}
              onClick={fn as () => void}
              aria-label={`${label} media`}
              className={`absolute top-1/2 ${pos} grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-ink/70 text-lg text-paper opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100`}
            >
              {ch as string}
            </button>
          ))}
        </>
      )}
    </div>
  )
}

/** Looping 3D render of a card, playing only while on screen. */
function LoopVideo({ name, label }: { name: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const v = ref.current
    if (!v || reduced) return
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.2 })
    io.observe(v)
    return () => io.disconnect()
  }, [reduced])
  const poster = `/img/cards/${name}.jpg`
  if (reduced) return <img src={poster} alt={label} className="h-full w-full object-cover" loading="lazy" />
  return <video ref={ref} className="h-full w-full object-cover" src={`/img/cards/${name}.mp4`} poster={poster} muted loop playsInline preload="none" aria-label={label} />
}

const pad = (n: number) => String(n).padStart(2, '0')

function Card({ p, n }: { p: Project; n: number }) {
  return (
    <article
      id={`p-${p.id}`}
      className="group flex w-full scroll-mt-24 flex-col overflow-hidden rounded-xl border border-line bg-ink-2/70 backdrop-blur-sm transition-colors duration-500 hover:border-paper/25"
    >
      <div className="relative aspect-[16/10] border-b border-line bg-ink">
        {p.cardVideo ? <LoopVideo name={p.cardVideo} label={p.title} /> : p.visual && <ProjectVisual kind={p.visual} />}
        <span className="absolute left-4 top-4 font-mono text-xs text-signal">{pad(n)}</span>
        <span className="label absolute right-4 top-4 !text-[0.62rem]">{p.tag}</span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
        <div className="flex flex-wrap items-center gap-3">
          <StatusPill status={p.status} />
          <span className="label !text-[0.64rem]">{p.year}</span>
        </div>
        <h3 className="text-[1.45rem] font-medium leading-tight tracking-tight">{p.title}</h3>
        <p className="label !normal-case !tracking-normal !text-[0.82rem]">{p.client}</p>
        <p className="leading-relaxed text-paper/75">{p.summary}</p>
        <div className="rounded-lg border border-signal/25 bg-signal/[0.04] p-4">
          <p className="label mb-2 !text-[0.62rem] !text-signal">My role</p>
          <ul className="space-y-1.5 text-[0.92rem] text-paper/90">
            {p.did.map((d) => (
              <li key={d} className="flex gap-3">
                <span className="mt-[0.6em] h-px w-3 shrink-0 bg-signal" />
                {d}
              </li>
            ))}
          </ul>
        </div>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {p.stack.map((s) => (
            <li key={s} className="rounded-[3px] border border-line px-2 py-1 font-mono text-[0.68rem] text-mute">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function SubHead({ label, note }: { label: string; note: string }) {
  return (
    <div className="mb-8 mt-24 flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-4">
      <h3 className="text-[1.6rem] font-medium tracking-tight">{label}</h3>
      <p className="label !normal-case !tracking-normal !text-[0.85rem]">{note}</p>
    </div>
  )
}

export default function Work() {
  return (
    <section id="work" className="relative py-[clamp(6rem,14vh,10rem)]">
      <div className="container-x">
        <SectionHead
          n="04"
          eyebrow="Projects"
          title={['What I’ve built,', '3D first.']}
          lede="Industrial systems, projects from my master’s, and my own products. Clients are anonymised; industrial visuals are synthetic."
        />

        <SubHead label="Industrial" note="2024 – today" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 140} className="flex">
              <Card p={p} n={i + 1} />
            </Reveal>
          ))}
        </div>

        <ul className="mt-10 divide-y divide-line border-y border-line">
          {more.map((p, i) => (
            <li key={p.id} id={`p-${p.id}`} className="grid scroll-mt-24 gap-3 py-6 md:grid-cols-12 md:gap-6">
              <span className="font-mono text-xs text-signal md:col-span-1">{pad(featured.length + i + 1)}</span>
              <div className="md:col-span-4">
                <h4 className="text-lg font-medium tracking-tight">{p.title}</h4>
                <p className="label mt-1 !normal-case !tracking-normal !text-[0.8rem]">{p.client}</p>
              </div>
              <p className="text-[0.95rem] leading-relaxed text-paper/70 md:col-span-5">{p.summary}</p>
              <div className="flex flex-wrap items-start gap-2 md:col-span-2 md:justify-end">
                <StatusPill status={p.status} />
                <span className="label !text-[0.64rem]">{p.year}</span>
              </div>
            </li>
          ))}
        </ul>

        <SubHead label="Academic & personal" note="Rendering, virtual reality, full-stack" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {academic.map((a, i) => (
            <Reveal
              as="article"
              key={a.id}
              id={`p-${a.id}`}
              delay={(i % 3) * 140}
              className="group flex scroll-mt-24 flex-col overflow-hidden rounded-xl border border-line bg-ink-2/70 backdrop-blur-sm"
            >
              <div className="relative overflow-hidden border-b border-line">
                <MediaCarousel items={a.media} title={a.title} />
                <span className="absolute left-4 top-4 rounded-[3px] bg-ink/80 px-1.5 py-0.5 font-mono text-xs text-signal">{pad(i + 1)}</span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="label !text-[0.62rem]">{a.context}</span>
                  <span className="font-mono text-[0.68rem] text-mute">{a.year}</span>
                </div>
                <h4 className="text-[1.25rem] font-medium leading-tight tracking-tight">{a.title}</h4>
                <p className="text-[0.95rem] leading-relaxed text-paper/70">{a.summary}</p>
                <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-3">
                  {a.stack.map((s) => (
                    <span key={s} className="rounded-[3px] border border-line px-2 py-1 font-mono text-[0.68rem] text-mute">
                      {s}
                    </span>
                  ))}
                  {a.links?.map(([l, h]) => (
                    <a key={h} href={h} target="_blank" rel="noreferrer" className="ml-auto font-mono text-[0.7rem] text-signal hover:underline">
                      {l} ↗
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <SubHead label="My products" note="SaaS I design and build on my own" />
        <div className="grid gap-5 md:grid-cols-2">
          {products.map((p) => (
            <article key={p.id} className="flex flex-col gap-4 rounded-xl border border-line bg-ink-2/60 p-7 backdrop-blur-sm">
              <span className="label !text-[0.64rem]">{p.kind}</span>
              <h4 className="text-[1.9rem] font-medium tracking-tight">
                <T>{p.name}</T>
              </h4>
              <p className="leading-relaxed text-paper/75">{p.summary}</p>
              <dl className="mt-auto grid grid-cols-[5rem_1fr] gap-y-2 border-t border-line pt-4 text-sm">
                <dt className="label !text-[0.64rem] pt-0.5">Stack</dt>
                <dd>
                  <T>{p.stack}</T>
                </dd>
                <dt className="label !text-[0.64rem] pt-0.5">Status</dt>
                <dd>
                  <T>{p.status}</T>
                </dd>
                <dt className="label !text-[0.64rem] pt-0.5">Link</dt>
                <dd>
                  <T>{p.link}</T>
                </dd>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
