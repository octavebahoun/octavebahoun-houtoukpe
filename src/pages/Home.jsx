import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLanding } from "../api/mock";
import { ExternalLink, Github, ArrowRight, Linkedin, Mail, Terminal, Globe, Database, Cpu, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLang } from "../lib/i18n";
import profilePhoto from "../../profile.jpg";

gsap.registerPlugin(ScrollTrigger);

/* ── Mots qui tournent dans le hero ── */
const WORD_KEYS = ["word.0", "word.1", "word.2", "word.3", "word.4"];

/* ── Pills de stack flottantes ── */
const STACK_PILLS_LEFT  = [
  { icon: <Terminal size={14} />, label: "React / TypeScript" },
  { icon: <Code2 size={14} />,    label: "Node.js / Express"  },
  { icon: <Cpu size={14} />,      label: "Arduino / C++"      },
];
const STACK_PILLS_RIGHT = [
  { icon: <Database size={14} />, label: "MongoDB / SQL"  },
  { icon: <Globe size={14} />,    label: "Vue.js / Next" },
  { icon: <Cpu size={14} />,      label: "Python / AI"  },
];

const SOCIALS = [
  { icon: <Github size={18} />,   href: "https://github.com/octavebahoun",                              label: "GitHub"   },
  { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/octave-bahoun-b9114b337/",         label: "LinkedIn" },
  { icon: <Mail size={18} />,     href: "mailto:octavebahoun@gmail.com",                                label: "Email"    },
];

const SKILLS_MARQUEE = ["React","TypeScript","Node.js","Python","Vue.js","MongoDB","PostgreSQL","Docker","Linux","GSAP","Figma","C++","Firebase","Arduino","Express","Next.js"];

export default function Home() {
  const heroRef  = useRef(null);
  const workRef  = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero lines entrance */
      gsap.from(".hero-line-1", { opacity: 0, y: 60, duration: 0.8, ease: "power3.out", delay: 0.2 });
      gsap.from(".hero-line-2", { opacity: 0, y: 60, duration: 0.8, ease: "power3.out", delay: 0.4 });
      gsap.from(".hero-line-3", { opacity: 0, y: 60, duration: 0.8, ease: "power3.out", delay: 0.6 });
      gsap.from(".hero-sub",    { opacity: 0, y: 20, duration: 0.6, ease: "power2.out", delay: 0.9 });
      gsap.from(".hero-pill",   { opacity: 0, y: 16, stagger: 0.1, duration: 0.5, ease: "power2.out", delay: 1.1 });
      gsap.from(".hero-orb-photo", { opacity: 0, scale: 0.8, duration: 1, ease: "power3.out", delay: 0.5 });

      /* Work cards */
      if (workRef.current) {
        gsap.from(workRef.current.querySelectorAll(".card"), {
          opacity: 0, y: 50, stagger: 0.12, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: workRef.current, start: "top 80%" },
        });
      }

      /* About section */
      if (aboutRef.current) {
        gsap.from(aboutRef.current.querySelectorAll(".about-item"), {
          opacity: 0, y: 30, stagger: 0.1, duration: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: aboutRef.current, start: "top 80%" },
        });
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>O&lt;ktav&gt; — Octave Bahoun | Fullstack Engineer &amp; AI</title>
        <meta name="description" content="Octave Bahoun-Houtoukpe — Software Engineer, AI enthusiast. Web, Systems, IoT. Based in Bénin." />
      </Helmet>

      <div ref={heroRef}>
        <HeroSection />
        <SelectedWork workRef={workRef} />
        <AboutSection aboutRef={aboutRef} />
        <SkillsStrip />
        <CTABanner />
      </div>
    </>
  );
}

/* ─── HERO ─────────────────────────────────────────────── */
function HeroSection() {
  const { t } = useLang();
  const [wordIdx, setWordIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  const WORDS = [t("word.0"), t("word.1"), t("word.2"), t("word.3"), t("word.4")];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setWordIdx(i => (i + 1) % WORDS.length);
        setAnimating(false);
      }, 300);
    }, 2400);
    return () => clearInterval(interval);
  }, [WORDS.length]);

  return (
    <section className="hero-v2" id="hero">
      {/* Background orbs */}
      <div className="orb orb-hero-1" aria-hidden="true" />
      <div className="orb orb-hero-2" aria-hidden="true" />
      <div className="scan-h" aria-hidden="true" />
      <div className="scan-v" aria-hidden="true" />

      {/* Floating pills left */}
      <div className="hero-pills hero-pills--left">
        {STACK_PILLS_LEFT.map((p, i) => (
          <div key={i} className="hero-pill" style={{ "--i": i }}>
            {p.icon} {p.label}
          </div>
        ))}
      </div>

      {/* Floating pills right */}
      <div className="hero-pills hero-pills--right">
        {STACK_PILLS_RIGHT.map((p, i) => (
          <div key={i} className="hero-pill" style={{ "--i": i }}>
            {p.icon} {p.label}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="hero-v2__content">
        {/* Eyebrow */}
        <p className="label hero-eyebrow">{t("hero.greeting")}</p>

        {/* Big headline */}
        <div className="hero-v2__headline">
          <div className="hero-line-1 hero-text-line">
            {t("hero.phrase1")}
          </div>
          <div className="hero-line-2 hero-text-line hero-text-line--accent">
            <span className={`hero-word${animating ? " hero-word--out" : " hero-word--in"}`}>
              {WORDS[wordIdx]}
            </span>
          </div>
          <div className="hero-line-3 hero-text-line">
            {t("hero.phrase2")}
          </div>
        </div>

        {/* Photo orb */}
        <div className="hero-orb-photo" aria-hidden="true">
          <div className="hero-orb-glow" />
          <div className="hero-orb-ring" />
          <div className="hero-orb-inner">
            <img className="hero-orb-photo__img" src={profilePhoto} alt="" />
          </div>
        </div>

        {/* Sub */}
        <p className="hero-sub">
          {t("hero.sub")}
        </p>

        {/* CTAs */}
        <div className="hero-ctas">
          <Link to="/projects" className="btn btn-primary" id="hero-cta-projects">
            {t("hero.cta.work")} <ArrowRight size={16} />
          </Link>
          <Link to="/contact" className="btn btn-outline" id="hero-cta-contact">
            {t("hero.cta.contact")}
          </Link>
          <div className="hero-socials">
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="hero-social-dot" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SELECTED WORK ──────────────────────────────────────── */
function SelectedWork({ workRef }) {
  const { t } = useLang();
  const [data, setData] = useState([]);
  useEffect(() => { getLanding().then(d => setData(d.selectedWork)); }, []);

  return (
    <section className="section" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="container">
        <p className="section-label">{t("selected.title")}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
          <h2 className="h2">{t("selected.featured")}</h2>
          <Link to="/projects" className="btn btn-ghost" style={{ fontSize: "12px" }}>
            {t("selected.all")} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="projects-grid" ref={workRef}>
          {data.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECT CARD (3D tilt) ─────────────────────────────── */
export function ProjectCard({ project: p }) {
  const { t } = useLang();
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
          <Link
            to={`/projects/${p.id}`}
            className="btn btn-ghost"
            style={{ fontSize: "11px", padding: "8px 14px" }}
          >
            {t("card.view_details")}
          </Link>
        {p.demoUrl && (
          <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: "11px", padding: "8px 14px" }}>
            <ExternalLink size={12} /> {t("card.demo")}
          </a>
        )}
        {p.githubUrl && (
          <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: "11px", padding: "8px 14px" }}>
            <Github size={12} /> {t("card.code")}
          </a>
        )}
      </div>
    </div>
  );
}

/* ─── ABOUT SECTION (home snippet) ──────────────────────── */
function AboutSection({ aboutRef }) {
  const { t } = useLang();
  const stats = [
    { n: "08+", label: t("homeabout.stat1") },
    { n: "09+", label: t("homeabout.stat2") },
    { n: "02",  label: t("homeabout.stat3") },
    { n: "∞",   label: t("homeabout.stat4") },
  ];

  return (
    <section className="section">
      <div className="container">
        <p className="section-label">Get to know me</p>
        <div className="about-home__grid">
          {/* Text */}
          <div>
            <h2 className="h2" style={{ marginBottom: "24px" }}>
              {t("homeabout.title")} <span style={{ color: "var(--accent)" }}>{t("homeabout.title_accent")}</span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
              <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.85 }}>
                {t("homeabout.p1")}
              </p>
              <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.85 }}>
                {t("homeabout.p2")}
              </p>
              <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.85, fontStyle: "italic" }}>
                {t("homeabout.p3")}
              </p>
            </div>
            <Link to="/about" className="btn btn-outline" style={{ display: "inline-flex", gap: "8px" }}>
              {t("homeabout.cta")} <ArrowRight size={16} />
            </Link>
          </div>

          {/* Stats grid */}
          <div ref={aboutRef} className="about-home__stats">
            {stats.map((s, i) => (
              <div key={i} className="about-item about-stat-card">
                <span className="about-stat__n">{s.n}</span>
                <span className="about-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SKILLS STRIP (marquee) ─────────────────────────────── */
function SkillsStrip() {
  const all = [...SKILLS_MARQUEE, ...SKILLS_MARQUEE];
  return (
    <div className="skills-strip" id="skills" aria-label="Tech stack">
      <div className="skills-track">
        {all.map((s, i) => <div key={i} className="skill-item">{s}</div>)}
      </div>
    </div>
  );
}

/* ─── CTA BANNER ─────────────────────────────────────────── */
function CTABanner() {
  const { t } = useLang();
  return (
    <section className="section">
      <div className="container" style={{ textAlign: "center" }}>
        <div style={{ position: "relative", display: "inline-block", maxWidth: "600px" }}>
          <div className="orb" style={{ width: "300px", height: "300px", top: "50%", left: "50%", transform: "translate(-50%,-50%)", position: "absolute" }} aria-hidden="true" />
          <p className="label" style={{ marginBottom: "16px", display: "block" }}>{t("cta.label")}</p>
          <h2 className="h2" style={{ marginBottom: "24px" }}>
            {t("cta.title")} <span style={{ color: "var(--accent)" }}>{t("cta.title_accent")}</span>
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: "32px", fontSize: "14px" }}>
            {t("cta.desc")}
          </p>
          <Link to="/contact" className="btn btn-primary" id="cta-hire-btn" style={{ fontSize: "14px", padding: "14px 32px" }}>
            {t("cta.btn")} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
