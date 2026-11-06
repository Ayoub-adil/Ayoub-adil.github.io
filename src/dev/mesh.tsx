// Dev-only: project-card scenes built from real meshes ("clay + gold" style),
// rendered at 960x600 for video capture. /dev/mesh/?id=lidar
// window.__frame(t) renders time t (seconds) on demand; see tools/render_cards.mjs.
import { StrictMode, useEffect, useMemo, useRef, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, RoundedBox } from '@react-three/drei'
import { Bloom, EffectComposer, N8AO, SMAA, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

export const LOOP = 8

const GOLD = '#fab529'
const clay = { color: '#d4d7dc', roughness: 0.62, metalness: 0 }
const dark = { color: '#2b3442', roughness: 0.12, metalness: 0.5 }
const rubber = { color: '#14171c', roughness: 0.8, metalness: 0 }
const goldMat = { color: GOLD, roughness: 0.5, metalness: 0.3, emissive: GOLD, emissiveIntensity: 0.18 }

// ------------------------------------------------------------------ helpers
/** Translucent fan from a sensor to a segment on the ground (a LiDAR curtain). */
function Curtain({ from, a, b, opacity = 0.22 }: { from: number[]; a: number[]; b: number[]; opacity?: number }) {
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute([...from, ...a, ...b], 3))
    // brighter at the sensor, fading towards the ground
    g.setAttribute('color', new THREE.Float32BufferAttribute([1, 1, 1, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25], 3))
    return g
  }, [from, a, b])
  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color={GOLD} vertexColors transparent opacity={opacity} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
    </mesh>
  )
}

/** Dashed line of small glowing tiles on the ground. */
function Dashes({ a, b, n = 22 }: { a: [number, number]; b: [number, number]; n?: number }) {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1])
  const ang = Math.atan2(b[1] - a[1], b[0] - a[0])
  return (
    <group>
      {Array.from({ length: n }, (_, i) => {
        const t = (i + 0.25) / n
        return (
          <mesh key={i} position={[a[0] + (b[0] - a[0]) * t, 0.006, a[1] + (b[1] - a[1]) * t]} rotation={[0, -ang, 0]}>
            <boxGeometry args={[(len / n) * 0.5, 0.01, 0.05]} />
            <meshBasicMaterial color={GOLD} toneMapped={false} />
          </mesh>
        )
      })}
    </group>
  )
}

function Box({ p, s, m, r = 0 }: { p: number[]; s: number[]; m: object; r?: number }) {
  return r ? (
    <RoundedBox args={s as [number, number, number]} radius={r} smoothness={4} position={p as [number, number, number]} castShadow receiveShadow>
      <meshStandardMaterial {...m} />
    </RoundedBox>
  ) : (
    <mesh position={p as [number, number, number]} castShadow receiveShadow>
      <boxGeometry args={s as [number, number, number]} />
      <meshStandardMaterial {...m} />
    </mesh>
  )
}

function Limb({ a, b, r, m }: { a: number[]; b: number[]; r: number; m: object }) {
  const va = new THREE.Vector3(...a)
  const vb = new THREE.Vector3(...b)
  const mid = va.clone().add(vb).multiplyScalar(0.5)
  const dir = vb.clone().sub(va)
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize())
  return (
    <mesh position={mid} quaternion={q} castShadow>
      <capsuleGeometry args={[r, Math.max(dir.length() - 2 * r, 0.01), 6, 12]} />
      <meshStandardMaterial {...m} />
    </mesh>
  )
}

// ------------------------------------------------------------------ LiDAR barrier
// Bus faces +x, right side +z, ground y = 0. Both LiDARs at the same height, top of the bus.
function LidarScene() {
  const L = 6.2
  const W = 1.75
  const H = 2.05
  const bx = -1.6 // bus centre x
  const front = bx + L / 2
  const lidarY = 2.1
  const lidarFront = [front + 0.06, lidarY, 0]
  const lidarSide = [bx + 0.2, lidarY, W / 2 + 0.06]
  const FRONT_LINE = front + 1.4
  const SIDE_LINE = W / 2 + 1.25
  const person = { x: bx + 1.4, z: SIDE_LINE + 0.55 }

  return (
    <group>
      {/* bus body, windows, door, roof unit, wheels */}
      <Box p={[bx, 0.32 + H / 2, 0]} s={[L, H, W]} m={clay} r={0.16} />
      <Box p={[bx - 0.2, 1.55, W / 2 + 0.005]} s={[L - 1.2, 0.62, 0.02]} m={dark} />
      <Box p={[bx - 0.2, 1.55, -W / 2 - 0.005]} s={[L - 1.2, 0.62, 0.02]} m={dark} />
      <Box p={[front + 0.005, 1.4, 0]} s={[0.02, 0.95, W - 0.25]} m={dark} />
      <Box p={[front - 0.75, 1.05, W / 2 + 0.008]} s={[0.9, 1.45, 0.012]} m={dark} />
      <Box p={[bx - 0.8, 0.32 + H + 0.12, 0]} s={[1.6, 0.24, 1.1]} m={clay} r={0.08} />
      {[front - 1.2, bx - L / 2 + 1.3].map((x) =>
        [W / 2 - 0.12, -W / 2 + 0.12].map((z) => (
          <mesh key={`${x}${z}`} position={[x, 0.42, z]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.42, 0.42, 0.3, 32]} />
            <meshStandardMaterial {...rubber} />
          </mesh>
        )),
      )}

      {/* charging pad under the bus */}
      <Box p={[bx - 0.4, 0.015, 0]} s={[1.8, 0.03, 1.2]} m={{ color: '#2a2f38', roughness: 0.4 }} />
      <Box p={[bx - 0.4, 0.035, 0]} s={[1.6, 0.012, 1.0]} m={{ ...goldMat, emissiveIntensity: 0.6 }} />

      {/* two LiDARs at the same height on top of the bus */}
      {[lidarFront, lidarSide].map((p, i) => (
        <group key={i} position={p as [number, number, number]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.09, 0.09, 0.14, 24]} />
            <meshStandardMaterial {...dark} />
          </mesh>
          <mesh position={[0, 0.0, 0]}>
            <torusGeometry args={[0.092, 0.012, 8, 32]} />
            <meshBasicMaterial color={GOLD} toneMapped={false} />
          </mesh>
        </group>
      ))}
      <Curtain from={lidarFront} a={[FRONT_LINE, 0, -1.9]} b={[FRONT_LINE, 0, 1.9]} />
      <Curtain from={lidarSide} a={[bx - L / 2 - 0.5, 0, SIDE_LINE]} b={[front + 1.0, 0, SIDE_LINE]} />
      <Dashes a={[FRONT_LINE, -1.9]} b={[FRONT_LINE, 1.9]} n={16} />
      <Dashes a={[bx - L / 2 - 0.5, SIDE_LINE]} b={[front + 1.0, SIDE_LINE]} n={30} />

      {/* a person with a cane, detected as the cane crosses the side line */}
      <group position={[person.x, 0, person.z]} rotation={[0, 2.5, 0]}>
        <mesh position={[0, 1.67, 0]} castShadow>
          <sphereGeometry args={[0.105, 32, 20]} />
          <meshStandardMaterial {...goldMat} />
        </mesh>
        <Limb a={[0, 1.5, 0]} b={[0, 1.58, 0]} r={0.045} m={goldMat} />
        <Limb a={[0, 1.02, 0]} b={[0, 1.42, 0]} r={0.135} m={goldMat} />
        <Limb a={[-0.085, 0.94, 0]} b={[-0.1, 0.06, -0.14]} r={0.058} m={goldMat} />
        <Limb a={[0.085, 0.94, 0]} b={[0.11, 0.06, 0.16]} r={0.058} m={goldMat} />
        <Limb a={[-0.19, 1.43, 0]} b={[-0.24, 0.84, 0.04]} r={0.042} m={goldMat} />
        <Limb a={[0.19, 1.43, 0]} b={[0.3, 0.9, 0.28]} r={0.042} m={goldMat} />
        {/* the cane reaches over the side line */}
        <Limb a={[0.3, 0.9, 0.28]} b={[0.46, 0.02, 0.78]} r={0.02} m={{ color: '#f3f1ec', roughness: 0.4, emissive: GOLD, emissiveIntensity: 0.2 }} />
      </group>
      <lineSegments position={[person.x, 0.95, person.z - 0.1]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.95, 1.9, 1.15)]} />
        <lineBasicMaterial color={GOLD} toneMapped={false} />
      </lineSegments>
    </group>
  )
}

// ------------------------------------------------------------------ shared for the other scenes
/** Loop clock, set by the rig before each render (seconds in [0, LOOP)). */
export const clock = { t: 0 }
const wave = (k = 1, phase = 0) => Math.sin(((clock.t / LOOP) * k + phase) * Math.PI * 2)

const interior = { color: '#8e949c', roughness: 0.7, metalness: 0 }
const steel = { color: '#9aa1aa', roughness: 0.35, metalness: 0.7 }
const darkClay = { color: '#5c626b', roughness: 0.7, metalness: 0 }

/** Thin glowing segment between two points (a camera ray, a scan line). */
function Ray({ a, b, r = 0.012, opacity = 0.55, color = GOLD }: { a: number[]; b: number[]; r?: number; opacity?: number; color?: string }) {
  const va = new THREE.Vector3(...a)
  const vb = new THREE.Vector3(...b)
  const dir = vb.clone().sub(va)
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize())
  return (
    <mesh position={va.clone().add(vb).multiplyScalar(0.5)} quaternion={q}>
      <cylinderGeometry args={[r, r, dir.length(), 6]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
    </mesh>
  )
}

/** Translucent pyramid from an apex to a quad (a camera field of view). */
function Frustum({ apex, quad, opacity = 0.16 }: { apex: number[]; quad: number[][]; opacity?: number }) {
  const geometry = useMemo(() => {
    const pos: number[] = []
    const col: number[] = []
    for (let i = 0; i < 4; i++) {
      pos.push(...apex, ...quad[i], ...quad[(i + 1) % 4])
      col.push(1, 1, 1, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3))
    return g
  }, [apex, quad])
  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color={GOLD} vertexColors transparent opacity={opacity} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
    </mesh>
  )
}

/** Small industrial camera body with a gold lens ring, looking along -y by default. */
function Cam({ p, rot = [0, 0, 0], s = 1 }: { p: number[]; rot?: number[]; s?: number }) {
  return (
    <group position={p as [number, number, number]} rotation={rot as [number, number, number]} scale={s}>
      <mesh castShadow>
        <boxGeometry args={[0.12, 0.16, 0.12]} />
        <meshStandardMaterial {...dark} />
      </mesh>
      <mesh position={[0, -0.09, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.03, 16]} />
        <meshBasicMaterial color={GOLD} toneMapped={false} />
      </mesh>
    </group>
  )
}

/** Mannequin standing at the origin, facing +z. */
function Person({ m = goldMat }: { m?: object }) {
  return (
    <group>
      <mesh position={[0, 1.67, 0]} castShadow>
        <sphereGeometry args={[0.105, 32, 20]} />
        <meshStandardMaterial {...m} />
      </mesh>
      <Limb a={[0, 1.5, 0]} b={[0, 1.58, 0]} r={0.045} m={m} />
      <Limb a={[0, 1.02, 0]} b={[0, 1.42, 0]} r={0.135} m={m} />
      <Limb a={[-0.085, 0.94, 0]} b={[-0.09, 0.06, 0]} r={0.058} m={m} />
      <Limb a={[0.085, 0.94, 0]} b={[0.09, 0.06, 0]} r={0.058} m={m} />
      <Limb a={[-0.19, 1.43, 0]} b={[-0.22, 0.86, 0.02]} r={0.042} m={m} />
      <Limb a={[0.19, 1.43, 0]} b={[0.22, 0.86, 0.02]} r={0.042} m={m} />
    </group>
  )
}

/** Re-render-driven animation: runs `fn` with the loop clock before each frame. */
function Animate({ fn }: { fn: () => void }) {
  useFrame(fn)
  return null
}

/** Horseshoe tunnel shell extruded along -z from z = 0 to z = -len. */
function TunnelShell({ r, wall, floorY, len, m, cutTop = false }: { r: number; wall: number; floorY: number; len: number; m: object; cutTop?: boolean }) {
  const geometry = useMemo(() => {
    const a0 = Math.asin(floorY / r)
    const s = new THREE.Shape()
    const end = cutTop ? Math.PI / 2 + 0.25 : Math.PI - a0
    s.absarc(0, 0, r + wall, a0, end, false)
    s.absarc(0, 0, r, end, a0, true)
    s.closePath()
    const g = new THREE.ExtrudeGeometry(s, { depth: len, bevelEnabled: false, curveSegments: 48 })
    g.translate(0, 0, -len)
    return g
  }, [r, wall, floorY, len, cutTop])
  return (
    <mesh geometry={geometry} receiveShadow castShadow>
      <meshStandardMaterial {...m} side={THREE.DoubleSide} />
    </mesh>
  )
}

function Rails({ x = 0.72, z0 = 4, z1 = -14, y = 0 }: { x?: number; z0?: number; z1?: number; y?: number }) {
  const len = z0 - z1
  return (
    <group>
      {[-x, x].map((rx) => (
        <mesh key={rx} position={[rx, y + 0.08, (z0 + z1) / 2]} castShadow receiveShadow>
          <boxGeometry args={[0.07, 0.14, len]} />
          <meshStandardMaterial {...steel} />
        </mesh>
      ))}
      {Array.from({ length: Math.floor(len / 0.6) }, (_, i) => (
        <mesh key={i} position={[0, y + 0.02, z0 - 0.3 - i * 0.6]} receiveShadow>
          <boxGeometry args={[2.1, 0.05, 0.22]} />
          <meshStandardMaterial {...darkClay} />
        </mesh>
      ))}
    </group>
  )
}

// ------------------------------------------------------------------ dough oven (ToF)
function OvenScene() {
  const W = 1.7
  const H = 2.9
  const D = 1.5
  const t = 0.08
  const doughRef = useRef<THREE.Group>(null)
  const pts = useMemo(() => {
    const p: number[] = []
    for (let i = 0; i < 900; i++) {
      const a = Math.random() * Math.PI * 2
      const rr = Math.sqrt(Math.random())
      const x = Math.cos(a) * rr * 0.5
      const z = Math.sin(a) * rr * 0.36
      p.push(x, Math.sqrt(Math.max(0, 1 - rr * rr)) * 0.32 + 0.004, z)
    }
    return new THREE.Float32BufferAttribute(p, 3)
  }, [])
  return (
    <group>
      {/* cut-away cabinet: back, sides, top, base; the front is open */}
      <Box p={[0, H / 2, -D / 2]} s={[W, H, t]} m={interior} />
      <Box p={[-W / 2, H / 2, 0]} s={[t, H, D]} m={clay} />
      <Box p={[W / 2, H / 2, 0]} s={[t, H, D]} m={clay} />
      <Box p={[0, H, 0]} s={[W + t, t, D + t]} m={clay} r={0.03} />
      <Box p={[0, 0.25, 0]} s={[W + t, 0.5, D + t]} m={clay} r={0.03} />
      <Box p={[0, 0.505, 0]} s={[W - t, 0.01, D - t]} m={interior} />
      {/* tray */}
      <Box p={[0, 0.95, 0]} s={[1.3, 0.04, 1.0]} m={steel} />
      {/* dough, rising and falling through the loop */}
      <group ref={doughRef} position={[0, 0.97, 0]}>
        <mesh scale={[0.5, 0.32, 0.36]} castShadow>
          <sphereGeometry args={[1, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#efd7a6" roughness={0.75} />
        </mesh>
        {/* surface measured by the camera */}
        <points>
          <bufferGeometry attributes={{ position: pts }} />
          <pointsMaterial color={GOLD} size={0.018} toneMapped={false} />
        </points>
      </group>
      <Animate
        fn={() => {
          const k = 0.72 + 0.28 * (0.5 + 0.5 * wave())
          doughRef.current?.scale.set(1, k, 1)
        }}
      />
      {/* ToF camera on the ceiling, looking down */}
      <Cam p={[0, H - 0.14, 0]} s={1.3} />
      <Frustum apex={[0, H - 0.26, 0]} quad={[[-0.62, 0.98, -0.45], [0.62, 0.98, -0.45], [0.62, 0.98, 0.45], [-0.62, 0.98, 0.45]]} opacity={0.2} />
      {/* height gauge */}
      <Ray a={[0.75, 0.98, 0.42]} b={[0.75, 1.32, 0.42]} r={0.01} opacity={0.9} />
    </group>
  )
}

// ------------------------------------------------------------------ track inspection wagon
function TrackScene() {
  const sleepers = useRef<THREE.Group>(null)
  const railX = 0.72
  const camY = 0.75
  const cams = [-1, 1].flatMap((s) => [
    { x: s * railX, view: 'top' },
    { x: s * railX - s * 0.24, view: 'inner' },
    { x: s * railX + s * 0.24, view: 'outer' },
  ])
  return (
    <group>
      {/* ballast and rails; sleepers scroll under the wagon */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.001, -2]} receiveShadow>
        <planeGeometry args={[3.2, 18]} />
        <meshStandardMaterial {...darkClay} />
      </mesh>
      {[-railX, railX].map((x) => (
        <group key={x}>
          <Box p={[x, 0.16, -2]} s={[0.07, 0.16, 18]} m={steel} />
          <Box p={[x, 0.26, -2]} s={[0.13, 0.05, 18]} m={steel} />
        </group>
      ))}
      <group ref={sleepers}>
        {Array.from({ length: 30 }, (_, i) => (
          <mesh key={i} position={[0, 0.05, 6 - i * 0.6]} receiveShadow>
            <boxGeometry args={[2.3, 0.08, 0.24]} />
            <meshStandardMaterial {...interior} />
          </mesh>
        ))}
      </group>
      <Animate fn={() => sleepers.current && (sleepers.current.position.z = ((clock.t / LOOP) * 0.6 * 8) % 0.6)} />
      {/* wagon chassis, bogie wheels and the camera beam underneath */}
      <Box p={[0, 1.25, -1.6]} s={[2.4, 0.5, 6.0]} m={clay} r={0.06} />
      <Box p={[0, 2.25, -1.6]} s={[2.4, 1.5, 6.0]} m={clay} r={0.12} />
      {[0.6, -3.6].map((z) =>
        [-railX, railX].map((x) => (
          <mesh key={`${x}${z}`} position={[x, 0.46, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.38, 0.38, 0.12, 32]} />
            <meshStandardMaterial {...rubber} />
          </mesh>
        )),
      )}
      <Box p={[0, camY + 0.12, 1.0]} s={[2.1, 0.06, 0.12]} m={dark} />
      {cams.map((c, i) => {
        const tx = c.view === 'top' ? c.x : c.view === 'inner' ? c.x + Math.sign(c.x) * 0.24 - Math.sign(c.x) * 0.06 : c.x - Math.sign(c.x) * 0.24 + Math.sign(c.x) * 0.06
        return (
          <group key={i}>
            <Cam p={[c.x, camY, 1.0]} s={0.75} />
            <Ray a={[c.x, camY - 0.08, 1.0]} b={[tx, 0.27, 1.0]} r={0.008} opacity={0.7} />
          </group>
        )
      })}
      {/* one image line per millimetre: a thin gold line across each rail */}
      {[-railX, railX].map((x) => (
        <Box key={x} p={[x, 0.29, 1.0]} s={[0.32, 0.005, 0.015]} m={{ ...goldMat, emissiveIntensity: 1.2 }} />
      ))}
      {/* front area-scan camera looking ahead */}
      <Cam p={[0, 2.4, 1.45]} rot={[-Math.PI / 2 + 0.25, 0, 0]} s={1.2} />
    </group>
  )
}

// ------------------------------------------------------------------ signal box
/** Canvas texture for a control-room screen: a track layout with an active route. */
function useScreenTexture(kind: 'tracks' | 'cams' | 'replay') {
  return useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 320
    c.height = 200
    const g = c.getContext('2d')!
    g.fillStyle = '#0d1219'
    g.fillRect(0, 0, 320, 200)
    g.strokeStyle = '#5b6470'
    g.lineWidth = 4
    if (kind === 'tracks') {
      for (const y of [60, 100, 140]) {
        g.beginPath()
        g.moveTo(20, y)
        g.lineTo(300, y)
        g.stroke()
      }
      g.strokeStyle = GOLD
      g.lineWidth = 6
      g.beginPath()
      g.moveTo(20, 60)
      g.lineTo(120, 60)
      g.lineTo(160, 100)
      g.lineTo(300, 100)
      g.stroke()
    } else if (kind === 'cams') {
      for (let i = 0; i < 3; i++)
        for (let j = 0; j < 2; j++) {
          g.fillStyle = j === 0 && i === 1 ? '#3a3220' : '#1d2530'
          g.fillRect(20 + i * 98, 24 + j * 86, 86, 74)
        }
    } else {
      g.strokeStyle = GOLD
      g.lineWidth = 4
      g.beginPath()
      for (let x = 0; x <= 280; x += 10) g.lineTo(20 + x, 90 + Math.sin(x / 25) * 25)
      g.stroke()
      g.fillStyle = '#5b6470'
      g.fillRect(20, 160, 280, 6)
      g.fillStyle = GOLD
      g.fillRect(20, 160, 150, 6)
    }
    const tex = new THREE.CanvasTexture(c)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [kind])
}

function Screen({ p, ry, kind }: { p: number[]; ry: number; kind: 'tracks' | 'cams' | 'replay' }) {
  const tex = useScreenTexture(kind)
  return (
    <group position={p as [number, number, number]} rotation={[0, ry, 0]}>
      <Box p={[0, 0, -0.03]} s={[0.92, 0.6, 0.05]} m={dark} />
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[0.86, 0.54]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
      <Box p={[0, -0.42, -0.05]} s={[0.06, 0.26, 0.06]} m={dark} />
    </group>
  )
}

function SwitchTable({ z }: { z: number }) {
  return (
    <group position={[0, 0, z]}>
      <Box p={[0, 0.45, 0]} s={[3.4, 0.9, 1.0]} m={clay} r={0.04} />
      {/* row of levers */}
      {Array.from({ length: 16 }, (_, i) => (
        <group key={i} position={[-1.5 + i * 0.2, 0.9, 0.32]} rotation={[i % 5 === 2 ? 0.5 : -0.2, 0, 0]}>
          <Limb a={[0, 0, 0]} b={[0, 0.32, 0]} r={0.018} m={i % 5 === 2 ? goldMat : steel} />
        </group>
      ))}
      {/* track diagram inlaid on the table */}
      <Box p={[0, 0.905, -0.15]} s={[3.0, 0.005, 0.03]} m={darkClay} />
      <Box p={[0.6, 0.905, -0.3]} s={[1.6, 0.005, 0.03]} m={{ ...goldMat, emissiveIntensity: 0.9 }} />
      {/* gantry with 3 cameras and 3 lights looking down at the table */}
      <Box p={[0, 2.3, 0]} s={[3.6, 0.06, 0.08]} m={dark} />
      {[-1.1, 0, 1.1].map((x) => (
        <group key={x}>
          <Cam p={[x, 2.18, 0]} s={0.8} />
          <Box p={[x + 0.25, 2.24, 0]} s={[0.22, 0.04, 0.12]} m={{ color: '#fff4dc', emissive: '#fff4dc', emissiveIntensity: 1.2 }} />
          <Frustum apex={[x, 2.1, 0]} quad={[[x - 0.55, 0.92, -0.45], [x + 0.55, 0.92, -0.45], [x + 0.55, 0.92, 0.45], [x - 0.55, 0.92, 0.45]]} opacity={0.12} />
        </group>
      ))}
    </group>
  )
}

function SignalBoxScene() {
  return (
    <group>
      <SwitchTable z={-0.9} />
      <SwitchTable z={-3.0} />
      {/* operator desk with the three-screen application */}
      <group position={[2.9, 0, 1.0]} rotation={[0, -0.5, 0]}>
        <Box p={[0, 0.72, 0]} s={[2.4, 0.06, 0.9]} m={clay} r={0.02} />
        {[-1.05, 1.05].map((x) => (
          <Box key={x} p={[x, 0.36, 0]} s={[0.06, 0.72, 0.8]} m={clay} />
        ))}
        <Screen p={[-0.85, 1.25, -0.2]} ry={0.35} kind="cams" />
        <Screen p={[0, 1.25, -0.3]} ry={0} kind="tracks" />
        <Screen p={[0.85, 1.25, -0.2]} ry={-0.35} kind="replay" />
      </group>
    </group>
  )
}

// ------------------------------------------------------------------ tunnel inspection truck
// Inside the group: tunnel axis at y = 0, floor at y = F. The group is lifted by -F
// so the floor sits on the shadow ground (world y = 0).
function TunnelScene() {
  const R = 2.5
  const F = -1.3
  const lights = useRef<THREE.MeshBasicMaterial>(null)
  const angles = Array.from({ length: 11 }, (_, i) => -0.2 + (i / 10) * (Math.PI + 0.4))
  const eq = [2.8, 1.4, -0.6, -2.6, -4.6, -6.6, -8.6].flatMap((z) => angles.map((a) => ({ a, z, hit: z > 1 })))
  const onWall = (a: number, d: number, z: number) => [Math.cos(a) * (R - d), Math.sin(a) * (R - d), z]
  const T = { x0: -0.8, x1: 0.8, y0: F + 0.62, y1: F + 2.35 }
  const camAt = (i: number) => {
    const t = (i % 11) / 10
    const row = i < 11 ? 0 : 0.14
    if (t < 0.25) return [T.x1 - 0.06, T.y0 + 0.9 + t * 2.6 - row, 0.06]
    if (t > 0.75) return [T.x0 + 0.06, T.y0 + 0.9 + (1 - t) * 2.6 - row, 0.06]
    return [T.x1 - ((t - 0.25) / 0.5) * 1.6, T.y1 - 0.08 - row, 0.06]
  }
  const hits = eq.filter((e) => e.hit)
  const sign = onWall(0.12, 0.14, -2.6)
  return (
    <group position={[0, -F, 0]}>
      <group position={[0, 0, 4.5]}>
        <TunnelShell r={R} wall={0.35} floorY={F} len={20} m={interior} />
      </group>
      <mesh rotation-x={-Math.PI / 2} position={[0, F + 0.001, -5.5]} receiveShadow>
        <planeGeometry args={[2 * Math.sqrt(R * R - F * F), 20]} />
        <meshStandardMaterial {...darkClay} />
      </mesh>
      <group position={[0, F, 4.5]}>
        <Rails z0={0} z1={-20} />
      </group>
      {/* equipment on the walls and roof; the 22 being inspected are gold */}
      {eq.map((e, i) => (
        <mesh key={i} position={onWall(e.a, 0.12, e.z) as [number, number, number]} rotation={[0, 0, e.a]} castShadow>
          <boxGeometry args={[0.16, 0.34, 0.5]} />
          <meshStandardMaterial {...(e.hit ? goldMat : darkClay)} />
        </mesh>
      ))}
      {/* flat wagon carrying the truck */}
      <Box p={[0, F + 0.42, -2.3]} s={[2.0, 0.14, 6.4]} m={darkClay} />
      {[-4.8, -3.9, -0.7, 0.2].map((z) =>
        [-0.72, 0.72].map((x) => (
          <mesh key={`${x}${z}`} position={[x, F + 0.24, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 0.08, 24]} />
            <meshStandardMaterial {...rubber} />
          </mesh>
        )),
      )}
      <Box p={[0, (T.y0 + T.y1) / 2, -2.3]} s={[1.6, T.y1 - T.y0, 4.6]} m={clay} r={0.08} />
      <Box p={[0, F + 1.1, -5.2]} s={[1.6, 1.0, 1.0]} m={clay} r={0.12} />
      {/* light strip on the rear, flashing on the shared trigger */}
      <mesh position={[0, T.y0 + 0.16, 0.05]}>
        <boxGeometry args={[1.4, 0.06, 0.02]} />
        <meshBasicMaterial ref={lights} color="#fff4dc" toneMapped={false} />
      </mesh>
      <Animate fn={() => lights.current && lights.current.color.setScalar(0.35 + 0.65 * Math.max(0, wave(4)))} />
      {/* 22 rear cameras, each with a ray to its piece of equipment */}
      {hits.map((e, i) => {
        const c = camAt(i)
        return (
          <group key={i}>
            <mesh position={c as [number, number, number]}>
              <sphereGeometry args={[0.035, 12, 8]} />
              <meshBasicMaterial color={GOLD} toneMapped={false} />
            </mesh>
            <Ray a={c} b={onWall(e.a, 0.22, e.z)} r={0.006} opacity={0.4} />
          </group>
        )
      })}
      {/* two side cameras reading a positioning sign */}
      <mesh position={sign as [number, number, number]} rotation={[0, 0, 0.12]}>
        <boxGeometry args={[0.04, 0.5, 0.7]} />
        <meshStandardMaterial color="#f1efe9" roughness={0.5} />
      </mesh>
      {[-1.9, -2.3].map((z) => (
        <group key={z}>
          <mesh position={[T.x1 + 0.03, F + 1.4, z]}>
            <sphereGeometry args={[0.035, 12, 8]} />
            <meshBasicMaterial color="#ffffff" toneMapped={false} />
          </mesh>
          <Ray a={[T.x1 + 0.03, F + 1.4, z]} b={sign} r={0.007} opacity={0.6} color="#ffffff" />
        </group>
      ))}
    </group>
  )
}

// ------------------------------------------------------------------ metro niche
function NicheScene() {
  const R = 3.0
  const F = -1.5
  const half = Math.sqrt(R * R - F * F)
  return (
    <group position={[0, -F, 0]}>
      <TunnelShell r={R} wall={0.4} floorY={F} len={18} m={interior} />
      <mesh rotation-x={-Math.PI / 2} position={[0, F + 0.001, -6]} receiveShadow>
        <planeGeometry args={[2 * half, 20]} />
        <meshStandardMaterial {...darkClay} />
      </mesh>
      <group position={[-0.5, F, 3]}>
        <Rails z0={0} z1={-21} />
      </group>
      {/* niches: dark recesses at ground level in the right wall, two people wide */}
      {[0.6, -4.6, -9.8].map((z, i) => (
        <group key={z}>
          <Box p={[half + 0.42, F + 1.05, z]} s={[0.06, 2.1, 1.4]} m={{ color: '#2a3039', roughness: 0.9 }} />
          <Box p={[half + 0.2, F + 2.12, z]} s={[0.5, 0.06, 1.4]} m={{ color: '#2a3039', roughness: 0.9 }} />
          {[-0.7, 0.7].map((dz) => (
            <Box key={dz} p={[half + 0.2, F + 1.05, z + dz]} s={[0.5, 2.1, 0.06]} m={{ color: '#2a3039', roughness: 0.9 }} />
          ))}
          {i === 0 && (
            <lineSegments position={[half + 0.02, F + 1.08, z]}>
              <edgesGeometry args={[new THREE.BoxGeometry(0.5, 2.25, 1.6)]} />
              <lineBasicMaterial color={GOLD} toneMapped={false} />
            </lineSegments>
          )}
        </group>
      ))}
      {/* a technician sheltering in the nearest niche */}
      <group position={[half + 0.18, F, 0.6]} rotation={[0, -Math.PI / 2, 0]} scale={0.95}>
        <Person m={{ color: GOLD, roughness: 0.5, metalness: 0.3, emissive: GOLD, emissiveIntensity: 0.15 }} />
      </group>
      {/* metro approaching, headlights on */}
      <Box p={[-0.5, F + 1.55, -12]} s={[2.4, 2.7, 4]} m={clay} r={0.3} />
      <Box p={[-0.5, F + 2.0, -9.99]} s={[1.6, 0.8, 0.02]} m={dark} />
      {[-1.2, 0.2].map((x) => (
        <mesh key={x} position={[x, F + 0.9, -9.98]}>
          <circleGeometry args={[0.13, 24]} />
          <meshBasicMaterial color="#fff4dc" toneMapped={false} />
        </mesh>
      ))}
    </group>
  )
}

// ------------------------------------------------------------------ SLAM
function SlamScene() {
  const R = 2.6
  const F = -1.4
  const twinkle = useRef<THREE.PointsMaterial>(null)
  const path = useMemo(() => Array.from({ length: 9 }, (_, i) => [Math.sin(i * 0.5) * 0.35, F + 1.6, 2.5 - i * 1.3]), [F])
  const map = useMemo(() => {
    let seed = 5
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
    const p: number[] = []
    for (let i = 0; i < 1600; i++) {
      const a = -0.3 + rnd() * (Math.PI + 0.6)
      const rr = R - 0.04 - rnd() * 0.06
      p.push(Math.cos(a) * rr, Math.sin(a) * rr, 3 - rnd() * 14)
    }
    return new THREE.Float32BufferAttribute(p, 3)
  }, [])
  return (
    <group position={[0, -F, 0]}>
      <group position={[0, 0, 3.5]}>
        <TunnelShell r={R} wall={0.3} floorY={F} len={18} m={{ ...interior, color: '#6f757d' }} />
      </group>
      <mesh rotation-x={-Math.PI / 2} position={[0, F + 0.001, -5]} receiveShadow>
        <planeGeometry args={[2 * Math.sqrt(R * R - F * F), 18]} />
        <meshStandardMaterial {...darkClay} />
      </mesh>
      <group position={[0, F, 4]}>
        <Rails z0={0} z1={-18} />
      </group>
      {/* sparse map points reconstructed on the walls */}
      <points>
        <bufferGeometry attributes={{ position: map }} />
        <pointsMaterial ref={twinkle} color={GOLD} size={0.035} transparent toneMapped={false} />
      </points>
      <Animate fn={() => twinkle.current && (twinkle.current.opacity = 0.7 + 0.3 * wave(2))} />
      {/* keyframe trail */}
      {path.slice(0, -1).map((p, i) => (
        <group key={i}>
          <Ray a={p} b={path[i + 1]} r={0.012} opacity={0.85} />
          <lineSegments position={p as [number, number, number]} rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
            <edgesGeometry args={[new THREE.ConeGeometry(0.3, 0.42, 4, 1, true)]} />
            <lineBasicMaterial color={GOLD} toneMapped={false} />
          </lineSegments>
        </group>
      ))}
      {/* stereo camera rig at the head of the trail, looking down the tunnel */}
      <group position={path[path.length - 1] as [number, number, number]}>
        <Box p={[0, 0, 0]} s={[0.7, 0.06, 0.08]} m={dark} />
        <Cam p={[-0.3, 0.02, -0.06]} rot={[Math.PI / 2, 0, 0]} s={0.9} />
        <Cam p={[0.3, 0.02, -0.06]} rot={[Math.PI / 2, 0, 0]} s={0.9} />
      </group>
    </group>
  )
}

// ------------------------------------------------------------------ registry
type MeshScene = { cam: [number, number, number]; target: [number, number, number]; sway: number; node: ReactNode }
const MESH_SCENES: Record<string, MeshScene> = {
  lidar: { cam: [5.0, 3.5, 6.9], target: [-0.7, 0.7, 0.7], sway: 0.3, node: <LidarScene /> },
  tof: { cam: [3.0, 2.9, 5.2], target: [0, 1.4, 0], sway: 0.35, node: <OvenScene /> },
  tunnel: { cam: [0.9, 2.2, 7.2], target: [0, 1.4, -1.5], sway: 0.18, node: <TunnelScene /> },
  track: { cam: [4.3, 1.35, 5.4], target: [0, 0.75, 0.5], sway: 0.28, node: <TrackScene /> },
  niche: { cam: [-0.6, 2.0, 5.4], target: [1.6, 1.1, -1.5], sway: 0.15, node: <NicheScene /> },
  signalbox: { cam: [6.2, 4.4, 5.6], target: [0.8, 0.8, -1.0], sway: 0.25, node: <SignalBoxScene /> },
  slam: { cam: [1.5, 1.9, 4.6], target: [0, 1.5, -3], sway: 0.18, node: <SlamScene /> },
}

function Rig({ cfg }: { cfg: MeshScene }) {
  const { camera, invalidate } = useThree()
  useEffect(() => {
    const target = new THREE.Vector3(...cfg.target)
    const base = new THREE.Vector3(...cfg.cam).sub(target)
    const frame = (t: number) => {
      const a = Math.sin((t / LOOP) * Math.PI * 2) * cfg.sway
      camera.position.copy(base.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), a).add(target))
      camera.lookAt(target)
      clock.t = t
      invalidate()
    }
    const w = window as unknown as { __frame: (t: number) => void; __capturing?: boolean }
    w.__frame = frame
    frame(0)
    let raf = 0
    const t0 = performance.now()
    const tick = () => {
      if (!w.__capturing) frame(((performance.now() - t0) / 1000) % LOOP)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [cfg, camera, invalidate])
  return null
}

function MeshCard() {
  const id = new URLSearchParams(location.search).get('id') ?? 'lidar'
  const cfg = MESH_SCENES[id] ?? MESH_SCENES.lidar
  return (
    <div style={{ width: 960, height: 600 }}>
      <Canvas
        frameloop="demand"
        dpr={1}
        shadows
        camera={{ fov: 34, near: 0.1, far: 80 }}
        gl={{ antialias: false, preserveDrawingBuffer: true }}
        onCreated={({ gl }) => gl.setClearColor('#0a0d12')}
      >
        <fog attach="fog" args={['#0a0d12', 14, 30]} />
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={2.4} position={[0, 8, 2]} rotation-x={Math.PI / 2} scale={[12, 8, 1]} />
          <Lightformer form="rect" intensity={1.2} position={[-8, 3, 4]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
          <Lightformer form="rect" intensity={0.8} color="#ffd9a0" position={[8, 2, -4]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
        </Environment>
        <directionalLight position={[5, 9, 6]} intensity={1.1} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0004}>
          <orthographicCamera attach="shadow-camera" args={[-9, 9, 9, -9, 0.5, 30]} />
        </directionalLight>
        <ambientLight intensity={0.15} />

        <mesh rotation-x={-Math.PI / 2} receiveShadow>
          <planeGeometry args={[60, 60]} />
          <shadowMaterial opacity={0.55} />
        </mesh>
        <ContactShadows position={[0, 0.002, 0]} opacity={0.6} scale={20} blur={2.5} far={4} resolution={1024} color="#000" />
        {cfg.node}
        <Rig cfg={cfg} />

        <EffectComposer multisampling={0}>
          <N8AO aoRadius={0.8} intensity={2.2} distanceFalloff={1} quality="high" />
          <Bloom mipmapBlur intensity={0.55} luminanceThreshold={0.85} radius={0.6} />
          <SMAA />
          <Vignette offset={0.3} darkness={0.55} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MeshCard />
  </StrictMode>,
)
