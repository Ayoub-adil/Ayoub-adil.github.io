import { academic, experience, projects, type Job } from '../content/content'
import { SectionHead } from './ui'

const titleOf = (id: string) => projects.find((p) => p.id === id)?.title ?? academic.find((a) => a.id === id)?.title ?? id

function JobCard({ job, main = false }: { job: Job; main?: boolean }) {
  return (
    <article className={`flex flex-col rounded-xl border border-line bg-ink-2/60 backdrop-blur-sm ${main ? 'p-[clamp(1rem,2.6svh,1.75rem)]' : 'p-[clamp(0.85rem,2svh,1.25rem)]'}`}>
      <p className="font-mono text-xs text-signal">
        {job.from} – {job.to}
      </p>
      <h3 className={`mt-2 font-medium leading-tight tracking-tight ${main ? 'text-[clamp(1.2rem,2.9svh,1.8rem)]' : 'text-[1.15rem]'}`}>{job.org}</h3>
      <p className="label mt-1 !normal-case !tracking-normal !text-[0.8rem]">{job.place}</p>

      <ol className={`relative border-l border-line pl-5 ${main ? 'mt-[2svh] space-y-[1.3svh]' : 'mt-[1.3svh] space-y-1.5'}`}>
        {job.roles.map((r, i) => (
          <li key={r.title + r.from} className="relative">
            <span
              className={`absolute -left-[1.48rem] top-1.5 h-2 w-2 rounded-full ${i === 0 && main ? 'bg-signal shadow-[0_0_10px_var(--color-signal)]' : 'border border-mute bg-ink'}`}
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <p className={main ? 'text-[1.05rem] font-medium' : 'text-[0.95rem] font-medium'}>{r.title}</p>
              <p className="font-mono text-[0.7rem] text-mute">
                {r.from} – {r.to}
              </p>
            </div>
            {r.note && <p className="mt-0.5 text-[0.84rem] text-paper/65">{r.note}</p>}
          </li>
        ))}
      </ol>

      <p className={`leading-relaxed text-paper/75 ${main ? 'mt-[2svh] text-[0.94rem]' : 'mt-[1.3svh] text-[0.84rem]'}`}>{job.summary}</p>

      {job.projects && (
        <ul className="mt-[1.6svh] flex flex-wrap gap-1.5">
          {job.projects.map((id) => (
            <li key={id}>
              <a
                href={`#p-${id}`}
                className="inline-block rounded-full border border-line px-2.5 py-1 text-[0.76rem] text-paper/80 transition-colors hover:border-signal hover:text-paper"
              >
                {titleOf(id)}
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default function Experience() {
  const [main, ...earlier] = experience
  return (
    <section id="experience" className="screen relative">
      <div className="container-x">
        <SectionHead
          n="02"
          eyebrow="Experience"
          title={['Where I’ve', 'worked so far.']}
          lede="From VR research in a university lab to industrial vision systems running on trains and in factories."
        />
        <div className="mt-[3svh] grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <JobCard job={main} main />
          </div>
          <div className="grid content-start gap-3 lg:col-span-5">
            {earlier.map((job) => (
              <JobCard key={job.org} job={job} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
