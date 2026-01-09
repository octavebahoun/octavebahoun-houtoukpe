import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import Navbar from "./UI/Navbar";
import Footer from "./UI/Footer";
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
    <Loader2 className="animate-spin text-blue-500" size={40} />
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
    <div className="min-h-screen bg-dark-bg text-white selection:bg-blue-500/30 font-sans">
      <ScrollToTop />
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-40" />

      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[140px] animate-pulse will-change-transform"
          style={{ transform: "translate3d(0,0,0)" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[140px] animate-pulse will-change-transform"
          style={{ animationDelay: "2s", transform: "translate3d(0,0,0)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[120px] will-change-transform"
          style={{ transform: "translate3d(-50%, -50%, 0)" }}
        />
      </div>

      {!isAdminPage && <Navbar />}

      <main
        className={`relative z-10 max-w-7xl mx-auto px-6 ${
          isAdminPage ? "pt-10" : "pt-24"
        } pb-20`}
      >
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Suspense>
      </main>

      {!isAdminPage && <Footer />}
    </div>
  );
}
export default App;
