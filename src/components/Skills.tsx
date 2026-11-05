import { certifications, howIBuild, marquee, skills } from '../content/content'
import { SectionHead, T, Title } from './ui'

// Skills, certifications and how I work.
export default function Skills() {
  return (
    <section id="skills" className="relative py-[clamp(6rem,14vh,10rem)]">
      <div className="container-x">
        <SectionHead
          n="07"
          eyebrow="Skills"
          title={['My toolbox,', 'from shaders to sensors.']}
          lede="Languages and frameworks I use, the 3D tools I learned in my master’s, and the hardware I integrate at work."
        />

        <dl className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skills).map(([k, v]) => (
            <div key={k} className="bg-ink-2/90 p-6 backdrop-blur-sm">
              <dt className="label mb-4 !text-signal">{k}</dt>
              <dd className="flex flex-wrap gap-1.5">
                {v.map((s) => (
                  <span key={s} className="rounded-[3px] border border-line px-2.5 py-1 text-[0.88rem] text-paper/85">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-20 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow mb-5">{howIBuild.eyebrow}</p>
            <Title lines={howIBuild.title} className="text-[clamp(2rem,4.2vw,3.4rem)]" />
            <p className="mt-6 max-w-sm leading-relaxed text-mute">{howIBuild.lede}</p>
            <p className="label mb-3 mt-10">Certifications</p>
            <ul className="space-y-1.5 text-sm text-paper/80">
              {certifications.map((c) => (
                <li key={c} className="border-b border-line pb-1.5">
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <ul className="grid content-start gap-4 md:col-span-7">
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

      <div className="mt-24 overflow-hidden border-y border-line py-5" aria-label="Technologies">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-12 font-mono text-sm uppercase tracking-[0.16em] text-mute" aria-hidden={i >= marquee.length}>
              {m}
              <span className="h-1 w-1 rounded-full bg-signal" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
