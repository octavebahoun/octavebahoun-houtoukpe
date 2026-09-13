export const fallbackPosts = [
  {
    slug: 'video-remix-studio',
    title: 'Video Remix Studio : la table de montage qui retrouve vos plans',
    excerpt:
      "Tapez « edit sombre avec flashs » et obtenez un MP4 calé sur vos beats en 30 secondes — sans qu'aucune image ne soit générée. Retour sur 10 sprints d'architecture multi-agent.",
    category: 'IA & Vidéo',
    tags: ['IA', 'Multi-agent', 'LangGraph', 'Open Source'],
    date: '2026-08-26',
    author: 'Oktav Bahoun',
    image: '/images/blog/video-remix-studio.jpg',
    featured: true,
    content: `## L'idée

2 To de rushes, d'animes et de clips — et 40 minutes pour retrouver les 0,8 seconde qui tombent juste sur le drop. C'est le quotidien de n'importe quel monteur.

Le génératif promet d'inventer, mais invente de travers, coûte une fortune en GPU et pose des questions de droits à chaque frame. Video Remix Studio fait l'inverse : il rend votre disque dur **interrogeable**.

Pas une image n'est inventée. Le système cherche, note chaque plan, puis assemble en FFmpeg. Résultat : toujours vrai, toujours à vous, rendu en secondes — pas en minutes.

## Deux pipelines séparés

La séparation est volontaire : le lourd une fois, le léger à la demande. C'est ce qui le rend crédible sur un laptop.

**Offline — le muscle.** Indexation locale : découpe PySceneDetect (seuil 27), analyse audio avec Librosa (BPM, beats, drops, énergie, sections), couleurs et mouvement avec OpenCV (HSV, Optical Flow), vision séquentielle YOLO11 puis Florence-2, embeddings SigLIP 768-d stockés dans LanceDB. 0,5 à 2 minutes par vidéo, et **incrémental** : on ne retraite jamais deux fois.

**Online — le cerveau.** À la demande : Intent → Retriever (50 candidats) → Analyzer (15) → Planner (timeline) → Editor (FFmpeg) → Validator. 10 à 40 secondes par montage, 0 $ en repli local, environ 0,02 $ en full cloud.

Le muscle ne rencontre le cerveau qu'en un point : LanceDB. Tout le reste est remplaçable.

## Six agents, un état partagé

Chaque agent est un nœud LangGraph avec une responsabilité unique, et l'état StudioState circule et s'enrichit.

- **Intent** (Llama 70B, repli regex) : « edit sombre avec flashs » devient un objet structuré — mood, personnage, couleur, effets, BPM cible, durée.
- **Retriever** (Llama 8B, repli vecteur) : recherche hybride LanceDB (embedding SigLIP + filtres objets/couleur), 50 candidats.
- **Analyzer** (Llama 70B, scoring pondéré) : note style, mouvement, couleur, rareté — et garde les 15 meilleurs.
- **Planner** (Claude 3.5, repli déterministe) : le cœur. Il ordonne pour raconter, le moteur cale sur les beats (calme → 1,8 s, drop → 0,5 s), gère anti-répétition et effets.
- **Editor** (DeepSeek, template) : une seule commande filter_complex — trim, crop 9:16, vitesse, fade/flash/zoom, concat, mix audio → MP4.
- **Validator** (Llama 8B, métadonnées) : ffprobe → durée, fluidité, sync → score sur 100. Sous 70, retour au Planner (max 3 tentatives).

Seul le Planner touche au temps ; les autres filtrent.

## Le calage sur le BPM

Librosa fournit une carte des battements, de leur force et des drops. Le Planner pose chaque coupe sur le beat le plus proche, avec un rythme adaptatif : plans longs sur les passages calmes, coupes rapides sur les drops. La validation vérifie la synchronisation réelle du montage final.

> À lire aussi : [Scholaris, ma veille tech automatisée avec n8n](/blog/scholaris-veille-n8n)

## Ce que ça donne

Trois montages, même bibliothèque, trois rythmes — vertical 9:16, 30 fps. Face au génératif, à périmètre égal :

- **Coût** : ~0 $ local contre 0,20 à 2 $ de GPU.
- **Temps** : 10 à 40 s contre 2 à 10 min.
- **Fidélité** : la source exacte, 0 pixel généré.
- **Droits** : vos fichiers, pas de zone grise.

## Sur un laptop

Un seul modèle en mémoire à la fois (SequentialModelLoader), FFmpeg limité à 2 découpes en parallèle, LLMs déportés : 0 Mo de VRAM. Trois modes selon la machine :

- \`--no-vision\` : 100 % offline, aucun téléchargement.
- \`--no-caption\` : YOLO + SigLIP sans Florence — 90 % de la qualité pour 30 % de la RAM.
- Complet : YOLO + Florence + SigLIP, si 16 Go ou un GPU.

## Limites

La V1 ne génère rien : si le plan n'existe pas, il ne l'invente pas. Les effets restent basiques (zoom, flash, fade), la validation est heuristique, et la recherche offline se limite à la couleur dominante.

La suite envisagée : CLIP esthétique, Whisper pour les paroles, face clustering, xfade + LUT, et une API REST.

## Et maintenant ?

Faute de matériel pour entraîner et tester à grande échelle, j'ai mis le projet en pause — mais tout le code est conservé sur GitHub, avec ~40 tests et une CLI complète. Si l'idée vous parle, forkez, contribuez : c'est ouvert.`,
  },
  {
    slug: 'scholaris-veille-n8n',
    title: 'Scholaris : ma veille tech automatisée avec des workflows n8n',
    excerpt:
      "RSS, newsletters, GitHub : comment mes workflows n8n collectent, résument et trient ma veille pour ne garder que l'essentiel.",
    category: 'Automatisation',
    tags: ['n8n', 'Automatisation', 'Veille', 'LLM'],
    date: '2026-07-12',
    author: 'Oktav Bahoun',
    image: '/images/blog/scholaris.jpg',
    content: `## Le problème

Suivre l'actualité IA, c'est un métier à plein temps. Entre les blogs, les dépôts GitHub et les newsletters, je passais des heures à trier — pour ne retenir qu'une poignée d'articles.

## Scholaris, ma solution

Scholaris est un ensemble de workflows n8n que j'ai construits pour automatiser ma veille :

- **Collecte** : flux RSS, newsletters et sorties GitHub arrivent dans un même pipeline.
- **Analyse** : un nœud LLM résume chaque contenu et lui attribue un score de pertinence.
- **Tri** : les contenus sont classés par thème (IA, agents, web) et dédupliqués.
- **Diffusion** : chaque matin, je reçois une note claire avec les liens essentiels.

## Pourquoi n8n ?

Parce que je vois ce qui se passe. Chaque nœud est inspectable, chaque étape peut être rejouée, et j'ajoute une source en deux minutes. Pour une veille qui change tout le temps, c'est exactement ce qu'il faut.

## Le résultat

Ma veille est passée de deux heures par jour à dix minutes de lecture. Et surtout : je ne rate plus les sorties importantes.`,
  },
  {
    slug: 'waaloge-retour-experience',
    title:
      'Waaloge : une plateforme de logement étudiant livrée pour un client',
    excerpt:
      "Mission client : concevoir et livrer une plateforme qui centralise les logements étudiants à Lokossa — recherche, visites et réservation.",
    category: 'Web & Produit',
    tags: ['Web', 'Produit', 'Client'],
    date: '2026-06-03',
    author: 'Oktav Bahoun',
    image: '/images/blog/waaloge.jpg',
    content: `## La mission

Waaloge m'a été confiée par un client qui voulait simplifier la recherche de logement étudiant à Lokossa. Objectif : remplacer le bouche-à-oreille par une plateforme claire, où chaque étudiant trouve un logement fiable sans visites inutiles.

## Ce que j'ai livré

- Recherche par quartier, budget et type de logement.
- Fiches détaillées avec photos et équipements.
- Comparaison et réservation de visites en ligne.
- Interface responsive, pensée mobile d'abord.

## Les leçons du projet

- Cadrer le besoin avec le client avant de coder : mes premières maquettes étaient à côté de la plaque.
- La performance mobile n'est pas une option quand la majorité des visites vient du téléphone.
- Livrer petit mais souvent vaut mieux qu'un grand lancement.

Un projet client formateur, qui m'a appris autant sur le produit que sur la relation client.`,
  },
]
