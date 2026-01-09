import { motion } from "framer-motion";
import {
  Code2,
  Cpu,
  Globe,
  Layout,
  Database,
  Terminal,
  Smartphone,
  BrainCircuit,
} from "lucide-react";

const skills = [
  {
    name: "React.js",
    icon: <Globe className="text-blue-400" />,
    desc: "Building dynamic and interactive user interfaces with modern React hooks and patterns.",
  },
  {
    name: "Python",
    icon: <Terminal className="text-yellow-500" />,
    desc: "Data processing, automation scripts, and AI/ML model integration.",
  },
  {
    name: "C++",
    icon: <Code2 className="text-blue-600" />,
    desc: "Embedded systems and high-performance software development.",
  },
  {
    name: "Node.js",
    icon: <Database className="text-green-500" />,
    desc: "Scalable backend services and RESTful API development.",
  },
  {
    name: "Tailwind CSS",
    icon: <Layout className="text-cyan-400" />,
    desc: "Rapid styling with utility-first CSS for responsive designs.",
  },
  {
    name: "MongoDB",
    icon: <Database className="text-green-600" />,
    desc: "NoSQL database management for flexible data structures.",
  },
  {
    name: "IoT Systems",
    icon: <Cpu className="text-purple-500" />,
    desc: "Connecting hardware to software via Arduino and Raspberry Pi.",
  },
  {
    name: "AI / ML",
    icon: <BrainCircuit className="text-pink-500" />,
    desc: "Implementing intelligent features and data analysis workflows.",
  },
];

export default function SkillsCarousel({
  title = "My Technical Expertise",
  isLarge = false,
}) {
  const duplicatedSkills = [...skills, ...skills];

  return (
    <div
      className={`${
        isLarge ? "py-12" : "py-24"
      } overflow-hidden bg-transparent`}
    >
      {title && (
        <div className="container mx-auto px-6 mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className={`${
              isLarge ? "text-4xl md:text-5xl" : "text-3xl"
            } font-bold bg-gradient-to-r from-gray-100 to-gray-500 bg-clip-text text-transparent inline-block transition-colors duration-500`}
          >
            {title}
          </motion.h2>
        </div>
      )}

      <div className="relative flex overflow-hidden group">
        <motion.div
          className="flex whitespace-nowrap will-change-transform"
          animate={{ x: [0, "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: isLarge ? 45 : 35,
              ease: "linear",
            },
          }}
        >
          {duplicatedSkills.map((skill, idx) => (
            <div
              key={idx}
              className={`flex-shrink-0 ${
                isLarge ? "w-80 h-52 lg:w-96 lg:h-64" : "w-72 h-44"
              } mx-4 p-8 bg-[#0a0a0a] border border-white/5 rounded-2xl flex flex-col justify-between hover:bg-white/[0.03] transition-colors duration-500 group/card relative overflow-hidden`}
            >
              {/* Subtle background glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-lg opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`p-3 bg-white/5 rounded-xl border border-white/5 group-hover/card:scale-110 transition-transform duration-500 ${
                      isLarge ? "scale-110" : ""
                    }`}
                  >
                    {skill.icon}
                  </div>
                  <h3
                    className={`${
                      isLarge ? "text-xl font-extrabold" : "text-lg font-bold"
                    } text-white group-hover/card:text-blue-400 transition-colors`}
                  >
                    {skill.name}
                  </h3>
                </div>
                <p
                  className={`${
                    isLarge ? "text-sm" : "text-xs"
                  } text-gray-400 leading-relaxed whitespace-normal line-clamp-3 font-light`}
                >
                  {skill.desc}
                </p>
              </div>

              {/* Minimalist animated indicator */}
              <div className="w-1/6 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover/card:w-full transition-all duration-700 ease-out" />
            </div>
          ))}
        </motion.div>

        {/* Shadow overlays for smooth edge fading */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none transition-colors duration-500" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none transition-colors duration-500" />
      </div>
    </div>
  );
}
