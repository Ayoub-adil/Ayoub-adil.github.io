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
// A bus parked over a ground charging pad. Two LiDARs draw an immaterial barrier:
// the front one scans a full line ahead of the bus, the right-side one scans
// along its edge. A person with a cane crosses the side line and is detected;
// rain and snow are not drawn: the scene stays clean.
// Frame: bus faces +x, its right side is +z, ground at y = G.
function detect(N: number) {
  const out = new Float32Array(N * 4)
  const w = new Writer(out)
  const r = mulberry32(37)
  const G = -1.3
  const BUS = { x0: -4.6, x1: 1.2, z0: -0.85, z1: 0.85, y0: G + 0.32, y1: G + 2.15 }
  const FRONT_LINE = 2.5 // x of the barrier line ahead of the bus
  const SIDE_LINE = 2.0 // z of the barrier line along the right side
  const lidarFront: [number, number, number] = [BUS.x1 + 0.05, G + 0.55, 0]
  const lidarSide: [number, number, number] = [-1.7, G + 2.0, BUS.z1 + 0.05]
  const person = { x: -0.6, z: 2.45 }

  const lerp3 = (a: number[], b: number[], t: number, wt: number) =>
    w.push(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t, wt)
  const capsule = (ax: number, ay: number, az: number, bx: number, by: number, bz: number, rad: number, wt: number) => {
    const t = r()
    const a = r() * Math.PI * 2
    w.push(ax + (bx - ax) * t + Math.cos(a) * rad, ay + (by - ay) * t, az + (bz - az) * t + Math.sin(a) * rad, wt)
  }
  const boxEdges = (x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, wt: number) => {
    const e = Math.floor(r() * 12)
    const t = r()
    const ys = [y0, y1]
    const zs = [z0, z1]
    const xs = [x0, x1]
    const axis = Math.floor(e / 4)
    const a = (e >> 1) & 1
    const b = e & 1
    if (axis === 0) w.push(x0 + (x1 - x0) * t, ys[a], zs[b], wt)
    else if (axis === 1) w.push(xs[a], y0 + (y1 - y0) * t, zs[b], wt)
    else w.push(xs[a], ys[b], z0 + (z1 - z0) * t, wt)
  }
  const dashed = (t: number) => Math.floor(t * 30) % 2 === 0

  fill(w, r, [
    [
      0.07,
      () => {
        // ground grid, limited to the area around the bus
        const along = r() < 0.5
        const k = Math.round((r() * 2 - 1) * 6) * 0.5
        const t = (r() * 2 - 1) * 4.2
        w.push(along ? t - 1.2 : k - 1.2, G, along ? k * 0.75 + 0.5 : t * 0.75 + 0.5, 0)
      },
    ],
    [
      0.26,
      () => {
        // bus body: sides, roof, rounded front, windows, door, wheels
        const { x0, x1, z0, z1, y0, y1 } = BUS
        const u = r()
        if (u < 0.3) w.push(x0 + r() * (x1 - x0), y0 + r() * (y1 - y0), r() < 0.5 ? z0 : z1, 0.03)
        else if (u < 0.45) w.push(x0 + r() * (x1 - x0), y1, z0 + r() * (z1 - z0), 0.02)
        else if (u < 0.55) {
          // front face, slightly rounded
          const z = z0 + r() * (z1 - z0)
          const bulge = 0.12 * (1 - ((z / z1) ** 2))
          w.push(x1 + bulge, y0 + r() * (y1 - y0), z, 0.04)
        } else if (u < 0.6) w.push(x0, y0 + r() * (y1 - y0), z0 + r() * (z1 - z0), 0.02)
        else if (u < 0.75) {
          // window band on both sides and the windscreen
          const side = r()
          const y = G + 1.25 + r() * 0.7
          if (side < 0.4) w.push(x0 + 0.3 + r() * (x1 - x0 - 0.6), y, z1 + 0.01, 0.12)
          else if (side < 0.8) w.push(x0 + 0.3 + r() * (x1 - x0 - 0.6), y, z0 - 0.01, 0.12)
          else w.push(x1 + 0.13, G + 1.05 + r() * 0.95, z0 + 0.1 + r() * (z1 - z0 - 0.2), 0.12)
        } else if (u < 0.82) {
          // front door on the right side
          const dx = 0.15 + r() * 0.75
          w.push(x1 - dx, y0 + 0.05 + r() * 1.55, z1 + 0.012, Math.abs(dx - 0.52) < 0.02 ? 0.4 : 0.08)
        } else {
          // wheels
          const wx = r() < 0.5 ? x1 - 1.1 : x0 + 1.2
          const wz = r() < 0.5 ? z1 + 0.01 : z0 - 0.01
          const a = r() * Math.PI * 2
          const rr = 0.36 * (0.75 + 0.25 * r())
          w.push(wx + Math.cos(a) * rr, G + 0.36 + Math.sin(a) * rr, wz, 0.1)
        }
      },
    ],
    [
      0.03,
      () => {
        // charging pad on the ground, under the bus
        const x = -2.9 + r() * 1.6
        const z = -0.55 + r() * 1.1
        const edge = Math.abs(x + 2.1) > 0.76 || Math.abs(z) > 0.51
        w.push(x, G + 0.01, z, edge ? 0.45 : 0.08)
      },
    ],
    [
      0.1,
      () => {
        // front LiDAR fan, down to a full line ahead of the bus
        const t = r()
        const z = (r() * 2 - 1) * 1.7
        if (r() < 0.12) w.push(lidarFront[0] + gauss(r) * 0.04, lidarFront[1] + gauss(r) * 0.04, lidarFront[2] + gauss(r) * 0.04, 1)
        else lerp3(lidarFront, [FRONT_LINE, G, z], Math.pow(t, 0.7), 0.16)
      },
    ],
    [
      0.13,
      () => {
        // right-side LiDAR fan, down to a line along the bus edge
        const t = r()
        const x = BUS.x0 - 0.4 + r() * (BUS.x1 - BUS.x0 + 1.6)
        if (r() < 0.12) w.push(lidarSide[0] + gauss(r) * 0.04, lidarSide[1] + gauss(r) * 0.04, lidarSide[2] + gauss(r) * 0.04, 1)
        else lerp3(lidarSide, [x, G, SIDE_LINE], Math.pow(t, 0.7), 0.24)
      },
    ],
    [
      0.07,
      () => {
        // the two barrier lines on the ground, dashed
        const t = r()
        if (!dashed(t)) return
        if (r() < 0.45) w.push(FRONT_LINE, G + 0.01, -1.7 + t * 3.4, 0.75)
        else w.push(BUS.x0 - 0.4 + t * (BUS.x1 - BUS.x0 + 1.6), G + 0.01, SIDE_LINE, 0.75)
      },
    ],
    [
      0.13,
      () => {
        // person walking towards the side of the bus
        const { x, z } = person
        const u = r()
        if (u < 0.13) {
          const a = r() * Math.PI * 2
          const b = Math.acos(2 * r() - 1)
          w.push(x + 0.13 * Math.sin(b) * Math.cos(a), G + 1.63 + 0.13 * Math.cos(b), z + 0.13 * Math.sin(b) * Math.sin(a), 1)
        } else if (u < 0.48) capsule(x, G + 0.95, z, x, G + 1.45, z - 0.04, 0.18, 1)
        else if (u < 0.76) {
          const s = r() < 0.5 ? -1 : 1
          capsule(x + s * 0.1, G + 0.93, z, x + s * 0.16, G + 0.02, z + (s > 0 ? -0.18 : 0.12), 0.07, 1)
        } else {
          const s = r() < 0.5 ? -1 : 1
          // right arm reaches forward to hold the cane
          if (s > 0) capsule(x + 0.24, G + 1.42, z, x + 0.28, G + 0.92, z - 0.25, 0.05, 1)
          else capsule(x - 0.24, G + 1.42, z, x - 0.3, G + 0.8, z + 0.05, 0.05, 1)
        }
      },
    ],
    [
      0.02,
      () => {
        // the cane: its tip is already over the barrier line
        const t = r()
        w.push(person.x + 0.28 + (0.1 * t), G + 0.92 - 0.92 * t, person.z - 0.25 - (person.z - 0.25 - (SIDE_LINE - 0.12)) * t, 1)
      },
    ],
    [0.035, () => boxEdges(person.x - 0.45, G, SIDE_LINE - 0.18, person.x + 0.5, G + 1.85, person.z + 0.3, 1)],
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
