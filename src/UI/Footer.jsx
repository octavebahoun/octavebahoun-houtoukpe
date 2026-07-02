import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const SOCIALS = [
  { href: "https://github.com/octavebahoun", icon: <Github size={18} />, label: "GitHub" },
  { href: "https://www.linkedin.com/in/octave-bahoun-b9114b337/", icon: <Linkedin size={18} />, label: "LinkedIn" },
  { href: "mailto:octavebahoun@gmail.com", icon: <Mail size={18} />, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="footer footer--strong">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo />
            <p className="footer__brand-text">
              Crafting interactive digital experiences with a focus on clarity, speed, and precision.
            </p>
            <div className="footer__socials">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer__nav">
            <p className="label">Navigation</p>
            <nav className="footer__nav-list" aria-label="Footer navigation">
              {LINKS.map((link) => (
                <Link key={link.to} to={link.to} className="footer__nav-link">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="footer__status">
            <p className="label">Status</p>
            <div className="footer__status-line">
              <span className="footer__status-dot" />
              <span>Available for hire</span>
            </div>
            <p className="footer__status-copy">
              Open to worldwide freelance opportunities and collaborations.
            </p>
            <button
              type="button"
              className="footer__top-btn"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Back to top <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__fineprint">
            © {new Date().getFullYear()} Octave Bahoun-Houtoukpe. All rights reserved.
          </p>
          <p className="footer__credit">Designed with <span>♥</span> in Lokossa</p>
        </div>
      </div>

      {/* Watermark */}
      <div className="footer__watermark" aria-hidden="true">O&lt;ktav&gt;</div>
    </footer>
  );
}
