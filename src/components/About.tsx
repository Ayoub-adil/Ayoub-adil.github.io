import { about, profile, recommendation } from '../content/content'
import { T, Title } from './ui'

export default function About() {
  return (
    <section id="about" className="screen relative">
      <div className="container-x grid items-center gap-[4svh] lg:grid-cols-12 lg:gap-14">
        <figure className="lg:order-2 lg:col-span-5 lg:justify-self-center">
          <div className="relative mx-auto w-fit">
            {/* cut-out portrait (same crop and matte as the hero point cloud, which lands on it) */}
            <img
              id="about-photo"
              src="/img/ayoub-cutout.webp"
              srcSet="/img/ayoub-cutout-600.webp 600w, /img/ayoub-cutout.webp 1200w"
              sizes="(min-width: 1024px) 34vw, 92vw"
              alt="Portrait of Ayoub ADIL"
              width={1200}
              height={1500}
              decoding="async"
              className="aspect-[4/5] h-[min(64svh,620px,110vw)] w-auto object-cover [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
            />
            <figcaption className="mt-2 flex items-end justify-between border-t border-line pt-4">
              <span className="label !text-paper/90">{profile.name}</span>
              <span className="label !text-paper/70">Software Engineer · 3D & vision</span>
            </figcaption>
          </div>
        </figure>

        <div className="flex flex-col lg:order-1 lg:col-span-7">
          <p className="eyebrow mb-[2svh]">
            <span className="mr-3 text-mute">01</span>
            {about.eyebrow}
          </p>
          <Title lines={about.title} className="text-[clamp(2rem,min(4.6vw,6.6svh),3.8rem)]" />
          <div className="mt-[3svh] space-y-[1.4svh] text-[clamp(0.9rem,1.9svh,1.02rem)] leading-relaxed text-paper/80">
            {about.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <blockquote className="mt-[3svh] border-l-2 border-signal pl-5">
            <p className="accent text-[clamp(1.1rem,2.6svh,1.4rem)] leading-snug text-paper/95">“{recommendation.quote}”</p>
            <footer className="label mt-2 !normal-case !tracking-normal !text-[0.8rem]">{recommendation.author}</footer>
          </blockquote>

          <div className="mt-[3.5svh] grid gap-6 sm:grid-cols-2">
            <div>
              <p className="label mb-2">Languages</p>
              <ul className="space-y-1 text-sm">
                {profile.languages.map((l) => (
                  <li key={l.name} className="flex justify-between gap-4 border-b border-line pb-1">
                    <span>{l.name}</span>
                    <span className="text-mute">
                      <T>{l.level}</T>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label mb-2">Find me</p>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between gap-4 border-b border-line pb-1">
                  <span>LinkedIn</span>
                  <a className="text-mute hover:text-signal" href={profile.linkedin} target="_blank" rel="noreferrer">
                    in/ayoub-adil ↗
                  </a>
                </li>
                <li className="flex justify-between gap-4 border-b border-line pb-1">
                  <span>GitHub</span>
                  <a className="text-mute hover:text-signal" href={profile.github} target="_blank" rel="noreferrer">
                    Ayoub-adil ↗
                  </a>
                </li>
                <li className="flex justify-between gap-4 border-b border-line pb-1">
                  <span>CV</span>
                  <a className="text-mute hover:text-signal" href="/cv/">
                    Web / PDF ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
