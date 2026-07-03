import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Lock, Mail, Loader2, AlertCircle, Shield } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  if (!supabase) {
    return (
      <section className="section" style={{ minHeight: "80vh", display: "grid", placeItems: "center" }}>
        <div className="card login-card" style={{ textAlign: "center" }}>
          <AlertCircle size={32} style={{ color: "var(--accent)", marginBottom: "16px" }} />
          <h2 className="h3" style={{ marginBottom: "12px" }}>Supabase not configured</h2>
          <p style={{ color: "var(--muted)", fontSize: "13px" }}>
            Set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> in your <code>.env</code> file to enable the admin panel.
          </p>
        </div>
      </section>
    );
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" style={{ minHeight: "80vh", display: "grid", placeItems: "center" }}>
      <Helmet>
        <title>Admin Login — O&lt;ktav&gt;</title>
      </Helmet>

      <div className="card login-card">
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            width: "56px", height: "56px", borderRadius: "14px",
            background: "rgba(var(--accent-rgb),0.12)", display: "inline-flex",
            alignItems: "center", justifyContent: "center",
            marginBottom: "16px", color: "var(--accent)",
          }}>
            <Shield size={28} />
          </div>
          <h1 className="h2" style={{ marginBottom: "8px" }}>Access Control</h1>
          <p style={{ color: "var(--muted)", fontSize: "13px" }}>
            Secure administration gateway
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">
              <Mail size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "6px" }} />
              Administrator Email
            </label>
            <input
              id="login-email"
              type="email"
              required
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-password">
              <Lock size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "6px" }} />
              Master Key
            </label>
            <input
              id="login-password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>

          {error && (
            <div style={{
              display: "flex", gap: "10px", alignItems: "center",
              padding: "12px 16px", borderRadius: "8px",
              background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
              color: "#f87171", fontSize: "13px",
            }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <button type="submit" disabled={loading}
            className="btn btn-primary"
            style={{ justifyContent: "center", padding: "14px", width: "100%", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? (
              <><Loader2 size={18} className="admin-spin" /> Authenticating...</>
            ) : (
              <><Lock size={16} /> Authenticate System</>
            )}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "24px", color: "var(--muted)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em" }}>
          Authorized personnel only
        </p>
      </div>
    </section>
  );
}
