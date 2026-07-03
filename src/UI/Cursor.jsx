import { useEffect } from "react";

export default function Cursor() {
  const isFinePointer = window.matchMedia?.("(pointer: fine)")?.matches ?? true;

  useEffect(() => {
    if (!isFinePointer) return;

    const dot  = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;

    let rx = 0, ry = 0;
    const move = (e) => {
      dot.style.left  = e.clientX + "px";
      dot.style.top   = e.clientY + "px";
      rx += (e.clientX - rx) * 0.12;
      ry += (e.clientY - ry) * 0.12;
      ring.style.left = rx + "px";
      ring.style.top  = ry + "px";
    };

    let raf;
    const animate = () => { raf = requestAnimationFrame(animate); };
    animate();

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!isFinePointer) return null;

  return (
    <>
      <div id="cursor-dot"  aria-hidden="true" />
      <div id="cursor-ring" aria-hidden="true" />
    </>
  );
}
