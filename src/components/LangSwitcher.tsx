import { useEffect, useRef, useState } from 'react'
import { LANGS, useLang, type Lang } from '../i18n'

/** Small inline flags (3:2). England for English, Morocco for Arabic, as asked. */
export function Flag({ lang, className = 'h-3.5 w-[1.3125rem]' }: { lang: Lang; className?: string }) {
  const svg = (children: React.ReactNode) => (
    <svg viewBox="0 0 30 20" className={`${className} shrink-0 rounded-[2px] ring-1 ring-black/20`} aria-hidden>
      {children}
    </svg>
  )
  switch (lang) {
    case 'fr':
      return svg(
        <>
          <rect width="10" height="20" fill="#002654" />
          <rect x="10" width="10" height="20" fill="#fff" />
          <rect x="20" width="10" height="20" fill="#ED2939" />
        </>,
      )
    case 'de':
      return svg(
        <>
          <rect width="30" height="6.67" fill="#000" />
          <rect y="6.67" width="30" height="6.67" fill="#DD0000" />
          <rect y="13.33" width="30" height="6.67" fill="#FFCE00" />
        </>,
      )
    case 'ar': {
      // Morocco: red field, green interlaced pentagram (drawn as a star outline)
      const r = 4.6
      const pts = [0, 2, 4, 1, 3].map((k) => {
        const a = -Math.PI / 2 + (k * 2 * Math.PI) / 5
        return `${(15 + r * Math.cos(a)).toFixed(2)},${(10.4 + r * Math.sin(a)).toFixed(2)}`
      })
      return svg(
        <>
          <rect width="30" height="20" fill="#C1272D" />
          <polygon points={pts.join(' ')} fill="none" stroke="#006233" strokeWidth="0.9" strokeLinejoin="miter" />
        </>,
      )
    }
    default:
      // England: St George's cross
      return svg(
        <>
          <rect width="30" height="20" fill="#fff" />
          <rect x="13" width="4" height="20" fill="#CE1124" />
          <rect y="8" width="30" height="4" fill="#CE1124" />
        </>,
      )
  }
}

/** Language dropdown: flag + code on the button, flag + language name in the list. */
export default function LangSwitcher({ tone = 'dark', align = 'end' }: { tone?: 'dark' | 'light'; align?: 'start' | 'end' }) {
  const { lang, setLang, c } = useLang()
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const current = LANGS.find((l) => l.code === lang)!

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const dark = tone === 'dark'
  return (
    <div ref={root} className="relative" dir="ltr">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${c.ui.language}: ${current.label}`}
        className={`inline-flex items-center gap-2 rounded-[3px] border px-2.5 py-[0.45rem] font-mono text-[0.75rem] tracking-[0.14em] ${
          dark ? 'border-paper/30 text-paper hover:border-paper' : 'border-[#0a0d12]/20 bg-white text-[#0a0d12]'
        }`}
      >
        <Flag lang={lang} />
        {current.short}
        <svg viewBox="0 0 10 6" className={`h-1.5 w-2.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden>
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label={c.ui.language}
          className={`absolute top-full z-50 mt-2 min-w-[11rem] overflow-hidden rounded-md border py-1 shadow-xl ${align === 'end' ? 'right-0' : 'left-0'} ${
            dark ? 'border-line bg-ink-2' : 'border-[#0a0d12]/15 bg-white text-[#0a0d12]'
          }`}
        >
          {LANGS.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === lang}>
              <button
                type="button"
                lang={l.code}
                onClick={() => {
                  setLang(l.code)
                  setOpen(false)
                }}
                className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm ${
                  dark ? 'hover:bg-paper/5' : 'hover:bg-[#0a0d12]/5'
                } ${l.code === lang ? (dark ? 'text-signal' : 'text-[#a8740a]') : ''}`}
              >
                <Flag lang={l.code} />
                <span className="flex-1">{l.label}</span>
                <span className="font-mono text-[0.7rem] opacity-60">{l.short}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
