// ------------------------------------------------------------------
//  Single source of truth for portfolio content.
//  Edit here to update the site — no component changes needed.
// ------------------------------------------------------------------

export const profile = {
  name: "Arun P M",
  role: "Frontend & 3D Web Engineer",
  tagline: "React • Next.js • Three.js • Flutter",
  location: "Bangalore, India",
  email: "imarunmanohar007@gmail.com",
  phone: "+91 99007 64944",
  // TODO: fill in your real handles
  github: "https://github.com/",
  linkedin: "https://linkedin.com/in/",
  resumeUrl: "/arunpm_resume.pdf",
  intro:
    "I build immersive, high-performance web experiences — interactive 3D, custom shaders and pixel-perfect interfaces — with React, Next.js and Three.js. Previously shipped production mobile apps as a sole Flutter engineer.",
};

export const about = {
  paragraphs: [
    "I'm a software engineer focused on the intersection of design and engineering: interfaces that feel fast, look premium, and do something you can't quite look away from.",
    "My current work is creative frontend and real-time 3D on the web — React Three Fiber, WebGL and GLSL shaders — with a strong emphasis on performance engineering so it runs smoothly on everything from flagship laptops to low-end phones.",
    "Before this I owned enterprise mobile products end-to-end as the sole Flutter engineer, from architecture through production releases. I like problems that span the stack.",
  ],
  stats: [
    { value: "3+", label: "Years building products" },
    { value: "28→61", label: "FPS lifted on low-end 3D" },
    { value: "35s→0.11s", label: "Main-thread freeze removed" },
    { value: "50+", label: "Production issues resolved" },
  ],
};

export type SkillGroup = { title: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    title: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "Material UI",
      "HTML5 / CSS3",
    ],
  },
  {
    title: "3D & Animation",
    items: [
      "Three.js",
      "React Three Fiber",
      "WebGL",
      "GLSL shaders",
      "GSAP",
      "Blender (basic)",
    ],
  },
  {
    title: "Performance",
    items: [
      "Device tiering",
      "DPR governance",
      "KTX2 / asset pipeline",
      "Code-splitting",
      "Lighthouse profiling",
    ],
  },
  {
    title: "Mobile",
    items: [
      "Flutter",
      "Dart",
      "Riverpod",
      "Offline-first",
      "Firebase (FCM)",
      "Deep linking",
    ],
  },
  {
    title: "Backend & Data",
    items: ["Node.js", "Express", "REST APIs", "MongoDB", "PostgreSQL", "MySQL"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub Actions", "Docker", "Figma", "Postman", "Bruno"],
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "Etta Global Partners LLC",
    role: "UI Developer",
    period: "May 2026 — Present",
    summary:
      "Building immersive, premium web experiences — interactive 3D and pixel-perfect UI.",
    highlights: [
      "Built an interactive 3D product experience with React Three Fiber & Three.js — custom GLSL shaders, a shared WebGL canvas and animated GLB sequences.",
      "Led a measurement-first performance program: low-end 3D rendering 28→61 FPS and main-thread freeze cut from 35s to 0.11s (device tiering, DPR governor, KTX2).",
      "Built a reusable component library and responsive design system (design tokens + 3-tier breakpoint framework).",
      "Implemented high-performance UI animation with GSAP and collaborated closely with design, product and backend.",
    ],
    stack: ["React", "Next.js", "TypeScript", "Three.js", "R3F", "GSAP"],
  },
  {
    company: "Vtiger CRM Pvt. Ltd.",
    role: "Software Developer (Flutter)",
    period: "Jul 2023 — May 2026",
    summary:
      "Sole Flutter engineer owning an enterprise CRM mobile app end-to-end.",
    highlights: [
      "Owned end-to-end mobile development and production releases for an enterprise CRM app (Android & iOS).",
      "Improved startup performance 30% and reduced crash rate 35% by resolving 50+ production issues.",
      "Built geo-fencing, deep linking, camera-based document scanning (OCR), offline sync and push notifications.",
      "Designed scalable, offline-first architecture with Riverpod and MVVM/MVC.",
    ],
    stack: ["Flutter", "Dart", "Riverpod", "Firebase", "REST APIs", "SQLite"],
  },
];

export type Project = {
  title: string;
  blurb: string;
  tags: string[];
  status: "Live" | "In progress" | "Planned";
  featured?: boolean;
  href?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    title: "This Portfolio",
    blurb:
      "A device-tiered 3D portfolio built with Next.js, React Three Fiber and a custom GLSL fresnel shader — the site you're on right now.",
    tags: ["Next.js", "React Three Fiber", "GLSL", "GSAP"],
    status: "Live",
    featured: true,
  },
  {
    title: "3D Product Configurator",
    blurb:
      "Real-time 3D configurator — rotate a product and swap colours, materials and parts live, with a clean control UI. Built to show off R3F + product-experience craft.",
    tags: ["React Three Fiber", "Three.js", "TypeScript"],
    status: "In progress",
    featured: true,
  },
  {
    title: "Immersive 3D Scroll Story",
    blurb:
      "A scroll-driven cinematic experience pairing React Three Fiber with GSAP ScrollTrigger — 3D scenes that react to the scrollbar.",
    tags: ["R3F", "GSAP", "Next.js"],
    status: "In progress",
    featured: true,
  },
  {
    title: "Collaborative Task Manager",
    blurb:
      "Full-stack, real-time task board with WebSocket sync and JWT auth. A polished take on team collaboration.",
    tags: ["React", "Node.js", "MongoDB", "WebSockets"],
    status: "Planned",
  },
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
