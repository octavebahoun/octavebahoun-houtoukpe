import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import CtaBand from '../components/CtaBand'
import { ArrowUpRight, Star } from '../components/icons'
import PageHeader from '../components/PageHeader'
import ProjectCard from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { Accent } from '../components/ui/Bits'
import { SectionHeading } from '../components/ui/SectionHeading'
import { categories, hiddenRepos, repoNotes } from '../data/projects'
import { GITHUB_URL } from '../data/profile'
import { usePageMeta } from '../hooks/usePageMeta'
import { useProjects } from '../hooks/useProjects'
import { cx } from '../lib/cx'
import { timeAgo } from '../lib/format'
import { useGithub } from '../lib/github'

function Filters({ value, onChange, counts }) {
  return (
    <LayoutGroup id="project-filters">
      <div
        role="tablist"
        aria-label="Filtrer les projets"
        className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {categories.map((category) => {
          const active = value === category.id
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(category.id)}
              className={cx(
                'relative shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors',
                active ? 'text-paper' : 'text-muted hover:text-ink',
              )}
            >
              {active && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-ink"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              {category.label}
              <span className={cx('ml-1.5 font-mono text-[11px]', active ? 'text-paper/60' : 'text-faint')}>
                {counts[category.id] ?? 0}
              </span>
            </button>
          )
        })}
      </div>
    </LayoutGroup>
  )
}

function RepoList({ repos }) {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="repos-title">
      <div className="container-site">
        <SectionHeading
          label="Encore plus"
          title={
            <span id="repos-title">
              Le reste est sur <Accent>GitHub</Accent>
            </span>
          }
          description="Expériences, outils, hackathons : les dépôts publics les plus récents, chargés en direct."
        />
        <Reveal className="mt-12 overflow-hidden rounded-[24px] border border-line bg-surface">
          <ul className="divide-y divide-line">
            {repos.map((repo) => (
              <li key={repo.fullName}>
                <a
                  href={`https://github.com/${repo.fullName}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid items-center gap-x-6 gap-y-1 px-5 py-4 transition-colors hover:bg-card sm:grid-cols-[14rem_1fr_auto] sm:px-7"
                >
                  <span className="truncate font-mono text-sm font-semibold text-ink">{repo.name}</span>
                  <span className="truncate text-sm">{repo.description || '—'}</span>
                  <span className="flex items-center gap-4 font-mono text-xs text-faint">
                    {repo.language && <span>{repo.language}</span>}
                    {repo.stars > 0 && (
                      <span className="flex items-center gap-1">
                        <Star className="size-3" /> {repo.stars}
                      </span>
                    )}
                    <span className="hidden md:inline">{timeAgo(repo.pushedAt)}</span>
                    <ArrowUpRight className="size-4 text-ink opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`${GITHUB_URL}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 border-t border-line py-4 text-sm font-semibold text-ink transition-colors hover:bg-card"
          >
            Tous les dépôts sur GitHub <ArrowUpRight className="size-4 text-primary" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

export default function Projects() {
  usePageMeta({
    title: 'Projets',
    description:
      "SaaS, agents IA, plateformes web, outils open source : les projets conçus et livrés par Oktav Bahoun, avec leurs études de cas.",
  })
  const projects = useProjects()
  const github = useGithub()
  const [filter, setFilter] = useState('all')

  const counts = useMemo(() => {
    const result = { all: projects.length }
    for (const project of projects) {
      for (const category of project.categories ?? []) {
        result[category] = (result[category] ?? 0) + 1
      }
    }
    return result
  }, [projects])

  const visible =
    filter === 'all' ? projects : projects.filter((project) => project.categories?.includes(filter))

  const showcased = new Set(projects.map((project) => project.repo?.toLowerCase()).filter(Boolean))
  const repos = (github.repos ?? [])
    .map((repo) => ({ ...repo, description: repo.description || repoNotes[repo.name.toLowerCase()] }))
    .filter(
      (repo) =>
        repo.description &&
        !showcased.has(repo.fullName.toLowerCase()) &&
        !hiddenRepos.includes(repo.name.toLowerCase()) &&
        repo.name !== 'octavebahoun',
    )
    .slice(0, 8)

  return (
    <>
      <PageHeader
        crumb="Projets"
        title="Projets"
        count={projects.length}
        description="Des SaaS en production, des agents IA, des plateformes web et des outils open source. Filtrez par domaine, ouvrez une étude de cas."
      />

      <section className="pb-8" aria-label="Liste des projets">
        <div className="container-site">
          <Filters value={filter} onChange={setFilter} counts={counts} />

          <motion.div layout className="mt-10 grid gap-x-6 gap-y-14 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {visible.map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {repos.length > 0 && <RepoList repos={repos} />}
      <CtaBand />
    </>
  )
}
