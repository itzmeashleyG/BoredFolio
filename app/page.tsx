import Background from "@/components/Background";
import Hero from "@/components/Hero";
import FloatingNav from "@/components/FloatingNav";
import Summary from "@/components/Summary";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Gallery from "@/components/Gallery";
import PersonalGallery from "@/components/PersonalGallery";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="transition-colors duration-300">
      <Background />
      <section id="home">
        <Hero />
      </section>

      <section id="summary" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <Summary />
          </ScrollReveal>
        </div>
      </section>

      <section id="skills" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <Skills />
          </ScrollReveal>
        </div>
      </section>

      <section id="projects" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <Projects />
          </ScrollReveal>
        </div>
      </section>

      <section id="experience" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <Experience />
          </ScrollReveal>
        </div>
      </section>

      <section id="gallery" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <Gallery />
          </ScrollReveal>
        </div>
      </section>

      <section id="personal" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 pb-28 sm:pb-36">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <PersonalGallery />
          </ScrollReveal>
        </div>
      </section>

      <Footer />
      <FloatingNav />
    </main>
  );
}
