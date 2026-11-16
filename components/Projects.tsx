import Image from "next/image";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { Spotlight } from "./ui";
import { projects, type Project } from "@/lib/site";

const statusDot: Record<Project["status"], string> = {
  Live: "bg-holo-1",
  Built: "bg-holo-3",
  "Open source": "bg-holo-2",
  "In progress": "bg-holo-4",
  Planned: "bg-faint",
};

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        index="02"
        title="Things I built on my own time"
        emphasis="my own time"
        subtitle="Side projects, built end to end — product, design, frontend, backend and tests."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={(i % 2) * 90}>
            <Spotlight as="article" className="group flex h-full flex-col overflow-hidden rounded-3xl">
              <Shot project={project} />

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold tracking-tight">{project.title}</h3>
                  <span className="label mt-1.5 inline-flex shrink-0 items-center gap-2 !text-[0.65rem]">
                    <span className={`h-1.5 w-1.5 rounded-full ${statusDot[project.status]}`} />
                    {project.status}
                  </span>
                </div>
                <p className="mt-3 flex-1 leading-relaxed text-muted">{project.blurb}</p>
                <p className="label mt-5 leading-6 !text-[0.65rem]">{project.tags.join("  ·  ")}</p>

                {(project.href || project.repo) && (
                  <div className="mt-6 flex gap-2 border-t hairline pt-5">
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-flex min-h-10 items-center rounded-full px-5 text-sm font-semibold"
                      >
                        <span className="relative z-10">Live site ↗</span>
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-10 items-center rounded-full border hairline px-5 text-sm transition-colors hover:border-fg/40"
                      >
                        Source ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            </Spotlight>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/** Screenshot in a minimal browser frame; a foil placeholder when there's none. */
function Shot({ project }: { project: Project }) {
  const [src, alt2] = project.images ?? [];
  return (
    <div className="relative border-b hairline bg-surface-2 p-3 pb-0 sm:p-4 sm:pb-0">
      <div className="overflow-hidden rounded-t-xl border border-b-0 hairline bg-bg">
        <div className="flex items-center gap-1.5 border-b hairline px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-fg/15" />
          <span className="h-2 w-2 rounded-full bg-fg/15" />
          <span className="h-2 w-2 rounded-full bg-fg/15" />
          <span className="label ml-3 truncate !text-[0.6rem]">
            {project.href ? project.href.replace(/^https?:\/\//, "").replace(/\/$/, "") : project.title.toLowerCase().replace(/\s+/g, "-")}
          </span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          {src ? (
            <Image
              src={src}
              alt={`Screenshot of ${project.title}`}
              fill
              sizes="(min-width: 768px) 560px, 100vw"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          ) : null}
          {src && alt2 ? (
            // Second screen fades in on hover.
            <Image
              src={alt2}
              alt={`Another screen of ${project.title}`}
              fill
              sizes="(min-width: 768px) 560px, 100vw"
              className="object-cover object-top opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
            />
          ) : null}
          {src ? null : (
            <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,color-mix(in_srgb,var(--color-holo-3)_25%,transparent),transparent_60%),radial-gradient(circle_at_80%_80%,color-mix(in_srgb,var(--color-holo-1)_20%,transparent),transparent_55%)]">
              <span className="px-6 text-center font-display text-[clamp(2rem,6vw,3rem)] italic leading-none text-fg/80">{project.title}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
