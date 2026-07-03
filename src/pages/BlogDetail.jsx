import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
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

      <section className="section">
        <div className="container" style={{ maxWidth: "760px" }}>
          <Link to="/blog" className="btn btn-ghost" style={{ marginBottom: "28px", display: "inline-flex" }}>
            <ArrowLeft size={14} /> Back to blog
          </Link>

          <article>
            <div className="blog-detail__cover">
              <img src={post.cover} alt={post.title} />
              <div className="blog-detail__cover-overlay" />
            </div>

            <div className="blog-detail__meta">
              <span><Calendar size={14} /> {post.date}</span>
              <span><Clock size={14} /> {post.readTime}</span>
            </div>

            <h1 className="h1 blog-detail__title">{post.title}</h1>

            <div className="blog-detail__tags">
              {post.tags.map((tag) => (
                <span key={tag} className="badge">{tag}</span>
              ))}
            </div>

            <div className="blog-detail__body">
              {post.body?.map((block, i) => {
                if (block.type === "h3") {
                  return <h3 key={i} className="h3 blog-detail__h3">{block.text}</h3>;
                }
                return <p key={i} className="blog-detail__p">{block.text}</p>;
              })}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
