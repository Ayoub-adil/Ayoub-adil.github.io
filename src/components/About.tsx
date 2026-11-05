import { about, education, experience, marquee, profile } from '../content/content'
import { T, Title } from './ui'

export default function About() {
  return (
    <section id="about" className="relative py-[clamp(6rem,14vh,10rem)]">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <figure className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-xl border border-line">
            <picture>
              <source type="image/webp" srcSet="/img/ayoub-600.webp 600w, /img/ayoub.webp 1200w" sizes="(min-width: 1024px) 34vw, 92vw" />
              <img
                src="/img/ayoub.jpg"
                alt="Portrait of Ayoub ADIL"
                width={1200}
                height={1500}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover grayscale-[15%]"
              />
            </picture>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <figcaption className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <span className="label !text-paper/90">{profile.name}</span>
              <span className="label !text-paper/70">{profile.location}</span>
            </figcaption>
          </div>
        </figure>

        <div className="lg:col-span-7">
          <p className="eyebrow mb-5">
            <span className="mr-3 text-mute">05</span>
            {about.eyebrow}
          </p>
          <Title lines={about.title} className="text-[clamp(2.4rem,5.2vw,4.4rem)]" />
          <div className="mt-8 space-y-4 text-[1.05rem] leading-relaxed text-paper/80">
            {about.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <div>
              <p className="label mb-4">Experience</p>
              <ol className="space-y-4 border-l border-line pl-5">
                {experience.map((x) => (
                  <li key={x.from} className="relative">
                    <span className="absolute -left-[1.42rem] top-2 h-1.5 w-1.5 rounded-full bg-signal" />
                    <p className="font-mono text-[0.72rem] text-mute">
                      {x.from} – {x.to}
                    </p>
                    <p className="mt-0.5 font-medium">{x.title}</p>
                    <p className="text-sm text-mute">{x.org}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="label mb-4">Education</p>
              <ol className="space-y-4 border-l border-line pl-5">
                {education.map((x, i) => (
                  <li key={i}>
                    <p className="font-mono text-[0.72rem] text-mute">
                      <T>{x.years}</T>
                    </p>
                    <p className="mt-0.5 font-medium">
                      <T>{x.title}</T>
                    </p>
                    <p className="text-sm text-mute">{x.org}</p>
                  </li>
                ))}
              </ol>
              <p className="label mb-3 mt-8">Languages</p>
              <ul className="space-y-1 text-sm">
                {profile.languages.map((l) => (
                  <li key={l.name} className="flex justify-between gap-4">
                    <span>{l.name}</span>
                    <T>{l.level}</T>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
