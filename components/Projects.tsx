import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { projects } from "@/lib/site";

const statusStyles: Record<string, string> = {
  Live: "border-accent/40 bg-accent/10 text-accent-soft",
  Built: "border-violet-400/30 bg-violet-400/10 text-violet-300",
  "Open source": "border-sky-400/30 bg-sky-400/10 text-sky-300",
  "In progress": "border-amber-400/30 bg-amber-400/10 text-amber-300",
  Planned: "border-border bg-surface-2/60 text-faint",
};

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        index="02"
        title="Projects"
        subtitle="Side projects — full-stack products and 3D tooling, built end to end."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 80}>
            <article className="card group flex h-full flex-col rounded-2xl p-6 sm:p-7">
              <div className="mb-4 flex items-start justify-between gap-4">
                <h3 className="font-heading text-lg font-bold leading-snug">
                  {project.title}
                </h3>
                <span
                  className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] ${
                    statusStyles[project.status]
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <p className="flex-1 text-sm leading-relaxed text-muted">
                {project.blurb}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-surface-2/50 px-2.5 py-1 text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {(project.href || project.repo) && (
                <div className="mt-5 flex gap-4 text-sm">
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer text-accent transition-colors hover:text-accent-soft"
                    >
                      Live demo →
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer text-muted transition-colors hover:text-fg"
                    >
                      Code →
                    </a>
                  )}
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
