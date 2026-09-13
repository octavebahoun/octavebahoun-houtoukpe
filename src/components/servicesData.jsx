import {
  DataIllustration,
  DevWebIllustration,
  DevopsIllustration,
  LlmIllustration,
  NeuralIllustration,
  RagIllustration,
  SaasIllustration,
} from './illustrations'
import NodeGraph from './NodeGraph'

const iconProps = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const services = [
  {
    title: 'Ingénierie IA',
    tags: ['Systèmes IA', 'Architecture RAG', 'LLM', 'Prototypage'],
    description:
      "Conception de systèmes IA de bout en bout : de l'idée au prototype fonctionnel, en passant par le choix des modèles et l'évaluation des résultats.",
    icon: (
      <svg {...iconProps}>
        <circle cx="5" cy="7" r="2" />
        <circle cx="5" cy="17" r="2" />
        <circle cx="12" cy="12" r="2.4" />
        <circle cx="19" cy="7" r="2" />
        <circle cx="19" cy="17" r="2" />
        <path d="M6.8 8.1 10 11M6.8 15.9 10 13M14 11l3.2-2.9M14 13l3.2 2.9" />
      </svg>
    ),
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
    icon: (
      <svg {...iconProps}>
        <circle cx="6" cy="6" r="2.2" />
        <circle cx="18" cy="6" r="2.2" />
        <circle cx="12" cy="18" r="2.2" />
        <path d="M8.2 6h7.6M6.8 8 11 16M17.2 8 13 16" />
      </svg>
    ),
    visual: <NodeGraph />,
  },
  {
    title: 'Développement Web',
    tags: ['React', 'Node.js', 'Tailwind', 'PWA'],
    description:
      "Des interfaces rapides et soignées, du site vitrine à l'application web complète, pensées pour durer et faciles à faire évoluer.",
    icon: (
      <svg {...iconProps}>
        <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />
      </svg>
    ),
    visual: <DevWebIllustration />,
  },
  {
    title: 'Applications SaaS',
    tags: ['Multi-tenant', 'Authentification', 'Paiements', 'Dashboards'],
    description:
      "Du concept au produit : authentification, abonnements, tableaux de bord et déploiement — une base solide pour lancer votre SaaS.",
    icon: (
      <svg {...iconProps}>
        <path d="M12 4 21 8l-9 4-9-4 9-4zM3 12l9 4 9-4M3 16l9 4 9-4" />
      </svg>
    ),
    visual: <SaasIllustration />,
  },
  {
    title: 'Intégration LLM & APIs',
    tags: ['OpenAI', 'Claude', 'APIs REST', 'Streaming'],
    description:
      'Branchement de modèles de langage dans vos produits : prompts, streaming, gestion des coûts et des erreurs, APIs propres et documentées.',
    icon: (
      <svg {...iconProps}>
        <path d="M10 14a4 4 0 0 0 5.66 0l2.83-2.83a4 4 0 0 0-5.66-5.66L11.5 6.9" />
        <path d="M14 10a4 4 0 0 0-5.66 0L5.5 12.83a4 4 0 0 0 5.66 5.66L12.5 17.1" />
      </svg>
    ),
    visual: <LlmIllustration />,
  },
  {
    title: 'RAG & Bases vectorielles',
    tags: ['Chroma', 'Embeddings', 'Recherche sémantique', 'Pipelines'],
    description:
      'Vos documents deviennent une base de connaissance interrogeable : ingestion, découpage, embeddings et recherche sémantique fiable.',
    icon: (
      <svg {...iconProps}>
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
      </svg>
    ),
    visual: <RagIllustration />,
  },
  {
    title: 'Data Science & Fine-tuning',
    tags: ['Datasets', 'Fine-tuning', 'Évaluation', 'Visualisation'],
    description:
      "Préparation de jeux de données, entraînement et évaluation de modèles : des décisions guidées par les données, pas par l'intuition.",
    icon: (
      <svg {...iconProps}>
        <path d="M3 21h18M6 21V11M12 21V6M18 21v-9" />
      </svg>
    ),
    visual: <DataIllustration />,
  },
  {
    title: 'DevOps & Déploiement',
    tags: ['AWS', 'Cloudflare', 'CI/CD', 'Monitoring'],
    description:
      'Mise en production sans stress : conteneurs, pipelines CI/CD, CDN et monitoring sur AWS et Cloudflare.',
    icon: (
      <svg {...iconProps}>
        <path d="M17 18H7a4 4 0 0 1-.6-7.95 5 5 0 0 1 9.7-1.2A3.5 3.5 0 0 1 17 18z" />
        <path d="M12 15V9m0 0-2 2m2-2 2 2" />
      </svg>
    ),
    visual: <DevopsIllustration />,
  },
]
