import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ExternalLink, Github, Layers, CircleDot, Clock3 } from "lucide-react";
import { getProjects } from "../api/mock";
import { useLang } from "../lib/i18n";

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

      <section className="section">
        <div className="container">
          <Link to="/projects" className="btn btn-ghost" style={{ marginBottom: "28px", display: "inline-flex" }}>
            <ArrowLeft size={14} /> {t("project.back")}
          </Link>

          <div className="project-detail-layout" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.45fr) minmax(320px, 0.8fr)", gap: "24px", alignItems: "start" }}>
            <article className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ position: "relative", minHeight: "340px" }}>
                <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: "340px" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(8,8,8,0.06), rgba(8,8,8,0.9))" }} />
                <div style={{ position: "absolute", left: "22px", bottom: "22px", right: "22px" }}>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
                    <span className="badge">{project.category}</span>
                    <span className="badge" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Clock3 size={12} /> {t("status_" + project.status.toLowerCase().replace(/\s+/g, "_"))}</span>
                  </div>
                  <h1 className="h1" style={{ marginBottom: "10px" }}>{project.title}</h1>
                  <p style={{ color: "rgba(255,255,255,0.78)", maxWidth: "760px", lineHeight: 1.75 }}>{project.description}</p>
                </div>
              </div>

              <div style={{ padding: "24px" }}>
                <h2 className="h3" style={{ marginBottom: "14px" }}>{t("project.overview")}</h2>
                <p style={{ color: "var(--muted)", lineHeight: 1.85, marginBottom: "20px" }}>
                  {t("project.overview_text")}
                </p>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "24px" }}>
                  {project.stacks.map((stack) => (
                    <span key={stack} className="badge">{stack}</span>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      <ExternalLink size={16} /> {t("card.live_demo")}
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                      <Github size={16} /> {t("card.source_code")}
                    </a>
                  )}
                </div>
              </div>
            </article>

            <aside style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div className="card" style={{ display: "grid", gap: "14px" }}>
                <p className="label">{t("project.snapshot")}</p>
                <div style={{ display: "grid", gap: "12px" }}>
                  <DetailRow icon={<Layers size={14} />} label={t("project.category")} value={project.category} />
                  <DetailRow icon={<CircleDot size={14} />} label={t("project.status")} value={t("status_" + project.status.toLowerCase().replace(/\s+/g, "_"))} />
                  <DetailRow icon={<Clock3 size={14} />} label={t("project.stack_size")} value={`${project.stacks.length} ${t("project.stack_size")}`} />
                </div>
              </div>

              <div className="card" style={{ display: "grid", gap: "14px" }}>
                <p className="label">{t("project.stack")}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {project.stacks.map((stack) => (
                    <span key={stack} className="about__tag">{stack}</span>
                  ))}
                </div>
              </div>

              <div className="card" style={{ display: "grid", gap: "12px" }}>
                <p className="label">{t("project.next_step")}</p>
                <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
                  {t("project.next_step_text")}
                </p>
              </div>
            </aside>
          </div>

          {relatedProjects.length > 0 && (
            <div style={{ marginTop: "40px" }}>
                <p className="section-label">{t("project.related")}</p>
              <div className="projects-grid">
                {relatedProjects.map((item) => (
                  <Link key={item.id} to={`/projects/${item.id}`} className="card" style={{ display: "block" }}>
                    <img src={item.image} alt={item.title} className="card-img" loading="lazy" />
                    <h3 className="h3" style={{ marginBottom: "8px" }}>{item.title}</h3>
                    <p style={{ color: "var(--muted)", fontSize: "13px", lineHeight: 1.6 }}>{item.intro || item.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
      <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--muted)", fontSize: "13px" }}>
        {icon}
        {label}
      </span>
      <span style={{ color: "var(--text)", fontSize: "13px", fontWeight: 700, textTransform: "capitalize" }}>{value}</span>
    </div>
  );
}