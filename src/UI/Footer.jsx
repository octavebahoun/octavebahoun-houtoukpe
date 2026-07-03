import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useLang } from "../lib/i18n";

const LINKS = [
  { to: "/", label: "nav.home" },
  { to: "/projects", label: "nav.projects" },
  { to: "/about", label: "nav.about" },
  { to: "/contact", label: "nav.contact" },
];

const SOCIALS = [
  { href: "https://github.com/octavebahoun", icon: <Github size={18} />, label: "GitHub" },
  { href: "https://www.linkedin.com/in/octave-bahoun-b9114b337/", icon: <Linkedin size={18} />, label: "LinkedIn" },
  { href: "mailto:octavebahoun@gmail.com", icon: <Mail size={18} />, label: "Email" },
];

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer footer--strong">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo />
            <p className="footer__brand-text">
              {t("footer.tagline")}
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
            <p className="label">{t("footer.nav")}</p>
            <nav className="footer__nav-list" aria-label="Footer navigation">
              {LINKS.map((link) => (
                <Link key={link.to} to={link.to} className="footer__nav-link">
                  {t(link.label)}
                </Link>
              ))}
            </nav>
          </div>

          <div className="footer__status">
            <p className="label">{t("footer.status_title")}</p>
            <div className="footer__status-line">
              <span className="footer__status-dot" />
              <span>{t("footer.available")}</span>
            </div>
            <p className="footer__status-copy">
              {t("footer.status_text")}
            </p>
            <button
              type="button"
              className="footer__top-btn"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              {t("footer.btt")} <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__fineprint">
            © {new Date().getFullYear()} Octave Bahoun-Houtoukpe. {t("footer.copyright")}
          </p>
          <p className="footer__credit">{t("footer.credit_prefix")} <span>♥</span> {t("footer.credit_suffix")}</p>
        </div>
      </div>

      <div className="footer__watermark" aria-hidden="true">O&lt;ktav&gt;</div>
    </footer>
  );
}
