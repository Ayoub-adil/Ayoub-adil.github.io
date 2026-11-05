import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { buildShapes, TUNNEL_Z } from './shapes'
import { field } from './store'

// Stage 0 is my head, reconstructed from a portrait (tools/head_cloud.py).
// Stages 1..5 are the procedural "What I do" scenes.
export const HEAD_URL = '/models/head.bin'
export const LAST = 5

const vertex = /* glsl */ `
  uniform float uMorph;
  uniform float uTime;
  uniform float uIntro;
  uniform float uSize;
  uniform float uSpin;
  uniform float uYaw;
  uniform float uScanZ;
  uniform float uScanY;
  uniform float uMotion;
  uniform float uDim;

  attribute vec4 aP0;
  attribute vec4 aP1;
  attribute vec4 aP2;
  attribute vec4 aP3;
  attribute vec4 aP4;
  attribute vec4 aP5;
  attribute vec4 aRnd;

  varying float vHi;
  varying float vLum;
  varying float vAlpha;
  varying float vScan;

  vec4 spinY(vec4 p, float a) {
    float c = cos(a), s = sin(a);
    return vec4(c * p.x + s * p.z, p.y, -s * p.x + c * p.z, p.w);
  }

  vec4 shapeAt(float i) {
    if (i < 0.5) return spinY(aP0, uYaw);
    if (i < 1.5) return aP1;
    if (i < 2.5) return aP2;
    if (i < 3.5) return aP3;
    if (i < 4.5) return aP4;
    return spinY(aP5, uSpin);
  }

  // w >= 0: accent weight. w < 0: brightness 1 + w (head, from the photo).
  float lumOf(float w) { return w < 0.0 ? 1.0 + w : 1.0; }

  void main() {
    float m = clamp(uMorph, 0.0, 5.0);
    float i0 = floor(m);
    float t = m - i0;
    // staggered per-point transition
    float d = aRnd.x * 0.45;
    float tt = smoothstep(d, d + 0.55, t);

    vec4 a = shapeAt(i0);
    vec4 b = shapeAt(min(i0 + 1.0, 5.0));
    vec3 p = mix(a.xyz, b.xyz, tt);

    // lift the points off their path mid-transition
    float bump = sin(tt * 3.14159);
    p += (aRnd.yzw - 0.5) * bump * 1.4 * uMotion;

    // idle breathing
    p += 0.008 * uMotion * vec3(
      sin(uTime * 0.7 + aRnd.x * 40.0),
      cos(uTime * 0.6 + aRnd.y * 40.0),
      sin(uTime * 0.5 + aRnd.z * 40.0));

    // intro: gather from a wide cloud
    float intro = smoothstep(0.0, 1.0, clamp(uIntro * 1.6 - aRnd.x * 0.6, 0.0, 1.0));
    vec3 cloud = (aRnd.yzw - 0.5) * vec3(26.0, 16.0, 26.0);
    p = mix(cloud, p, intro);

    // outside the hero and the sequence: dissolve into sparse drifting dust
    float dis = smoothstep(0.0, 1.0, clamp(uDim * 1.4 - aRnd.z * 0.4, 0.0, 1.0));
    vec3 dust = (aRnd.wyx - 0.5) * vec3(30.0, 18.0, 22.0);
    dust.y += sin(uTime * 0.05 + aRnd.x * 6.28) * 0.6 * uMotion;
    p = mix(p, dust, dis);

    // scan lines: down the face (stage 0), along the tunnel (stage 1)
    float wHead = 1.0 - clamp(m, 0.0, 1.0);
    float wTunnel = 1.0 - clamp(abs(m - 1.0), 0.0, 1.0);
    float dy = aP0.y - uScanY;
    float dz = aP1.z - uScanZ;
    vScan = exp(-dy * dy * 160.0) * wHead * 0.55 + exp(-dz * dz * 6.0) * wTunnel;

    vHi = mix(max(a.w, 0.0), max(b.w, 0.0), tt);
    vLum = mix(lumOf(a.w), lumOf(b.w), tt);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float depth = -mv.z;
    float size = uSize * (0.55 + aRnd.y * 0.9) * (1.0 + vHi * 0.6 + vScan * 1.2);
    gl_PointSize = min(size / depth, uSize * 0.32);
    vAlpha = smoothstep(34.0, 7.0, depth) * mix(0.25, 1.0, smoothstep(1.5, 5.0, depth));
    // keep roughly one point in six once dissolved
    vAlpha *= mix(1.0, step(aRnd.w, 0.16) * 0.7, dis);
    vLum = mix(vLum, 1.0, dis);
    gl_PointSize *= mix(1.0, 0.55, dis);
  }
`

const fragment = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uAccent;
  uniform float uOpacity;

  varying float vHi;
  varying float vLum;
  varying float vAlpha;
  varying float vScan;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float disk = smoothstep(0.5, 0.0, r);
    float hi = clamp(vHi + vScan, 0.0, 1.0);
    vec3 col = mix(uBase, uAccent, hi);
    float a = disk * vAlpha * uOpacity * (0.55 + hi * 0.9) * mix(vLum, 1.0, hi);
    gl_FragColor = vec4(col, a);
    #include <colorspace_fragment>
  }
`

/** Decode head.bin: int16 x, y, z (/4096), uint8 brightness, uint8 pad. */
async function loadHead(count: number, out: Float32Array) {
  const buf = await (await fetch(HEAD_URL)).arrayBuffer()
  const dv = new DataView(buf)
  const n = buf.byteLength / 8
  for (let i = 0; i < count; i++) {
    const o = (i % n) * 8
    out[i * 4] = dv.getInt16(o, true) / 4096
    out[i * 4 + 1] = dv.getInt16(o + 2, true) / 4096
    out[i * 4 + 2] = dv.getInt16(o + 4, true) / 4096
    out[i * 4 + 3] = dv.getUint8(o + 6) / 255 - 1
  }
}

export default function PointField({ count }: { count: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null)
  const { gl } = useThree()
  const state = useRef({ morph: 0, dim: 0, intro: field.reduced ? 1 : 0, spin: 0, ready: false, wait: 0 })

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const shapes = buildShapes(count)
    // position is only used for bounding volumes; the shader reads aP0..aP5
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3))
    g.setAttribute('aP0', new THREE.BufferAttribute(new Float32Array(count * 4), 4))
    shapes.forEach((s, i) => g.setAttribute(`aP${i + 1}`, new THREE.BufferAttribute(s, 4)))
    const rnd = new Float32Array(count * 4)
    for (let i = 0; i < rnd.length; i++) rnd[i] = Math.random()
    g.setAttribute('aRnd', new THREE.BufferAttribute(rnd, 4))
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 40)
    return g
  }, [count])

  useEffect(() => {
    const attr = geometry.getAttribute('aP0') as THREE.BufferAttribute
    let alive = true
    loadHead(count, attr.array as Float32Array)
      .then(() => {
        if (!alive) return
        attr.needsUpdate = true
        state.current.ready = true
      })
      .catch(() => (state.current.ready = true))
    return () => {
      alive = false
      geometry.dispose()
    }
  }, [geometry, count])

  const uniforms = useMemo(
    () => ({
      uMorph: { value: 0 },
      uTime: { value: 0 },
      uIntro: { value: 0 },
      uSize: { value: 22 },
      uSpin: { value: 0 },
      uYaw: { value: 0 },
      uScanZ: { value: 0 },
      uScanY: { value: 9 },
      uMotion: { value: field.reduced ? 0 : 1 },
      uOpacity: { value: 1 },
      uDim: { value: 0 },
      uBase: { value: new THREE.Color('#e6eaf0') },
      uAccent: { value: new THREE.Color('#ff6a3d') },
    }),
    [],
  )

  useFrame((_, dt) => {
    const u = mat.current?.uniforms
    if (!u) return
    const s = state.current
    const motion = field.reduced ? 0 : 1
    const k = 1 - Math.exp(-dt * (field.reduced ? 60 : 3.2))
    s.morph += (field.morph - s.morph) * k
    s.dim += (field.dim - s.dim) * (1 - Math.exp(-dt * 2.5))
    // hold the intro until the head is loaded (or give up after 4 s)
    s.wait += dt
    if (s.ready || s.wait > 4) s.intro = Math.min(1, s.intro + dt / 2.6)
    s.spin += dt * 0.25 * motion

    const time = (u.uTime.value += dt)
    u.uMorph.value = s.morph
    u.uIntro.value = s.intro
    u.uSpin.value = s.spin
    // slow look left / right, small enough to stay inside what the photo captured
    u.uYaw.value = Math.sin(time * 0.35) * 0.22 * motion
    const span = TUNNEL_Z.max - TUNNEL_Z.min
    u.uScanZ.value = field.reduced ? 2 : TUNNEL_Z.max - ((time * 3.5) % (span + 6))
    // a scan line down the face every 6 s, once the head has formed
    const cycle = (time % 6) / 6
    u.uScanY.value = field.reduced || s.intro < 1 ? 9 : 2.3 - cycle * 9
    u.uDim.value = s.dim
    u.uSize.value = 24 * gl.getPixelRatio()
  })

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
