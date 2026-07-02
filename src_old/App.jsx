import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import "./index.css";
import Navbar from "./UI/Navbar";
import Footer from "./UI/Footer";
import Cursor from "./UI/Cursor";
import ScrollToTop from "./UI/ScrollToTop";
import { Loader2 } from "lucide-react";

const Home     = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const Blog     = lazy(() => import("./pages/Blog"));
const About    = lazy(() => import("./pages/About"));
const Certs    = lazy(() => import("./pages/Certs"));
const Contact  = lazy(() => import("./pages/Contact"));

const PageLoader = () => (
  <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Loader2 size={32} color="var(--accent)" className="spin" />
  </div>
);

export default function App() {
  const location = useLocation();
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  return (
    <>
      <Cursor />
      <div className="bg-circuit" aria-hidden="true" />
      <ScrollToTop />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main style={{ paddingTop: "var(--nav-h)" }}>
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/"        element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog"    element={<Blog />} />
            <Route path="/about"   element={<About />} />
            <Route path="/certs"   element={<Certs />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
