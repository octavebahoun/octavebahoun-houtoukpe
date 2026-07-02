import { Github, Linkedin, Twitter } from "lucide-react";
import Logo from "./Logo";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/certs", label: "Certs" },
  { to: "/contact", label: "Contact" },
];

const SOCIALS = [
  { href: "https://github.com/octavebahoun", icon: <Github size={18} />, label: "GitHub" },
  { href: "https://www.linkedin.com/in/octave-bahoun-b9114b337/", icon: <Linkedin size={18} />, label: "LinkedIn" },
  { href: "#", icon: <Twitter size={18} />, label: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "40px", marginBottom: "48px" }}>
          {/* Brand */}
          <div>
            <Logo />
            <p style={{ color: "var(--muted)", fontSize: "13px", marginTop: "16px", maxWidth: "260px" }}>
              Fullstack engineer & AI enthusiast. Building digital experiences that matter.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="label" style={{ marginBottom: "16px" }}>Navigation</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
              {LINKS.map(l => (
                <li key={l.to}>
                  <a href={l.to} style={{ color: "var(--muted)", fontSize: "13px", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "var(--accent)"}
                    onMouseLeave={e => e.target.style.color = "var(--muted)"}
                  >{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="label" style={{ marginBottom: "16px" }}>Contact</p>
            <p style={{ color: "var(--muted)", fontSize: "13px" }}>octavebahoun@gmail.com</p>
            <p style={{ color: "var(--muted)", fontSize: "13px", marginTop: "8px" }}>Lokossa, Bénin</p>
            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer"
                  style={{
                    width: "36px", height: "36px", borderRadius: "8px",
                    border: "1px solid var(--border)", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    color: "var(--muted)", transition: "all 0.2s"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ color: "var(--muted)", fontSize: "12px" }}>
            © {new Date().getFullYear()} Octave Bahoun-Houtoukpe. All rights reserved.
          </p>
          <p className="label">Built with React + GSAP</p>
        </div>
      </div>

      {/* Watermark */}
      <div className="footer__watermark" aria-hidden="true">O&lt;ktav&gt;</div>
    </footer>
  );
}
