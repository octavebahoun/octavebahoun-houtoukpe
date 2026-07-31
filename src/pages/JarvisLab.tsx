import { Cpu, Radio } from "lucide-react";

import JarvisChatBot from "../components/JarvisChatBot";
import Reveal, { SectionHead } from "../components/Reveal";

const READOUT = [
  { n: "Unité", v: "JARVIS-AI v2.0" },
  { n: "Statut", v: "Actif · En ligne" },
  { n: "Moteur", v: "Agent Conversationnel Intelligent" },
  { n: "Base de connaissance", v: "Profil, projets, compétences, parcours" },
  { n: "Temps de réponse", v: "Instantané" },
];

export default function JarvisLab() {
  return (
    <section className="section section--first">
      <div className="wrap">
        <SectionHead num="VII" title="Jarvis" />

        <Reveal>
          <p
            className="serif-italic"
            style={{
              color: "var(--ink-dim)",
              fontSize: "1.05rem",
              maxWidth: "46rem",
              marginBottom: "2.4rem",
            }}
          >
            Jarvis est l'agent intelligent indexé sur l'ensemble de mon
            profil, de mes projets et de mes réalisations.
          </p>
        </Reveal>

        <div className="lab">
          <JarvisChatBot />

          <div style={{ display: "grid", gap: "1.2rem", alignContent: "start" }}>
            <Reveal className="frame">
              <div style={{ padding: "1.5rem 1.4rem" }}>
                <span className="cartouche">
                  <Radio size={11} /> Télémétrie System
                </span>

                <div style={{ marginTop: "1.3rem" }}>
                  {READOUT.map((r) => (
                    <div
                      key={r.n}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "1rem",
                        padding: "0.55rem 0",
                        borderBottom: "1px solid var(--hairline)",
                      }}
                    >
                      <span
                        className="mono"
                        style={{
                          fontSize: "0.58rem",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "var(--ink-faint)",
                        }}
                      >
                        {r.n}
                      </span>
                      <span
                        style={{
                          fontSize: "0.82rem",
                          color: "var(--ink)",
                          textAlign: "right",
                        }}
                      >
                        {r.v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal className="frame" delay={0.1}>
              <div style={{ padding: "1.5rem 1.4rem" }}>
                <span className="cartouche cartouche--clay">
                  <Cpu size={11} /> Architecture IA
                </span>
                <p
                  style={{
                    color: "var(--ink-dim)",
                    fontSize: "0.86rem",
                    lineHeight: 1.75,
                    marginTop: "1.1rem",
                  }}
                >
                  Jarvis est une IA conversationnelle dédiée à l'exploration interactive de mon portfolio. Il analyse et synthétise mes réalisations, compétences et expériences pour répondre instantanément à vos questions.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

