import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useProjects } from '../hooks/useProjects'
import { prefetchProps } from '../lib/routes'
import { ArrowUpRight, GitHub, Globe } from './icons'
import { Button } from './ui/Button'
import { BrowserFrame } from './ui/BrowserFrame'
import { SectionHeading } from './ui/SectionHeading'
import { Accent } from './ui/Bits'

function WorkCard({ project, index, total, progress }) {
  const targetScale = 1 - (total - 1 - index) * 0.035
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])
  const live = project.link && !project.link.includes('github.com') ? project.link : null
  const repoUrl = project.repo ? `https://github.com/${project.repo}` : null

  return (
    <div
      className="lg:sticky"
      style={{ top: `calc(6.5rem + ${index * 1.4}rem)` }}
    >
      <motion.article
        style={{ scale }}
        className="relative grid origin-top grid-cols-1 overflow-hidden rounded-[30px] border border-white/10 bg-night text-white shadow-lift lg:min-h-[600px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-24 size-[28rem] rounded-full opacity-30 blur-[110px]"
          style={{ background: project.accent }}
        />

        <div className="relative flex min-w-0 flex-col p-7 sm:p-10 lg:p-12">
          <div className="flex items-center justify-between gap-4 font-mono text-xs text-white/45">
            <span>
              <span className="text-primary">{String(index + 1).padStart(2, '0')}</span> /{' '}
              {String(total).padStart(2, '0')}
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-white/60">
              {project.status ?? project.year}
            </span>
          </div>

          <h3 className="display mt-8 text-[clamp(2.3rem,4.6vw,4.2rem)] break-words text-white">
            <Link to={`/projects/${project.slug}`} className="transition-colors hover:text-primary">
              {project.title}
            </Link>
          </h3>
          <p className="mt-3 text-xl text-white/85">
            <Accent className="text-[1.15em]">{project.subtitle}</Accent>
          </p>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/55">
            {project.description}
          </p>

          {project.metrics?.length > 0 && (
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt className="sr-only">{metric.label}</dt>
                  <dd className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {metric.value}
                  </dd>
                  <p className="mt-1 text-xs leading-snug text-white/45">{metric.label}</p>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-9">
            <Button to={`/projects/${project.slug}`} variant="light" size="md">
              Étude de cas
            </Button>
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-white transition-colors hover:border-white/40"
              >
                <Globe className="size-4" />
                En ligne
              </a>
            )}
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Code source de ${project.title}`}
                className="flex size-12 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-white/40"
              >
                <GitHub className="size-[18px]" />
              </a>
            )}
          </div>
        </div>

        <Link
          to={`/projects/${project.slug}`}
          {...prefetchProps('/projects/x')}
          className="group relative flex items-center p-5 pt-0 sm:p-8 sm:pt-0 lg:p-10 lg:pl-0"
          aria-label={`Voir l'étude de cas ${project.title}`}
        >
          <BrowserFrame
            src={project.image}
            alt={`Aperçu de ${project.title}`}
            url={live ?? repoUrl}
            className="w-full transition-transform duration-700 ease-out-expo group-hover:-translate-y-1.5 group-hover:rotate-[-0.6deg]"
            imgClassName="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
          />
          <span className="absolute top-6 right-6 flex size-12 scale-75 items-center justify-center rounded-full bg-primary text-white opacity-0 shadow-lift transition-all duration-500 ease-out-expo group-hover:scale-100 group-hover:opacity-100 sm:top-10 sm:right-10 lg:top-12 lg:right-12">
            <ArrowUpRight className="size-5" />
          </span>
        </Link>
      </motion.article>
    </div>
  )
}

export default function WorkStack() {
  const projects = useProjects()
  const featured = projects.filter((project) => project.featured).slice(0, 6)
  const container = useRef(null)
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] })

  return (
    <section className="py-24 sm:py-32" aria-labelledby="work-title">
      <div className="container-site">
        <SectionHeading
          index="04"
          label="Projets sélectionnés"
          title={
            <span id="work-title">
              Des produits qui <Accent>tournent</Accent>
            </span>
          }
          description="SaaS, agents IA, outils open source : une sélection de ce que j'ai conçu et livré. Chaque projet a son étude de cas — le problème, l'architecture, ce qui a marché."
        />

        <div ref={container} className="mt-16 flex flex-col gap-6 lg:gap-[12vh]">
          {featured.map((project, index) => (
            <WorkCard
              key={project.slug}
              project={project}
              index={index}
              total={featured.length}
              progress={scrollYProgress}
            />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Button to="/projects" variant="ghost" size="lg">
            Voir les {projects.length} projets
          </Button>
        </div>
      </div>
    </section>
  )
}
