// ─────────────────────────────────────────────────────────────────────────────
// Portfolio content — Dami Aina. Sourced from resume + github.com/aina-damilola.
// ─────────────────────────────────────────────────────────────────────────────

export const ABOUT = {
  paragraphs: [
    "Hi, I'm Dami Aina — a Computer Engineering student at the University of Toronto (BASc + PEY, minor in Artificial Intelligence), graduating in 2027.",
    "I work full-stack and on embedded systems. Lately that's meant IoT platforms, React / React Native apps, BLE firmware, and the CI/CD infrastructure that ships them — currently as a Software Engineering Intern at Deutsche Hydrapro and an engineering team lead at You're Next Career Network.",
    "Based in Toronto, ON. Hover any skill below for a quick note on how I use it.",
  ],
}

// Each skill shows a brief description on hover (like the old portfolio).
export const SKILLS = [
  { name: 'React',          desc: 'My main front-end tool — this site included.' },
  { name: 'React Native',   desc: 'Cross-platform mobile apps with Expo + TypeScript.' },
  { name: 'TypeScript',     desc: 'Typed JavaScript across web and mobile.' },
  { name: 'Node.js',        desc: 'APIs and backend services.' },
  { name: 'Python',         desc: 'ML, scripting, and backend work.' },
  { name: 'PyTorch',        desc: 'Deep-learning models — e.g. the brain-tumour CNN.' },
  { name: 'C / C++',        desc: 'Systems, embedded, and robotics.' },
  { name: 'PostgreSQL',     desc: 'Relational data, often paired with Supabase.' },
  { name: 'AWS',            desc: 'Hosting and deployment.' },
  { name: 'Docker',         desc: 'Containerized, reproducible builds.' },
  { name: 'GitHub Actions', desc: 'CI/CD pipelines and release automation.' },
  { name: 'Embedded',       desc: 'ESP32, Arduino, DE1-SoC — BLE & I2C.' },
]

export const EDUCATION = {
  school: 'University of Toronto, St. George',
  degree: 'BASc in Computer Engineering + PEY · Minor in Artificial Intelligence',
  period: 'Expected Jun 2027',
  courses: 'Operating Systems, Machine Learning, Computer Hardware, Deep Learning',
}

export const EXPERIENCE = [
  {
    role: 'Software Engineering Intern',
    org: 'Deutsche Hydrapro',
    period: 'Jun 2025 – Present',
    points: [
      'Built a full-stack IoT fleet-management platform (React, Node.js, PostgreSQL, Supabase) ingesting real-time telemetry from brake actuators onto a single AWS-hosted dashboard with live device location and diagnostics.',
      'Developed a cross-platform React Native + TypeScript mobile app, integrating a custom in-house BLE package via TypeScript listeners and context layers that expose actuator state and commands to the UI.',
      'Built a CI/CD pipeline with GitHub Actions on a self-hosted server — automating builds, Detox end-to-end testing, and TestFlight deployment for iOS.',
      'Implemented JWT-based auth and session management for account-level device ownership and organization-wide fleet access control.',
    ],
  },
  {
    role: 'Data & Digital LaunchPad Lead — Software Engineer & Team Lead',
    org: "You're Next Career Network (YNCN)",
    period: 'Apr 2025 – Present',
    points: [
      'Lead a 13-member engineering team across data and digital workstreams — own sprint planning, code review, and project assignment — shipping features used by 3,560+ users.',
      'Cut peak response time ~40% by restructuring queries, tuning indexes, and adding memoization to resolve load-time bottlenecks.',
      'Building a venue-mapping feature (React, Firebase, AWS, GitHub Actions, Docker) for a platform driving $120k+ in annual revenue.',
    ],
  },
  {
    role: 'Programmer Analyst Intern',
    org: 'Procor Limited',
    period: 'Jun 2025 – Aug 2025',
    points: [
      'Built a Grafana observability dashboard ingesting performance metrics from 54 microservices via Prometheus and Kubernetes.',
      'Wrote a Python auto-discovery scraper using the GitHub API to detect and auto-register new microservices, removing manual configuration overhead.',
      'Configured Prometheus alerting on critical thresholds (CPU/RAM >90%, Kubernetes error logs) with Microsoft Teams notifications for on-call teams.',
    ],
  },
]

export const CONTACT = [
  { label: 'Email',    value: 'dami.aina@mail.utoronto.ca',    href: 'mailto:dami.aina@mail.utoronto.ca' },
  { label: 'GitHub',   value: 'github.com/aina-damilola',      href: 'https://github.com/aina-damilola' },
  { label: 'LinkedIn', value: 'linkedin.com/in/aina-damilola', href: 'https://linkedin.com/in/aina-damilola' },
  { label: 'Devpost',  value: 'devpost.com/aina-damilola',     href: 'https://devpost.com/aina-damilola' },
]

export const PROJECTS = [
  {
    id: 'quicker-picker-upper',
    name: 'Quicker Picker Upper',
    meta: 'MakeUofT 2025 · 2nd Best Overall',
    tech: ['C++', 'Python', 'Inverse Kinematics', 'Kinect'],
    blurb: 'A robotic arm that picks up and sorts trash.',
    link: 'https://github.com/aina-damilola/RobotArm',
    body: [
      'An autonomous, computer-vision-guided robotic arm that sorts waste, built at MakeUofT 2025 (2nd Best Overall).',
      'I built the inverse-kinematics solver and the arm hardware, using a Microsoft Kinect for real-time object detection and spatial mapping.',
    ],
  },
  {
    id: 'brain-tumor',
    name: 'Brain Tumor Detection',
    tech: ['Python', 'PyTorch', 'CNN'],
    blurb: 'A CNN that classifies brain-tumour types from MRI.',
    link: 'https://github.com/aina-damilola/Brain-Tumor-Detection',
    body: [
      'A convolutional neural network that detects and classifies different types of brain tumours from MRI imaging.',
      'Built and trained in PyTorch, exploring augmentation and transfer learning to push classification accuracy.',
    ],
  },
  {
    id: 'planwise',
    name: 'PlanWise',
    meta: 'GenAI Genesis Hackathon',
    tech: ['Python', 'Flask', 'Cohere', 'Gemini'],
    blurb: 'An AI tool for planning schedules and finances.',
    link: 'https://github.com/aina-damilola/PlanWise',
    body: [
      'A full-stack personal-planning tool that helps you organize schedules and finances, built at GenAI Genesis.',
      'Uses LLMs (Cohere / Gemini) to turn plain-language goals into structured, personalized plans.',
    ],
  },
  {
    id: 'nsbehacks',
    name: 'NSBEHacks 2025 Website',
    tech: ['React', 'Three.js', 'JavaScript'],
    blurb: "The site for NSBE UofT's annual hackathon.",
    link: 'https://github.com/aina-damilola/NSBEHacks2025-Website',
    body: [
      "The official website for NSBE University of Toronto's annual hackathon, built with React and Three.js.",
      'As lead web developer I built the interactive 3D landing experience and event info, deployed at nsbehacksuoft.ca.',
    ],
  },
  {
    id: 'mock-desktop',
    name: 'Mock Desktop (DE1-SoC)',
    tech: ['C', 'Assembly', 'DE1-SoC'],
    blurb: 'A mini desktop UI running on an FPGA board.',
    link: 'https://github.com/aina-damilola/Mock-Desktop-in-De1-SoC-Board',
    body: [
      'A mock desktop environment running on the DE1-SoC board — windows, a cursor, and UI driven by bare-metal C and assembly.',
      'A computer-hardware project working directly with memory-mapped I/O, the VGA framebuffer, and PS/2 input.',
    ],
  },
  {
    id: 'shifted',
    name: 'ShiftED — Wearable Health Monitor',
    meta: 'In Development',
    tech: ['ESP32', 'I2C', 'BLE', 'React', 'ML'],
    blurb: 'A wearable health monitor for long-term care.',
    link: 'https://github.com/aina-damilola',
    body: [
      'A wearable IoT device on ESP32 that integrates the MAX30102, MAX30205, and LSM6DSO sensors over I2C, transmitting data over BLE to a WiFi gateway and HTTP endpoint.',
      'An ML layer models each resident’s individual health baseline to surface anomalies on a real-time, nurse-facing dashboard — built for long-term care deployment.',
    ],
  },
  {
    id: 'portfolio-os',
    name: 'Portfolio OS',
    tech: ['React', 'three.js', 'R3F'],
    blurb: 'This site — a 3D laptop running a tiny desktop OS.',
    link: 'https://damiaina.com',
    body: [
      'A portfolio built as an interactive 3D scene: a laptop you zoom into, with a Windows-style desktop rendered on the screen.',
      'The desktop content is real DOM (drei <Html>) mapped exactly onto the screen mesh, so it stays crisp and fully interactive.',
    ],
  },
]

// Brief one-line description shown when hovering a desktop icon (old-portfolio style).
export function appDescription(id) {
  return {
    projects: "My projects — the things I've actually built.",
    about: 'An overview of who I am and my skills.',
    experience: "Where I've worked, led, and studied.",
    contact: 'Ways to reach me.',
  }[id]
}
