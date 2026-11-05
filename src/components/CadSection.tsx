import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import partSource from '../../cad/part.py?raw'
import Code from '../lab/Code'
import { Button, SectionHead } from './ui'

const CadViewer = lazy(() => import('../lab/CadViewer'))

const pipeline = [
  ['build123d', 'Parametric part in Python on OpenCascade'],
  ['Exporter', 'One glTF node per B-rep face and edge, ids in extras'],
  ['Metadata', 'Type, area, radius, normal, length read from the kernel'],
  ['three.js', 'Face / edge picking, section plane, annotations'],
]

export default function CadSection({ webgl }: { webgl: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)
  const [tab, setTab] = useState<'viewer' | 'code'>('viewer')

  // mount the viewer only when it approaches the viewport
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '600px' })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section id="cad" className="relative py-[clamp(6rem,14vh,10rem)]">
      <div className="container-x">
        <SectionHead
          n="03"
          eyebrow="Lab · CAD viewer"
          title={['B-rep in,', 'pickable faces out.']}
          lede="A flanged hub modelled in Python with build123d, exported with its topology intact and inspected in three.js. Hover and click: every value comes from OpenCascade, not from the triangles."
        />

        <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {pipeline.map(([k, v], i) => (
            <li key={k} className="bg-ink p-5">
              <p className="font-mono text-xs text-signal">{String(i + 1).padStart(2, '0')}</p>
              <p className="mt-3 font-medium">{k}</p>
              <p className="mt-1 text-sm leading-relaxed text-mute">{v}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <div role="tablist" aria-label="CAD demo view" className="flex rounded-[4px] border border-line p-0.5">
            {(['viewer', 'code'] as const).map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`rounded-[3px] px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider ${
                  tab === t ? 'bg-paper text-ink' : 'text-mute hover:text-paper'
                }`}
              >
                {t === 'viewer' ? 'Viewer' : 'part.py'}
              </button>
            ))}
          </div>
          <Button href="/lab/cad-viewer/" variant="ghost">
            Open full screen
          </Button>
        </div>

        <div ref={ref} className="mt-4">
          {tab === 'viewer' ? (
            webgl ? (
              near ? (
                <Suspense fallback={<Placeholder />}>
                  <CadViewer className="h-[min(78vh,44rem)]" />
                </Suspense>
              ) : (
                <Placeholder />
              )
            ) : (
              <Placeholder text="WebGL is not available in this browser. The part source is in the part.py tab." />
            )
          ) : (
            <div className="rounded-xl border border-line bg-[#0b0e13] p-6">
              <p className="label mb-4">cad/part.py · the exact file the model is built from</p>
              <Code src={partSource} className="max-h-[38rem]" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Placeholder({ text = 'Loading the viewer…' }: { text?: string }) {
  return (
    <div className="grid h-[min(78vh,44rem)] place-items-center rounded-xl border border-line bg-[#0b0e13]">
      <p className="label">{text}</p>
    </div>
  )
}
