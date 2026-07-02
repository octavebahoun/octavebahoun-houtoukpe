import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAbout } from "../api/mock";
import { Helmet } from "react-helmet-async";
import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_ICONS = { GitHub: <Github size={18} />, LinkedIn: <Linkedin size={18} />, Email: <Mail size={18} /> };

export default function About() {
  const [data, setData] = useState(null);
  const timelineRef = useRef(null);
  const valuesRef   = useRef(null);

  useEffect(() => {
    getAbout().then(d => {
      setData(d);
      setTimeout(() => {
        if (timelineRef.current) {
          gsap.from(timelineRef.current.querySelectorAll(".timeline-item"), {
            opacity: 0, x: 30, stagger: 0.15, duration: 0.5, ease: "power2.out",
            scrollTrigger: { trigger: timelineRef.current, start: "top 80%" },
          });
        }
        if (valuesRef.current) {
          gsap.from(valuesRef.current.querySelectorAll(".val-item"), {
            opacity: 0, y: 20, stagger: 0.1, duration: 0.4, ease: "power2.out",
            scrollTrigger: { trigger: valuesRef.current, start: "top 85%" },
          });
        }
      }, 100);
    });
  }, []);

  if (!data) return null;

  return (
    <>
      <Helmet>
        <title>About — Octave Bahoun | Developer Journey</title>
        <meta name="description" content="Learn about Octave Bahoun's mission, values, and journey as a fullstack engineer and AI enthusiast." />
      </Helmet>

      <section className="section">
        <div className="container">
          <p className="section-label">Who I am</p>
          <h1 className="h1" style={{ marginBottom: "48px" }}>
            About <span style={{ color: "var(--accent)" }}>Me</span>
          </h1>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px" }}>
            {/* LEFT */}
            <div>
              {/* Bio */}
              <div className="card" style={{ marginBottom: "32px" }}>
                <h2 className="h3" style={{ marginBottom: "16px" }}>My Mission</h2>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.8 }}>{data.mission}</p>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.8, marginTop: "12px" }}>{data.bio}</p>
              </div>

              {/* Values */}
              <h2 className="h3" style={{ marginBottom: "20px" }}>What I Love to Build</h2>
              <div ref={valuesRef} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {data.values.map((v, i) => (
                  <div key={i} className="val-item" style={{
                    display: "flex", gap: "16px", alignItems: "flex-start",
                    padding: "14px 16px", borderRadius: "10px",
                    border: "1px solid var(--border)", background: "var(--surface)",
                    transition: "border-color 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,69,0,0.3)"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
                  >
                    <span style={{ fontSize: "22px", flexShrink: 0 }}>{v.icon}</span>
                    <div>
                      <p style={{ fontWeight: 700, marginBottom: "4px" }}>{v.title}</p>
                      <p style={{ color: "var(--muted)", fontSize: "13px" }}>{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div style={{ marginTop: "40px" }}>
                <p className="label" style={{ marginBottom: "16px" }}>Find me online</p>
                <div style={{ display: "flex", gap: "12px" }}>
                  {data.socials.map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="btn btn-outline" style={{ fontSize: "12px", gap: "8px" }}>
                      {SOCIAL_ICONS[s.label]} {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — Timeline */}
            <div>
              <h2 className="h3" style={{ marginBottom: "32px" }}>Developer Journey</h2>
              <div className="timeline" ref={timelineRef}>
                {data.journey.map((j, i) => (
                  <div key={i} className="timeline-item">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                      <h3 style={{ fontWeight: 700, fontSize: "15px" }}>{j.title}</h3>
                      <span className="badge">{j.year}</span>
                    </div>
                    <p style={{ color: "var(--accent)", fontSize: "12px", fontFamily: "'Syne Mono',monospace", marginBottom: "6px" }}>
                      {j.subtitle}
                    </p>
                    <p style={{ color: "var(--muted)", fontSize: "13px", lineHeight: 1.7 }}>{j.desc}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ marginTop: "40px", textAlign: "center", padding: "32px", borderRadius: "12px", border: "1px solid var(--border)", background: "var(--surface)" }}>
                <p style={{ color: "var(--muted)", marginBottom: "20px", fontSize: "14px" }}>
                  Ready to bring an exceptional digital experience to life?
                </p>
                <Link to="/contact" className="btn btn-primary">Work with me</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
