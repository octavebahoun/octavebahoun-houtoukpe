import { motion  as Motion} from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  const terminalData = [
    { label: "whoami", value: "Octave — Software Engineer" },
    { label: "focus", value: "Web • Systems • IA/LM" },
    { label: "current_state", value: "Building. Learning. Shipping." },
  ];

  const footerLinks = ["$open_projects", "$open_about", "$open_contact"];

  const skills = ["REACT.JS", "NODE.JS", "MONGODB", "C++", "PYTHON", "AI / ML"];

  const socialLinks = [
    {
      icon: <Github size={20} />,
      href: "https://github.com/octavebahoun",
      label: "Github",
    },
    {
      icon: <Linkedin size={20} />,
      href: "https://www.linkedin.com/in/octave-bahoun-b9114b337/",
      label: "LinkedIn",
    },
    {
      icon: <Mail size={20} />,
      href: "mailto:octavebahoun@gmail.com",
      label: "Email",
    },
  ];

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-xl overflow-hidden shadow-2xl transition-colors duration-500">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/10">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="text-gray-500 text-xs font-mono select-none">
            zsh — 80x24
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 font-mono text-sm sm:text-base md:p-8 min-h-[400px] transition-colors duration-500 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <span className="text-[#16a34a] dark:text-[#4ade80]">
                octave@portfolio
              </span>
              :<span className="text-[#2563eb] dark:text-[#60a5fa]">~</span>$
              <Motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="ml-2 text-gray-900 dark:text-gray-100"
              >
                cat profile.json
              </Motion.span>
            </div>

            {terminalData.map((item, index) => (
              <Motion.div
                key={item.label}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 + index * 0.15 }}
                className="mb-6 last:mb-0"
              >
                <div className="flex items-center text-gray-500 mb-1 group">
                  <span className="mr-2 text-[#16a34a] dark:text-[#4ade80] opacity-50 group-hover:opacity-100 transition-opacity">
                    ›
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 font-semibold">
                    {item.label}
                  </span>
                </div>
                <div className="pl-6 text-gray-600 dark:text-gray-400 border-l border-black/5 dark:border-white/5 ml-1 py-1">
                  {item.value}
                </div>
              </Motion.div>
            ))}
          </div>

          {/* Terminal Footer Indicator */}
          <div className="mt-10 pt-6 border-t border-black/5 dark:border-white/5 flex flex-wrap gap-x-6 gap-y-2 text-xs">
            {footerLinks.map((link, index) => (
              <Motion.div
                key={link}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 + index * 0.1 }}
                className="flex items-center space-x-1 cursor-pointer group"
              >
                <span className="text-[#16a34a] dark:text-[#4ade80] opacity-0 group-hover:opacity-100 transition-opacity">
                  ›
                </span>
                <span className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-500">
                  {link}
                  {index === footerLinks.length - 1 ? "_" : ""}
                </span>
                {index === footerLinks.length - 1 && (
                  <Motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-1.5 h-3.5 bg-[#16a34a] dark:bg-[#4ade80] inline-block align-middle"
                  />
                )}
              </Motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Links & Skills Below Shell */}
      <Motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2 }}
        className="mt-8 px-4"
      >
        <div className="flex items-center space-x-8 mb-8">
          {socialLinks.map((social, i) => (
            <Motion.a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.1 }}
              className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition-all duration-300"
            >
              {social.icon}
            </Motion.a>
          ))}
        </div>

        {/* Skills Row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 opacity-80">
          {skills.map((skill, i) => (
            <div
              key={i}
              className="flex items-center text-[11px] font-medium tracking-[0.15em] text-gray-500 dark:text-gray-500"
            >
              <span>{skill}</span>
              {i < skills.length - 1 && (
                <span className="ml-4 text-gray-300 dark:text-white/10 font-extralight select-none">
                  |
                </span>
              )}
            </div>
          ))}
        </div>
      </Motion.div>
    </Motion.div>
  );
}
