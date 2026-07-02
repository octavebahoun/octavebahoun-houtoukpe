import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Send, Github, Linkedin, Mail, MapPin, Phone, CheckCircle2, AlertCircle } from "lucide-react";

const SOCIALS = [
  { label: "GitHub",   href: "https://github.com/octavebahoun",                                icon: <Github size={18} /> },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/octave-bahoun-b9114b337/",           icon: <Linkedin size={18} /> },
  { label: "Email",    href: "mailto:octavebahoun@gmail.com",                                  icon: <Mail size={18} /> },
];

const INFO = [
  { icon: <MapPin size={20} />,  label: "Location", value: "Lokossa, Mono, Bénin" },
  { icon: <Mail size={20} />,    label: "Email",    value: "octavebahoun@gmail.com" },
  { icon: <Phone size={20} />,   label: "Phone",    value: "+229 0151125217" },
];

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.target);
    formData.append("access_key", "7216020c-c646-4dd7-b39a-2bd059d2be01");
    try {
      const res  = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) { setStatus("success"); e.target.reset(); setTimeout(() => setStatus("idle"), 5000); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <>
      <Helmet>
        <title>Contact — O&lt;ktav&gt; | Let's work together</title>
        <meta name="description" content="Contact Octave Bahoun for freelance projects, collaborations, or just a friendly chat." />
      </Helmet>

      <section className="section">
        <div className="container">
          <p className="section-label">Get in touch</p>
          <h1 className="h1" style={{ marginBottom: "16px" }}>
            Let's <span style={{ color: "var(--accent)" }}>Connect</span>
          </h1>
          <p style={{ color: "var(--muted)", maxWidth: "480px", marginBottom: "60px" }}>
            I'm currently available for freelance work and new opportunities. Reach out for a project or just a chat.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "48px" }}>
            {/* INFO COLUMN */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {INFO.map(inf => (
                <div key={inf.label} style={{
                  display: "flex", gap: "16px", alignItems: "center",
                  padding: "16px", borderRadius: "10px",
                  border: "1px solid var(--border)", background: "var(--surface)",
                }}>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "10px",
                    background: "rgba(255,69,0,0.12)", display: "flex",
                    alignItems: "center", justifyContent: "center", color: "var(--accent)", flexShrink: 0,
                  }}>
                    {inf.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: "4px" }}>
                      {inf.label}
                    </p>
                    <p style={{ fontSize: "14px" }}>{inf.value}</p>
                  </div>
                </div>
              ))}

              {/* Social buttons */}
              <div style={{
                marginTop: "8px", padding: "24px", borderRadius: "12px",
                background: "linear-gradient(135deg, rgba(255,69,0,0.15), rgba(255,69,0,0.05))",
                border: "1px solid rgba(255,69,0,0.2)",
              }}>
                <p style={{ fontWeight: 700, marginBottom: "8px" }}>Let's talk!</p>
                <p style={{ color: "var(--muted)", fontSize: "13px", marginBottom: "20px" }}>
                  I usually respond within 24 hours.
                </p>
                <div style={{ display: "flex", gap: "10px" }}>
                  {SOCIALS.map(s => (
                    <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer"
                      className="btn btn-ghost" style={{ padding: "8px 12px" }}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* FORM COLUMN */}
            <div className="card" style={{ padding: "40px" }}>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <input type="checkbox" name="botcheck" style={{ display: "none" }} />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">Full Name</label>
                    <input id="contact-name" name="name" required type="text"
                      placeholder="Octave Bahoun" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">Email Address</label>
                    <input id="contact-email" name="email" required type="email"
                      placeholder="octave@example.com" className="form-input" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-subject">Subject</label>
                  <input id="contact-subject" name="subject" type="text"
                    placeholder="Freelance project, collaboration..." className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" name="message" required rows={5}
                    placeholder="Tell me about your project..." className="form-textarea" />
                </div>

                <button type="submit" disabled={status === "loading"}
                  className="btn btn-primary"
                  style={{ justifyContent: "center", padding: "14px", fontSize: "13px", opacity: status === "loading" ? 0.7 : 1 }}
                  id="contact-submit"
                >
                  {status === "loading" ? "Sending…" : <><Send size={16} /> Send Message</>}
                </button>

                {status === "success" && (
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", padding: "14px 16px", borderRadius: "8px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", color: "#4ade80" }}>
                    <CheckCircle2 size={18} /> Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                {status === "error" && (
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", padding: "14px 16px", borderRadius: "8px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}>
                    <AlertCircle size={18} /> Something went wrong. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
