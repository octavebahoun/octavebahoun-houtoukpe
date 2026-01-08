import {motion as Motion} from "framer-motion"

export default function Boxi({ children, onClick }) {
  return (
    <Motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 30 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-md hover:shadow-lg transition-shadow duration-300"
    >
      {children}
    </Motion.button>
  );
}
