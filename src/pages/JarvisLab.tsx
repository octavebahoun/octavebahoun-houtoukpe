import { Cpu, Radio, Waypoints } from "lucide-react";

import JarvisChatBot from "../components/JarvisChatBot";
import Reveal, { SectionHead } from "../components/Reveal";

const READOUT = [
  { n: "Unité", v: "VANGUARD-01" },
  { n: "Châssis", v: "131 maillages · 5 matériaux PBR" },
  { n: "Optique", v: "capteur frontal émissif" },
  { n: "Base de connaissance", v: "profil, projets, READMEs" },
  { n: "Latence", v: "locale — aucun appel réseau" },
];

export default function JarvisLab() {
  return (
    <section className="section section--first">
      <div className="wrap">
        <SectionHead num="VII" title="Jarvis 3D Lab" />

        <Reveal>
          <p
            className="serif-italic veil"
            style={{
              color: "var(--mist-dim)",
              fontSize: "1.05rem",
              maxWidth: "46rem",
              marginBottom: "2.4rem",
            }}
          >
            Le Vanguard tourne derrière vous, dans le monde. Ici, c'est Jarvis
            qui parle — indexé sur mon profil, mes projets et leurs READMEs.
          </p>
        </Reveal>

        <div className="lab">
          <JarvisChatBot />

          <div style={{ display: "grid", gap: "1.2rem", alignContent: "start" }}>
            <Reveal className="frame">
              <div style={{ padding: "1.5rem 1.4rem" }}>
                <span className="cartouche">
                  <Radio size={11} /> Télémétrie
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
                        borderBottom: "1px solid rgba(234, 230, 250, 0.06)",
                      }}
                    >
                      <span
                        className="mono"
                        style={{
                          fontSize: "0.58rem",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "var(--mist-faint)",
                        }}
                      >
                        {r.n}
                      </span>
                      <span
                        style={{
                          fontSize: "0.82rem",
                          color: "var(--mist)",
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
                <span className="cartouche cartouche--flux">
                  <Cpu size={11} /> Sous le capot
                </span>
                <p
                  style={{
                    color: "var(--mist-dim)",
                    fontSize: "0.86rem",
                    lineHeight: 1.75,
                    marginTop: "1.1rem",
                  }}
                >
                  Jarvis marche sans backend : la question est normalisée
                  (minuscules, accents retirés, ponctuation aplatie) puis
                  confrontée à une base de mots-clés pondérés par leur longueur.
                  La réponse la mieux notée gagne.
                </p>
                <p
                  className="mono"
                  style={{
                    color: "var(--mist-faint)",
                    fontSize: "0.62rem",
                    lineHeight: 1.8,
                    marginTop: "1rem",
                  }}
                >
                  <Waypoints size={11} style={{ verticalAlign: "-2px" }} /> Pour
                  le brancher sur un vrai LLM : remplacer answer() par un appel
                  Groq ou OpenRouter.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
