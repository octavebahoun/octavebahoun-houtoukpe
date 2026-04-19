import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import Navbar from "./UI/Navbar";
import Footer from "./UI/Footer";
import PageTransition from "./UI/PageTransition";
import ScrollToTop from "./components/ScrollToTop";
import { Loader2 } from "lucide-react";

// Lazy loading for pages
const Accueil = lazy(() => import("./components/Accueil"));
const Projects = lazy(() => import("./components/Project"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Login = lazy(() => import("./components/Login"));
const Admin = lazy(() => import("./components/Admin"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
    <Loader2 className="animate-spin text-cyan-500" size={40} />
    <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-mono animate-pulse">
      Loading Module...
    </span>
  </div>
);

function App() {
  const location = useLocation();
  const isAdminPage =
    location.pathname === "/admin" || location.pathname === "/login";

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-cyan-400/30 font-sans">
      <ScrollToTop />
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-40" />

      {/* Aurora Boreale — Animated Mesh Background */}
      <div className="aurora-bg">
        <div className="aurora-orb aurora-orb--1" />
        <div className="aurora-orb aurora-orb--2" />
      </div>

      {!isAdminPage && <Navbar />}

      <main
        className={`relative z-10 max-w-7xl mx-auto px-6 ${
          isAdminPage ? "pt-10" : "pt-24"
        } pb-20`}
      >
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Accueil /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
              <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      {!isAdminPage && <Footer />}
    </div>
  );
}
export default App;
