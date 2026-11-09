import { isTodo } from '../content/content'
import { useContent } from '../i18n'
import { Mark } from './Nav'
import { Button, T } from './ui'

export default function Contact() {
  const { profile, ui } = useContent()
  const mail = isTodo(profile.email) ? null : profile.email
  return (
    // contact and footer share one screen
    <section id="contact" className="relative flex min-h-[85svh] flex-col pt-[max(4.5rem,9svh)]">
      <div className="container-x flex flex-1 flex-col items-center justify-center text-center">
        <p className="eyebrow mb-[3svh]">{ui.contact.eyebrow}</p>
        <h2 className="display mx-auto max-w-[18ch] text-[clamp(2.4rem,min(7vw,10svh),5.8rem)]">
          {ui.contact.title[0]} <span className="accent">{ui.contact.title[1]}</span>
        </h2>
        <p className="mx-auto mt-[3svh] max-w-md text-paper/75">{ui.contact.line}</p>
        <div className="mt-[4svh] flex flex-wrap justify-center gap-3">
          {mail ? <Button href={`mailto:${mail}`}>
              <span dir="ltr">{mail}</span>
            </Button> : <T>{profile.email}</T>}
          <Button href={profile.linkedin} variant="ghost" external>
            LinkedIn
          </Button>
          <Button href="/cv/" variant="ghost">
            {ui.nav.cv}
          </Button>
        </div>
      </div>

      <footer className="mt-[6svh] border-t border-line">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 py-[3svh]">
          <div className="flex items-center gap-3">
            <Mark />
            <span className="label">© {new Date().getFullYear()} {profile.name}</span>
          </div>
          <a href="#top" className="label hover:!text-signal">
            {ui.contact.backToTop} ↑
          </a>
        </div>
      </footer>
    </section>
  )
}
