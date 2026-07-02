import { useEffect, useState } from "react";
import { getBlog } from "../api/mock";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Clock, Tag } from "lucide-react";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => { getBlog().then(setPosts); }, []);

  return (
    <>
      <Helmet>
        <title>Blog — O&lt;ktav&gt; | Dev Notes & Articles</title>
        <meta name="description" content="Articles and notes from Octave Bahoun on web development, animation, AI, and design." />
      </Helmet>

      <section className="section">
        <div className="container">
          <p className="section-label">Writing</p>
          <h1 className="h1" style={{ marginBottom: "16px" }}>
            Dev <span style={{ color: "var(--accent)" }}>Notes</span>
          </h1>
          <p style={{ color: "var(--muted)", maxWidth: "500px", marginBottom: "60px" }}>
            Thoughts, tutorials, and write-ups on frontend craft, animation, and AI.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "800px" }}>
            {posts.map(post => <BlogRow key={post.id} post={post} />)}
          </div>
        </div>
      </section>
    </>
  );
}

function BlogRow({ post }) {
  return (
    <article className="blog-card">
      <img src={post.cover} alt={post.title} style={{ height: "200px", objectFit: "cover" }} loading="lazy" />
      <div className="blog-card__body">
        <div className="blog-card__meta">
          <span className="badge">{post.tags[0]}</span>
          <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--muted)", fontSize: "12px" }}>
            <Clock size={12} /> {post.readTime}
          </span>
          <span style={{ color: "var(--muted)", fontSize: "12px" }}>{post.date}</span>
        </div>
        <h2 className="h3" style={{ marginBottom: "10px" }}>{post.title}</h2>
        <p style={{ color: "var(--muted)", fontSize: "14px" }}>{post.excerpt}</p>
      </div>
      <div className="blog-card__footer">
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {post.tags.map(t => <span key={t} className="badge">{t}</span>)}
        </div>
        <a href="#" className="btn btn-outline" style={{ fontSize: "11px", padding: "6px 14px" }}>
          Read <ArrowRight size={12} />
        </a>
      </div>
    </article>
  );
}
