import { useContent } from '../i18n'
import { SectionHead } from './ui'

export default function Experience() {
  const { experience, ui } = useContent()
  return (
    <section id="experience" className="relative pb-[clamp(4rem,10svh,7rem)] pt-[clamp(5rem,12svh,8rem)]">
      <div className="container-x">
        <SectionHead
          eyebrow={ui.experience.eyebrow}
          title={ui.experience.title}
          lede={ui.experience.lede}
        />

        <ol className="mt-[5svh] border-t border-line">
          {experience.map((job) => (
            <li key={job.org} className="grid gap-6 border-b border-line py-[4svh] lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="font-mono text-xs text-signal">
                  {job.from} – {job.to}
                </p>
                <h3 className="mt-3 text-[1.7rem] font-medium leading-tight tracking-tight">{job.org}</h3>
                <p className="label mt-2 !normal-case !tracking-normal">{job.place}</p>
              </div>

              <div className="lg:col-span-8">
                <ol className="relative space-y-5 border-s border-line ps-6">
                  {job.roles.map((r, i) => (
                    <li key={r.title + r.from} className="relative">
                      <span
                        className={`absolute -start-[1.72rem] top-1.5 h-2 w-2 rounded-full ${i === 0 ? 'bg-signal shadow-[0_0_10px_var(--color-signal)]' : 'border border-mute bg-ink'}`}
                      />
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                        <p className="text-lg font-medium">{r.title}</p>
                        <p className="font-mono text-[0.75rem] text-mute">
                          {r.from} – {r.to}
                        </p>
                      </div>
                      {r.note && <p className="mt-0.5 text-[0.95rem] text-paper/65">{r.note}</p>}
                    </li>
                  ))}
                </ol>

                <p className="mt-7 max-w-2xl leading-relaxed text-paper/80">{job.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
