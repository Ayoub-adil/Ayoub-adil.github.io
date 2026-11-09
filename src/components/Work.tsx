import { type Media as MediaItem, type Project } from '../content/content'
import { fmt, useContent } from '../i18n'
import ArchitectureDiagram from './Architecture'
import { useEffect, useRef, useState } from 'react'
import { Arrow, SectionHead, StatusPill } from './ui'
import { lockScroll } from '../lib/scroll'

/**
 * Media shown one after the other: videos play to the end, images stay 4.5 s.
 * Plays only while on screen; manual dots / arrows; no autoplay with reduced motion.
 */
function MediaCarousel({ items, title }: { items: MediaItem[]; title: string }) {
  const { ui } = useContent()
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
      className="relative h-[min(20svh,200px)] overflow-hidden bg-ink"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      role={many ? 'region' : undefined}
      aria-roledescription={many ? 'carousel' : undefined}
      aria-label={many ? `${title}: ${ui.projects.media}` : undefined}
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
                aria-label={fmt(ui.projects.showMedia, { i: k + 1, n: items.length })}
                aria-current={k === i}
                className={`h-1.5 rounded-full transition-all duration-300 ${k === i ? 'w-6 bg-signal' : 'w-1.5 bg-paper/50 hover:bg-paper'}`}
              />
            ))}
          </div>
          {[
            ['‹', prev, 'left-2', ui.projects.previousMedia],
            ['›', next, 'right-2', ui.projects.nextMedia],
          ].map(([ch, fn, pos, label]) => (
            <button
              key={label as string}
              onClick={fn as () => void}
              aria-label={label as string}
              className={`absolute top-1/2 ${pos} grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-ink/70 text-lg text-paper opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100`}
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

const sub = 'flex flex-wrap items-baseline gap-x-4 border-b border-line pb-[1.4svh] mb-[2.5svh]'

function Card({ p, onOpen }: { p: Project; onOpen: () => void }) {
  const { ui, status } = useContent()
  return (
    <article
      id={`p-${p.id}`}
      className="group relative flex scroll-mt-24 flex-col overflow-hidden rounded-xl border border-line bg-ink-2/70 backdrop-blur-sm transition-colors duration-500 focus-within:border-signal/60 hover:border-signal/60"
    >
      <div className="relative h-[min(22svh,230px)] border-b border-line bg-ink">
        {p.cardVideo && <LoopVideo name={p.cardVideo} label={`${p.title}: ${ui.projects.syntheticRender}`} />}
        {p.tag === '3D' && <span className="label absolute right-4 top-3 rounded-[3px] bg-ink/70 px-1.5 py-0.5">3D</span>}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-[clamp(1rem,2.2svh,1.35rem)]">
        <div className="flex flex-wrap items-center gap-3">
          <StatusPill status={status(p.status)} live={p.status === 'In production'} />
          <span className="label">{p.year}</span>
        </div>
        <h4 className="text-[1.15rem] font-medium leading-tight tracking-tight">{p.title}</h4>
        <p className="text-[0.82rem] text-mute">{p.client}</p>
        <p className="line-clamp-3 text-[0.9rem] leading-relaxed text-paper/80">{p.summary}</p>
        <div className="border-s-2 border-signal ps-3">
          <p className="label mb-1 !text-signal">{ui.projects.myRole}</p>
          <ul className="space-y-0.5 text-[0.86rem] leading-snug text-paper/90">
            {p.did.slice(0, 2).map((d) => (
              <li key={d}>{d}</li>
            ))}
            {p.did.length > 2 && <li className="text-mute">{fmt(ui.projects.more, { n: p.did.length - 2 })}</li>}
          </ul>
        </div>
        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <ul className="flex flex-wrap gap-1" aria-label={ui.projects.stack}>
            {p.stack.map((s) => (
              <li key={s} className="rounded-[3px] border border-line px-1.5 py-0.5 font-mono text-[0.72rem] text-mute">
                {s}
              </li>
            ))}
          </ul>
          <span aria-hidden className="label inline-flex shrink-0 items-center gap-1.5 rounded-full border border-signal/40 px-2.5 py-1 !text-signal transition-colors group-hover:border-signal group-hover:bg-signal/10">
            {p.id === 'tunnel-platform' ? ui.projects.detailsArchitecture : ui.projects.details} <Arrow out={false} />
          </span>
        </div>
      </div>
      {/* the whole card opens the dialog; a real button keeps the card's content readable by screen readers */}
      <button onClick={onOpen} className="absolute inset-0 z-10 cursor-pointer rounded-xl focus-visible:outline-offset-[-3px]">
        <span className="sr-only">
          {ui.projects.showDetails}: {p.title}
        </span>
      </button>
    </article>
  )
}

/** Foreground dialog with everything about one project; ‹ › browse, Esc / backdrop close. */
function ProjectDialog({ index, onClose, onGo }: { index: number | null; onClose: () => void; onGo: (i: number) => void }) {
  const { featured, architecture, ui, status } = useContent()
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
  }, [open, index, onGo, featured.length])
  const p = open ? featured[index!] : null
  const nav = 'grid h-9 w-9 place-items-center rounded-full border border-line text-paper/80 hover:border-paper hover:text-paper'
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label={p ? p.title : ui.projects.details}
      className="m-auto max-h-[92svh] w-[min(64rem,94vw)] overflow-hidden rounded-2xl border border-line bg-ink-2 p-0 text-paper shadow-2xl backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
    >
      {p && (
        <div className="flex max-h-[92svh] flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
            <div className="flex flex-wrap items-center gap-3">
              <StatusPill status={status(p.status)} live={p.status === 'In production'} />
              <span className="label">{p.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="label mr-2 hidden sm:inline">
                {fmt(ui.projects.projectOf, { i: index! + 1, n: featured.length })}
              </span>
              <button className={nav} onClick={() => onGo((index! - 1 + featured.length) % featured.length)} aria-label={ui.projects.previousProject}>
                ‹
              </button>
              <button className={nav} onClick={() => onGo((index! + 1) % featured.length)} aria-label={ui.projects.nextProject}>
                ›
              </button>
              <button className={nav} onClick={onClose} aria-label={ui.close}>
                ×
              </button>
            </div>
          </div>
          <div className="grid min-h-0 overflow-y-auto md:grid-cols-[1.15fr_1fr]" data-lenis-prevent>
            <div className="relative h-[34svh] bg-ink md:h-auto md:min-h-[26rem]">
              {p.cardVideo && <LoopVideo key={p.id} name={p.cardVideo} label={`${p.title}: ${ui.projects.syntheticRender}`} />}
            </div>
            <div className="flex flex-col gap-4 p-6 md:p-7">
              <div>
                <h3 className="text-[clamp(1.4rem,3.2svh,1.9rem)] font-medium leading-tight tracking-tight">{p.title}</h3>
                <p className="mt-2 text-[0.88rem] text-mute">{p.client}</p>
              </div>
              <p className="leading-relaxed text-paper/80">{p.summary}</p>
              <div className="rounded-lg border border-signal/25 bg-signal/[0.04] p-4">
                <p className="label mb-2 !text-signal">{ui.projects.myRole}</p>
                <ul className="space-y-1.5 text-[0.92rem] text-paper/90">
                  {p.did.map((d) => (
                    <li key={d} className="flex gap-3">
                      <span className="mt-[0.6em] h-px w-3 shrink-0 bg-signal" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="flex flex-wrap gap-1.5" aria-label={ui.projects.stack}>
                {p.stack.map((s) => (
                  <li key={s} className="rounded-[3px] border border-line px-2 py-1 font-mono text-[0.75rem] text-mute">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            {/* the tunnel inspection platform shows its service architecture right here */}
            {p.id === 'tunnel-platform' && (
              <div className="border-t border-line p-6 md:col-span-2 md:p-7">
                <p className="eyebrow mb-2">{ui.projects.architecture}</p>
                <h4 className="display text-[clamp(1.5rem,3.4svh,2.1rem)]">
                  {architecture.title[0]} <span className="accent">{architecture.title[1]}</span>
                </h4>
                <p className="mb-5 mt-2 max-w-2xl text-[0.92rem] leading-relaxed text-paper/75">{architecture.lede}</p>
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
  const { featured, more, academic, ui, status } = useContent()
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  return (
    <>
      <ProjectDialog index={openIdx} onClose={() => setOpenIdx(null)} onGo={setOpenIdx} />
      <section id="work" className="relative pb-[8svh] pt-[clamp(5rem,12svh,8rem)]">
        <div className="container-x">
          <SectionHead
            eyebrow={ui.projects.eyebrow}
            title={ui.projects.title}
            lede={ui.projects.lede}
          />

          <div className={`mt-[5svh] ${sub}`}>
            <h3 className="text-[clamp(1.2rem,2.8svh,1.5rem)] font-medium tracking-tight">{ui.projects.industrial}</h3>
            <p className="text-[0.88rem] text-mute">2024 – {ui.present}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Card key={p.id} p={p} onOpen={() => setOpenIdx(i)} />
            ))}
          </div>

          <ul className="mt-[4svh] divide-y divide-line border-y border-line">
            {more.map((p) => (
              <li key={p.id} id={`p-${p.id}`} className="grid scroll-mt-24 gap-2 py-[2svh] md:grid-cols-12 md:gap-6">
                <div className="md:col-span-4">
                  <h4 className="text-[1.05rem] font-medium tracking-tight">{p.title}</h4>
                  <p className="mt-1 text-[0.82rem] text-mute">{p.client}</p>
                </div>
                <p className="text-[0.9rem] leading-relaxed text-paper/75 md:col-span-6">{p.summary}</p>
                <div className="flex flex-wrap items-start gap-x-3 gap-y-2 md:col-span-2 md:flex-col md:items-end">
                  <StatusPill status={status(p.status)} live={p.status === 'In production'} />
                  <span className="label">{p.year}</span>
                </div>
              </li>
            ))}
          </ul>

          {/* My products are hidden for now (on hold); data kept in content.ts */}
          <div className={`mt-[8svh] ${sub}`}>
            <h3 className="text-[clamp(1.2rem,2.8svh,1.5rem)] font-medium tracking-tight">{ui.projects.academic}</h3>
            <p className="text-[0.88rem] text-mute">{ui.projects.academicNote}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {academic.map((a) => (
              <article
                key={a.id}
                id={`p-${a.id}`}
                className="group flex scroll-mt-24 flex-col overflow-hidden rounded-xl border border-line bg-ink-2/70 backdrop-blur-sm"
              >
                <div className="relative overflow-hidden border-b border-line">
                  <MediaCarousel items={a.media} title={a.title} />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-[clamp(0.9rem,2.2svh,1.25rem)]">
                  <p className="label">
                    {a.context} · {a.year}
                  </p>
                  <h4 className="text-[1.05rem] font-medium leading-tight tracking-tight">{a.title}</h4>
                  <p className="text-[0.88rem] leading-relaxed text-paper/75">{a.summary}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-1 pt-1">
                    {a.stack.map((s) => (
                      <span key={s} className="rounded-[3px] border border-line px-1.5 py-0.5 font-mono text-[0.72rem] text-mute">
                        {s}
                      </span>
                    ))}
                  </div>
                  {a.links && (
                    <div className="flex flex-wrap gap-x-4 pt-1">
                      {a.links.map(([l, h]) => (
                        <a key={h} href={h} target="_blank" rel="noreferrer" className="font-mono text-[0.75rem] text-signal hover:underline">
                          {l} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
