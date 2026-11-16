// ------------------------------------------------------------------
//  Case studies, in the structure hiring teams read for:
//  Problem → Context → My role → Decisions → Tradeoffs → Quality →
//  Outcome → Next. Written at architecture level: ownership, decisions
//  and their consequences. Publish-safe: no employer product names, no
//  internal code, no exploit details, no invented numbers.
// ------------------------------------------------------------------

export type Figure = "shell-map" | "sso-flow" | "sign-out-flow" | "tier-ladder" | "asset-bars" | "layer-stack" | "app-layers" | "agent-loop";

export type Section = "problem" | "context" | "role" | "decisions" | "tradeoffs" | "quality" | "outcome" | "next";

export const SECTIONS: { id: Section; label: string }[] = [
  { id: "problem", label: "Problem" },
  { id: "context", label: "Context" },
  { id: "role", label: "My role" },
  { id: "decisions", label: "Decisions" },
  { id: "tradeoffs", label: "Tradeoffs" },
  { id: "quality", label: "Quality" },
  { id: "outcome", label: "Outcome" },
  { id: "next", label: "Next" },
];

export type CaseStudy = {
  slug: string;
  index: string;
  /** Where the work happened, e.g. "Etta Global" or "Own project". */
  where: string;
  /** Featured on the home page; others are linked from Experience. */
  featured: boolean;
  title: string;
  /** Word(s) in the title set in the signal colour. */
  emphasis: string;
  summary: string;
  meta: { label: string; value: string }[];
  results: { value: string; label: string }[];
  problem: string[];
  context: string[];
  role: string[];
  decisions: { title: string; text: string }[];
  tradeoffs: { chose: string; over: string; why: string }[];
  quality: string[];
  outcome: string[];
  next: string[];
  lesson: string;
  /** Figures and the section they follow. */
  figures: { after: Section; figure: Figure; caption: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "realtime-3d",
    index: "01",
    where: "Etta Global",
    featured: true,
    title: "Real-time 3D in production",
    emphasis: "in production",
    summary:
      "The 3D layer of a collectibles ecosystem — a cinematic pack opening, holographic cards and a film-like company site — engineered to stay fast and stable on everyday phones.",
    meta: [
      { label: "Role", value: "Lead engineer, 3D & motion" },
      { label: "Scope", value: "Marketplace, product sites, company site" },
      { label: "Year", value: "2026" },
      { label: "Stack", value: "Three.js · React Three Fiber · GLSL · GSAP" },
    ],
    results: [
      { value: "28→61", label: "FPS on low-end GPUs" },
      { value: "1", label: "Shared WebGL context" },
      { value: "3", label: "Quality tiers, chosen by GPU" },
    ],
    problem: [
      "3D is the signature of these products — a pack you open, cards that catch the light, a company story told as a film. But the first 3D release was heavy, ran at 28 FPS on low-end devices, and after a library upgrade the pack animation silently broke on the live site.",
    ],
    context: [
      "Cutting the 3D was not an option; it is what the products are.",
      "Most visitors are on mid-range phones.",
      "Several teams touch the same 3D surfaces.",
    ],
    role: [
      "Owned the 3D and motion layer across the products: scene architecture, quality tiers, asset pipeline and production stability.",
      "Built the signature moments hands-on and worked with design on how they move.",
    ],
    decisions: [
      { title: "One canvas for every 3D moment", text: "The pack lives on a single shared WebGL canvas that follows it from the hero into the reveal, so the GPU context and models are created once." },
      { title: "Tier by GPU, not screen size", text: "A capability probe picks a quality tier — geometry detail, pixel ratio, effects — with a static fallback for software renderers." },
      { title: "An asset pipeline with budgets", text: "Every asset audited by size and use; art re-encoded to WebP and AVIF at displayed sizes. Static assets went from 191 MB to 53 MB and card art from 8.4 MB to 0.6 MB." },
      { title: "Motion as a system", text: "Shared rules for how things move: animate one element instead of remounting video, collapse rapid clicks into one transition, always ship a reduced-motion path." },
      { title: "A film, with a phone mode", text: "The company site is a Three.js film with spring-stepped chapters on desktop and its own swipe-to-step mode on phones, rather than a squeezed desktop scroll." },
    ],
    tradeoffs: [
      { chose: "Tiering by GPU", over: "Tiering by screen size", why: "Screen size is a poor proxy for GPU power; it costs one capability probe at start-up." },
      { chose: "A still image on software renderers", over: "3D everywhere", why: "Some visitors see stillness instead of motion — better than stutter." },
      { chose: "Size budgets per asset type", over: "A one-off clean-up", why: "Budgets need upkeep, but they stop the weight creeping back." },
    ],
    quality: [
      "FPS measured on a low-end device before and after tiering.",
      "The production crash reproduced on the exact live build: a React effect looping on a value the 3D library recreated each update.",
      "Motion verified frame by frame — a clean console isn't proof that motion works.",
    ],
    outcome: [
      "Low-end devices went from 28 to 61 FPS; the 3D now loads a fraction of the weight.",
      "The pack opening works on the live site again, on one shared canvas.",
      "A tiering and motion approach reused across the products — and on this portfolio's own hero card.",
    ],
    next: [
      "Automate the asset pipeline (KTX2, meshopt) in CI with size checks on every pull request.",
      "Real-user monitoring of FPS and Core Web Vitals per tier.",
      "Set tier thresholds from that data instead of rules of thumb.",
    ],
    lesson: "3D in production is an engineering problem first: budgets, tiers and fallbacks are what let the magic ship.",
    figures: [
      { after: "decisions", figure: "tier-ladder", caption: "Quality tiers, chosen by GPU. This portfolio's hero card uses the same approach." },
      { after: "outcome", figure: "asset-bars", caption: "Asset weight before and after, to scale." },
    ],
  },
  {
    slug: "ai-helpdesk",
    index: "02",
    where: "Own project · open source",
    featured: true,
    title: "An AI agent you can trust",
    emphasis: "you can trust",
    summary:
      "An IT helpdesk agent for small offices that looks up devices, spots repeat problems and raises tickets on its own — with permissions enforced in code, not in the prompt.",
    meta: [
      { label: "Role", value: "Designer & engineer" },
      { label: "Type", value: "Own project · open source" },
      { label: "Year", value: "2026" },
      { label: "Stack", value: "Next.js · TypeScript · Claude API · Zod" },
    ],
    results: [
      { value: "8", label: "Tools, each permission-checked" },
      { value: "2", label: "Roles, enforced in code" },
      { value: "0", label: "Trust placed in the prompt" },
    ],
    problem: [
      "A 50–100 person office can't justify an IT service-management suite, but it still needs to track every computer, help non-technical staff fix common problems, and raise a proper ticket when something needs a technician.",
      "The obvious answer is a chatbot. The real problem is making one that can take actions safely.",
    ],
    context: [
      "Users of every age and skill level, describing problems in their own words.",
      "Two roles with very different rights: employees and IT staff.",
      "An LLM can be talked into things, so its output can't be trusted to respect those rights.",
    ],
    role: [
      "Designed and built it end to end: the agent loop, the tools, the permission model, the UI and the data layer.",
    ],
    decisions: [
      { title: "A streamed agent loop", text: "The model gets the conversation and a tool list, asks for tools, the app runs them — in parallel when it can — and the UI shows each step live. A hard limit of eight rounds stops runaway loops." },
      { title: "Permissions in code, twice", text: "Employees are never offered staff-only tools, and every tool checks again before it runs. Even if someone talks the model into asking for another person's device, the tool refuses." },
      { title: "Model output is untrusted input", text: "Every tool call is validated with Zod on top of strict tool schemas before anything executes." },
      { title: "The server owns the conversation", text: "The browser holds only an ID, so it can't rewrite what the model or the tools said earlier." },
      { title: "Failures stay inside the loop", text: "A failed tool returns an error result the model can explain, instead of crashing the conversation; declined requests retry on a fallback model." },
    ],
    tradeoffs: [
      { chose: "Code-enforced permissions", over: "Rules in the system prompt", why: "Prompts can be argued with; code can't. The model is useful, but never the security boundary." },
      { chose: "Server-held conversations", over: "Client-side chat state", why: "A little more storage, in exchange for a history no one can tamper with." },
      { chose: "Parallel tool calls", over: "One tool at a time", why: "Faster answers; every tool is written to be independent so order never matters." },
    ],
    quality: [
      "Scripted scenarios: a repeat-slowness report becomes a ticket; a request for someone else's device is refused.",
      "Typed tools end to end, with validation on every input.",
      "Duplicate-ticket checks before raising anything new.",
    ],
    outcome: [
      "Non-technical staff get plain-language self-help; repeat problems become tickets automatically.",
      "IT staff get fleet-level answers like which machines to replace first.",
      "Every action the agent took is visible under its answer.",
    ],
    next: [
      "Move storage from a JSON file to PostgreSQL behind the same interface.",
      "An evaluation suite that scores the agent's decisions on recorded scenarios.",
      "Single sign-on so it drops into an office's existing accounts.",
    ],
    lesson: "An agent is only as trustworthy as the code around it. Let the model decide — let the code permit.",
    figures: [{ after: "decisions", figure: "agent-loop", caption: "The model proposes; the code checks the role, validates the input and runs the tool. Every step is streamed to the UI." }],
  },
  {
    slug: "native-crm",
    index: "03",
    where: "Vtiger CRM",
    featured: true,
    title: "An enterprise CRM in your pocket",
    emphasis: "in your pocket",
    summary:
      "Owning a field-sales CRM's mobile app end to end as its only engineer — re-platforming it, making it fast and stable, and building the features people use on the road.",
    meta: [
      { label: "Role", value: "Sole mobile engineer" },
      { label: "Scope", value: "iOS + Android, architecture to store" },
      { label: "Years", value: "2023 — 2026" },
      { label: "Stack", value: "Flutter · Dart · Riverpod · Firebase" },
    ],
    results: [
      { value: "2", label: "Platforms, one codebase" },
      { value: "50+", label: "Production issues closed" },
      { value: "4+", label: "Store rating, held" },
    ],
    problem: [
      "Sales teams run their day from the CRM on their phones — checking in at customer sites, scanning documents, picking up leads. The app they had was slow to start and crashed often, and every fix risked breaking something else.",
      "There was one engineer for the whole app. That was me.",
    ],
    context: [
      "Enterprise customers on both iOS and Android, from one Flutter codebase.",
      "Field users with patchy connectivity — the app had to stay useful offline.",
      "Releases couldn't stop while the foundations were rebuilt.",
    ],
    role: [
      "Owned everything: architecture, features, debugging and the full release cycle — build, test and store release.",
      "Worked directly with product and support on what field users needed most.",
    ],
    decisions: [
      { title: "Re-platform in place", text: "Moved the app onto Riverpod and MVVM with separate UI, domain and data layers — screen by screen, so releases kept going out." },
      { title: "Cache first, reconcile later", text: "Reads come from a local cache and refresh in the background, and redundant network calls were removed — the app opens fast even on a weak signal." },
      { title: "Fix by impact", text: "Production issues were triaged by how much they hurt field users, and 50+ were closed — load time down 30% and crashes down 35%." },
      { title: "Field-first features", text: "Geo-fenced check-in and check-out, camera document scanning, and deep links that open the right record." },
      { title: "Push that lands in the right place", text: "Firebase notifications handled in the background and routed through deep links straight to the record they're about." },
    ],
    tradeoffs: [
      { chose: "Incremental re-platform", over: "A full rewrite", why: "Slower to finish, but customers kept getting releases and nothing regressed all at once." },
      { chose: "Cache-first reads", over: "Always-fresh data", why: "Occasionally a few seconds stale — in exchange for an app that opens instantly in a basement car park." },
      { chose: "One Flutter codebase", over: "Two native apps", why: "One engineer could own both platforms properly, with a single architecture to reason about." },
    ],
    quality: [
      "Every release through the same build → test → store pipeline.",
      "Layered architecture made logic testable without the UI.",
      "Stability measured release over release: load time and crash rate tracked, not guessed.",
    ],
    outcome: [
      "Load time down 30% and crash rate down 35%.",
      "A 4+ store rating held through the re-platform.",
      "A maintainable codebase with clear layers instead of a fragile tangle.",
    ],
    next: [
      "Automated integration tests on a device farm before each release.",
      "Feature flags for staged rollouts.",
      "Clearer conflict handling when offline edits meet newer server data.",
    ],
    lesson: "On mobile, speed and stability are features. Field users notice the second a tap doesn't land.",
    figures: [{ after: "decisions", figure: "app-layers", caption: "UI, domain and data layers, with Riverpod wiring them — logic testable without the UI." }],
  },
  {
    slug: "identity",
    index: "04",
    where: "Etta Global",
    featured: true,
    title: "Identity for an ecosystem",
    emphasis: "an ecosystem",
    summary:
      "Single sign-on across four products, sessions people can see and end, and the security review that hardened the platform underneath.",
    meta: [
      { label: "Role", value: "Lead engineer · frontend + API" },
      { label: "Scope", value: "Four products, one identity platform" },
      { label: "Year", value: "2026" },
      { label: "Stack", value: "OAuth 2.0 / OIDC · Next.js · NestJS · PostgreSQL · Redis" },
    ],
    results: [
      { value: "4", label: "Products, one identity" },
      { value: "0", label: "Sessions left behind" },
      { value: "1", label: "Flow, every brand" },
    ],
    problem: [
      "Signing in bounced people to a platform page that looked nothing like the product they came from, and each product kept its own session — so signing out of one left you signed in to the rest.",
      "People also had no way to see where they were signed in, or to end a session on a lost device.",
    ],
    context: [
      "Products on separate domains: no shared cookies to lean on.",
      "One flow everywhere; only the look could change.",
      "Had to survive blocked pop-ups and include multi-factor sign-in.",
    ],
    role: [
      "Owned the identity experience end to end, including the platform APIs it needed.",
      "Led a security review of the identity platform and drove the fixes.",
      "Set the session policy with product and backend, and built device management on top.",
    ],
    decisions: [
      { title: "Pop-up sign-in, redirect fallback", text: "An OAuth 2.0 authorization-code flow in a pop-up so people never lose their place; if it's blocked, the same flow runs as a redirect." },
      { title: "Brand the skin, never the steps", text: "Each product's theme is stored on the server and applied as CSS variables to every auth screen, with the platform mark kept constant." },
      { title: "Isolated, server-held sessions", text: "Each product stores tokens under its own cookie names; secrets stay server-side and the browser carries only a one-time code." },
      { title: "Sessions people can manage", text: "Every sign-in becomes a device session with clear limits. People see their devices, sign one out, or sign out all others. Revocation fails closed: if the cache is down, the database decides." },
      { title: "Step-up for sensitive changes", text: "Changing credentials asks people to confirm it's them again, and a new device triggers an alert." },
    ],
    tradeoffs: [
      { chose: "Pop-up sign-in", over: "Redirect-only", why: "People keep their place. The cost is a brief cross-origin flash, accepted and documented." },
      { chose: "Signing out everywhere", over: "Product-only sign-out", why: "A little friction on the next product, in exchange for no sessions left behind on shared machines." },
      { chose: "Fail closed", over: "Fail open", why: "If the revocation cache is unavailable, check the database rather than trust the session — slower in an outage, never insecure." },
    ],
    quality: [
      "Tested on distinct hosts, because localhost shares one cookie jar across ports and hides SSO bugs.",
      "Return URLs restricted to registered origins, with specs for end-session and redirect rules.",
      "Sign-up, MFA, blocked pop-ups, device revoke and sign-out walked on every product.",
    ],
    outcome: [
      "One identity across four products, with a sign-in that looks native to each.",
      "Signing out anywhere ends the session everywhere; lost devices can be signed out remotely.",
      "Step-up checks, new-device alerts and sign-in history on top.",
    ],
    next: [
      "Back-channel sign-out so products drop sessions the moment the platform does.",
      "Consolidate origins or adopt FedCM to remove the pop-up's redirect flash.",
      "Run the multi-host sign-in suite in CI with Playwright.",
    ],
    lesson: "Identity is a product, not a form. Design what happens after sign-in as carefully as the sign-in itself.",
    figures: [
      { after: "decisions", figure: "sso-flow", caption: "Sign-in runs in a pop-up on the platform's domain, themed as the product. The product's server swaps the code for tokens." },
      { after: "tradeoffs", figure: "sign-out-flow", caption: "Signing out of any product ends the shared session, so the next product asks for a password again." },
    ],
  },
  {
    slug: "platform-shell",
    index: "05",
    where: "Etta Global",
    featured: false,
    title: "One shell, four products",
    emphasis: "four products",
    summary:
      "Architecting the platform's shell so people browse and buy every product in place — each in its own look, with money always handled by the platform and pricing always owned by the product.",
    meta: [
      { label: "Role", value: "Frontend architect & lead" },
      { label: "Scope", value: "Platform shell + three product canvases" },
      { label: "Year", value: "2026" },
      { label: "Stack", value: "Next.js · React · TypeScript · Route handlers" },
    ],
    results: [
      { value: "4", label: "Products, one shell" },
      { value: "6", label: "Shared step-flows" },
      { value: "1", label: "Checkout for the ecosystem" },
    ],
    problem: [
      "The platform account was already the hub for identity, payments and wallets — but buying anything meant leaving for that product's own site. Four checkouts, four looks, four sets of bugs.",
      "The brief: let people browse and buy every product from inside the platform, without the platform turning into a second, out-of-sync copy of each product.",
    ],
    context: [
      "Each product owns its catalogue and pricing; the platform owns money and identity.",
      "The platform's session lives in an httpOnly cookie that page code cannot read — by design.",
      "Design wanted each product to feel like itself inside the shell, not like a platform skin.",
    ],
    role: [
      "Owned the shell's architecture: the product-canvas registry, the theming boundary and the commerce flow.",
      "Built the product canvases and step-flows, and set the rules other engineers follow inside the shell.",
    ],
    decisions: [
      { title: "A registry of product canvases", text: "Each product plugs in as a canvas with its own chrome and screens; the shell provides navigation, cart and the money layer. Adding a product is a registration, not a fork." },
      { title: "Products keep pricing authority", text: "The shell never prices anything. It calls the product through a same-origin, allow-listed proxy, the product creates the order, and the platform charges it." },
      { title: "A deliberate theme boundary", text: "Inside a canvas everything wears the product's palette. Payment, confirmation and receipts always appear as the platform's own modal, so people always know who is taking their money." },
      { title: "One step-flow pattern, six flows", text: "Shop, inventory, pay, security, devices and orders share one step-flow pattern and one state matrix — loading, empty, error, partial and done are designed once, not six times." },
      { title: "Translation that survives React", text: "The shell is translated in place. A small re-translate hook makes dialogs and drawers translate when they open instead of staying in English." },
    ],
    tradeoffs: [
      { chose: "A same-origin, allow-listed proxy", over: "Exposing the session token to page code", why: "One more hop, but the session stays httpOnly and the shell can make only the calls it needs." },
      { chose: "Product price authority", over: "A platform copy of each catalogue", why: "Slower to build, but prices can never drift between a product and the shell." },
      { chose: "Platform-styled payment screens", over: "Fully product-styled checkout", why: "A visible seam, on purpose: money always looks like the platform people trust with it." },
    ],
    quality: [
      "Automated tests for each product canvas and flow.",
      "Every flow walked end to end with real orders and gift-card payments.",
      "Old page URLs deep-link into the right shell screen, so nothing bookmarked breaks.",
    ],
    outcome: [
      "People browse and buy three products from inside the platform, each in its own look.",
      "One checkout and one set of payment screens across the ecosystem.",
      "A pattern the team extends: new products plug in as canvases.",
    ],
    next: [
      "Rebuild the remaining legacy pages on the shell and retire the old routes.",
      "Bring the shell to phones once the desktop layouts settle.",
      "Contract tests on the proxy's allow-listed calls.",
    ],
    lesson: "Draw the ownership lines first — who prices, who charges, who styles — and the architecture follows.",
    figures: [{ after: "decisions", figure: "shell-map", caption: "The shell owns navigation, cart and money. Products own their canvas and their prices, reached through an allow-listed proxy." }],
  },
  {
    slug: "design-architecture",
    index: "06",
    where: "Etta Global",
    featured: false,
    title: "Re-skin everything, break nothing",
    emphasis: "break nothing",
    summary:
      "A layered design architecture — skins, tokens, materials, primitives — that gives a platform a new look and lets 80+ legacy screens migrate one at a time, with no feature freeze.",
    meta: [
      { label: "Role", value: "Frontend architect" },
      { label: "Scope", value: "Platform UI + product theming" },
      { label: "Year", value: "2026" },
      { label: "Stack", value: "Design tokens · CSS variables · React · MUI interop" },
    ],
    results: [
      { value: "80+", label: "Legacy screens kept running" },
      { value: "4", label: "Layers, skin to primitive" },
      { value: "1", label: "Object swaps the whole look" },
    ],
    problem: [
      "The platform needed a new visual direction, but nearly every page imported one shared design module that lived inside a route folder, and over a hundred files used a component library directly.",
      "A rewrite would have frozen feature work for months. The new look had to arrive without stopping anything.",
    ],
    context: [
      "Product teams were shipping weekly; a freeze was off the table.",
      "Each product also needed its own theme on shared screens, such as sign-in.",
      "Accessibility had to become a floor, not a review comment.",
    ],
    role: [
      "Designed the architecture and the migration plan, and agreed the phase order with design and product.",
      "Built the foundation, the first primitives and the live style guide, and reviewed every migrated screen.",
    ],
    decisions: [
      { title: "Four layers, one import surface", text: "Skins hold raw tokens; a provider emits them as CSS variables; materials turn them into reusable recipes; primitives compose those. Screens import only primitives and own zero visual values." },
      { title: "A compatibility layer instead of a rewrite", text: "The old design module keeps its exports but points them at the new tokens through a legacy skin, so 80+ pages render unchanged on day one and migrate one at a time." },
      { title: "One proving ground first", text: "Auth screens were the first real consumer — visible, contained and shared by every product — before anything else moved." },
      { title: "Runtime theming per product", text: "Products swap theme without a rebuild, so one build serves every brand." },
      { title: "A live style guide", text: "Every primitive and material lives on a review page the design lead signs off before it reaches a screen." },
    ],
    tradeoffs: [
      { chose: "Keep the component library, wrap it", over: "Rip it out", why: "A hundred-plus files depended on it. Wrapping let screens migrate on their own schedule instead of all at once." },
      { chose: "A compatibility layer", over: "A blanket find-and-replace", why: "Slower to finish, but a sweep would have broken code that parses colour strings. Everything kept working." },
      { chose: "Auth-first scope", over: "Migrate everything in parallel", why: "Proving the kit on one high-traffic area first made every later screen cheaper and safer." },
    ],
    quality: [
      "Zero visual change verified for the compatibility phase before any new look shipped.",
      "Contrast, focus states and reduced motion built into the foundation layer.",
      "Design sign-off on the style guide; code review on every migrated screen.",
    ],
    outcome: [
      "A new visual direction without a feature freeze.",
      "Legacy screens keep shipping while they migrate one by one.",
      "Brand and product themes are token changes, not hunts through hard-coded values.",
    ],
    next: [
      "Visual regression tests per skin and theme.",
      "Publish the primitives with usage docs for every team.",
      "Retire the compatibility layer as the last screens move.",
    ],
    lesson: "Migrations succeed when the old world keeps working. Build the bridge before you build the new road.",
    figures: [{ after: "decisions", figure: "layer-stack", caption: "Screens compose primitives; primitives use materials; materials read tokens; a skin supplies the tokens. Swap the skin and everything follows." }],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
export const featuredCaseStudies = caseStudies.filter((c) => c.featured);
