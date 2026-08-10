import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const THEME_COLOR: Record<Theme, string> = {
  light: "#fbf9f4",
  dark: "#15171b",
};

function readTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}

/* Le thème est déjà posé sur <html> avant le premier paint (script inline
   dans index.html) : ce hook ne fait que lire cet état et le faire évoluer. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);

    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute("content", THEME_COLOR[theme]);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return { theme, toggle };
}
