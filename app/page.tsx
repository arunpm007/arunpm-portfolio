import Navbar from "@/components/Navbar";
import Hero from "@/components/home/Hero";
import Statement from "@/components/home/Statement";
import Projects from "@/components/home/Projects";
import Capabilities from "@/components/home/Capabilities";
import Skills from "@/components/home/Skills";
import Experience from "@/components/home/Experience";
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
        <Projects />
        <Capabilities />
        <Skills />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
