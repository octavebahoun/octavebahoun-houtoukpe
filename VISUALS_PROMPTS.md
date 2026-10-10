# Prompts visuels — Portfolio Oktav

Objectif : remplacer les captures d'écran par des visuels cohérents avec le design system
(orange `#FE4619`, noir `#0D0D0D`, gris `#F0F0F0`, coins arrondis, style épuré).
Format conseillé : **1600×1200 (4:3)** pour les projets, **1600×900 (16:9)** pour le blog.

## Style de base (à coller au début de chaque prompt)

> Clean modern product UI mockup, high detail, rounded corners, soft shadows, minimal design,
> orange `#FE4619` accent color on dark `#0D0D0D` interface panels, light gray `#F0F0F0` background,
> subtle grid pattern, no readable text (blurred placeholder text), professional dribbble shot,
> soft studio lighting, 4k

## Projets — `public/images/projects/`

| Fichier | Prompt (après le style de base) |
|---|---|
| `contravo.jpg` | Freelance business dashboard: invoice list, quote cards, client avatars, orange call-to-action buttons, sidebar navigation |
| `waaloge.jpg` | Student housing platform: map with location pins, apartment cards with photos, search filters bar, orange "book visit" buttons |
| `jarvis.jpg` | AI assistant chat interface: chat bubbles, voice waveform, floating orb avatar, terminal panel, dark theme with orange highlights |
| `studynotes.jpg` | Study notes PWA on a phone mockup: flashcards, quiz progress rings, AI summary card, orange highlight markers, floating on light background |
| `code-to-vector.jpg` | Developer CLI tool: terminal window with code, vector embedding visualization (scattered dots forming clusters), pipeline diagram, dark theme, orange nodes |
| `cv-generator.jpg` | Resume builder app: document preview with clean typography blocks, form panel on the left, orange generate button, AI sparkle icons |
| `vault.jpg` | Image library and secrets vault: masonry grid of image thumbnails, padlock icon, masked API keys list, dark UI with orange accents |
| `mecano.jpg` | Mobile car mechanic service: booking screen, car illustration, calendar widget, orange "reserve" button, clean light UI |

## Blog — `public/images/blog/`

| Fichier | Prompt (après le style de base) |
|---|---|
| `video-remix-studio.jpg` | Video editing timeline: waveform with beat markers, film strip thumbnails, playhead, node graph overlay with 6 connected agent nodes, dark studio UI, orange cut markers |
| `scholaris.jpg` | n8n-style automation workflow: connected rounded nodes with icons, animated dashed flow lines, RSS and GitHub icons feeding into an AI node, dark canvas with dotted grid, orange connectors |
| `waaloge.jpg` | (réutiliser le visuel projet Waaloge) |

## Services — `public/images/services/`

| Fichier | Prompt (après le style de base) |
|---|---|
| `dev-web.jpg` | Responsive web design showcase: laptop and phone mockups side by side showing the same orange-accented landing page, floating UI cards, light background |
| `saas.jpg` | SaaS dashboard: analytics charts, KPI cards, user table, subscription panel, orange primary buttons, dark sidebar |

## Bannière À propos — `public/images/about-banner.jpg`

| Fichier | Prompt (après le style de base) |
|---|---|
| `about-banner.jpg` | Developer workspace banner: desk with laptop showing code, notebook with sketches, coffee, plant, warm light, wide cinematic composition, orange object accent |

## Notes

- Garder les **mêmes noms de fichiers** : aucune modification de code n'est nécessaire.
- Si un visuel généré contient du texte illisible, c'est voulu (les modèles écrivent mal) —
  privilégier des compositions sans texte ou avec des blocs flous.
- La photo de profil (`profile-cutout.png`) reste la vraie photo : ne pas la générer.
