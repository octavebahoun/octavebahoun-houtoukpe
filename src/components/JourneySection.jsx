import { Sparkle } from './icons'

const journey = [
  {
    year: '2023',
    title: 'INSTI Lokossa',
    text: "Premiers pas en développement web et découverte de Python et de l'ingénierie IA, au Bénin.",
  },
  {
    year: '2024',
    title: 'Excellence Team',
    text: 'Co-fondateur : conception de produits web pour la communauté — Waaloge, Contravo, StudyNotes.',
  },
  {
    year: '2025',
    title: 'Digital Innovation Club',
    text: "Responsable de l'atelier Data Science & Ingénierie IA : ateliers, hackathons et projets d'équipe.",
  },
  {
    year: '2026',
    title: 'CY Tech — Pau',
    text: "ING1 Informatique en France, cap sur l'ingénierie IA et l'open source.",
  },
]

export default function JourneySection() {
  return (
    <section className="bg-soft py-20">
      <div className="mx-auto max-w-site px-6">
        <p className="flex items-center justify-center gap-3 text-sm font-semibold text-ink">
          <span className="h-px w-8 bg-primary" />
          Mon Parcours
        </p>

        <h2 className="mt-4 text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          Mon chemin{' '}
          <span className="font-medium text-primary italic">
            jusqu&apos;ici
          </span>
          <Sparkle className="ml-2 inline-block size-4 -translate-y-3 text-ink" />
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((item, index) => (
            <div
              key={item.year}
              className="relative overflow-hidden rounded-card bg-white p-7"
            >
              <span className="absolute -top-3 right-3 text-7xl font-extrabold text-ink/5">
                0{index + 1}
              </span>

              <span className="text-sm font-bold text-primary">
                {item.year}
              </span>
              <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
