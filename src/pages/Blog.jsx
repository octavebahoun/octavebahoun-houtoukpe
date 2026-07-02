import { useEffect, useState } from "react";
import { getBlog } from "../api/mock";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Clock, Sparkles, BookOpen, TrendingUp, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

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
            Dev <span style={{ color: "var(--accent)" }}>Bento</span>
          </h1>
          <p style={{ color: "var(--muted)", maxWidth: "500px", marginBottom: "60px" }}>
            Thoughts, tutorials, and write-ups on frontend craft, animation, and AI.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
              gap: "20px",
              alignItems: "stretch",
            }}
          >
            <article className="card" style={{ gridColumn: "span 12", padding: 0, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(12, minmax(0, 1fr))" }}>
                <div style={{ gridColumn: "span 12", minHeight: "280px", position: "relative" }}>
                  <img src={posts[0]?.cover} alt={posts[0]?.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(8,8,8,0.08), rgba(8,8,8,0.85))" }} />
                  <div style={{ position: "absolute", left: "24px", right: "24px", bottom: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <span className="badge">Featured</span>
                      <span className="badge">{posts[0]?.tags?.[0]}</span>
                      <span className="badge" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Clock size={12} /> {posts[0]?.readTime}</span>
                    </div>
                    <h2 className="h2" style={{ maxWidth: "720px" }}>{posts[0]?.title}</h2>
                    <p style={{ color: "rgba(255,255,255,0.78)", maxWidth: "640px" }}>{posts[0]?.excerpt}</p>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <Link to="/contact" className="btn btn-primary" style={{ fontSize: "12px" }}>
                        Talk about it <ArrowRight size={14} />
                      </Link>
                      <span className="btn btn-ghost" style={{ fontSize: "12px", cursor: "default" }}>
                        <BookOpen size={14} /> Frontend craft
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <article className="card" style={{ gridColumn: "span 12 / span 12", padding: "24px", display: "grid", gap: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--accent)" }}>
                <Sparkles size={16} />
                <span className="label" style={{ letterSpacing: "0.18em" }}>Why I write</span>
              </div>
              <p style={{ color: "var(--muted)", lineHeight: 1.8, maxWidth: "760px" }}>
                I write to document what I learn, sharpen my thinking, and share practical ways to build faster, cleaner interfaces.
                The blog is a working notebook for UI, animation, AI, and product thinking.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "12px" }}>
                <div className="about-stat-card" style={{ padding: "18px 16px" }}>
                  <span className="about-stat__n" style={{ fontSize: "28px" }}>03</span>
                  <span className="about-stat__label">Published notes</span>
                </div>
                <div className="about-stat-card" style={{ padding: "18px 16px" }}>
                  <span className="about-stat__n" style={{ fontSize: "28px" }}>UI</span>
                  <span className="about-stat__label">Bento thinking</span>
                </div>
                <div className="about-stat-card" style={{ padding: "18px 16px" }}>
                  <span className="about-stat__n" style={{ fontSize: "28px" }}>AI</span>
                  <span className="about-stat__label">Systems & tools</span>
                </div>
              </div>
            </article>

            {posts.slice(1).map((post) => <BlogBentoCard key={post.id} post={post} />)}
          </div>
        </div>
      </section>
    </>
  );
}

function BlogBentoCard({ post }) {
  return (
    <article className="card" style={{ gridColumn: "span 6", padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ height: "220px", position: "relative" }}>
        <img src={post.cover} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(8,8,8,0.1), rgba(8,8,8,0.75))" }} />
        <div style={{ position: "absolute", left: "18px", top: "18px" }}>
          <span className="badge">{post.tags[0]}</span>
        </div>
      </div>
      <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--muted)", fontSize: "12px" }}>
          <Clock size={12} /> {post.readTime} <span>•</span> <span>{post.date}</span>
        </div>
        <h2 className="h3" style={{ marginBottom: 0 }}>{post.title}</h2>
        <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7 }}>{post.excerpt}</p>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "auto" }}>
          {post.tags.map(t => <span key={t} className="badge">{t}</span>)}
        </div>
      </div>
    </article>
  );
}
