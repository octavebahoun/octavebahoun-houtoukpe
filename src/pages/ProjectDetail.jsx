import { Link, useParams } from 'react-router-dom'
import BookingBand from '../components/BookingBand'
import ContactSection from '../components/ContactSection'
import FaqSection from '../components/FaqSection'
import HeroBlob from '../components/HeroBlob'
import { ArrowUpRight, Sparkle } from '../components/icons'
import Marquee from '../components/Marquee'
import { useProjects } from '../hooks/useProjects'

function Section({ title, children }) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  )
}

function OtherCard({ project }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="group rounded-card bg-card p-5 transition-colors hover:bg-soft"
    >
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="aspect-[4/3] w-full rounded-2xl object-cover object-top"
      />
      <h3 className="mt-5 text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
        {project.title}
      </h3>
      <p className="mt-2 text-sm">{project.subtitle}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
        Voir le détail
        <ArrowUpRight className="size-4" />
      </span>
    </Link>
  )
}

export default function ProjectDetail() {
  const { id } = useParams()
  const projects = useProjects()
  const project = projects.find((item) => item.id === id)

  if (!project) {
    return (
      <section className="mx-auto max-w-site px-6 py-24 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Projet introuvable
        </h1>
        <p className="mx-auto mt-4 max-w-md">
          Ce projet n&apos;existe pas ou a été déplacé.
        </p>
        <Link
          to="/projects"
          className="mt-8 inline-block rounded-full bg-primary px-8 py-3.5 font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          Retour aux projets
        </Link>
      </section>
    )
  }

  const info = [
    { label: 'Stack', value: project.stack.join(' · ') },
    { label: 'Année', value: project.year },
    { label: 'Rôle', value: project.role },
    {
      label: 'GitHub',
      value:
        project.stars > 0
          ? `★ ${project.stars} ${project.stars > 1 ? 'étoiles' : 'étoile'}`
          : '',
    },
  ].filter((row) => row.value)

  const others = projects.filter((item) => item.id !== project.id).slice(0, 3)

  return (
    <>
      <section className="mx-auto max-w-site px-6 pt-16">
        <img
          src={project.image}
          alt={project.title}
          className="aspect-[16/8] w-full rounded-card object-cover object-top"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              <span className="text-primary">{project.title}</span> —{' '}
              {project.subtitle}
            </h1>

            <p className="mt-6 flex items-start gap-4">
              <span className="mt-1 flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                {project.description.charAt(0)}
              </span>
              <span>{project.description.slice(1)}</span>
            </p>

            {project.challenge && (
              <Section title="Le défi">
                <p>{project.challenge}</p>
              </Section>
            )}

            {project.solution && (
              <Section title="La solution">
                <p>{project.solution}</p>

                {project.features?.length > 0 && (
                  <ul className="grid gap-3 pt-2 sm:grid-cols-2">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm"
                      >
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                          ✓
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </Section>
            )}

            {project.impact && (
              <Section title="L'impact">
                <p>{project.impact}</p>
              </Section>
            )}
          </div>

          <aside className="relative self-start overflow-hidden rounded-card bg-primary p-8 text-white">
            <HeroBlob className="pointer-events-none absolute -right-24 -bottom-28 w-80 opacity-30" />
            <div className="relative">
              {info.map((row) => (
                <div key={row.label} className="mb-6 last:mb-0">
                  <p className="text-white/70">{row.label} :</p>
                  <p className="mt-1 text-lg font-bold">{row.value}</p>
                </div>
              ))}

              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="mt-8 flex items-center justify-center gap-3 rounded-full bg-ink px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white hover:text-ink"
              >
                Voir le projet
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-site px-6 py-20">
        <p className="flex items-center justify-center gap-3 text-sm font-semibold text-ink">
          <span className="h-px w-8 bg-primary" />
          Autres projets
        </p>

        <h2 className="mt-4 text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          À découvrir{' '}
          <span className="font-medium text-primary italic">aussi</span>
          <Sparkle className="ml-2 inline-block size-4 -translate-y-3 text-ink" />
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((item) => (
            <OtherCard key={item.id} project={item} />
          ))}
        </div>
      </section>

      <Marquee />
      <BookingBand />
      <ContactSection />
      <FaqSection limit={4} />
      <Marquee />
    </>
  )
}
