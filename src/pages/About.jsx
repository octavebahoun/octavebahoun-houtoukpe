import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAbout } from "../api/mock";
import { Helmet } from "react-helmet-async";
import { Github, Linkedin, Mail, ArrowRight, Sparkles, Zap, BrainCircuit, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import profilePhoto from "../../profile.jpg";

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_ICONS = {
  GitHub: <Github size={16} />,
  LinkedIn: <Linkedin size={16} />,
  Email: <Mail size={16} />,
};

const INTERESTS = [
  { label: "Web Development" },
  { label: "Mobile Apps" },
  { label: "AI & ML" },
  { label: "Data Science" },
  { label: "IoT & Embedded" },
];

export default function About() {
  const [data, setData] = useState(null);
  const sectionRef = useRef(null);
  const valuesRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    getAbout().then((d) => {
      setData(d);

      const ctx = gsap.context(() => {
        if (valuesRef.current) {
          gsap.from(valuesRef.current.querySelectorAll(".about-val"), {
            opacity: 0,
            y: 24,
            stagger: 0.08,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: { trigger: valuesRef.current, start: "top 85%" },
          });
        }

        if (timelineRef.current) {
          gsap.from(timelineRef.current.querySelectorAll(".about-timeline__item"), {
            opacity: 0,
            x: 36,
            stagger: 0.12,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: { trigger: timelineRef.current, start: "top 80%" },
          });
        }
      }, sectionRef);

      return () => ctx.revert();
    });
  }, []);

  if (!data) return null;

  return (
    <>
      <Helmet>
        <title>About — Octave Bahoun | My Developer Journey</title>
        <meta
          name="description"
          content="Learn more about Octave Bahoun's mission, values, and journey as a software engineer and AI enthusiast."
        />
      </Helmet>

      <section className="section about-page" ref={sectionRef}>
        <div className="container about-page__container">
          <header className="about-hero">
            <div className="about-kicker">
              <span className="section-label" style={{ marginBottom: 0 }}>Get to know me</span>
            </div>
            <div className="about-hero__copy">
              <h1 className="h1 about-hero__title">
                About <span style={{ color: "var(--accent)" }}>Me</span>
              </h1>
              <p className="about-hero__lead">
                I build useful interfaces, ship practical systems, and keep pushing the craft forward.
                The goal is not decoration. It is clarity, speed, and products that feel intentional.
              </p>
            </div>
            <div className="about-hero__stats">
              <div className="about-stat-card about-stat-card--hero">
                <span className="about-stat__n">02</span>
                <span className="about-stat__label">Internships</span>
              </div>
              <div className="about-stat-card about-stat-card--hero">
                <span className="about-stat__n">08+</span>
                <span className="about-stat__label">Projects shipped</span>
              </div>
              <div className="about-stat-card about-stat-card--hero">
                <span className="about-stat__n">AI</span>
                <span className="about-stat__label">Primary focus</span>
              </div>
            </div>
          </header>

          <div className="about-bento">
            <article className="card about-panel about-panel--profile">
              <div className="about-profile">
                <img src={profilePhoto} alt="Octave Bahoun portrait" className="about-profile__img" />
                <div className="about-profile__overlay" />
              </div>
              <div className="about-profile__meta">
                <p className="label">Software Engineer • AI Enthusiast</p>
                <h2 className="h3" style={{ marginBottom: "8px" }}>Octave Bahoun-Houtoukpe</h2>
                <p style={{ color: "var(--muted)", lineHeight: 1.8 }}>
                  Based in Lokossa, Bénin. I design and build digital products across web, systems, and AI.
                </p>
              </div>
            </article>

            <article className="card about-panel about-panel--mission">
              <div className="about-panel__header">
                <Sparkles size={16} />
                <p className="label" style={{ marginBottom: 0 }}>My mission</p>
              </div>
              <p className="about-panel__text">{data.mission}</p>
              <p className="about-panel__text">{data.bio}</p>
              <div className="about-panel__chips">
                {INTERESTS.map((item) => (
                  <span key={item.label} className="about__tag">{item.label}</span>
                ))}
              </div>
            </article>

            <article className="card about-panel about-panel--values">
              <div className="about-panel__header">
                <BrainCircuit size={16} />
                <p className="label" style={{ marginBottom: 0 }}>What I love to build</p>
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

            <article className="card about-panel about-panel--timeline">
              <div className="about-panel__header" style={{ marginBottom: "18px" }}>
                <MapPin size={16} />
                <p className="label" style={{ marginBottom: 0 }}>My developer journey</p>
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

            <article className="card about-panel about-panel--socials">
              <div className="about-panel__header">
                <Linkedin size={16} />
                <p className="label" style={{ marginBottom: 0 }}>Find me online</p>
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
                <p>Designed with passion by</p>
                <strong>Octave Précieux M.</strong>
                <span>BAHOUN-HOUTOUKPE</span>
              </div>
            </article>
          </div>

          <div className="about-cta card">
            <div>
              <p className="label">Ready to collaborate?</p>
              <h2 className="h3" style={{ marginBottom: "12px" }}>Let's build something sharp, fast, and memorable.</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.8, maxWidth: "620px" }}>
                If you want a product that feels considered from first pixel to last interaction, I can help shape it.
              </p>
            </div>
            <Link to="/contact" className="btn btn-primary about-cta__btn">
              Work with me <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}