// ------------------------------------------------------------------
//  Single source of truth for portfolio content.
//  Edit here to update the site — no component changes needed.
//  Keep this in step with public/arunpm_resume.pdf.
// ------------------------------------------------------------------

// Set NEXT_PUBLIC_SITE_URL to the deployed URL (used for link previews).
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3050";

export const profile = {
  name: "Arun P M",
  role: "Senior Frontend Lead Engineer",
  tagline: "React • Next.js • TypeScript • Design Systems",
  location: "Bangalore, India",
  email: "imarunmanohar007@gmail.com",
  github: "https://github.com/arunpm007",
  linkedin: "https://www.linkedin.com/in/arun-p-m-3a9005225/",
  resumeUrl: "/arunpm_resume.pdf",
  intro:
    "I lead a 5-person UI/UX and frontend team across four connected consumer products — identity, payments, gaming and digital collectibles — and stay hands-on across React, Next.js and NestJS.",
};

export const about = {
  paragraphs: [
    "I'm a senior frontend lead with 3.5 years of experience shipping web and mobile products end to end.",
    "At Etta Global I set UI and design-system standards, run code and design reviews, and turn designer and product decisions into shipped flows. I own single sign-on, account security, checkout and performance across four products, from the React frontend to NestJS APIs and deploys.",
    "Before that I was the sole mobile engineer on Vtiger CRM's Flutter app, covering features, debugging and the full release cycle.",
  ],
  stats: [
    { value: "3.5 yrs", label: "Shipping web and mobile products" },
    { value: "5", label: "Engineers and designers led" },
    { value: "191→53 MB", label: "Static assets cut on GOAT Games" },
    { value: "−35%", label: "Mobile app crash rate" },
  ],
};

export type SkillGroup = { title: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "Dart", "SQL", "Java", "C/C++", "Bash"],
  },
  {
    title: "Frontend & Mobile",
    items: [
      "React",
      "Next.js (App Router)",
      "Three.js / React Three Fiber",
      "MUI",
      "Tailwind CSS",
      "Flutter",
      "React Native",
    ],
  },
  {
    title: "Backend & Data",
    items: [
      "Node.js",
      "NestJS",
      "REST APIs",
      "PostgreSQL",
      "TypeORM",
      "Drizzle",
      "Redis",
      "Supabase",
      "MongoDB",
      "Firebase",
    ],
  },
  {
    title: "Auth & Security",
    items: [
      "OAuth 2.0 / OIDC",
      "SSO",
      "MFA",
      "Step-up auth",
      "Session & token management",
      "Row-level security",
    ],
  },
  {
    title: "Infra & Tooling",
    items: [
      "Docker",
      "AWS Amplify",
      "GitHub Actions",
      "Kong",
      "Stripe",
      "Mixpanel",
      "Playwright",
      "Jest",
      "Vitest",
    ],
  },
  {
    title: "Spoken",
    items: ["English", "Hindi", "Kannada", "Malayalam", "Tamil"],
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
    company: "Etta Global",
    role: "Senior Lead Engineer, Frontend · UI/UX & Frontend Team Lead",
    period: "May 2026 — Present",
    summary:
      "Leading a team of 5 frontend engineers and designers across four connected consumer products, while staying hands-on across frontend, NestJS APIs and deploys.",
    highlights: [
      "Single sign-on: built cross-product sign-in through 4IR (the shared identity and payments platform) — popup flow with redirect fallback, branded sign-in per product, MFA, separate cookies per product and global sign-out.",
      "Security: found and proved an authorization flaw that let any signed-in user obtain admin-level tokens, and drove the fix. Shipped device management with remote sign-out, step-up checks, new-device alerts and sign-in history.",
      "Checkout correctness: moved order pricing to the server catalogue so the browser cart is never trusted, and made paid checkouts settle reliably so owned names can't be re-sold.",
      "Performance: cut GOAT Games static assets from 191 MB to 53 MB and card art from 8.4 MB to 0.6 MB, added GPU-based device tiering for the 3D hero, and fixed an event-loop crash in a shared WebGL canvas.",
      "Design systems & 3D: token-based design system with an accessibility baseline and dark mode; Three.js / React Three Fiber scenes (pack-open reveal, 3D cube, holographic card tilt).",
      "Web3 wallets: integrated the Etta Keychain browser wallet — discovery, lock states, wallet picker and on-chain minting.",
      "Release health: unblocked staging deploys by pinning the package-manager toolchain; added SEO and JSON-LD, Mixpanel funnels, a WCAG AA audit and Playwright end-to-end tests.",
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Redis",
      "Stripe",
      "Three.js",
      "Docker",
      "AWS Amplify",
    ],
  },
  {
    company: "Vtiger CRM Pvt. Ltd.",
    role: "Software Developer, Flutter",
    period: "May 2023 — Apr 2026",
    summary:
      "Sole engineer for the CRM's Flutter app (joined as Software Developer Intern), covering features, debugging and the full release cycle while keeping a 4+ store rating.",
    highlights: [
      "Cut app load time by 30% and crash rate by 35% by fixing 50+ production issues, adding caching and removing redundant network calls.",
      "Built geo-fenced check-in/out, deep linking, camera document scanning and Firebase push notifications with background handling.",
      "Restructured the app on Riverpod and MVVM with modular UI, domain and data layers.",
    ],
    stack: ["Flutter", "Dart", "Riverpod", "Firebase", "REST APIs"],
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
  { label: "Projects", href: "#projects" },
  { label: "Case studies", href: "#case-studies" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/** Headline numbers shown in the hero ticker. */
export const ticker = [
  "3.5 yrs shipping web + mobile",
  "Leading a team of 5",
  "SSO across 4 products",
  "191 → 53 MB static assets",
  "8.4 → 0.6 MB card art",
  "−35% mobile crash rate",
  "WCAG AA audited",
];
