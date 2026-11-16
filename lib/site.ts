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
    "I architect frontends that carry a business — the platform, identity, commerce and real-time 3D of a four-product ecosystem, and the design system that holds it together.",
};

/** Three facts in the hero's bottom bar — the 10-second read. */
export const heroFacts = [
  { label: "Role", value: "Senior Frontend Engineer & Lead" },
  { label: "Owns", value: "Platform · Identity · Commerce · 3D · Design systems" },
  { label: "Status", value: "Open to senior & lead roles" },
];

/** The scroll statement. **Bold** words get the signal colour. */
export const statement =
  "I don't ship screens. I architect **the systems behind them** — one shell that sells four products, one identity across all of them, real-time 3D in production, and a design system that re-skins everything **without breaking a page**.";

/** Scope, not vanity metrics: what a senior owns. */
export const scope = [
  { value: "4", label: "Products in one ecosystem — architected end to end" },
  { value: "80+", label: "Legacy screens migrated onto one design system, no freeze" },
  { value: "3", label: "Surfaces shipped: web, mobile web, native iOS + Android" },
  { value: "UI→API", label: "Ownership from interface to auth, payments and deploys" },
];

export type Capability = {
  id: "platform" | "identity" | "commerce" | "3d" | "systems" | "mobile";
  title: string;
  claim: string;
  built: string[];
  stack: string;
  link?: { href: string; label: string };
};

export const capabilities: Capability[] = [
  {
    id: "platform",
    title: "Platform architecture",
    claim: "One shell that hosts four products and sells each in place — without blurring who owns what.",
    built: [
      "A registry of product canvases, each in its own look, inside one platform shell",
      "Products keep pricing authority behind an allow-listed same-origin proxy",
      "Six shared step-flows: shop, inventory, pay, security, devices, orders",
    ],
    stack: "Next.js · React · TypeScript · Route handlers",
    link: { href: "/work/platform-shell", label: "Case study" },
  },
  {
    id: "identity",
    title: "Identity & security",
    claim: "One identity across the ecosystem, with sessions people can see and end.",
    built: [
      "Single sign-on on OAuth 2.0 / OIDC with MFA and per-product branding",
      "Device sessions with remote sign-out and fail-closed revocation",
      "Step-up re-authentication, new-device alerts, and a platform security review",
    ],
    stack: "OAuth 2.0 / OIDC · NestJS · PostgreSQL · Redis",
    link: { href: "/work/identity", label: "Case study" },
  },
  {
    id: "commerce",
    title: "Commerce & wallets",
    claim: "Checkout that can't be gamed, and on-chain actions people can trust.",
    built: [
      "Server-authoritative pricing; paid items settle once and are never re-sold",
      "Provisional orders, gift cards and payment sessions across products",
      "Browser-wallet integration: discovery, lock states, picker, minting, transfers",
    ],
    stack: "Stripe · Payment sessions · Web3 wallet APIs",
  },
  {
    id: "3d",
    title: "Real-time 3D & motion",
    claim: "Cinematic 3D that ships to production — and still runs on a mid-range phone.",
    built: [
      "A pack opening on one shared WebGL canvas, holographic card frames, a type-to-mint hero",
      "A company site told as a Three.js film, with its own swipe mode for phones",
      "GPU-aware quality tiers and an asset pipeline that keeps it fast",
    ],
    stack: "Three.js · React Three Fiber · GLSL · GSAP",
    link: { href: "/work/realtime-3d", label: "Case study" },
  },
  {
    id: "systems",
    title: "Design systems",
    claim: "A layered design architecture that re-skins a platform and migrates its legacy screens one at a time.",
    built: [
      "Skins → tokens → materials → primitives; screens own zero visual values",
      "A compatibility layer kept 80+ legacy screens running during the move",
      "Runtime per-product theming, a WCAG AA baseline and a live style guide",
    ],
    stack: "Design tokens · CSS variables · React · MUI interop",
    link: { href: "/work/design-architecture", label: "Case study" },
  },
  {
    id: "mobile",
    title: "Mobile & cross-platform",
    claim: "Native and mobile web, designed for thumbs — not a shrunken desktop.",
    built: [
      "Sole engineer of an enterprise CRM app on iOS and Android",
      "Touch-first mobile versions of the collectibles products",
      "Phone-first interaction models: swipe steps, bottom sheets, safe areas",
    ],
    stack: "Flutter · Riverpod · Mobile web",
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  lines: string[];
  stack: string;
};

export const experience: Experience[] = [
  {
    company: "Etta Global",
    role: "Senior Lead Engineer, Frontend · UI/UX & Frontend Team Lead",
    period: "2026 — Now",
    lines: [
      "Own the frontend architecture of a four-product ecosystem — the platform shell, single sign-on, commerce, real-time 3D and the design system.",
      "Lead frontend and UI/UX for a cross-functional team of engineers and designers: architecture standards, design and code reviews, and product decisions turned into shipped flows.",
      "Build the hard parts hands-on — session security, wallet integration, WebGL, and the APIs and deploys behind them.",
    ],
    stack: "Next.js · React · TypeScript · Three.js / R3F · NestJS · PostgreSQL · Redis",
  },
  {
    company: "Vtiger CRM",
    role: "Software Developer, Flutter",
    period: "2023 — 2026",
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
};

export const projects: Project[] = [
  {
    title: "IT Support Desk",
    blurb:
      "An AI helpdesk agent for small offices. Staff describe a problem in their own words; the agent checks their computer's repair history, suggests a self-help fix, and raises a ticket when a problem keeps coming back. Built on Claude tool use, with permissions enforced in code rather than the prompt and every tool call validated with Zod.",
    tags: ["Next.js 16", "TypeScript", "Claude API", "Tool use", "Zod", "Tailwind CSS"],
    status: "Open source",
    featured: true,
    repo: "https://github.com/arunpm007/it-support-desk",
    images: ["/projects/it-support-desk-1.png", "/projects/it-support-desk-2.png"],
  },
  {
    title: "AnimeMind",
    blurb:
      "A personal watch tracker that works out which seasons you've seen, what comes next and whether it has been released. Versioned REST API, refresh-token rotation with theft detection, row-level security, a rate-limited and cached data provider, and 63 automated tests.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Drizzle", "PostgreSQL", "Vitest"],
    status: "Built",
    featured: true,
    images: ["/projects/animemind-1.jpg", "/projects/animemind-2.jpg"],
  },
  {
    title: "Coorg Car Point",
    blurb:
      "A used-car listings site for a local dealer. The admin lists a car from a phone, with in-browser photo resizing that strips GPS data. Rate-limited sell-your-car form with spam protection, a leads tracker, and owner details kept private by row-level security.",
    tags: ["Next.js 16", "Supabase", "PostgreSQL", "Tailwind CSS"],
    status: "Live",
    featured: true,
    href: "https://coorg-car-point.netlify.app/",
    images: ["/projects/coorg-car-point-1.jpg", "/projects/coorg-car-point-2.jpg"],
  },
  {
    title: "3D Material Studio",
    blurb:
      "A dev tool to edit 3D model materials in the browser — load any GLB, tweak each part's colour, metalness and roughness live, then copy the config into your own project.",
    tags: ["React Three Fiber", "Three.js", "glTF", "Vite"],
    status: "Open source",
    // Add `href` with the live URL once it's deployed, and set status to "Live".
    repo: "https://github.com/arunpm007/material-studio",
    images: ["/projects/material-studio-1.jpg", "/projects/material-studio-2.png"],
  },
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Proof", href: "#proof" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

/** What I'm looking for next, shown in Contact. */
export const lookingFor = [
  "Senior frontend, frontend architect or lead roles",
  "Product teams where design quality and engineering rigour both matter",
  "Ownership across platform, identity, commerce and real-time 3D",
];
