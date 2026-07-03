import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Globe, Sun, Moon } from "lucide-react";
import Logo from "./Logo";
import { useLang } from "../lib/i18n";

const LINKS_EN = [
  { to: "/", label: "nav.home", exact: true },
  { to: "/about", label: "nav.about" },
  { to: "/projects", label: "nav.projects" },
  { to: "/#skills", label: "nav.skills", anchor: true },
  { to: "/blog", label: "nav.blog" },
  { to: "/contact", label: "nav.contact" },
];

export default function Navbar({ theme, toggleTheme }) {
  const { t, lang, toggleLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`navbar-wrap${scrolled ? " scrolled" : ""}`}>
        <div className="navbar-shell">
          <nav className="navbar-pill" role="navigation" aria-label="Main navigation">
            <div className="navbar-brand">
              <Logo />
            </div>

            <ul className="nav-pill__links">
              {LINKS_EN.map((l) => (
                <li key={l.to}>
                  {l.anchor ? (
                    <Link to={l.to} className="nav-pill__link">
                      {t(l.label)}
                    </Link>
                  ) : (
                    <NavLink
                      to={l.to}
                      end={l.exact ?? false}
                      className={({ isActive }) => `nav-pill__link${isActive ? " active" : ""}`}
                    >
                      {t(l.label)}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>

            <div className="nav-pill__actions">
              <button className="nav-pill__lang" onClick={toggleLang} aria-label="Toggle language">
                <Globe size={14} />
                <span>{lang === "fr" ? "FR" : "EN"}</span>
              </button>

              <button className="nav-pill__theme" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                <span className="nav-pill__theme-label">{theme === "dark" ? t("nav.theme.light") : t("nav.theme.dark")}</span>
              </button>

              <button
                className={`menu-btn${open ? " open" : ""}`}
                onClick={() => setOpen(o => !o)}
                aria-label="Toggle menu"
                aria-expanded={open}
              >
                <span /><span /><span />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div className={`mobile-menu${open ? " open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu__inner">
          {LINKS_EN.map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) => `mobile-nav-link${isActive ? " active" : ""}`}
              onClick={() => setOpen(false)}
            >
              <span className="mobile-nav-index">0{i + 1}</span>
              {t(l.label)}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="btn btn-primary"
            style={{ marginTop: "32px", width: "100%", justifyContent: "center" }}
            onClick={() => setOpen(false)}
          >
            {t("nav.hire")}
          </Link>
        </div>
      </div>
    </>
  );
}
