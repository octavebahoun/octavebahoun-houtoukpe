import {
  siClaude,
  siCloudflare,
  siDocker,
  siDrizzle,
  siFastapi,
  siFfmpeg,
  siGit,
  siJavascript,
  siLangchain,
  siLanggraph,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siRaspberrypi,
  siReact,
  siRedis,
  siScikitlearn,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
} from 'simple-icons'

export const stack = [
  {
    name: 'IA & data',
    note: 'Agents, RAG, évaluation',
    tools: [
      { name: 'Python', icon: siPython },
      { name: 'LangGraph', icon: siLanggraph },
      { name: 'LangChain', icon: siLangchain },
      { name: 'Claude', icon: siClaude },
      { name: 'scikit-learn', icon: siScikitlearn },
      { name: 'n8n', icon: siN8n },
      { name: 'FFmpeg', icon: siFfmpeg },
      { name: 'Raspberry Pi', icon: siRaspberrypi },
    ],
  },
  {
    name: 'Produit & front',
    note: 'Interfaces rapides et soignées',
    tools: [
      { name: 'React', icon: siReact },
      { name: 'Next.js', icon: siNextdotjs },
      { name: 'TypeScript', icon: siTypescript },
      { name: 'JavaScript', icon: siJavascript },
      { name: 'Tailwind CSS', icon: siTailwindcss },
      { name: 'Vite', icon: siVite },
      { name: 'Vercel', icon: siVercel },
      { name: 'Git', icon: siGit },
    ],
  },
  {
    name: 'Back-end & infra',
    note: 'APIs, données, déploiement',
    tools: [
      { name: 'Node.js', icon: siNodedotjs },
      { name: 'FastAPI', icon: siFastapi },
      { name: 'PostgreSQL', icon: siPostgresql },
      { name: 'Drizzle', icon: siDrizzle },
      { name: 'Redis', icon: siRedis },
      { name: 'Supabase', icon: siSupabase },
      { name: 'Docker', icon: siDocker },
      { name: 'Cloudflare', icon: siCloudflare },
    ],
  },
]

// Ligne de logos défilante (accueil)
export const stackMarquee = stack.flatMap((group) => group.tools)
