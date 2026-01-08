import React, { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import NavItem from "./NavItem";
import Translateicon from "./Translateicon";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Projects", path: "/projects" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <Motion.nav
      className="sticky top-0 z-[60] w-full bg-black/40 backdrop-blur-xl border-b border-white/5 transition-all duration-500"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center bg-white/5 border border-white/10 space-x-1 px-4 py-1.5 rounded-full shadow-inner shadow-white/5">
          {links.map((link, i) => (
            <NavItem
              key={link.label}
              label={link.label}
              href={link.path}
              index={i}
            />
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:block">
            <Translateicon />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Portal */}
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0a] border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {links.map((link) => (
                <NavItem
                  key={link.label}
                  label={link.label}
                  href={link.path}
                  index={0}
                  onClick={() => setIsOpen(false)}
                />
              ))}
              <div className="pt-4 border-t border-white/5 flex justify-between items-center sm:hidden">
                <span className="text-xs text-gray-500 uppercase font-mono tracking-widest">
                  Language
                </span>
                <Translateicon />
              </div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.nav>
  );
}
