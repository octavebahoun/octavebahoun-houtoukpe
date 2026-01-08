import { motion as Motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Translateicon() {
  const [lang, setLang] = useState("EN");

  useEffect(() => {
    const hasTrans = document.cookie
      .split(";")
      .some((item) => item.trim().startsWith("googtrans=/en/fr"));
    if (hasTrans) setLang("FR");
  }, []);

  const handleTranslate = () => {
    const isCurrentlyEn = lang === "EN";
    const nextLang = isCurrentlyEn ? "fr" : "en";

    if (!window.google || !window.google.translate) return;

    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = nextLang;
      select.dispatchEvent(new Event("change"));
      setLang(nextLang.toUpperCase());

      if (nextLang === "en") {
        document.cookie =
          "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        document.cookie =
          "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" +
          window.location.hostname;
        window.location.reload();
      } else {
        localStorage.setItem("user_lang_pref", "fr");
      }
    }
  };

  return (
    <Motion.button
      onClick={handleTranslate}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative px-4 py-1.5 rounded-full border border-black/10 dark:border-white/20 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors shadow-lg"
    >
      <AnimatePresence mode="wait">
        <Motion.span
          key={lang}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          className="inline-block font-mono text-xs font-bold tracking-wider text-gray-700 dark:text-gray-300"
        >
          {lang}
        </Motion.span>
      </AnimatePresence>
    </Motion.button>
  );
}
