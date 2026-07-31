import { ArrowUpRight, Lock } from "lucide-react";
import type { Project } from "../data/portfolioData";

/* Une pièce de la galerie : titre, résumé, stack et liens. */
export default function ArtisticProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      className="frame frame--corners oeuvre"
      data-cats={project.cats.join(" ")}
    >
      <div className="oeuvre__head">
        <span
          className={`cartouche ${
            project.isPublic ? "cartouche--clay" : "cartouche--ox"
          }`}
        >
          {project.isPublic ? (
            <>Public · {num}</>
          ) : (
            <>
              <Lock size={10} /> Privé · {num}
            </>
          )}
        </span>
      </div>

      <div className="oeuvre__body">
        <h3 className="oeuvre__t">{project.title}</h3>
        <div className="oeuvre__sub">{project.kind}</div>

        <p className="oeuvre__d">
          {project.summary}
          <br />
          <span style={{ color: "var(--ink-faint)", fontSize: "0.82rem" }}>
            {project.detail}
          </span>
        </p>

        <div className="chips">
          {project.stack.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>

        <div className="oeuvre__acts">
          {project.links.map((l, i) => (
            <a
              key={l.url + i}
              className={`btn${i === 0 ? " btn--solid" : ""}`}
              href={l.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              {l.label} <ArrowUpRight size={13} />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
