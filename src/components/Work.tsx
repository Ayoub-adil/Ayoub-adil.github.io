import { academic, architecture, featured, more, type Media as MediaItem, type Project } from '../content/content'
import ArchitectureDiagram from './Architecture'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SectionHead, StatusPill } from './ui'
import { lockScroll } from '../lib/scroll'

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
      className="relative h-[min(19svh,220px)] overflow-hidden bg-ink"
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
      {/* full-bleed track: three cards on the content grid; a thin faded strip of the neighbours
          shows at each edge, so it is obvious there is more to see on either side */}
      <div
        ref={track}
        onScroll={update}
        style={{ ['--g' as string]: 'calc(max((100vw - 1320px) / 2, 0px) + clamp(1.25rem, 4vw, 3rem))' }}
        className="mx-[calc(50%-50vw)] flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--g)] pb-2 [scroll-padding-inline:var(--g)] [scrollbar-width:none] [mask-image:linear-gradient(to_right,transparent_calc(var(--g)-3rem),black_var(--g),black_calc(100%-var(--g)),transparent_calc(100%-var(--g)+3rem))] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  )
}

// three cards fill the content width; neighbours only show as a thin faded strip at the edges
const slot = 'w-[min(78vw,24rem)] shrink-0 snap-start lg:w-[calc((min(1320px,100vw)-2*clamp(1.25rem,4vw,3rem)-2.5rem)/3)]'

function Card({ p, n, onOpen }: { p: Project; n: number; onOpen: () => void }) {
  return (
    <article
      id={`p-${p.id}`}
      role="button"
      tabIndex={0}
      aria-label={`${p.title}: show details`}
      onClick={onOpen}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen())}
      className={`${slot} group flex cursor-pointer scroll-mt-24 flex-col overflow-hidden rounded-xl border border-line bg-ink-2/70 backdrop-blur-sm transition-colors duration-500 hover:border-signal/60`}
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
        <div className="mt-auto flex items-end justify-between gap-3 pt-1">
          <ul className="flex flex-wrap gap-1">
            {p.stack.map((s) => (
              <li key={s} className="rounded-[3px] border border-line px-1.5 py-0.5 font-mono text-[0.64rem] text-mute">
                {s}
              </li>
            ))}
          </ul>
          <span className="label shrink-0 !text-[0.62rem] !text-signal opacity-70 transition-opacity group-hover:opacity-100">
            {p.id === 'tunnel-platform' ? 'Details + architecture' : 'Details +'}
          </span>
        </div>
      </div>
    </article>
  )
}

/** Foreground dialog with everything about one project; ‹ › browse, Esc / backdrop close. */
function ProjectDialog({ index, onClose, onGo }: { index: number | null; onClose: () => void; onGo: (i: number) => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const open = index !== null
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
    lockScroll(open)
  }, [open])
  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onGo((index! + 1) % featured.length)
      if (e.key === 'ArrowLeft') onGo((index! - 1 + featured.length) % featured.length)
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open, index, onGo])
  const p = open ? featured[index!] : null
  const nav = 'grid h-9 w-9 place-items-center rounded-full border border-line text-paper/80 hover:border-paper hover:text-paper'
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label={p ? p.title : 'Project details'}
      className="m-auto max-h-[92svh] w-[min(64rem,94vw)] overflow-hidden rounded-2xl border border-line bg-ink-2 p-0 text-paper shadow-2xl backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
    >
      {p && (
        <div className="flex max-h-[92svh] flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs text-signal">{pad(index! + 1)}</span>
              <StatusPill status={p.status} />
              <span className="label !text-[0.64rem]">{p.year}</span>
              <span className="label !text-[0.64rem]">{p.tag}</span>
            </div>
            <div className="flex gap-2">
              <button className={nav} onClick={() => onGo((index! - 1 + featured.length) % featured.length)} aria-label="Previous project">
                ‹
              </button>
              <button className={nav} onClick={() => onGo((index! + 1) % featured.length)} aria-label="Next project">
                ›
              </button>
              <button className={nav} onClick={onClose} aria-label="Close">
                ×
              </button>
            </div>
          </div>
          <div className="grid min-h-0 overflow-y-auto md:grid-cols-[1.15fr_1fr]" data-lenis-prevent>
            <div className="relative h-[34svh] bg-ink md:h-auto md:min-h-[26rem]">{p.cardVideo && <LoopVideo key={p.id} name={p.cardVideo} label={p.title} />}</div>
            <div className="flex flex-col gap-4 p-6 md:p-7">
              <div>
                <h3 className="text-[clamp(1.4rem,3.2svh,1.9rem)] font-medium leading-tight tracking-tight">{p.title}</h3>
                <p className="label mt-2 !normal-case !tracking-normal !text-[0.82rem]">{p.client}</p>
              </div>
              <p className="leading-relaxed text-paper/80">{p.summary}</p>
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
              <ul className="flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <li key={s} className="rounded-[3px] border border-line px-2 py-1 font-mono text-[0.7rem] text-mute">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            {/* the tunnel inspection platform shows its service architecture right here */}
            {p.id === 'tunnel-platform' && (
              <div className="border-t border-line p-6 md:col-span-2 md:p-7">
                <p className="eyebrow mb-2">Architecture</p>
                <h4 className="display text-[clamp(1.5rem,3.4svh,2.1rem)]">
                  {architecture.title[0]} <span className="accent">{architecture.title[1]}</span>
                </h4>
                <p className="mb-5 mt-2 max-w-2xl text-[0.92rem] leading-relaxed text-paper/70">{architecture.lede}</p>
                <ArchitectureDiagram />
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  )
}

export default function Work() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  return (
    <>
      <ProjectDialog index={openIdx} onClose={() => setOpenIdx(null)} onGo={setOpenIdx} />
      {/* screen 1: header + industrial projects */}
      <section id="work" className="screen relative">
        <div className="container-x">
          <SectionHead
            n="04"
            eyebrow="Projects"
            title={['What I’ve built,', '3D first.']}
            lede="A selection of the industrial systems I built, and projects from my master’s. Clients are anonymised; industrial visuals are synthetic renders."
          />
          <div className="mt-[2.5svh]">
            <Rail label="Industrial" note="Selected projects · 2024 – today">
              {featured.map((p, i) => (
                <Card key={p.id} p={p} n={i + 1} onOpen={() => setOpenIdx(i)} />
              ))}
            </Rail>
          </div>
        </div>
      </section>

      {/* screen 2: other industrial projects, then academic and personal projects */}
      <section id="work-more" className="screen relative">
        <div className="container-x">
          <div className="mb-[2svh] flex flex-wrap items-baseline gap-x-4 border-b border-line pb-[1.4svh]">
            <h3 className="text-[clamp(1.2rem,2.8svh,1.5rem)] font-medium tracking-tight">More industrial projects</h3>
          </div>
          <ul className="divide-y divide-line">
            {more.map((p, i) => (
              <li key={p.id} id={`p-${p.id}`} className="grid scroll-mt-24 gap-2 py-[1.2svh] md:grid-cols-12 md:gap-6">
                <span className="font-mono text-xs text-signal md:col-span-1">{pad(featured.length + i + 1)}</span>
                <div className="md:col-span-4">
                  <h4 className="text-[1.05rem] font-medium tracking-tight">{p.title}</h4>
                  <p className="label mt-1 !normal-case !tracking-normal !text-[0.78rem]">{p.client}</p>
                </div>
                <p className="text-[0.86rem] leading-relaxed text-paper/70 md:col-span-5">{p.summary}</p>
                <div className="flex flex-wrap items-start gap-2 md:col-span-2 md:justify-end">
                  <StatusPill status={p.status} />
                  <span className="label !text-[0.64rem]">{p.year}</span>
                </div>
              </li>
            ))}
          </ul>

          {/* My products are hidden for now (on hold); data kept in content.ts */}
          <div className="mt-[3.5svh]">
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
        </div>
      </section>

    </>
  )
}
