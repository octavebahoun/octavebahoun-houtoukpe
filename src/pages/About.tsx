import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, MapPin, Trophy, Users } from "lucide-react";

import Reveal, { Gauge, SectionHead } from "../components/Reveal";
import {
  IDENTITY,
  SKILLS,
  TIMELINE,
  TOOLBOX,
} from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const frise = useRef<HTMLDivElement>(null);

  /* La frise se dessine au fil du défilement : le trait vertical grandit,
     chaque jalon surgit à son passage. */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".frise__item",
        { opacity: 0, x: -26, filter: "blur(5px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: frise.current,
            start: "top 78%",
            once: true,
          },
        },
      );
    }, frise);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ---------------- Portrait ---------------- */}
      <section className="section section--first">
        <div className="wrap">
          <SectionHead num="II" title="L'ingénieur & le meneur" />

          <div className="wrap--tight">
            <Reveal>
              <span className="cartouche">Portrait</span>

              <h3
                className="serif-italic"
                style={{
                  fontSize: "clamp(1.5rem, 3.4vw, 2.4rem)",
                  marginTop: "1.2rem",
                  lineHeight: 1.3,
                }}
              >
                {IDENTITY.fullName}
              </h3>

              <p
                style={{
                  color: "var(--ink-dim)",
                  marginTop: "1.2rem",
                  fontSize: "0.96rem",
                  lineHeight: 1.85,
                }}
              >
                {IDENTITY.bio}
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1.6rem",
                  marginTop: "1.8rem",
                }}
              >
                <span
                  className="mono"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "var(--ink-dim)",
                  }}
                >
                  <MapPin size={14} color="var(--belge-ink)" /> {IDENTITY.location}
                </span>
                <span
                  className="mono"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "var(--ink-dim)",
                  }}
                >
                  <GraduationCap size={14} color="var(--belge-ink)" /> INSTI Lokossa
                  (UNSTIM)
                </span>
              </div>

              <blockquote
                className="brushed"
                style={{ marginTop: "2rem", fontSize: "1.05rem" }}
              >
                <span className="serif-italic">« {IDENTITY.tagline} »</span>
              </blockquote>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ---------------- Excellence Team ---------------- */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead num="III" title="Excellence Team" />

          <div className="wrap--tight">

            <Reveal>
              <span className="cartouche cartouche--clay">
                Co-fondateur & Tech Lead — depuis août 2025
              </span>

              <p
                style={{
                  color: "var(--ink-dim)",
                  marginTop: "1.3rem",
                  fontSize: "0.96rem",
                  lineHeight: 1.85,
                }}
              >
                Startup digitale de six personnes, entre Lokossa et Cotonou.
                Nous construisons des plateformes critiques et intégrons des
                intelligences artificielles souveraines — des systèmes que nos
                clients peuvent héberger, auditer et faire évoluer eux-mêmes.
                J'y tiens la direction technique : architecture, choix de stack,
                revue de code et accompagnement de l'équipe.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "1rem",
                  marginTop: "2rem",
                }}
              >
                {[
                  { i: Users, n: "6", l: "Personnes" },
                  { i: Trophy, n: "1", l: "Hackathon HACKBYIFRI" },
                  { i: GraduationCap, n: "10+", l: "Étudiants encadrés" },
                ].map(({ i: I, n, l }) => (
                  <div key={l} className="frame" style={{ padding: "1.1rem" }}>
                    <I size={18} color="var(--belge-deep)" strokeWidth={1.3} />
                    <div className="tally__n" style={{ marginTop: "0.6rem" }}>
                      {n}
                    </div>
                    <div className="tally__l">{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Frise ---------------- */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap wrap--tight">
          <SectionHead num="IV" title="La frise" />

          <div className="frise" ref={frise}>
            {TIMELINE.map((m) => (
              <div
                key={m.what}
                className={`frise__item${m.current ? " frise__item--now" : ""}`}
              >
                <div className="frise__when">{m.when}</div>
                <h3 className="frise__what">{m.what}</h3>
                <div className="frise__where">{m.where}</div>
                <p className="frise__desc">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Matrice de compétences ---------------- */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead num="V" title="Matrice de compétences" />

          <Reveal className="matrix" stagger={0.12}>
            {SKILLS.map((group) => (
              <div key={group.title} className="frame matrix__col">
                <h3 className="matrix__h">
                  <span
                    className={group.accent === "volt" ? "lumen" : "aura"}
                  >
                    {group.title}
                  </span>
                </h3>
                {group.items.map((s) => (
                  <div key={s.n} className="skill">
                    <div className="skill__row">
                      <span className="skill__n">{s.n}</span>
                      <span className="skill__v">{s.v}</span>
                    </div>
                    <Gauge value={s.v} accent={group.accent} />
                  </div>
                ))}
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ marginTop: "2.5rem" }}>
              <span className="cartouche">Boîte à outils</span>
              <div className="chips" style={{ marginTop: "1rem" }}>
                {TOOLBOX.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
