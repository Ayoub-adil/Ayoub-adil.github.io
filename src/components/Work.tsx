import { featured, more, type Project } from '../content/content'
import { ProjectVisual } from './visuals/Visuals'
import { SectionHead, StatusPill } from './ui'

const pad = (n: number) => String(n).padStart(2, '0')

function Card({ p, n }: { p: Project; n: number }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-line bg-ink-2/70 backdrop-blur-sm transition-colors duration-500 hover:border-paper/25">
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
        <p className="label !normal-case !tracking-normal !text-[0.82rem]">
          {p.client}
          {p.role && <> · {p.role}</>}
        </p>
        <p className="leading-relaxed text-paper/75">{p.summary}</p>
        <ul className="mt-1 space-y-1.5 text-[0.92rem] text-paper/85">
          {p.did.map((d) => (
            <li key={d} className="flex gap-3">
              <span className="mt-[0.6em] h-px w-3 shrink-0 bg-signal" />
              {d}
            </li>
          ))}
        </ul>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
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

export default function Work() {
  return (
    <section id="work" className="relative py-[clamp(6rem,14vh,10rem)]">
      <div className="container-x">
        <SectionHead
          n="01"
          eyebrow="Selected work"
          title={['Sensors, geometry,', 'software that ships.']}
          lede="Industrial projects at R&D Vision, 3D first. Clients are anonymised and every visual on this page is synthetic."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((p, i) => (
            <Card key={p.id} p={p} n={i + 1} />
          ))}
        </div>

        <div className="mt-20">
          <p className="label mb-6">More projects</p>
          <ul className="divide-y divide-line border-y border-line">
            {more.map((p, i) => (
              <li key={p.id} className="grid gap-3 py-6 md:grid-cols-12 md:gap-6">
                <span className="font-mono text-xs text-signal md:col-span-1">{pad(featured.length + i + 1)}</span>
                <div className="md:col-span-4">
                  <h3 className="text-lg font-medium tracking-tight">{p.title}</h3>
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
        </div>
      </div>
    </section>
  )
}
