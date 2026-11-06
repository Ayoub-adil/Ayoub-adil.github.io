// Dev-only: renders one project-card scene at 960x600 for video capture.
// /dev/card/?id=lidar ; window.__frame(t) renders time t (seconds) on demand.
import { StrictMode, useEffect, useMemo, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { SCENES } from '../three/shapes'
import { CARD_SCENES } from './cardScenes'

export const LOOP = 8 // seconds

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  attribute vec4 aP;
  attribute float aRnd;
  varying float vHi;
  varying float vAlpha;
  void main() {
    vec3 p = aP.xyz;
    vHi = max(aP.w, 0.0);
    // gold elements breathe gently, in phase with the loop
    vHi *= 0.8 + 0.2 * sin(uTime * 6.2831853 / ${LOOP.toFixed(1)} * 2.0 + aRnd * 0.5);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float depth = -mv.z;
    gl_PointSize = min(uSize * (0.6 + aRnd * 0.8) * (1.0 + vHi * 0.5) / depth, uSize * 0.3);
    vAlpha = smoothstep(30.0, 6.0, depth);
  }
`
const fragment = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uAccent;
  varying float vHi;
  varying float vAlpha;
  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    float a = smoothstep(0.5, 0.0, r) * vAlpha * (0.5 + vHi * 0.5);
    gl_FragColor = vec4(mix(uBase, uAccent, vHi), a);
    #include <colorspace_fragment>
  }
`

function Scene({ id }: { id: string }) {
  const cfg = CARD_SCENES.find((c) => c.id === id) ?? CARD_SCENES[0]
  const { camera, invalidate } = useThree()
  const mat = useRef<THREE.ShaderMaterial>(null)
  const N = 70000
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3))
    g.setAttribute('aP', new THREE.BufferAttribute(SCENES[cfg.scene](N), 4))
    const rnd = new Float32Array(N)
    for (let i = 0; i < N; i++) rnd[i] = (Math.sin(i * 12.9898) * 43758.5453) % 1
    g.setAttribute('aRnd', new THREE.BufferAttribute(rnd.map(Math.abs), 1))
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 50)
    return g
  }, [cfg.scene])
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 21 },
      uBase: { value: new THREE.Color('#e6eaf0') },
      uAccent: { value: new THREE.Color('#fab529') },
    }),
    [],
  )

  useEffect(() => {
    const target = new THREE.Vector3(...cfg.target)
    const base = new THREE.Vector3(...cfg.cam).sub(target)
    const frame = (t: number) => {
      // seamless loop: sway left and right around the target
      const a = Math.sin((t / LOOP) * Math.PI * 2) * cfg.sway
      const p = base.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), a).add(target)
      camera.position.copy(p)
      camera.lookAt(target)
      uniforms.uTime.value = t
      invalidate()
    }
    ;(window as unknown as { __frame: (t: number) => void }).__frame = frame
    frame(0)
    // preview: animate in real time when not driven by the capture script
    let raf = 0
    const t0 = performance.now()
    const tick = () => {
      if (!(window as unknown as { __capturing?: boolean }).__capturing) frame(((performance.now() - t0) / 1000) % LOOP)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [cfg, camera, invalidate, uniforms])

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial ref={mat} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

function Card() {
  const id = new URLSearchParams(location.search).get('id') ?? 'lidar'
  return (
    <div style={{ width: 960, height: 600 }}>
      <Canvas frameloop="demand" dpr={1} camera={{ fov: 38, near: 0.1, far: 80 }} gl={{ antialias: false, preserveDrawingBuffer: true }} onCreated={({ gl }) => gl.setClearColor('#0a0d12')}>
        <Scene id={id} />
        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur intensity={0.45} luminanceThreshold={0.3} luminanceSmoothing={0.3} radius={0.7} />
          <Vignette offset={0.3} darkness={0.6} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Card />
  </StrictMode>,
)
