import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mb-12">
      <div className="flex items-center gap-3 text-accent">
        <span className="font-heading text-sm font-semibold">{index}</span>
        <span className="h-[1px] w-10 bg-accent/50" />
      </div>
      <h2 className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-xl text-muted">{subtitle}</p>
      )}
    </Reveal>
  );
}
