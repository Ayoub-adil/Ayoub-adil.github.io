import { academic, featured, more, products, type Project } from '../content/content'
import { ProjectVisual } from './visuals/Visuals'
import { SectionHead, StatusPill, T } from './ui'

const pad = (n: number) => String(n).padStart(2, '0')

function Card({ p, n }: { p: Project; n: number }) {
  return (
    <article
      id={`p-${p.id}`}
      className="group flex scroll-mt-24 flex-col overflow-hidden rounded-xl border border-line bg-ink-2/70 backdrop-blur-sm transition-colors duration-500 hover:border-paper/25"
    >
      <div className="relative aspect-[16/10] border-b border-line bg-ink">
        {p.visual && <ProjectVisual kind={p.visual} />}
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
          <p className="label mb-2 !text-[0.62rem] !text-signal">My role{p.role ? ` · ${p.role}` : ''}</p>
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
          lede="Industrial work at R&D Vision, projects from my master’s, and my own products. Clients are anonymised; industrial visuals are synthetic."
        />

        <SubHead label="Industrial · R&D Vision" note="2024 – today" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((p, i) => (
            <Card key={p.id} p={p} n={i + 1} />
          ))}
        </div>

        <ul className="mt-10 divide-y divide-line border-y border-line">
          {more.map((p, i) => (
            <li key={p.id} id={`p-${p.id}`} className="grid scroll-mt-24 gap-3 py-6 md:grid-cols-12 md:gap-6">
              <span className="font-mono text-xs text-signal md:col-span-1">{pad(featured.length + i + 1)}</span>
              <div className="md:col-span-4">
                <h4 className="text-lg font-medium tracking-tight">{p.title}</h4>
                <p className="label mt-1 !normal-case !tracking-normal !text-[0.8rem]">
                  {p.client}
                  {p.role && <> · {p.role}</>}
                </p>
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
            <article
              key={a.id}
              id={`p-${a.id}`}
              className={`group flex scroll-mt-24 flex-col overflow-hidden rounded-xl border border-line bg-ink-2/70 backdrop-blur-sm`}
            >
              <div className="relative overflow-hidden border-b border-line">
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  decoding="async"
                  width={960}
                  height={600}
                  className="aspect-[16/10] w-full object-cover opacity-85 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
                />
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
            </article>
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
