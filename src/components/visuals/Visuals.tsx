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

/** LiDAR barrier, top view: rotating beam, charging zone, person, rain noise. */
function Lidar() {
  const r = rng(3)
  const rain = Array.from({ length: 60 }, () => [r() * 320, r() * 200])
  const person = Array.from({ length: 26 }, () => {
    const a = r() * Math.PI * 2
    const d = Math.sqrt(r()) * 9
    return [178 + Math.cos(a) * d, 104 + Math.sin(a) * d * 0.7]
  })
  return (
    <Frame label="Top view of a LiDAR scanning a charging zone and detecting a person">
      <rect x="26" y="40" width="86" height="120" rx="6" fill="none" stroke={M} strokeWidth="1" />
      <text x="34" y="54" fill={M} fontSize="8" fontFamily="monospace">BUS</text>
      <rect x="120" y="52" width="122" height="96" fill={S} fillOpacity=".05" stroke={S} strokeDasharray="4 4" strokeWidth="1" />
      <text x="126" y="64" fill={S} fontSize="7" fontFamily="monospace" opacity=".8">HV ZONE</text>
      {rain.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r=".9" fill={M} style={anim('pulse-o', 1.2 + (i % 5) * 0.3, (i % 7) * 0.2)} />
      ))}
      <g style={{ transformOrigin: '284px 30px', ...anim('spin', 4, 0, 'linear') }}>
        <path d="M284 30 L120 130 A190 190 0 0 1 170 170 Z" fill="url(#glow)" opacity=".5" />
      </g>
      <circle cx="284" cy="30" r="5" fill={S} />
      {person.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.4" fill={S} />
      ))}
      <rect x="164" y="91" width="28" height="26" fill="none" stroke={S} strokeWidth="1" style={anim('pulse-o', 1.4)} />
      <text x="164" y="128" fill={S} fontSize="7" fontFamily="monospace">PERSON · STOP</text>
    </Frame>
  )
}

/** ToF depth: a heightmap of bars rising like dough. */
function Tof() {
  const cols = 22
  const rows = 9
  const cells = []
  for (let j = 0; j < rows; j++)
    for (let i = 0; i < cols; i++) {
      const cx = i - cols / 2
      const cy = (j - rows / 2) * 2
      const h = Math.exp(-(cx * cx + cy * cy) / 40)
      cells.push({ i, j, h })
    }
  return (
    <Frame label="Depth map of dough rising, coloured by height">
      <g transform="translate(36 40) skewX(-28)">
        {cells.map(({ i, j, h }) => (
          <rect
            key={`${i}-${j}`}
            x={i * 11 + j * 3}
            y={j * 11}
            width="8"
            height="8"
            fill={h > 0.55 ? S : P}
            fillOpacity={0.12 + h * 0.75}
            style={{ transformBox: 'fill-box', transformOrigin: 'center', ...anim('pulse-o', 3.2, h * 1.2) }}
          />
        ))}
      </g>
      <g fontFamily="monospace" fontSize="8">
        <text x="20" y="182" fill={M}>VOLUME</text>
        <text x="64" y="182" fill={P}>↑</text>
        <text x="120" y="182" fill={M}>HEIGHT</text>
        <text x="160" y="182" fill={P}>↑</text>
        <text x="236" y="182" fill={S}>ToF · 3D</text>
      </g>
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

/** Tunnel cross-section with a ring of cameras firing in sequence. */
function Tunnel() {
  const cams = Array.from({ length: 24 }, (_, i) => {
    const a = Math.PI * (0.05 + (0.9 * i) / 23)
    return [160 - Math.cos(a) * 62, 132 - Math.sin(a) * 62, a]
  })
  return (
    <Frame label="Tunnel cross-section with a ring of 24 cameras firing in sequence">
      <path d="M58 170 L58 132 A102 102 0 0 1 262 132 L262 170" fill="none" stroke={M} strokeWidth="1.2" />
      <rect x="112" y="118" width="96" height="44" rx="4" fill="none" stroke={P} strokeOpacity=".5" />
      <text x="138" y="145" fill={P} fontSize="8" fontFamily="monospace" opacity=".7">TRUCK</text>
      {cams.map(([x, y, a], i) => (
        <g key={i}>
          <line
            x1={x}
            y1={y}
            x2={160 - Math.cos(a as number) * 98}
            y2={132 - Math.sin(a as number) * 98}
            stroke={S}
            strokeWidth="1"
            style={anim('pulse-o', 2.4, (i / 24) * 2.4)}
          />
          <circle cx={x} cy={y} r="2.2" fill={S} />
        </g>
      ))}
      <text x="20" y="190" fill={M} fontSize="8" fontFamily="monospace">24 CAMERAS · 100+ LIGHTS · SYNC</text>
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

/** Rails seen from above, three line-scan cameras per rail. */
function Track() {
  const lines = [70, 80, 90, 120, 130, 140]
  return (
    <Frame label="Two rails seen from above, scanned by three line-scan cameras each">
      {Array.from({ length: 16 }, (_, i) => (
        <rect key={i} x={12 + i * 20} y="52" width="8" height="106" fill={M} opacity=".25" />
      ))}
      <rect x="0" y="76" width="320" height="8" fill={P} opacity=".85" />
      <rect x="0" y="126" width="320" height="8" fill={P} opacity=".85" />
      {lines.map((y, i) => (
        <g key={i}>
          <line x1="60" y1={y - 4} x2="60" y2={y + 4} stroke={S} strokeWidth="2" />
          <rect x="64" y={y - 0.6} width="250" height="1.2" fill={S} opacity=".55" style={anim('pulse-o', 1.6, i * 0.12)} />
        </g>
      ))}
      <rect x="40" y="56" width="40" height="98" fill="none" stroke={S} strokeDasharray="3 3" />
      <path d="M40 30 L20 14 M40 30 L60 14" stroke={P} strokeOpacity=".6" />
      <circle cx="40" cy="30" r="3" fill={P} />
      <g fontFamily="monospace" fontSize="8" fill={M}>
        <text x="72" y="30">6 LINE-SCAN · 1 AREA-SCAN · 3 CONFIGS</text>
        <text x="40" y="186">INNER · CENTRE · OUTER</text>
      </g>
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
  }
}
