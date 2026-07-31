import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   Révélations au défilement — le motif « encre qui monte »
   utilisé partout dans le site.
   ============================================================ */

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Retard avant le début de l'animation, en secondes. */
  delay?: number;
  /** Décalage vertical initial, en pixels. */
  y?: number;
  /** Décalage horizontal initial, en pixels. */
  x?: number;
  /** Anime chaque enfant direct l'un après l'autre. */
  stagger?: number;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 34,
  x = 0,
  stagger,
}: RevealProps) {
  const host = useRef<HTMLDivElement>(null);

  useIso(() => {
    const el = host.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets =
        stagger !== undefined ? Array.from(el.children) : [el];

      if (stagger !== undefined) gsap.set(el, { opacity: 1 });

      gsap.fromTo(
        targets,
        { opacity: 0, y, x, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          x: 0,
          filter: "blur(0px)",
          duration: 1,
          delay,
          ease: "power3.out",
          stagger: stagger ?? 0,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, y, x, stagger]);

  return (
    <div ref={host} className={className} data-reveal="">
      {children}
    </div>
  );
}

/* ---------------- Titre de section ---------------- */

export function SectionHead({
  num,
  title,
  rule = true,
}: {
  num: string;
  title: string;
  rule?: boolean;
}) {
  return (
    <Reveal className="sec-head">
      <span className="sec-head__num">{num}</span>
      <h2 className="sec-head__title">{title}</h2>
      {rule && <span className="sec-head__rule" />}
    </Reveal>
  );
}

/* ---------------- Jauge animée au scroll ---------------- */

export function Gauge({
  value,
  accent = "volt",
}: {
  value: number;
  accent?: "volt" | "flux";
}) {
  const bar = useRef<HTMLDivElement>(null);

  useIso(() => {
    const el = bar.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        width: `${value}%`,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [value]);

  return (
    <div className="gauge">
      <div
        ref={bar}
        className={`gauge__fill${accent === "flux" ? " gauge__fill--flux" : ""}`}
      />
    </div>
  );
}

/* ---------------- Compteur qui s'incrémente ---------------- */

export function Tally({ n, l }: { n: string; l: string }) {
  const host = useRef<HTMLSpanElement>(null);

  useIso(() => {
    const el = host.current;
    if (!el) return;
    const digits = parseInt(n.replace(/\D/g, ""), 10);
    if (Number.isNaN(digits)) return;
    const suffix = n.replace(/[\d]/g, "");

    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      gsap.to(counter, {
        v: digits,
        duration: 1.7,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `${Math.round(counter.v)}${suffix}`;
        },
        scrollTrigger: { trigger: el, start: "top 94%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [n]);

  return (
    <div>
      <span ref={host} className="tally__n">
        0
      </span>
      <div className="tally__l">{l}</div>
    </div>
  );
}
