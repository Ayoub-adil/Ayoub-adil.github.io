import { certifications, howIBuild, marquee, skills } from '../content/content'
import { SectionHead, T } from './ui'

// Skills, certifications and how I work; sized to fit one screen.
export default function Skills() {
  return (
    <section id="skills" className="screen relative">
      <div className="container-x">
        <SectionHead
          n="06"
          eyebrow="Skills"
          title={['My toolbox,', 'from shaders to sensors.']}
          lede="Languages and frameworks I use, the 3D tools I learned in my master’s, and the hardware I integrate at work."
        />

        <div className="mt-[3.5svh] grid gap-4 lg:grid-cols-12">
          <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            {Object.entries(skills).map(([k, v]) => (
              <div key={k} className="bg-ink-2/90 p-[clamp(0.9rem,2svh,1.25rem)] backdrop-blur-sm">
                <dt className="label mb-2.5 !text-signal">{k}</dt>
                <dd className="flex flex-wrap gap-1">
                  {v.map((s) => (
                    <span key={s} className="rounded-[3px] border border-line px-2 py-0.5 text-[0.8rem] text-paper/85">
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-3 lg:col-span-4">
            <div className="rounded-xl border border-line bg-ink-2/60 p-[clamp(0.9rem,2svh,1.25rem)] backdrop-blur-sm">
              <p className="eyebrow mb-2">{howIBuild.eyebrow}</p>
              <p className="text-[0.92rem] leading-relaxed text-paper/80">{howIBuild.lede}</p>
              <ul className="mt-3 space-y-2.5">
                {howIBuild.items.map((it, i) => (
                  <li key={i}>
                    <p className="text-[0.9rem] font-medium">
                      <T>{it.title}</T>
                    </p>
                    <p className="text-[0.85rem] text-paper/65">
                      <T>{it.body}</T>
                    </p>
                  </li>
                ))}
                <li>
                  <p className="text-[0.9rem] font-medium">This site</p>
                  <p className="text-[0.85rem] text-paper/65">
                    Built with Claude Code: React, three.js and custom GLSL shaders. The point cloud of my head is reconstructed from a photo with a
                    depth-estimation model.
                  </p>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-line bg-ink-2/60 p-[clamp(0.9rem,2svh,1.25rem)] backdrop-blur-sm">
              <p className="label mb-2">Certifications</p>
              <ul className="space-y-1 text-[0.85rem] text-paper/80">
                {certifications.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[2.5svh] overflow-hidden border-y border-line py-[1.2svh]" aria-label="Technologies">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-12 font-mono text-[0.8rem] uppercase tracking-[0.16em] text-mute" aria-hidden={i >= marquee.length}>
              {m}
              <span className="h-1 w-1 rounded-full bg-signal" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
