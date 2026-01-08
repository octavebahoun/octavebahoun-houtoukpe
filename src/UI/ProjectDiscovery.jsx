import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProjectDiscovery() {
  return (
    <div className="py-32 flex flex-col items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white transition-colors duration-500">
          Ready to see my{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Craft?
          </span>
        </h2>

        <p className="text-gray-400 font-mono text-sm mb-12 max-w-md mx-auto opacity-70 transition-colors duration-500">
          Discover a collection of digital experiences built with passion and
          precision.
        </p>

        <div className="relative inline-block">
          {/* Animated Snake Arrow - Elongated */}
          <div className="absolute -top-32 -left-48 w-80 h-40 pointer-events-none hidden md:block">
            <svg width="300" height="150" viewBox="0 0 300 150" fill="none">
              <motion.path
                d="M 10 130 Q 30 10, 80 80 T 160 30 T 240 90 T 280 110"
                stroke="url(#snakeGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
              <motion.path
                d="M 270 100 L 280 110 L 268 118"
                stroke="url(#snakeGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                transition={{ delay: 2.3 }}
              />
              <defs>
                <linearGradient
                  id="snakeGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/projects"
              className="relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden group block shadow-xl transition-colors duration-500"
            >
              <span className="relative z-10">DISCOVER MY PROJECTS</span>
              <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Background purely decorative text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none -z-0">
        <span className="text-[20vw] font-black text-white/[0.02] leading-none transition-colors duration-500">
          WORK
        </span>
      </div>
    </div>
  );
}
