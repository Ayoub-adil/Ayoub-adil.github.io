import { academic, featured, more, products, type Media as MediaItem, type Project } from '../content/content'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SectionHead, StatusPill, T } from './ui'

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

/** Horizontal, snapping row of cards with prev / next buttons; the header holds the controls. */
function Rail({ label, note, children }: { label: string; note: string; children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null)
  const [edge, setEdge] = useState({ start: true, end: false })
  const update = () => {
    const t = track.current
    if (!t) return
    setEdge({ start: t.scrollLeft < 8, end: t.scrollLeft + t.clientWidth > t.scrollWidth - 8 })
  }
  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  const go = (dir: number) => {
    const t = track.current
    if (!t) return
    const card = t.firstElementChild as HTMLElement | null
    const step = card ? card.offsetWidth + 20 : t.clientWidth
    t.scrollBy({ left: dir * step, behavior: 'smooth' })
  }
  const btn =
    'grid h-9 w-9 place-items-center rounded-full border border-line text-paper/80 transition-colors hover:border-paper hover:text-paper disabled:opacity-30 disabled:hover:border-line'
  return (
    <div>
      <div className="mb-[2svh] flex flex-wrap items-end justify-between gap-3 border-b border-line pb-[1.4svh]">
        <div className="flex flex-wrap items-baseline gap-x-4">
          <h3 className="text-[clamp(1.2rem,2.8svh,1.5rem)] font-medium tracking-tight">{label}</h3>
          <p className="label !normal-case !tracking-normal !text-[0.82rem]">{note}</p>
        </div>
        <div className="flex gap-2">
          <button className={btn} onClick={() => go(-1)} disabled={edge.start} aria-label={`Previous ${label} projects`}>
            ‹
          </button>
          <button className={btn} onClick={() => go(1)} disabled={edge.end} aria-label={`Next ${label} projects`}>
            ›
          </button>
        </div>
      </div>
      {/* full-bleed track: the cards start on the content grid but the neighbours peek in at
          the screen edges, so it is obvious there is more to see on either side */}
      <div
        ref={track}
        onScroll={update}
        style={{ ['--g' as string]: 'calc(max((100vw - 1320px) / 2, 0px) + clamp(1.25rem, 4vw, 3rem))' }}
        className="mx-[calc(50%-50vw)] flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--g)] pb-2 [scroll-padding-left:calc(var(--g)+4.5rem)] [scroll-padding-right:var(--g)] [scrollbar-width:none] [mask-image:linear-gradient(to_right,transparent,black_2.5rem,black_calc(100%-2.5rem),transparent)] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  )
}

// a little under a third of the content width, so part of the next card shows on the right
const slot = 'w-[min(78vw,24rem)] shrink-0 snap-start lg:w-[calc((min(1320px,100vw)-6rem-2.5rem)/3.2)]'

function Card({ p, n }: { p: Project; n: number }) {
  return (
    <article
      id={`p-${p.id}`}
      className={`${slot} group flex scroll-mt-24 flex-col overflow-hidden rounded-xl border border-line bg-ink-2/70 backdrop-blur-sm transition-colors duration-500 hover:border-paper/25`}
    >
      <div className="relative h-[min(20svh,240px)] border-b border-line bg-ink">
        {p.cardVideo && <LoopVideo name={p.cardVideo} label={p.title} />}
        <span className="absolute left-4 top-3 font-mono text-xs text-signal">{pad(n)}</span>
        <span className="label absolute right-4 top-3 !text-[0.62rem]">{p.tag}</span>
      </div>
      <div className="flex flex-1 flex-col gap-[1svh] p-[clamp(0.85rem,2svh,1.3rem)]">
        <div className="flex flex-wrap items-center gap-3">
          <StatusPill status={p.status} />
          <span className="label !text-[0.64rem]">{p.year}</span>
        </div>
        <h4 className="text-[clamp(1.05rem,2.4svh,1.25rem)] font-medium leading-tight tracking-tight">{p.title}</h4>
        <p className="label !normal-case !tracking-normal !text-[0.78rem]">{p.client}</p>
        <p className="line-clamp-3 text-[0.88rem] leading-relaxed text-paper/75" title={p.summary}>
          {p.summary}
        </p>
        <p className="line-clamp-2 border-l-2 border-signal pl-3 text-[0.85rem] text-paper/90">
          <span className="label mr-2 !text-[0.6rem] !text-signal">My role</span>
          {p.did.join(' · ')}
        </p>
        <ul className="mt-auto flex flex-wrap gap-1 pt-1">
          {p.stack.map((s) => (
            <li key={s} className="rounded-[3px] border border-line px-1.5 py-0.5 font-mono text-[0.64rem] text-mute">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default function Work() {
  return (
    <>
      {/* screen 1: header + industrial projects */}
      <section id="work" className="screen relative">
        <div className="container-x">
          <SectionHead
            n="04"
            eyebrow="Projects"
            title={['What I’ve built,', '3D first.']}
            lede="Industrial systems, projects from my master’s, and my own products. Clients are anonymised; industrial visuals are synthetic."
          />
          <div className="mt-[2.5svh]">
            <Rail label="Industrial" note={`${featured.length} projects · 2024 – today`}>
              {featured.map((p, i) => (
                <Card key={p.id} p={p} n={i + 1} />
              ))}
            </Rail>
          </div>
        </div>
      </section>

      {/* screen 2: other industrial projects and my products */}
      <section id="work-more" className="screen relative">
        <div className="container-x">
          <div className="mb-[2svh] flex flex-wrap items-baseline gap-x-4 border-b border-line pb-[1.4svh]">
            <h3 className="text-[clamp(1.2rem,2.8svh,1.5rem)] font-medium tracking-tight">More industrial projects</h3>
          </div>
          <ul className="divide-y divide-line">
            {more.map((p, i) => (
              <li key={p.id} id={`p-${p.id}`} className="grid scroll-mt-24 gap-2 py-[1.8svh] md:grid-cols-12 md:gap-6">
                <span className="font-mono text-xs text-signal md:col-span-1">{pad(featured.length + i + 1)}</span>
                <div className="md:col-span-4">
                  <h4 className="text-[1.05rem] font-medium tracking-tight">{p.title}</h4>
                  <p className="label mt-1 !normal-case !tracking-normal !text-[0.78rem]">{p.client}</p>
                </div>
                <p className="text-[0.9rem] leading-relaxed text-paper/70 md:col-span-5">{p.summary}</p>
                <div className="flex flex-wrap items-start gap-2 md:col-span-2 md:justify-end">
                  <StatusPill status={p.status} />
                  <span className="label !text-[0.64rem]">{p.year}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mb-[2svh] mt-[5svh] flex flex-wrap items-baseline gap-x-4 border-b border-line pb-[1.4svh]">
            <h3 className="text-[clamp(1.2rem,2.8svh,1.5rem)] font-medium tracking-tight">My products</h3>
            <p className="label !normal-case !tracking-normal !text-[0.82rem]">SaaS I design and build on my own</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {products.map((p) => (
              <article key={p.id} className="flex flex-col gap-2 rounded-xl border border-line bg-ink-2/60 p-[clamp(1rem,2.4svh,1.5rem)] backdrop-blur-sm">
                <span className="label !text-[0.62rem]">{p.kind}</span>
                <h4 className="text-[clamp(1.3rem,3svh,1.7rem)] font-medium tracking-tight">
                  <T>{p.name}</T>
                </h4>
                <p className="text-[0.9rem] leading-relaxed text-paper/75">{p.summary}</p>
                <dl className="mt-2 grid grid-cols-[4.5rem_1fr] gap-y-1 border-t border-line pt-3 text-[0.85rem]">
                  <dt className="label !text-[0.6rem] pt-0.5">Stack</dt>
                  <dd>
                    <T>{p.stack}</T>
                  </dd>
                  <dt className="label !text-[0.6rem] pt-0.5">Status</dt>
                  <dd>
                    <T>{p.status}</T>
                  </dd>
                  <dt className="label !text-[0.6rem] pt-0.5">Link</dt>
                  <dd>
                    <T>{p.link}</T>
                  </dd>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* screen 3: academic and personal projects */}
      <section id="work-academic" className="screen relative">
        <div className="container-x">
          <Rail label="Academic & personal" note="Rendering, virtual reality, full-stack">
            {academic.map((a, i) => (
              <article
                key={a.id}
                id={`p-${a.id}`}
                className={`${slot} group flex scroll-mt-24 flex-col overflow-hidden rounded-xl border border-line bg-ink-2/70 backdrop-blur-sm`}
              >
                <div className="relative overflow-hidden border-b border-line">
                  <MediaCarousel items={a.media} title={a.title} />
                  <span className="absolute left-4 top-3 rounded-[3px] bg-ink/80 px-1.5 py-0.5 font-mono text-xs text-signal">{pad(i + 1)}</span>
                </div>
                <div className="flex flex-1 flex-col gap-[1.2svh] p-[clamp(0.9rem,2.2svh,1.4rem)]">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="label !text-[0.6rem]">{a.context}</span>
                    <span className="font-mono text-[0.66rem] text-mute">{a.year}</span>
                  </div>
                  <h4 className="text-[clamp(1.05rem,2.4svh,1.2rem)] font-medium leading-tight tracking-tight">{a.title}</h4>
                  <p className="text-[0.88rem] leading-relaxed text-paper/70">{a.summary}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-1 pt-1">
                    {a.stack.map((s) => (
                      <span key={s} className="rounded-[3px] border border-line px-1.5 py-0.5 font-mono text-[0.64rem] text-mute">
                        {s}
                      </span>
                    ))}
                    {a.links?.map(([l, h]) => (
                      <a key={h} href={h} target="_blank" rel="noreferrer" className="ml-auto font-mono text-[0.68rem] text-signal hover:underline">
                        {l} ↗
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </Rail>
        </div>
      </section>
    </>
  )
}
