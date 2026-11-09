import { useContent } from '../i18n'
import { SectionHead } from './ui'

export default function Skills() {
  const { skills, ui } = useContent()
  return (
    <section id="skills" className="screen relative">
      <div className="container-x">
        <SectionHead eyebrow={ui.skills.eyebrow} title={ui.skills.title} />

        <div className="mt-[3.5svh]">
          <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills).map(([k, v]) => (
              <div key={k} className="bg-ink-2/90 p-[clamp(0.9rem,2svh,1.25rem)] backdrop-blur-sm">
                <dt className="label mb-2.5 !text-signal">{k}</dt>
                <dd className="flex flex-wrap gap-1">
                  {v.map((s) => (
                    <span key={s} className="rounded-[3px] border border-line px-2 py-0.5 text-[0.82rem] text-paper/85">
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
