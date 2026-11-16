import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { skills } from "@/lib/site";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        index="04"
        title="The toolkit"
        emphasis="toolkit"
        subtitle="Frontend first, with the backend, auth and infrastructure to ship it."
      />

      <Reveal>
        <dl className="border-b hairline">
          {skills.map((group) => (
            <div
              key={group.title}
              className="grid gap-2 border-t hairline py-6 md:grid-cols-[180px_1fr] md:gap-6"
            >
              <dt className="label pt-1">{group.title}</dt>
              <dd className="text-xl leading-relaxed tracking-tight sm:text-2xl">
                {group.items.map((item, i) => (
                  <span key={item}>
                    <span className="transition-colors hover:text-holo">{item}</span>
                    {i < group.items.length - 1 && <span className="text-faint">, </span>}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
