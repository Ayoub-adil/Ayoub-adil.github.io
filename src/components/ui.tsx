import type { ReactNode } from 'react'
import { isTodo } from '../content/content'

/** Renders a value, or a visible TODO marker when the content is missing. */
export function T({ children }: { children: string }) {
  return isTodo(children) ? <span className="todo">{children}</span> : <>{children}</>
}

/** ↗ for links that leave the site, → for links inside it. */
export function Arrow({ className = '', out = true }: { className?: string; out?: boolean }) {
  return (
    <svg viewBox="0 0 12 12" className={`inline-block h-[0.7em] w-[0.7em] rtl:-scale-x-100 ${className}`} aria-hidden>
      <path d={out ? 'M3 9 9 3M4 3h5v5' : 'M2 6h8M6.5 2.5 10 6l-3.5 3.5'} fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

/** Two-line display title: first line sans, second line italic serif. */
export function Title({ lines, as: Tag = 'h2', className = '' }: { lines: string[]; as?: 'h1' | 'h2' | 'h3'; className?: string }) {
  return (
    <Tag className={`display ${className}`}>
      <span className="block">{lines[0]}</span>
      {lines[1] && <span className="accent block text-[1.08em] text-paper/95">{lines[1]}</span>}
    </Tag>
  )
}

export function SectionHead({ eyebrow, title, lede, n }: { eyebrow: string; title: string[]; lede?: ReactNode; n?: string }) {
  return (
    <header className="grid gap-6 md:grid-cols-12 md:items-end">
      <div className="md:col-span-7">
        <p className="eyebrow mb-[2svh] flex items-center gap-3">
          {n && <span className="text-mute">{n}</span>}
          {eyebrow}
        </p>
        <Title lines={title} className="text-[clamp(2rem,min(5vw,7svh),4.2rem)]" />
      </div>
      {lede && <p className="max-w-md text-[0.98rem] leading-relaxed text-mute md:col-span-5 md:justify-self-end">{lede}</p>}
    </header>
  )
}

export function Button({
  href,
  children,
  variant = 'solid',
  external,
  className = '',
}: {
  href: string
  children: ReactNode
  variant?: 'solid' | 'ghost'
  external?: boolean
  className?: string
}) {
  const base =
    'group inline-flex items-center gap-3 rounded-full px-5 py-3 text-[0.92rem] font-medium transition-colors duration-300'
  const look =
    variant === 'solid'
      ? 'bg-signal text-ink hover:bg-paper'
      : 'border border-paper/25 text-paper hover:border-paper hover:bg-paper/5'
  return (
    <a href={href} className={`${base} ${look} ${className}`} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {children}
      <Arrow
        out={external || href.startsWith('mailto:')}
        className={`transition-transform duration-300 group-hover:translate-x-0.5 ${external || href.startsWith('mailto:') ? 'group-hover:-translate-y-0.5' : ''}`}
      />
    </a>
  )
}

/** `status` is the label already translated; `live` marks a system in production. */
export function StatusPill({ status, live = false }: { status: string; live?: boolean }) {
  return (
    <span className="label inline-flex items-center gap-2 rounded-full border border-line px-2.5 py-1">
      <span className={`h-1.5 w-1.5 rounded-full ${live ? 'bg-signal shadow-[0_0_8px_var(--color-signal)]' : 'bg-mute/60'}`} />
      {status}
    </span>
  )
}
