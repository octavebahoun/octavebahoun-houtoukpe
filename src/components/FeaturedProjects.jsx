import { Link } from 'react-router-dom'
import { ArrowUpRight, Sparkle } from './icons'
import { Reveal, Stagger, StaggerItem } from './Reveal'

const featured = [
  {
    title: 'Contravo',
    subtitle: 'Ton bureau numérique : devis, contrats, clients',
    image: '/images/projects/contravo.jpg',
    href: 'https://contravo.excellenceteam.site/',
    external: true,
    cta: 'Voir le projet',
  },
  {
    title: 'Video Remix Studio',
    subtitle: 'La table de montage qui retrouve vos plans',
    image: '/images/blog/video-remix-studio.jpg',
    href: '/blog/video-remix-studio',
    external: false,
    cta: "Lire l'article",
  },
  {
    title: 'Gentube',
    subtitle: 'SaaS de vidéo IA — en développement actif',
    image: '/images/projects/gentube.jpg',
    href: 'https://github.com/octavebahoun/gentube',
    external: true,
    cta: 'Voir le repo',
  },
]

function Card({ project }) {
  const content = (
    <>
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
        {project.cta}
        <ArrowUpRight className="size-4" />
      </span>
    </>
  )

  if (project.external) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="group rounded-card bg-card p-5 transition-colors hover:bg-soft"
      >
        {content}
      </a>
    )
  }

  return (
    <Link
      to={project.href}
      className="group rounded-card bg-card p-5 transition-colors hover:bg-soft"
    >
      {content}
    </Link>
  )
}

export default function FeaturedProjects() {
  return (
    <section className="mx-auto max-w-site px-6 py-20">
      <Reveal>
        <p className="flex items-center justify-center gap-3 text-sm font-semibold text-ink">
          <span className="h-px w-8 bg-primary" />
          Projets en avant
        </p>

        <h2 className="mt-4 text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          Quelques{' '}
          <span className="font-medium text-primary italic">réalisations</span>
          <Sparkle className="ml-2 inline-block size-4 -translate-y-3 text-ink" />
        </h2>
      </Reveal>

      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <StaggerItem key={project.title}>
            <Card project={project} />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.1} className="mt-12 text-center">
        <Link
          to="/projects"
          className="inline-block rounded-full border-2 border-ink px-8 py-3.5 font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
        >
          Voir tous les projets
        </Link>
      </Reveal>
    </section>
  )
}
