export const fallbackProjects = [
  {
    id: 'contravo',
    title: 'Contravo',
    subtitle: 'Ton bureau numérique : devis, contrats, clients',
    description:
      'Une plateforme tout-en-un pour freelances et artisans : devis, factures, relances et suivi clients, avec Mobile Money intégré.',
    challenge:
      "Les freelances et artisans perdent un temps fou à rédiger devis et factures, souvent sur téléphone, avec des outils pensés pour de grandes entreprises.",
    solution:
      "Contravo centralise devis, factures, relances et suivi clients dans une interface simple, avec Mobile Money intégré pour les paiements locaux.",
    impact:
      "Des devis générés en quelques minutes au lieu d'une heure, et une vision claire de l'activité pour ses utilisateurs.",
    features: [
      'Devis & factures en quelques clics',
      'Relances automatiques',
      'Paiement Mobile Money',
      'Suivi clients centralisé',
    ],
    stack: ['React', 'Node.js', 'MongoDB'],
    year: '2025',
    role: 'Co-fondateur',
    link: 'https://contravo.excellenceteam.site/',
    image: '/images/projects/contravo.jpg',
  },
  {
    id: 'waaloge',
    title: 'Waaloge',
    subtitle: 'Plateforme de logement étudiant à Lokossa',
    description:
      'Trouver un logement adapté à sa vie étudiante : recherche, comparaison et réservation de visites en ligne.',
    challenge:
      "À Lokossa, la recherche de logement étudiant repose sur le bouche-à-oreille : informations incomplètes, visites inutiles et risques d'arnaque.",
    solution:
      'Une plateforme qui centralise les logements disponibles avec recherche par quartier et budget, photos, comparaison et réservation de visites en ligne.',
    impact:
      'Les étudiants trouvent un logement vérifié sans se déplacer, et les propriétaires gagnent en visibilité.',
    features: [
      'Recherche par quartier & budget',
      'Fiches avec photos et équipements',
      'Réservation de visites en ligne',
      'Interface mobile d’abord',
    ],
    stack: ['React', 'Node.js', 'Tailwind'],
    year: '2025',
    role: 'Projet client',
    link: 'https://waaloge.excellenceteam.site/',
    image: '/images/projects/waaloge.jpg',
  },
  {
    id: 'jarvis',
    title: 'Jarvis',
    subtitle: 'Assistant IA agentique personnel',
    description:
      "Un assistant qui exécute des tâches pour moi : veille, code, automatisations — construit autour d'agents et d'outils.",
    challenge:
      'Répéter les mêmes tâches (recherche, code, veille) chaque jour finit par coûter des heures — et les assistants classiques restent passifs.',
    solution:
      'Un assistant agentique en Python : des agents avec des outils, une mémoire et une orchestration LangGraph, capables d’exécuter des tâches concrètes.',
    impact:
      'Des tâches automatisées de bout en bout et un socle réutilisable pour d’autres projets IA.',
    features: [
      'Agents + outils (LangGraph)',
      'Mémoire persistante',
      'Exécution de tâches concrètes',
      'Open source sur GitHub',
    ],
    stack: ['Python', 'LLM', 'Agents'],
    year: '2025',
    role: 'Solo',
    link: 'https://jarvis-seven-beta.vercel.app',
    repo: 'octavebahoun/Jarvis',
    image: '/images/projects/jarvis.jpg',
  },
  {
    id: 'studynotes',
    title: 'StudyNotes',
    subtitle: 'Carnet de notes intelligent avec IA intégrée',
    description:
      'Une PWA qui aide les étudiants à réviser : prise de notes, résumés automatiques et quiz générés par IA.',
    challenge:
      'Réviser, c’est souvent relire des notes mal organisées. Les étudiants manquent d’outils simples qui transforment le cours en support d’apprentissage.',
    solution:
      'Une PWA de prise de notes avec IA intégrée : résumés automatiques, quiz générés et révisions assistées, utilisable même hors ligne.',
    impact:
      'Un support unique pour réviser, adopté par la communauté étudiante — 3 étoiles sur GitHub.',
    features: [
      'Notes + IA intégrée',
      'Résumés automatiques',
      'Quiz de révision',
      'Fonctionne hors ligne (PWA)',
    ],
    stack: ['React', 'PWA', 'IA'],
    year: '2025',
    role: 'Co-fondateur',
    link: 'https://study.excellenceteam.site/',
    repo: 'octavebahoun/Study',
    image: '/images/projects/studynotes.jpg',
  },
  {
    id: 'code-to-vector',
    title: 'Code-to-vector',
    subtitle: 'Scanner de projet → base vectorielle pour le RAG',
    description:
      'Un outil CLI qui scanne un projet, analyse les fichiers via un LLM et génère une sortie JSON/Chroma prête pour le RAG.',
    challenge:
      'Avant de faire du RAG sur une base de code, il faut l’indexer — un travail fastidieux à faire à la main.',
    solution:
      'Un CLI qui scanne un projet, analyse les fichiers via un LLM et génère une sortie JSON/Chroma prête à l’emploi.',
    impact:
      'L’indexation d’un projet passe de plusieurs heures à quelques minutes.',
    features: [
      'Scan de projet en CLI',
      'Analyse par LLM',
      'Export JSON / Chroma',
      'Pensé pour le RAG',
    ],
    stack: ['JavaScript', 'LLM', 'RAG', 'CLI'],
    year: '2025',
    role: 'Solo',
    link: 'https://github.com/octavebahoun/Code-to-vector',
    repo: 'octavebahoun/Code-to-vector',
    image: '/images/projects/code-to-vector.jpg',
  },
  {
    id: 'cv-generator',
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
    year: '2025',
    role: 'Solo',
    link: 'https://cv-generator-nine-orcin.vercel.app',
    repo: 'octavebahoun/CV-generator',
    image: '/images/projects/cv-generator.jpg',
  },
  {
    id: 'vault',
    title: 'Vault',
    subtitle: "Bibliothèque d'images et coffre à secrets .env",
    description:
      "Centraliser les visuels de vos projets et garder vos variables d'environnement en sécurité, au même endroit.",
    challenge:
      'Les visuels et les secrets d’un projet (clés API, .env) finissent éparpillés entre plusieurs outils.',
    solution:
      'Une bibliothèque d’images et un coffre chiffré pour les variables d’environnement, au même endroit.',
    impact:
      'Un seul point d’accès sécurisé pour les assets et les secrets d’un projet.',
    features: [
      "Bibliothèque d'images",
      'Coffre à secrets chiffré',
      'Recherche rapide',
      'Interface sombre soignée',
    ],
    stack: ['React', 'TypeScript', 'Chiffrement'],
    year: '2025',
    role: 'Solo',
    link: 'https://vaut-bibliotheque.vercel.app',
    repo: 'octavebahoun/Vaut-Bibliotheque',
    image: '/images/projects/vault.jpg',
  },
  {
    id: 'mecano',
    title: 'Mecano',
    subtitle: 'Le garage qui vient à vous',
    description:
      'Site vitrine et prise de rendez-vous pour un service de mécanique mobile — rapide, clair et responsive.',
    challenge:
      'Un service de mécanique mobile sans présence en ligne claire : difficile de rassurer et de prendre rendez-vous.',
    solution:
      'Un site vitrine rapide avec prise de rendez-vous, pensé mobile d’abord.',
    impact:
      'Une image professionnelle et des demandes de rendez-vous centralisées.',
    features: [
      'Site vitrine responsive',
      'Prise de rendez-vous',
      'Chargement rapide',
      'Design soigné',
    ],
    stack: ['React', 'Tailwind', 'Vite'],
    year: '2025',
    role: 'Solo',
    link: 'https://webgarage.excellenceteam.site/',
    image: '/images/projects/mecano.jpg',
  },
]
