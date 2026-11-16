import Reveal from "./Reveal";

/** Section header: mono index + title with one italic display word. */
export default function SectionHeading({
  index,
  title,
  emphasis,
  subtitle,
}: {
  index: string;
  title: string;
  /** A word inside `title` to set in the italic display face. */
  emphasis?: string;
  subtitle?: string;
}) {
  const parts = emphasis ? title.split(emphasis) : [title];
  return (
    <Reveal className="mb-14 grid gap-6 border-t hairline pt-8 md:grid-cols-[180px_1fr]">
      <p className="label pt-3">({index})</p>
      <div>
        <h2 className="text-[clamp(2.2rem,4.6vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
          {parts[0]}
          {emphasis && (
            <span className="font-display font-normal italic tracking-[-0.01em]">{emphasis}</span>
          )}
          {parts[1]}
        </h2>
        {subtitle && <p className="mt-4 max-w-xl text-muted">{subtitle}</p>}
      </div>
    </Reveal>
  );
}
