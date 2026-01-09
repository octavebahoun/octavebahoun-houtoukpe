import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./UI/Navbar";
import Footer from "./UI/Footer";
import Accueil from "./components/Accueil";
import Projects from "./components/Project";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Admin from "./components/Admin";
import { useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

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
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[140px] animate-pulse" />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[140px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      {!isAdminPage && <Navbar />}

      <main
        className={`relative z-10 max-w-7xl mx-auto px-6 ${
          isAdminPage ? "pt-10" : "pt-24"
        } pb-20`}
      >
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      {!isAdminPage && <Footer />}
    </div>
  );
}
export default App;
