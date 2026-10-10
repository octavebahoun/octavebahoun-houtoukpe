# Portfolio — Oktav Bahoun

Portfolio d'Octave Précieux Bahoun-Houtoukpe (« Oktav »), ingénieur IA & builder open source.
Étudiant ingénieur à CY Tech, co-fondateur et directeur technique d'Excellence Team.

## Stack

- **React 19** + **Vite 8** — pages chargées à la demande, sections de l'accueil montées à l'approche du scroll
- **Tailwind CSS v4** — design tokens clair/sombre dans `src/index.css`
- **Motion** (animations) + **Lenis** (défilement fluide, désactivé si « réduire les animations »)
- Polices auto-hébergées : Plus Jakarta Sans, Instrument Serif, JetBrains Mono
- Contenu branché sur l'API headless (back office `/admin`) + données GitHub en direct

## Ce qu'il y a dedans

- Hero animé (nom en révélation lettre par lettre, portrait en parallaxe, terminal qui tape les vrais chiffres GitHub)
- Thème clair/sombre avec révélation circulaire (View Transitions API)
- Palette de commandes `Ctrl/⌘ + K` (pages, projets, articles, actions)
- Études de cas par projet, dont un schéma interactif du pipeline multi-agent de Video Remix Studio
- Section open source : heatmap des contributions, langages, activité récente (API GitHub en direct)
- Accessibilité : navigation clavier, lien d'évitement, `prefers-reduced-motion` respecté partout

## Où modifier le contenu

| Contenu | Fichier |
| --- | --- |
| Identité, contact, réseaux | `src/data/profile.js`, `src/lib/socials.js` |
| Projets (visuels, chiffres, catégories) | `src/data/projects.js` |
| Parcours | `src/data/timeline.js` |
| Stack, FAQ, tarifs | `src/data/stack.js`, `src/data/faq.js`, `src/data/pricing.js` |
| Articles de secours | `src/lib/fallbackPosts.js` |

Les textes saisis dans le back office (`/admin`) priment sur ceux du catalogue local ;
le catalogue apporte les visuels harmonisés, les chiffres clés et les catégories.

## Scripts

```bash
pnpm install
pnpm dev                 # développement
pnpm build && pnpm preview   # build de production, servi avec les en-têtes de sécurité de vercel.json

GITHUB_TOKEN=$(gh auth token) node scripts/github-snapshot.mjs   # rafraîchit src/data/github.json
node scripts/sitemap.mjs                                         # régénère public/sitemap.xml
python3 scripts/og-images.py                                     # régénère les images de partage (public/og/)
```

### Aperçus de partage (LinkedIn, WhatsApp, X…)

Ces robots n'exécutent pas le JavaScript. Au build, `scripts/prerender-meta.mjs` écrit donc
une copie de `index.html` par route (`dist/projects/gentube.html`…) avec son titre, sa
description et son image de partage ; Vercel les sert sans extension (`cleanUrls`).
Les routes viennent de `scripts/routes.mjs` (source unique pour le sitemap et les images).
Après un ajout de projet : `python3 scripts/og-images.py && node scripts/sitemap.mjs`.

`src/data/github.json` est un instantané affiché au premier rendu ; le site recharge les
données fraîches depuis l'API GitHub une fois par session.

## Déploiement

Vercel (`vercel.json`) : réécriture SPA, cache long sur `/assets`, et en-têtes de sécurité
(CSP stricte, HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy`). Si vous ajoutez un
service externe (analytics, embed…), pensez à l'autoriser dans la CSP.
