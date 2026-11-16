import SectionHeader from "./SectionHeader";
import Reveal from "../Reveal";
import ThemeDemo from "../demos/ThemeDemo";
import { TiltDemo } from "../demos/ThreeDDemos";
import PhoneDemo from "../demos/PhoneDemo";

const TILES = [
  {
    title: "Runtime theming",
    text: "One component, four brand themes, zero rebuilds — the technique behind the design architecture.",
    demo: <ThemeDemo />,
  },
  {
    title: "Holographic cards",
    text: "Pointer-driven tilt, foil and glare, written with CSS variables so nothing re-renders per frame.",
    demo: (
      <div className="flex h-full items-center px-6">
        <TiltDemo />
      </div>
    ),
  },
  {
    title: "Touch-first mobile",
    text: "A swipeable card carousel and a bottom sheet — the interaction model phones deserve.",
    demo: (
      <div className="flex h-full items-center justify-center py-8">
        <div className="w-[min(240px,64vw)]">
          <PhoneDemo />
        </div>
      </div>
    ),
  },
];

/** Live demos of the techniques the case studies describe. */
export default function Proof() {
  return (
    <section id="proof" className="mx-auto max-w-[1280px] scroll-mt-16 px-4 py-28 sm:px-6 sm:py-36">
      <SectionHeader
        index="03"
        label="Proof"
        title={
          <>
            Touch the work<span className="text-signal">.</span>
          </>
        }
        aside="Real techniques, running live in this page — not screenshots."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {TILES.map((t, i) => (
          <Reveal key={t.title} delay={i * 90} className="flex flex-col border hairline bg-surface">
            <div className="min-h-[420px] flex-1 border-b hairline">{t.demo}</div>
            <div className="p-6">
              <h3 className="display text-3xl">{t.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{t.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
