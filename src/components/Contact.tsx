import { isTodo, profile } from '../content/content'
import { Mark } from './Nav'
import { Arrow, Button, T } from './ui'

export default function Contact() {
  const mail = isTodo(profile.email) ? null : profile.email
  return (
    <>
      {/* contact and footer share one screen */}
      <section id="contact" className="relative flex min-h-svh flex-col pt-[max(4.5rem,9svh)]">
        <div className="container-x flex flex-1 flex-col items-center justify-center text-center">
          <p className="eyebrow mb-[3svh]">Contact</p>
          <h2 className="display mx-auto max-w-[16ch] text-[clamp(2.4rem,min(7.4vw,10svh),6.2rem)]">
            Let’s build <span className="accent">the next part.</span>
          </h2>
          <p className="mx-auto mt-[3svh] max-w-md text-paper/70">Open to 3D software roles. The quickest way to reach me is email or LinkedIn.</p>
          <div className="mt-[4svh] flex flex-wrap justify-center gap-3">
            {mail ? <Button href={`mailto:${mail}`}>{mail}</Button> : <T>{profile.email}</T>}
            <Button href={profile.linkedin} variant="ghost" external>
              LinkedIn
            </Button>
            <Button href="/cv/" variant="ghost">
              CV
            </Button>
          </div>
        </div>

      <footer className="mt-[4svh] border-t border-line">
        <div className="container-x grid gap-8 py-[4svh] md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <Mark />
              <span className="font-mono text-[0.78rem] font-semibold uppercase tracking-[0.22em]">Ayoub Adil</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mute">
              Software engineer, 3D & computer vision. Master’s in Image & 3D, University of Strasbourg.
            </p>
          </div>
          <FooterCol
            title="Site"
            links={[
              ['About', '#about'],
              ['Experience', '#experience'],
              ['Education', '#education'],
              ['Projects', '#work'],
              ['Skills', '#skills'],
            ]}
          />
          <FooterCol
            title="Elsewhere"
            links={[
              ['LinkedIn', profile.linkedin],
              ['GitHub', profile.github],
              ['CV', '/cv/'],
            ]}
          />
          <div className="md:col-span-3">
            <p className="label mb-4">Note</p>
            <p className="text-sm leading-relaxed text-mute">Client names are withheld. Industrial 3D scenes and diagrams are synthetic.</p>
          </div>
        </div>
        <div className="container-x flex flex-wrap justify-between gap-2 border-t border-line py-[2svh]">
          <p className="label !text-[0.62rem]">© {new Date().getFullYear()} {profile.name}</p>
          <a href="#top" className="label !text-[0.62rem] hover:!text-signal">
            Back to top ↑
          </a>
        </div>
      </footer>
      </section>
    </>
  )
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="md:col-span-2">
      <p className="label mb-4">{title}</p>
      <ul className="space-y-2 text-sm">
        {links.map(([l, h]) => (
          <li key={l}>
            <a href={h} className="group inline-flex items-center gap-1.5 text-paper/80 hover:text-signal" {...(h.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>
              {l}
              {h.startsWith('http') && <Arrow className="opacity-60" />}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
