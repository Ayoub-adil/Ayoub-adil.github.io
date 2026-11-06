// Dev-only: project-card scenes built from real meshes ("clay + gold" style),
// rendered at 960x600 for video capture. /dev/mesh/?id=lidar
// window.__frame(t) renders time t (seconds) on demand; see tools/render_cards.mjs.
import { StrictMode, useEffect, useMemo, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas, useThree } from '@react-three/fiber'
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

// ------------------------------------------------------------------ registry
type MeshScene = { cam: [number, number, number]; target: [number, number, number]; sway: number; node: ReactNode }
const MESH_SCENES: Record<string, MeshScene> = {
  lidar: { cam: [5.0, 3.5, 6.9], target: [-0.7, 0.7, 0.7], sway: 0.3, node: <LidarScene /> },
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
