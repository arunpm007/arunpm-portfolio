import Image from "next/image";
import SectionHeader from "./SectionHeader";
import Reveal from "../Reveal";
import { Parallax } from "../motion/Motion";
import { projects, type Project } from "@/lib/site";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-[1280px] scroll-mt-16 px-4 py-28 sm:px-6 sm:py-36">
      <SectionHeader
        index="05"
        label="Side projects"
        title={
          <>
            Built on my own time<span className="text-signal">.</span>
          </>
        }
        aside="Product, design, frontend, backend and tests — end to end."
      />

      <div className="grid gap-x-6 gap-y-16 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 90}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [src, alt2] = project.images ?? [];
  const primary = project.href ?? project.repo;
  return (
    <article className="group">
      <a
        href={primary}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-[16/10] overflow-hidden border hairline bg-surface"
        aria-label={`${project.title} — open ${project.href ? "live site" : "source"}`}
      >
        {src && (
          <Parallax amount={8} className="absolute inset-[-6%_0]">
            <Image src={src} alt="" fill sizes="(min-width: 768px) 620px, 100vw" className="object-cover object-top" />
            {alt2 && (
              <Image
                src={alt2}
                alt=""
                fill
                sizes="(min-width: 768px) 620px, 100vw"
                className="object-cover object-top opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            )}
          </Parallax>
        )}
        <span className="absolute left-4 top-4 bg-bg/85 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em]">
          {project.status}
        </span>
      </a>
      <div className="mt-6 flex items-start justify-between gap-6">
        <h3 className="display text-4xl">{project.title}</h3>
        <div className="flex shrink-0 gap-4 pt-2 font-mono text-[0.72rem] uppercase tracking-[0.1em]">
          {project.href && (
            <a href={project.href} target="_blank" rel="noopener noreferrer" className="text-signal hover:text-fg">
              Live ↗
            </a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg">
              Code ↗
            </a>
          )}
        </div>
      </div>
      <p className="mt-3 line-clamp-3 max-w-xl leading-relaxed text-muted">{project.blurb}</p>
      <p className="label mt-4">{project.tags.slice(0, 4).join(" · ")}</p>
    </article>
  );
}
