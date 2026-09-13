import { useState } from 'react'

const faqs = [
  {
    question: 'Es-tu disponible pour une mission freelance ?',
    answer:
      'Oui. Je prends des missions freelance (via Malt ou en direct), en parallèle de mes études. Réponse sous 24 h, devis clair, et on démarre quand tout est validé.',
  },
  {
    question: 'Sur quels types de projets travailles-tu ?',
    answer:
      "Surtout des produits web et des systèmes IA : applications SaaS, automatisations (n8n), intégration de LLM, RAG et agents. J'aime les projets concrets, avec un vrai usage derrière.",
  },
  {
    question: 'Avec quelles technologies travailles-tu ?',
    answer:
      "React, Node.js, Python, LangGraph, n8n, LanceDB ou Chroma, FFmpeg... et l'IA quand elle apporte vraiment quelque chose au produit.",
  },
  {
    question: 'Comment se passe un projet avec toi ?',
    answer:
      "Cadrage → prototype → itérations → mise en production. Tu vois l'avancement régulièrement, et chaque étape est validée avant de passer à la suivante.",
  },
  {
    question: 'Peux-tu travailler avec des clients hors du Bénin ?',
    answer:
      'Oui, je travaille à distance avec des clients partout — je suis actuellement entre Cotonou (Bénin) et Pau (France).',
  },
  {
    question: 'Puis-je voir le code de tes projets ?',
    answer:
      'Une bonne partie est open source sur GitHub (github.com/octavebahoun). Pour les projets clients, je partage le code uniquement avec leur accord.',
  },
]

export default function FaqAccordion({ limit }) {
  const [openIndex, setOpenIndex] = useState(1)
  const visible = limit ? faqs.slice(0, limit) : faqs

  return (
    <div className="flex flex-col gap-5">
      {visible.map((faq, index) => {
        const open = index === openIndex

        return (
          <div
            key={faq.question}
            className={`overflow-hidden rounded-card transition-colors ${
              open ? 'bg-primary text-white' : 'bg-card'
            }`}
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? -1 : index)}
              className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left"
            >
              <span className="text-lg font-bold">{faq.question}</span>
              <span
                className={`text-2xl leading-none font-bold ${
                  open ? 'text-white' : 'text-ink'
                }`}
              >
                {open ? '−' : '+'}
              </span>
            </button>

            {open && <p className="px-7 pb-7 text-white/80">{faq.answer}</p>}
          </div>
        )
      })}
    </div>
  )
}
