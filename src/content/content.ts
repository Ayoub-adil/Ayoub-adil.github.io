// Single source of truth for the site and the CV.
// Rule (see CLAUDE.md): never invent a number, date, tool or result.
// Anything unknown is a TODO string, rendered visibly by <Todo />.

export const TODO = (what: string) => `TODO: ${what}` as const
export const isTodo = (s: string | undefined | null) => !!s && s.startsWith('TODO')

export const profile = {
  name: 'Ayoub ADIL',
  role: 'Software Engineer',
  focus: '3D & Computer Vision',
  company: 'R&D Vision',
  companyNote: 'industrial machine vision',
  location: 'Paris area, France',
  email: TODO('personal email address'),
  linkedin: 'https://www.linkedin.com/in/ayoub-adil/',
  github: 'https://github.com/Ayoub-adil',
  languages: [
    { name: 'French', level: TODO('level') },
    { name: 'English', level: TODO('level') },
    { name: 'German', level: TODO('level') },
  ],
}

export const hero = {
  eyebrow: 'Software Engineer · 3D & Computer Vision',
  title: ['From raw sensors', 'to shipped software.'],
  // index of the words rendered in italic serif, per line
  accent: 'shipped software.',
  lede:
    'I build 3D and computer-vision software for industrial systems: LiDAR and depth cameras, point clouds, and the operator interfaces that run in production.',
}

export type StepId = 'capture' | 'reconstruct' | 'detect' | 'interface' | 'ship'

export const steps: { id: StepId; verb: string; object: string; body: string; ref: string }[] = [
  {
    id: 'capture',
    verb: 'Capture',
    object: 'the scene.',
    body: 'LiDAR, time-of-flight, line-scan, area-scan and thermal cameras. I integrate the sensor, calibrate it and get clean data out of it.',
    ref: 'LiDAR safety barrier · Track inspection',
  },
  {
    id: 'reconstruct',
    verb: 'Reconstruct',
    object: 'the geometry.',
    body: 'Point clouds, stereo calibration, visual SLAM. My master’s internship applied ORB-SLAM and PLVS to real rail and metro tunnel data.',
    ref: '3D tunnel reconstruction',
  },
  {
    id: 'detect',
    verb: 'Detect',
    object: 'what matters.',
    body: 'A person or a small object entering a high-voltage charging zone, told apart from noise such as rain, before the power is cut.',
    ref: 'LiDAR safety barrier',
  },
  {
    id: 'interface',
    verb: 'Build',
    object: 'the interface.',
    body: 'Multi-screen operator applications, replay modes, 3D viewers and depth-image displays. The part people actually use.',
    ref: 'Signal-box assistant · Dough monitoring',
  },
  {
    id: 'ship',
    verb: 'Ship',
    object: 'to production.',
    body: 'Installed on trains, running in an industrial oven, used in signal boxes. Then supported and maintained.',
    ref: 'Track inspection · Dough monitoring · Signal-box assistant',
  },
]

export type Status = 'In production' | 'Delivered' | 'In progress' | 'Proof of concept'
export type Visual = 'lidar' | 'tof' | 'slam' | 'tunnel' | 'signalbox' | 'track'

export interface Project {
  id: string
  title: string
  client: string
  status: Status
  year: string
  role?: string
  summary: string
  did: string[]
  stack: string[]
  visual?: Visual
  tag: '3D' | 'Systems'
}

export const projects: Project[] = [
  {
    id: 'lidar-barrier',
    tag: '3D',
    title: 'LiDAR safety barrier for e-bus high-voltage charging',
    client: 'Transport-sector manufacturer',
    status: 'Proof of concept',
    year: '2026',
    role: 'Sole developer',
    summary:
      'Reads a LiDAR stream, builds a point cloud and detects people and objects entering the high-voltage charging zone of a bus. Small objects are detected without being confused with noise such as rain. The system alerts the driver, then cuts the power.',
    did: ['Operator interface', 'Point-cloud processing', 'LiDAR integration', 'Calibration'],
    stack: ['Python', 'C++', 'C#', 'WPF / .NET'],
    visual: 'lidar',
  },
  {
    id: 'dough-tof',
    tag: '3D',
    title: '3D dough monitoring in an industrial oven',
    client: 'Food-industry group',
    status: 'In production',
    year: '2024',
    role: 'Pair',
    summary: 'A time-of-flight camera inside an oven analyses the dough in 3D to track its volume and height.',
    did: ['Operator interface', 'ToF camera integration', '3D viewer', 'Depth-image display'],
    stack: ['C++'],
    visual: 'tof',
  },
  {
    id: 'slam-tunnels',
    tag: '3D',
    title: '3D reconstruction of rail and metro tunnels from images',
    client: 'R&D Vision · master’s internship',
    status: 'Proof of concept',
    year: '03/2024 – 08/2024',
    role: 'Solo',
    summary:
      'Visual SLAM (ORB-SLAM, PLVS) applied to the company’s real rail data: tunnels, trains, metro. Point clouds, stereo calibration, reconstruction and visualisation.',
    did: ['Literature review', 'Implementation', 'Processing and analysis of results', 'Application to real data'],
    stack: ['C++', 'Docker', 'Ubuntu'],
    visual: 'slam',
  },
  {
    id: 'tunnel-platform',
    tag: 'Systems',
    title: 'Tunnel inspection platform',
    client: 'Cross-border rail tunnel operator',
    status: 'In progress',
    year: '2026',
    role: 'Software developer in the project team: services and applications',
    summary:
      'An inspection system embedded in a truck that is carried by train through the tunnel. About fifteen services: acquisition on 24 cameras, control of 100+ lights, sensors, storage and the applications used to review the runs.',
    did: ['Acquisition and synchronisation services', 'Operator tablet app', 'Multi-screen review app', 'History comparison app'],
    stack: ['.NET', 'WPF', 'C#', 'C++', 'Modbus / JBus'],
    visual: 'tunnel',
  },
  {
    id: 'signal-box',
    tag: 'Systems',
    title: 'Signal-box route-setting assistant',
    client: 'National rail operator',
    status: 'In production',
    year: '2025',
    role: 'Pair · I built the complete application',
    summary:
      'A three-screen application: route preparation and command, detection of the switches to operate, train-passage detection by zone, recording and history, and a replay mode to replay what happened on the switch tables. 3 cameras and lights per table, 2 tables per signal box.',
    did: ['Complete application', 'Replay mode', 'Recording and history'],
    stack: ['.NET', 'WPF', 'C#', 'C++'],
    visual: 'signalbox',
  },
  {
    id: 'track-inspection',
    tag: 'Systems',
    title: 'Track inspection software, 3 vehicle configurations',
    client: 'Rail inspection company',
    status: 'In production',
    year: '2026',
    summary:
      'Synchronised acquisition of rail images by 6 line-scan cameras (3 per rail: centre, inner, outer) and a forward-facing area-scan environment camera, in three vehicle variants.',
    did: [
      'Took over a colleague’s code and fixed malfunctions',
      'Refactored it into one modular application for the 3 configurations',
      'Installed it on trains',
      'Support and maintenance',
    ],
    stack: ['.NET', 'WPF', 'C#'],
    visual: 'track',
  },
  {
    id: 'train-passage',
    tag: 'Systems',
    title: 'Train passage detection',
    client: 'National rail operator',
    status: 'Delivered',
    year: '2026',
    summary:
      'I developed the data-consultation application and the data-reporting service, queryable by third-party applications and from a web interface.',
    did: ['Consultation application', 'Data-reporting service'],
    stack: ['.NET', 'WPF'],
  },
  {
    id: 'fabric',
    tag: 'Systems',
    title: 'Fabric defect inspection',
    client: 'Luxury fashion house',
    status: 'Delivered',
    year: '2025 – 2026',
    role: 'Team of 4 developers · I built the interface',
    summary:
      'Inspection table: fabric placement detection (no hands), image capture, registration, shape detection, then defect detection by a trained model. I built the interface, including the dataset-creation tools used to train the model.',
    did: ['Operator interface', 'Dataset-creation tools'],
    stack: ['C#', 'C++', 'WPF / .NET'],
  },
  {
    id: 'metro-niches',
    tag: 'Systems',
    title: 'Metro tunnel niche detection',
    client: 'Urban transit operator',
    status: 'In production',
    year: '2024',
    role: 'Pair',
    summary: 'Took over a colleague’s code and finalised the application that detects niches in metro tunnels.',
    did: ['Takeover and finalisation'],
    stack: ['WPF'],
  },
]

export const featured = projects.filter((p) => p.visual)
export const more = projects.filter((p) => !p.visual)

// Generic, anonymised view of the tunnel inspection platform.
export const architecture = {
  eyebrow: 'Architecture',
  title: ['One truck,', 'about fifteen services.'],
  lede:
    'The tunnel inspection platform is my clearest example of owning a large system: everything from synchronised acquisition to the applications inspectors use afterwards. Generic, anonymised view.',
  layers: [
    {
      id: 'hw',
      label: 'Hardware',
      nodes: [
        { id: 'cams', label: '24 cameras', desc: 'Image acquisition across 24 cameras.' },
        { id: 'lights', label: '100+ lights', desc: 'More than 100 lights driven by the system.' },
        { id: 'thermal', label: 'Thermal cameras', desc: 'Thermal cameras on board the truck.' },
        { id: 'rfid', label: 'RFID + GPS', desc: 'Used to detect tunnel entry and exit.' },
        { id: 'fire', label: 'Fire panel', desc: 'Fire alarm panel integrated into the system.' },
        { id: 'bms', label: 'Battery BMS', desc: 'Battery management system.' },
      ],
    },
    {
      id: 'acq',
      label: 'On-board services',
      nodes: [
        { id: 'acq', label: 'Acquisition', desc: 'Image acquisition service for the 24 cameras.', links: ['cams'] },
        { id: 'sync', label: 'Camera / light sync', desc: 'Synchronises cameras and lights.', links: ['cams', 'lights'] },
        { id: 'tunnel', label: 'Tunnel entry / exit', desc: 'Detects entry and exit of the tunnel from RFID and GPS.', links: ['rfid'] },
        { id: 'kp', label: 'Kilometre posts', desc: 'Detects kilometre-post signs.', links: ['acq'] },
        { id: 'safety', label: 'Thermal · fire · BMS', desc: 'Thermal cameras, fire-panel integration and battery management.', links: ['thermal', 'fire', 'bms'] },
      ],
    },
    {
      id: 'data',
      label: 'Data',
      nodes: [
        { id: 'compress', label: 'Compression', desc: 'Compresses the acquired images.', links: ['acq'] },
        { id: 'nas', label: 'NAS archive', desc: 'Archives runs on a NAS.', links: ['compress'] },
        { id: 'db', label: 'Database', desc: 'Database management for runs and positions.', links: ['tunnel', 'kp'] },
        { id: 'upload', label: 'Depot upload', desc: 'Uploads the run to the depot network at the end of acquisition.', links: ['nas'] },
      ],
    },
    {
      id: 'apps',
      label: 'Applications',
      nodes: [
        { id: 'tablet', label: 'Operator tablet', desc: 'Tablet application used by the operator during the run.', links: ['acq', 'tunnel', 'safety'] },
        { id: 'review', label: 'Multi-screen review', desc: 'Review application for inspection: run selection, camera views.', links: ['nas', 'db'] },
        { id: 'history', label: 'History comparison', desc: 'Compares the same zone across several periods.', links: ['nas', 'db'] },
      ],
    },
  ],
}

export const products = [
  {
    id: 'warcha',
    name: 'Warcha',
    kind: 'SaaS for construction companies in Morocco',
    summary: 'Progress billing (situations de travaux), retention money, UBL 2.1 compliance.',
    stack: TODO('stack'),
    status: TODO('status and users'),
    link: TODO('link'),
  },
  {
    id: 'sme',
    name: TODO('product name'),
    kind: 'Management platform for SMEs',
    summary: 'HR, project tracking, timesheets and payroll register. Differentiator: automatic project costing.',
    stack: TODO('stack'),
    status: TODO('status'),
    link: TODO('link'),
  },
]

export const howIBuild = {
  eyebrow: 'How I build',
  title: ['Engineering,', 'with AI in the loop.'],
  lede: 'I build with LLMs and use Claude Code every day.',
  items: [
    { title: TODO('a concrete thing you built with an LLM'), body: TODO('what it does, for whom, result') },
    { title: TODO('how Claude Code fits your daily workflow'), body: TODO('concrete example from your work') },
  ],
}

export const experience = [
  { from: '09/2025', to: 'Present', title: 'Software Engineer', org: 'R&D Vision', note: 'Permanent · more software-focused projects, more autonomy' },
  { from: '09/2024', to: '09/2025', title: 'Application Engineer', org: 'R&D Vision', note: 'Permanent' },
  { from: '03/2024', to: '08/2024', title: 'R&D Intern: 3D reconstruction from images', org: 'R&D Vision', note: 'Master’s final internship' },
]

export const education = [
  { title: 'Master, Image & 3D', org: 'University of Strasbourg', years: TODO('years') },
  { title: TODO('bachelor’s (L3) title'), org: 'Clermont-Ferrand', years: TODO('year') },
  { title: TODO('studies in Morocco before 2020'), org: 'Morocco', years: TODO('years') },
]

export const about = {
  eyebrow: 'About',
  title: ['Paris area,', 'close to the hardware.'],
  body: [
    'I’m a software engineer at R&D Vision, an industrial machine-vision company near Paris, in a team of three developers reporting to the project manager.',
    'I joined in 2024 as an R&D intern on 3D reconstruction from images, became Application Engineer, and since September 2025 I work as Software Engineer on more software-focused projects with more autonomy.',
    'Before that: a master’s in Image & 3D at the University of Strasbourg, after a bachelor’s year in Clermont-Ferrand and studies in Morocco.',
  ],
}

export const skills = {
  languages: ['C++', 'C#', 'Python', 'TypeScript'],
  frameworks: ['.NET / WPF', 'OpenCV', 'React', 'three.js', 'build123d'],
  tools: ['Git', 'Docker', 'Linux'],
  hardware: ['Line-scan cameras', 'Area-scan cameras', 'ToF cameras', 'Thermal cameras', 'LiDAR', 'NI DAQ', 'Modbus / JBus', 'RFID / GPS'],
}

export const marquee = [
  'C++', 'C#', 'Python', '.NET / WPF', 'OpenCV', 'three.js', 'build123d', 'React', 'TypeScript',
  'LiDAR', 'Time-of-flight', 'Line-scan', 'Thermal', 'Point clouds', 'Visual SLAM', 'Docker', 'Linux',
]
