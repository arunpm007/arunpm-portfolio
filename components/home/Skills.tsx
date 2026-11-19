import {
  siReact,
  siNextdotjs,
  siTypescript,
  siJavascript,
  siTailwindcss,
  siThreedotjs,
  siGreensock,
  siFlutter,
  siDart,
  siFirebase,
  siNodedotjs,
  siNestjs,
  siPostgresql,
  siRedis,
  siSupabase,
  siGit,
  siVite,
  siVitest,
  siFigma,
} from "simple-icons";
import BoldSectionLabel from "./BoldSectionLabel";
import Reveal from "../Reveal";

type SimpleIcon = { title: string; path: string };
type Item = { icon: SimpleIcon; label?: string };

const GROUPS: { label: string; items: Item[] }[] = [
  {
    label: "Frontend",
    items: [
      { icon: siReact },
      { icon: siNextdotjs },
      { icon: siTypescript },
      { icon: siJavascript },
      { icon: siTailwindcss, label: "Tailwind" },
    ],
  },
  {
    label: "3D & motion",
    items: [{ icon: siThreedotjs }, { icon: siGreensock, label: "GSAP" }],
  },
  {
    label: "Mobile",
    items: [{ icon: siFlutter }, { icon: siDart }, { icon: siFirebase }],
  },
  {
    label: "Backend & data",
    items: [
      { icon: siNodedotjs },
      { icon: siNestjs },
      { icon: siPostgresql },
      { icon: siRedis },
      { icon: siSupabase },
    ],
  },
  {
    label: "Tooling",
    items: [{ icon: siGit }, { icon: siVite }, { icon: siVitest }, { icon: siFigma }],
  },
];

function Logo({ icon, label }: Item) {
  const name = label ?? icon.title;
  return (
    <div className="group/skill flex flex-col items-center gap-1.5" title={name}>
      <div className="flex h-14 w-14 items-center justify-center border hairline bg-surface text-fg transition-all duration-200 group-hover/skill:-translate-y-1 group-hover/skill:border-signal group-hover/skill:text-signal">
        <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="currentColor" role="img" aria-label={name}>
          <title>{name}</title>
          <path d={icon.path} />
        </svg>
      </div>
      <span className="label !text-[0.55rem]">{name}</span>
    </div>
  );
}

/** The toolkit — real self-hosted logos (simple-icons), mono to match the
 *  palette, lighting up to signal on hover. Compact 2-up layout. Server-only. */
export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-[1280px] scroll-mt-16 px-4 py-16 sm:px-6 sm:py-24">
      <BoldSectionLabel index="03" label="Skills" scrawl="the toolkit" rot="-1.5deg" />

      <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
        {GROUPS.map((g, gi) => (
          <Reveal key={g.label} delay={(gi % 2) * 60}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
              <p className="label w-28 shrink-0 pt-3">{g.label}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-4">
                {g.items.map((it) => (
                  <Logo key={it.icon.title} icon={it.icon} label={it.label} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
