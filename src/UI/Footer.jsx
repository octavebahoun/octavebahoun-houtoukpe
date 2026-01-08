import { motion } from "framer-motion";
import Logo from "./Logo";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050505] border-t border-white/5 pt-16 pb-8 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-blue-900/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="scale-90 origin-left">
              <Logo />
            </div>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Crafting innovative digital experiences at the intersection of
              Electrical Engineering, Software Development, and AI. Building the
              future, one line of code at a time.
            </p>
            <div className="flex items-center space-x-4">
              {[
                {
                  icon: <Github size={18} />,
                  href: "https://github.com/octavebahoun",
                },
                {
                  icon: <Linkedin size={18} />,
                  href: "https://www.linkedin.com/in/octave-bahoun-b9114b337/",
                },
                {
                  icon: <Mail size={18} />,
                  href: "mailto:octavebahoun@gmail.com",
                },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, color: "#fff" }}
                  className="p-2.5 bg-white/5 rounded-full text-gray-400 border border-white/5 transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-4">
              {["Home", "About", "Projects", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-blue-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Status */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">
              Status
            </h4>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span>Available for hire</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Open to worldwide freelance opportunities and collaborations.
            </p>

            {/* Back to top button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest"
            >
              <ArrowUp size={14} />
              <span>Back to Top</span>
            </motion.button>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-[10px] sm:text-xs">
            © {currentYear} Octave Bahoun. All rights reserved.
          </p>
          <p className="text-gray-500 text-[10px] sm:text-xs font-mono">
            DESIGNED WITH <span className="text-red-500 animate-pulse">❤</span>{" "}
            IN LOKOSSA
          </p>
        </div>
      </div>
    </footer>
  );
}
