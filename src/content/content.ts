// Single source of truth for the site and the CV.
// Rule (see CLAUDE.md): never invent a number, date, tool or result.
// Anything unknown is a TODO string, rendered visibly by <Todo />.

export const TODO = (what: string) => `TODO: ${what}` as const
export const isTodo = (s: string | undefined | null) => !!s && s.startsWith('TODO')

export const profile = {
  name: 'Ayoub ADIL',
  role: 'Software Engineer',
  focus: 'Software engineering · 3D',
  company: 'R&D Vision',
  companyNote: 'industrial machine vision',
  location: 'Paris area, France',
  email: 'ayoub.adil0406@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ayoub-adil/',
  // levels: Arabic native, French fluent (years living in France), English fluent (changed from conversational on 09/11/2026)
  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'French', level: 'Fluent' },
    { name: 'English', level: 'Fluent' },
    { name: 'German', level: 'Learning' },
  ],
  site: 'https://ayoub-adil.github.io/',
}

export const hero = {
  name: 'Ayoub ADIL',
  title: ['Software engineer,', 'with a 3D background.'],
  lede:
    'I design, develop and maintain software applications, from the first architecture to support after delivery. I work on 3D software, such as point clouds, 3D viewers and reconstruction, and on larger systems: multi-service platforms and the applications their users work with. Several of my applications run in production today.',
  facts: [
    ['Now', 'Software Engineer, industrial vision'],
    ['Education', 'Master’s, Image & 3D'],
    ['What I do', 'Design · development · maintenance'],
    ['Code', 'C++ · C# · Python'],
  ] as [string, string][],
}

export type StepId = 'capture' | 'reconstruct' | 'detect' | 'interface' | 'ship'

// General text per step, then example projects (refs link to the project cards).
export const steps: { id: StepId; verb: string; object: string; body: string; refs: [string, string][] }[] = [
  {
    id: 'capture',
    verb: 'I capture',
    object: 'the scene.',
    body: 'I integrate sensors into software: industrial cameras (line-scan, area-scan, time-of-flight, thermal) and LiDAR. I connect and configure them, and synchronise their acquisition with the rest of the system.',
    refs: [['Tunnel inspection platform', 'tunnel-platform'], ['Track inspection', 'track-inspection'], ['LiDAR safety barrier', 'lidar-barrier']],
  },
  {
    id: 'reconstruct',
    verb: 'I reconstruct',
    object: 'the geometry.',
    body: 'I work with 3D data: point clouds, depth images, stereo calibration and 3D reconstruction, and I build the viewers that display them.',
    refs: [['3D tunnel reconstruction', 'slam-tunnels'], ['Dough monitoring', 'dough-tof'], ['LiDAR safety barrier', 'lidar-barrier']],
  },
  {
    id: 'detect',
    verb: 'I detect',
    object: 'what matters.',
    body: 'I calibrate the sensors, process their data and turn it into the result the client needs: a measurement, a detection or an alert, reliable in the real conditions on site.',
    refs: [['LiDAR safety barrier', 'lidar-barrier'], ['Dough monitoring', 'dough-tof'], ['Niche detection', 'metro-niches']],
  },
  {
    id: 'interface',
    verb: 'I build',
    object: 'the interface.',
    body: 'I design and develop the applications people work with: desktop and multi-screen applications, tablet apps, replay and history tools, made to be clear for the people who use them.',
    refs: [['Signal-box assistant', 'signal-box'], ['Tunnel inspection platform', 'tunnel-platform'], ['Fabric defect inspection', 'fabric']],
  },
  {
    id: 'ship',
    verb: 'I ship',
    object: 'to production.',
    body: 'I install my applications on site, support them after delivery and keep them evolving: fixes, and refactoring when a product has to grow.',
    refs: [['Track inspection', 'track-inspection']],
  },
]

export type Status = 'In production' | 'Delivered' | 'In progress' | 'Proof of concept'

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
  // looping 3D render for the card: public/img/cards/<cardVideo>.mp4 (tools/render_cards.mjs)
  cardVideo?: string
  /** shown as a card in the grid (most interesting first); the others go to the compact list */
  featured?: boolean
  tag: '3D' | 'Systems'
}

// Order = most interesting first (no numbering on the site).
export const projects: Project[] = [
  {
    id: 'tunnel-platform',
    tag: 'Systems',
    featured: true,
    title: 'Tunnel inspection platform',
    client: 'Rail tunnel operator',
    status: 'In progress',
    year: '2026',
    summary:
      'An inspection truck, carried through the tunnel by train, films the equipment on the tunnel walls and roof so it can be maintained. 22 rear cameras each cover their own zone, 2 side cameras read the positioning signs and more than 100 lights each light their own section, alongside thermal cameras, RFID + GPS, batteries and a fire panel. Thirteen services and applications handle the acquisition on board, then the upload, archiving, multi-screen inspection and run-to-run comparison.',
    did: [
      'Developed most of the services and the communication between them',
      'Developed all the applications: operator tablet, multi-screen inspection, history comparison',
    ],
    stack: ['.NET', 'WPF', 'C#', 'C++', 'Modbus / JBus', 'Phoxene', 'NI DAQ'],
    cardVideo: 'tunnel',
  },
  {
    id: 'lidar-barrier',
    tag: '3D',
    featured: true,
    title: 'LiDAR safety barrier for e-bus high-voltage charging',
    client: 'Transport-sector manufacturer',
    status: 'Proof of concept',
    year: '2026',
    summary:
      'Detects any person or object, down to a cane, approaching a bus that charges at high voltage from underneath, without false alarms from rain, snow or the bus shaking or tilting. Two LiDARs at the top of the bus scan a line ahead of it and along its right side. The system alerts the driver, then cuts the power.',
    did: [
      'Wrote the point-cloud processing that tells real intrusions from rain, snow and bus motion',
      'Integrated and calibrated the LiDARs',
      'Built the operator interface',
    ],
    stack: ['Python', 'C++', 'C#', 'WPF / .NET'],
    cardVideo: 'lidar',
  },
  {
    id: 'dough-tof',
    tag: '3D',
    featured: true,
    title: '3D dough monitoring in an industrial oven',
    client: 'Food-industry group',
    status: 'In production',
    year: '2024',
    summary:
      'Tracks the height and volume of the dough over time while it bakes, from the depth images and point cloud of a time-of-flight camera at the top of the oven.',
    did: ['Integrated the ToF camera', 'Built the 3D viewer and the depth-image display', 'Built the operator interface'],
    stack: ['C++'],
    cardVideo: 'tof',
  },
  {
    id: 'track-inspection',
    tag: 'Systems',
    featured: true,
    title: 'Track inspection software, 3 vehicle configurations',
    client: 'Rail inspection company',
    status: 'In production',
    year: '2026',
    summary:
      'Six line-scan cameras, three per rail (top, inner and outer view), each capture one line per millimetre of travel, and a forward area-scan camera records the surroundings so each rail image can be located. Inspectors replay the sequences to decide where each rail needs maintenance.',
    did: [
      'Took over a colleague’s code and fixed malfunctions',
      'Refactored it into one modular application for the 3 configurations',
      'Installed it on trains',
      'Support and maintenance',
    ],
    stack: ['.NET', 'WPF', 'C#'],
    cardVideo: 'track',
  },
  {
    id: 'signal-box',
    tag: 'Systems',
    featured: true,
    title: 'Signal-box route-setting assistant',
    client: 'Rail operator',
    status: 'In production',
    year: '2025',
    summary:
      'A three-screen application for signal-box operators: preparing and setting routes, detecting which switches to operate, detecting train passages by zone, recording everything, and replaying what happened on the switch tables. 3 cameras and lights per table, 2 tables per signal box.',
    did: ['Built the complete application', 'Recording, history and replay mode'],
    stack: ['.NET', 'WPF', 'C#', 'C++'],
    cardVideo: 'signalbox',
  },
  {
    id: 'slam-tunnels',
    tag: '3D',
    featured: true,
    title: '3D reconstruction of rail and metro tunnels from images',
    client: 'Master’s internship',
    status: 'Proof of concept',
    year: '2024',
    summary:
      'Visual SLAM (ORB-SLAM, PLVS) applied to real footage of rail tunnels, trains and metro: stereo calibration, point clouds, 3D reconstruction and visualisation.',
    did: ['Reviewed the visual-SLAM literature', 'Implemented and ran ORB-SLAM and PLVS', 'Applied them to real rail and metro footage and analysed the results'],
    stack: ['C++', 'Docker', 'Ubuntu'],
    cardVideo: 'slam',
  },
  {
    id: 'fabric',
    tag: 'Systems',
    title: 'Fabric defect inspection',
    client: 'Luxury fashion house',
    status: 'Delivered',
    year: '2025 – 2026',
    summary:
      'An inspection table checks that the fabric is laid out with no hands in view, captures and registers the image, detects its shape, then finds defects with a trained model. I built the operator interface, including the tools that create the training datasets.',
    did: ['Built the operator interface', 'Built the dataset-creation tools'],
    stack: ['C#', 'C++', 'WPF / .NET'],
  },
  {
    id: 'train-passage',
    tag: 'Systems',
    title: 'Train passage detection',
    client: 'Rail operator',
    status: 'Delivered',
    year: '2026',
    summary:
      'A system that detects passing trains. I built the application to browse its data and the service that makes the data available to third-party applications and a web interface.',
    did: ['Built the data-browsing application', 'Built the data service'],
    stack: ['.NET', 'WPF'],
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
    did: ['Took over a colleague’s code', 'Finalised the niche-detection application'],
    stack: ['WPF'],
    cardVideo: 'niche',
  },
]

export const featured = projects.filter((p) => p.featured)
export const more = projects.filter((p) => !p.featured)

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
    context: 'Master course project',
    year: '12/2023',
    summary: 'A GPU path tracer built to study Monte Carlo sampling on scenes with reflections, shadows and transparency.',
    stack: ['C++', 'OpenGL', 'Shaders'],
    media: [
      { type: 'video', src: '/img/projects/path-tracing.mp4', poster: '/img/projects/path-tracing.webp', alt: 'Path tracer converging on a scene with columns and spheres' },
      { type: 'image', src: '/img/projects/path-tracing.webp', alt: 'Path tracer side by side with its settings panel' },
    ],
  },
  {
    id: 'vr-protocols',
    title: 'Experimental protocols in virtual reality',
    context: 'Master project · ICube lab',
    year: '09/2023 – 12/2023',
    summary: 'I designed and built virtual environments for psychology research, and integrated VR into therapeutic applications.',
    stack: ['Unity', 'VR'],
    media: [{ type: 'image', src: '/img/projects/vr-protocols.webp', alt: 'Virtual environments built for psychological research' }],
  },
  {
    id: 'vr-interaction',
    title: 'Interaction with objects in virtual reality',
    context: 'Research project · ICube lab',
    year: '01/2023 – 06/2023',
    summary: 'A development framework in Unreal Engine 5 that maps gestures and postures to the manipulation of 3D objects.',
    stack: ['Unreal Engine 5', 'VR'],
    media: [
      { type: 'image', src: '/img/projects/vr-interaction.webp', alt: 'Motion-capture gloves used in the project' },
      { type: 'video', src: '/img/projects/rokoko-mocap.mp4', poster: '/img/projects/rokoko-mocap-poster.jpg', alt: 'Me in a motion-capture suit driving a 3D avatar in real time' },
    ],
  },
  {
    id: 'smart-home',
    title: 'Smart home',
    context: 'Bachelor’s internship · FST Mohammedia',
    year: '04/2020 – 06/2020',
    summary: 'A web app, an Android app, a console and an API to manage smart homes remotely.',
    stack: ['Node.js', 'Python', 'TypeScript'],
    media: [{ type: 'image', src: '/img/projects/smart-home.webp', alt: 'Smart home app landing screen' }],
  },
]


// Generic, anonymised view of the tunnel inspection platform.
// `links` lists the upstream nodes each service depends on.
export const architecture = {
  eyebrow: 'Case study · Tunnel inspection platform',
  title: ['One truck,', 'thirteen services.'],
  lede:
    'The largest system I have worked on. The hardware was not my part: I developed most of the services and the communication between them, and all the applications, from synchronised acquisition on board the truck to the tools inspectors use after the run.',
  layers: [
    {
      id: 'hw',
      label: 'On the truck',
      nodes: [
        { id: 'rear', label: '22 rear cameras', desc: '22 cameras at the rear of the truck, each with its own direction and point of view, filming a precise zone of the tunnel where equipment is installed on the walls or the roof.' },
        { id: 'side', label: '2 side cameras', desc: 'Two cameras on the side of the truck film the signs used to locate the truck in the tunnel.' },
        { id: 'lights', label: '100+ lights', desc: 'More than 100 lights, each lighting its own section of the tunnel.' },
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
    place: 'Industrial machine vision',
    from: '03/2024',
    to: 'Present',
    roles: [
      // same work as Application Engineer: the company renamed its job titles in 09/2025 (confirmed 07/11/2026)
      { from: '09/2025', to: 'Present', title: 'Software Engineer', note: 'Same role, renamed when the company specialised its job titles' },
      { from: '09/2024', to: '09/2025', title: 'Application Engineer' },
      { from: '03/2024', to: '08/2024', title: 'R&D Intern', note: 'Master’s final internship: 3D reconstruction from images' },
    ],
    summary:
      'Depending on the project, I work solo, in a pair or in a larger team, and I install and support what I deliver.',
  },
]

export const education = [
  {
    title: 'Master’s, Image & 3D',
    org: 'UFR Math-Info · University of Strasbourg',
    // school logos from the v1 site (archive-v1), recoloured to the site's light monochrome
    logo: '/img/schools/unistra.webp',
    place: 'Strasbourg, France',
    years: '2021 – 2024',
    body: 'Computer-graphics track (I3D): geometric modelling, virtual reality, rendering and image processing. Research and master projects with the ICube lab.',
  },
  {
    title: 'Bachelor’s (final year), Computer Science',
    org: 'INP-ISIMA · Clermont Auvergne University',
    logo: '/img/schools/isima.webp',
    place: 'Clermont-Ferrand, France',
    years: '2020 – 2021',
    body: 'Final year of a French bachelor’s: algorithms, networks, databases.',
  },
  {
    title: 'Bachelor’s, Computer Science, Networks & Multimedia',
    org: 'FST Mohammedia · Hassan II University',
    logo: '/img/schools/fst.webp',
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
  title: ['Software I design,', 'build and keep running.'],
  // site only, not on the CV. Rank confirmed 07/11/2026 (Ascendant 1). "Top 9%" = Ascendant 1 and above,
  // 9.20% of ranked players (vstats.gg, V26 Act 6, 19/10/2026; 8-9% across sources). Changes every act.
  // Icons: Valorant "V" mark (Wikimedia Commons, recoloured) and the official rank icon (valorant-api.com).
  outside: {
    category: 'Gaming',
    items: [
      {
        name: 'Valorant',
        mode: 'Competitive',
        icon: '/img/outside/valorant.svg',
        rank: 'Ascendant 1',
        percentile: 'top 9% of all ranked players',
        rankIcon: '/img/outside/ascendant-1.webp',
      },
    ],
  },
  body: [
    'I’m Ayoub, a software engineer with a background in 3D. I came to it through mathematics and computer science, then a master’s in Image & 3D at the University of Strasbourg: rendering, geometric modelling and virtual reality.',
    'Since 2024, as a software engineer, I design and develop applications and services, from multi-service platforms to 3D viewers and operator applications, then install them on site and maintain them after delivery. Many of these projects are built around cameras and LiDAR; the software is what I bring.',
  ],
}


export const skills: Record<string, string[]> = {
  languages: ['C++', 'C#', 'Python', 'TypeScript', 'JavaScript'],
  '3D & graphics': ['OpenGL / shaders', 'three.js', 'Unity', 'Unreal Engine 5', 'Blender'],
  'vision & data': ['OpenCV', 'Point clouds', 'Visual SLAM', 'Stereo calibration'],
  frameworks: ['.NET / WPF', 'React', 'Node.js'],
  tools: ['Git', 'Docker', 'Linux', 'Claude Code'],
  hardware: ['Line-scan cameras', 'Area-scan cameras', 'ToF cameras', 'Thermal cameras', 'LiDAR', 'NI DAQ', 'Modbus / JBus', 'RFID / GPS'],
}
