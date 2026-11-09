import { useContent } from '../i18n'
import { Button } from './ui'

export default function Hero() {
  const { hero, ui } = useContent()
  return (
    <section id="top" className="relative flex min-h-svh flex-col justify-end pb-[8svh] pt-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/75 to-ink/35 md:bg-gradient-to-r md:from-ink/90 md:via-ink/30 md:to-transparent md:to-60% rtl:md:bg-gradient-to-l" />
      <div className="container-x relative">
        <h1 className="display text-[clamp(3rem,min(9.6vw,13svh),8.6rem)] reveal">{hero.name}</h1>
        <p className="mt-3 text-[clamp(1.6rem,3.6vw,3rem)] leading-[1.05] tracking-tight reveal">
          {hero.title[0]} <span className="accent text-signal">{hero.title[1]}</span>
        </p>
        <p className="mt-[3svh] max-w-xl text-[1.06rem] leading-relaxed text-paper/80 reveal">{hero.lede}</p>
        <div className="mt-[3.5svh] flex flex-wrap gap-3 reveal">
          <Button href="#work">{ui.hero.seeProjects}</Button>
          <Button href="/cv/" variant="ghost">
            {ui.hero.viewCv}
          </Button>
        </div>
        <dl className="mt-[5svh] grid max-w-3xl grid-cols-2 gap-x-8 gap-y-4 border-t border-paper/10 pt-6 md:grid-cols-4 reveal">
          {hero.facts.map(([k, v]) => (
            <div key={k}>
              <dt className="label">{k}</dt>
              <dd className="mt-1 text-[0.9rem] text-paper/85">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <a href="#about" className="absolute bottom-5 end-[clamp(1.25rem,4vw,3rem)] hidden flex-col items-center gap-3 md:flex" aria-label={ui.hero.scrollAria}>
        <span className="relative h-10 w-px overflow-hidden bg-paper/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_ease-in-out_infinite] bg-signal" />
        </span>
        <span className="label">{ui.hero.scroll}</span>
      </a>
    </section>
  )
}
