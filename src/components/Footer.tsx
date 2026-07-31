import { Link } from "react-router-dom";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, NpmIcon } from "./SocialIcons";
import WorldToggle from "./WorldToggle";
import { IDENTITY } from "../data/portfolioData";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <p className="cartouche">Disponible pour opportunités</p>
            <h3
              className="serif-italic"
              style={{ fontSize: "1.9rem", marginTop: "1rem", lineHeight: 1.25 }}
            >
              Une idée à faire&nbsp;
              <span className="lumen" style={{ fontStyle: "italic" }}>
                tourner
              </span>{" "}
              ?
            </h3>
            <p
              style={{
                color: "var(--mist-dim)",
                fontSize: "0.88rem",
                marginTop: "0.7rem",
                maxWidth: "26rem",
              }}
            >
              Hackathons, missions freelance, contributions open source ou
              recrutement — je réponds.
            </p>
            <Link
              to="/contact"
              className="btn"
              style={{ marginTop: "1.4rem" }}
            >
              Prendre contact <ArrowUpRight size={15} />
            </Link>
          </div>

          <div style={{ display: "grid", gap: "0.4rem" }}>
            <a className="coord" href={`mailto:${IDENTITY.email}`}>
              <Mail size={16} className="coord__i" />
              <span>
                <span className="coord__l">Courriel</span>
                <br />
                <span className="coord__v">{IDENTITY.email}</span>
              </span>
            </a>
            <div className="coord">
              <MapPin size={16} className="coord__i" />
              <span>
                <span className="coord__l">Base</span>
                <br />
                <span className="coord__v">{IDENTITY.location}</span>
              </span>
            </div>
            <div className="socials" style={{ marginTop: "1rem" }}>
              <a
                className="social"
                href={IDENTITY.links.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
              >
                <GithubIcon />
              </a>
              <a
                className="social"
                href={IDENTITY.links.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
              >
                <LinkedinIcon />
              </a>
              <a
                className="social"
                href={IDENTITY.links.npm}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="NPM"
              >
                <NpmIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="footer__base">
          <span>
            © {year} {IDENTITY.fullName}
          </span>
          <WorldToggle />
          <span>React · Three.js · GSAP — un seul monde, huit pièces</span>
        </div>
      </div>
    </footer>
  );
}
