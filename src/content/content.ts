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
    'I build software applications, starting with the architecture, and I keep looking after them once they’re delivered. Part of my work is 3D, mostly point clouds and the viewers that display them. The rest is larger systems made of many services, plus the applications their operators use. Several of them run in production today.',
  facts: [
    ['Now', 'Software Engineer, industrial vision'],
    ['Education', 'Master’s, Image & 3D'],
    ['What I do', 'Build and maintain applications'],
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
    body: 'A lot of my projects start with sensors: line-scan, area-scan, time-of-flight and thermal cameras, and LiDAR. I connect them, set them up and make sure they acquire in sync with the rest of the system.',
    refs: [['Tunnel inspection platform', 'tunnel-platform'], ['Track inspection', 'track-inspection'], ['LiDAR safety barrier', 'lidar-barrier']],
  },
  {
    id: 'reconstruct',
    verb: 'I reconstruct',
    object: 'the geometry.',
    body: 'Then comes the 3D data. I’ve worked with point clouds, depth images, stereo calibration and visual SLAM, and I write the viewers that show the result.',
    refs: [['3D tunnel reconstruction', 'slam-tunnels'], ['Dough monitoring', 'dough-tof'], ['LiDAR safety barrier', 'lidar-barrier']],
  },
  {
    id: 'detect',
    verb: 'I detect',
    object: 'what matters.',
    body: 'In the end, the client wants a number or a decision, like the height of the dough or an alarm when someone walks up to a charging bus. I calibrate the sensors and write the processing, and it has to hold up on site, in the rain and with the bus moving.',
    refs: [['LiDAR safety barrier', 'lidar-barrier'], ['Dough monitoring', 'dough-tof'], ['Niche detection', 'metro-niches']],
  },
  {
    id: 'interface',
    verb: 'I build',
    object: 'the interface.',
    body: 'This is the part people actually see. I’ve built a three-screen signal-box application, an operator tablet app and tools to replay and compare past runs. I try to keep them simple to use.',
    refs: [['Signal-box assistant', 'signal-box'], ['Tunnel inspection platform', 'tunnel-platform'], ['Fabric defect inspection', 'fabric']],
  },
  {
    id: 'ship',
    verb: 'I ship',
    object: 'to production.',
    body: 'Delivery isn’t the end. I install my applications on site, fix what comes up, and refactor when a product has to grow. That’s how the track inspection software became one app for three vehicle configurations.',
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
      'An inspection truck rides through the tunnel on a train and films the equipment on the walls and roof, so it can be maintained. At the back, 22 cameras each cover their own zone. Two side cameras read the positioning signs, and more than 100 lights each cover a section. There are also thermal cameras, RFID and GPS, batteries and a fire panel. Thirteen services and applications run the acquisition on board, then the upload, the archiving, the multi-screen inspection and the comparison between runs.',
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
      'The bus charges at high voltage from underneath, so nobody should get close. Two LiDARs at the top of the bus scan a line ahead of it and along its right side. Anything that comes near, even a walking cane, is detected, without false alarms from rain, snow or the bus shaking and tilting. The driver gets an alert, then the power is cut.',
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
      'A time-of-flight camera at the top of the oven gives depth images and a point cloud. From them, the software tracks the height and volume of the dough while it bakes.',
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
      'Six line-scan cameras, three per rail (top, inner and outer view), each take one line per millimetre of travel. A forward area-scan camera films the surroundings so every rail image can be located. Inspectors replay the sequences to decide which rail needs maintenance, and where.',
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
      'Signal-box operators use it on three screens to prepare and set routes. It shows which switches have to be operated and which zones trains are passing through. Everything is recorded, so an operator can replay what happened on the switch tables. Each table has 3 cameras and lights, and each signal box has 2 tables.',
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
      'I ran visual SLAM (ORB-SLAM and PLVS) on real footage of rail tunnels, trains and the metro, to see how well it could rebuild them in 3D. That meant stereo calibration, point clouds, reconstruction and visualisation.',
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
      'Fabric is laid on an inspection table. Once no hands are in view, the system takes the image, aligns it, finds the shape and looks for defects with a trained model. My part was the operator interface, including the tools used to build the model’s training datasets.',
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
      'The system detects passing trains. I wrote the application for browsing its data, and the service that hands that data to other applications and to a web interface.',
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
      'In metro tunnels, niches are small refuges in the wall at ground level, big enough for two people, where technicians wait while a train goes by. I took over a colleague’s code and finished the application that detects them.',
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
    summary: 'A GPU path tracer I wrote to study Monte Carlo sampling, tested on scenes with reflections, shadows and transparent objects.',
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
    summary: 'I designed and built virtual environments for psychology research, and brought VR into therapy applications.',
    stack: ['Unity', 'VR'],
    media: [{ type: 'image', src: '/img/projects/vr-protocols.webp', alt: 'Virtual environments built for psychological research' }],
  },
  {
    id: 'vr-interaction',
    title: 'Interaction with objects in virtual reality',
    context: 'Research project · ICube lab',
    year: '01/2023 – 06/2023',
    summary: 'An Unreal Engine 5 framework for handling 3D objects with hand gestures and body posture.',
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
    'This is the biggest system I’ve worked on. I didn’t do the hardware. I wrote most of the services and the way they talk to each other, and every application, from acquisition on the truck to the tools inspectors use once the run is over.',
  layers: [
    {
      id: 'hw',
      label: 'On the truck',
      nodes: [
        { id: 'rear', label: '22 rear cameras', desc: '22 cameras at the back of the truck. Each one points its own way and films one zone of the tunnel, where equipment is mounted on the walls or the roof.' },
        { id: 'side', label: '2 side cameras', desc: 'Two cameras on the side of the truck film the signs that tell where the truck is in the tunnel.' },
        { id: 'lights', label: '100+ lights', desc: 'More than 100 lights, each lighting its own section of the tunnel.' },
        { id: 'thermal', label: 'Thermal cameras', desc: 'Thermal cameras on board the truck.' },
        { id: 'rfid', label: 'RFID + GPS', desc: 'Tell when the truck enters and leaves the tunnel, and through which entrance and exit.' },
        { id: 'batt', label: 'Batteries', desc: 'Batteries powering the on-board system.' },
        { id: 'fire', label: 'Fire panel', desc: 'Fire alarm panel with its detectors and triggers.' },
      ],
    },
    {
      id: 'rt',
      label: 'Acquisition services',
      nodes: [
        { id: 'tunnel', label: 'Tunnel entry / exit', desc: 'Uses RFID and GPS to spot the entry and exit, which starts the acquisition and the triggers.', links: ['rfid'] },
        { id: 'sync', label: 'Synchronisation', desc: 'Sends the triggers to the cameras and the lights at the same time, at the chosen frequency.', links: ['tunnel', 'rear', 'side', 'lights'] },
        { id: 'acq', label: 'Video acquisition', desc: 'Acquires the video sequences of the cameras.', links: ['sync', 'rear', 'side'] },
        { id: 'light', label: 'Lighting', desc: 'Configures how the lights flash, checks that each one works and alerts the operator if one fails.', links: ['lights'] },
        { id: 'pos', label: 'Positioning', desc: 'Reads the signs along the tunnel, so each image gets the position where it was taken, and the operator sees how far the run has got.', links: ['side'] },
        { id: 'therm', label: 'Thermal', desc: 'Service for the thermal cameras.', links: ['thermal'] },
      ],
    },
    {
      id: 'sup',
      label: 'Supervision',
      nodes: [
        { id: 'battery', label: 'Battery', desc: 'Reports the state of the batteries and whether they will last the whole trip.', links: ['batt'] },
        { id: 'firesvc', label: 'Fire', desc: 'Reports the state of the fire triggers and detectors.', links: ['fire'] },
        { id: 'tablet', label: 'Operator tablet', desc: 'The operator’s tablet app: everything they need to check and follow during the run.', links: ['tunnel', 'acq', 'light', 'pos', 'therm', 'battery', 'firesvc'] },
      ],
    },
    {
      id: 'post',
      label: 'After the run',
      nodes: [
        { id: 'upload', label: 'Depot upload', desc: 'At the end of a round, uploads the acquisitions to the depot network.', links: ['acq'] },
        { id: 'archive', label: 'Archiving', desc: 'Compresses the acquisitions and stores them on the archive NAS.', links: ['upload'] },
        { id: 'inspect', label: 'Inspection app', desc: 'A large multi-screen app for replaying the sequences, with every camera in sync and a database behind it.', links: ['archive', 'pos'] },
        { id: 'history', label: 'History', desc: 'Puts runs side by side: the same spot, seen by the same camera, on two different dates.', links: ['archive', 'inspect'] },
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
      'I’ve worked alone, in pairs and in bigger teams, depending on the project. I install what I deliver and support it afterwards.',
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
  title: ['Software I build,', 'and keep running.'],
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
    'I’m Ayoub, a software engineer. I started with maths and computer science, then did a master’s in Image & 3D at the University of Strasbourg, where I studied rendering, geometric modelling and virtual reality.',
    'Since 2024 I’ve been building applications and services for industrial clients, from multi-service platforms to 3D viewers and operator apps. I also install them on site and maintain them afterwards. Many of these projects revolve around cameras or LiDAR, and my job is the software around them.',
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
