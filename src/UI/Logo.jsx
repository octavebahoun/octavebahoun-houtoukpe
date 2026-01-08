import { motion } from "framer-motion";
import { CodeXml } from "lucide-react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/">
      <motion.div
        className="flex items-center cursor-pointer group space-x-2"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <CodeXml className="text-gray-900 dark:text-white transition-colors duration-500" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 60"
          width="140"
          height="45"
          className="drop-shadow-md"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <text
            x="5"
            y="40"
            fontFamily="'Great Vibes', cursive"
            fontSize="38"
            fill="url(#logoGradient)"
            className="select-none"
          >
            Oktav
            <tspan
              fontSize="30"
              fontFamily="sans-serif"
              fontWeight="bold"
              dx="4"
              className="fill-gray-900 dark:fill-white transition-colors duration-500"
            >
              .
            </tspan>
          </text>
          <motion.path
            d="M 5 48 L 105 48"
            stroke="url(#logoGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="group-hover:opacity-100 transition-opacity"
          />
        </svg>
      </motion.div>
    </Link>
  );
}
