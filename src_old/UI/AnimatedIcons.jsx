import React from "react";
import { motion } from "framer-motion";

// 1. User Experience (Design)
export const AnimatedDesign = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <motion.path
      d="M12 19l7-7 3 3-7 7-3-3z"
      animate={{ x: [0, 2, 0], y: [0, -2, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <motion.path
      d="M2 2l5 5"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </svg>
);

// 2. Problem Solving (Settings/Gear)
export const AnimatedGear = ({ className }) => (
  <motion.svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    animate={{ rotate: 360 }}
    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2a2 2 0 0 1-2 2a2 2 0 0 0-2 2a2 2 0 0 1-2 2a2 2 0 0 0-2 2v.44a2 2 0 0 0 2 2a2 2 0 0 1 2 2a2 2 0 0 0 2 2a2 2 0 0 1 2 2a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2a2 2 0 0 1 2-2a2 2 0 0 0 2-2a2 2 0 0 1 2-2a2 2 0 0 0 2-2v-.44a2 2 0 0 0-2-2a2 2 0 0 1-2-2a2 2 0 0 0-2-2a2 2 0 0 1-2-2a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </motion.svg>
);

// 3. Continuous Learning (Brain/Neural)
export const AnimatedBrain = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <motion.path
      d="M9.5 2C7.57 2 6 3.57 6 5.5c0 .38.07.74.2 1.07C4.65 7.07 3.5 8.44 3.5 10c0 1.03.52 1.94 1.3 2.5a3.5 3.5 0 0 0-1.3 2.5c0 1.93 1.57 3.5 3.5 3.5.38 0 .74-.07 1.07-.2.5 1.55 1.86 2.7 3.43 2.7 1.57 0 2.93-1.15 3.43-2.7.33.13.69.2 1.07.2 1.93 0 3.5-1.57 3.5-3.5a3.5 3.5 0 0 0-1.3-2.5c.78-.56 1.3-1.47 1.3-2.5 0-1.56-1.15-2.93-2.7-3.43.13-.33.2-.69.2-1.07C21 3.57 19.43 2 17.5 2"
      animate={{ strokeDasharray: ["0 100", "100 0"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.circle
      cx="12"
      cy="12"
      r="1"
      fill="currentColor"
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </svg>
);

// 4. Tech Innovation (Zap/Energy)
export const AnimatedZap = ({ className }) => (
  <motion.svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    whileHover={{
      scale: 1.2,
      filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))",
    }}
  >
    <motion.path
      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
      animate={{ pathLength: [0, 1], opacity: [0.5, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  </motion.svg>
);

// 5. AI & Machine Learning (Circuit/Grid)
export const AnimatedCircuit = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <motion.path
      d="M7 7h10v10H7z"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
    <motion.circle
      cx="12"
      cy="12"
      r="2"
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </svg>
);

// --- Journey Icons ---

// 1. Scientific Baccalaureate (Trophy/Goal)
export const AnimatedTrophy = ({ className }) => (
  <motion.svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    animate={{ y: [0, -3, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 22V18" />
    <path d="M14 22V18" />
    <path d="M18 4H6v7a6 6 0 0 0 12 0V4Z" />
  </motion.svg>
);

// 2. Started IT & Telecom (Terminal)
export const AnimatedTerminal = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <motion.path
      d="m7 8 3 3-3 3"
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.8, repeat: Infinity }}
    />
    <motion.line
      x1="12"
      y1="14"
      x2="17"
      y2="14"
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
    />
  </svg>
);

// 3. First Internship (Building/Office)
export const AnimatedOffice = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 21h18" />
    <path d="M9 21V9" />
    <path d="M15 21V9" />
    <motion.path
      d="M20 21V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v16"
      animate={{ strokeDashoffset: [0, 10, 0] }}
    />
    <motion.rect
      x="7"
      y="5"
      width="2"
      height="2"
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.rect
      x="11"
      y="5"
      width="2"
      height="2"
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
    />
    <motion.rect
      x="15"
      y="5"
      width="2"
      height="2"
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
    />
  </svg>
);

// 4. Full Stack Development (Globe)
export const AnimatedGlobe = ({ className }) => (
  <motion.svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    animate={{ rotateY: 360 }}
    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </motion.svg>
);

// 5. Ongoing Studies (Pulse/Activity)
export const AnimatedPulse = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <motion.path
      d="M22 12h-4l-3 9L9 3l-3 9H2"
      animate={{ pathLength: [0, 1], pathOffset: [0, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    />
  </svg>
);

// --- Contact Icons ---

export const AnimatedMail = ({ className }) => (
  <motion.svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    whileHover={{ y: -2 }}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <motion.path
      d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.svg>
);

export const AnimatedMapPin = ({ className }) => (
  <motion.svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    animate={{ y: [0, -4, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </motion.svg>
);

export const AnimatedPhone = ({ className }) => (
  <motion.svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </motion.svg>
);
