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
      <section className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20 min-h-[90vh] pt-10 sm:pt-16">
        <div className="flex-1 w-full order-2 lg:order-1 space-y-12">
          <Motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <Motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-6"
            >
              Building the future through code
            </Motion.span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6">
              Hello, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-300% animate-gradient">
                Octave Bahoun
              </span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-xl font-light leading-relaxed">
              Software Engineer & AI Specialist. Welcome to my creative
              portfolio where innovation meets elegant design.
            </p>
          </Motion.div>

          <div className="relative">
            <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />
            <Hero />
          </div>
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
