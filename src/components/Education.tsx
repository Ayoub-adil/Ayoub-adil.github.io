import { useContent } from '../i18n'
import { SectionHead } from './ui'

// The three degrees that shaped my profile get a card; the earlier ones fit on one line.
const MAIN = 3

export default function Education() {
  const { education, recommendation, ui } = useContent()
  const main = education.slice(0, MAIN)
  const earlier = education.slice(MAIN)
  return (
    <section id="education" className="screen relative">
      <div className="container-x">
        <SectionHead eyebrow={ui.education.eyebrow} title={ui.education.title} />

        <ol className="mt-[4svh] grid gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-3">
          {main.map((e, i) => (
            <li key={e.title} className="flex flex-col gap-2 bg-ink-2/90 p-[clamp(1rem,2.6svh,1.75rem)] backdrop-blur-sm">
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs text-signal">{e.years}</span>
                {'logo' in e && e.logo && (
                  <img src={e.logo} alt="" loading="lazy" decoding="async" className="h-9 w-auto max-w-[45%] object-contain opacity-80" />
                )}
              </div>
              <h3 className={`font-medium leading-tight tracking-tight ${i === 0 ? 'text-[clamp(1.3rem,3svh,1.7rem)]' : 'text-[1.15rem]'}`}>{e.title}</h3>
              <p className="text-[0.9rem] text-mute">{e.org}</p>
              {e.body && <p className="text-[0.92rem] leading-relaxed text-paper/75">{e.body}</p>}
            </li>
          ))}
        </ol>

        <div className="mt-[3svh] grid gap-6 md:grid-cols-12">
          <div className="flex items-baseline gap-4 md:col-span-6">
            <span className="label shrink-0">{ui.education.earlier}</span>
            <ul className="space-y-1 text-[0.92rem] leading-relaxed text-paper/75">
              {earlier.map((e) => (
                <li key={e.title}>
                  {e.title} <span className="text-mute">({e.years})</span>
                </li>
              ))}
            </ul>
          </div>
          <blockquote className="border-s-2 border-signal ps-5 md:col-span-6">
            <p lang="en" dir="ltr" className="accent text-[clamp(1.05rem,2.4svh,1.3rem)] leading-snug text-paper/90">“{recommendation.quote}”</p>
            <footer className="label mt-2 !normal-case !tracking-normal">{recommendation.author}, {ui.education.recommendationLetter}</footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
