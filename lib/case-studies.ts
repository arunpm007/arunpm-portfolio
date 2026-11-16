// ------------------------------------------------------------------
//  Case studies. Each one is a list of blocks rendered by
//  app/work/[slug]/page.tsx. Keep details at a level that is safe to
//  publish: approach and lessons, never internal code or exploit steps.
// ------------------------------------------------------------------

export type Figure = "sso-flow" | "sign-out-flow" | "asset-bars" | "tier-ladder";

export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "steps"; items: { title: string; text: string }[] }
  | { type: "lessons"; items: { title: string; text: string }[] }
  | { type: "figure"; figure: Figure; caption: string }
  | { type: "quote"; text: string };

export type CaseStudy = {
  slug: string;
  index: string;
  title: string;
  /** Words in the title to set in the italic holo display face. */
  emphasis: string;
  summary: string;
  meta: { label: string; value: string }[];
  results: { value: string; label: string }[];
  blocks: Block[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "single-sign-on",
    index: "01",
    title: "One sign-in for four products",
    emphasis: "four products",
    summary:
      "Building single sign-on across identity, payments, gaming and digital-collectible products — a sign-in that feels native to each product, and a sign-out that actually signs you out everywhere.",
    meta: [
      { label: "Role", value: "Lead engineer, frontend + API" },
      { label: "Scope", value: "Four connected consumer products" },
      { label: "Year", value: "2026" },
      { label: "Stack", value: "Next.js · NestJS · OAuth 2.0 / OIDC · PostgreSQL · Redis" },
    ],
    results: [
      { value: "4", label: "products on one account" },
      { value: "1", label: "sign-in flow, many brands" },
      { value: "0", label: "sessions left behind on sign-out" },
    ],
    blocks: [
      { type: "h2", text: "The problem" },
      {
        type: "p",
        text: "Four consumer products share one account platform that handles identity and payments. Signing in used to bounce people to a site that looked nothing like the product they came from. Each product kept its own session, so signing out of one left you signed in to the others — a real risk on a shared computer.",
      },
      {
        type: "p",
        text: "The products live on different domains, so they can't share cookies. The flow had to be identical everywhere; only the look could change. And it had to keep working when the browser blocks pop-ups.",
      },
      { type: "h2", text: "What I built" },
      {
        type: "figure",
        figure: "sso-flow",
        caption:
          "Sign-in happens in a pop-up on the platform's domain, themed as the product. The product's server swaps the code for tokens; the browser never sees a secret.",
      },
      {
        type: "steps",
        items: [
          {
            title: "Pop-up sign-in with a redirect fallback",
            text: "A standard OAuth 2.0 authorization-code flow, opened in a pop-up so you never leave the product. If the pop-up is blocked, the same flow runs as a full-page redirect and returns you to where you were.",
          },
          {
            title: "Branded per product, identical everywhere",
            text: "Each product's theme — colours, type and logo — is stored on the server and applied as CSS variables to every auth screen. A co-branded lockup keeps the platform mark constant, so people always know who holds their password. The UX never diverges; only the skin does.",
          },
          {
            title: "MFA inside the same flow",
            text: "Multi-factor completion happens in the same pop-up, so a second factor never breaks the hand-back to the product.",
          },
          {
            title: "Separate cookies per product",
            text: "Every product stores its tokens under its own cookie names, so one product can never read — or accidentally clear — another product's session.",
          },
          {
            title: "Global sign-out",
            text: "An end-session endpoint clears the platform session as well as the product's, then returns only to an origin the product registered in advance — so it can't be turned into an open redirect.",
          },
        ],
      },
      {
        type: "figure",
        figure: "sign-out-flow",
        caption: "Signing out of any product ends the shared platform session, so the next product asks for a password again.",
      },
      { type: "h2", text: "Account security" },
      {
        type: "p",
        text: "Alongside sign-in I added signed-in device management with remote sign-out, step-up \"confirm it's you\" checks before sensitive changes, new-device alerts and sign-in history.",
      },
      { type: "h2", text: "What I learned" },
      {
        type: "lessons",
        items: [
          {
            title: "Localhost lies about cookies",
            text: "Browsers key cookies by host, not port, so every app on localhost shares one cookie jar. Sessions that look shared locally are separate in production, and real SSO bugs hide. We moved local testing to distinct hosts to behave like production.",
          },
          {
            title: "Keep the UX fixed and theme the rest",
            text: "Letting each product restyle sign-in, but never re-order or re-word it, kept four brands consistent without four codebases.",
          },
        ],
      },
    ],
  },
  {
    slug: "performance",
    index: "02",
    title: "From 191 MB to 53 MB without losing the magic",
    emphasis: "the magic",
    summary:
      "Making a 3D-heavy marketplace load fast on everyday phones — an asset diet, device tiering for the 3D hero, and a WebGL bug that only appeared in production.",
    meta: [
      { label: "Role", value: "Lead engineer" },
      { label: "Scope", value: "3D trading-card marketplace" },
      { label: "Year", value: "2026" },
      { label: "Stack", value: "Next.js · React Three Fiber · Three.js · WebP / AVIF" },
    ],
    results: [
      { value: "−72%", label: "static assets, 191 → 53 MB" },
      { value: "−93%", label: "card art, 8.4 → 0.6 MB" },
      { value: "1", label: "WebGL canvas, crash-free" },
    ],
    blocks: [
      { type: "h2", text: "The problem" },
      {
        type: "p",
        text: "A digital trading-card marketplace with a 3D pack-opening moment. It looked great on a fast laptop, but its static assets had grown to 191 MB and card art alone weighed 8.4 MB. On an ordinary phone the first visit was slow and the 3D scene struggled.",
      },
      { type: "h2", text: "What I did" },
      {
        type: "steps",
        items: [
          {
            title: "Measure first",
            text: "I listed every static asset by size and by where it was actually used. Most of the weight was a small number of oversized images, plus files nothing referenced any more.",
          },
          {
            title: "An image diet",
            text: "Card art was re-encoded as WebP and AVIF at the sizes it is actually displayed, with responsive sources so a phone never downloads desktop pixels. Unused files went.",
          },
          {
            title: "Tier the 3D by GPU, not by screen size",
            text: "The 3D hero reads what the GPU can do and picks a quality tier — geometry detail, pixel ratio and effects — with a still image for software renderers and the weakest devices. A big screen with a weak GPU gets the light version; a small phone with a strong one doesn't miss out.",
          },
          {
            title: "Protect the first paint",
            text: "The hero image loads with priority and the 3D scene starts after it, so the page is readable before WebGL spins up.",
          },
        ],
      },
      {
        type: "figure",
        figure: "asset-bars",
        caption: "Before and after, to scale.",
      },
      {
        type: "figure",
        figure: "tier-ladder",
        caption: "Quality tiers for the 3D hero. This portfolio's own hero card uses the same approach.",
      },
      { type: "h2", text: "A bug that only showed up in production" },
      {
        type: "p",
        text: "After a library upgrade, a 3D animation silently stopped playing in production while looking fine locally. The cause was a React effect that depended on a value the 3D library recreated on every update, so it re-ran in a loop; an error boundary then swapped in a static fallback. Depending on stable values instead fixed it — and finding it meant reproducing the production build exactly.",
      },
      {
        type: "quote",
        text: "A clean console isn't proof that motion works. Test the motion itself.",
      },
      { type: "h2", text: "What I learned" },
      {
        type: "lessons",
        items: [
          {
            title: "Budgets beat clean-ups",
            text: "A one-off diet slowly undoes itself. Per-type size budgets keep assets honest after the clean-up.",
          },
          {
            title: "Fallbacks can hide failures",
            text: "Error boundaries keep a page alive, which is good — but log loudly when one fires, or a crash looks like a design choice.",
          },
          {
            title: "Reproduce the real build",
            text: "Same branch, same library versions, production mode. Anything else is a different app.",
          },
        ],
      },
    ],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
