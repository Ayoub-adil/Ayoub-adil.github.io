import { useMemo } from 'react'

// Tiny Python highlighter: enough for one readable file, no dependency.
const RULES: [RegExp, string][] = [
  [/^("""[\s\S]*?"""|'''[\s\S]*?''')/, 'text-[#8fa38a]'],
  [/^#.*/, 'text-mute/70 italic'],
  [/^("[^"\n]*"|'[^'\n]*')/, 'text-[#c9b37e]'],
  [/^\b(def|return|with|from|import|if|else|elif|as|lambda|for|in|and|or|not|None|True|False)\b/, 'text-signal'],
  [/^\b\d+(\.\d+)?\b/, 'text-[#9ec1ff]'],
  [/^\b[A-Z][A-Za-z0-9_]*\b/, 'text-paper'],
  [/^[A-Za-z_][A-Za-z0-9_]*/, 'text-paper/75'],
  [/^\s+/, ''],
  [/^./, 'text-mute'],
]

function tokenize(src: string) {
  const out: { t: string; c: string }[] = []
  let s = src
  while (s.length) {
    for (const [re, c] of RULES) {
      const m = re.exec(s)
      if (m) {
        out.push({ t: m[0], c })
        s = s.slice(m[0].length)
        break
      }
    }
  }
  return out
}

export default function Code({ src, className = '' }: { src: string; className?: string }) {
  const tokens = useMemo(() => tokenize(src), [src])
  return (
    <pre className={`overflow-auto font-mono text-[12px] leading-[1.65] [scrollbar-width:thin] ${className}`} data-lenis-prevent>
      <code>
        {tokens.map((tk, i) =>
          tk.c ? (
            <span key={i} className={tk.c}>
              {tk.t}
            </span>
          ) : (
            tk.t
          ),
        )}
      </code>
    </pre>
  )
}
