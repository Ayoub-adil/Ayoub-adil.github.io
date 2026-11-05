import { hero } from '../content/content'
import { Button } from './ui'

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh flex-col justify-end pb-[11vh] pt-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/45 to-transparent md:via-ink/30 md:to-60%" />
      <div className="container-x relative">
        <div className="mb-8 flex items-center gap-4 reveal">
          <img
            src="/img/ayoub-600.webp"
            alt=""
            width={56}
            height={56}
            className="h-14 w-14 rounded-full border border-paper/20 object-cover object-[50%_20%]"
          />
          <p className="eyebrow">{hero.eyebrow}</p>
        </div>
        <h1 className="display text-[clamp(3.2rem,9.6vw,8.6rem)] reveal">{hero.name}</h1>
        <p className="mt-3 text-[clamp(1.6rem,3.6vw,3rem)] leading-[1.05] tracking-tight reveal">
          {hero.title[0]} <span className="accent text-signal">{hero.title[1]}</span>
        </p>
        <p className="mt-7 max-w-xl text-[1.06rem] leading-relaxed text-paper/75 reveal">{hero.lede}</p>
        <div className="mt-9 flex flex-wrap gap-3 reveal">
          <Button href="#about">About me</Button>
          <Button href="/cv/" variant="ghost">
            View my CV
          </Button>
        </div>
        <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-4 border-t border-paper/10 pt-6 md:grid-cols-4 reveal">
          {hero.facts.map(([k, v]) => (
            <div key={k}>
              <dt className="label !text-[0.62rem]">{k}</dt>
              <dd className="mt-1 text-[0.9rem] text-paper/85">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <a href="#about" className="absolute bottom-5 right-[clamp(1.25rem,4vw,3rem)] hidden flex-col items-center gap-3 md:flex" aria-label="Scroll to About me">
        <span className="relative h-10 w-px overflow-hidden bg-paper/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_ease-in-out_infinite] bg-signal" />
        </span>
        <span className="label !text-[0.62rem]">Scroll</span>
      </a>
    </section>
  )
}
