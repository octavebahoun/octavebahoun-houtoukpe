import { Gauge, Sparkles, SquareDashed } from "lucide-react";
import { useWorld } from "./worldContext";
import type { Quality } from "./worldContext";

/* Toute expérience immersive doit offrir une sortie. Trois niveaux :
   la scène complète, une version allégée, et rien du tout. Le choix est
   pré-réglé selon la machine et `prefers-reduced-motion`, mais reste
   toujours repris en main d'un clic. */

const LEVELS: { id: Quality; label: string; icon: typeof Gauge; hint: string }[] =
  [
    { id: "full", label: "Complet", icon: Sparkles, hint: "Scène 3D complète" },
    { id: "sober", label: "Sobre", icon: Gauge, hint: "Effets allégés" },
    { id: "off", label: "Aucun", icon: SquareDashed, hint: "Sans 3D" },
  ];

export default function WorldToggle() {
  const { quality, setQuality } = useWorld();

  return (
    <div
      className="worldswitch"
      role="group"
      aria-label="Niveau de rendu de la scène 3D"
    >
      {LEVELS.map(({ id, label, icon: Icon, hint }) => (
        <button
          key={id}
          type="button"
          className={`worldswitch__b${quality === id ? " is-on" : ""}`}
          onClick={() => setQuality(id)}
          aria-pressed={quality === id}
          title={hint}
        >
          <Icon size={13} aria-hidden="true" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
