import { motion as Motion } from "framer-motion";
import SkillsCarousel from "../UI/SkillsCarousel";
import {
  AnimatedDesign,
  AnimatedGear,
  AnimatedBrain,
  AnimatedZap,
  AnimatedCircuit,
  AnimatedTrophy,
  AnimatedTerminal,
  AnimatedOffice,
  AnimatedGlobe,
  AnimatedPulse,
} from "../UI/AnimatedIcons";
import { Helmet } from "react-helmet-async";

const values = [
  {
    icon: AnimatedDesign,
    title: "User Experience",
    desc: "I design interfaces that are intuitive, clear, and easy to use. My goal is for every interaction to feel natural and efficient.",
  },
  {
    icon: AnimatedGear,
    title: "Problem Solving",
    desc: "I enjoy tackling complex problems and finding clear, practical solutions. Every challenge is an opportunity to learn and improve.",
  },
  {
    icon: AnimatedBrain,
    title: "Continuous Learning",
    desc: "I'm always learning new technologies and concepts, experimenting, and improving my skills day by day.",
  },
  {
    icon: AnimatedZap,
    title: "Tech Innovation",
    desc: "I'm passionate about exploring new tools and technologies that can improve the way we create and build solutions.",
  },
  {
    icon: AnimatedCircuit,
    title: "AI & Machine Learning",
    desc: "Interested in how AI can enhance applications and services, making them smarter and more efficient.",
  },
];

const journey = [
  {
    year: "2024",
    icon: AnimatedTrophy,
    iconColor: "bg-blue-500",
    title: "Scientific Baccalaureate",
    subtitle: "CEG Segbeya - LITTORAL",
    desc: "Obtained my Scientific Baccalaureate and chose to study computer science.",
  },
  {
    year: "2024",
    icon: AnimatedTerminal,
    iconColor: "bg-green-500",
    title: "Started IT & Telecom Studies",
    subtitle: "INSTI/Lokossa - FOUNDATION",
    desc: "Started learning programming fundamentals (HTML, CSS, JavaScript) and worked on initial projects.",
  },
  {
    year: "2025",
    icon: AnimatedOffice,
    iconColor: "bg-purple-500",
    title: "First Internship",
    subtitle: "Bénin Digital",
    desc: "Worked as a web development intern, gaining practical experience with WordPress and real projects.",
  },
  {
    year: "2025",
    icon: AnimatedGlobe,
    iconColor: "bg-orange-500",
    title: "Full Stack Development",
    subtitle: "Freelance",
    desc: "Worked on full-stack projects using Node.js, Express, MongoDB, React/Next.js, and integrated Socket.io for real-time features. Focused on step-by-step learning and building practical applications.",
  },
  {
    year: "2025",
    icon: AnimatedPulse,
    iconColor: "bg-pink-500",
    title: "Ongoing IT & Telecom Studies",
    subtitle: "INSTI, Lokossa",
    desc: "Continuing my studies in Electrical and Computer Engineering with a specialization in Computer Science and Telecommunications.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-10 overflow-hidden text-[#f8f8f8]"
    >
      <Helmet>
        <title>About Octave Bahoun | My Developer Journey</title>
        <meta
          name="description"
          content="Learn more about Octave Bahoun's mission, values, and journey as a software engineer and AI enthusiast."
        />
      </Helmet>
      <div className="container mx-auto">
        {/* Top Header */}
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h4 className="text-gray-400 text-xs font-mono tracking-[0.4em] uppercase mb-4">
            GET TO KNOW ME
          </h4>
          <h2 className="text-4xl md:text-5xl font-bold font-sans">
            About <span className="text-blue-500 font-semibold">me</span>
          </h2>
        </Motion.div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* LEFT SIDE: Mission & Values */}
          <div className="lg:w-1/2 flex flex-col items-start gap-12">
            {/* Ma Mission Card */}
            <Motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full bg-[#111827]/40 border border-gray-800 rounded-2xl p-8 lg:p-10"
            >
              <h3 className="text-xl font-bold mb-8">My Mission</h3>
              <div className="space-y-6 text-gray-400 font-light leading-relaxed text-sm md:text-base">
                <p>
                  I deeply believe that technology must be a tool for connection
                  and solution, capable of bringing people closer while
                  answering concrete needs. What drives me is designing digital
                  experiences that are useful, accessible, and delightful, where
                  technique truly serves the human.
                </p>
                <p>
                  Beyond code, I spend my time exploring new technologies,
                  learning continuously, and sharing my knowledge with fellow
                  developers. I love guiding, explaining, and building, carried
                  by the fast-paced evolution of the web and the infinite
                  possibilities it offers to create high-impact digital
                  experiences.
                </p>
              </div>
            </Motion.div>

            {/* Ce que j'aime construire Section */}
            <div className="w-full space-y-8">
              <h3 className="text-xl font-bold px-2">What I Love to Build</h3>
              <div className="space-y-4">
                {values.map((v, i) => (
                  <Motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-5 p-4 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <v.icon className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-gray-200">{v.title}</h4>
                      <p className="text-xs text-gray-400 font-light leading-relaxed">
                        {v.desc}
                      </p>
                    </div>
                  </Motion.div>
                ))}
              </div>
            </div>

            {/* Signature Area */}
            <Motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 space-y-6"
            >
              <p className="text-gray-400 text-xs text-center lg:text-left w-full">
                Designed with passion by
              </p>
              <div className="flex flex-col items-center lg:items-start gap-3">
                <div className="text-4xl font-signature text-blue-400 opacity-80 pl-2">
                  Octave Précieux M.
                </div>
                <div className="text-blue-500/90 font-medium tracking-wide">
                  BAHOUN-HOUTOUKPE
                </div>
              </div>
            </Motion.div>
          </div>

          {/* RIGHT SIDE: Timeline Journey */}
          <div className="lg:w-1/2 flex flex-col gap-12">
            <h3 className="text-xl font-bold">My Developer Journey</h3>

            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-6 sm:left-8 top-8 bottom-8 w-px bg-gray-800" />

              <div className="space-y-8 sm:space-y-12">
                {journey.map((j, i) => (
                  <Motion.div
                    key={i}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 sm:gap-10 items-start relative pl-1"
                  >
                    {/* Circle Icon */}
                    <div
                      className={`flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-full ${j.iconColor} flex items-center justify-center shadow-lg transform transition-transform group hover:scale-110 z-10`}
                    >
                      <j.icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 bg-[#111827]/40 border border-gray-800 rounded-2xl p-5 sm:p-6 relative group hover:border-blue-500/30 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4 mb-3 sm:mb-4">
                        <h4 className="font-bold text-gray-100 leading-tight">
                          {j.title}
                        </h4>
                        <span className="text-[9px] font-mono bg-gray-800/80 text-gray-400 py-1 px-3 rounded-full flex-shrink-0">
                          {j.year}
                        </span>
                      </div>
                      <p className="text-blue-500 text-[10px] sm:text-xs font-semibold mb-2 tracking-wide">
                        {j.subtitle}
                      </p>
                      <p className="text-gray-400 text-xs sm:text-[13px] font-light leading-relaxed">
                        {j.desc}
                      </p>
                    </div>
                  </Motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* My Stack Section */}
        <Motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32"
        >
          <SkillsCarousel title="My Stack" isLarge={true} />
        </Motion.div>

        {/* Bottom CTA */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 text-center space-y-10"
        >
          <p className="text-gray-400 font-light text-sm max-w-xl mx-auto">
            Ready to bring an exceptional digital experience to life?
          </p>
          <Motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold uppercase text-xs tracking-[0.2em] transition-all shadow-xl shadow-blue-600/10"
          >
            Work with me
          </Motion.button>
        </Motion.div>
      </div>
    </section>
  );
}
