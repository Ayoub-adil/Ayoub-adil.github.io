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
  email: 'ayoub.adil0406@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ayoub-adil/',
  github: 'https://github.com/Ayoub-adil',
  // "Fluent" for French, English, Arabic comes from the v1 site's own text
  languages: [
    { name: 'French', level: 'Fluent' },
    { name: 'English', level: 'Fluent' },
    { name: 'Arabic', level: 'Fluent' },
    { name: 'German', level: 'Learning (just started)' },
  ],
}

export const hero = {
  eyebrow: 'Portfolio · Paris area',
  name: 'Ayoub ADIL',
  title: ['3D & computer-vision', 'software engineer.'],
  lede:
    'I hold a master’s in Image & 3D from the University of Strasbourg. Since 2024 I build 3D and machine-vision software for industrial systems: LiDAR and depth cameras, point clouds, and the operator interfaces that run in production.',
  facts: [
    ['Education', 'Master, Image & 3D · Strasbourg'],
    ['Now', 'Software Engineer, industrial vision'],
    ['Based in', 'Paris area, France'],
    ['Languages', 'FR · EN · AR'],
  ] as [string, string][],
}

export type StepId = 'capture' | 'reconstruct' | 'detect' | 'interface' | 'ship'

export const steps: { id: StepId; verb: string; object: string; body: string; ref: string }[] = [
  {
    id: 'capture',
    verb: 'I capture',
    object: 'the scene.',
    body: 'LiDAR, time-of-flight, line-scan, area-scan and thermal cameras. I integrate the sensor, calibrate it and get clean data out of it.',
    ref: 'Tunnel inspection platform · Track inspection',
  },
  {
    id: 'reconstruct',
    verb: 'I reconstruct',
    object: 'the geometry.',
    body: 'Point clouds, stereo calibration, visual SLAM. My master’s internship applied ORB-SLAM and PLVS to real rail and metro tunnel data.',
    ref: '3D tunnel reconstruction',
  },
  {
    id: 'detect',
    verb: 'I detect',
    object: 'what matters.',
    body: 'Two LiDARs draw an invisible barrier around a bus charging from underneath. A person, a cane or any object crossing it is detected; rain, snow, the bus shaking or tilting are not.',
    ref: 'LiDAR safety barrier',
  },
  {
    id: 'interface',
    verb: 'I build',
    object: 'the interface.',
    body: 'Multi-screen operator applications, replay modes, 3D viewers and depth-image displays. The part people actually use.',
    ref: 'Signal-box assistant · Dough monitoring',
  },
  {
    id: 'ship',
    verb: 'I ship',
    object: 'to production.',
    body: 'I install my applications on client sites and maintain them after delivery. They run on trains, in an industrial oven and in signal boxes.',
    ref: 'Installation · maintenance · support',
  },
]

export type Status = 'In production' | 'Delivered' | 'In progress' | 'Proof of concept'
export type Visual = 'lidar' | 'tof' | 'slam' | 'tunnel' | 'signalbox' | 'track' | 'niche'

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
    summary:
      'A bus charges from underneath while parked, and nobody may approach it. One LiDAR on the front scans a full line ahead of the bus, another on the right side scans along its edge. My software detects any person or object crossing those lines, even a cane, without false alarms from rain, snow, or the bus shaking or tilting. The system alerts the driver, then cuts the power.',
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
    summary:
      'A time-of-flight camera at the top of a tall rectangular oven films the inside. It produces depth images and a point cloud, used to compute the height and the volume of the dough over time while it bakes.',
    did: ['Operator interface', 'ToF camera integration', '3D viewer', 'Depth-image display'],
    stack: ['C++'],
    visual: 'tof',
  },
  {
    id: 'slam-tunnels',
    tag: '3D',
    title: '3D reconstruction of rail and metro tunnels from images',
    client: 'Master’s final internship',
    status: 'Proof of concept',
    year: '03/2024 – 08/2024',
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
    summary:
      'An inspection truck carried by train through the tunnel, to inspect the equipment installed on the tunnel walls and roof so it can be maintained. Several processing stations run on board. 22 cameras at the rear each film their own zone of the tunnel, 2 side cameras read the positioning signs, and more than 100 lights each light their own section. Thermal cameras, RFID + GPS, batteries and a fire panel complete it. Thirteen services and applications run the acquisition, then the upload, archiving, multi-screen inspection and history comparison.',
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
      'A wagon with 6 line-scan cameras at the same level, 3 per rail (top, inner and outer view), each taking one line every millimetre on the train’s travel pulse, plus an area-scan camera at the front recording the surroundings to know where each rail image was taken. The sequences are then replayed to spot where the client needs to maintain each rail. Three vehicle variants.',
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
    summary:
      'Niches are small refuges at ground level in metro tunnel walls, about the size of two people, where technicians step aside when a train passes. I took over a colleague’s code and finalised the application that detects them.',
    did: ['Takeover and finalisation'],
    stack: ['WPF'],
    visual: 'niche',
  },
]

export const featured = projects.filter((p) => p.visual)
export const more = projects.filter((p) => !p.visual)

// From the v1 site (archive-v1). Images are my own academic work.
export type Media = { type: 'image' | 'video'; src: string; poster?: string; alt: string }

export interface Academic {
  id: string
  title: string
  context: string
  year: string
  summary: string
  stack: string[]
  // shown one after the other in the card; first item is the cover
  media: Media[]
  links?: [string, string][]
}

export const academic: Academic[] = [
  {
    id: 'path-tracing',
    title: 'Monte Carlo path tracing',
    context: 'Master course project · University of Strasbourg',
    year: '12/2023',
    summary: 'GPU path tracer studying Monte Carlo sampling in scenes with reflection, shadows and transparency.',
    stack: ['C++', 'OpenGL', 'Shaders'],
    media: [
      { type: 'video', src: '/img/projects/path-tracing.mp4', poster: '/img/projects/path-tracing.webp', alt: 'Path tracer converging on a scene with columns and spheres' },
      { type: 'image', src: '/img/projects/path-tracing.webp', alt: 'Path tracer side by side with its settings panel' },
    ],
  },
  {
    id: 'vr-protocols',
    title: 'Experimental protocols in virtual reality',
    context: 'Master project · IGG-ICube',
    year: '09/2023 – 01/2024',
    summary: 'Design and development of virtual environments for psychological research, and integration of VR into therapeutic applications.',
    stack: ['Unity', 'VR'],
    media: [{ type: 'image', src: '/img/projects/vr-protocols.webp', alt: 'Virtual environments built for psychological research' }],
  },
  {
    id: 'vr-interaction',
    title: 'Interaction with objects in virtual reality',
    context: 'Research project · IGG-ICube',
    year: '01/2023 – 06/2023',
    summary: 'A development framework in Unreal Engine 5 mapping gestures and postures to the manipulation of 3D objects.',
    stack: ['Unreal Engine 5', 'VR'],
    media: [
      { type: 'video', src: '/img/projects/rokoko-mocap.mp4', poster: '/img/projects/rokoko-mocap-poster.jpg', alt: 'Me in a motion-capture suit driving a 3D avatar in real time' },
      { type: 'image', src: '/img/projects/vr-interaction.webp', alt: 'Motion-capture gloves used in the project' },
    ],
  },
  {
    id: 'metahuman',
    title: 'MetaHuman character',
    context: 'Personal project',
    year: '2023',
    summary: 'Creating a MetaHuman character and integrating it into a virtual environment.',
    stack: ['Unreal Engine 5', 'Blender'],
    media: [{ type: 'image', src: '/img/projects/metahuman.webp', alt: 'MetaHuman character rendered in Unreal Engine 5' }],
  },
  {
    id: 'smart-home',
    title: 'Smart home',
    context: 'Internship · FST Mohammedia',
    year: '04/2020 – 06/2020',
    summary: 'Web app, Android app, console and API for the remote management of smart homes.',
    stack: ['Node.js', 'Python', 'TypeScript'],
    media: [{ type: 'image', src: '/img/projects/smart-home.webp', alt: 'Smart home app landing screen' }],
    links: [
      ['Web repo', 'https://github.com/Ayoub-adil/SmartHomeWeb'],
      ['Mobile repo', 'https://github.com/Ayoub-adil/SmartHomeMobile'],
    ],
  },
]


// Generic, anonymised view of the tunnel inspection platform.
// Generic, anonymised view of the tunnel inspection platform.
// `links` lists the upstream nodes each service depends on.
export const architecture = {
  eyebrow: 'Case study · Tunnel inspection platform',
  title: ['One truck,', 'thirteen services.'],
  lede:
    'My clearest example of working on a large system: I developed the services and applications of this inspection platform, from synchronised acquisition on board to the tools inspectors use afterwards. Generic, anonymised view.',
  layers: [
    {
      id: 'hw',
      label: 'On the truck',
      nodes: [
        { id: 'rear', label: '22 rear cameras', desc: '22 cameras at the rear of the truck, each with its own direction and point of view, filming a precise zone of the tunnel where equipment is installed on the walls or the roof.' },
        { id: 'side', label: '2 side cameras', desc: 'Two cameras on the side of the truck film the signs used to locate the truck in the tunnel.' },
        { id: 'lights', label: '100+ lights', desc: 'More than 100 lights, each lighting its own section, like the cameras.' },
        { id: 'thermal', label: 'Thermal cameras', desc: 'Thermal cameras on board the truck.' },
        { id: 'rfid', label: 'RFID + GPS', desc: 'Used to detect the entry into and exit from the tunnel, and which entry and exit.' },
        { id: 'batt', label: 'Batteries', desc: 'Batteries powering the on-board system.' },
        { id: 'fire', label: 'Fire panel', desc: 'Fire alarm panel with its detectors and triggers.' },
      ],
    },
    {
      id: 'rt',
      label: 'Acquisition services',
      nodes: [
        { id: 'tunnel', label: 'Tunnel entry / exit', desc: 'Detects entry and exit from RFID and GPS, to know when to start the acquisition and the triggers.', links: ['rfid'] },
        { id: 'sync', label: 'Synchronisation', desc: 'Sends the triggers to the cameras and the lights at the same time, at the chosen frequency.', links: ['tunnel', 'rear', 'side', 'lights'] },
        { id: 'acq', label: 'Video acquisition', desc: 'Acquires the video sequences of the cameras.', links: ['sync', 'rear', 'side'] },
        { id: 'light', label: 'Lighting', desc: 'Configures how the lights flash, checks that each one works and alerts the operator if one fails.', links: ['lights'] },
        { id: 'pos', label: 'Positioning', desc: 'Reads the positioning signs in the tunnel to give the position where each image was taken and the progress through the tunnel.', links: ['side'] },
        { id: 'therm', label: 'Thermal', desc: 'Service for the thermal cameras.', links: ['thermal'] },
      ],
    },
    {
      id: 'sup',
      label: 'Supervision',
      nodes: [
        { id: 'battery', label: 'Battery', desc: 'Reports the state of the batteries and whether they will last the whole trip.', links: ['batt'] },
        { id: 'firesvc', label: 'Fire', desc: 'Reports the state of the fire triggers and detectors.', links: ['fire'] },
        { id: 'tablet', label: 'Operator tablet', desc: 'Tablet application for the operator to check and follow everything during the run.', links: ['tunnel', 'acq', 'light', 'pos', 'therm', 'battery', 'firesvc'] },
      ],
    },
    {
      id: 'post',
      label: 'After the run',
      nodes: [
        { id: 'upload', label: 'Depot upload', desc: 'At the end of a round, uploads the acquisitions to the depot network.', links: ['acq'] },
        { id: 'archive', label: 'Archiving', desc: 'Compresses the acquisitions and stores them on the archive NAS.', links: ['upload'] },
        { id: 'inspect', label: 'Inspection app', desc: 'Large multi-screen application to replay the sequences: multi-camera, synchronisation and database.', links: ['archive', 'pos'] },
        { id: 'history', label: 'History', desc: 'Compares several runs: how a precise spot looked from a given camera at date x and at date y.', links: ['archive', 'inspect'] },
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
  lede: 'AI is part of my daily workflow, for my own projects and at work.',
  items: [
    { title: 'Claude Code, every day', body: 'I work with Claude Code every day, for my personal projects as well as at work.' },
  ],
}

// Entries before R&D Vision, and education dates, come from the v1 site (archive-v1 branch).
export interface Job {
  org: string
  place: string
  from: string
  to: string
  roles: { from: string; to: string; title: string; note?: string }[]
  summary: string
  projects?: string[] // project ids, industrial or academic
}

export const experience: Job[] = [
  {
    org: 'R&D Vision',
    place: 'Saint-Maur-des-Fossés · industrial machine vision',
    from: '03/2024',
    to: 'Present',
    roles: [
      { from: '09/2025', to: 'Present', title: 'Software Engineer', note: 'More software-focused projects, more autonomy' },
      { from: '09/2024', to: '09/2025', title: 'Application Engineer' },
      { from: '03/2024', to: '08/2024', title: 'R&D Intern', note: 'Master’s final internship: 3D reconstruction from images' },
    ],
    summary:
      'I build acquisition services, 3D and vision processing and operator applications, then install them on site and support them. I have worked solo, in pairs and in larger teams, and I am at ease in all three.',
  },
  {
    org: 'ICube lab (IGG team) · University of Strasbourg',
    place: 'Strasbourg',
    from: '01/2023',
    to: '12/2023',
    roles: [
      { from: '09/2023', to: '12/2023', title: 'Master project', note: 'Experimental protocols in virtual reality' },
      { from: '01/2023', to: '06/2023', title: 'Research project', note: 'Interaction with objects in virtual reality' },
    ],
    summary: 'Virtual-reality research projects with the ICube laboratory during my master’s.',
    projects: ['vr-protocols', 'vr-interaction'],
  },
  {
    org: 'FST Mohammedia · Hassan II University',
    place: 'Mohammedia, Morocco',
    from: '04/2020',
    to: '06/2020',
    roles: [{ from: '04/2020', to: '06/2020', title: 'Intern', note: 'Smart home IoT' }],
    summary: 'Web, Android, console and API for the remote management of smart homes.',
    projects: ['smart-home'],
  },
]

export const education = [
  {
    title: 'Master, Image & 3D',
    org: 'UFR Math-Info · University of Strasbourg',
    place: 'Strasbourg, France',
    years: '2021 – 2024',
    body: 'Computer-graphics track (I3D): geometric modelling, virtual reality, rendering and image processing. Projects with the ICube research lab.',
  },
  {
    title: 'Bachelor, Computer Science',
    org: 'INP-ISIMA · Clermont Auvergne University',
    place: 'Clermont-Ferrand, France',
    years: '2020 – 2021',
    body: 'Third year of the bachelor’s: algorithms, networks, databases.',
  },
  {
    title: 'Bachelor of Science & Technology: Computer Science, Networks & Multimedia',
    org: 'FST Mohammedia · Hassan II University',
    place: 'Mohammedia, Morocco',
    years: '2019 – 2020',
    body: 'Software development, networks and multimedia.',
  },
  {
    title: 'DEUG: Mathematics, Computer Science & Physics',
    org: 'FST Mohammedia · Hassan II University',
    place: 'Mohammedia, Morocco',
    years: '2017 – 2019',
    body: 'Two-year general university diploma (MIP).',
  },
  {
    title: 'Baccalaureate, Mathematical Sciences',
    org: 'Lycée Ben Msik',
    place: 'Casablanca, Morocco',
    years: '2016 – 2017',
    body: '',
  },
]

// Quoted on the v1 site, from a recommendation letter.
export const recommendation = {
  quote: 'His grades… granted him the first position in a class of 37 students.',
  author: 'Abdellah ADIB, Professor, Hassan II University',
}

export const about = {
  eyebrow: 'About me',
  title: ['Casablanca, Strasbourg,', 'now Paris.'],
  body: [
    'I’m Ayoub, a software engineer specialised in 3D and computer vision. I grew up in Casablanca, studied computer science in Mohammedia and Clermont-Ferrand, then did a master’s in Image & 3D at the University of Strasbourg, where I worked on virtual reality with the ICube lab and on rendering.',
    'In 2024 I joined R&D Vision, near Paris, as an R&D intern on 3D reconstruction from images. I stayed as Application Engineer, and since September 2025 I work as Software Engineer: LiDAR and depth cameras, synchronised multi-camera acquisition, and the operator applications that run in production.',
    'What I enjoy most is the full path: from a raw sensor, to a geometry I can trust, to an interface someone uses every day.',
  ],
}

export const certifications = ['Kaggle: Pandas', 'Kaggle: Data Visualization', 'Kaggle: Data Cleaning', 'Human Coders: GitHub Copilot']

export const skills: Record<string, string[]> = {
  languages: ['C++', 'C#', 'Python', 'TypeScript', 'JavaScript'],
  '3D & graphics': ['OpenGL / shaders', 'three.js', 'Unity', 'Unreal Engine 5', 'Blender'],
  'vision & data': ['OpenCV', 'Point clouds', 'Visual SLAM', 'Stereo calibration'],
  frameworks: ['.NET / WPF', 'React', 'Node.js'],
  tools: ['Git', 'Docker', 'Linux'],
  hardware: ['Line-scan cameras', 'Area-scan cameras', 'ToF cameras', 'Thermal cameras', 'LiDAR', 'NI DAQ', 'Modbus / JBus', 'RFID / GPS'],
}

export const marquee = [
  'C++', 'C#', 'Python', '.NET / WPF', 'OpenCV', 'three.js', 'Unreal Engine 5', 'Unity', 'React', 'TypeScript',
  'LiDAR', 'Time-of-flight', 'Line-scan', 'Thermal', 'Point clouds', 'Visual SLAM', 'Docker', 'Linux',
]
