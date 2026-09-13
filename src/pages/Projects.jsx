import { Link } from 'react-router-dom'
import BookingBand from '../components/BookingBand'
import ContactSection from '../components/ContactSection'
import FaqSection from '../components/FaqSection'
import { ArrowUpRight, Sparkle } from '../components/icons'
import Marquee from '../components/Marquee'
import PageHeader from '../components/PageHeader'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import { useProjects } from '../hooks/useProjects'

function ProjectCard({ project, reversed }) {
  const rows = [
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

  return (
    <article className="grid items-center gap-8 rounded-card bg-card p-6 lg:grid-cols-2">
      <div
        className={`overflow-hidden rounded-2xl bg-white ${
          reversed ? 'lg:order-2' : ''
        }`}
      >
        <Link to={`/projects/${project.id}`}>
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover object-top transition-transform duration-500 hover:scale-105"
          />
        </Link>
      </div>

      <div className={reversed ? 'lg:order-1' : ''}>
        <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
          <Link
            to={`/projects/${project.id}`}
            className="transition-colors hover:text-primary"
          >
            {project.title} –{' '}
            <span className="text-primary">{project.subtitle}</span>
          </Link>
        </h3>

        <p className="mt-4">{project.description}</p>

        {rows.length > 0 && (
          <dl className="mt-6 divide-y divide-line rounded-2xl bg-white px-6">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-4 py-3.5"
              >
                <dt className="text-sm">{row.label}</dt>
                <dd className="text-right text-sm font-semibold text-ink">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <Link
          to={`/projects/${project.id}`}
          className="mt-6 inline-flex items-center gap-2 font-semibold text-primary underline decoration-2 underline-offset-4 transition-colors hover:text-primary-hover"
        >
          Voir le détail
          <ArrowUpRight className="size-4" />
        </Link>

        {project.link && project.link !== '#' && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="mt-6 ml-6 inline-flex items-center gap-2 font-semibold text-muted transition-colors hover:text-ink"
          >
            Voir le site
            <ArrowUpRight className="size-4" />
          </a>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  const projects = useProjects()

  return (
    <>
      <PageHeader title="Projets" crumb="Projets" />
      <Marquee />

      <section className="mx-auto max-w-site px-6 py-20">
        <Reveal>
          <p className="flex items-center justify-center gap-3 text-sm font-semibold text-ink">
            <span className="h-px w-8 bg-primary" />
            Mon Portfolio
          </p>

          <h2 className="mt-4 text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
            Découvrez mes{' '}
            <span className="font-medium text-primary italic">réalisations</span>
            <Sparkle className="ml-2 inline-block size-4 -translate-y-3 text-ink" />
          </h2>
        </Reveal>

        <Stagger className="mt-14 flex flex-col gap-6">
          {projects.map((project, index) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} reversed={index % 2 === 1} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <BookingBand />
      <ContactSection />
      <FaqSection limit={4} />
      <Marquee />
    </>
  )
}
