import { LineReveal } from "../motion/Motion";

/** `01 — LABEL` rule + a display title that line-reveals on scroll. */
export default function SectionHeader({
  index,
  label,
  title,
  aside,
  compact = false,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
  /** Tighter spacing, for headers inside a pinned stage. */
  compact?: boolean;
}) {
  return (
    <header className={compact ? "mb-6" : "mb-14 sm:mb-20"}>
      <div className="flex items-center gap-4 border-t hairline pt-5">
        <span className="label !text-fg">{index}</span>
        <span className="h-px w-8 bg-signal" />
        <span className="label">{label}</span>
      </div>
      <div className={`${compact ? "mt-5" : "mt-8"} grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end`}>
        <LineReveal as="h2" className={`display ${compact ? "text-[clamp(2.6rem,5.4vw,5rem)]" : "text-[clamp(2.8rem,7vw,6.5rem)]"}`}>
          {title}
        </LineReveal>
        {aside && <div className="max-w-sm text-lg leading-relaxed text-muted">{aside}</div>}
      </div>
    </header>
  );
}
