/* ============================================================
   BASE DE DONNÉES — OCTAVE PRÉCIEUX MAHUNAN BAHOUN-HOUTOUKPE
   Source : CVs officiels, GitHub, LinkedIn, NPM, READMEs des dépôts.
   ============================================================ */

export const IDENTITY = {
  firstName: "Octave",
  lastName: "BAHOUN-HOUTOUKPE",
  fullName: "Octave Précieux Mahunan BAHOUN-HOUTOUKPE",
  initials: "OB",
  title: "Architecte IA & Fullstack",
  longTitle:
    "Étudiant Ingénieur en Génie Électrique & Informatique | Développeur Fullstack IA & Tech Lead",
  specialty: "Data & AI Engineering — Architectures RAG & LLMs — Web Fullstack",
  tagline: "Façonner des systèmes logiciels intelligents, souverains et utiles.",
  bio: "Étudiant en Informatique & Télécommunications à l'INSTI (UNSTIM Lokossa), passionné d'Intelligence Artificielle et entrepreneur technologique. Co-fondateur et Tech Lead chez Excellence Team, spécialisé dans la création d'architectures logicielles modernes intégrant des LLMs, du Machine Learning et des pipelines de traitement de données (RAG) à fort impact.",
  location: "Lokossa / Cotonou, Bénin",
  country: "Bénin",
  email: "octavebahoun@gmail.com",
  phones: ["+229 0147797082", "+229 90150654575"],
  links: {
    github: "https://github.com/octavebahoun",
    linkedin:
      "https://www.linkedin.com/in/octave-pr%C3%A9cieux-mahunan-bahoun-houtoukpe-b9114b337/",
    npm: "https://www.npmjs.com/package/codetovecto",
    nowstudy: "https://nowstudy.vercel.app",
    cv: "/cv.pdf",
  },
} as const;

export const BADGES = [
  "Co-fondateur — Excellence Team",
  "INSTI Lokossa (UNSTIM)",
  "Lead Workshop Data & AI",
  "Open Source — NPM",
] as const;

export const TALLY = [
  { n: "64+", l: "Dépôts GitHub" },
  { n: "48", l: "Stars cumulées" },
  { n: "10+", l: "Étudiants encadrés" },
  { n: "6", l: "Équipe Excellence" },
] as const;

/* ---------------- Parcours ---------------- */

export type Milestone = {
  when: string;
  what: string;
  where: string;
  desc: string;
  current?: boolean;
};

export const TIMELINE: Milestone[] = [
  {
    when: "Mars 2026 — Présent",
    what: "Lead Workshop Data & AI",
    where: "Digital Innovation Club — INSTI, Lokossa",
    desc: "Animation d'ateliers techniques hebdomadaires axés Data & IA. Encadrement de plus de 10 étudiants sur Python et Scikit-Learn, de la préparation des données jusqu'à l'évaluation des modèles.",
    current: true,
  },
  {
    when: "Août 2025 — Présent",
    what: "Co-fondateur & Tech Lead",
    where: "Excellence Team — Lokossa / Cotonou",
    desc: "Startup digitale de 6 personnes spécialisée dans le développement de plateformes critiques et l'intégration d'intelligences artificielles souveraines. Direction technique, architecture et revue de code.",
    current: true,
  },
  {
    when: "Février 2026 — Mars 2026",
    what: "Développeur Fullstack IA — Hackathon HACKBYIFRI",
    where: "Lokossa, Bénin",
    desc: "Développement d'AcademiX, plateforme académique tout-en-un combinant IA générative et collaboration sociale, livrée dans le format contraint du hackathon.",
  },
  {
    when: "Décembre 2025 — Février 2026",
    what: "Stagiaire Machine Learning",
    where: "Pro Technologie Plus — Lokossa",
    desc: "Conception de modèles supervisés (Random Forest), analyse exploratoire et visualisation avec Pandas et Seaborn sur des jeux de données métier.",
  },
  {
    when: "Août 2025 — Octobre 2025",
    what: "Stagiaire Développement Web",
    where: "Bénin Digital",
    desc: "Développement d'interfaces et d'API web, intégration front-end et mise en production de fonctionnalités clientes.",
  },
  {
    when: "Depuis 2024",
    what: "Formation Ingénieur — Informatique & Télécommunications",
    where: "INSTI Lokossa (UNSTIM) — après le CEG Ségbéya",
    desc: "Cursus Génie Électrique & Informatique. Spécialisation progressive vers la Data Science, l'IA appliquée et l'architecture logicielle.",
  },
];

/* ---------------- Compétences ---------------- */

export type SkillGroup = {
  title: string;
  accent: "volt" | "flux";
  items: { n: string; v: number }[];
};

export const SKILLS: SkillGroup[] = [
  {
    title: "Data & Intelligence Artificielle",
    accent: "volt",
    items: [
      { n: "Pipelines RAG & Vector Embeddings", v: 92 },
      { n: "LLMs & Fine-tuning (datasets, évaluation)", v: 88 },
      { n: "Groq SDK / OpenRouter / APIs LLM", v: 90 },
      { n: "Scikit-learn — Random Forest, modèles supervisés", v: 82 },
      { n: "Pandas / Seaborn — analyse & visualisation", v: 85 },
    ],
  },
  {
    title: "Développement Web & Cloud",
    accent: "flux",
    items: [
      { n: "Python — FastAPI, Flask", v: 90 },
      { n: "React, Next.js, Vite, Zustand", v: 92 },
      { n: "Node.js, Express, REST & WebSockets", v: 86 },
      { n: "Docker, Docker Compose, Nginx", v: 80 },
      { n: "MongoDB, PostgreSQL, SQLite", v: 78 },
      { n: "Git, Linux, CI de base", v: 88 },
    ],
  },
  {
    title: "Leadership & Langues",
    accent: "volt",
    items: [
      { n: "Tech Lead & architecture d'équipe", v: 87 },
      { n: "Animation d'ateliers & mentorat", v: 90 },
      { n: "Français — langue de travail", v: 100 },
      { n: "Anglais — technique & professionnel", v: 78 },
      { n: "Fon — langue maternelle", v: 100 },
    ],
  },
];

export const TOOLBOX = [
  "Python", "FastAPI", "Flask", "React", "Next.js", "Vite", "Node.js", "Express",
  "Zustand", "Tailwind", "Three.js", "GSAP", "Docker", "Nginx", "MongoDB",
  "PostgreSQL", "SQLite", "Scikit-learn", "Pandas", "Seaborn", "Groq SDK",
  "OpenRouter", "Whisper", "Remotion", "FFmpeg", "Git", "Linux", "Figma",
] as const;

/* ---------------- Projets ---------------- */

export type ProjectCategory = "ia" | "web" | "oss";

export type Project = {
  id: string;
  title: string;
  kind: string;
  cats: ProjectCategory[];
  isPublic: boolean;
  summary: string;
  detail: string;
  stack: string[];
  links: { label: string; url: string }[];
};

export const PROJECTS: Project[] = [
  {
    id: "codetovecto",
    title: "Codetovecto",
    kind: "Package NPM · CLI Open Source",
    cats: ["ia", "oss"],
    isPublic: true,
    summary:
      "CLI Node.js d'extraction sémantique et de vectorisation de code source pour alimenter des pipelines RAG.",
    detail:
      "Découpe intelligemment un dépôt en unités sémantiques, génère les structures JSON et les bases vectorielles prêtes à être consommées par un LLM. Publié publiquement sur le registre NPM.",
    stack: ["Node.js", "CLI", "RAG", "Vector Embeddings", "JSON"],
    links: [
      { label: "Voir sur NPM", url: "https://www.npmjs.com/package/codetovecto" },
      { label: "GitHub", url: "https://github.com/octavebahoun" },
    ],
  },
  {
    id: "tofitune",
    title: "To_fitune",
    kind: "Dataset Studio pour LLMs",
    cats: ["ia", "oss"],
    isPublic: true,
    summary:
      "Studio de génération, comparaison et curation de datasets pour le fine-tuning de LLMs spécialisés en design.",
    detail:
      "10 modèles évalués en parallèle (GPT-4o, O3 Mini, Gemini 2.5 Pro, Gemini 2.0 Flash, Llama 3.3 70B, Qwen3, Kimi K2, Nemotron 49B). Système de pression compétitive : chaque modèle reçoit l'historique des 5 dernières évaluations et le classement en direct. Juge automatique scorant sur 4 axes — Visuel, Code, Sécurité, Logique. Export JSON Master compatible Alpaca, ShareGPT et HuggingFace.",
    stack: ["FastAPI", "React", "Zustand", "PostgreSQL", "SQLite", "Docker Compose"],
    links: [{ label: "Repo GitHub", url: "https://github.com/octavebahoun/To_fitune" }],
  },
  {
    id: "nowstudy",
    title: "NowStudy / AcademiX",
    kind: "PWA étudiante intelligente",
    cats: ["ia", "web"],
    isPublic: true,
    summary:
      "Carnet de notes intelligent : formules de calcul par matière, révisions assistées par IA et podcasts audio générés.",
    detail:
      "PWA React 18 avec détection automatique des coefficients, IA de révision via Groq SDK (LLaMA3, Mixtral, Gemma) produisant flashcards, quiz, résumés et visualiseurs RAG. Podcasts audio via microservice Flask gTTS, notifications Push VAPID, mode hors-ligne Workbox, bulletin PDF jsPDF et système de badges de réussite.",
    stack: ["React 18 PWA", "Express", "MongoDB Atlas", "Flask gTTS", "Groq SDK", "Workbox"],
    links: [
      { label: "Application", url: "https://nowstudy.vercel.app" },
      { label: "Repo GitHub", url: "https://github.com/octavebahoun/Study" },
    ],
  },
  {
    id: "videogen",
    title: "VideoGen v2",
    kind: "Markdown → Vidéo",
    cats: ["web", "ia"],
    isPublic: true,
    summary:
      "Moteur de rendu vidéo qui transforme un document Markdown en film cinématique MP4 avec voix off.",
    detail:
      "Éditeur Markdown temps réel avec preview dans le lecteur, slides cinématiques (titres, concepts, schémas, citations), rendu MP4 natif via Remotion et FFmpeg, génération de voix off TTS par microservice Flask.",
    stack: ["React", "Vite", "Tailwind v4", "Remotion", "Flask", "FFmpeg"],
    links: [{ label: "Repo GitHub", url: "https://github.com/octavebahoun/VideoGen" }],
  },
  {
    id: "jarvis",
    title: "Jarvis",
    kind: "Assistant personnel système",
    cats: ["ia", "oss"],
    isPublic: true,
    summary:
      "Agent IA Python pour l'automatisation de tâches système, le contrôle vocal et les requêtes intelligentes.",
    detail:
      "Assistant local capable d'exécuter des commandes système, d'interpréter la voix et de router des requêtes vers des modèles de langage. Sa version web, plus légère, alimente le chatbot de ce portfolio.",
    stack: ["Python", "Speech", "Automatisation", "LLM routing"],
    links: [{ label: "Repo GitHub", url: "https://github.com/octavebahoun/Jarvis" }],
  },
  {
    id: "whisper",
    title: "Whisper-subtitle",
    kind: "Sous-titrage karaoké IA",
    cats: ["ia", "oss"],
    isPublic: true,
    summary:
      "Alignement temporel mot à mot basé sur Whisper d'OpenAI, pour générer des sous-titres façon karaoké.",
    detail:
      "Transcrit une piste audio puis aligne chaque mot sur sa fenêtre temporelle exacte, produisant des fichiers de sous-titres synchronisés au mot près.",
    stack: ["Python", "Whisper", "Alignement temporel", "SRT/ASS"],
    links: [
      { label: "Repo GitHub", url: "https://github.com/octavebahoun/Whisper-subtitle" },
    ],
  },
  {
    id: "fieri",
    title: "FIERI",
    kind: "Gouvernance communautaire",
    cats: ["web"],
    isPublic: false,
    summary:
      "Plateforme de gouvernance communautaire : organisation des membres, décisions et suivi des initiatives.",
    detail:
      "Projet mené au sein d'Excellence Team. Structure les processus de décision d'une communauté : rôles, propositions, votes et restitution des engagements.",
    stack: ["React", "Node.js", "PostgreSQL"],
    links: [{ label: "Profil GitHub", url: "https://github.com/octavebahoun" }],
  },
];

export const FILTERS: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "Tout" },
  { id: "ia", label: "IA & Data" },
  { id: "web", label: "Web & PWA" },
  { id: "oss", label: "Open Source" },
];

/* ---------------- Base de connaissance Jarvis ---------------- */

export type Answer = { keys: string[]; text: string };

export const JARVIS_SUGGESTIONS = [
  "Quelles sont ses compétences en RAG ?",
  "Explique-moi le fonctionnement de To_fitune",
  "Comment télécharger son CV ?",
  "Parle-moi d'Excellence Team",
  "Quels projets open source ?",
  "Comment le contacter ?",
] as const;

export const JARVIS_GREETING =
  "Jarvis en ligne. Je suis indexé sur le profil complet d'Octave : parcours, projets, stack et coordonnées. Pose ta question, ou choisis une suggestion ci-dessous.";

export const JARVIS_FALLBACK =
  "Je n'ai pas d'entrée indexée pour cette formulation. Essaie avec un mot-clé : RAG, To_fitune, Codetovecto, NowStudy, VideoGen, Whisper, Excellence Team, formation, stack, CV, contact, hackathon, ou langues.";

export const JARVIS_KB: Answer[] = [
  {
    keys: ["rag", "vector", "embedding", "retrieval", "vectoris"],
    text: "Le RAG est le cœur de sa pratique IA. Codetovecto (publié sur NPM) découpe un dépôt de code en unités sémantiques puis les vectorise pour alimenter un pipeline de retrieval. NowStudy embarque des visualiseurs RAG sur les contenus de cours. Compétences associées : vector embeddings, chunking sémantique, orchestration de contexte pour LLM.",
  },
  {
    keys: ["to_fitune", "tofitune", "fitune", "dataset", "fine-tun", "finetun"],
    text: "To_fitune est un Dataset Studio pour LLMs. Backend FastAPI, frontend React + Zustand, base SQLite/PostgreSQL, le tout orchestré en Docker Compose. 10 modèles sont évalués en parallèle (GPT-4o, O3 Mini, Gemini 2.5 Pro et Flash, Llama 3.3 70B, Qwen3, Kimi K2, Nemotron 49B). Particularité : un système de pression compétitive — chaque modèle reçoit l'historique des 5 dernières évaluations et le classement en direct. Un juge automatique score sur 4 axes : Visuel, Code, Sécurité, Logique. Export compatible Alpaca, ShareGPT et HuggingFace.",
  },
  {
    keys: ["codetovecto", "npm", "cli", "package"],
    text: "Codetovecto est un package NPM open source. C'est un CLI Node.js qui extrait la sémantique d'un code source, le découpe et le vectorise pour produire des structures JSON et des bases vectorielles directement exploitables par un LLM. Disponible sur npmjs.com/package/codetovecto.",
  },
  {
    keys: ["nowstudy", "academix", "pwa", "étudiant", "etudiant", "notes", "study"],
    text: "NowStudy (aussi présenté sous le nom AcademiX au hackathon HACKBYIFRI) est une PWA React 18. Elle calcule les moyennes avec des formules personnalisées par matière et détection automatique des coefficients, génère des flashcards, quiz, résumés et podcasts audio via Groq SDK et un microservice Flask gTTS. Elle gère aussi les notifications Push VAPID, le mode hors-ligne Workbox, l'export PDF du bulletin et un système de badges. En ligne sur nowstudy.vercel.app.",
  },
  {
    keys: ["videogen", "vidéo", "video", "remotion", "ffmpeg", "markdown"],
    text: "VideoGen v2 transforme un document Markdown en vidéo cinématique. Frontend React + Vite + Tailwind v4 avec éditeur temps réel, moteur de rendu Remotion, microservice Flask pour la voix off TTS, et FFmpeg pour la sortie MP4 native. Slides cinématiques : titres, concepts, schémas, citations.",
  },
  {
    keys: ["whisper", "sous-titre", "subtitle", "karaok", "transcription"],
    text: "Whisper-subtitle s'appuie sur le modèle Whisper d'OpenAI pour aligner temporellement chaque mot d'une piste audio, et produire des sous-titres synchronisés au mot près — format karaoké.",
  },
  {
    keys: ["jarvis", "assistant", "vanguard", "robot"],
    text: "Jarvis est son assistant personnel écrit en Python : automatisation de tâches système, contrôle vocal et routage de requêtes vers des modèles de langage. Le chatbot de cette page en est une version web allégée.",
  },
  {
    keys: ["fieri", "gouvernance", "communaut"],
    text: "FIERI est une plateforme de gouvernance communautaire développée au sein d'Excellence Team : gestion des rôles, propositions, votes et suivi des engagements d'une communauté.",
  },
  {
    keys: ["excellence", "startup", "équipe", "equipe", "team", "cofond", "co-fond", "tech lead"],
    text: "Excellence Team est la startup digitale qu'il a co-fondée en août 2025, à Lokossa et Cotonou. Six personnes, positionnées sur le développement de plateformes critiques et l'intégration d'IA souveraines. Il y occupe le rôle de Tech Lead : architecture, direction technique et revue de code.",
  },
  {
    keys: ["hackathon", "hackbyifri", "concours", "compétition", "competition"],
    text: "Au hackathon HACKBYIFRI (février–mars 2026, Lokossa), il a développé AcademiX en tant que développeur fullstack IA : une plateforme académique tout-en-un mêlant IA générative et collaboration sociale.",
  },
  {
    keys: ["formation", "école", "ecole", "insti", "unstim", "étude", "etude", "diplôme", "diplome", "universit"],
    text: "Il est étudiant ingénieur en Informatique & Télécommunications à l'INSTI Lokossa (UNSTIM), filière Génie Électrique & Informatique, après le CEG Ségbéya. Depuis mars 2026 il est aussi Lead Workshop Data & AI au Digital Innovation Club de l'INSTI, où il encadre plus de 10 étudiants sur Python et Scikit-Learn.",
  },
  {
    keys: ["stage", "expérience", "experience", "pro technologie", "bénin digital", "benin digital", "parcours"],
    text: "Deux stages structurants : Machine Learning chez Pro Technologie Plus (déc. 2025 – fév. 2026, modèles supervisés Random Forest, analyse Pandas/Seaborn) et Développement Web chez Bénin Digital (août – oct. 2025). En parallèle : Excellence Team depuis août 2025 et le Digital Innovation Club depuis mars 2026.",
  },
  {
    keys: ["stack", "techno", "outil", "compétence", "competence", "langage", "skill"],
    text: "Data & IA : RAG, LLMs, fine-tuning, Groq SDK, OpenRouter, vector embeddings, Scikit-learn, Pandas, Seaborn. Fullstack : Python (FastAPI, Flask), Node.js, Express, React, Next.js, WebSockets, microservices, MongoDB, PostgreSQL, SQLite. DevOps : Docker, Docker Compose, Nginx, Git, Linux, Remotion, FFmpeg.",
  },
  {
    keys: ["cv", "curriculum", "résumé", "resume", "télécharger", "telecharger", "pdf"],
    text: "Le CV officiel en PDF est téléchargeable depuis la page Contact, bouton « Télécharger le CV », ou directement à l'adresse /cv.pdf du site.",
  },
  {
    keys: ["contact", "email", "mail", "joindre", "téléphone", "telephone", "numéro", "numero", "recrut", "embauch"],
    text: "Email : octavebahoun@gmail.com. Téléphones : +229 0147797082 et +229 90150654575. GitHub : github.com/octavebahoun. LinkedIn est accessible depuis la page Contact, tout comme le formulaire de message direct.",
  },
  {
    keys: ["github", "dépôt", "depot", "repo", "open source", "opensource", "libre"],
    text: "Son GitHub (github.com/octavebahoun) compte plus de 64 dépôts et 48 stars cumulées. Les projets publics phares : Codetovecto (aussi sur NPM), To_fitune, Study/NowStudy, VideoGen, Jarvis et Whisper-subtitle.",
  },
  {
    keys: ["langue", "anglais", "français", "francais", "fon", "parle"],
    text: "Français : langue de travail. Fon : langue maternelle. Anglais : niveau technique et professionnel, suffisant pour la documentation, les publications et la collaboration internationale.",
  },
  {
    keys: ["où", "ou ", "localisation", "ville", "pays", "bénin", "benin", "habite", "lokossa", "cotonou"],
    text: "Il est basé entre Lokossa et Cotonou, au Bénin. Disponible pour des missions à distance comme sur place.",
  },
  {
    keys: ["qui", "présente", "presente", "bio", "profil", "octave"],
    text: "Octave Précieux Mahunan BAHOUN-HOUTOUKPE, étudiant ingénieur en Informatique & Télécommunications à l'INSTI Lokossa, co-fondateur et Tech Lead d'Excellence Team. Il construit des architectures logicielles intégrant LLMs, machine learning et pipelines RAG — avec une exigence : que les systèmes soient intelligents, souverains et utiles.",
  },
  {
    keys: ["bonjour", "salut", "hello", "hey", "coucou", "bonsoir"],
    text: "Bonjour. Jarvis, assistant indexé sur le profil d'Octave. Demande-moi ses compétences, un projet précis, son parcours ou ses coordonnées.",
  },
];
