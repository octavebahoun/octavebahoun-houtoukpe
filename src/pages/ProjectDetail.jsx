import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import AgentPipeline from '../components/AgentPipeline'
import CtaBand from '../components/CtaBand'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, GitHub, Globe, Star } from '../components/icons'
import { ProjectCover } from '../components/ProjectCard'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import { EASE_EXPO } from '../lib/easing'
import { Accent } from '../components/ui/Bits'
import { Button, TextLink } from '../components/ui/Button'
import { BrowserFrame } from '../components/ui/BrowserFrame'
import { Kicker } from '../components/ui/SectionHeading'
import { usePageMeta } from '../hooks/usePageMeta'
import { findProject, useProjects } from '../hooks/useProjects'
import { timeAgo } from '../lib/format'
import { repoByFullName, useGithub } from '../lib/github'
import NotFound from './NotFound'

function Story({ index, title, children }) {
  return (
    <Reveal className="grid gap-4 border-t border-line py-10 md:grid-cols-[0.35fr_0.65fr] md:gap-12 md:py-14">
      <h2 className="flex items-baseline gap-4 text-2xl font-bold tracking-tight sm:text-3xl">
        <span className="font-mono text-sm text-primary">{index}</span>
        {title}
      </h2>
      <div className="text-lg leading-relaxed sm:text-xl sm:leading-relaxed">{children}</div>
    </Reveal>
  )
}

export default function ProjectDetail() {
  const { id } = useParams()
  const projects = useProjects()
  const github = useGithub()
  const project = findProject(projects, id)
  const cover = useRef(null)
  const { scrollYProgress } = useScroll({ target: cover, offset: ['start end', 'start 25%'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])
  const radius = useTransform(scrollYProgress, [0, 1], [48, 24])

  usePageMeta({
    title: project ? `${project.title} — étude de cas` : 'Projet introuvable',
    description: project?.description,
  })

  if (!project) return <NotFound />

  const position = projects.indexOf(project)
  const next = projects[(position + 1) % projects.length]
  const live = project.link && !project.link.includes('github.com') ? project.link : null
  const repoUrl = project.repo ? `https://github.com/${project.repo}` : null
  const repo = repoByFullName(github, project.repo)

  const meta = [
    { label: 'Année', value: project.year },
    { label: 'Rôle', value: project.role },
    { label: 'Statut', value: project.status },
    { label: 'Stack', value: project.stack.slice(0, 4).join(' · ') },
  ].filter((item) => item.value)

  return (
    <article>
      <header className="pt-32 sm:pt-40">
        <div className="container-site">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EASE_EXPO }}>
            <Link to="/projects" className="group inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-ink">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Tous les projets
            </Link>
          </motion.div>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-4xl">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.05 }}
                className="kicker"
              >
                Étude de cas <span className="text-primary">·</span> {String(position + 1).padStart(2, '0')}
              </motion.p>
              <h1 className="display mt-4 text-[clamp(3.2rem,9vw,8rem)] leading-[0.88] tracking-[-0.05em]">
                <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: '105%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1.1, ease: EASE_EXPO, delay: 0.1 }}
                  >
                    {project.title}
                  </motion.span>
                </span>
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE_EXPO, delay: 0.3 }}
                className="mt-5 text-2xl text-ink sm:text-3xl"
              >
                <Accent>{project.subtitle}</Accent>
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_EXPO, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              {live && (
                <Button href={live} icon={<Globe className="size-4" />}>
                  Voir en ligne
                </Button>
              )}
              {repoUrl && (
                <Button href={repoUrl} variant="ghost" icon={<GitHub className="size-4" />}>
                  Code source
                </Button>
              )}
            </motion.div>
          </div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4"
          >
            {meta.map((item) => (
              <div key={item.label} className="bg-surface p-5">
                <dt className="kicker text-[11px]">{item.label}</dt>
                <dd className="mt-1.5 text-[15px] font-semibold text-ink">{item.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </header>

      <div ref={cover} className="container-site mt-12 sm:mt-16">
        <motion.div style={{ scale, borderRadius: radius }} className="overflow-hidden">
          {project.image ? (
            <BrowserFrame src={project.image} alt={`Capture de ${project.title}`} url={live ?? repoUrl} eager className="rounded-[inherit]" />
          ) : (
            <ProjectCover project={project} className="aspect-[16/10] w-full" />
          )}
        </motion.div>
      </div>

      <section className="py-20 sm:py-28">
        <div className="container-site">
          <Reveal className="grid gap-6 md:grid-cols-[0.35fr_0.65fr] md:gap-12">
            <Kicker>En bref</Kicker>
            <p className="text-[clamp(1.4rem,2.4vw,2rem)] leading-snug font-semibold tracking-tight text-ink">
              {project.description}
            </p>
          </Reveal>

          {project.metrics?.length > 0 && (
            <Stagger className="mt-14 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-3">
              {project.metrics.map((metric) => (
                <StaggerItem key={metric.label} className="bg-surface p-7 sm:p-9">
                  <p className="display text-5xl text-ink sm:text-6xl">{metric.value}</p>
                  <p className="mt-3 text-[15px]">{metric.label}</p>
                </StaggerItem>
              ))}
            </Stagger>
          )}

          <div className="mt-16">
            {project.challenge && (
              <Story index="01" title="Le défi">
                {project.challenge}
              </Story>
            )}
            {project.solution && (
              <Story index="02" title="La solution">
                {project.solution}
              </Story>
            )}
            {project.impact && (
              <Story index="03" title="L'impact">
                {project.impact}
              </Story>
            )}
          </div>

          {project.features?.length > 0 && (
            <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {project.features.map((feature) => (
                <StaggerItem key={feature} className="rounded-card border border-line bg-surface p-6">
                  <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-4" />
                  </span>
                  <p className="mt-4 font-semibold text-ink">{feature}</p>
                </StaggerItem>
              ))}
            </Stagger>
          )}

          <Reveal className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-6 rounded-[24px] border border-line bg-surface p-7 sm:p-9">
            <div className="min-w-48 flex-1">
              <p className="kicker">Stack technique</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-sm font-medium text-ink">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            {repo && (
              <div className="flex flex-wrap items-center gap-6 font-mono text-sm">
                {repo.stars > 0 && (
                  <span className="flex items-center gap-1.5 text-ink">
                    <Star className="size-4 text-primary" /> {repo.stars}
                  </span>
                )}
                {repo.language && <span className="text-muted">{repo.language}</span>}
                <span className="text-faint">mis à jour {timeAgo(repo.pushedAt)}</span>
                <TextLink href={repoUrl}>GitHub</TextLink>
              </div>
            )}
            {project.article && <TextLink to={project.article}>Lire l&apos;article</TextLink>}
          </Reveal>
        </div>
      </section>

      {project.architecture === 'agents' && <AgentPipeline />}

      {next && next.slug !== project.slug && (
        <section className="py-20 sm:py-28">
          <div className="container-site">
            <Link to={`/projects/${next.slug}`} className="group block">
              <p className="kicker">Projet suivant</p>
              <div className="mt-6 grid items-center gap-8 border-y border-line py-10 md:grid-cols-[1fr_22rem]">
                <div>
                  <h2 className="display text-[clamp(2.8rem,8vw,7rem)] transition-colors duration-500 group-hover:text-primary">
                    {next.title}
                    <ArrowRight className="ml-4 inline size-[0.5em] -translate-x-4 opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100" />
                  </h2>
                  <p className="mt-3 text-lg">{next.subtitle}</p>
                </div>
                <div className="overflow-hidden rounded-2xl border border-line">
                  <ProjectCover project={next} className="aspect-[16/10] w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105" />
                </div>
              </div>
            </Link>
            <p className="mt-6">
              <Link to="/projects" className="group inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink">
                Tous les projets <ArrowUpRight className="size-4" />
              </Link>
            </p>
          </div>
        </section>
      )}

      <CtaBand />
    </article>
  )
}
