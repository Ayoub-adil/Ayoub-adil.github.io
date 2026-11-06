// Synthetic, schematic animations for the project cards. No client data.
import type { CSSProperties, ReactNode } from 'react'
import type { Visual } from '../../content/content'

const S = '#FAB529'
const P = '#ECE8E1'
const M = '#5b6470'

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" role="img" aria-label={label}>
      <defs>
        <pattern id="grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" fill="none" stroke="#1a212b" strokeWidth="0.6" />
        </pattern>
        <radialGradient id="glow">
          <stop offset="0" stopColor={S} stopOpacity=".55" />
          <stop offset="1" stopColor={S} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="200" fill="url(#grid)" />
      {children}
    </svg>
  )
}

const anim = (name: string, dur: number, delay = 0, extra = ''): CSSProperties => ({
  animation: `${name} ${dur}s ${extra || 'ease-in-out'} ${delay}s infinite`,
})

function rng(seed: number) {
  let s = seed
  return () => ((s = (s * 16807) % 2147483647) / 2147483647)
}

/** LiDAR barrier, top view: bus over its charging pad, a front and a right-side
 *  LiDAR each drawing a barrier line; a person's cane crosses the side line. */
function Lidar() {
  const r = rng(3)
  const noise = Array.from({ length: 70 }, () => [r() * 320, r() * 200])
  const person = Array.from({ length: 22 }, () => {
    const a = r() * Math.PI * 2
    const d = Math.sqrt(r()) * 7
    return [168 + Math.cos(a) * d, 176 + Math.sin(a) * d * 0.8]
  })
  return (
    <Frame label="Top view: two LiDARs draw a barrier in front of and beside a charging bus; a person's cane crosses the side line and is detected">
      {noise.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r=".9" fill={M} style={anim('pulse-o', 1.2 + (i % 5) * 0.3, (i % 7) * 0.2)} />
      ))}

      {/* bus, front to the right */}
      <rect x="40" y="62" width="168" height="56" rx="7" fill="#0a0d12" stroke={P} strokeOpacity=".7" />
      <path d="M200 62 Q214 90 200 118" fill="none" stroke={P} strokeOpacity=".7" />
      <rect x="96" y="74" width="56" height="32" fill={S} fillOpacity=".06" stroke={S} strokeOpacity=".55" strokeDasharray="3 3" />
      <text x="100" y="94" fill={S} fontSize="6.5" fontFamily="monospace" opacity=".85">CHARGING PAD</text>
      <text x="46" y="74" fill={M} fontSize="7" fontFamily="monospace">BUS</text>

      {/* front LiDAR and its line */}
      <path d="M210 90 L262 38 L262 142 Z" fill="url(#glow)" opacity=".35" style={anim('pulse-o', 2.4)} />
      <line x1="262" y1="34" x2="262" y2="146" stroke={S} strokeDasharray="5 4" strokeWidth="1.4" />
      <circle cx="210" cy="90" r="3.6" fill={S} />
      <text x="232" y="28" fill={S} fontSize="6.5" fontFamily="monospace">FRONT LIDAR</text>

      {/* right-side LiDAR and its line along the edge */}
      <path d="M124 119 L20 152 L246 152 Z" fill="url(#glow)" opacity=".35" style={anim('pulse-o', 2.4, 1.2)} />
      <line x1="16" y1="152" x2="250" y2="152" stroke={S} strokeDasharray="5 4" strokeWidth="1.4" />
      <circle cx="124" cy="119" r="3.6" fill={S} />
      <text x="20" y="145" fill={S} fontSize="6.5" fontFamily="monospace">SIDE LIDAR</text>

      {/* person with a cane, the cane tip past the line */}
      {person.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.3" fill={S} />
      ))}
      <line x1="163" y1="170" x2="150" y2="147" stroke={S} strokeWidth="1.6" />
      <rect x="142" y="142" width="36" height="46" fill="none" stroke={S} strokeWidth="1" style={anim('pulse-o', 1.2)} />
      <text x="184" y="182" fill={S} fontSize="6.5" fontFamily="monospace">CANE · ALERT</text>
      <text x="230" y="192" fill={M} fontSize="6.5" fontFamily="monospace">RAIN · SNOW: IGNORED</text>
    </Frame>
  )
}

/** Visual SLAM: camera trajectory with keyframes and landmarks. */
function Slam() {
  const r = rng(9)
  const traj = Array.from({ length: 9 }, (_, i) => [30 + i * 33, 140 - Math.sin(i * 0.6) * 26])
  const pts = Array.from({ length: 110 }, () => {
    const t = r() * 8
    const i = Math.floor(t)
    const [x, y] = traj[i]
    return [x + (r() - 0.5) * 40, y - 30 - r() * 70]
  })
  const d = traj.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ')
  return (
    <Frame label="Visual SLAM trajectory with keyframes and reconstructed points">
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.1" fill={P} opacity=".7" style={anim('pulse-o', 4, (x / 320) * 3)} />
      ))}
      <path d={d} fill="none" stroke={S} strokeWidth="1.4" strokeDasharray="400" strokeDashoffset="400" style={anim('dash', 5, 0, 'linear')} />
      {traj.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`} style={anim('pulse-o', 5, i * 0.5)}>
          <path d="M0 0 L-7 -6 L7 -6 Z" fill="none" stroke={S} strokeWidth="1" />
        </g>
      ))}
      <text x="20" y="186" fill={M} fontSize="8" fontFamily="monospace">ORB-SLAM · PLVS · KEYFRAMES</text>
    </Frame>
  )
}

/** Track layout with switches and an active route. */
function SignalBox() {
  return (
    <Frame label="Track layout with switches and an active route being set">
      <g stroke={M} strokeWidth="1.4" fill="none">
        <path d="M20 70 H300" />
        <path d="M20 110 H300" />
        <path d="M20 150 H300" />
        <path d="M100 70 L140 110" />
        <path d="M190 110 L230 150" />
        <path d="M230 70 L270 110" />
      </g>
      <path
        d="M20 70 H100 L140 110 H190 L230 150 H300"
        fill="none"
        stroke={S}
        strokeWidth="2.4"
        strokeDasharray="420"
        strokeDashoffset="420"
        style={anim('dash', 3.6, 0, 'cubic-bezier(.6,0,.2,1)')}
      />
      {[
        [100, 70],
        [140, 110],
        [190, 110],
        [230, 150],
      ].map(([x, y], i) => (
        <rect key={i} x={x - 4} y={y - 4} width="8" height="8" fill="#0a0d12" stroke={S} style={anim('pulse-o', 3.6, i * 0.5)} />
      ))}
      <rect x="36" y="104" width="34" height="12" rx="2" fill={P} opacity=".8" />
      <g fontFamily="monospace" fontSize="8" fill={M}>
        <text x="20" y="40">ROUTE</text>
        <text x="58" y="40" fill={S}>SET</text>
        <text x="236" y="40">REPLAY ◂◂</text>
      </g>
    </Frame>
  )
}

/** ToF in an oven: tall oven, camera at the top filming the dough; depth image
 *  and height / volume curves over the bake. */
function Tof() {
  const cells = []
  for (let j = 0; j < 6; j++)
    for (let i = 0; i < 8; i++) {
      const cx = i - 3.5
      const cy = j - 2.5
      cells.push({ i, j, h: Math.exp(-(cx * cx + cy * cy * 1.6) / 7) })
    }
  return (
    <Frame label="A ToF camera at the top of a tall oven films the dough; depth image and height and volume curves over time">
      {/* oven, taller than wide */}
      <rect x="34" y="18" width="92" height="166" rx="4" fill="#0a0d12" stroke={P} strokeOpacity=".6" />
      <line x1="34" y1="150" x2="126" y2="150" stroke={M} />
      <text x="40" y="178" fill={M} fontSize="6.5" fontFamily="monospace">OVEN</text>
      {/* camera and its field of view */}
      <rect x="72" y="20" width="16" height="9" rx="1.5" fill={S} />
      <path d="M80 29 L42 148 L118 148 Z" fill="url(#glow)" opacity=".35" />
      {[52, 66, 80, 94, 108].map((x, k) => (
        <line key={x} x1="80" y1="30" x2={x} y2={136 - Math.abs(k - 2) * 4} stroke={S} strokeOpacity=".45" strokeDasharray="2 3" />
      ))}
      {/* dough rising */}
      <g style={{ transformBox: 'fill-box', transformOrigin: 'bottom', ...anim('rise', 5) }}>
        <path d="M50 150 Q58 126 80 124 Q102 126 110 150 Z" fill={P} fillOpacity=".85" />
      </g>
      <text x="92" y="27" fill={S} fontSize="6.5" fontFamily="monospace">ToF</text>

      {/* depth image */}
      <text x="150" y="26" fill={M} fontSize="6.5" fontFamily="monospace">DEPTH IMAGE · POINT CLOUD</text>
      {cells.map(({ i, j, h }) => (
        <rect key={`${i}-${j}`} x={150 + i * 11} y={32 + j * 9} width="10" height="8" fill={h > 0.5 ? S : P} fillOpacity={0.1 + h * 0.8} />
      ))}

      {/* height and volume over time */}
      <line x1="150" y1="178" x2="300" y2="178" stroke={M} />
      <line x1="150" y1="104" x2="150" y2="178" stroke={M} />
      <path d="M150 170 C190 168 210 130 300 118" fill="none" stroke={S} strokeWidth="1.6" strokeDasharray="200" strokeDashoffset="200" style={anim('dash', 5, 0, 'linear')} />
      <path d="M150 174 C195 172 220 150 300 140" fill="none" stroke={P} strokeOpacity=".7" strokeWidth="1.2" strokeDasharray="200" strokeDashoffset="200" style={anim('dash', 5, 0, 'linear')} />
      <text x="262" y="112" fill={S} fontSize="6.5" fontFamily="monospace">HEIGHT</text>
      <text x="262" y="136" fill={P} fontSize="6.5" fontFamily="monospace" opacity=".8">VOLUME</text>
      <text x="270" y="190" fill={M} fontSize="6.5" fontFamily="monospace">TIME →</text>
    </Frame>
  )
}

/** Tunnel inspection truck seen from behind: 22 rear cameras each aimed at a
 *  zone of equipment on the walls or roof, 2 side cameras on a positioning sign,
 *  lights flashing on the same trigger. */
function Tunnel() {
  const zones = Array.from({ length: 22 }, (_, i) => {
    const a = Math.PI * (0.04 + (0.92 * i) / 21)
    return { a, x: 160 - Math.cos(a) * 112, y: 150 - Math.sin(a) * 112 }
  })
  const cams = zones.map((_, i) => {
    const t = i / 21
    // along the top and the upper sides of the truck's rear face
    if (t < 0.2) return { x: 124, y: 140 - t * 160 }
    if (t > 0.8) return { x: 196, y: 140 - (1 - t) * 160 }
    return { x: 124 + ((t - 0.2) / 0.6) * 72, y: 108 }
  })
  return (
    <Frame label="Inspection truck seen from behind in a tunnel: 22 rear cameras aimed at equipment on the walls and roof, 2 side cameras on a positioning sign, lights on a shared trigger">
      <path d="M40 186 L40 150 A120 120 0 0 1 280 150 L280 186" fill="none" stroke={M} strokeWidth="1.2" />
      {/* equipment on walls and roof */}
      {zones.map((z, i) => (
        <rect
          key={i}
          x={z.x - 5}
          y={z.y - 4}
          width="10"
          height="8"
          rx="1"
          fill="#0a0d12"
          stroke={S}
          strokeOpacity=".9"
          style={anim('pulse-o', 2.2, (i / 22) * 2.2)}
        />
      ))}
      {zones.map((z, i) => (
        <line key={i} x1={cams[i].x} y1={cams[i].y} x2={z.x} y2={z.y} stroke={S} strokeOpacity=".5" strokeWidth=".8" style={anim('pulse-o', 2.2, (i / 22) * 2.2)} />
      ))}
      {/* truck rear */}
      <rect x="122" y="106" width="76" height="70" rx="3" fill="#0a0d12" stroke={P} strokeOpacity=".75" />
      {cams.map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r="1.8" fill={S} />
      ))}
      {/* lights flashing together on the trigger */}
      {[130, 142, 154, 166, 178, 190].map((x) => (
        <rect key={x} x={x - 3} y="168" width="6" height="2.5" fill={P} style={anim('pulse-o', 1.1)} />
      ))}
      {/* side cameras on a positioning sign */}
      <rect x="44" y="152" width="22" height="13" fill="#0a0d12" stroke={P} />
      <text x="48" y="161" fill={P} fontSize="6" fontFamily="monospace">KP</text>
      <line x1="122" y1="150" x2="66" y2="157" stroke={P} strokeOpacity=".6" strokeDasharray="2 2" />
      <line x1="122" y1="160" x2="66" y2="160" stroke={P} strokeOpacity=".6" strokeDasharray="2 2" />
      <text x="138" y="146" fill={P} fontSize="7" fontFamily="monospace" opacity=".7">TRUCK</text>
      <text x="200" y="196" fill={M} fontSize="6.5" fontFamily="monospace">22 + 2 CAMERAS · 100+ LIGHTS</text>
    </Frame>
  )
}

/** Track inspection, front cross-section: 3 line-scan cameras per rail at the same
 *  level (top, inner, outer), one line per millimetre; images replayed per rail. */
function Track() {
  const rails = [70, 190]
  const cams = (rx: number) => [
    { x: rx, y: 52, label: 'TOP' },
    { x: rx + (rx < 130 ? 34 : -34), y: 52, label: 'IN' },
    { x: rx + (rx < 130 ? -34 : 34), y: 52, label: 'OUT' },
  ]
  return (
    <Frame label="Front cross-section of a wagon: three line-scan cameras per rail at the same level for the top, inner and outer views, plus a front camera; one image line per millimetre">
      {/* wagon floor and front camera */}
      <rect x="20" y="36" width="230" height="8" fill="#0a0d12" stroke={P} strokeOpacity=".6" />
      <text x="24" y="31" fill={M} fontSize="6.5" fontFamily="monospace">WAGON</text>
      <rect x="226" y="20" width="14" height="10" rx="1.5" fill="none" stroke={P} />
      <text x="190" y="18" fill={P} fontSize="6" fontFamily="monospace" opacity=".8">FRONT CAM · ENV</text>
      {/* sleeper and rails */}
      <rect x="24" y="150" width="222" height="8" fill={M} opacity=".35" />
      {rails.map((rx) => (
        <path key={rx} d={`M${rx - 8} 128 h16 v4 h-5 v12 h9 v6 h-24 v-6 h9 v-12 h-5 Z`} fill={P} fillOpacity=".85" />
      ))}
      {rails.map((rx) =>
        cams(rx).map((c) => (
          <g key={`${rx}-${c.label}`}>
            <rect x={c.x - 4} y={c.y - 4} width="8" height="8" fill={S} />
            <line
              x1={c.x}
              y1={c.y + 4}
              x2={c.label === 'TOP' ? rx : rx + (c.x < rx ? -8 : 8)}
              y2={c.label === 'TOP' ? 128 : 136}
              stroke={S}
              strokeOpacity=".7"
              style={anim('pulse-o', 0.6)}
            />
            <text x={c.x - 7} y={c.y - 7} fill={S} fontSize="5.5" fontFamily="monospace">
              {c.label}
            </text>
          </g>
        )),
      )}
      {/* encoder pulse and line-by-line images */}
      <text x="258" y="44" fill={M} fontSize="6" fontFamily="monospace">1 LINE / MM</text>
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <g key={k}>
          <rect x="262" y={56 + k * 21} width="44" height="16" fill={k % 3 === 0 ? P : M} fillOpacity={k % 3 === 0 ? 0.25 : 0.2} stroke={P} strokeOpacity=".3" />
          <rect x="262" y={56 + k * 21} width="3" height="16" fill={S} style={{ ...anim('scan-x', 2.4, k * 0.1, 'linear') }} />
        </g>
      ))}
      <text x="24" y="186" fill={M} fontSize="6.5" fontFamily="monospace">6 LINE-SCAN · SAME LEVEL · REPLAY PER RAIL</text>
    </Frame>
  )
}

/** Metro tunnel, side view: niches at ground level in the wall, refuges for
 *  technicians when a train passes; each niche detected along the run. */
function Niche() {
  const niches = [46, 158, 270]
  return (
    <Frame label="Side view of a metro tunnel wall with ground-level niches where technicians shelter from trains; each niche is detected">
      {/* wall and floor */}
      <line x1="10" y1="40" x2="310" y2="40" stroke={M} />
      <line x1="10" y1="162" x2="310" y2="162" stroke={P} strokeOpacity=".6" />
      <text x="14" y="34" fill={M} fontSize="6.5" fontFamily="monospace">TUNNEL WALL</text>
      {niches.map((x, i) => (
        <g key={x}>
          {/* recess at ground level, about two people wide */}
          <rect x={x - 22} y="112" width="44" height="50" fill="#06080b" stroke={P} strokeOpacity=".7" />
          <rect x={x - 27} y="107" width="54" height="58" fill="none" stroke={S} strokeWidth="1.2" style={anim('pulse-o', 3, i)} />
          <text x={x - 24} y="102" fill={S} fontSize="6" fontFamily="monospace" style={anim('pulse-o', 3, i)}>
            NICHE
          </text>
        </g>
      ))}
      {/* technician sheltering in the middle niche */}
      <circle cx="152" cy="126" r="4" fill={P} />
      <rect x="148.5" y="131" width="7" height="16" rx="2" fill={P} />
      <rect x="149" y="146" width="2.5" height="14" fill={P} />
      <rect x="152.5" y="146" width="2.5" height="14" fill={P} />
      <text x="14" y="186" fill={M} fontSize="6.5" fontFamily="monospace">REFUGE NICHES · GROUND LEVEL · DETECTED ALONG THE RUN</text>
    </Frame>
  )
}

export function ProjectVisual({ kind }: { kind: Visual }) {
  switch (kind) {
    case 'lidar':
      return <Lidar />
    case 'tof':
      return <Tof />
    case 'slam':
      return <Slam />
    case 'tunnel':
      return <Tunnel />
    case 'signalbox':
      return <SignalBox />
    case 'track':
      return <Track />
    case 'niche':
      return <Niche />
  }
}
