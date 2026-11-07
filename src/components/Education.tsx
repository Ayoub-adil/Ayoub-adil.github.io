import { education } from '../content/content'
import { SectionHead } from './ui'

export default function Education() {
  return (
    <section id="education" className="screen relative">
      <div className="container-x">
        <SectionHead
          n="03"
          eyebrow="Education"
          title={['From mathematics', 'to a master’s in 3D.']}
          lede="Mathematics first, then computer science, then a specialisation in image, rendering and 3D."
        />

        <ol className="mt-[4svh] grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {education.map((e, i) => (
            <li key={e.title} className={`flex flex-col gap-2 bg-ink-2/90 p-[clamp(1rem,2.6svh,1.75rem)] backdrop-blur-sm ${i === 0 ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''}`}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-signal">{e.years}</span>
                <span className="label !text-[0.6rem]">{e.place}</span>
              </div>
              <h3 className={`font-medium leading-tight tracking-tight ${i === 0 ? 'text-[clamp(1.4rem,3.4svh,1.9rem)]' : 'text-[1.08rem]'}`}>{e.title}</h3>
              <p className="text-[0.88rem] text-mute">{e.org}</p>
              {e.body && <p className={`leading-relaxed text-paper/70 ${i === 0 ? 'mt-1 text-[0.98rem]' : 'text-[0.88rem]'}`}>{e.body}</p>}
              {i === 0 && (
                <p className="accent mt-auto pt-[3svh] text-[clamp(1.1rem,2.6svh,1.4rem)] text-paper/90">
                  Geometry, rendering, <span className="text-signal">virtual reality.</span>
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
