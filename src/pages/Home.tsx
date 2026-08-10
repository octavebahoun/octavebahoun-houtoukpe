import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Download,
  Frame,
  Mail,
  Palette,
} from "lucide-react";

import Reveal, { SectionHead, Tally } from "../components/Reveal";
import Magnetic from "../components/Magnetic";
import { BADGES, IDENTITY, TALLY } from "../data/portfolioData";
import portrait from "../assets/octave-portrait.jpg";

gsap.registerPlugin(ScrollTrigger);

/* Découpe un texte en caractères animables sans casser les mots. */
function splitToChars(line: string) {
  return line.split(" ").map((word, wi, words) => (
    <span
      key={`${word}-${wi}`}
      style={{ display: "inline-block", whiteSpace: "nowrap" }}
    >
      {Array.from(word).map((ch, ci) => (
        <span key={ci} className="hero__char">
          {ch}
        </span>
      ))}
      {wi < words.length - 1 && (
        <span className="hero__char" style={{ width: "0.28em" }}>
          &nbsp;
        </span>
      )}
    </span>
  ));
}

const HALLS = [
  {
    to: "/projects",
    icon: Frame,
    t: "Les Œuvres",
    d: "Sept réalisations : pipelines RAG, studios de datasets, PWA, moteurs vidéo.",
  },
  {
    to: "/about",
    icon: Palette,
    t: "Le Parcours",
    d: "INSTI Lokossa, Excellence Team, hackathons, ateliers Data & IA.",
  },
  {
    to: "/jarvis-lab",
    icon: Bot,
    t: "Jarvis",
    d: "Un assistant conversationnel indexé sur l'ensemble de mon profil.",
  },
  {
    to: "/contact",
    icon: Mail,
    t: "Contact",
    d: "CV, terminal interactif, coordonnées et formulaire de message.",
  },
];

export default function Home() {
  const hero = useRef<HTMLElement>(null);
  const creed = useRef<HTMLElement>(null);

  /* Le manifeste est la seule section épinglée de la page : au-delà de une
     ou deux, l'épinglage se bat contre le défilement natif et devient
     pénible, surtout sur mobile. */
  useLayoutEffect(() => {
    const el = creed.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 900) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=90%",
            scrub: 1,
            pin: true,
            pinSpacing: true,
          },
        })
        /* Le point de départ reste lisible : à 0.12 d'opacité et 7px de
           flou, la phrase passait pour un défaut d'affichage tant qu'on
           n'avait pas fini de dérouler la section. */
        .fromTo(
          ".creed__line",
          { opacity: 0, filter: "blur(8px)" },
          { opacity: 1, filter: "blur(0px)", stagger: 0.4 },
        )
        .to(".creed__rule", { scaleX: 1, transformOrigin: "left" }, "<")
        /* Sans étape dédiée ici, les compteurs avaient leur propre
           ScrollTrigger (dans Tally) qui se déclenchait dès l'entrée dans
           la section épinglée — donc avant le manifeste, pas après. Cette
           étape les rattache à la même timeline pour respecter l'ordre. */
        .fromTo(".tally", { opacity: 0, y: 16 }, { opacity: 1, y: 0 });
    }, el);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".hero__cartouche",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7 },
      )
        .fromTo(
          ".hero__char",
          { yPercent: 118, opacity: 0, rotateX: -55 },
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.1,
            stagger: { each: 0.022, from: "start" },
          },
          "-=0.35",
        )
        .fromTo(
          ".hero__lead",
          { opacity: 0, y: 22, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9 },
          "-=0.75",
        )
        .fromTo(
          ".hero__badges > *",
          { opacity: 0, y: 16, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08 },
          "-=0.55",
        )
        .fromTo(
          ".hero__cta > *",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.4",
        )
        .fromTo(
          ".scroll-hint",
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.3",
        );
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="hero" ref={hero}>
        <div className="wrap">
          <div className="hero__row">
            <div className="hero__stack">
              <span className="cartouche hero__cartouche" style={{ opacity: 0 }}>
                Lokossa, Bénin · Open to Work
              </span>

              <h1 className="hero__title">
                <span className="ln">{splitToChars("Octave")}</span>
                <span className="ln hero__name">
                  {splitToChars("BAHOUN-HOUTOUKPE")}
                </span>
                <span
                  className="ln serif-italic"
                  style={{
                    fontSize: "0.4em",
                    fontWeight: 400,
                    color: "var(--ink-dim)",
                    marginTop: "0.55rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {splitToChars("Architecte IA & Fullstack")}
                </span>
              </h1>

              <p className="hero__lead" style={{ opacity: 0 }}>
                « {IDENTITY.tagline} »
              </p>

              <div className="hero__badges">
                {BADGES.map((b) => (
                  <span key={b} className="cartouche cartouche--clay">
                    {b}
                  </span>
                ))}
              </div>

              <div className="hero__cta">
                <Magnetic strength={0.3}>
                  <Link to="/projects" className="btn btn--solid">
                    Entrer dans la galerie <ArrowRight size={15} />
                  </Link>
                </Magnetic>
                <Magnetic strength={0.22}>
                  <a className="btn" href={IDENTITY.links.cv} download>
                    <Download size={15} /> CV PDF
                  </a>
                </Magnetic>
              </div>
            </div>

            <div className="hero__portrait">
              <img
                src={portrait}
                alt="Portrait d'Octave Précieux Mahunan Bahoun-Houtoukpe"
              />
            </div>
          </div>
        </div>

        <div className="scroll-hint" style={{ opacity: 0 }}>
          <span>Descendre</span>
          <span className="scroll-hint__line" />
        </div>
      </section>

      {/* ---------------- Manifeste (section épinglée) ---------------- */}
      <section className="section creed" ref={creed}>
        <div className="wrap wrap--tight">
          <p className="creed__text">
            <span className="creed__line">J'assemble des systèmes</span>{" "}
            <span className="creed__line">
              où le{" "}
              <span className="lumen" style={{ fontStyle: "italic" }}>
                modèle
              </span>{" "}
              et l'
              <span className="aura" style={{ fontStyle: "italic" }}>
                interface
              </span>
            </span>{" "}
            <span className="creed__line">sont pensés d'un seul geste</span>{" "}
            <span className="creed__line">
              — du chunking sémantique jusqu'au dernier pixel.
            </span>
          </p>

          <hr className="filet creed__rule" />

          <div className="tally" style={{ justifyContent: "center" }}>
            {TALLY.map((t) => (
              <Tally key={t.l} n={t.n} l={t.l} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Salles ---------------- */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead num="I" title="Les salles" />

          <Reveal className="halls" stagger={0.1}>
            {HALLS.map(({ to, icon: Icon, t, d }) => (
              <Link key={to} to={to} className="frame frame--corners hall">
                <div>
                  <Icon size={28} strokeWidth={1.2} className="hall__i" />
                  <h3 className="hall__t">{t}</h3>
                  <p className="hall__d">{d}</p>
                </div>
                <span className="hall__go">
                  Ouvrir <ArrowUpRight size={13} />
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
