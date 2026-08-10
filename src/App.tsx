import { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import JarvisLab from "./pages/JarvisLab";
import Contact from "./pages/Contact";

import "./App.css";

gsap.registerPlugin(ScrollTrigger);

/* Transition entre les pages : voile de papier + remontée. */
function RoomTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    /* Surtout ne pas tuer les ScrollTrigger ici : ceux de la nouvelle page
       sont déjà créés (les effets de mise en page des enfants passent avant
       celui-ci). Chaque composant révoque les siens à son démontage. */
    const tl = gsap.timeline();
    tl.fromTo(
      ".room-veil",
      { scaleY: 1, transformOrigin: "top" },
      { scaleY: 0, transformOrigin: "top", duration: 0.7, ease: "power4.inOut" },
    ).fromTo(
      ".room",
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.45",
    );

    const id = window.setTimeout(() => ScrollTrigger.refresh(), 260);
    return () => {
      window.clearTimeout(id);
      tl.kill();
    };
  }, [pathname]);

  return (
    <>
      <div
        className="room-veil"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 500,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, var(--paper) 0%, var(--paper-2) 55%, var(--belge-veil) 100%)",
          transform: "scaleY(0)",
          transformOrigin: "top",
        }}
      />
      <div className="room" key={pathname}>
        {children}
      </div>
    </>
  );
}

function Layout() {
  /* Les révélations au scroll (Reveal.tsx) calculent leur zone de
     déclenchement au montage — avant que les polices web et les images
     (le portrait du hero, par exemple) n'aient fini de charger. Tant que
     rien ne recalcule ces positions, une police ou une image qui change
     la mise en page après coup décale la zone de déclenchement, et des
     sections entières restent invisibles même arrêté sur elles. Un seul
     rafraîchissement, une fois que tout est chargé, remet tout d'aplomb. */
  useEffect(() => {
    let cancelled = false;
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };

    const pageLoaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();

    Promise.all([pageLoaded, fontsReady]).then(refresh);

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <div className="grain" />
      <div className="shell">
        <Navbar />
        <main id="contenu" style={{ flex: 1 }}>
          <RoomTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/jarvis-lab" element={<JarvisLab />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </RoomTransition>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
