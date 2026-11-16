// What's printed on the hero card. Shared by the WebGL card (drawn to a
// canvas texture) and the HTML fallback card, so the two always match.

export const card = {
  serial: "No. 001",
  edition: "Portfolio · 2026",
  name: "Arun P M",
  role: "Senior Frontend Lead Engineer",
  stats: [
    { value: "3.5 yrs", label: "Shipping" },
    { value: "5", label: "Team led" },
    { value: "−72%", label: "Asset weight" },
  ],
  footerLeft: "Bangalore, IN",
  footerRight: "Since 2023",
  back: {
    title: "Field notes",
    rows: [
      { label: "Frontend", value: "React · Next.js · TypeScript" },
      { label: "3D", value: "Three.js · R3F · GLSL" },
      { label: "Systems", value: "Design tokens · WCAG AA" },
      { label: "Auth", value: "OAuth / OIDC · SSO · MFA" },
      { label: "Backend", value: "NestJS · PostgreSQL · Redis" },
      { label: "Mobile", value: "Flutter · React Native" },
    ],
    hint: "Click the card to flip it back",
  },
};
