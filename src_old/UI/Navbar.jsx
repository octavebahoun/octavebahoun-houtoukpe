import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import Logo from "./Logo";

const LINKS = [
  { to: "/",        label: "Home"     },
  { to: "/projects", label: "Projects" },
  { to: "/blog",    label: "Blog"     },
  { to: "/about",   label: "About"    },
  { to: "/certs",   label: "Certs"    },
  { to: "/contact", label: "Contact"  },
];

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`} role="navigation" aria-label="Main navigation">
        <div className="container navbar__inner">
          <Logo />
          <ul className="navbar__links">
            {LINKS.map(l => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="navbar__actions">
            <button
              className="theme-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={theme === "dark" ? "Switch to light" : "Switch to dark"}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              className={`menu-btn${open ? " open" : ""}`}
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle mobile menu"
              aria-expanded={open}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${open ? " open" : ""}`} aria-hidden={!open}>
        {LINKS.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === "/"}
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </>
  );
}
