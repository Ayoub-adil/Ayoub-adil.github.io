// Language switching for the site and the CV: EN (source), FR, DE, AR (right-to-left).
// The choice comes from ?lang=, then the last choice (localStorage), then the browser language, then English.
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  about,
  academic,
  architecture,
  education,
  experience,
  hero,
  profile,
  projects,
  recommendation,
  skills,
  steps,
  type Status,
} from '../content/content'
import { field } from '../three/store'
import { en, type Lang, type Strings } from './en'
import { fr } from './fr'
import { de } from './de'
import { ar } from './ar'

export type { Lang }

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
  { code: 'ar', label: 'العربية', short: 'AR' },
]

const DICT: Record<Lang, Strings> = { en, fr, de, ar }
const KEY = 'lang'
const isLang = (v: string | null | undefined): v is Lang => !!v && v in DICT

function initialLang(): Lang {
  const q = new URLSearchParams(window.location.search).get('lang')
  if (isLang(q)) return q
  try {
    const saved = window.localStorage.getItem(KEY)
    if (isLang(saved)) return saved
  } catch {
    /* storage unavailable */
  }
  const nav = (navigator.language || 'en').slice(0, 2).toLowerCase()
  return isLang(nav) ? nav : 'en'
}

/** Replace {name} placeholders. */
export const fmt = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''))

/** Site content in one language: same shapes as content.ts, text swapped. */
function localize(s: Strings) {
  const present = (v: string) => (v === 'Present' ? s.ui.present : v)
  const localProjects = projects.map((p) => ({ ...p, ...s.projects[p.id] }))
  return {
    ui: s.ui,
    status: (st: Status) => s.status[st],
    name: s.name,
    profile: {
      ...profile,
      name: s.name,
      location: s.location,
      languages: profile.languages.map((l) => ({ name: s.languageNames[l.name] ?? l.name, level: s.languageLevels[l.level] ?? l.level })),
    },
    hero: { ...hero, name: s.name, title: s.hero.title, lede: s.hero.lede, facts: s.hero.facts },
    about: {
      ...about,
      eyebrow: s.about.eyebrow,
      title: s.about.title,
      body: s.about.body,
      outside: {
        ...about.outside,
        category: s.about.outside.category,
        items: about.outside.items.map((i) => ({ ...i, mode: s.about.outside.mode, percentile: s.about.outside.percentile })),
      },
    },
    steps: steps.map((st) => {
      const t = s.steps[st.id]
      return { ...st, verb: t.verb, object: t.object, body: t.body, refs: st.refs.map(([, id], k) => [t.refs[k], id] as [string, string]) }
    }),
    projects: localProjects,
    featured: localProjects.filter((p) => p.featured),
    more: localProjects.filter((p) => !p.featured),
    academic: academic.map((a) => {
      const t = s.academic[a.id]
      return { ...a, title: t.title, context: t.context, summary: t.summary, media: a.media.map((m, k) => ({ ...m, alt: t.alts[k] ?? m.alt })) }
    }),
    architecture: {
      ...architecture,
      eyebrow: s.architecture.eyebrow,
      title: s.architecture.title,
      lede: s.architecture.lede,
      layers: architecture.layers.map((l) => ({
        ...l,
        label: s.architecture.layers[l.id],
        nodes: l.nodes.map((n) => ({ ...n, ...s.architecture.nodes[n.id] })),
      })),
    },
    experience: experience.map((j) => ({
      ...j,
      place: s.experience.place,
      summary: s.experience.summary,
      to: present(j.to),
      roles: j.roles.map((r, k) => ({ ...r, to: present(r.to), title: s.experience.roles[k].title, note: s.experience.roles[k].note || undefined })),
    })),
    education: education.map((e, k) => ({ ...e, ...s.education[k] })),
    recommendation: { ...recommendation, author: s.recommendationAuthor },
    skills: Object.fromEntries(Object.entries(skills).map(([k, v]) => [s.skills.categories[k] ?? k, v.map((x) => s.skills.items[x] ?? x)])) as Record<
      string,
      string[]
    >,
  }
}

export type Content = ReturnType<typeof localize>

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; c: Content } | null>(null)

export function LangProvider({ children, title }: { children: ReactNode; title?: (c: Content) => string }) {
  const [lang, setLang] = useState<Lang>(initialLang)
  const c = useMemo(() => localize(DICT[lang]), [lang])

  useEffect(() => {
    const html = document.documentElement
    html.lang = lang
    html.dir = lang === 'ar' ? 'rtl' : 'ltr'
    field.rtl = lang === 'ar'
    document.title = title ? title(c) : c.ui.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', c.ui.meta.description)
    try {
      window.localStorage.setItem(KEY, lang)
    } catch {
      /* storage unavailable */
    }
    // keep the choice in the address, so a shared link opens in the same language
    const url = new URL(window.location.href)
    url.searchParams.set('lang', lang)
    window.history.replaceState(window.history.state, '', url)
  }, [lang, c, title])

  return <Ctx.Provider value={{ lang, setLang, c }}>{children}</Ctx.Provider>
}

export function useLang() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useLang outside <LangProvider>')
  return v
}

/** Localized content (shorthand). */
export const useContent = () => useLang().c
