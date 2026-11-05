import { Suspense, useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { Canvas, useThree, type ThreeEvent } from '@react-three/fiber'
import { ContactShadows, Environment, Grid, Html, Lightformer, Line, OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import meta from './flanged-hub.json'

export const GLB_URL = '/models/flanged-hub.glb'
const SCALE = 0.05 // mm -> scene units
const LIFT = -(meta.bbox[1] * SCALE) / 2

export type FaceMeta = { id: number; type: string; area: number; center: number[]; normal?: number[]; radius?: number }
export type EdgeMeta = { id: number; type: string; length: number; center: number[]; radius?: number }
export type Pick = { kind: 'face' | 'edge'; id: number } | null
export type Mode = 'auto' | 'faces' | 'edges'

const faces = meta.faces as FaceMeta[]
const edges = meta.edges as EdgeMeta[]

const fmt = (n: number, d = 2) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }).replace(/,/g, ' ')
const typeName = (t: string) => t.charAt(0) + t.slice(1).toLowerCase()

export function describe(p: Pick) {
  if (!p) return null
  if (p.kind === 'face') {
    const f = faces[p.id]
    const rows: [string, string][] = [
      ['Type', typeName(f.type)],
      ['Area', `${fmt(f.area)} mm²`],
    ]
    if (f.radius !== undefined && f.type === 'CYLINDER') rows.push(['Diameter', `Ø ${fmt(f.radius * 2)} mm`])
    else if (f.radius !== undefined) rows.push(['Radius', `${fmt(f.radius)} mm`])
    if (f.normal) rows.push(['Normal', `(${f.normal.map((v) => fmt(Math.abs(v) < 5e-3 ? 0 : v, 0)).join(', ')})`])
    return { title: `Face #${f.id}`, short: shortFace(f), rows }
  }
  const e = edges[p.id]
  const rows: [string, string][] = [
    ['Type', typeName(e.type)],
    ['Length', `${fmt(e.length)} mm`],
  ]
  if (e.radius !== undefined) rows.push(['Diameter', `Ø ${fmt(e.radius * 2)} mm`])
  return { title: `Edge #${e.id}`, short: shortEdge(e), rows }
}

export function shortFace(f: FaceMeta) {
  if (f.type === 'CYLINDER' && f.radius !== undefined) return `Ø ${fmt(f.radius * 2)}`
  return `${fmt(f.area, 1)} mm²`
}
export function shortEdge(e: EdgeMeta) {
  if (e.type === 'CIRCLE' && e.radius !== undefined) return `Ø ${fmt(e.radius * 2)}`
  return `${fmt(e.length)} mm`
}

// ------------------------------------------------------------------ materials
const C = {
  metal: new THREE.Color('#c3c8d0'),
  hover: new THREE.Color('#ffb59a'),
  pick: new THREE.Color('#ff6a3d'),
  edge: new THREE.Color('#1b222c'),
  edgeHover: new THREE.Color('#ff6a3d'),
}

function PartModel({
  hover,
  pick,
  mode,
  section,
  showEdges,
  onHover,
  onPick,
}: {
  hover: Pick
  pick: Pick
  mode: Mode
  section: boolean
  showEdges: boolean
  onHover: (p: Pick) => void
  onPick: (p: Pick) => void
}) {
  const { scene } = useGLTF(GLB_URL)
  const gl = useThree((s) => s.gl)
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, -1), 0), [])

  const { faceMeshes, edgeLines } = useMemo(() => {
    const faceMeshes: THREE.Mesh[] = []
    const edgeLines: THREE.Line[] = []
    scene.traverse((o) => {
      if (o.userData.kind === 'face' && (o as THREE.Mesh).isMesh) {
        const m = o as THREE.Mesh
        m.material = new THREE.MeshPhysicalMaterial({
          color: C.metal,
          metalness: 1,
          roughness: 0.34,
          clearcoat: 0.25,
          clearcoatRoughness: 0.4,
          envMapIntensity: 1.1,
        })
        m.castShadow = true
        faceMeshes[o.userData.id] = m
      }
      if (o.userData.kind === 'edge' && (o as THREE.Line).isLine) {
        const l = o as THREE.Line
        l.material = new THREE.LineBasicMaterial({ color: C.edge })
        edgeLines[o.userData.id] = l
      }
    })
    return { faceMeshes, edgeLines }
  }, [scene])

  // highlight state -> materials
  useEffect(() => {
    gl.localClippingEnabled = true
    faceMeshes.forEach((m, i) => {
      const mat = m.material as THREE.MeshPhysicalMaterial
      const isPick = pick?.kind === 'face' && pick.id === i
      const isHover = hover?.kind === 'face' && hover.id === i
      mat.color.copy(isPick ? C.pick : isHover ? C.hover : C.metal)
      mat.metalness = isPick ? 0.35 : 1
      mat.roughness = isPick ? 0.45 : 0.34
      mat.clippingPlanes = section ? [plane] : []
      mat.side = section ? THREE.DoubleSide : THREE.FrontSide
      mat.needsUpdate = true
    })
    edgeLines.forEach((l, i) => {
      const mat = l.material as THREE.LineBasicMaterial
      const on = (pick?.kind === 'edge' && pick.id === i) || (hover?.kind === 'edge' && hover.id === i)
      mat.color.copy(on ? C.edgeHover : C.edge)
      mat.clippingPlanes = section ? [plane] : []
      l.visible = showEdges
    })
  }, [faceMeshes, edgeLines, hover, pick, section, showEdges, plane, gl])

  const resolve = (e: ThreeEvent<PointerEvent | MouseEvent>): Pick => {
    const hits = e.intersections.filter((h) => h.object.visible && (!section || h.point.z <= 1e-3))
    const face = hits.find((h) => h.object.userData.kind === 'face')
    const edge = hits.find((h) => h.object.userData.kind === 'edge')
    if (mode === 'faces') return face ? { kind: 'face', id: face.object.userData.id } : null
    if (mode === 'edges') return edge ? { kind: 'edge', id: edge.object.userData.id } : null
    if (edge && (!face || edge.distance <= face.distance + 0.08)) return { kind: 'edge', id: edge.object.userData.id }
    return face ? { kind: 'face', id: face.object.userData.id } : null
  }

  const sel = pick ?? null
  const tube = useMemo(() => {
    const target = [hover, sel].filter((p): p is NonNullable<Pick> => p?.kind === 'edge')
    return target.map((p) => {
      const pos = edgeLines[p.id]?.geometry.getAttribute('position')
      if (!pos) return null
      const pts = Array.from({ length: pos.count }, (_, i) => new THREE.Vector3().fromBufferAttribute(pos, i))
      return { key: `${p.id}`, pts }
    })
  }, [hover, sel, edgeLines])

  return (
    <group scale={SCALE} position={[0, LIFT, 0]}>
      <primitive
        object={scene}
        onPointerMove={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation()
          onHover(resolve(e))
        }}
        onPointerOut={() => onHover(null)}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation()
          onPick(resolve(e))
        }}
      />
      {tube.map(
        (t) =>
          t && (
            <Line key={t.key} points={t.pts} color="#ff6a3d" lineWidth={3.2} depthTest={false} renderOrder={10} />
          ),
      )}
      <Annotation pick={sel} />
    </group>
  )
}

function Annotation({ pick }: { pick: Pick }) {
  if (!pick) return null
  const d = describe(pick)!
  const m = pick.kind === 'face' ? faces[pick.id] : edges[pick.id]
  const c = new THREE.Vector3(...(m.center as [number, number, number]))
  const f = pick.kind === 'face' ? faces[pick.id] : null
  const tip = f?.normal ? c.clone().add(new THREE.Vector3(...(f.normal as [number, number, number])).multiplyScalar(14)) : c
  return (
    <>
      {f?.normal && <Line points={[c, tip]} color="#ff6a3d" lineWidth={1.6} depthTest={false} renderOrder={11} />}
      <Html position={tip} center zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
        <div className="whitespace-nowrap rounded-[3px] border border-signal/70 bg-ink/90 px-2 py-1 font-mono text-[11px] text-paper shadow-lg">
          <span className="text-signal">{d.title}</span> · {d.short}
        </div>
      </Html>
    </>
  )
}

function Scene(props: Parameters<typeof PartModel>[0] & { controls: RefObject<OrbitControlsImpl | null> }) {
  const { controls, ...rest } = props
  return (
    <>
      <color attach="background" args={['#0b0e13']} />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[10, 10, 1]} />
        <Lightformer form="rect" intensity={1.6} position={[-6, 2, 3]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[6, 1, -3]} rotation-y={-Math.PI / 2} scale={[6, 2, 1]} />
        <Lightformer form="ring" color="#ff6a3d" intensity={1.4} position={[2, 3, -6]} scale={3} />
        <Lightformer form="rect" intensity={0.6} position={[0, -4, 0]} rotation-x={-Math.PI / 2} scale={[10, 10, 1]} />
      </Environment>
      <ambientLight intensity={0.15} />
      <PartModel {...rest} />
      <ContactShadows position={[0, LIFT - 0.001, 0]} opacity={0.6} scale={9} blur={2.4} far={2.5} resolution={512} color="#000" />
      <Grid
        position={[0, LIFT - 0.002, 0]}
        infiniteGrid
        cellSize={0.25}
        sectionSize={1}
        cellThickness={0.6}
        sectionThickness={1}
        cellColor="#1b222c"
        sectionColor="#2b3442"
        fadeDistance={16}
        fadeStrength={1.5}
      />
      <OrbitControls
        ref={controls}
        makeDefault
        enableDamping
        minDistance={3}
        maxDistance={14}
        maxPolarAngle={Math.PI * 0.62}
        autoRotate
        autoRotateSpeed={0.5}
        onStart={() => controls.current && (controls.current.autoRotate = false)}
      />
    </>
  )
}

// ------------------------------------------------------------------ UI
function Seg<T extends string>({ value, options, onChange, label }: { value: T; options: [T, string][]; onChange: (v: T) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex rounded-[4px] border border-line bg-ink/80 p-0.5">
      {options.map(([v, l]) => (
        <button
          key={v}
          role="radio"
          aria-checked={value === v}
          onClick={() => onChange(v)}
          className={`rounded-[3px] px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors ${
            value === v ? 'bg-paper text-ink' : 'text-mute hover:text-paper'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

function Toggle({ on, onClick, children }: { on: boolean; onClick: () => void; children: string }) {
  return (
    <button
      aria-pressed={on}
      onClick={onClick}
      className={`rounded-[4px] border px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
        on ? 'border-signal text-signal' : 'border-line bg-ink/80 text-mute hover:text-paper'
      }`}
    >
      {children}
    </button>
  )
}

export function Topology({ pick, onPick, className = '' }: { pick: Pick; onPick: (p: Pick) => void; className?: string }) {
  const [tab, setTab] = useState<'faces' | 'edges'>('faces')
  const list = tab === 'faces' ? faces.map((f) => ({ id: f.id, type: f.type, v: shortFace(f) })) : edges.map((e) => ({ id: e.id, type: e.type, v: shortEdge(e) }))
  return (
    <div className={`flex min-h-0 flex-col ${className}`}>
      <div className="mb-3 flex items-center justify-between">
        <p className="label">Topology</p>
        <Seg
          label="List"
          value={tab}
          onChange={setTab}
          options={[
            ['faces', `Faces ${faces.length}`],
            ['edges', `Edges ${edges.length}`],
          ]}
        />
      </div>
      <ul className="min-h-0 flex-1 overflow-y-auto pr-1 [scrollbar-width:thin]" data-lenis-prevent>
        {list.map((it) => {
          const kind = tab === 'faces' ? 'face' : 'edge'
          const on = pick?.kind === kind && pick.id === it.id
          return (
            <li key={it.id}>
              <button
                onClick={() => onPick(on ? null : { kind, id: it.id })}
                className={`grid w-full grid-cols-[3rem_1fr_auto] items-center gap-2 rounded-[3px] px-2 py-1.5 text-left font-mono text-[11.5px] transition-colors ${
                  on ? 'bg-signal/15 text-paper' : 'text-mute hover:bg-paper/5 hover:text-paper'
                }`}
              >
                <span className={on ? 'text-signal' : ''}>#{it.id}</span>
                <span>{typeName(it.type)}</span>
                <span>{it.v}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function PartSummary() {
  const rows: [string, string][] = [
    ['Part', meta.name],
    ['Bounding box', `${meta.bbox.map((v) => fmt(v, 0)).join(' × ')} mm`],
    ['Volume', `${fmt(meta.volume)} mm³`],
    ['B-rep', `${meta.faceCount} faces · ${meta.edgeCount} edges`],
    ['Kernel', `build123d ${meta.build123d} · OpenCascade`],
  ]
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 font-mono text-[11.5px]">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="text-mute">{k}</dt>
          <dd className="text-paper/90">{v}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function CadViewer({ className = '', side = true }: { className?: string; side?: boolean }) {
  const [hover, setHover] = useState<Pick>(null)
  const [pick, setPick] = useState<Pick>(null)
  const [mode, setMode] = useState<Mode>('auto')
  const [section, setSection] = useState(false)
  const [showEdges, setShowEdges] = useState(true)
  const controls = useRef<OrbitControlsImpl | null>(null)

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setPick(null)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [])

  const info = describe(hover ?? pick)

  return (
    <div className={`relative grid overflow-hidden rounded-xl border border-line bg-[#0b0e13] ${side ? 'lg:grid-cols-[1fr_20rem]' : ''} ${className}`}>
      <div className="relative min-h-[26rem]" style={{ cursor: hover ? 'pointer' : 'grab' }}>
        <Canvas
          dpr={[1, 2]}
          shadows
          camera={{ position: [5.4, 3.6, 6.2], fov: 32, near: 0.1, far: 100 }}
          gl={{ antialias: true }}
          raycaster={{ params: { Line: { threshold: 0.035 }, Points: { threshold: 0.1 }, Mesh: {}, LOD: {}, Sprite: {} } }}
          onPointerMissed={() => setPick(null)}
          aria-label="Interactive 3D CAD viewer: flanged hub"
        >
          <Suspense fallback={null}>
            <Scene
              controls={controls}
              hover={hover}
              pick={pick}
              mode={mode}
              section={section}
              showEdges={showEdges}
              onHover={setHover}
              onPick={setPick}
            />
          </Suspense>
        </Canvas>

        <div className="pointer-events-none absolute inset-x-3 top-3 flex flex-wrap items-start justify-between gap-2">
          <div className="pointer-events-auto flex flex-wrap gap-2">
            <Seg
              label="Pick"
              value={mode}
              onChange={setMode}
              options={[
                ['auto', 'Auto'],
                ['faces', 'Faces'],
                ['edges', 'Edges'],
              ]}
            />
            <Toggle on={section} onClick={() => setSection((s) => !s)}>
              Section
            </Toggle>
            <Toggle on={showEdges} onClick={() => setShowEdges((s) => !s)}>
              Edges
            </Toggle>
          </div>
          <button
            onClick={() => {
              controls.current?.reset()
              setPick(null)
            }}
            className="pointer-events-auto rounded-[4px] border border-line bg-ink/80 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-mute hover:text-paper"
          >
            Reset
          </button>
        </div>

        <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-end justify-between gap-3" aria-live="polite">
          <div className="min-w-[14rem] rounded-[4px] border border-line bg-ink/85 px-3 py-2.5 backdrop-blur">
            {info ? (
              <>
                <p className="font-mono text-[11px] uppercase tracking-wider text-signal">
                  {info.title}
                </p>
                <dl className="mt-1.5 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 font-mono text-[11.5px]">
                  {info.rows.map(([k, v]) => (
                    <div key={k} className="contents">
                      <dt className="text-mute">{k}</dt>
                      <dd className="text-paper">{v}</dd>
                    </div>
                  ))}
                </dl>
              </>
            ) : (
              <p className="font-mono text-[11px] text-mute">Hover to inspect · click to select · drag to orbit</p>
            )}
          </div>
          <p className="hidden font-mono text-[10px] uppercase tracking-wider text-mute/70 sm:block">B-rep from OpenCascade · not mesh guesses</p>
        </div>
      </div>

      {side && (
        <aside className="flex max-h-[34rem] min-h-0 flex-col gap-5 border-t border-line p-5 lg:max-h-none lg:border-l lg:border-t-0">
          <PartSummary />
          <Topology pick={pick} onPick={setPick} className="flex-1" />
        </aside>
      )}
    </div>
  )
}

useGLTF.preload(GLB_URL)
