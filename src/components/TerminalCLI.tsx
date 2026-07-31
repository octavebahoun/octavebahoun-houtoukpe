import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  IDENTITY,
  PROJECTS,
  SKILLS,
  TIMELINE,
} from "../data/portfolioData";

type Row = { kind: "cmd" | "out" | "err"; text: string };

const BANNER = [
  "octave-cli v2.0.0 — nuit électrique",
  "Tape `help` pour la liste des commandes.",
];

function run(raw: string): Row[] {
  const cmd = raw.trim().replace(/^octave\s+/i, "").replace(/^--/, "");
  const out = (text: string): Row => ({ kind: "out", text });

  switch (cmd.toLowerCase()) {
    case "":
      return [];

    case "help":
    case "-h":
      return [
        out("Commandes disponibles :"),
        out("  octave --info       identité, titre, localisation"),
        out("  octave --skills     matrice de compétences"),
        out("  octave --projects   pièces de la galerie"),
        out("  octave --career     parcours chronologique"),
        out("  octave --contact    coordonnées"),
        out("  octave --cv         télécharger le CV PDF"),
        out("  clear               effacer l'écran"),
      ];

    case "info":
      return [
        out(IDENTITY.fullName),
        out(IDENTITY.longTitle),
        out(`Spécialisation : ${IDENTITY.specialty}`),
        out(`Localisation   : ${IDENTITY.location}`),
        out(`Devise         : « ${IDENTITY.tagline} »`),
      ];

    case "skills":
      return SKILLS.flatMap((g) => [
        out(`[${g.title}]`),
        ...g.items.map((s) => out(`  ${s.n.padEnd(46, ".")} ${s.v}`)),
      ]);

    case "projects":
      return PROJECTS.map((p) =>
        out(
          `${p.isPublic ? "[public] " : "[privé]  "}${p.title.padEnd(20)} ${p.kind}`,
        ),
      );

    case "career":
      return TIMELINE.map((m) => out(`${m.when.padEnd(26)} ${m.what} — ${m.where}`));

    case "contact":
      return [
        out(`email    ${IDENTITY.email}`),
        out(`tél      ${IDENTITY.phones.join("  |  ")}`),
        out(`github   ${IDENTITY.links.github}`),
        out(`npm      ${IDENTITY.links.npm}`),
        out(`web      ${IDENTITY.links.nowstudy}`),
      ];

    case "cv":
      window.open(IDENTITY.links.cv, "_blank");
      return [out("Ouverture du CV PDF…")];

    case "whoami":
      return [out("visiteur@monde — bienvenue.")];

    default:
      return [
        {
          kind: "err",
          text: `commande inconnue : ${cmd} — tape \`help\``,
        },
      ];
  }
}

export default function TerminalCLI() {
  const [rows, setRows] = useState<Row[]>(
    BANNER.map((text) => ({ kind: "out", text })),
  );
  const [draft, setDraft] = useState("");
  const body = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight });
  }, [rows]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const raw = draft;
    setDraft("");

    if (raw.trim().toLowerCase() === "clear") {
      setRows([]);
      return;
    }

    setRows((r) => [...r, { kind: "cmd", text: raw }, ...run(raw)]);
  };

  const color = (k: Row["kind"]) =>
    k === "cmd"
      ? "var(--volt-lit)"
      : k === "err"
        ? "var(--ember-lit)"
        : "var(--mist-dim)";

  return (
    <div
      className="frame terminal"
      onClick={() => input.current?.focus()}
      style={{ display: "flex", flexDirection: "column", minHeight: 380 }}
    >
      <div className="terminal__scan" />

      <div
        className="chat__head"
        style={{ borderBottomColor: "var(--flux-hair)" }}
      >
        <span style={{ display: "flex", gap: "0.35rem" }}>
          {["#ff4d9d", "#3b4fe0", "#b44be8"].map((c) => (
            <span
              key={c}
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: c,
                display: "inline-block",
              }}
            />
          ))}
        </span>
        <span
          className="mono"
          style={{ color: "var(--mist-faint)", fontSize: "0.62rem" }}
        >
          octave@monde : ~
        </span>
      </div>

      <div
        ref={body}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1.1rem 1.2rem",
          maxHeight: 300,
        }}
      >
        {rows.map((r, i) => (
          <div
            key={i}
            style={{ color: color(r.kind), whiteSpace: "pre-wrap" }}
          >
            {r.kind === "cmd" && (
              <span style={{ color: "var(--flux-lit)" }}>$ </span>
            )}
            {r.text}
          </div>
        ))}
      </div>

      <form
        onSubmit={submit}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          borderTop: "1px solid rgba(234, 230, 250,0.08)",
          padding: "0.75rem 1.2rem",
        }}
      >
        <span style={{ color: "var(--flux-lit)" }}>$</span>
        <input
          ref={input}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="octave --info"
          aria-label="Commande du terminal"
          spellCheck={false}
          style={{
            flex: 1,
            background: "transparent",
            border: 0,
            outline: "none",
            color: "var(--mist)",
            fontFamily: "var(--f-mono)",
            fontSize: "0.8rem",
          }}
        />
        <span className="caret" />
      </form>
    </div>
  );
}
