import { useEffect, useState } from 'react'
import { Arrow } from './ui'

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#work', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
]

export default function Nav() {
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
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-ink focus:px-3 focus:py-2">
        Skip to content
      </a>
      <nav className="container-x flex h-16 items-center justify-between" aria-label="Main">
        <a href="#top" className="flex items-center gap-3" aria-label="Ayoub ADIL, home">
          <Mark />
          <span className="font-mono text-[0.78rem] font-semibold tracking-[0.22em] uppercase">Ayoub Adil</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="label !text-paper/80 transition-colors hover:!text-signal">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <a href="/cv/" className="label rounded-[3px] border border-paper/30 px-3.5 py-2 !text-paper hover:border-paper">
            CV
          </a>
          <a href="#contact" className="label inline-flex items-center gap-2 rounded-[3px] bg-signal px-3.5 py-2 !text-ink hover:bg-paper">
            Contact <Arrow />
          </a>
        </div>

        <button
          className="label !text-paper md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="container-x pb-6 md:hidden">
          <ul className="flex flex-col gap-1 border-t border-line pt-4">
            {[...links, { href: '/cv/', label: 'CV' }, { href: '#contact', label: 'Contact' }].map((l) => (
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

export function Mark({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <g fill="#FF6A3D">
        <circle cx="9" cy="22" r="1.7" />
        <circle cx="13" cy="16" r="1.7" />
        <circle cx="16" cy="10" r="1.7" />
        <circle cx="19" cy="16" r="1.7" />
        <circle cx="23" cy="22" r="1.7" />
      </g>
      <g fill="#ECE8E1" opacity=".6">
        <circle cx="11" cy="19" r="1" />
        <circle cx="16" cy="19" r="1" />
        <circle cx="21" cy="19" r="1" />
      </g>
    </svg>
  )
}
