# Portfolio — Octave BAHOUN-HOUTOUKPE

Direction artistique **« Éditorial — Bleu belge »** : beaucoup de papier, une
seule encre en voix principale (le bleu belge), une touche de sable / terre
cuite en second. Jamais deux accents en même temps.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc + vite build → dist/
npm run preview
```

## Palette

| Rôle | Token | Valeur |
| :--- | :--- | :--- |
| Papier (fond) | `--paper` / `--paper-2` / `--paper-3` | `#FBF9F4` / `#F3EFE6` / `#EAE3D3` |
| Encre (texte) | `--ink` / `--ink-dim` / `--ink-faint` | `#1E2024` / `#52555E` / `#6B6F7A` |
| Bleu belge | `--belge` / `--belge-deep` / `--belge-ink` | `#5B7FAE` / `#2E4A73` / `#1F3555` |
| Sable / terre cuite | `--clay` / `--clay-deep` | `#B5764A` / `#7C4F2C` |
| Alerte (formulaire) | `--alert` | `#A6382B` |

Typographies : **Playfair Display** (titres), **Outfit** (interface et corps),
**JetBrains Mono** (code, cartouches, terminal).

Deux encarts font volontairement exception au papier clair : le terminal
(`TerminalCLI`) et le chat Jarvis (`JarvisChatBot`) restent sombres, comme un
timbre encré posé sur la page — de quoi isoler ces deux pièces interactives
du reste, sans casser le principe d'ensemble.

## Architecture

```
src/
  data/portfolioData.ts     source unique : identité, parcours, projets,
                             compétences, base de connaissance Jarvis
  components/
    Reveal.tsx               révélations ScrollTrigger, jauges, compteurs
    Navbar / Footer          gabarit
    ArtisticProjectCard      carte projet de la galerie
    JarvisChatBot            assistant local, scoring par mots-clés
    TerminalCLI              simulateur `octave --info | --skills | --projects…`
    SocialIcons              logos GitHub / LinkedIn / NPM
    Magnetic                 micro-interaction magnétique sur les CTA
  pages/                     Home, About, Projects, JarvisLab, Contact
  index.css                  design system (tokens, cadres, boutons)
  App.css                    compositions de page + responsive
```

## Accessibilité & confort

- **Contraste** — tous les tokens de texte passent AA (≥ 4,5:1) sur
  `--paper`, calculés et vérifiés par script (ratios WCAG dans les
  commentaires d'`index.css`).
- **Focus clavier** — anneau `:focus-visible` toujours visible, plus un lien
  « Aller au contenu » en premier arrêt de tabulation.
- **Cibles tactiles** — 44px de hauteur minimum sur les boutons.
- **Mouvement** — les révélations GSAP respectent `prefers-reduced-motion`
  (contenu visible sans délai si l'utilisateur en a fait la demande).

## Notes techniques

- **Jarvis** — assistant 100 % local, indexé sur `portfolioData.ts`. Pour le
  brancher sur un vrai LLM, remplacer `answer()` dans `JarvisChatBot.tsx` par
  un appel à Groq ou OpenRouter.
- **Formulaire de contact** — sans backend : il compose un `mailto:` pré-rempli.
- **Déploiement** — `vercel.json` et `public/_redirects` réécrivent toutes les
  routes vers `index.html` (indispensable pour React Router).

## Stack

React 19 · React Router 7 · Vite 8 · TypeScript · GSAP (ScrollTrigger, Flip) ·
Tailwind v4 · Lucide
