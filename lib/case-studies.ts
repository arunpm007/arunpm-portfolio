// ------------------------------------------------------------------
//  Case studies, in the structure hiring teams read for:
//  Problem → Context → My role → Decisions → Tradeoffs → Quality →
//  Outcome → Next. Written at architecture level: ownership, decisions
//  and their consequences. Publish-safe: no employer product names, no
//  internal code, no exploit details, no invented numbers.
// ------------------------------------------------------------------

export type Figure = "shell-map" | "sso-flow" | "sign-out-flow" | "tier-ladder" | "asset-bars" | "layer-stack";

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
    slug: "platform-shell",
    index: "01",
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
    slug: "identity",
    index: "02",
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
    slug: "realtime-3d",
    index: "03",
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
    slug: "design-architecture",
    index: "04",
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
