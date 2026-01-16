import Hero from '@/components/Hero';
import BasicInfo from '@/components/BasicInfo';
import About from '@/components/About';
import Highlights from '@/components/Highlights';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Certifications from '@/components/Certifications';
import Publications from '@/components/Publications';
import Education from '@/components/Education';
import ResumeSection from '@/components/ResumeSection';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />

      {/* Soft bridge to remove the hard visual break between Hero and Basic Information */}
      <div aria-hidden className="relative -mt-24 h-32 sm:h-36 md:h-40 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/70 to-transparent dark:via-black/35 blur-2xl opacity-70" />
      </div>

      <BasicInfo />
      <About />
      <Highlights />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Publications />
      <Education />
      <ResumeSection />
      <Contact />
    </>
  );
}