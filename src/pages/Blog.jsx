import { useEffect, useState } from "react";
import { getBlog, blogData } from "../api/mock";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Clock, Sparkles, BookOpen, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../lib/i18n";

export default function Blog() {
  const { t } = useLang();
  const [posts, setPosts] = useState([]);
  const [data] = useState(blogData);

  useEffect(() => {
    getBlog().then(setPosts);
  }, []);

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <Helmet>
        <title>Blog — O&lt;ktav&gt; | Dev Notes & Articles</title>
        <meta name="description" content="Articles and notes from Octave Bahoun on web development, animation, AI, and design." />
      </Helmet>

      <section className="section blog-page">
        <div className="container">
          <p className="section-label">{t("blog.title")}</p>
          <h1 className="h1" style={{ marginBottom: "16px" }}>
            {t("blog.title")} <span style={{ color: "var(--accent)" }}>{t("blog.title_highlight")}</span>
          </h1>
          <p className="blog-page__intro">
            {t("blog.desc")}
          </p>

          <div className="blog-bento">
            <article className="card blog-featured">
              <div className="blog-featured__media">
                <img src={featured?.cover} alt={featured?.title} />
                <div className="blog-featured__overlay" />
                <div className="blog-featured__content">
                  <div className="blog-chip-row">
                    <span className="badge">{t("blog.featured")}</span>
                    <span className="badge">{featured?.tags?.[0]}</span>
                    <span className="badge blog-chip-row__meta"><Clock size={12} /> {featured?.readTime}</span>
                  </div>
                  <h2 className="h2">{featured?.title}</h2>
                  <p className="blog-featured__excerpt">{featured?.excerpt}</p>
                  <div className="blog-featured__actions">
                    <Link to="/contact" className="btn btn-primary">
                      Talk about it <ArrowRight size={14} />
                    </Link>
                    <span className="btn btn-ghost blog-featured__pill">
                      <BookOpen size={14} /> {t("blog.featured") === "Featured" ? "Frontend craft" : "Frontend"}
                    </span>
                  </div>
                </div>
              </div>
            </article>

            <article className="card blog-note-card">
              <div className="blog-note-card__header">
                <Sparkles size={16} />
                <p className="label" style={{ marginBottom: 0 }}>{t("blog.why_write_title")}</p>
              </div>
              <p className="blog-note-card__text">
                {t("blog.why_write_body")}
              </p>
              <div className="blog-stats">
                {data.stats.map((s, i) => (
                  <div key={i} className="about-stat-card blog-stat-card">
                    <span className="about-stat__n">{s.value}</span>
                    <span className="about-stat__label">{s.label}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="card blog-note-card blog-note-card--wide">
              <div className="blog-note-card__header">
                <BarChart3 size={16} />
                <p className="label" style={{ marginBottom: 0 }}>{t("blog.what_find")}</p>
              </div>
              <div className="blog-pill-grid">
                {data.topics.map((topic, i) => (
                  <span key={i} className="about__tag">{topic}</span>
                ))}
              </div>
            </article>

            {rest.map((post, index) => (
              <BlogBentoCard key={post.id} post={post} tone={index % 2 === 0 ? "left" : "right"} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function BlogBentoCard({ post, tone }) {
  return (
    <Link to={`/blog/${post.id}`} className={`card blog-card blog-card--${tone}`}>
      <div className="blog-card__media">
        <img src={post.cover} alt={post.title} loading="lazy" />
        <div className="blog-card__overlay" />
        <div className="blog-card__tag">
          <span className="badge">{post.tags[0]}</span>
        </div>
      </div>
      <div className="blog-card__body">
        <div className="blog-card__meta">
          <span className="blog-card__time"><Clock size={12} /> {post.readTime}</span>
          <span>{post.date}</span>
        </div>
        <h2 className="h3">{post.title}</h2>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        <div className="blog-card__tags">
          {post.tags.map((tag) => (
            <span key={tag} className="badge">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}