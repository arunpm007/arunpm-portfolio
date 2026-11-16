import { LineReveal } from "../motion/Motion";

/** `01 — LABEL` rule + a display title that line-reveals on scroll. */
export default function SectionHeader({
  index,
  label,
  title,
  aside,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <header className="mb-14 sm:mb-20">
      <div className="flex items-center gap-4 border-t hairline pt-5">
        <span className="label !text-fg">{index}</span>
        <span className="h-px w-8 bg-signal" />
        <span className="label">{label}</span>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <LineReveal as="h2" className="display text-[clamp(2.8rem,7vw,6.5rem)]">
          {title}
        </LineReveal>
        {aside && <div className="max-w-sm text-lg leading-relaxed text-muted">{aside}</div>}
      </div>
    </header>
  );
}
