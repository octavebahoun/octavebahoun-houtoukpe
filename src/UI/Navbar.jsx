import React, { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import NavItem from "./NavItem";
import Translateicon from "./Translateicon";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Projects", path: "/projects" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <Motion.header
      className="fixed top-0 left-0 right-0 z-[60] flex justify-center pointer-events-none"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
    >
      <nav
        className={`pointer-events-auto mt-4 mx-4 px-3 sm:px-5 py-2.5 rounded-2xl border transition-all duration-500 ${
          scrolled
            ? "bg-dark-bg/70 backdrop-blur-2xl border-white/10 shadow-lg shadow-black/20"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation — Pill Links */}
          <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
            {links.map((link, i) => (
              <NavItem
                key={link.label}
                label={link.label}
                href={link.path}
                index={i}
              />
            ))}
          </div>

          {/* Controls: Theme + Translate + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Translateicon />

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="md:hidden p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu — Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto fixed inset-0 z-[59] bg-dark-bg/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {links.map((link, i) => (
                <Motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <NavItem
                    label={link.label}
                    href={link.path}
                    index={i}
                    onClick={() => setIsOpen(false)}
                  />
                </Motion.div>
              ))}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.header>
  );
}
