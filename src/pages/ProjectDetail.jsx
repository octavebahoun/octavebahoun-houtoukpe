import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ExternalLink, Layers, CircleDot, Clock3, ChevronRight } from "lucide-react";
import { Github, Linkedin } from "../lib/icons.jsx";
import { getProjects } from "../api/mock";
import { useLang } from "../lib/i18n";
import { ProjectCard } from "./Home";

export default function ProjectDetail() {
  const { t } = useLang();
  const { projectId } = useParams();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const project = useMemo(() => {
    return projects.find((item) => String(item.id) === String(projectId)) || null;
  }, [projects, projectId]);

  const relatedProjects = useMemo(() => {
    if (!project) return [];
    return projects.filter((item) => item.id !== project.id && item.category === project.category).slice(0, 3);
  }, [projects, project]);

  if (!project) {
    return (
      <section className="section">
        <div className="container" style={{ minHeight: "50vh", display: "grid", placeItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <p className="section-label">Projects</p>
            <h1 className="h1" style={{ marginBottom: "16px" }}>{t("project.notfound")}</h1>
            <Link to="/projects" className="btn btn-primary">
              <ArrowLeft size={16} /> {t("project.back")}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.title} — Project Detail</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <section className="section" style={{ paddingTop: 0 }}>
        {/* ─── HERO ─────────────────────────── */}
        <div className="project-detail__hero">
          <img src={project.image} alt={project.title} className="project-detail__hero-img" />
          <div className="project-detail__hero-overlay" />
          <div className="container project-detail__hero-content">
            <Link to="/projects" className="project-detail__back">
              <ArrowLeft size={14} /> {t("project.back")}
            </Link>
            <div className="project-detail__hero-badges">
              <span className="badge">{project.category}</span>
              <span className="badge" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <Clock3 size={12} /> {t("status_" + project.status.toLowerCase().replace(/\s+/g, "_"))}
              </span>
            </div>
            <h1 className="h1 project-detail__hero-title">{project.title}</h1>
            <p className="project-detail__hero-desc">{project.description}</p>
          </div>
        </div>

        <div className="container">
          {/* ─── CONTENT + SIDEBAR ──────────── */}
          <div className="project-detail__grid">
            <div className="project-detail__main">
              <h2 className="h3" style={{ marginBottom: "16px" }}>{t("project.overview")}</h2>
              <p className="project-detail__text">{t("project.overview_text")}</p>

              <div className="project-detail__stacks">
                {project.stacks.map((stack) => (
                  <span key={stack} className="badge" style={{ fontSize: "12px", padding: "4px 12px" }}>{stack}</span>
                ))}
              </div>

              <div className="project-detail__actions">
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <ExternalLink size={16} /> {t("card.live_demo")} <ChevronRight size={14} />
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    <Github size={16} /> {t("card.source_code")}
                  </a>
                )}
              </div>
            </div>

            <aside className="project-detail__aside">
              <div className="project-detail__info-card">
                <p className="label" style={{ marginBottom: "16px" }}>{t("project.snapshot")}</p>
                <div className="project-detail__info-rows">
                  <InfoRow icon={<Layers size={14} />} label={t("project.category")} value={project.category} />
                  <InfoRow icon={<CircleDot size={14} />} label={t("project.status")} value={t("status_" + project.status.toLowerCase().replace(/\s+/g, "_"))} />
                  <InfoRow icon={<Clock3 size={14} />} label={t("project.stack_size")} value={`${project.stacks.length} ${t("project.stack_size")}`} />
                </div>
              </div>

              <div className="project-detail__info-card">
                <p className="label" style={{ marginBottom: "14px" }}>{t("project.stack")}</p>
                <div className="project-detail__info-tags">
                  {project.stacks.map((stack) => (
                    <span key={stack} className="project-detail__tag">{stack}</span>
                  ))}
                </div>
              </div>

              <div className="project-detail__info-card">
                <p className="label" style={{ marginBottom: "10px" }}>{t("project.next_step")}</p>
                <p className="project-detail__next-text">{t("project.next_step_text")}</p>
              </div>
            </aside>
          </div>

          {/* ─── RELATED ────────────────────── */}
          {relatedProjects.length > 0 && (
            <div className="project-detail__related">
              <p className="section-label">{t("project.related")}</p>
              <div className="projects-grid">
                {relatedProjects.map((item) => (
                  <ProjectCard key={item.id} project={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="project-detail__info-row">
      <span className="project-detail__info-label">
        {icon}
        {label}
      </span>
      <span className="project-detail__info-value">{value}</span>
    </div>
  );
}
