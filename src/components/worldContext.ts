import { createContext, use } from "react";

/** Niveau de rendu du monde 3D. */
export type Quality = "full" | "sober" | "off";

/* Le canal par lequel le contenu HTML parle au monde 3D : changer de sujet
   au survol d'une carte, ou baisser le niveau de rendu. */
export type WorldApi = {
  /** Passe le monde sur ce modèle, ou `null` pour revenir au sujet de la route. */
  focus: (url: string | null) => void;
  quality: Quality;
  setQuality: (q: Quality) => void;
};

export const WorldCtx = createContext<WorldApi>({
  focus: () => {},
  quality: "full",
  setQuality: () => {},
});

export function useWorld() {
  return use(WorldCtx);
}
