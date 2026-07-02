import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Globe, Sun, Moon } from "lucide-react";
import Logo from "./Logo";

const LINKS = [
  { to: "/", label: "Home", exact: true },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/#skills", label: "Skills", anchor: true },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Floating pill navbar ── */}
      <header className={`navbar-wrap${scrolled ? " scrolled" : ""}`}>
        <div className="navbar-shell">
          <nav className="navbar-pill" role="navigation" aria-label="Main navigation">
            <div className="navbar-brand">
              <Logo />
            </div>

            <ul className="nav-pill__links">
              {LINKS.map((l) => (
                <li key={l.to}>
                  {l.anchor ? (
                    <Link to={l.to} className="nav-pill__link">
                      {l.label}
                    </Link>
                  ) : (
                    <NavLink
                      to={l.to}
                      end={l.exact ?? false}
                      className={({ isActive }) => `nav-pill__link${isActive ? " active" : ""}`}
                    >
                      {l.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>

            <div className="nav-pill__actions">
              <button className="nav-pill__lang" type="button" aria-label="Switch language to French">
                <Globe size={16} />
                <span>FR</span>
              </button>

              <button className="nav-pill__theme" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                <span className="nav-pill__theme-label">{theme === "dark" ? "Light" : "Dark"}</span>
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

      {/* ── Mobile fullscreen menu ── */}
      <div className={`mobile-menu${open ? " open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu__inner">
          {LINKS.map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) => `mobile-nav-link${isActive ? " active" : ""}`}
              onClick={() => setOpen(false)}
            >
              <span className="mobile-nav-index">0{i + 1}</span>
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="btn btn-primary"
            style={{ marginTop: "32px", width: "100%", justifyContent: "center" }}
            onClick={() => setOpen(false)}
          >
            Hire me
          </Link>
        </div>
      </div>
    </>
  );
}
