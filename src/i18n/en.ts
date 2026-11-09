// English strings, built from content.ts so English stays the single source of truth.
// Every other language (fr.ts, de.ts, ar.ts) is an object of the same `Strings` shape;
// the type checker refuses a translation with a missing key.
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
  type StepId,
  type Status,
} from '../content/content'

export type Lang = 'en' | 'fr' | 'de' | 'ar'

const ui = {
  meta: {
    title: 'Ayoub ADIL · Software Engineer, 3D',
    description: 'Ayoub ADIL, software engineer: I design, develop and maintain applications, with a background in 3D (point clouds, 3D viewers, reconstruction).',
  },
  skip: 'Skip to content',
  home: 'Ayoub ADIL, home',
  menu: 'Menu',
  close: 'Close',
  language: 'Language',
  nav: { about: 'About', experience: 'Experience', education: 'Education', projects: 'Projects', skills: 'Skills', cv: 'CV', contact: 'Contact' },
  hero: { seeProjects: 'See my projects', viewCv: 'View my CV', scroll: 'Scroll', scrollAria: 'Scroll to About me' },
  about: { languages: 'Languages', outsideWork: 'Outside work', portraitAlt: 'Portrait of Ayoub ADIL' },
  whatIDo: 'What I do',
  experience: { eyebrow: 'Experience', title: ['From master’s intern', 'to software engineer.'], lede: 'I joined R&D Vision for my master’s final internship and was then hired.' },
  present: 'Present',
  education: { eyebrow: 'Education', title: ['From mathematics', 'to a master’s in 3D.'], earlier: 'Earlier', recommendationLetter: 'recommendation letter' },
  projects: {
    eyebrow: 'Projects',
    title: ['What I’ve built,', 'and my part in it.'],
    lede: 'Industrial systems I worked on, with what I built on each, then projects from my master’s. Clients are anonymised; the visuals are synthetic renders.',
    industrial: 'Industrial projects',
    academic: 'Academic & personal',
    academicNote: 'Rendering, virtual reality, full-stack',
    myRole: 'My role',
    more: '+ {n} more',
    details: 'Details',
    detailsArchitecture: 'Details + architecture',
    showDetails: 'Show details',
    projectOf: 'Project {i} of {n}',
    previousProject: 'Previous project',
    nextProject: 'Next project',
    syntheticRender: 'synthetic render',
    stack: 'Stack',
    architecture: 'Architecture',
    hoverHint: 'Hover or tap another service to see what feeds it.',
    media: 'media',
    showMedia: 'Show item {i} of {n}',
    previousMedia: 'Previous media',
    nextMedia: 'Next media',
  },
  skills: { eyebrow: 'Skills', title: ['My toolbox,', 'from shaders to sensors.'] },
  contact: { eyebrow: 'Contact', title: ['Open to', '3D software roles.'], line: 'Email or LinkedIn is the quickest way to reach me.', backToTop: 'Back to top' },
  cv: {
    site: 'Site',
    print: 'Print',
    download: 'Download PDF',
    experience: 'Experience',
    industrial: 'Industrial projects · 2024 – Present',
    academic: 'Master’s internship & academic projects',
    education: 'Education',
    skills: 'Skills',
    languages: 'Languages',
  },
}

const statuses: Record<Status, string> = {
  'In production': 'In production',
  Delivered: 'Delivered',
  'In progress': 'In progress',
  'Proof of concept': 'Proof of concept',
}

const job = experience[0]

export const en = {
  /** my name as written in this language */
  name: profile.name,
  ui,
  status: statuses,
  location: profile.location,
  languageNames: Object.fromEntries(profile.languages.map((l) => [l.name, l.name])) as Record<string, string>,
  languageLevels: Object.fromEntries(profile.languages.map((l) => [l.level, l.level])) as Record<string, string>,
  hero: { title: hero.title as [string, string], lede: hero.lede, facts: hero.facts as [string, string][] },
  about: {
    eyebrow: about.eyebrow,
    title: about.title as [string, string],
    body: about.body,
    outside: {
      category: about.outside.category,
      mode: about.outside.items[0].mode,
      percentile: about.outside.items[0].percentile,
    },
  },
  steps: Object.fromEntries(steps.map((s) => [s.id, { verb: s.verb, object: s.object, body: s.body, refs: s.refs.map(([label]) => label) }])) as Record<
    StepId,
    { verb: string; object: string; body: string; refs: string[] }
  >,
  projects: Object.fromEntries(projects.map((p) => [p.id, { title: p.title, client: p.client, summary: p.summary, did: p.did }])) as Record<
    string,
    { title: string; client: string; summary: string; did: string[] }
  >,
  academic: Object.fromEntries(academic.map((a) => [a.id, { title: a.title, context: a.context, summary: a.summary, alts: a.media.map((m) => m.alt) }])) as Record<
    string,
    { title: string; context: string; summary: string; alts: string[] }
  >,
  architecture: {
    eyebrow: architecture.eyebrow,
    title: architecture.title as [string, string],
    lede: architecture.lede,
    layers: Object.fromEntries(architecture.layers.map((l) => [l.id, l.label])) as Record<string, string>,
    nodes: Object.fromEntries(architecture.layers.flatMap((l) => l.nodes.map((n) => [n.id, { label: n.label, desc: n.desc }]))) as Record<
      string,
      { label: string; desc: string }
    >,
  },
  experience: {
    place: job.place,
    roles: job.roles.map((r) => ({ title: r.title, note: r.note ?? '' })),
    summary: job.summary,
  },
  education: education.map((e) => ({ title: e.title, org: e.org, body: e.body })),
  recommendationAuthor: recommendation.author,
  skills: {
    categories: Object.fromEntries(Object.keys(skills).map((k) => [k, k])) as Record<string, string>,
    // only the items that need translating; tool and language names stay as they are
    items: {
      'OpenGL / shaders': 'OpenGL / shaders',
      'Point clouds': 'Point clouds',
      'Visual SLAM': 'Visual SLAM',
      'Stereo calibration': 'Stereo calibration',
      'Line-scan cameras': 'Line-scan cameras',
      'Area-scan cameras': 'Area-scan cameras',
      'ToF cameras': 'ToF cameras',
      'Thermal cameras': 'Thermal cameras',
    } as Record<string, string>,
  },
}

export type Strings = typeof en
