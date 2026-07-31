# Portfolio immersif 3D & IA — Octave BAHOUN-HOUTOUKPE

Direction artistique **« Nuit électrique »** : une scène de nuit sous éclairage
artificiel. Bleu électrique en voix principale, violet en second, la chaleur
orange des lampadaires qui perce çà et là. Aucun or.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc + vite build → dist/
npm run preview
```

## Le principe : un seul monde

Contrairement à un portfolio classique où chaque section contient sa petite
vignette 3D, **il n'y a ici qu'une seule scène WebGL**, fixée derrière tout le
site (`src/components/World.tsx`). Elle est montée une fois, survit aux
changements de route, et le contenu HTML flotte par-dessus.

Conséquences :

- **Un seul contexte WebGL** au lieu de huit — la page reste fluide.
- La caméra fait un travelling au défilement et suit le curseur en parallaxe.
- Chaque route a sa position de caméra et son sujet au centre.
- Sur `/projects`, **survoler une carte change le sujet du monde** : le modèle
  du projet vient prendre la place au centre, derrière la carte.

| Route | Sujet dans le monde |
| :--- | :--- |
| `/` | `profil.glb` |
| `/about` | `geometric-trophy-emblem.glb` |
| `/projects` | `quantum-ai-processor-chip.glb` (+ survol des cartes) |
| `/jarvis-lab` | `vanguard-01.glb` |
| `/contact` | `footer-avatar.glb` |

## Palette

| Rôle | Token | Valeur |
| :--- | :--- | :--- |
| Nuit (fond) | `--night` | `#150E2E` |
| Bleu électrique | `--volt` / `--volt-lit` | `#3B4FE0` / `#7C8CFF` |
| Violet lumineux | `--flux` / `--flux-lit` | `#B44BE8` / `#E58BFF` |
| Lampadaire | `--ember` / `--ember-lit` | `#FF7A18` / `#FFC24D` |
| Rose fusée | `--rose` | `#FF4D9D` |
| Brume lavande (texte) | `--mist` | `#EAE6FA` |

Typographies : **Playfair Display** (titres), **Outfit** (interface et corps),
**JetBrains Mono** (code, cartouches, terminal).

Les matériaux des modèles `.glb` ne sont **pas** repeints : c'est l'éclairage de
la scène qui donne l'ambiance.

## Atmosphère

Tout est obtenu sans dépendance de post-traitement :

- **Brouillard** `THREE.Fog` — les objets lointains se dissolvent dans la nuit.
- **Sol infini** `Grid` de drei, qui fuit vers l'horizon et suit la caméra.
- **Profondeur** `Stars` (fond lointain) + `Sparkles` (poussière proche).
- **Halos** — des plans en `AdditiveBlending` avec un dégradé radial peint dans
  un `<canvas>`, qui dérivent lentement : l'effet du bloom, sans le coût d'une
  passe de rendu.

## Fichiers non utilisés

Ces fichiers ne sont importés nulle part. Ils compilent et sont retirés du
bundle par le tree-shaking, mais peuvent être supprimés sans risque :

- `src/components/ModelViewer.tsx` — visionneuse 3D isolée
- `src/components/Parallax.tsx` — couches en parallaxe (réutilisable)
- `src/components/worldEffects.tsx` — vidé, vestige d'une piste abandonnée
- `src/components/ProjectList.tsx` — vidé, vestige d'une piste abandonnée

## Architecture

```
src/
  data/portfolioData.ts     source unique : identité, parcours, projets,
                            compétences, chemins des modèles, base Jarvis
  components/
    World.tsx               LA scène 3D : brouillard, sol, particules, halos,
                            sujet central, caméra scroll + curseur
    worldContext.ts         le canal par lequel le HTML change le sujet
    Reveal.tsx              révélations ScrollTrigger, jauges, compteurs
    Navbar / Footer         gabarit
    ArtisticProjectCard     carte projet ; le survol pilote le monde
    JarvisChatBot           assistant local, scoring par mots-clés
    TerminalCLI             simulateur `octave --info | --skills | --projects…`
    SocialIcons             logos GitHub / LinkedIn / NPM
    ModelViewer.tsx         visionneuse 3D isolée — plus utilisée depuis le
                            passage au monde unique, conservée au cas où
  pages/                    Home, About, Projects, JarvisLab, Contact
  index.css                 design system (tokens, monde, cadres, boutons)
  App.css                   compositions de page + responsive
```

## Accessibilité & confort

Passe faite avec le skill `ui-ux-pro-max`, qui trie les règles par priorité —
contraste et interaction d'abord, décoration ensuite.

- **Contraste** — `--volt` (#3B4FE0) ne fait que 2,5:1 sur la nuit : il est
  désormais réservé aux traits, fonds et bordures. Tout texte passe par
  `--volt-ink` (5,9:1) ou `--volt-lit` (5,3:1). `--mist-faint` a été éclairci
  de #6E6698 à #9089BD pour atteindre 4,9:1. Tous les tokens de texte
  passent AA sur le fond le plus clair.
- **Focus clavier** — anneau `:focus-visible` sur fond sombre, jamais
  supprimé, plus un lien « Aller au contenu » en premier arrêt de tabulation.
- **Cibles tactiles** — 44px de hauteur minimum sur les boutons.
- **Échappatoire** — un sélecteur en pied de page bascule entre scène
  complète, allégée et aucune 3D. Le niveau initial est déduit de la largeur
  d'écran, du nombre de cœurs CPU et de `prefers-reduced-motion`.
- **Mouvement** — l'épinglage, la parallaxe et le magnétisme se désactivent
  tous seuls sous `prefers-reduced-motion` et sur écran étroit.

## Notes techniques

- **Normalisation 3D** — chaque `.glb` est recentré et ramené à une taille
  commune au chargement : les huit modèles ont la même stature à l'écran quelle
  que soit leur échelle d'origine.
- **Lisibilité** — les cadres sont translucides avec `backdrop-filter`, et la
  classe `.veil` pose un halo sombre derrière les zones de texte dense.
- **Le canvas ne capte aucun clic** (`pointer-events: none`) : le contenu reste
  toujours maître de l'interaction.
- **Jarvis** — assistant 100 % local, indexé sur `portfolioData.ts`. Pour le
  brancher sur un vrai LLM, remplacer `answer()` dans `JarvisChatBot.tsx` par un
  appel à Groq ou OpenRouter.
- **Formulaire de contact** — sans backend : il compose un `mailto:` pré-rempli.
- **Déploiement** — `vercel.json` et `public/_redirects` réécrivent toutes les
  routes vers `index.html` (indispensable pour React Router).

### Poids des modèles

`profil.glb` pèse 14 Mo (6,2 Mo de textures JPEG + ~7,8 Mo de géométrie) et
c'est le sujet de la page d'accueil, donc il est chargé en premier. Deux leviers
si le premier affichage doit être plus rapide : ré-encoder les trois textures
en WebP à résolution moitié, et passer la géométrie en Draco ou meshopt via
`gltf-transform`.

## Stack

React 19 · React Router 7 · Vite 8 · TypeScript · Three.js · @react-three/fiber ·
@react-three/drei · GSAP (ScrollTrigger, Flip) · Tailwind v4 · Lucide
