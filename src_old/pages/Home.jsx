import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLanding } from "../api/mock";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef   = useRef(null);
  const titleRef  = useRef(null);
  const subRef    = useRef(null);
  const ctaRef    = useRef(null);
  const workRef   = useRef(null);
  const stripRef  = useRef(null);

  useEffect(() => {
    getLanding().then(({ hero, selectedWork, skills }) => {
      // Hero entrance
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.from(titleRef.current, { opacity: 0, y: 40, duration: 0.7 })
        .from(subRef.current,   { opacity: 0, y: 24, duration: 0.5 }, "-=0.3")
        .from(ctaRef.current,   { opacity: 0, y: 16, duration: 0.4 }, "-=0.2");

      // Scroll reveal for work cards
      if (workRef.current) {
        gsap.from(workRef.current.querySelectorAll(".card"), {
          opacity: 0, y: 50, stagger: 0.12, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: workRef.current, start: "top 80%" },
        });
      }
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>O&lt;ktav&gt; — Octave Bahoun | Fullstack Engineer & AI</title>
        <meta name="description" content="Octave Bahoun-Houtoukpe — Fullstack engineer and AI enthusiast. Building digital experiences that matter. Based in Bénin." />
      </Helmet>

      <HeroSection heroRef={heroRef} titleRef={titleRef} subRef={subRef} ctaRef={ctaRef} />
      <SelectedWork workRef={workRef} />
      <SkillsStrip stripRef={stripRef} />
      <CTABanner />
    </>
  );
}

/* ─── HERO ─────────────────────────────────────────── */
function HeroSection({ heroRef, titleRef, subRef, ctaRef }) {
  return (
    <section className="hero" ref={heroRef} id="hero">
      {/* Orbs */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      {/* Scan lines */}
      <div className="scan-h" aria-hidden="true" />
      <div className="scan-v" aria-hidden="true" />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <p className="label" style={{ marginBottom: "24px" }}>// fullstack engineer & ai enthusiast</p>

        <h1 ref={titleRef} className="h1" style={{ maxWidth: "820px", marginBottom: "24px" }}>
          Crafting Digital<br />
          <span style={{ color: "var(--accent)" }}>Experiences</span>
        </h1>

        <p ref={subRef} className="hero__sub">
          I build fast, beautiful, and accessible web products — from concept to deployment.
          Based in Bénin, <span style={{ color: "var(--accent)" }}>available worldwide.</span>
        </p>

        <div ref={ctaRef} className="hero__ctas">
          <Link to="/projects" className="btn btn-primary" id="hero-cta-projects">
            View my work <ArrowRight size={16} />
          </Link>
          <Link to="/contact" className="btn btn-outline" id="hero-cta-contact">
            Get in touch
          </Link>
        </div>

        {/* Floating stat pills */}
        <div style={{ display: "flex", gap: "16px", marginTop: "64px", flexWrap: "wrap" }}>
          {[
            { n: "8+",  label: "Projects shipped" },
            { n: "2",   label: "Internships" },
            { n: "100%", label: "Passion" },
          ].map(s => (
            <div key={s.label} style={{
              padding: "12px 20px", borderRadius: "8px",
              border: "1px solid var(--border)", background: "var(--surface)",
              backdropFilter: "blur(8px)",
            }}>
              <span style={{ display: "block", fontFamily: "'Black Ops One', sans-serif", fontSize: "22px", color: "var(--accent)" }}>{s.n}</span>
              <span style={{ fontSize: "11px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SELECTED WORK ─────────────────────────────────── */
function SelectedWork({ workRef }) {
  const [data, setData] = useState([]);
  useEffect(() => { getLanding().then(d => setData(d.selectedWork)); }, []);

  return (
    <section className="section" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="container">
        <p className="section-label">Selected Work</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
          <h2 className="h2">Featured Projects</h2>
          <Link to="/projects" className="btn btn-ghost" style={{ fontSize: "12px" }}>
            All projects <ArrowRight size={14} />
          </Link>
        </div>

        <div className="projects-grid" ref={workRef}>
          {data.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECT CARD ──────────────────────────────────── */
export function ProjectCard({ project: p }) {
  const cardRef = useRef(null);

  const onMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = ((e.clientX - left) / width  - 0.5) * 14;
    const y = ((e.clientY - top)  / height - 0.5) * 14;
    gsap.to(card, { rotateX: -y, rotateY: x, scale: 1.02, duration: 0.4, ease: "power2.out", transformPerspective: 600 });
  };
  const onMouseLeave = () => {
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.5, ease: "power2.out" });
  };

  return (
    <div className="card" ref={cardRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <img src={p.image} alt={p.title} className="card-img" loading="lazy" />
      <h3 className="h3" style={{ marginBottom: "8px" }}>{p.title}</h3>
      <p style={{ color: "var(--muted)", fontSize: "13px", marginBottom: "16px", lineHeight: 1.6 }}>
        {p.intro || p.description}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
        {p.stacks.map(s => <span key={s} className="badge">{s}</span>)}
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        {p.demoUrl && (
          <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: "11px", padding: "8px 14px" }}>
            <ExternalLink size={12} /> Demo
          </a>
        )}
        {p.githubUrl && (
          <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: "11px", padding: "8px 14px" }}>
            <Github size={12} /> Code
          </a>
        )}
      </div>
    </div>
  );
}

/* ─── SKILLS STRIP ──────────────────────────────────── */
function SkillsStrip() {
  const skills = ["React","Next.js","Node.js","TypeScript","Python","Vue.js","MongoDB","PostgreSQL","Docker","Linux","GSAP","Figma","C++","Firebase","Arduino","Express"];
  const doubled = [...skills, ...skills];

  return (
    <div className="skills-strip" aria-label="Tech stack">
      <div className="skills-track">
        {doubled.map((s, i) => (
          <div key={i} className="skill-item">{s}</div>
        ))}
      </div>
    </div>
  );
}

/* ─── CTA BANNER ────────────────────────────────────── */
function CTABanner() {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: "center" }}>
        <div style={{ position: "relative", display: "inline-block", maxWidth: "600px" }}>
          <div className="orb" style={{ width: "300px", height: "300px", top: "50%", left: "50%", transform: "translate(-50%,-50%)", position: "absolute" }} aria-hidden="true" />
          <p className="label" style={{ marginBottom: "16px", display: "block" }}>Ready to collaborate?</p>
          <h2 className="h2" style={{ marginBottom: "24px" }}>
            Let's build something <span style={{ color: "var(--accent)" }}>great</span>
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: "32px" }}>
            I'm currently available for freelance projects and open to new opportunities.
          </p>
          <Link to="/contact" className="btn btn-primary" id="cta-hire-btn" style={{ fontSize: "14px", padding: "14px 32px" }}>
            Hire me <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
