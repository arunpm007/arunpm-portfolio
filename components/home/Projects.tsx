import Image from "next/image";
import BoldSectionLabel from "./BoldSectionLabel";
import Reveal from "../Reveal";
import { Parallax } from "../motion/Motion";
import { projects } from "@/lib/site";

/** The visual-first work grid — owns #work. Cards parallax on scroll and swap
 *  to a second screen on hover (the dark-mode shot "comes in"). */
export default function Projects() {
  return (
    <section id="work" className="mx-auto max-w-[1280px] scroll-mt-16 px-4 py-16 sm:px-6 sm:py-24">
      <BoldSectionLabel index="01" label="Selected work" scrawl="less talk, more proof" rot="-2deg" />

      <div className="grid gap-x-7 gap-y-14 md:grid-cols-2">
        {projects.map((p, i) => {
          const [img, img2] = p.images ?? [];
          const primary = p.href ?? p.repo;
          return (
            <Reveal key={p.title} as="article" className="group relative" delay={(i % 2) * 80}>
              <span
                className="tape hidden h-6 w-24 sm:block"
                style={{
                  top: "-0.6rem",
                  left: i % 2 ? "auto" : "1.5rem",
                  right: i % 2 ? "1.5rem" : "auto",
                  transform: `rotate(${i % 2 ? 8 : -7}deg)`,
                }}
                aria-hidden="true"
              />
              <a
                href={primary}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block aspect-[16/10] overflow-hidden border-2 border-fg/15 bg-surface shadow-[6px_6px_0_rgba(0,0,0,0.5)] transition-[border-color,transform] duration-200 group-hover:-translate-y-1 group-hover:border-signal"
                aria-label={`${p.title} — open ${p.href ? "live site" : "source"}`}
              >
                {img && (
                  <Parallax amount={8} className="absolute inset-[-6%_0] wipe">
                    <Image
                      src={img}
                      alt=""
                      fill
                      sizes="(min-width:768px) 600px, 100vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    {img2 && (
                      <Image
                        src={img2}
                        alt=""
                        fill
                        sizes="(min-width:768px) 600px, 100vw"
                        className="object-cover object-top opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      />
                    )}
                  </Parallax>
                )}
                <span className="sticker absolute left-3 top-3 z-10 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em]">
                  {p.status}
                </span>
                {p.hoverHint === "theme" && (
                  <span className="label absolute right-3 top-3 z-10 bg-bg/80 px-2 py-1 !text-[0.58rem]">
                    <span className="group-hover:hidden">☀ hover for dark</span>
                    <span className="hidden text-signal group-hover:inline">☾ dark mode</span>
                  </span>
                )}
              </a>
              <div className="mt-5 flex items-start justify-between gap-4">
                <h3 className="display text-3xl sm:text-4xl">{p.title}</h3>
                <div className="flex shrink-0 gap-4 pt-2 font-mono text-[0.72rem] uppercase tracking-[0.1em]">
                  {p.href && (
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className="text-signal hover:text-fg">Live ↗</a>
                  )}
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg">Code ↗</a>
                  )}
                </div>
              </div>
              <p className="label mt-3">{p.tags.slice(0, 4).join(" · ")}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
