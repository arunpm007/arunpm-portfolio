// ------------------------------------------------------------------
//  Single source of truth for portfolio content. Follows DESIGN.md:
//  one claim per block, with its proof. No team sizes, no employer
//  product names, no invented numbers.
// ------------------------------------------------------------------

// Set NEXT_PUBLIC_SITE_URL to the deployed URL (used for link previews).
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3050";

export const profile = {
  name: "Arun P M",
  role: "Senior Frontend Engineer & Lead",
  headline: "Frontend architect",
  location: "Bangalore, India",
  email: "imarunmanohar007@gmail.com",
  github: "https://github.com/arunpm007",
  linkedin: "https://www.linkedin.com/in/arun-p-m-3a9005225/",
  resumeUrl: "/arunpm_resume.pdf",
  intro:
    "I build interfaces that feel effortless and hold up at scale — design systems, real-time 3D and native mobile apps. And when a product needs it, I go full-stack to see it through.",
};

/** Three facts in the hero's bottom bar — the 10-second read. */
export const heroFacts = [
  { label: "Role", value: "Senior Frontend Engineer & Lead" },
  { label: "Craft", value: "UI architecture · Design systems · 3D · Mobile" },
  { label: "Status", value: "Open to senior & lead roles" },
];

/** The scroll statement. **Bold** words get the signal colour. */
export const statement =
  "Great frontend is **invisible engineering**. I care most about the parts people never see — architecture, accessibility, performance, security — so the parts they do see feel **effortless on any screen**.";

/** What I bring — four strengths, each true across every job and project. */
export const strengths = [
  { word: "Architecture", line: "Systems teams extend instead of rewrite — clear boundaries, typed data, migrations that never stop shipping." },
  { word: "Craft", line: "Motion, 3D and the last 10% of detail that makes a product feel premium — without costing performance." },
  { word: "Range", line: "React and Next.js on the web, Flutter on iOS and Android, WebGL for 3D, LLM agents for AI." },
  { word: "Ownership", line: "Frontend first, full-stack when it matters — auth, payments and APIs included, through to production." },
];

export type Capability = {
  id: "architecture" | "systems" | "3d" | "mobile" | "fullstack" | "ai";
  title: string;
  claim: string;
  built: string[];
  /** Where this was proven — across jobs and own projects. */
  evidence: string[];
  stack: string;
};

export const capabilities: Capability[] = [
  {
    id: "systems",
    title: "Design systems & UI",
    claim: "Token-driven systems that theme any brand, with accessibility built into the foundation.",
    built: [
      "Layered tokens → materials → primitives; screens own zero visual values",
      "Runtime theming per brand, dark mode, WCAG AA baseline",
      "Component APIs, a live style guide and design review loops",
    ],
    evidence: ["Etta Global", "This portfolio"],
    stack: "Design tokens · CSS variables · Tailwind · MUI",
  },
  {
    id: "architecture",
    title: "Frontend architecture",
    claim: "Application structure that scales with the team: clear module boundaries, typed data and incremental migrations.",
    built: [
      "Multi-product app shells with registries and clear ownership boundaries",
      "Server vs client vs URL state, typed end to end in TypeScript",
      "Migrations behind compatibility layers, so nothing stops shipping",
    ],
    evidence: ["Etta Global", "AnimeMind"],
    stack: "React · Next.js · TypeScript",
  },
  {
    id: "3d",
    title: "Real-time 3D & motion",
    claim: "Cinematic WebGL and motion that ship to production and still run on a mid-range phone.",
    built: [
      "Custom GLSL shaders, shared-canvas scenes, holographic and pack-opening effects",
      "GPU-aware quality tiers and asset budgets",
      "Scroll and route choreography with GSAP — always with a reduced-motion path",
    ],
    evidence: ["Etta Global", "Finish", "This portfolio"],
    stack: "Three.js · React Three Fiber · GLSL · GSAP",
  },
  {
    id: "mobile",
    title: "Mobile & native apps",
    claim: "Native iOS and Android apps owned end to end, and mobile web designed for thumbs.",
    built: [
      "Sole engineer of an enterprise CRM app — architecture to store releases",
      "Offline-capable data, background push, deep links, camera scanning, geo-fencing",
      "Touch-first mobile web: swipe navigation, bottom sheets, safe areas",
    ],
    evidence: ["Vtiger CRM", "Etta Global", "Coorg Car Point"],
    stack: "Flutter · Dart · Riverpod · Mobile web",
  },
  {
    id: "ai",
    title: "AI-powered products",
    claim: "LLM features engineered like real software: tools, permissions and validation in code, not in the prompt.",
    built: [
      "Agent loops with tool use, streamed to the UI step by step",
      "Role-based permissions enforced in code; every tool call validated",
      "Model output treated as untrusted input, with graceful failure",
    ],
    evidence: ["IT Support Desk"],
    stack: "Claude API · Tool use · Zod · Next.js",
  },
  {
    id: "fullstack",
    title: "Full-stack depth",
    claim: "A frontend engineer who can own the backend it depends on — auth, payments and APIs, done securely.",
    built: [
      "Single sign-on on OAuth 2.0 / OIDC, MFA, device sessions, step-up auth",
      "Server-authoritative checkout and payment flows",
      "REST APIs, PostgreSQL, Redis and row-level security",
    ],
    evidence: ["Etta Global", "AnimeMind", "Coorg Car Point"],
    stack: "Node · NestJS · PostgreSQL · Redis · Supabase",
  },

];

export type Experience = {
  company: string;
  role: string;
  period: string;
  /** One readable, powerful line — the brief a hiring manager reads at a glance. */
  brief: string;
  lines: string[];
  stack: string;
};

export const experience: Experience[] = [
  {
    company: "Etta Global",
    role: "Senior Lead Engineer, Frontend · UI/UX & Frontend Team Lead",
    period: "2026 — Now",
    brief:
      "Own the frontend architecture of a connected product ecosystem — identity, payments, gaming, digital collectibles and more — and lead UI/UX for a cross-functional team. I build the hard parts myself: real-time 3D and WebGL, immersive gaming interfaces, motion and a layered design system, plus single sign-on and session security. From architecture standards and design reviews to the flows that ship.",
    lines: [
      "Own the frontend architecture of a connected product ecosystem — identity, payments, gaming, digital collectibles and more — including the platform shell that sells every product in place.",
      "Lead frontend and UI/UX for a cross-functional team: architecture standards, design and code reviews, and product decisions turned into shipped flows.",
      "Built single sign-on and session security, real-time 3D, wallet integration and a layered design system that migrated 80+ legacy screens without a freeze.",
    ],
    stack: "Next.js · React · TypeScript · Three.js / R3F · NestJS · PostgreSQL · Redis",
  },
  {
    company: "Vtiger CRM",
    role: "Software Developer, Flutter",
    period: "2023 — 2026",
    brief:
      "Sole engineer of an enterprise CRM's iOS and Android app — re-platformed it from fragile to stable and shipped field features end to end, from architecture to store releases.",
    lines: [
      "Owned an enterprise CRM's mobile app end to end as its sole engineer — architecture, features and store releases on iOS and Android.",
      "Re-platformed it on Riverpod and MVVM and took it from fragile to stable, closing 50+ production issues.",
      "Shipped field features: geo-fenced check-in, deep links, document scanning and background push.",
    ],
    stack: "Flutter · Dart · Riverpod · Firebase",
  },
];

export type Project = {
  title: string;
  blurb: string;
  tags: string[];
  status: "Live" | "Built" | "Open source" | "In progress" | "Planned";
  featured?: boolean;
  href?: string;
  repo?: string;
  /** Screenshots in /public/projects — first one is the card image. */
  images?: string[];
  /** "theme": the hover image is the same screen in dark mode — label it. */
  hoverHint?: "theme";
};

export const projects: Project[] = [
  {
    title: "IT Support Desk",
    blurb:
      "An AI helpdesk for small offices. The assistant streams every step it takes — looking up devices, reading repair history, raising tickets — while an IT dashboard turns fleet data into AI-written insights. Permissions are enforced in code, never in the prompt.",
    tags: ["Next.js 16", "TypeScript", "Claude API", "Tool use", "Zod", "Tailwind CSS"],
    status: "Open source",
    featured: true,
    repo: "https://github.com/arunpm007/it-support-desk",
    images: ["/projects/it-support-desk-light.jpg", "/projects/it-support-desk-dark.jpg"],
    hoverHint: "theme",
  },
  {
    title: "AnimeMind",
    blurb:
      "A personal watch tracker that works out which seasons you've seen, what comes next and whether it has been released. Versioned REST API, refresh-token rotation with theft detection, row-level security, a rate-limited and cached data provider, and 63 automated tests.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Drizzle", "PostgreSQL", "Vitest"],
    status: "Open source",
    featured: true,
    repo: "https://github.com/arunpm007/animemind",
    images: ["/projects/animemind-home.jpg", "/projects/animemind-library.jpg"],
  },
  {
    title: "Coorg Car Point",
    blurb:
      "A used-car listings site for a local dealer. The admin lists a car from a phone, with in-browser photo resizing that strips GPS data. Rate-limited sell-your-car form with spam protection, a leads tracker, and owner details kept private by row-level security.",
    tags: ["Next.js 16", "Supabase", "PostgreSQL", "Tailwind CSS"],
    status: "Live",
    featured: true,
    href: "https://coorg-car-point.netlify.app/",
    repo: "https://github.com/arunpm007/car-listings",
    images: ["/projects/coorg-car-point-1.jpg", "/projects/coorg-car-point-2.jpg"],
  },
  {
    title: "Finish — 3D Material Studio",
    blurb:
      "A dev tool to edit 3D model materials in the browser — load any GLB, tweak each part's colour, metalness and roughness live, then copy the config into your own project.",
    tags: ["React Three Fiber", "Three.js", "glTF", "Vite"],
    status: "Live",
    href: "https://finish-3d.vercel.app",
    repo: "https://github.com/arunpm007/material-studio",
    images: ["/projects/material-studio-1.jpg", "/projects/material-studio-2.png"],
  },
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
]

/** Scannable scope chips in the hero — confirmed, scope over task metrics. */
export const heroScope = [
  "Senior Engineer & Lead",
  "Multi-product ecosystem",
  "Web · iOS · Android · 3D",
];

/** What I'm looking for next, shown in Contact. */
export const lookingFor = [
  "Senior frontend, frontend architect or lead roles",
  "Products where design quality, engineering rigour and ownership all matter",
];
