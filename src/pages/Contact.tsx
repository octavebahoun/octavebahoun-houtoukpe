import { useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Check,
  Download,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

import TerminalCLI from "../components/TerminalCLI";
import Reveal, { SectionHead } from "../components/Reveal";
import { GithubIcon, LinkedinIcon, NpmIcon } from "../components/SocialIcons";
import { IDENTITY } from "../data/portfolioData";

type Errors = { name?: string; email?: string; message?: string };

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Deux caractères minimum.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
      next.email = "Adresse e-mail invalide.";
    if (form.message.trim().length < 12)
      next.message = "Douze caractères minimum, pour dire quelque chose.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    /* Pas de backend : on prépare le courriel dans le client de l'utilisateur. */
    const subject = encodeURIComponent(`Portfolio — message de ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n—\n${form.name}\n${form.email}`,
    );
    window.location.href = `mailto:${IDENTITY.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section className="section section--first">
      <div className="wrap">
        <SectionHead num="VIII" title="Prendre contact" />

        <div className="contact__grid">
          {/* --------- Colonne gauche : actions & coordonnées --------- */}
          <div style={{ display: "grid", gap: "1.5rem" }}>
            <Reveal className="frame">
              <div style={{ padding: "1.8rem 1.6rem" }}>
                <span className="cartouche">
                  Recruteurs & organisateurs de hackathons
                </span>

                <p
                  style={{
                    color: "var(--mist-dim)",
                    fontSize: "0.9rem",
                    margin: "1.1rem 0 1.5rem",
                    lineHeight: 1.75,
                  }}
                >
                  Tout ce qu'il faut pour décider, en quatre clics.
                </p>

                <div className="acts">
                  <a
                    className="btn btn--solid"
                    href={IDENTITY.links.cv}
                    download
                  >
                    <Download size={14} /> CV PDF
                  </a>
                  <a
                    className="btn"
                    href={IDENTITY.links.github}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <GithubIcon size={14} /> GitHub
                  </a>
                  <a
                    className="btn"
                    href={IDENTITY.links.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <LinkedinIcon size={14} /> LinkedIn
                  </a>
                  <a
                    className="btn btn--flux"
                    href={`mailto:${IDENTITY.email}`}
                  >
                    <Mail size={14} /> Écrire
                  </a>
                </div>

                <hr className="filet" style={{ margin: "1.8rem 0 1rem" }} />

                <a className="coord" href={`mailto:${IDENTITY.email}`}>
                  <Mail size={16} className="coord__i" />
                  <span>
                    <span className="coord__l">Courriel</span>
                    <br />
                    <span className="coord__v">{IDENTITY.email}</span>
                  </span>
                </a>

                {IDENTITY.phones.map((p) => (
                  <a
                    key={p}
                    className="coord"
                    href={`tel:${p.replace(/\s/g, "")}`}
                  >
                    <Phone size={16} className="coord__i" />
                    <span>
                      <span className="coord__l">Téléphone</span>
                      <br />
                      <span className="coord__v">{p}</span>
                    </span>
                  </a>
                ))}

                <div className="coord">
                  <MapPin size={16} className="coord__i" />
                  <span>
                    <span className="coord__l">Base</span>
                    <br />
                    <span className="coord__v">{IDENTITY.location}</span>
                  </span>
                </div>

                <a
                  className="coord"
                  href={IDENTITY.links.npm}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <NpmIcon size={16} className="coord__i" />
                  <span>
                    <span className="coord__l">Open source</span>
                    <br />
                    <span className="coord__v">
                      npmjs.com/package/codetovecto
                    </span>
                  </span>
                </a>

                <a
                  className="coord"
                  href={IDENTITY.links.nowstudy}
                  target="_blank"
                  rel="noreferrer noopener"
                  style={{ borderBottom: 0 }}
                >
                  <ArrowUpRight size={16} className="coord__i" />
                  <span>
                    <span className="coord__l">Application en ligne</span>
                    <br />
                    <span className="coord__v">nowstudy.vercel.app</span>
                  </span>
                </a>
              </div>
            </Reveal>

          </div>

          {/* --------- Colonne droite : terminal + formulaire --------- */}
          <div style={{ display: "grid", gap: "1.5rem" }}>
            <Reveal>
              <TerminalCLI />
            </Reveal>

            <Reveal className="frame">
              <form onSubmit={submit} style={{ padding: "1.8rem 1.6rem" }}>
                <span className="cartouche cartouche--flux">
                  Message direct
                </span>

                <div style={{ display: "grid", gap: "0.9rem", marginTop: "1.4rem" }}>
                  <div>
                    <input
                      className={`field${errors.name ? " field--err" : ""}`}
                      placeholder="Votre nom"
                      value={form.name}
                      onChange={(e) => set("name")(e.target.value)}
                      aria-label="Votre nom"
                    />
                    {errors.name && (
                      <div
                        className="mono"
                        style={{
                          color: "var(--ember-lit)",
                          fontSize: "0.62rem",
                          marginTop: "0.35rem",
                        }}
                      >
                        {errors.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <input
                      className={`field${errors.email ? " field--err" : ""}`}
                      placeholder="Votre e-mail"
                      value={form.email}
                      onChange={(e) => set("email")(e.target.value)}
                      aria-label="Votre e-mail"
                    />
                    {errors.email && (
                      <div
                        className="mono"
                        style={{
                          color: "var(--ember-lit)",
                          fontSize: "0.62rem",
                          marginTop: "0.35rem",
                        }}
                      >
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <textarea
                      className={`field${errors.message ? " field--err" : ""}`}
                      placeholder="Votre message — mission, hackathon, collaboration…"
                      rows={5}
                      value={form.message}
                      onChange={(e) => set("message")(e.target.value)}
                      aria-label="Votre message"
                      style={{ resize: "vertical", fontFamily: "var(--f-ui)" }}
                    />
                    {errors.message && (
                      <div
                        className="mono"
                        style={{
                          color: "var(--ember-lit)",
                          fontSize: "0.62rem",
                          marginTop: "0.35rem",
                        }}
                      >
                        {errors.message}
                      </div>
                    )}
                  </div>

                  <button
                    className={`btn ${sent ? "btn--flux" : "btn--solid"}`}
                    type="submit"
                    style={{ justifyContent: "center" }}
                  >
                    {sent ? (
                      <>
                        <Check size={15} /> Courriel préparé
                      </>
                    ) : (
                      <>
                        <Send size={15} /> Envoyer le message
                      </>
                    )}
                  </button>

                  <p
                    className="mono"
                    style={{
                      color: "var(--mist-faint)",
                      fontSize: "0.6rem",
                      lineHeight: 1.7,
                    }}
                  >
                    Le formulaire ouvre votre client de messagerie avec le
                    message pré-rempli — aucune donnée n'est stockée.
                  </p>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
