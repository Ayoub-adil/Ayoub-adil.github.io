import { useEffect, useState } from 'react'
import { Arrow } from './ui'
import LangSwitcher from './LangSwitcher'
import { useContent } from '../i18n'

export default function Nav() {
  const c = useContent()
  const t = c.ui.nav
  const links = [
    { href: '#about', label: t.about },
    { href: '#experience', label: t.experience },
    { href: '#education', label: t.education },
    { href: '#work', label: t.projects },
    { href: '#skills', label: t.skills },
  ]
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? 'bg-ink/75 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:bg-ink focus:px-3 focus:py-2">
        {c.ui.skip}
      </a>
      <nav className="container-x flex h-16 items-center justify-between" aria-label="Main">
        <a href="#top" className="flex items-center gap-3" aria-label={c.ui.home}>
          <Mark />
          <span className="font-mono text-[0.78rem] font-semibold uppercase tracking-[0.22em]">{c.name}</span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="label !text-paper/80 transition-colors hover:!text-signal">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LangSwitcher />
          <a href="/cv/" className="label hidden rounded-[3px] border border-paper/30 px-3.5 py-2 !text-paper hover:border-paper md:inline-block">
            {t.cv}
          </a>
          <a href="#contact" className="label hidden items-center gap-2 rounded-[3px] bg-signal px-3.5 py-2 !text-ink hover:bg-paper md:inline-flex">
            {t.contact} <Arrow out={false} />
          </a>
          <button className="label ms-2 !text-paper lg:hidden" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
            {open ? c.ui.close : c.ui.menu}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="container-x pb-6 lg:hidden">
          <ul className="flex flex-col gap-1 border-t border-line pt-4">
            {[...links, { href: '/cv/', label: t.cv }, { href: '#contact', label: t.contact }].map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block py-2 text-2xl">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

/**
 * The site's logo (nav, footer): same render as the CV header, without the background. The whole cut-out photo at the
 * circle's width, so the head stays complete and the circle only hides the straight cut at the bottom.
 */
export function Mark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <span className={`${className} block shrink-0 overflow-hidden rounded-full`} aria-hidden>
      <img src="/img/ayoub-cutout-600.webp" alt="" width={600} height={750} decoding="async" className="block h-auto w-full" />
    </span>
  )
}
