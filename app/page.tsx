import Navbar from "@/components/Navbar";
import Hero from "@/components/home/Hero";
import Statement from "@/components/home/Statement";
import SelectedWork from "@/components/home/SelectedWork";
import Capabilities from "@/components/home/Capabilities";
import Proof from "@/components/home/Proof";
import Experience from "@/components/home/Experience";
import Projects from "@/components/home/Projects";
import Contact from "@/components/home/Contact";
import { ScrollProgress } from "@/components/ui";
import { RefreshOnLoad } from "@/components/motion/Motion";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <RefreshOnLoad />
      <Navbar />
      <main>
        <Hero />
        <Statement />
        <SelectedWork />
        <Capabilities />
        <Proof />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
