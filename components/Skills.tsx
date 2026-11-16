import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { skills } from "@/lib/site";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        index="03"
        title="Skills"
        subtitle="The toolkit — frontend first, with the backend, auth and infra to ship it."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.title} delay={i * 60}>
            <div className="card h-full rounded-2xl p-6">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-accent">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-border bg-surface-2/40 px-3 py-1.5 text-sm text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
