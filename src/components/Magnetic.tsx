import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

/* ============================================================
   Micro-interaction magnétique : l'élément vient vers le curseur
   quand il l'approche, puis revient en place avec un rebond.
   `quickTo` interpole tout seul — pas besoin de throttler le
   mousemove, et les écouteurs sont retirés au démontage.
   ============================================================ */

export default function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  /** Part du décalage curseur/centre reportée sur l'élément. */
  strength?: number;
  className?: string;
}) {
  const host = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = host.current?.firstElementChild as HTMLElement | null;
    if (!el) return;

    /* Sur un écran tactile il n'y a pas de survol : le magnétisme n'a
       aucun sens et coûterait des écouteurs pour rien. */
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const xTo = gsap.quickTo(el, "x", {
      duration: 0.4,
      ease: "elastic.out(1, 0.4)",
    });
    const yTo = gsap.quickTo(el, "y", {
      duration: 0.4,
      ease: "elastic.out(1, 0.4)",
    });

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * strength);
      yTo((e.clientY - r.top - r.height / 2) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <span ref={host} className={className} style={{ display: "contents" }}>
      {children}
    </span>
  );
}
