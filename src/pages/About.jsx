import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAbout } from "../api/mock";
import { Helmet } from "react-helmet-async";
import { Github, Linkedin, Mail, ArrowRight, Sparkles, Zap, BrainCircuit, MapPin, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../lib/i18n";
import profilePhoto from "../../profile.jpg";

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_ICONS = {
  GitHub: <Github size={16} />,
  LinkedIn: <Linkedin size={16} />,
  Email: <Mail size={16} />,
};

export default function About() {
  const { t } = useLang();
  const [data, setData] = useState(null);
  const heroRef = useRef(null);
  const valuesRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    getAbout().then((d) => {
      setData(d);

      const ctx = gsap.context(() => {
        gsap.from(heroRef.current?.querySelectorAll(".reveal-item"), {
          opacity: 0, y: 40, stagger: 0.12, duration: 0.6, ease: "power2.out",
        });

        if (valuesRef.current) {
          gsap.from(valuesRef.current.querySelectorAll(".about-val"), {
            opacity: 0, y: 24, stagger: 0.08, duration: 0.5, ease: "power2.out",
            scrollTrigger: { trigger: valuesRef.current, start: "top 85%" },
          });
        }

        if (timelineRef.current) {
          gsap.from(timelineRef.current.querySelectorAll(".about-timeline__item"), {
            opacity: 0, x: 36, stagger: 0.12, duration: 0.55, ease: "power2.out",
            scrollTrigger: { trigger: timelineRef.current, start: "top 80%" },
          });
        }
      }, heroRef);

      return () => ctx.revert();
    });
  }, []);

  if (!data) return null;

  return (
    <>
      <Helmet>
        <title>About — Octave Bahoun | My Developer Journey</title>
        <meta name="description" content="Learn more about Octave Bahoun's mission, values, and journey as a software engineer and AI enthusiast." />
      </Helmet>

      <section className="section about-page" ref={heroRef}>
        <div className="container about-page__container">

          {/* ─── HERO ─────────────────────────────────────── */}
          <header className="about-hero">
            <div className="about-hero__profile reveal-item">
              <div className="about-profile">
                <img src={profilePhoto} alt="Octave Bahoun portrait" className="about-profile__img" />
                <div className="about-profile__overlay" />
              </div>
              <div className="about-profile__meta" style={{ marginTop: "16px" }}>
                <p className="label">{t("about.role")}</p>
                <h2 className="h3" style={{ marginBottom: "4px" }}>Octave Bahoun-Houtoukpe</h2>
                <p style={{ color: "var(--muted)", fontSize: "13px" }}>
                  Lokossa, Bénin
                </p>
              </div>
            </div>

            <div className="about-hero__copy reveal-item">
              <span className="section-label" style={{ marginBottom: "12px", display: "inline-flex" }}>{t("about.kicker")}</span>
              <h1 className="h1 about-hero__title" style={{ marginBottom: "20px" }}>
                {t("about.title")} <span style={{ color: "var(--accent)" }}>{t("about.title.suffix")}</span>
              </h1>
              <div style={{ position: "relative", paddingLeft: "20px", borderLeft: "2px solid var(--accent)", marginBottom: "24px" }}>
                <p className="about-hero__lead" style={{ fontStyle: "italic", fontSize: "16px", lineHeight: 1.8 }}>
                  "{t("about.lead")}"
                </p>
              </div>
              <Link to="/contact" className="btn btn-primary" style={{ display: "inline-flex" }}>
                {t("about.cta_btn")} <ArrowRight size={16} />
              </Link>
            </div>

            <div className="about-hero__stats reveal-item">
              <div className="about-stat-card about-stat-card--hero">
                <span className="about-stat__n">02</span>
                <span className="about-stat__label">{t("homeabout.stat3")}</span>
              </div>
              <div className="about-stat-card about-stat-card--hero">
                <span className="about-stat__n">08+</span>
                <span className="about-stat__label">{t("homeabout.stat1")}</span>
              </div>
              <div className="about-stat-card about-stat-card--hero">
                <span className="about-stat__n">AI</span>
                <span className="about-stat__label">{t("hero.greeting").includes("AI") ? "Primary focus" : "Focus principal"}</span>
              </div>
            </div>
          </header>

          {/* ─── BENTO ────────────────────────────────────── */}
          <div className="about-bento" style={{ marginTop: "40px" }}>
            {/* Mission — spans 2 cols */}
            <article className="card about-panel about-panel--mission">
              <div className="about-panel__header">
                <Sparkles size={16} />
                <p className="label" style={{ marginBottom: 0 }}>{t("about.mission")}</p>
              </div>
              <p className="about-panel__text">{data.mission}</p>
              <p className="about-panel__text">{data.bio}</p>
            </article>

            {/* Values */}
            <article className="card about-panel about-panel--values">
              <div className="about-panel__header">
                <BrainCircuit size={16} />
                <p className="label" style={{ marginBottom: 0 }}>{t("about.build")}</p>
              </div>
              <div ref={valuesRef} className="about-values">
                {data.values.map((value, index) => (
                  <div key={index} className="about-val">
                    <div className="about-val__icon">
                      {index === 0 && <Zap size={14} />}
                      {index === 1 && <BrainCircuit size={14} />}
                      {index > 1 && <Sparkles size={14} />}
                    </div>
                    <div>
                      <h3>{value.title}</h3>
                      <p>{value.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* Timeline — spans 2 cols */}
            <article className="card about-panel about-panel--timeline">
              <div className="about-panel__header" style={{ marginBottom: "18px" }}>
                <MapPin size={16} />
                <p className="label" style={{ marginBottom: 0 }}>{t("about.journey")}</p>
              </div>
              <div className="about-timeline" ref={timelineRef}>
                {data.journey.map((item, index) => (
                  <div key={index} className="about-timeline__item">
                    <span className="about-timeline__dot" />
                    <div className="about-timeline__card">
                      <div className="about-timeline__head">
                        <h3>{item.title}</h3>
                        <span>{item.year}</span>
                      </div>
                      <p className="about-timeline__subtitle">{item.subtitle}</p>
                      <p className="about-timeline__text">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* Socials */}
            <article className="card about-panel about-panel--socials">
              <div className="about-panel__header">
                <Linkedin size={16} />
                <p className="label" style={{ marginBottom: 0 }}>{t("about.online")}</p>
              </div>
              <div className="about-socials">
                {data.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-socials__link"
                  >
                    <span>{SOCIAL_ICONS[social.label]}</span>
                    {social.label}
                  </a>
                ))}
              </div>
              <div className="about-signature">
                <p>{t("about.design_by")}</p>
                <strong>Octave Précieux M.</strong>
                <span>BAHOUN-HOUTOUKPE</span>
              </div>
            </article>
          </div>

          {/* ─── CTA ──────────────────────────────────────── */}
          <div className="about-cta card">
            <div>
              <p className="label">{t("about.cta_label")}</p>
              <h2 className="h3" style={{ marginBottom: "12px" }}>{t("about.cta_text")}</h2>
            </div>
            <Link to="/contact" className="btn btn-primary about-cta__btn">
              {t("about.cta_btn")} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
