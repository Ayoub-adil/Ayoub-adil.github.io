import { hero, profile } from '../content/content'
import { Button } from './ui'

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh flex-col justify-end pb-[12vh] pt-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/45 to-transparent md:via-ink/30 md:to-60%" />
      <div className="container-x relative">
        <p className="eyebrow mb-7 reveal">{hero.eyebrow}</p>
        <h1 className="display max-w-[14ch] text-[clamp(3rem,8.4vw,7.6rem)] reveal">
          <span className="block">{hero.title[0]}</span>
          <span className="accent block text-[1.06em]">
            to <span className="text-signal">{hero.accent}</span>
          </span>
        </h1>
        <p className="mt-8 max-w-xl text-[1.08rem] leading-relaxed text-paper/75 reveal">{hero.lede}</p>
        <div className="mt-10 flex flex-wrap gap-3 reveal">
          <Button href="#cad">Open the CAD viewer</Button>
          <Button href="#work" variant="ghost">
            Selected work
          </Button>
        </div>
        <p className="label mt-12 reveal">
          {profile.role} · {profile.company} · {profile.location}
        </p>
      </div>

      <a href="#process" className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3" aria-label="Scroll to the process">
        <span className="relative h-10 w-px overflow-hidden bg-paper/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_ease-in-out_infinite] bg-signal" />
        </span>
        <span className="label !text-[0.62rem]">Scroll</span>
      </a>
    </section>
  )
}
