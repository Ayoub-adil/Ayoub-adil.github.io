// Procedural point sets for the five scroll stages. Everything is synthetic.
// Each shape fills a Float32Array of N * 4: xyz + highlight weight (0..1).

export const STAGES = 5

function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Rng = () => number
const gauss = (r: Rng) => (r() + r() + r() - 1.5) * 0.8

class Writer {
  i = 0
  constructor(public out: Float32Array) {}
  get full() {
    return this.i * 4 >= this.out.length
  }
  push(x: number, y: number, z: number, w = 0) {
    if (this.full) return
    const o = this.i * 4
    this.out[o] = x
    this.out[o + 1] = y
    this.out[o + 2] = z
    this.out[o + 3] = w
    this.i++
  }
}

/** Call `emit` with a weighted choice until the buffer is full. */
function fill(w: Writer, r: Rng, parts: [number, () => void][]) {
  const total = parts.reduce((s, p) => s + p[0], 0)
  while (!w.full) {
    let u = r() * total
    for (const [weight, fn] of parts) {
      if ((u -= weight) <= 0) {
        fn()
        break
      }
    }
  }
}

// ---------------------------------------------------------------- tunnel
const T = { R: 2.4, CY: 0.3, FLOOR: -1.3, Z0: -13, Z1: 4 }
const aMin = Math.asin((T.FLOOR - T.CY) / T.R)
const arcSpan = Math.PI - 2 * aMin
const floorHalf = T.R * Math.cos(aMin)
const arcLen = T.R * arcSpan
const perim = arcLen + 2 * floorHalf

/** s in [0,1) walks the floor then the vault of the horseshoe profile. */
function profile(s: number): [number, number] {
  const d = s * perim
  if (d < 2 * floorHalf) return [-floorHalf + d, T.FLOOR]
  const a = aMin + ((d - 2 * floorHalf) / arcLen) * arcSpan
  return [T.R * Math.cos(a), T.CY + T.R * Math.sin(a)]
}

function tunnelScan(N: number) {
  const out = new Float32Array(N * 4)
  const w = new Writer(out)
  const r = mulberry32(11)
  const spacing = 0.2
  const rings = Math.floor((T.Z1 - T.Z0) / spacing)
  fill(w, r, [
    [
      0.74,
      () => {
        const k = Math.floor(r() * rings)
        const [x, y] = profile(r())
        const n = gauss(r) * 0.025
        w.push(x * (1 + n * 0.3), y + n, T.Z0 + k * spacing + gauss(r) * 0.012)
      },
    ],
    [
      0.035,
      () => {
        const side = r() < 0.5 ? -1 : 1
        w.push(side * 0.72 + gauss(r) * 0.03, T.FLOOR + 0.16 + gauss(r) * 0.01, T.Z0 + r() * (T.Z1 - T.Z0), 0.2)
      },
    ],
    [
      0.05,
      () => {
        // sleepers
        const k = Math.floor(r() * ((T.Z1 - T.Z0) / 0.6))
        w.push((r() * 2 - 1) * 1.15, T.FLOOR + 0.05, T.Z0 + k * 0.6 + gauss(r) * 0.06, 0.1)
      },
    ],
    [
      0.02,
      () => {
        // cable trays along the walls and the overhead line
        const which = r()
        const z = T.Z0 + r() * (T.Z1 - T.Z0)
        if (which < 0.33) w.push(0 + gauss(r) * 0.02, T.CY + T.R - 0.35, z, 0.1)
        else w.push((which < 0.66 ? -1 : 1) * 2.05 + gauss(r) * 0.03, 0.9 + gauss(r) * 0.05, z, 0.05)
      },
    ],
    [0.06, () => w.push(gauss(r) * 2.2, T.CY + gauss(r) * 1.6, T.Z0 + r() * (T.Z1 - T.Z0))],
  ])
  return out
}

function tunnelMesh(N: number) {
  const out = new Float32Array(N * 4)
  const w = new Writer(out)
  const r = mulberry32(23)
  const nu = 30
  const dz = 0.75
  const nz = Math.floor((T.Z1 - T.Z0) / dz)
  const at = (s: number, z: number, wt: number) => {
    const [x, y] = profile(((s % 1) + 1) % 1)
    w.push(x, y, z, wt)
  }
  fill(w, r, [
    [0.36, () => at(Math.floor(r() * nu) / nu, T.Z0 + r() * (T.Z1 - T.Z0), 0.12)],
    [0.3, () => at(r(), T.Z0 + Math.floor(r() * nz) * dz, 0.12)],
    [
      0.22,
      () => {
        const t = r()
        at((Math.floor(r() * nu) + t) / nu, T.Z0 + (Math.floor(r() * nz) + t) * dz, 0.05)
      },
    ],
    [
      0.12,
      () => {
        // a fitted section highlighted mid-tunnel
        const z = -1.5 + r() * 3
        at(r(), z, 0.55)
      },
    ],
  ])
  return out
}

// ---------------------------------------------------------------- detection
function detect(N: number) {
  const out = new Float32Array(N * 4)
  const w = new Writer(out)
  const r = mulberry32(37)
  const G = -1.3
  const human = { x: 0.35, z: 0.2 }

  const capsule = (ax: number, ay: number, az: number, bx: number, by: number, bz: number, rad: number, wt: number) => {
    const t = r()
    const a = r() * Math.PI * 2
    w.push(ax + (bx - ax) * t + Math.cos(a) * rad, ay + (by - ay) * t, az + (bz - az) * t + Math.sin(a) * rad, wt)
  }
  const boxEdges = (x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, wt: number) => {
    const e = Math.floor(r() * 12)
    const t = r()
    const xs = [x0, x1]
    const ys = [y0, y1]
    const zs = [z0, z1]
    const axis = Math.floor(e / 4)
    const a = (e >> 1) & 1
    const b = e & 1
    if (axis === 0) w.push(x0 + (x1 - x0) * t, ys[a], zs[b], wt)
    else if (axis === 1) w.push(xs[a], y0 + (y1 - y0) * t, zs[b], wt)
    else w.push(xs[a], ys[b], z0 + (z1 - z0) * t, wt)
  }

  fill(w, r, [
    [
      0.16,
      () => {
        // ground grid
        const along = r() < 0.5
        const k = Math.round((r() * 2 - 1) * 12) * 0.5
        const t = (r() * 2 - 1) * 6
        w.push(along ? t : k, G, along ? k * 0.66 : t * 0.66)
      },
    ],
    [
      0.17,
      () => {
        // bus body, mostly the face seen by the sensor
        const u = r()
        const [x0, x1, y0, y1, z0, z1] = [-5.4, -1.7, -1.0, 1.9, -3.2, 3.2]
        if (u < 0.6) w.push(x1, y0 + r() * (y1 - y0), z0 + r() * (z1 - z0), 0.04)
        else if (u < 0.8) w.push(x0 + r() * (x1 - x0), y1, z0 + r() * (z1 - z0))
        else if (u < 0.9) {
          // windows band
          w.push(x1 + 0.01, 0.6 + r() * 0.9, z0 + 0.2 + r() * (z1 - z0 - 0.4), 0.08)
        } else {
          const z = r() < 0.5 ? -2.1 : 2.1
          const a = r() * Math.PI * 2
          w.push(x1 + 0.02, -0.95 + Math.sin(a) * 0.45, z + Math.cos(a) * 0.45, 0.1)
        }
      },
    ],
    [
      0.03,
      // charging mast
      () => capsule(-1.3, G, -2.7, -1.3, 2.4, -2.7, 0.12, 0.15),
    ],
    [
      0.07,
      () => {
        // charging zone, dashed border
        const [x0, x1, z0, z1] = [-1.5, 1.9, -2.1, 2.1]
        const side = Math.floor(r() * 4)
        let t = r()
        if (Math.floor(t * 18) % 2) t = Math.floor(t * 18) / 18
        const x = side < 2 ? x0 + (x1 - x0) * t : side === 2 ? x0 : x1
        const z = side < 2 ? (side === 0 ? z0 : z1) : z0 + (z1 - z0) * t
        w.push(x, G + 0.01, z, 0.75)
      },
    ],
    [0.04, () => w.push(-1.5 + r() * 3.4, G, -2.1 + r() * 4.2, 0.2)],
    [
      0.05,
      () => {
        // sensor and its scan fan
        const s = [2.7, 1.9, -2.4]
        const tx = -1.2 + r() * 3
        const tz = -2 + r() * 4
        const t = Math.pow(r(), 0.6)
        if (r() < 0.25) w.push(s[0] + gauss(r) * 0.06, s[1] + gauss(r) * 0.06, s[2] + gauss(r) * 0.06, 1)
        else w.push(s[0] + (tx - s[0]) * t, s[1] + (G - s[1]) * t, s[2] + (tz - s[2]) * t, 0.18)
      },
    ],
    [
      0.15,
      () => {
        // person inside the zone
        const { x, z } = human
        const u = r()
        if (u < 0.14) {
          const a = r() * Math.PI * 2
          const b = Math.acos(2 * r() - 1)
          w.push(x + 0.13 * Math.sin(b) * Math.cos(a), G + 1.63 + 0.13 * Math.cos(b), z + 0.13 * Math.sin(b) * Math.sin(a), 1)
        } else if (u < 0.5) capsule(x, G + 0.95, z, x, G + 1.45, z, 0.19, 1)
        else if (u < 0.78) {
          const s = r() < 0.5 ? -1 : 1
          capsule(x + s * 0.1, G + 0.93, z, x + s * 0.14, G + 0.02, z + s * 0.06, 0.075, 1)
        } else {
          const s = r() < 0.5 ? -1 : 1
          capsule(x + s * 0.24, G + 1.42, z, x + s * 0.33, G + 0.78, z + 0.08, 0.055, 1)
        }
      },
    ],
    [0.04, () => boxEdges(human.x - 0.42, G, human.z - 0.32, human.x + 0.42, G + 1.85, human.z + 0.32, 1)],
    [
      0.025,
      () => {
        // small object on the ground
        const [cx, cz, s] = [1.25, -1.25, 0.22]
        const f = Math.floor(r() * 3)
        const a = (r() - 0.5) * s
        const b = (r() - 0.5) * s
        if (f === 0) w.push(cx + a, G + s, cz + b, 1)
        else if (f === 1) w.push(cx + s / 2, G + s / 2 + b, cz + a, 1)
        else w.push(cx + a, G + s / 2 + b, cz + s / 2, 1)
      },
    ],
    [0.015, () => boxEdges(1.25 - 0.22, G, -1.25 - 0.22, 1.25 + 0.22, G + 0.36, -1.25 + 0.22, 1)],
    [
      0.12,
      () => {
        // rain: short vertical streaks, kept dim
        const x = (r() * 2 - 1) * 6
        const z = (r() * 2 - 1) * 4
        const y = G + r() * 4.5
        w.push(x, y + r() * 0.12, z, 0)
      },
    ],
  ])
  return out
}

// ---------------------------------------------------------------- interface
function interfaceScreens(N: number) {
  const out = new Float32Array(N * 4)
  const w = new Writer(out)
  const r = mulberry32(53)
  const HW = 1.45
  const HH = 0.92
  const panels = [
    { cx: -3.15, cz: 0.75, ry: 0.42 },
    { cx: 0, cz: 0, ry: 0 },
    { cx: 3.15, cz: 0.75, ry: -0.42 },
  ]
  const put = (p: number, lx: number, ly: number, wt: number) => {
    const { cx, cz, ry } = panels[p]
    const c = Math.cos(ry)
    const s = Math.sin(ry)
    w.push(cx + lx * c, 0.25 + ly, cz - lx * s, wt)
  }
  const rect = (p: number, x0: number, y0: number, x1: number, y1: number, wt: number) => {
    const per = 2 * (x1 - x0 + (y1 - y0))
    let d = r() * per
    if (d < x1 - x0) return put(p, x0 + d, y0, wt)
    d -= x1 - x0
    if (d < y1 - y0) return put(p, x1, y0 + d, wt)
    d -= y1 - y0
    if (d < x1 - x0) return put(p, x1 - d, y1, wt)
    d -= x1 - x0
    put(p, x0, y1 - d, wt)
  }
  const area = (p: number, x0: number, y0: number, x1: number, y1: number, wt: number) =>
    put(p, x0 + r() * (x1 - x0), y0 + r() * (y1 - y0), wt)
  const seg = (p: number, ax: number, ay: number, bx: number, by: number, wt: number) => {
    const t = r()
    put(p, ax + (bx - ax) * t, ay + (by - ay) * t, wt)
  }

  // deterministic chart for the right panel
  const chart: number[] = []
  let v = 0
  const cr = mulberry32(7)
  for (let i = 0; i <= 40; i++) chart.push((v += (cr() - 0.5) * 0.18))

  fill(w, r, [
    [0.12, () => rect(Math.floor(r() * 3), -HW, -HH, HW, HH, 0.12)],
    [0.06, () => area(Math.floor(r() * 3), -HW, HH - 0.16, HW, HH, 0.08)],
    [0.01, () => area(Math.floor(r() * 3), HW - 0.16, HH - 0.11, HW - 0.08, HH - 0.05, 1)],
    [
      0.24,
      () => {
        // left: camera tiles
        const i = Math.floor(r() * 3)
        const j = Math.floor(r() * 2)
        const x0 = -HW + 0.12 + i * 0.94
        const y0 = -HH + 0.12 + j * 0.78
        if (r() < 0.45) rect(0, x0, y0, x0 + 0.84, y0 + 0.66, 0.15)
        else area(0, x0, y0, x0 + 0.84, y0 + 0.66 * r(), 0.02)
      },
    ],
    [
      0.32,
      () => {
        // centre: track diagram with an active route
        const u = r()
        const ys = [0.35, -0.05, -0.45]
        if (u < 0.45) {
          const y = ys[Math.floor(r() * 3)]
          seg(1, -HW + 0.15, y, HW - 0.15, y, 0.1)
        } else if (u < 0.6) {
          const k = Math.floor(r() * 3)
          const x = -0.9 + k * 0.85
          seg(1, x, ys[k % 2], x + 0.4, ys[(k % 2) + 1], 0.1)
        } else if (u < 0.85) {
          // active route
          const t = r()
          if (t < 0.4) seg(1, -HW + 0.15, ys[0], -0.05, ys[0], 1)
          else if (t < 0.6) seg(1, -0.05, ys[0], 0.35, ys[1], 1)
          else seg(1, 0.35, ys[1], HW - 0.15, ys[1], 1)
        } else {
          // trains
          const k = Math.floor(r() * 2)
          area(1, -1.0 + k * 1.5, ys[k * 2] - 0.05, -0.6 + k * 1.5, ys[k * 2] + 0.05, 0.6)
        }
      },
    ],
    [
      0.25,
      () => {
        // right: chart + replay timeline
        const u = r()
        if (u < 0.55) {
          const t = r() * 40
          const i = Math.floor(t)
          const f = t - i
          const y = chart[i] + (chart[i + 1] - chart[i]) * f
          put(2, -HW + 0.15 + (t / 40) * (2 * HW - 0.3), 0.15 + y, 0.25)
        } else if (u < 0.75) seg(2, -HW + 0.15, -0.6, HW - 0.15, -0.6, 0.15)
        else if (u < 0.85) seg(2, -HW + 0.15, -0.6, 0.2, -0.6, 1)
        else if (u < 0.92) area(2, 0.17, -0.7, 0.23, -0.5, 1)
        else {
          const k = Math.floor(r() * 9)
          seg(2, -HW + 0.3 + k * 0.3, -0.66, -HW + 0.3 + k * 0.3, -0.54, 0.4)
        }
      },
    ],
  ])
  return out
}

// ---------------------------------------------------------------- deployment
// Step 05: I install my applications on client sites and maintain them.
// My workstation in the centre, four kinds of site around it, links between.
// Sites match project types that are in production; nothing client-specific.
export const DEPLOY = { radius: 3.2, ground: -1.2 }

function deploy(N: number) {
  const out = new Float32Array(N * 4)
  const w = new Writer(out)
  const r = mulberry32(83)
  const G = DEPLOY.ground

  // site placement on a ring (x, z), facing the centre
  const site = (k: number) => {
    const a = Math.PI / 4 + (k * Math.PI) / 2
    return { x: Math.cos(a) * DEPLOY.radius, z: Math.sin(a) * DEPLOY.radius, a }
  }
  // local (u along tangent, v up, d radial) -> world
  const at = (k: number, u: number, v: number, d: number, wt: number) => {
    const s = site(k)
    const tx = -Math.sin(s.a)
    const tz = Math.cos(s.a)
    const rx = Math.cos(s.a)
    const rz = Math.sin(s.a)
    w.push(s.x + tx * u + rx * d, G + v, s.z + tz * u + rz * d, wt)
  }
  const boxSurf = (k: number, u0: number, u1: number, v0: number, v1: number, d0: number, d1: number, wt: number) => {
    const f = Math.floor(r() * 6)
    const u = u0 + r() * (u1 - u0)
    const v = v0 + r() * (v1 - v0)
    const d = d0 + r() * (d1 - d0)
    if (f === 0) at(k, u, v, d0, wt)
    else if (f === 1) at(k, u, v, d1, wt)
    else if (f === 2) at(k, u, v1, d, wt)
    else if (f === 3) at(k, u0, v, d, wt)
    else if (f === 4) at(k, u1, v, d, wt)
    else at(k, u, v0, d, wt * 0.5)
  }
  const circle = (k: number, cu: number, cv: number, d: number, rad: number, wt: number) => {
    const t = r() * Math.PI * 2
    at(k, cu + Math.cos(t) * rad, cv + Math.sin(t) * rad, d, wt)
  }

  fill(w, r, [
    [
      0.1,
      () => {
        // ground: concentric rings, faint
        const ring = 0.8 + Math.floor(r() * 4) * 1.2
        const t = r() * Math.PI * 2
        w.push(Math.cos(t) * ring, G, Math.sin(t) * ring, 0)
      },
    ],
    [
      0.07,
      () => {
        // my workstation: laptop base and tilted screen
        const u = (r() - 0.5) * 1.0
        if (r() < 0.45) w.push(u, G + 0.55, (r() - 0.5) * 0.65, 0.35)
        else {
          // screen: bright frame, dimmer panel
          const h = r() * 0.62
          const edge = Math.abs(u) > 0.46 || h < 0.03 || h > 0.59
          w.push(u, G + 0.55 + h * 0.94, -0.33 - h * 0.34, edge ? 1 : 0.45)
        }
      },
    ],
    [
      0.04,
      () => {
        // desk under the laptop
        const f = r()
        if (f < 0.6) w.push((r() - 0.5) * 1.6, G + 0.52, (r() - 0.5) * 0.9, 0.1)
        else w.push((r() < 0.5 ? -0.7 : 0.7), G + r() * 0.52, (r() < 0.5 ? -0.38 : 0.38), 0.1)
      },
    ],
    [
      0.12,
      () => {
        // links from the workstation to each site, slight arc
        const k = Math.floor(r() * 4)
        const s = site(k)
        const t = r()
        const lift = Math.sin(t * Math.PI) * 0.7
        if (Math.floor(t * 40) % 2) return
        w.push(s.x * (0.12 + 0.68 * t), G + 0.6 + lift - 0.5 * t, s.z * (0.12 + 0.68 * t), 0.35)
      },
    ],
    [
      0.16,
      () => {
        // site 0: train car on rails, cameras under the body
        const f = r()
        if (f < 0.62) boxSurf(0, -1.1, 1.1, 0.35, 1.25, -0.38, 0.38, 0.05)
        else if (f < 0.75) at(0, -1.0 + r() * 2.0, 0.95 + r() * 0.15, -0.385, 0.25) // window band
        else if (f < 0.85) circle(0, r() < 0.5 ? -0.7 : 0.7, 0.22, r() < 0.5 ? -0.39 : 0.39, 0.16, 0.1)
        else if (f < 0.93) at(0, -1.6 + r() * 3.2, 0.03, r() < 0.5 ? -0.3 : 0.3, 0.15) // rails
        else at(0, -0.4 + Math.floor(r() * 3) * 0.4 + (r() - 0.5) * 0.08, 0.3, (r() - 0.5) * 0.4, 1) // cameras
      },
    ],
    [
      0.16,
      () => {
        // site 1: conveyor through an industrial oven, camera above
        const f = r()
        if (f < 0.5) boxSurf(1, -0.65, 0.65, 0.25, 1.05, -0.45, 0.45, 0.05)
        else if (f < 0.72) at(1, -1.4 + r() * 2.8, 0.3, (r() - 0.5) * 0.6, 0.06) // belt
        else if (f < 0.86) {
          // dough pieces on the belt
          const c = -1.2 + Math.floor(r() * 4) * 0.8
          const t = r() * Math.PI * 2
          const rr = Math.sqrt(r()) * 0.14
          at(1, c + Math.cos(t) * rr, 0.32 + (0.14 - rr) * 0.6, Math.sin(t) * rr, 0.6)
        } else at(1, (r() - 0.5) * 0.12, 1.05 + r() * 0.12, (r() - 0.5) * 0.12, 1) // camera
      },
    ],
    [
      0.15,
      () => {
        // site 2: control desk with three screens
        const f = r()
        if (f < 0.3) boxSurf(2, -1.0, 1.0, 0.0, 0.5, -0.3, 0.3, 0.05)
        else {
          const p = Math.floor(r() * 3) - 1
          const u = p * 0.66 + (r() - 0.5) * 0.6
          const v = 0.6 + r() * 0.42
          const border = r() < 0.4
          const uu = border ? p * 0.66 + (r() < 0.5 ? -0.3 : 0.3) : u
          at(2, uu, v, -0.2 - Math.abs(p) * 0.12, border ? 0.15 : 0.3 * r())
        }
      },
    ],
    [
      0.13,
      () => {
        // site 3: metro tunnel section with a niche in the wall
        const t = r() * Math.PI
        const rad = 0.85
        const u = Math.cos(t) * rad
        const v = Math.sin(t) * rad + 0.25
        const d = (r() - 0.5) * 1.5
        const niche = Math.abs(d) < 0.2 && t < 0.9 && t > 0.4
        at(3, u, v, d, niche ? 1 : 0.04)
      },
    ],
  ])
  return out
}

export function buildShapes(N: number): Float32Array[] {
  return [tunnelScan(N), tunnelMesh(N), detect(N), interfaceScreens(N), deploy(N)]
}

export const TUNNEL_Z = { min: T.Z0, max: T.Z1 }
