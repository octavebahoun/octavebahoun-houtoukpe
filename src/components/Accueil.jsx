import Hero from "../UI/Hero";
import ImgCard from "../UI/ImgCard";
import AboutSection from "../UI/AboutSection";
import SkillsCarousel from "../UI/SkillsCarousel";
import ProjectDiscovery from "../UI/ProjectDiscovery";
import ContactSection from "../UI/ContactSection";
import { motion as Motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

export default function Accueil() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="space-y-24 lg:space-y-32">
      <Helmet>
        <title>Octave Bahoun | Home</title>
        <meta
          name="description"
          content="Welcome to the portfolio of Octave Bahoun, a Software Engineer and AI specialist building the future of tech."
        />
      </Helmet>
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 min-h-[80vh] pt-10 sm:pt-20">
        <div className="flex-1 w-full order-2 lg:order-1">
          <Hero />
        </div>
        <div className="flex-1 flex justify-center lg:justify-end w-full order-1 lg:order-2">
          <ImgCard />
        </div>
      </section>

      {/* About Section */}
      <Motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <AboutSection />
      </Motion.section>

      {/* Skills Carousel */}
      <Motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <SkillsCarousel />
      </Motion.section>

      {/* Project Discovery Call to Action */}
      <Motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <ProjectDiscovery />
      </Motion.section>

      {/* Contact Section */}
      <Motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <ContactSection />
      </Motion.section>
    </div>
  );
}
