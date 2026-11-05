import { howIBuild, products } from '../content/content'
import { SectionHead, T, Title } from './ui'

export default function Products() {
  return (
    <section id="products" className="relative py-[clamp(6rem,14vh,10rem)]">
      <div className="container-x">
        <SectionHead
          n="04"
          eyebrow="Products"
          title={['Side projects,', 'built end to end.']}
          lede="Outside client work I design and build my own SaaS products, from the data model to the screens users fill in every day."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {products.map((p, i) => (
            <article key={p.id} className="flex flex-col gap-4 rounded-xl border border-line bg-ink-2/60 p-7 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, '0')}</span>
                <span className="label !text-[0.64rem]">{p.kind}</span>
              </div>
              <h3 className="text-[1.9rem] font-medium tracking-tight">
                <T>{p.name}</T>
              </h3>
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

        <div className="mt-28 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow mb-5">{howIBuild.eyebrow}</p>
            <Title lines={howIBuild.title} className="text-[clamp(2rem,4.2vw,3.4rem)]" />
            <p className="mt-6 max-w-sm leading-relaxed text-mute">{howIBuild.lede}</p>
          </div>
          <ul className="grid gap-4 md:col-span-7">
            {howIBuild.items.map((it, i) => (
              <li key={i} className="rounded-xl border border-line p-6">
                <p className="font-medium">
                  <T>{it.title}</T>
                </p>
                <p className="mt-2 text-paper/70">
                  <T>{it.body}</T>
                </p>
              </li>
            ))}
            <li className="rounded-xl border border-line p-6">
              <p className="font-medium">This site</p>
              <p className="mt-2 text-paper/70">
                Built with Claude Code: React, three.js shaders, and a build123d → glTF exporter that keeps the B-rep topology.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
