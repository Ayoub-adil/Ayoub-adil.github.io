import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { architecture } from '../content/content'
import { SectionHead } from './ui'

type Node = { id: string; label: string; desc: string; links?: string[] }
type Edge = { from: string; to: string }

export default function Architecture() {
  const wrap = useRef<HTMLDivElement>(null)
  const [focus, setFocus] = useState<string | null>(null)
  const [paths, setPaths] = useState<{ key: string; d: string; from: string; to: string }[]>([])

  const nodes = useMemo(() => architecture.layers.flatMap((l) => l.nodes as Node[]), [])
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
    if (!root || window.innerWidth < 1024) return setPaths([])
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
        if (Math.abs(a.l - b.l) < 4) {
          // same column: loop on the left side
          const x = a.l - 22
          return [{ key: `${e.to}-${e.from}`, from: e.from, to: e.to, d: `M${a.l} ${a.y} C${x} ${a.y} ${x} ${b.y} ${b.l} ${b.y}` }]
        }
        const x1 = a.r
        const x2 = b.l
        const mx = (x1 + x2) / 2
        return [{ key: `${e.to}-${e.from}`, from: e.from, to: e.to, d: `M${x1} ${a.y} C${mx} ${a.y} ${mx} ${b.y} ${x2} ${b.y}` }]
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
    <section id="architecture" className="relative py-[clamp(6rem,14vh,10rem)]">
      <div className="container-x">
        <SectionHead n="05" eyebrow={architecture.eyebrow} title={architecture.title} lede={architecture.lede} />

        <div className="mt-16 rounded-xl border border-line bg-ink-2/60 p-5 backdrop-blur-sm md:p-8">
          <div ref={wrap} className="relative grid gap-8 lg:grid-cols-4 lg:gap-14">
            <svg className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" aria-hidden>
              {paths.map((p) => {
                const on = focus && (p.from === focus || p.to === focus)
                return (
                  <path
                    key={p.key}
                    d={p.d}
                    fill="none"
                    stroke={on ? '#FAB529' : '#2a3340'}
                    strokeWidth={on ? 1.6 : 1}
                    className="transition-[stroke] duration-300"
                  />
                )
              })}
            </svg>

            {architecture.layers.map((layer, li) => (
              <div key={layer.id} className="relative">
                <p className="label mb-4 flex items-center gap-2">
                  <span className="text-signal">{String.fromCharCode(65 + li)}</span>
                  {layer.label}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {(layer.nodes as Node[]).map((n) => {
                    const on = lit.has(n.id)
                    const dim = focus && !on
                    return (
                      <li key={n.id}>
                        <button
                          data-node={n.id}
                          onMouseEnter={() => setFocus(n.id)}
                          onMouseLeave={() => setFocus(null)}
                          onFocus={() => setFocus(n.id)}
                          onBlur={() => setFocus(null)}
                          className={`relative w-full rounded-md border px-3.5 py-2.5 text-left text-[0.92rem] transition-all duration-300 ${
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

          <div className="mt-8 flex min-h-[3.5rem] items-start gap-4 border-t border-line pt-5" aria-live="polite">
            <span className="label shrink-0 pt-0.5">{active ? active.label : 'Hover a service'}</span>
            <p className="text-paper/75">{active ? active.desc : 'Hardware → on-board services → data → applications. Connections show which service feeds which.'}</p>
          </div>
        </div>
        <p className="label mt-4 !normal-case !tracking-normal">Stack: .NET · WPF · C# · C++ · Modbus / JBus</p>
      </div>
    </section>
  )
}
