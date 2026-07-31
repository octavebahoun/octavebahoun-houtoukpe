import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

import ArtisticProjectCard from "../components/ArtisticProjectCard";
import Reveal, { SectionHead } from "../components/Reveal";
import { FILTERS, PROJECTS, type ProjectCategory } from "../data/portfolioData";

gsap.registerPlugin(Flip);

type Cat = "all" | ProjectCategory;

export default function Projects() {
  const [cat, setCat] = useState<Cat>("all");
  const grid = useRef<HTMLDivElement>(null);
  const snapshot = useRef<Flip.FlipState | null>(null);

  const cards = () =>
    gsap.utils.toArray<HTMLElement>(".oeuvre", grid.current ?? undefined);

  /* On photographie la grille avant le re-rendu, puis Flip interpole
     les positions : les cartes glissent au lieu de sauter. */
  const pick = (next: Cat) => {
    if (next === cat) return;
    snapshot.current = Flip.getState(cards());
    setCat(next);
  };

  useLayoutEffect(() => {
    if (!snapshot.current) return;
    Flip.from(snapshot.current, {
      duration: 0.7,
      ease: "power3.inOut",
      scale: true,
      absolute: true,
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { opacity: 0, scale: 0.88 },
          { opacity: 1, scale: 1, duration: 0.55, ease: "power2.out" },
        ),
      onLeave: (els) =>
        gsap.to(els, { opacity: 0, scale: 0.88, duration: 0.35 }),
    });
    snapshot.current = null;
  }, [cat]);

  const visible = (p: (typeof PROJECTS)[number]) =>
    cat === "all" || p.cats.includes(cat as ProjectCategory);

  const shown = PROJECTS.filter(visible).length;

  return (
    <section className="section section--first">
      <div className="wrap">
        <SectionHead num="VI" title="La galerie" />

        <Reveal>
          <p
            className="serif-italic"
            style={{
              color: "var(--ink-dim)",
              fontSize: "1.05rem",
              maxWidth: "48rem",
              marginBottom: "2.4rem",
            }}
          >
            Sept pièces, du pipeline RAG à la PWA. Chaque carte détaille la
            stack, le contexte et les liens.
          </p>
        </Reveal>

        <div className="filters">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              className={`filter${cat === f.id ? " is-on" : ""}`}
              onClick={() => pick(f.id)}
              aria-pressed={cat === f.id}
            >
              {f.label}
            </button>
          ))}
          <span
            className="mono"
            style={{
              alignSelf: "center",
              marginLeft: "0.6rem",
              color: "var(--ink-faint)",
            }}
          >
            {shown} pièce{shown > 1 ? "s" : ""} accrochée
            {shown > 1 ? "s" : ""}
          </span>
        </div>

        <div className="gallery" ref={grid}>
          {PROJECTS.map((p, i) =>
            visible(p) ? (
              <ArtisticProjectCard key={p.id} project={p} index={i} />
            ) : null,
          )}
        </div>
      </div>
    </section>
  );
}
