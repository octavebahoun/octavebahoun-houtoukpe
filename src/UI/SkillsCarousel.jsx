import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "./SectionTitle";
import {
  Code2,
  Cpu,
  Globe,
  Layout,
  Database,
  Terminal,
  BrainCircuit,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const skills = [
  {
    name: "React.js",
    icon: <Globe className="text-blue-400 w-8 h-8" />,
    desc: "Building dynamic and interactive user interfaces with modern React hooks.",
  },
  {
    name: "Python",
    icon: <Terminal className="text-yellow-500 w-8 h-8" />,
    desc: "Data processing, automation scripts, and AI/ML model integration.",
  },
  {
    name: "C++",
    icon: <Code2 className="text-blue-600 w-8 h-8" />,
    desc: "Embedded systems and high-performance software development.",
  },
  {
    name: "Node.js",
    icon: <Database className="text-green-500 w-8 h-8" />,
    desc: "Scalable backend services and RESTful API development.",
  },
  {
    name: "Tailwind CSS",
    icon: <Layout className="text-cyan-400 w-8 h-8" />,
    desc: "Rapid styling with utility-first CSS for responsive designs.",
  },
  {
    name: "AI / ML",
    icon: <BrainCircuit className="text-pink-500 w-8 h-8" />,
    desc: "Implementing intelligent features and data analysis workflows.",
  },
];

export default function App({ title = "My Technical Expertise" }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % skills.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? skills.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col items-center w-full overflow-hidden py-12 bg-transparent">
      {title && (
        <SectionTitle
          number="02"
          label="EXPERTISE"
          title={title}
          highlight="Expertise"
          className="flex flex-col items-center text-center"
        />
      )}

      <div className="relative flex items-center justify-center w-full max-w-4xl h-80">
        <AnimatePresence mode="popLayout">
          {skills.map((skill, index) => {
            let offset = index - currentIndex;
            // Gérer le bouclage circulaire des positions
            if (offset < -Math.floor(skills.length / 2)) offset += skills.length;
            if (offset > Math.floor(skills.length / 2)) offset -= skills.length;

            // Masquer les éléments trop éloignés du centre
            if (Math.abs(offset) > 2) return null;

            const isCenter = offset === 0;
            const xOffset = offset * 140; 
            const scale = isCenter ? 1 : 0.8 - Math.abs(offset) * 0.1;
            const zIndex = 10 - Math.abs(offset);
            const opacity = isCenter ? 1 : 0.4 - Math.abs(offset) * 0.1;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  x: xOffset,
                  scale: scale,
                  zIndex: zIndex,
                  opacity: opacity,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`absolute w-72 md:w-80 h-56 p-6 rounded-2xl border border-white/5 flex flex-col justify-center items-center text-center shadow-2xl backdrop-blur-md cursor-pointer ${
                  isCenter ? "bg-slate-800/90" : "bg-slate-800/40"
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <div className={`p-4 rounded-full mb-4 bg-slate-700/50 ${isCenter ? "shadow-[0_0_15px_rgba(34,211,238,0.2)]" : ""}`}>
                  {skill.icon}
                </div>
                <h3 className={`text-xl font-bold text-white mb-2 ${isCenter ? "" : "truncate w-full"}`}>
                  {skill.name}
                </h3>
                {isCenter && (
                  <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.2 }}
                    className="text-sm text-slate-400 font-light"
                  >
                    {skill.desc}
                  </motion.p>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Boutons de navigation */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-12 z-20 pointer-events-none">
          <button
            onClick={prevSlide}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/80 text-white hover:bg-cyan-500 hover:text-slate-900 border border-white/5 transition-colors pointer-events-auto shadow-lg"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/80 text-white hover:bg-cyan-500 hover:text-slate-900 border border-white/5 transition-colors pointer-events-auto shadow-lg"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}