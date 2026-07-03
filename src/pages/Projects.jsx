import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getProjects } from "../api/mock";
import { ProjectCard } from "./Home";
import { Helmet } from "react-helmet-async";
import { useLang } from "../lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["all", "web", "iot", "design"];

export default function Projects() {
  const { t } = useLang();
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
          <p className="section-label">{t("selected.title")}</p>
          <h1 className="h1" style={{ marginBottom: "16px" }}>
            {t("projects.title.prefix")} <span style={{ color: "var(--accent)" }}>{t("projects.title.highlight")}</span>
          </h1>
          <p style={{ color: "var(--muted)", maxWidth: "500px", marginBottom: "48px" }}>
            {t("projects.desc")}
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
                {cat === "all" ? t("projects.category.all") : t("cat_" + cat)}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="projects-grid" ref={gridRef}>
            {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>

          {filtered.length === 0 && (
            <p style={{ color: "var(--muted)", textAlign: "center", padding: "60px 0" }}>
              {t("card.no_projects")}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
