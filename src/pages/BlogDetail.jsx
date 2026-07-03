import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Clock, Calendar, Tag, BookOpen } from "lucide-react";
import { blogData } from "../api/mock";

export default function BlogDetail() {
  const { postId } = useParams();

  const post = useMemo(() => {
    return blogData.posts.find((p) => String(p.id) === String(postId)) || null;
  }, [postId]);

  if (!post) {
    return (
      <section className="section">
        <div className="container" style={{ minHeight: "50vh", display: "grid", placeItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <p className="section-label">Blog</p>
            <h1 className="h1" style={{ marginBottom: "16px" }}>Article not found</h1>
            <Link to="/blog" className="btn btn-primary">
              <ArrowLeft size={16} /> Back to blog
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} — O&lt;ktav&gt; Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <article>
        {/* ─── HERO ─────────────────────────── */}
        <header className="blog-post__hero">
          <img src={post.cover} alt={post.title} className="blog-post__hero-img" />
          <div className="blog-post__hero-overlay" />
          <div className="container blog-post__hero-content">
            <Link to="/blog" className="blog-post__back">
              <ArrowLeft size={14} /> Back to blog
            </Link>
            <div className="blog-post__hero-meta">
              <span><Calendar size={14} /> {post.date}</span>
              <span><Clock size={14} /> {post.readTime}</span>
              <span><BookOpen size={14} /> {post.tags[0]}</span>
            </div>
            <h1 className="h1 blog-post__hero-title">{post.title}</h1>
            <p className="blog-post__hero-excerpt">{post.excerpt}</p>
            <div className="blog-post__hero-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="badge"><Tag size={10} /> {tag}</span>
              ))}
            </div>
          </div>
        </header>

        {/* ─── BODY ─────────────────────────── */}
        <div className="section">
          <div className="container blog-post__container">
            <div className="blog-post__body">
              {post.body?.map((block, i) => {
                if (block.type === "h3") {
                  return (
                    <div key={i} className="blog-post__section-head">
                      <span className="blog-post__section-num">{String(i + 1).padStart(2, "0")}</span>
                      <h2 className="h2 blog-post__h2">{block.text}</h2>
                    </div>
                  );
                }
                return <p key={i} className="blog-post__p">{block.text}</p>;
              })}
            </div>

            <footer className="blog-post__footer">
              <p className="blog-post__footer-label">Enjoyed this article?</p>
              <Link to="/contact" className="btn btn-primary">
                Let's discuss it <ArrowLeft size={14} style={{ transform: "rotate(180deg)" }} />
              </Link>
            </footer>
          </div>
        </div>
      </article>
    </>
  );
}
