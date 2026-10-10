// Catalogue local des projets.
// - Sert de repli si l'API est injoignable.
// - Enrichit les projets de l'API (visuel harmonisé, chiffres clés, catégories, année, rôle).
// Les textes saisis dans le back office (/admin) restent prioritaires sur ceux d'ici.

export const categories = [
  { id: 'all', label: 'Tous' },
  { id: 'ia', label: 'IA & agents' },
  { id: 'saas', label: 'SaaS' },
  { id: 'web', label: 'Web & produit' },
  { id: 'oss', label: 'Open source' },
]

// Dépôts visibles sur le GitHub d'Oktav qui ne sont pas ses projets : jamais affichés
export const hiddenRepos = ['agritracebio']

// Descriptions affichées à la place de celles de GitHub (manquantes ou à corriger)
export const repoNotes = {
  'octavebahoun-houtoukpe': 'Ce portfolio — React 19, Tailwind CSS v4, Motion, Lenis',
  findspeed: 'Trouver un produit et la cabine qui le vend au marché de PK3 — PWA Next.js + Laravel',
  fier2: 'FIERI Research — plateforme de gestion de la recherche académique',
  gentube: 'Gentube — SaaS multi-tenant de génération vidéo IA',
  exo_data_ia_learning:
    'Exercices de machine learning et de data science : Keras, PyTorch, scikit-learn.',
}

export const catalog = [
  {
    slug: 'gentube',
    title: 'Gentube',
    subtitle: 'Décrivez. On monte. — le studio vidéo IA',
    description:
      "SaaS multi-tenant de génération vidéo pour les créateurs d'Afrique de l'Ouest : un thème en entrée, une vidéo prête pour YouTube en sortie.",
    challenge:
      "Monter une vidéo prend une journée : storyboard écrit à la main, voix réenregistrée à chaque correction, images et montage dans quatre outils différents.",
    solution:
      "Gentube écrit le storyboard scène par scène (éditable en kanban), fabrique la voix et les images, puis monte le MP4. Le rendu est découpé en morceaux traités en parallèle sur AWS Lambda et Step Functions.",
    impact:
      'Une base multi-tenant solide — isolation des tenants, grand livre de crédits, paiement mobile money et carte en FCFA — tenue par 392 tests automatisés.',
    features: [
      'Storyboard IA éditable en kanban',
      'Voix off multi-fournisseurs',
      'Rendu parallèle sur AWS Lambda',
      'Mobile money & carte (GeniusPay)',
    ],
    metrics: [
      { value: '392', label: 'tests automatisés' },
      { value: '30\u00a0s', label: 'de calcul par vidéo' },
      { value: '1080p', label: 'rendus prêts à publier' },
    ],
    stack: ['Next.js 15', 'TypeScript', 'Drizzle', 'PostgreSQL', 'AWS Lambda', 'Cloudflare R2'],
    categories: ['ia', 'saas', 'oss'],
    year: '2026',
    role: 'Architecture & full-stack',
    status: 'En développement actif',
    link: 'https://gentube-nine.vercel.app',
    repo: 'octavebahoun/gentube',
    image: '/images/work/gentube.webp',
    accent: '#ff5a2b',
    featured: true,
  },
  {
    slug: 'video-remix-studio',
    title: 'Video Remix Studio',
    subtitle: 'La table de montage qui retrouve vos plans',
    description:
      "Un OS agentique de remix vidéo : à partir d'une phrase, six agents cherchent, notent et assemblent des plans existants, calés sur les beats de la musique.",
    challenge:
      "Retrouver les 0,8 seconde qui tombent juste sur le drop dans des téraoctets de rushes prend des heures — et le génératif invente de travers, coûte cher en GPU et pose des questions de droits.",
    solution:
      'Six agents LangGraph (Intent → Retriever → Analyzer → Planner → Editor → Validator) partagent un état commun. Indexation locale avec PySceneDetect, Librosa, OpenCV, YOLO11, Florence-2 et SigLIP, stockée dans LanceDB ; assemblage final en une seule commande FFmpeg.',
    impact:
      'Un montage en 10 à 40 secondes, zéro pixel généré, 0\u00a0$ en mode local. V1 complète en 10 sprints, avec une quarantaine de tests et une CLI.',
    features: [
      'Pipeline de 6 agents LangGraph',
      'Coupes calées sur les beats (Librosa)',
      'Recherche hybride vectorielle (LanceDB)',
      'Fonctionne sans GPU ni clé API',
    ],
    metrics: [
      { value: '6', label: 'agents LangGraph' },
      { value: '0', label: 'pixel généré' },
      { value: '10–40\u00a0s', label: 'par montage' },
    ],
    stack: ['Python', 'LangGraph', 'LanceDB', 'FFmpeg', 'YOLO11', 'SigLIP'],
    categories: ['ia', 'oss'],
    year: '2026',
    role: 'Solo — conception & développement',
    status: 'V1 livrée · en pause',
    repo: 'octavebahoun/video-remix-studio',
    link: 'https://github.com/octavebahoun/video-remix-studio',
    article: '/blog/video-remix-studio',
    image: '/images/work/video-remix-studio.webp',
    accent: '#a78bfa',
    featured: true,
    architecture: 'agents',
  },
  {
    slug: 'contravo',
    title: 'Contravo',
    subtitle: 'Ton bureau numérique : devis, contrats, clients',
    description:
      'Une plateforme tout-en-un pour freelances et artisans : devis, factures, relances et suivi clients, avec Mobile Money intégré.',
    challenge:
      'Les freelances et artisans perdent un temps fou à rédiger devis et factures, souvent sur téléphone, avec des outils pensés pour de grandes entreprises.',
    solution:
      'Contravo centralise devis, factures, relances et suivi clients dans une interface simple, avec Mobile Money intégré pour les paiements locaux.',
    impact:
      "Des devis générés en quelques minutes au lieu d'une heure, et une vision claire de l'activité pour ses utilisateurs.",
    features: [
      'Devis & factures en quelques clics',
      'Relances automatiques',
      'Paiement Mobile Money',
      'Suivi clients centralisé',
    ],
    metrics: [
      { value: 'B2B', label: 'SaaS multi-tenant' },
      { value: 'FCFA', label: 'paiement mobile money' },
      { value: 'Live', label: 'en production' },
    ],
    stack: ['Next.js 15', 'Drizzle', 'PostgreSQL', 'pgvector', 'n8n'],
    categories: ['saas', 'web'],
    year: '2026',
    role: 'Co-fondateur — direction technique',
    status: 'En ligne',
    link: 'https://contravo.excellenceteam.site/',
    image: '/images/work/contravo.webp',
    accent: '#fb923c',
    featured: true,
  },
  {
    slug: 'jarvis',
    title: 'Jarvis',
    subtitle: 'Un double numérique, progressif et contrôlé',
    description:
      'Un assistant qui mémorise votre contexte, raisonne selon votre style, propose des plans d’action et exécute les tâches — avec validation humaine.',
    challenge:
      'Répéter les mêmes tâches (recherche, code, veille) chaque jour finit par coûter des heures — et les assistants classiques restent passifs.',
    solution:
      "Un cœur de conversation avec mémoire court terme, long terme et sémantique (PostgreSQL, Redis, ChromaDB), puis un agent qui raisonne, planifie et agit via des outils sandboxés — toujours avec un plan explicite avant toute action sensible.",
    impact:
      'Phases 1 et 2 livrées (chat, mémoire, agent outillé) : un socle réutilisable pour mes autres projets IA.',
    features: [
      'Mémoire vectorielle (RAG)',
      'Planification + outils sandboxés',
      'Validation humaine des actions',
      'Roadmap en 4 phases',
    ],
    metrics: [
      { value: '2/4', label: 'phases livrées' },
      { value: '3', label: 'couches de mémoire' },
      { value: '★\u00a04', label: 'sur GitHub' },
    ],
    stack: ['Python', 'FastAPI', 'Next.js', 'PostgreSQL', 'Redis', 'Docker'],
    categories: ['ia', 'oss'],
    year: '2026',
    role: 'Solo',
    status: 'Phase 3 en cours',
    link: 'https://jarvis-seven-beta.vercel.app',
    repo: 'octavebahoun/Jarvis',
    image: '/images/work/jarvis.webp',
    accent: '#22d3ee',
    featured: true,
  },
  {
    slug: 'academix',
    title: 'AcademiX',
    subtitle: "Réussir ses études avec l'IA — HackByIFRI 2026",
    description:
      'Une plateforme académique tout-en-un : organisation intelligente, six modules d’IA générative et collaboration en temps réel.',
    challenge:
      "Les étudiants sont submergés par leurs cours, manquent d'accompagnement personnalisé et leurs outils de révision sont dispersés.",
    solution:
      "Trois piliers dans une seule app : calendrier et tâches intelligents, IA générative (résumés, quiz, podcasts, tuteur) et sessions d'étude collaboratives avec chat, tableau blanc et éditeur de code partagé.",
    impact:
      'Livrée pendant le hackathon HackByIFRI 2026 avec trois parcours complets : administration, chef de département et étudiant.',
    features: [
      '6 modules d’IA générative',
      'Tableau blanc & code collaboratif',
      'Calendrier et rappels intelligents',
      '3 rôles avec parcours dédiés',
    ],
    stack: ['React', 'Node.js', 'IA générative', 'WebSockets'],
    categories: ['ia', 'web', 'oss'],
    year: '2026',
    role: 'Développeur full-stack IA',
    status: 'Hackathon',
    link: 'https://team-d-excellence-hackbyifri-2026.vercel.app',
    repo: 'octavebahoun/TEAM_D-EXCELLENCE_HACKBYIFRI',
    image: '/images/work/academix.webp',
    accent: '#34d399',
  },
  {
    slug: 'waaloge',
    title: 'Waaloge',
    subtitle: 'Plateforme de logement étudiant',
    description:
      'Trouver un logement adapté à sa vie étudiante : recherche, comparaison et réservation de visites en ligne.',
    challenge:
      "La recherche de logement étudiant repose sur le bouche-à-oreille : informations incomplètes, visites inutiles et risques d'arnaque.",
    solution:
      'Une PWA qui centralise les logements disponibles avec recherche par quartier et budget, photos, comparaison et réservation de visites — et un assistant IA qui passe la main à un humain au moment de négocier.',
    impact:
      'Les étudiants trouvent un logement vérifié sans se déplacer, et les propriétaires gagnent en visibilité.',
    features: [
      'Recherche par quartier & budget',
      'Fiches avec photos et équipements',
      'Réservation de visites en ligne',
      'Assistant IA + relais humain',
    ],
    stack: ['React', 'PWA', 'PostgreSQL', 'Tailwind'],
    categories: ['web'],
    year: '2026',
    role: 'Projet client',
    status: 'En ligne',
    link: 'https://waaloge.excellenceteam.site/',
    article: '/blog/waaloge-retour-experience',
    image: '/images/work/waaloge.webp',
    accent: '#22c55e',
  },
  {
    slug: 'whisper-subtitle',
    title: 'Whisper Subtitle',
    subtitle: 'Sous-titres multilingues et doublage IA pour vidéos',
    description:
      "Un pipeline complet pour rendre n'importe quelle vidéo accessible : transcription Whisper, traduction vers 15 langues, puis doublage audio avec clonage vocal.",
    challenge:
      'Sous-titrer et doubler une vidéo dans une autre langue demande des heures de travail manuel — ou des outils payants à la minute.',
    solution:
      'Transcription Whisper (mode rapide via Groq), détection automatique de la langue, traduction avec cache intelligent et doublage généré par Qwen3-TTS. Interface Streamlit et CLI complète.',
    impact:
      'Une vidéo sous-titrée et doublée en quelques minutes, sans appels API redondants grâce au cache.',
    features: [
      '15 langues sources et cibles',
      'Cache des traductions',
      'Doublage avec clonage vocal',
      'Interface web + CLI',
    ],
    stack: ['Python', 'Whisper', 'Qwen3-TTS', 'Streamlit', 'Groq'],
    categories: ['ia', 'oss'],
    year: '2026',
    role: 'Solo',
    status: 'Open source',
    repo: 'octavebahoun/Whisper-subtitle',
    link: 'https://github.com/octavebahoun/Whisper-subtitle',
    image: '/images/work/whisper-subtitle.webp',
    accent: '#60a5fa',
  },
  {
    slug: 'studynotes',
    title: 'StudyNotes',
    subtitle: 'Carnet de notes intelligent avec IA intégrée',
    description:
      'Une PWA qui aide les étudiants à réviser : prise de notes, résumés automatiques et quiz générés par IA.',
    challenge:
      'Réviser, c’est souvent relire des notes mal organisées. Les étudiants manquent d’outils simples qui transforment le cours en support d’apprentissage.',
    solution:
      'Une PWA de prise de notes avec IA intégrée : résumés automatiques, quiz générés et révisions assistées, utilisable même hors ligne.',
    impact: 'Un support unique pour réviser, adopté par la communauté étudiante.',
    features: [
      'Notes + IA intégrée',
      'Résumés automatiques',
      'Quiz de révision',
      'Fonctionne hors ligne (PWA)',
    ],
    stack: ['React', 'PWA', 'IA'],
    categories: ['web', 'ia', 'oss'],
    year: '2025',
    role: 'Co-fondateur',
    status: 'En ligne',
    link: 'https://study.excellenceteam.site/',
    repo: 'octavebahoun/Study',
    image: '/images/work/study.webp',
    accent: '#818cf8',
    aliases: ['study'],
  },
  {
    slug: 'campusverite',
    title: 'CampusVérité',
    subtitle: 'La voix du campus, lisible et protégée',
    description:
      "Une plateforme de feedback étudiant 100 % anonyme : avis, votes, chat en direct et pétitions rédigées avec l'IA.",
    challenge:
      "Sur un campus, les étudiants hésitent à remonter les problèmes par peur d'être identifiés — et les remarques se perdent.",
    solution:
      "Avis anonymes classés par thème, votes réversibles, promotion automatique en pétition à 10 votes, chat temps réel (Socket.io) et rédaction de courriers officiels par IA via OpenRouter.",
    impact:
      'Les sujets prioritaires remontent seuls, avec un courrier prêt à imprimer pour la direction.',
    features: [
      'Anonymat total (pseudos générés)',
      'Pétition automatique à 10 votes',
      'Chat live & messages privés',
      'Pétitions rédigées par IA',
    ],
    stack: ['React', 'Socket.io', 'Node.js', 'OpenRouter'],
    categories: ['web', 'ia', 'oss'],
    year: '2026',
    role: 'Solo',
    status: 'En ligne',
    link: 'https://campusverite.vercel.app',
    repo: 'octavebahoun/campusverite',
    image: '/images/work/campusverite.webp',
    accent: '#14b8a6',
  },
  {
    slug: 'code-to-vector',
    title: 'Code-to-vector',
    subtitle: 'Scanner de projet → base vectorielle pour le RAG',
    description:
      'Un outil CLI qui scanne un projet, analyse les fichiers via un LLM et génère une sortie JSON/Chroma prête pour le RAG.',
    challenge:
      'Avant de faire du RAG sur une base de code, il faut l’indexer — un travail fastidieux à faire à la main.',
    solution:
      'Un CLI qui scanne un projet, analyse les fichiers via un LLM et génère une sortie JSON/Chroma prête à l’emploi.',
    impact: 'L’indexation d’un projet passe de plusieurs heures à quelques minutes.',
    features: [
      'Scan de projet en CLI',
      'Analyse par LLM',
      'Export JSON / Chroma',
      'Pensé pour le RAG',
    ],
    stack: ['JavaScript', 'LLM', 'RAG', 'CLI'],
    categories: ['ia', 'oss'],
    year: '2026',
    role: 'Solo',
    status: 'Open source',
    link: 'https://github.com/octavebahoun/Code-to-vector',
    repo: 'octavebahoun/Code-to-vector',
    image: '/images/work/code-to-vector.webp',
    accent: '#f472b6',
  },
  {
    slug: 'smartport',
    title: 'SmartPort Gateway',
    subtitle: 'Projet scolaire — contrôle des flux de fret, même hors ligne',
    description:
      "Projet scolaire : un prototype de validation des laissez-passer par QR code, de traçabilité du transit et de supervision des agents de contrôle, imaginé autour du port de Cotonou.",
    challenge:
      "À chaque barrière portuaire, une coupure réseau ne doit jamais bloquer le passage — mais chaque entrée doit rester vérifiée et traçable.",
    solution:
      "Un terminal de scan QR optimisé mobile avec cache local des dossiers autorisés et file de synchronisation, et un espace superviseur pour suivre l'activité et auditer chaque action.",
    impact:
      'Un prototype qui montre comment garder les contrôles actifs en mode dégradé, avec un historique complet pour arbitrer les litiges.',
    features: [
      'Scan QR mobile',
      'Mode hors ligne + synchronisation',
      'Journal d’audit complet',
      'Espace superviseur (MFA)',
    ],
    stack: ['React', 'Vite', 'PWA'],
    categories: ['web'],
    year: '2026',
    role: 'Projet scolaire',
    status: 'Prototype',
    link: 'https://smartport-seven.vercel.app',
    repo: 'octavebahoun/smartport',
    image: '/images/work/smartport.webp',
    accent: '#38bdf8',
  },
  {
    slug: 'cv-generator',
    title: 'CV Generator',
    subtitle: 'Génération de CV propulsée par Kimi K2',
    description:
      'Remplissez le formulaire, l’IA structure et rédige votre CV — export propre et prêt à envoyer.',
    challenge:
      'Rédiger un CV clair et adapté à chaque offre prend du temps, et les modèles classiques se ressemblent tous.',
    solution:
      'Un générateur propulsé par Kimi K2 : on remplit un formulaire, l’IA structure et rédige, le CV est prêt à envoyer.',
    impact: 'Un CV propre en quelques minutes, sans compétence en design.',
    features: [
      'Formulaire guidé',
      'Rédaction par IA (Kimi K2)',
      'Export prêt à envoyer',
      'Déployé en ligne',
    ],
    stack: ['HTML', 'Kimi K2', 'IA'],
    categories: ['ia', 'web', 'oss'],
    year: '2026',
    role: 'Solo',
    status: 'En ligne',
    link: 'https://cv-generator-nine-orcin.vercel.app',
    repo: 'octavebahoun/CV-generator',
    image: '/images/work/cvgen.webp',
    accent: '#c084fc',
  },
  {
    slug: 'vault',
    title: 'Vault',
    subtitle: "Bibliothèque d'images et coffre à secrets .env",
    description:
      "Centraliser les visuels de vos projets et garder vos variables d'environnement en sécurité, au même endroit.",
    challenge:
      'Les visuels et les secrets d’un projet (clés API, .env) finissent éparpillés entre plusieurs outils.',
    solution:
      'Une bibliothèque d’images et un coffre chiffré pour les variables d’environnement, au même endroit.',
    impact: 'Un seul point d’accès sécurisé pour les assets et les secrets d’un projet.',
    features: [
      "Bibliothèque d'images",
      'Coffre à secrets chiffré',
      'Recherche rapide',
      'Interface soignée',
    ],
    stack: ['React', 'TypeScript', 'Chiffrement'],
    categories: ['saas', 'web', 'oss'],
    year: '2026',
    role: 'Solo',
    status: 'En ligne',
    link: 'https://vaut-bibliotheque.vercel.app',
    repo: 'octavebahoun/Vaut-Bibliotheque',
    image: '/images/work/vault.webp',
    accent: '#a8a29e',
    aliases: ['vaut-bibliotheque'],
  },
  {
    slug: 'docscrap',
    title: 'DocScrap',
    subtitle: 'Transformer la doc officielle en cours structurés',
    description:
      'Du web scraping pédagogique : les documentations React, Node ou Laravel deviennent des cours Markdown traduits, servis par une API JSON.',
    challenge:
      "Les documentations officielles sont denses, en anglais et pensées comme des références — pas comme des cours.",
    solution:
      'Scraping, nettoyage et parsing des pages, conversion en JSON structuré par langage, concepts et chapitres, traduction EN → FR, puis affichage en Markdown.',
    impact: 'Une base exploitable pour apprendre, réviser ou générer des cours personnalisés.',
    features: [
      'Scraping de docs officielles',
      'JSON structuré par concepts',
      'Traduction EN → FR',
      'Cours en Markdown',
    ],
    stack: ['Scraping', 'JSON', 'Markdown'],
    categories: ['web', 'oss'],
    year: '2026',
    role: 'Solo',
    status: 'En ligne',
    link: 'https://docscrap.vercel.app',
    repo: 'octavebahoun/docscrap',
    image: '/images/work/docscrap.webp',
    accent: '#3b82f6',
  },
  {
    slug: 'mecano',
    title: 'Mecano',
    subtitle: 'Le garage qui vient à vous',
    description:
      'Site vitrine et prise de rendez-vous pour un service de mécanique mobile — rapide, clair et responsive.',
    challenge:
      'Un service de mécanique mobile sans présence en ligne claire : difficile de rassurer et de prendre rendez-vous.',
    solution: 'Un site vitrine rapide avec prise de rendez-vous, pensé mobile d’abord.',
    impact: 'Une image professionnelle et des demandes de rendez-vous centralisées.',
    features: [
      'Site vitrine responsive',
      'Prise de rendez-vous',
      'Chargement rapide',
      'Design soigné',
    ],
    stack: ['React', 'Tailwind', 'Vite'],
    categories: ['web'],
    year: '2025',
    role: 'Solo',
    status: 'En ligne',
    link: 'https://webgarage.excellenceteam.site/',
    image: '/images/work/mecano.webp',
    accent: '#0ea5e9',
    aliases: ['webgarage'],
  },
]

// Ce sur quoi je travaille en ce moment (section « En ce moment »)
export const now = [
  {
    title: 'Souk.dev',
    text: 'La marketplace des devs africains : publier une appli, la déployer en un clic, trouver des missions.',
    badge: 'CADEV 2026',
    role: 'Stack & architecture',
    deadline: '2026-10-25',
    deadlineLabel: 'Soumission',
    href: 'https://github.com/octavebahoun/Souk.dev',
  },
  {
    title: 'FindSpeed',
    text: 'Trouver un produit dans un marché — et la cabine qui le vend — en quelques secondes. V1 : marché de PK3.',
    badge: 'PWA',
    role: 'Directeur technique',
    deadline: '2026-10-31',
    deadlineLabel: 'Mise en ligne',
    href: 'https://github.com/octavebahoun/findspeed',
  },
  {
    title: 'Gentube',
    text: 'Le studio vidéo IA continue : nouveaux mouvements de caméra, accessibilité, et toujours plus de tests.',
    badge: 'SaaS',
    role: 'Architecture & full-stack',
    href: 'https://gentube-nine.vercel.app',
  },
]
