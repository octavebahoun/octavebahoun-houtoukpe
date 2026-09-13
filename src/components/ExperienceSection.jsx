import { ClipboardCheck } from './icons'
import { Reveal } from './Reveal'

const education = [
  {
    title: 'CY Tech — Pau',
    subtitle: 'ING1 Informatique',
    years: "2026 – aujourd'hui",
  },
  {
    title: 'INSTI Lokossa',
    subtitle: 'Informatique',
    years: '2023 – 2025',
  },
]

const work = [
  {
    title: 'Excellence Team',
    subtitle: 'Co-fondateur — produits web & IA',
    years: "2024 – aujourd'hui",
  },
  {
    title: 'Digital Innovation Club',
    subtitle: 'Responsable atelier Data Science & IA',
    years: "2025 – aujourd'hui",
  },
  {
    title: 'Freelance (Malt)',
    subtitle: 'Missions web & IA',
    years: "2024 – aujourd'hui",
  },
]

function Column({ title, Icon, items }) {
  return (
    <div className="rounded-card border-l-4 border-primary bg-white p-8">
      <div className="flex items-center gap-4">
        <span className="flex size-12 items-center justify-center rounded-full bg-primary text-white">
          <Icon className="size-6" />
        </span>
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>

      <div className="mt-6 border-t border-line pt-2">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex flex-wrap items-center justify-between gap-3 py-4"
          >
            <div>
              <p className="text-lg font-bold text-ink">{item.title}</p>
              <p className="text-sm">{item.subtitle}</p>
            </div>
            <span className="rounded-full bg-ink px-4 py-1.5 text-sm font-semibold text-white">
              {item.years}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ExperienceSection() {
  return (
    <section className="mx-auto max-w-site px-6 py-20">
      <Reveal>
        <p className="flex items-center justify-center gap-3 text-sm font-semibold text-ink">
          <span className="h-px w-8 bg-primary" />
          Formation & Expérience
        </p>

        <h2 className="mt-4 text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          Mon{' '}
          <span className="font-medium text-primary italic">
            parcours scolaire
          </span>{' '}
          & professionnel
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <Reveal delay={0.05}>
          <Column title="Formation" Icon={GraduationIcon} items={education} />
        </Reveal>
        <Reveal delay={0.15}>
          <Column title="Expérience" Icon={ClipboardCheck} items={work} />
        </Reveal>
      </div>
    </section>
  )
}

function GraduationIcon({ className = 'size-6' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`fill-none stroke-current stroke-2 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M22 10 12 5 2 10l10 5 10-5z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" strokeLinecap="round" />
    </svg>
  )
}
