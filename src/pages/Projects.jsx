import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getProjects } from "../api/mock";
import { ProjectCard } from "./Home";
import { Helmet } from "react-helmet-async";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["all", "web", "iot", "design"];

export default function Projects() {
  const [projects, setProjects]   = useState([]);
  const [filter, setFilter]       = useState("all");
  const gridRef = useRef(null);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    gsap.from(gridRef.current.querySelectorAll(".card"), {
      opacity: 0, y: 40, stagger: 0.08, duration: 0.5, ease: "power2.out",
    });
  }, [filter, projects]);

  const filtered = filter === "all" ? projects : projects.filter(p => p.category === filter);

  return (
    <>
      <Helmet>
        <title>Projects — O&lt;ktav&gt; Portfolio</title>
        <meta name="description" content="Browse all projects by Octave Bahoun — web apps, IoT systems, and design work." />
      </Helmet>

      <section className="section">
        <div className="container">
          {/* Header */}
          <p className="section-label">My work</p>
          <h1 className="h1" style={{ marginBottom: "16px" }}>
            All <span style={{ color: "var(--accent)" }}>Projects</span>
          </h1>
          <p style={{ color: "var(--muted)", maxWidth: "500px", marginBottom: "48px" }}>
            A collection of web apps, IoT systems, and design projects I've shipped.
          </p>

          {/* Filter tabs */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "40px", flexWrap: "wrap" }} role="tablist">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                role="tab"
                aria-selected={filter === cat}
                onClick={() => setFilter(cat)}
                className={filter === cat ? "btn btn-primary" : "btn btn-ghost"}
                style={{ fontSize: "11px", padding: "7px 16px", textTransform: "capitalize" }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="projects-grid" ref={gridRef}>
            {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>

          {filtered.length === 0 && (
            <p style={{ color: "var(--muted)", textAlign: "center", padding: "60px 0" }}>
              No projects in this category yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
