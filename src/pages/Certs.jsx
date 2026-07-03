import { useEffect, useState } from "react";
import { getCerts } from "../api/mock";
import { Helmet } from "react-helmet-async";
import { ExternalLink } from "lucide-react";
import { useLang } from "../lib/i18n";

export default function Certs() {
  const { t } = useLang();
  const [certs, setCerts] = useState([]);
  useEffect(() => { getCerts().then(setCerts); }, []);

  return (
    <>
      <Helmet>
        <title>Certifications — O&lt;ktav&gt;</title>
        <meta name="description" content="Certifications and credentials earned by Octave Bahoun in web development, AI, and cybersecurity." />
      </Helmet>

      <section className="section">
        <div className="container">
          <p className="section-label">{t("certs.title")}</p>
          <h1 className="h1" style={{ marginBottom: "16px" }}>
            {t("certs.title")}<span style={{ color: "var(--accent)" }}>{t("certs.title_highlight")}</span>
          </h1>
          <p style={{ color: "var(--muted)", maxWidth: "500px", marginBottom: "60px" }}>
            {t("certs.desc")}
          </p>

          <div className="grid-2">
            {certs.map(c => (
              <div key={c.id} className="cert-card">
                <div className="cert-icon">
                  <span style={{ fontSize: "24px" }}>{c.icon}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
                    <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>
                      {c.title}
                    </h3>
                    {c.url && c.url !== "#" && (
                      <a href={c.url} target="_blank" rel="noopener noreferrer"
                        style={{ color: "var(--accent)", flexShrink: 0 }}>
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                  <p style={{ color: "var(--muted)", fontSize: "13px", marginBottom: "12px" }}>
                    {c.issuer} · {c.date}
                  </p>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {c.tags.map(t => <span key={t} className="badge">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
