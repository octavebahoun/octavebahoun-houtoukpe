# Portfolio — Oktav Bahoun

Portfolio personnel d'Octave Précieux Bahoun-Houtoukpe (« Oktav »), ingénieur IA & automatisation freelance.

## Stack

- **React 19** + **Vite**
- **Tailwind CSS v4** (design tokens dans `src/index.css`)
- **React Router** (site multi-pages)
- Contenu branché sur l'API headless (`portfolio-api`) + enrichissement GitHub live

## Pages

- `/` — Accueil (hero, services, à propos, outils, parcours, projets, tarifs, blog, FAQ)
- `/services` — 8 services en panneaux horizontaux
- `/about` — vision, mission, parcours, méthode
- `/projects` + `/projects/:id` — projets et détail projet
- `/blog` + `/blog/:slug` — articles
- `/faq` — questions fréquentes
- Formulaire de contact (Formspree) + prise de RDV (Cal.com)

## Développement

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
pnpm preview
```

Le déploiement Vercel est configuré pour les routes SPA (`vercel.json`).
