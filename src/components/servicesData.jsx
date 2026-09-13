import {
  DataIllustration,
  DevopsIllustration,
  LlmIllustration,
  NeuralIllustration,
  RagIllustration,
} from './illustrations'
import NodeGraph from './NodeGraph'

export const services = [
  {
    title: 'Ingénierie IA',
    tags: ['Systèmes IA', 'Architecture RAG', 'LLM', 'Prototypage'],
    description:
      "Conception de systèmes IA de bout en bout : de l'idée au prototype fonctionnel, en passant par le choix des modèles et l'évaluation des résultats.",
    visual: <NeuralIllustration />,
  },
  {
    title: 'Agents & Automatisation',
    tags: [
      'Architecture multi-agent',
      'Workflows n8n',
      'Automatisation métier',
      'Intégration LLM',
    ],
    description:
      'Des agents qui travaillent pour vous : automatisation des tâches répétitives, orchestration multi-agents et connexion de vos outils dans des workflows sur mesure.',
    visual: <NodeGraph />,
  },
  {
    title: 'Développement Web',
    tags: ['React', 'Node.js', 'Tailwind', 'PWA'],
    description:
      "Des interfaces rapides et soignées, du site vitrine à l'application web complète, pensées pour durer et faciles à faire évoluer.",
    visual: (
      <img
        src="/images/services/dev-web.jpg"
        alt="Waaloge — plateforme de logement étudiant"
        className="aspect-[16/7] w-full object-cover object-top"
      />
    ),
  },
  {
    title: 'Applications SaaS',
    tags: ['Multi-tenant', 'Authentification', 'Paiements', 'Dashboards'],
    description:
      "Du concept au produit : authentification, abonnements, tableaux de bord et déploiement — une base solide pour lancer votre SaaS.",
    visual: (
      <img
        src="/images/services/saas.jpg"
        alt="Contravo — bureau numérique pour freelances"
        className="aspect-[16/7] w-full object-cover object-top"
      />
    ),
  },
  {
    title: 'Intégration LLM & APIs',
    tags: ['OpenAI', 'Claude', 'APIs REST', 'Streaming'],
    description:
      'Branchement de modèles de langage dans vos produits : prompts, streaming, gestion des coûts et des erreurs, APIs propres et documentées.',
    visual: <LlmIllustration />,
  },
  {
    title: 'RAG & Bases vectorielles',
    tags: ['Chroma', 'Embeddings', 'Recherche sémantique', 'Pipelines'],
    description:
      'Vos documents deviennent une base de connaissance interrogeable : ingestion, découpage, embeddings et recherche sémantique fiable.',
    visual: <RagIllustration />,
  },
  {
    title: 'Data Science & Fine-tuning',
    tags: ['Datasets', 'Fine-tuning', 'Évaluation', 'Visualisation'],
    description:
      "Préparation de jeux de données, entraînement et évaluation de modèles : des décisions guidées par les données, pas par l'intuition.",
    visual: <DataIllustration />,
  },
  {
    title: 'DevOps & Déploiement',
    tags: ['AWS', 'Cloudflare', 'CI/CD', 'Monitoring'],
    description:
      'Mise en production sans stress : conteneurs, pipelines CI/CD, CDN et monitoring sur AWS et Cloudflare.',
    visual: <DevopsIllustration />,
  },
]
