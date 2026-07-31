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
import World from "./components/World";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import JarvisLab from "./pages/JarvisLab";
import Contact from "./pages/Contact";

import "./App.css";

gsap.registerPlugin(ScrollTrigger);

/* Transition cinématique entre les salles : voile d'encre + remontée. */
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
            "linear-gradient(180deg, rgba(21,14,46,0.96) 0%, rgba(28,20,64,0.86) 55%, rgba(108,124,255,0.2) 100%)",
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
  return (
    <World>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <div className="weave" />
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
    </World>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
