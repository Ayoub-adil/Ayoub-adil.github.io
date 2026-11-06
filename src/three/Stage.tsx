import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import PointField from './PointField'
import { field } from './store'

type Key = { pos: [number, number, number]; target: [number, number, number] }

// One camera pose per stage; the rig blends between them with the morph value.
const KEYS: Key[] = [
  { pos: [-0.75, 0.1, 8.4], target: [-0.75, 0.05, 0] },
  { pos: [1.15, 0.25, 8.6], target: [0, 0.15, -2] },
  { pos: [8.2, 4.6, 8.4], target: [0, -0.2, -3] },
  { pos: [6.8, 4.4, 8.8], target: [-0.6, -0.3, 0] },
  { pos: [0, 0.45, 9.8], target: [-1.2, 0.25, 0] },
  { pos: [6.4, 5.4, 8.2], target: [-0.9, -0.7, 0] },
]

const ease = (t: number) => t * t * (3 - 2 * t)

function Rig({ wide }: { wide: boolean }) {
  const { camera } = useThree()
  const s = useRef({ m: 0, px: 0, py: 0 })
  const pos = useMemo(() => new THREE.Vector3(), [])
  const tgt = useMemo(() => new THREE.Vector3(), [])
  const a = useMemo(() => new THREE.Vector3(), [])
  const b = useMemo(() => new THREE.Vector3(), [])

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera
    // shift the subject to the right of the text column on wide screens
    cam.filmOffset = wide ? -5.5 : 0
    cam.updateProjectionMatrix()
  }, [camera, wide])

  useFrame((_, dt) => {
    const st = s.current
    const k = 1 - Math.exp(-dt * (field.reduced ? 60 : 2.6))
    st.m += (field.morph - st.m) * k
    st.px += (field.pointer.x - st.px) * (1 - Math.exp(-dt * 2))
    st.py += (field.pointer.y - st.py) * (1 - Math.exp(-dt * 2))

    const i = Math.min(Math.floor(st.m), KEYS.length - 2)
    const f = ease(Math.min(Math.max(st.m - i, 0), 1))
    pos.lerpVectors(a.fromArray(KEYS[i].pos), b.fromArray(KEYS[i + 1].pos), f)
    tgt.lerpVectors(a.fromArray(KEYS[i].target), b.fromArray(KEYS[i + 1].target), f)

    const motion = field.reduced ? 0 : 1
    pos.x += st.px * 0.45 * motion
    pos.y += st.py * 0.3 * motion
    camera.position.copy(pos)
    camera.lookAt(tgt)
  })
  return null
}

export default function Stage({ active, mobile }: { active: boolean; mobile: boolean }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, mobile ? 1.5 : 1.75]}
      camera={{ fov: 42, near: 0.1, far: 80, position: [1.15, 0.25, 8.6] }}
      gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
      onCreated={({ gl }) => gl.setClearColor('#0a0d12')}
      aria-hidden
    >
      <fog attach="fog" args={['#0a0d12', 12, 34]} />
      <PointField count={mobile ? 30000 : 85000} />
      <Rig wide={!mobile} />
      {!mobile && (
        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur intensity={0.62} luminanceThreshold={0.16} luminanceSmoothing={0.3} radius={0.72} />
          <Noise premultiply blendFunction={BlendFunction.SCREEN} opacity={0.06} />
          <Vignette offset={0.25} darkness={0.7} />
        </EffectComposer>
      )}
    </Canvas>
  )
}
