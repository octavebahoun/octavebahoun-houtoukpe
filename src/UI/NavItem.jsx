import { motion as Motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const MotionLink = Motion(Link);

export default function NavItem({ label, href, index, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <MotionLink
      to={href}
      onClick={onClick}
      className={`relative text-sm font-medium transition-colors px-3 py-1.5 items-center flex outline-none no-underline ${
        isActive ? "text-white" : "text-gray-400 hover:text-white"
      }`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      whileHover="hover"
    >
      <span className="relative z-10">{label}</span>

      {/* Background Pill - Shared Layout Animation */}
      {isActive && (
        <Motion.div
          layoutId="nav-pill"
          className="absolute inset-0 bg-white/10 rounded-full z-0"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}

      {/* Underline Indicator - Shared Layout Animation */}
      {isActive && (
        <Motion.div
          layoutId="nav-underline"
          className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 z-10"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}

      {/* Hover Background (Subtle) */}
      <Motion.div
        className="absolute inset-0 bg-white/5 rounded-full z-0 opacity-0 group-hover:opacity-100"
        variants={{
          hover: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 0.2 }}
      />
    </MotionLink>
  );
}
