import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useContent } from '../i18n'

type Node = { id: string; label: string; desc: string; links?: string[] }
type Edge = { from: string; to: string }

const DEFAULT = 'sync'

// Interactive architecture of the tunnel inspection platform, shown in that project's dialog.
export default function ArchitectureDiagram() {
  const { architecture, ui } = useContent()
  const wrap = useRef<HTMLDivElement>(null)
  // a service is always selected, so the diagram reads before any interaction
  const [focus, setFocus] = useState<string | null>(DEFAULT)
  const [paths, setPaths] = useState<{ key: string; d: string; from: string; to: string }[]>([])

  const nodes = useMemo(() => architecture.layers.flatMap((l) => l.nodes as Node[]), [architecture])
  const edges = useMemo<Edge[]>(() => nodes.flatMap((n) => (n.links ?? []).map((to) => ({ from: n.id, to }))), [nodes])

  // ids connected to the focused node, in both directions
  const lit = useMemo(() => {
    if (!focus) return new Set<string>()
    const s = new Set([focus])
    edges.forEach((e) => {
      if (e.from === focus) s.add(e.to)
      if (e.to === focus) s.add(e.from)
    })
    return s
  }, [focus, edges])

  const measure = useCallback(() => {
    const root = wrap.current
    if (!root || window.innerWidth < 768) return setPaths([])
    const box = root.getBoundingClientRect()
    const pos = (id: string) => {
      const el = root.querySelector<HTMLElement>(`[data-node="${id}"]`)
      if (!el) return null
      const r = el.getBoundingClientRect()
      return { l: r.left - box.left, r: r.right - box.left, y: r.top - box.top + r.height / 2 }
    }
    setPaths(
      edges.flatMap((e) => {
        const a = pos(e.to) // upstream, left column
        const b = pos(e.from)
        if (!a || !b) return []
        const key = `${e.to}-${e.from}`
        if (Math.abs(a.l - b.l) < 4) {
          // same column: loop on the outer side (left in LTR, right in RTL)
          const rtl = document.documentElement.dir === 'rtl'
          const x0 = rtl ? a.r : a.l
          const x1 = rtl ? b.r : b.l
          const x = rtl ? x0 + 22 : x0 - 22
          return [{ key, from: e.from, to: e.to, d: `M${x0} ${a.y} C${x} ${a.y} ${x} ${b.y} ${x1} ${b.y}` }]
        }
        // connect the facing sides, whichever column comes first on screen
        const upstreamLeft = a.l < b.l
        const x1 = upstreamLeft ? a.r : a.l
        const x2 = upstreamLeft ? b.l : b.r
        const mx = (x1 + x2) / 2
        return [{ key, from: e.from, to: e.to, d: `M${x1} ${a.y} C${mx} ${a.y} ${mx} ${b.y} ${x2} ${b.y}` }]
      }),
    )
  }, [edges])

  useLayoutEffect(measure, [measure])
  useEffect(() => {
    const ro = new ResizeObserver(measure)
    if (wrap.current) ro.observe(wrap.current)
    return () => ro.disconnect()
  }, [measure])

  const active = nodes.find((n) => n.id === focus)

  return (
        <div className="rounded-xl border border-line bg-ink/60 p-4 md:p-5">
          <div ref={wrap} className="relative grid gap-6 md:grid-cols-4 md:gap-10">
            <svg className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" aria-hidden>
              {paths.map((p) => {
                const on = focus && (p.from === focus || p.to === focus)
                return (
                  <path
                    key={p.key}
                    d={p.d}
                    fill="none"
                    stroke={on ? '#FAB529' : '#3a4656'}
                    strokeWidth={on ? 1.6 : 1}
                    className="transition-[stroke] duration-300"
                  />
                )
              })}
            </svg>

            {architecture.layers.map((layer, li) => (
              <div key={layer.id} className="relative">
                <p className="label mb-2.5 flex items-center gap-2">
                  <span className="text-signal">{String.fromCharCode(65 + li)}</span>
                  {layer.label}
                </p>
                <ul className="flex flex-col gap-[0.8svh]">
                  {(layer.nodes as Node[]).map((n) => {
                    const on = lit.has(n.id)
                    const dim = focus && !on
                    return (
                      <li key={n.id}>
                        <button
                          data-node={n.id}
                          onMouseEnter={() => setFocus(n.id)}
                          onMouseLeave={() => setFocus(DEFAULT)}
                          onFocus={() => setFocus(n.id)}
                          onBlur={() => setFocus(DEFAULT)}
                          className={`relative w-full rounded-md border px-3 py-[clamp(0.3rem,0.9svh,0.55rem)] text-start text-[0.86rem] transition-all duration-300 ${
                            n.id === focus
                              ? 'border-signal bg-signal/10 text-paper'
                              : on
                                ? 'border-signal/60 text-paper'
                                : 'border-line bg-ink/80 text-paper/85'
                          } ${dim ? 'opacity-35' : ''}`}
                        >
                          {n.label}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-[2.5svh] flex min-h-[2.5rem] items-start gap-4 border-t border-line pt-[1.8svh]" aria-live="polite">
            <span className="label shrink-0 pt-0.5">{active ? active.label : ''}</span>
            <p className="text-[0.9rem] text-paper/80">
              {active?.desc} <span className="text-mute">{ui.projects.hoverHint}</span>
            </p>
          </div>
        </div>
  )
}
