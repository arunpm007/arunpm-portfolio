// Diagrams for the case studies. Plain SVG/HTML drawn with the site tokens
// so they stay sharp at any size and need no image files.

import type { Figure } from "@/lib/case-studies";

const FG = "var(--color-fg)";
const MUTED = "var(--color-muted)";
const LINE = "var(--color-line)";
const SURFACE = "var(--color-surface-2)";
const SIGNAL = "var(--color-signal)";
const mono = { fontFamily: "var(--font-mono)", letterSpacing: "0.06em" } as const;
const sans = { fontFamily: "var(--font-sans)" } as const;

/** Sequence diagram: lanes + numbered messages. */
function Sequence({
  id,
  lanes,
  steps,
  height,
}: {
  id: string;
  lanes: string[];
  steps: { from: number; to: number; label: string; note?: string }[];
  height: number;
}) {
  const W = 760;
  const laneX = (i: number) => 90 + i * ((W - 180) / (lanes.length - 1));
  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="h-auto w-full" role="img" aria-label={steps.map((s, i) => `${i + 1}. ${s.label}`).join(". ")}>
      <defs>
        <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill={MUTED} />
        </marker>
      </defs>
      {lanes.map((lane, i) => (
        <g key={lane}>
          <rect x={laneX(i) - 72} y={14} width={144} height={40} fill={i === 1 ? SIGNAL : SURFACE} stroke={i === 1 ? SIGNAL : LINE} />
          <text x={laneX(i)} y={39} textAnchor="middle" fill={i === 1 ? "#0b0b0c" : FG} fontSize={13} fontWeight={i === 1 ? 700 : 400} style={mono}>
            {lane.toUpperCase()}
          </text>
          <line x1={laneX(i)} y1={58} x2={laneX(i)} y2={height - 10} stroke={LINE} strokeDasharray="3 5" />
        </g>
      ))}
      {steps.map((s, i) => {
        const y = 96 + i * 46;
        const x1 = laneX(s.from);
        const x2 = laneX(s.to);
        const self = s.from === s.to;
        const mid = (x1 + x2) / 2;
        const bx = self ? x1 - 16 : Math.min(x1, x2) - 16;
        return (
          <g key={i}>
            {self ? (
              <path d={`M${x1} ${y - 8} h34 v16 h-30`} fill="none" stroke={MUTED} strokeWidth={1.2} markerEnd={`url(#${id}-arrow)`} />
            ) : (
              <line x1={x1} y1={y} x2={x2 + (x2 > x1 ? -4 : 4)} y2={y} stroke={MUTED} strokeWidth={1.2} markerEnd={`url(#${id}-arrow)`} />
            )}
            <rect x={bx - 10} y={y - 10} width={20} height={20} fill={SIGNAL} />
            <text x={bx} y={y + 4} textAnchor="middle" fontSize={11} fill="#0b0b0c" style={{ ...mono, fontWeight: 700 }}>
              {i + 1}
            </text>
            <text x={self ? x1 + 44 : mid} y={y - 9} textAnchor={self ? "start" : "middle"} fontSize={13} fill={FG} style={sans}>
              {s.label}
            </text>
            {s.note && (
              <text x={self ? x1 + 44 : mid} y={y + 18} textAnchor={self ? "start" : "middle"} fontSize={10.5} fill={MUTED} style={mono}>
                {s.note.toUpperCase()}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function SsoFlow() {
  return (
    <Sequence
      id="sso"
      height={460}
      lanes={["Product", "Sign-in pop-up", "Product server"]}
      steps={[
        { from: 0, to: 1, label: "Open pop-up on the platform", note: "falls back to redirect if blocked" },
        { from: 1, to: 1, label: "Themed as the product", note: "server-stored theme → CSS vars" },
        { from: 1, to: 1, label: "Password, then MFA", note: "same window, no hand-off" },
        { from: 1, to: 0, label: "Return a one-time code", note: "only to a registered origin" },
        { from: 0, to: 2, label: "Swap code for tokens", note: "secret stays on the server" },
        { from: 2, to: 0, label: "Set product-only cookies", note: "own names per product" },
        { from: 0, to: 0, label: "Pop-up closes, you're in" },
      ]}
    />
  );
}

function SignOutFlow() {
  return (
    <Sequence
      id="signout"
      height={330}
      lanes={["Product", "Platform", "Other products"]}
      steps={[
        { from: 0, to: 1, label: "End session", note: "product + platform" },
        { from: 1, to: 1, label: "Clear the shared session" },
        { from: 1, to: 0, label: "Back to a registered origin", note: "never an open redirect" },
        { from: 2, to: 1, label: "Next sign-in asks again", note: "no silent re-entry" },
      ]}
    />
  );
}

function AssetBars() {
  const rows = [
    { label: "Static assets", before: 191, after: 53, unit: "MB" },
    { label: "Card art", before: 8.4, after: 0.6, unit: "MB" },
  ];
  return (
    <div className="space-y-10">
      {rows.map((r) => {
        const pct = Math.round((1 - r.after / r.before) * 100);
        return (
          <div key={r.label}>
            <div className="flex items-baseline justify-between">
              <p className="label">{r.label}</p>
              <p className="display text-5xl text-signal">−{pct}%</p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-3">
                <span className="label w-14 shrink-0 !text-[0.6rem]">Before</span>
                <div className="flex h-9 flex-1 items-center justify-end bg-fg/12 px-3">
                  <span className="label !text-fg">{r.before} {r.unit}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="label w-14 shrink-0 !text-[0.6rem]">After</span>
                <div className="flex h-9 flex-1 items-center gap-3">
                  <div className="h-full bg-signal" style={{ width: `${Math.max((r.after / r.before) * 100, 1.5)}%` }} />
                  <span className="label !text-fg">{r.after} {r.unit}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TierLadder() {
  const tiers = [
    { name: "High", gpu: "Discrete / modern integrated GPU", gets: "Full detail · pixel ratio up to 2 · all effects" },
    { name: "Mid", gpu: "Mobile GPU on a touch device", gets: "Capped pixel ratio · lighter effects" },
    { name: "Low", gpu: "Software renderer · reduced motion · no WebGL", gets: "Static card in HTML + CSS" },
  ];
  return (
    <div className="border-y hairline">
      {tiers.map((t, i) => (
        <div key={t.name} className={`grid gap-2 py-5 sm:grid-cols-[120px_1fr_1fr] sm:gap-6 ${i > 0 ? "border-t hairline" : ""}`}>
          <p className={`display text-4xl ${i === 0 ? "text-signal" : ""}`}>{t.name}</p>
          <p className="text-muted">{t.gpu}</p>
          <p>{t.gets}</p>
        </div>
      ))}
    </div>
  );
}

function LayerStack() {
  const layers = [
    { name: "Screens", note: "compose primitives · own zero visual values" },
    { name: "Primitives", note: "Panel · Button · Input · Dialog …" },
    { name: "Materials", note: "reusable surface & depth recipes" },
    { name: "Tokens", note: "CSS variables emitted by a provider" },
    { name: "Skin", note: "one object — swap it, everything follows", signal: true },
  ];
  return (
    <div className="space-y-2">
      {layers.map((l, i) => (
        <div
          key={l.name}
          className={`flex items-center justify-between gap-4 border px-5 py-4 ${l.signal ? "border-signal bg-signal text-bg" : "hairline bg-bg/40"}`}
          style={{ marginInline: `${i * 2.5}%` }}
        >
          <span className="display text-2xl">{l.name}</span>
          <span className={`text-right font-mono text-[0.7rem] uppercase tracking-[0.1em] ${l.signal ? "text-bg/80" : "text-muted"}`}>{l.note}</span>
        </div>
      ))}
      <p className="label pt-3">+ A compatibility skin points the legacy design module at the same tokens</p>
    </div>
  );
}

function ShellMap() {
  const canvases = ["Identity product", "Card game", "Collectibles game"];
  return (
    <div className="space-y-4">
      <div className="border border-signal p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="label !text-signal">Platform shell</span>
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted">navigation · cart · identity · money</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {canvases.map((c) => (
            <div key={c} className="border hairline bg-bg/50 p-4">
              <p className="display text-xl">{c}</p>
              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted">own canvas · own look</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 bg-signal px-4 py-3 text-bg">
          <span className="display text-xl">Payment modal</span>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-bg/80">always the platform&apos;s look</span>
        </div>
      </div>
      <div className="grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <div className="border hairline p-4">
          <p className="label">Same-origin proxy</p>
          <p className="mt-1 text-sm text-muted">Allow-listed calls only · session stays httpOnly</p>
        </div>
        <span aria-hidden="true" className="display text-center text-3xl text-signal">⇄</span>
        <div className="border hairline p-4">
          <p className="label">Product APIs</p>
          <p className="mt-1 text-sm text-muted">Own catalogue · own pricing · create the order</p>
        </div>
      </div>
    </div>
  );
}

export default function CaseFigure({ figure }: { figure: Figure }) {
  switch (figure) {
    case "sso-flow":
      return <SsoFlow />;
    case "sign-out-flow":
      return <SignOutFlow />;
    case "asset-bars":
      return <AssetBars />;
    case "tier-ladder":
      return <TierLadder />;
    case "layer-stack":
      return <LayerStack />;
    case "shell-map":
      return <ShellMap />;
  }
}
