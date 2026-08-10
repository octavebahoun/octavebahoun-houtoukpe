import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Download, Moon, Sun } from "lucide-react";
import { IDENTITY } from "../data/portfolioData";
import { useTheme } from "../hooks/useTheme";

const ROUTES = [
  { to: "/", label: "Accueil", end: true },
  { to: "/about", label: "Parcours" },
  { to: "/projects", label: "Œuvres" },
  { to: "/jarvis-lab", label: "Jarvis" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`topbar${stuck ? " is-stuck" : ""}`}>
      <div className="wrap">
        <div className="topbar__inner">
          <Link to="/" className="sigil" aria-label="Retour à l'accueil">
            <span className="sigil__mark">{IDENTITY.initials}</span>
            <span>
              <span className="sigil__name">{IDENTITY.firstName} B.-H.</span>
              <br />
              <span className="sigil__role">{IDENTITY.title}</span>
            </span>
          </Link>

          <div className="topbar__controls">
            <nav className="topbar__nav">
              {ROUTES.map((r) => (
                <NavLink
                  key={r.to}
                  to={r.to}
                  end={r.end}
                  className={({ isActive }) =>
                    `navlink${isActive ? " is-active" : ""}`
                  }
                >
                  {r.label}
                </NavLink>
              ))}
              <a
                className="btn btn--solid"
                href={IDENTITY.links.cv}
                download
                style={{ padding: "0.6rem 1.1rem", fontSize: "0.7rem" }}
              >
                <Download size={14} />
                CV
              </a>
            </nav>

            <button
              type="button"
              className="theme-toggle"
              onClick={toggle}
              aria-label={
                theme === "dark" ? "Passer en thème clair" : "Passer en thème sombre"
              }
              title={theme === "dark" ? "Thème clair" : "Thème sombre"}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              className="burger"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`drawer${open ? " is-open" : ""}`}>
        <div className="wrap">
          <div className="drawer__inner">
            {ROUTES.map((r) => (
              <NavLink
                key={r.to}
                to={r.to}
                end={r.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `navlink${isActive ? " is-active" : ""}`
                }
              >
                {r.label}
              </NavLink>
            ))}
            <a
              className="btn btn--solid"
              href={IDENTITY.links.cv}
              download
              onClick={() => setOpen(false)}
              style={{ alignSelf: "flex-start" }}
            >
              <Download size={14} />
              Télécharger le CV
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
