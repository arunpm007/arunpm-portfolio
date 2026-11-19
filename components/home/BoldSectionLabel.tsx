/**
 * Bold section label — a rotated sticker index + a hairline rule + an optional
 * handwritten aside. Replaces SectionHeader for the collage-styled home
 * sections. Server component (no interactivity).
 */
export default function BoldSectionLabel({
  index,
  label,
  scrawl,
  rot = "-2deg",
}: {
  index: string;
  label: string;
  scrawl?: string;
  rot?: string;
}) {
  return (
    <div className="mb-12 flex flex-wrap items-center gap-4">
      <span className="sticker label inline-block px-3 py-1.5" style={{ transform: `rotate(${rot})` }}>
        {index} — {label}
      </span>
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
      {scrawl && (
        <span className="scrawl text-2xl text-muted">{scrawl} →</span>
      )}
    </div>
  );
}
