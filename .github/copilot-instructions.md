# Instructions pour Agents IA

## Vue d'ensemble du projet

**Portfolio Oktav** est une architecture **CMS headless maison** composée de 3 parties :

- **portfolio-front** (frontend public) : React 19 + Vite SPA — ce que les visiteurs voient
- **portfolio-api** (backend) : Node.js/Express + MongoDB — API REST centralisée
- **portfolio-admin** (backoffice) : React 19 + Vite — interface d'administration pour modifier tout le contenu

C'est le portfolio professionnel d'Oktav Bahoun présentant l'expertise Fullstack × IA. **Zéro hardcoding** — chaque texte, projet, certification, article de blog est modifiable depuis l'admin sans toucher au code.

## Architecture & Flux de données

### Frontend (portfolio-front)
**Stack technique** : React 19, Vite, Tailwind CSS v4, Zustand (état global), GSAP + Framer Motion (animations), Lucide React (icônes)

**Structure** :
- `src/pages/` → Composants au niveau route (Home, Projects, Certs, Blog, About)
- `src/features/` → Composants spécifiques par section (home, projects, certs, blog, about, **rag**)
- `src/components/shared/` → Composants layout (Navbar, Footer, ScrollProgress, DarkClouds)
- `src/components/ui/` → Primitives UI réutilisables (Button, Badge, DarkModeToggle)
- `src/hooks/` → Hooks personnalisés pour animations et interactions
- `src/store/useStore.js` → Store Zustand (dark mode, widget RAG, messages)

**Flux de données** :
1. Composant monte → appelle `GET /api/projects`, `GET /api/blog`, etc.
2. API retourne les données depuis MongoDB
3. Zustand cache les données pendant la session
4. Animations via `useScrollAnim()` (GSAP ScrollTrigger) ou `useMouseTilt()` (perspective 3D)
5. Widget RAG communique avec l'API `/api/rag` pour les requêtes utilisateur

### Backend (portfolio-api)
**Stack** : Node.js, Express, MongoDB (Mongoose), GitHub OAuth

**Routes principales** :
- `GET /api/projects` — liste tous les projets
- `GET /api/projects/:id` — détails d'un projet avec collaborateurs GitHub
- `GET /api/certs` — certifications
- `GET /api/blog` — articles
- `GET /api/about` — section À propos
- `POST /api/rag` — requêtes assistant IA (authentification admin requise)
- `POST /api/admin/*` — CRUD complet (authentification GitHub OAuth)

### Backoffice (portfolio-admin)
**Stack** : React 19, Vite, Tailwind CSS v4

**Pages** :
- Dashboard → Overview contenu
- Projets → Créer/modifier/supprimer projets (sync GitHub stars, collaborateurs)
- Certifications → Gérer certif
- Blog → Éditeur articles
- À propos → Modifier texte
- Paramètres → Config RAG, dark mode, etc.

### Assistant IA (RAG)
Intégré au backend :
- Pinecone (base vectorielle) pour indexer le contenu
- Groq/OpenRouter comme LLM
- Endpoint : `POST /api/rag` avec `{ query: string }` → `{ response: string }`

## Patterns clés & Conventions

### Patterns de composants
- **Composants fonctionnels uniquement** avec hooks ; pas de class components
- **Composants page** (`src/pages/*.jsx`) : gestionnaires de route, composent les features
- **Composants feature** (`src/features/{feature}/*.jsx`) : modules autonomes
- **Composants UI** : design basé variantes (Button : `primary`, `cta`, `outline`, `ghost`)
- **Animations** : Préférer GSAP `useScrollAnim()` pour entrées au scroll ; `useMouseTilt()` pour effet 3D

### Gestion d'état (Zustand)
Tout l'état global dans `useStore.js` :
```javascript
// Dark mode (synchronisé DOM)
darkMode, toggleDarkMode() // Ajoute/retire 'dark' sur document.documentElement

// Widget RAG
ragOpen, toggleRag(), closeRag()
ragMessages, addRagMessage(msg), clearRagMessages()
ragLoading, setRagLoading(bool)

// Cache données API
projects, setProjects(data)
blogPosts, setBlogPosts(data)
```
**Règle** : Les mutations Zustand gèrent les effets de bord (ex : classes DOM pour dark mode).

### Système de couleurs
- **Framework** : Tailwind CSS v4 avec plugin `@tailwindcss/vite`
- **Tokens couleur** (thème custom) :
  - `cobalt` (bleu primaire, `#2563EB`)
  - `amber` (orange accent, `#F59E0B`)
  - `ivory` (fond clair)
  - `dark-deep` (fond sombre)
  - `cloud` (léger secondaire)
  - `text-sec` (texte secondaire)
- **Dark mode** : basé classe CSS ; toggle ajoute/retire `dark` sur `<html>`
- **Utilitaires** : scrollbar personnalisée dans `index.css`

### Patterns d'animations
1. **Au scroll** : `useScrollAnim('fadeUp')` → entrée au scroll (point trigger 85%)
   - Variantes : `fadeUp`, `fadeLeft`, `fadeRight`, `scaleIn`
2. **Tilt 3D souris** : `useMouseTilt(intensity)` → effet 3D au survol
3. **Texte en cascade** : `setTimeout` + état `textStep` conditionnel
4. **Framer Motion** : Disponible pour chorégraphies complexes ; utiliser parcimonieusement

### Navigation & Routing
- React Router v7 avec wrapper `<BrowserRouter>`
- Routes dans `App.jsx` : `/`, `/projects`, `/certs`, `/blog`, `/about`
- Styling lien actif Navbar : classe `bg-cobalt text-white` sur chemin courant
- Nav mobile : Hamburger au breakpoint `lg` (1024px)

### Organisation du code
- **Imports** : alias chemin absolu `@/` → `src/` (configuré `vite.config.js`)
- **Nommage fichiers** : composants `.jsx`, utilitaires/hooks `.js`
- **Linting** : ESLint `ecmaVersion: 2020`, règles React Hooks appliquées
  - Vars inutilisées : ignore PascalCase avec `varsIgnorePattern: '^[A-Z_]'`

## Workflows de développement

### Démarrer dev (frontend)
```bash
cd portfolio-front
npm install  # Si nécessaire
npm run dev  # Serveur Vite (http://localhost:5173)
```

### Build & Preview
```bash
npm run build    # Génère dist/ production
npm run preview  # Serve dist/ localement
```

### Linting
```bash
npm run lint     # ESLint ; erreurs bloquent, warnings passent
```

### Backend (portfolio-api)
**Stack** : Node.js, Express, MongoDB Mongoose, Passport GitHub OAuth

**Structure** :
- `src/config/` — variables d'env, connexion MongoDB, Passport GitHub
- `src/controllers/` — logique métier (projects, certs, blog, admin)
- `src/middlewares/` — authentification GitHub OAuth, rate limiting
- `src/models/` — schémas Mongoose (Project, Blog, Cert, User)
- `src/routes/` — routes API publiques et admin
- `src/services/` — Pinecone, LLM (Groq/OpenRouter), GitHub API
- `src/utils/` — helpers, validators

**Démarrer dev** :
```bash
cd portfolio-api
npm install
npm run dev  # Node avec nodemon (http://localhost:5000)
```

### Backoffice (portfolio-admin)
**Même setup que portfolio-front** mais connecté à l'API avec authentification GitHub.

```bash
cd portfolio-admin
npm install
npm run dev  # (http://localhost:5174)
```

## Points d'intégration critiques

### Frontend ↔ Backend (Flux API)
**Toutes les données** sont servies par l'API :
1. Composants `useEffect` → `fetch('/api/projects')`, etc.
2. Réponses stockées dans Zustand
3. Erreurs API → affichage message d'erreur utilisateur
4. RAG widget → `POST /api/rag` avec authentification token

### Authentification GitHub OAuth (Admin)
- Backend utilise **Passport.js + GitHub Strategy**
- Seul Oktav peut se connecter (admin)
- Token JWT stocké (localStorage ou cookies httpOnly)
- Toutes les routes admin nécessitent ce token
- Routes admin préfixées : `POST /api/admin/projects`, etc.

### Intégration GitHub (Projets)
- Sync automatique des **stars** du projet
- Récupération liste **collaborateurs** depuis GitHub API
- Affichage dans card projet du frontend

### Persistence Dark Mode
- Toggle fonctionne mais ne persiste pas
- À implémenter : Zustand `persist` middleware + localStorage
- Synchroniser classe `dark` sur `<html>` pour Tailwind

### Responsive Mobile
- Breakpoint : `lg` (1024px) pour éléments desktop
- Navbar → hamburger + overlay mobile
- Préfixes Tailwind : `max-lg:`, `lg:`, `md:`

## Tâches courantes & approches

### Ajouter une nouvelle route (frontend)
1. Créer page `src/pages/PageName.jsx`
2. Ajouter route `App.jsx` → `<Route path="/pathname" element={<PageName />} />`
3. Ajouter lien `Navbar.jsx` → array `links`
4. Créer feature folder si complexe : `src/features/feature/`

### Créer composant UI réutilisable
1. Placer `src/components/ui/ComponentName.jsx`
2. Accepter prop `variant` avec styles prédéfinis (pattern `Button.jsx`)
3. Forward props avec `{...props}` pour flexibilité

### Implémenter animations au scroll
1. Importer `useScrollAnim` dans composant
2. Appeler hook : `const ref = useScrollAnim('fadeUp')`
3. Appliquer ref : `<div ref={ref}>`
4. Cleanup auto-géré par GSAP ScrollTrigger

### Déboguer performance animations
- Chrome DevTools → onglet Performance
- Console : `gsap.timeline()`
- Réduire animations si FPS < 60

### Ajouter nouveau champ de contenu
**Exemple : ajouter "Stack techno" aux projets**
1. Modifier schéma Mongoose `models/Project.js` → ajouter field `techStack: [String]`
2. Updater contrôleur `controllers/projectController.js` → inclure `techStack` en réponse
3. Frontend `src/features/projects/ProjectCard.jsx` → afficher `project.techStack`
4. Admin `portfolio-admin/src/features/projects/EditProject.jsx` → input pour `techStack`

## Dépendances externes & versions

**Frontend & Admin** :
- React : v19.2.4 (latest)
- Vite : v8.0.4
- GSAP : v3.14.2 (free tier uniquement)
- Framer Motion : v12.38.0
- Zustand : v5.0.12 (état léger ~1KB)
- React Router : v7.14.0
- Tailwind CSS : v4.2.2 (plugin `@tailwindcss/vite`)
- Lucide React : v1.7.0 (icônes)

**Backend** :
- Express : v4.x
- Mongoose : v7.x ou 8.x (MongoDB ODM)
- Passport.js : v0.7.x (authentification GitHub)
- axios : pour appels externes (GitHub API, Groq, etc.)
- dotenv : variables d'environnement
- Pinecone : client vecteur DB

## Anti-patterns à éviter
- ❌ **Redux** → Zustand léger volontairement
- ❌ **Prop drilling pour UI** → utiliser Zustand
- ❌ **setTimeout dans composants** → GSAP pour animations
- ❌ **DOM manipulation directe** → refs React + GSAP ou CSS transitions
- ❌ **Event handlers inline en JSX** → `useCallback` pour éviter re-renders
- ❌ **Hardcoder données** → tout passe par API
- ❌ **Appels API dans composants** → centraliser dans Zustand actions ou custom hooks

## Checklist réussite PRs
- [ ] Composants avec hooks (pas de class components)
- [ ] État global Zustand (pas de prop drilling)
- [ ] Animations via `useScrollAnim()` ou GSAP
- [ ] Tailwind + variantes (pas de styles inline)
- [ ] Dark mode respecte préfixes `dark:` ; synced avec store
- [ ] Responsive mobile (breakpoint `lg:` considéré)
- [ ] ESLint sans warnings
- [ ] Navbar/Footer cohérence
- [ ] Données viennent API (pas de mock)

## Déploiement
- **portfolio-front** → Vercel (main branch auto-déploie)
- **portfolio-api** → Render (free tier OK, Redis pour cache optionnel)
- **portfolio-admin** → Vercel (authentification GitHub OAuth)
- **MongoDB** → MongoDB Atlas (free tier 512MB)
- **Pinecone** → Free tier vectoriel DB

**Variables d'environnement backend** (.env) :
```
MONGODB_URI=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
JWT_SECRET=...
GROQ_API_KEY=...
PINECONE_API_KEY=...
PINECONE_ENVIRONMENT=...
FRONTEND_URL=http://localhost:5173 (dev) ou https://portfolio.oktav.dev (prod)
ADMIN_URL=http://localhost:5174 (dev) ou https://admin.portfolio.oktav.dev (prod)
```
