import { useState, useEffect } from "react";
import Hero from "../UI/Hero";
import ImgCard from "../UI/ImgCard";
import AboutSection from "../UI/AboutSection";
import SkillsCarousel from "../UI/SkillsCarousel";
import ProjectDiscovery from "../UI/ProjectDiscovery";
import ContactSection from "../UI/ContactSection";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";

export default function Accueil() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const referrer = document.referrer;
    const oldPortfolioUrl = "https://octavebahoun.github.io/Portefeuille/";

    // Si la personne ne vient pas de l'ancien portfolio, on active le chargement
    if (!referrer.includes(oldPortfolioUrl)) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2500); // 2.5 secondes de simulation
      return () => clearTimeout(timer);
    }
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <>
      <AnimatePresence>
        {loading && (
          <Motion.div
            key="loader-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md"
          >
            <Motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl shadow-2xl max-w-sm w-full font-mono relative overflow-hidden"
            >
              {/* Scanline effect for the modal */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/5 to-transparent h-20 w-full animate-scanline opacity-20" />
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <span className="text-[10px] text-gray-500 uppercase tracking-tighter">System Diagnostic</span>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-3 text-blue-400">
                  <div className="relative">
                    <div className="w-4 h-4 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em]">Initializing v4.0</span>
                </div>

                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <Motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.2, ease: "linear" }}
                      className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-400"
                    />
                  </div>
                  <div className="flex justify-between text-[9px] text-gray-500 font-bold">
                    <span className="animate-pulse">PARSING_ASSETS...</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 text-[9px] text-gray-600 grid grid-cols-2 gap-2 uppercase">
                  <div>Status: <span className="text-green-500/70">Online</span></div>
                  <div>CPU: <span className="text-blue-500/70">Optimal</span></div>
                  <div>Cache: <span className="text-purple-500/70">Valid</span></div>
                  <div>Auth: <span className="text-yellow-500/70">Guest</span></div>
                </div>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>

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
    </>
  );
}
