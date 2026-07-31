import { useEffect, useRef, useState, type FormEvent } from "react";
import { Bot, Send, User } from "lucide-react";
import {
  JARVIS_FALLBACK,
  JARVIS_GREETING,
  JARVIS_KB,
  JARVIS_SUGGESTIONS,
} from "../data/portfolioData";

type Line = { from: "ai" | "me"; text: string };

/* Normalisation : minuscules, sans accents, ponctuation aplatie —
   « Explique-moi To_fitune ? » et « to fitune » doivent matcher pareil. */
function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_ ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function answer(question: string): string {
  const q = normalize(question);
  if (!q) return JARVIS_FALLBACK;

  let best = { score: 0, text: JARVIS_FALLBACK };

  for (const entry of JARVIS_KB) {
    let score = 0;
    for (const key of entry.keys) {
      const k = normalize(key);
      if (!k) continue;
      if (q.includes(k)) score += k.length; // les clés longues pèsent plus
    }
    if (score > best.score) best = { score, text: entry.text };
  }

  return best.text;
}

export default function JarvisChatBot() {
  const [lines, setLines] = useState<Line[]>([
    { from: "ai", text: JARVIS_GREETING },
  ]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const log = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" });
  }, [lines, thinking]);

  useEffect(
    () => () => {
      timers.current.forEach(window.clearTimeout);
    },
    [],
  );

  const ask = (question: string) => {
    const q = question.trim();
    if (!q || thinking) return;

    setLines((l) => [...l, { from: "me", text: q }]);
    setDraft("");
    setThinking(true);

    /* Latence de réflexion : dérivée de la question plutôt que tirée au sort,
       pour rester déterministe d'un rendu à l'autre. */
    const delay = 460 + (q.length % 9) * 55;

    const t = window.setTimeout(() => {
      setLines((l) => [...l, { from: "ai", text: answer(q) }]);
      setThinking(false);
    }, delay);
    timers.current.push(t);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    ask(draft);
  };

  return (
    <div className="frame terminal chat">
      <div className="terminal__scan" />

      <div className="chat__head">
        <Bot size={18} color="var(--clay-bright)" strokeWidth={1.4} />
        <div>
          <div
            className="mono"
            style={{ color: "var(--clay-bright)", letterSpacing: "0.18em" }}
          >
            JARVIS
          </div>
          <div
            className="mono"
            style={{ fontSize: "0.6rem", color: "var(--on-dark-dim)" }}
          >
            indexé sur le profil complet d'Octave
          </div>
        </div>
        <span
          style={{
            marginLeft: "auto",
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: thinking ? "var(--belge-bright)" : "var(--clay-bright)",
          }}
        />
      </div>

      <div className="chat__log" ref={log}>
        {lines.map((l, i) => (
          <div
            key={i}
            className={`bubble bubble--${l.from}`}
            style={{ fontFamily: "var(--f-ui)" }}
          >
            <span
              className="mono"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                fontSize: "0.56rem",
                letterSpacing: "0.2em",
                color:
                  l.from === "ai" ? "var(--clay-bright)" : "var(--belge-bright)",
                marginBottom: "0.35rem",
              }}
            >
              {l.from === "ai" ? <Bot size={11} /> : <User size={11} />}
              {l.from === "ai" ? "JARVIS" : "VOUS"}
            </span>
            {l.text}
          </div>
        ))}

        {thinking && (
          <div className="bubble bubble--ai">
            <span className="dots">
              <span />
              <span />
              <span />
            </span>
          </div>
        )}
      </div>

      <div className="chat__foot">
        <div className="suggest">
          {JARVIS_SUGGESTIONS.map((s) => (
            <button key={s} onClick={() => ask(s)} disabled={thinking}>
              {s}
            </button>
          ))}
        </div>

        <form className="chat__form" onSubmit={submit}>
          <input
            className="field"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Pose ta question à Jarvis…"
            aria-label="Question à Jarvis"
            style={{ fontFamily: "var(--f-mono)", fontSize: "0.82rem" }}
          />
          <button
            className="btn btn--clay"
            type="submit"
            disabled={thinking || !draft.trim()}
            aria-label="Envoyer"
            style={{ padding: "0 1.1rem" }}
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}
