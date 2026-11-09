import { useContent } from '../i18n'
import { T, Title } from './ui'

export default function About() {
  const { about, profile, ui } = useContent()
  return (
    <section id="about" className="screen relative">
      <div className="container-x grid items-center gap-[4svh] lg:grid-cols-12 lg:gap-14">
        <figure className="lg:order-2 lg:col-span-5 lg:justify-self-center">
          {/* cut-out portrait (same crop and matte as the hero point cloud, which lands on it) */}
          <img
            id="about-photo"
            src="/img/ayoub-cutout.webp"
            srcSet="/img/ayoub-cutout-600.webp 600w, /img/ayoub-cutout.webp 1200w"
            sizes="(min-width: 1024px) 34vw, 92vw"
            alt={ui.about.portraitAlt}
            width={1200}
            height={1500}
            decoding="async"
            className="mx-auto block aspect-[4/5] h-[min(64svh,620px,110vw)] w-auto object-cover [mask-image:linear-gradient(to_bottom,black_70%,transparent)] max-lg:h-[min(46svh,110vw)]"
          />
        </figure>

        <div className="flex flex-col lg:order-1 lg:col-span-7">
          <p className="eyebrow mb-[2svh]">{about.eyebrow}</p>
          <Title lines={about.title} className="text-[clamp(2rem,min(4.6vw,6.6svh),3.8rem)]" />
          <div className="mt-[3svh] space-y-[1.4svh] text-[clamp(0.95rem,2svh,1.06rem)] leading-relaxed text-paper/80">
            {about.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-[4svh] grid max-w-2xl gap-6 sm:grid-cols-2">
            <div>
              <p className="label mb-2">{ui.about.languages}</p>
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
              <p className="label mb-2">
                {ui.about.outsideWork} · {about.outside.category}
              </p>
              <ul className="space-y-1 text-sm">
                {about.outside.items.map((h) => (
                  <li key={h.name} className="flex items-center gap-3 border-b border-line pb-1.5">
                    <img src={h.rankIcon} alt="" className="h-9 w-auto shrink-0" />
                    <span className="min-w-0">
                      <span className="flex items-center gap-2">
                        <img src={h.icon} alt="" className="h-3 w-auto" />
                        {h.name} <span className="text-mute">· {h.mode}</span>
                      </span>
                      <span className="block text-[0.8rem] text-mute">
                        <span className="text-paper/85">{h.rank}</span> · {h.percentile}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
