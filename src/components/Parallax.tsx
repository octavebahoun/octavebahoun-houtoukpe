import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   Couches en parallaxe pilotées par le défilement.
   Réservé au décor : parallaxer du corps de texte gêne la lecture
   et peut provoquer un malaise. Toutes les couches d'un même bloc
   partagent un seul ScrollTrigger.
   ============================================================ */

export default function Parallax({
  children,
  className = "",
  /** Décalage vertical de la couche la plus lente, en % de sa hauteur. */
  depth = 8,
}: {
  children: ReactNode;
  className?: string;
  depth?: number;
}) {
  const host = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = host.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const layers = gsap.utils.toArray<HTMLElement>("[data-layer]", el);
      if (layers.length === 0) return;

      layers.forEach((layer, i) => {
        const rank = Number(layer.dataset.layer) || i + 1;
        gsap.to(layer, {
          yPercent: -depth * rank,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
            /* On libère le GPU dès que le bloc quitte l'écran. */
            onToggle: ({ isActive }) => {
              layer.style.willChange = isActive ? "transform" : "auto";
            },
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [depth]);

  return (
    <div ref={host} className={className} style={{ position: "relative" }}>
      {children}
    </div>
  );
}
