import { useEffect, useMemo, useState } from 'react'
import { catalog } from '../data/projects'
import { fetchProjects } from '../lib/api'
import { slugify } from '../lib/format'
import { repoByFullName, useGithub } from '../lib/github'

const bySlug = new Map(catalog.map((project, index) => [project.slug, { ...project, order: index }]))
const aliases = new Map(
  catalog.flatMap((project) => [
    [project.slug, project.slug],
    ...(project.aliases ?? []).map((alias) => [alias, project.slug]),
  ]),
)

// Une seule requête par session, partagée par toutes les pages
let apiProjects = null
let apiRequest = null

function loadApiProjects() {
  apiRequest ??= fetchProjects()
    .then((data) => (Array.isArray(data) ? data : []))
    .catch(() => [])
    .then((data) => {
      apiProjects = data
      return data
    })
  return apiRequest
}

function repoFromLink(link) {
  const match = /github\.com\/([^/]+\/[^/#?]+)/.exec(link ?? '')
  return match ? match[1].replace(/\.git$/, '') : undefined
}

function filled(value, fallback) {
  if (Array.isArray(value)) return value.length ? value : fallback
  return value || fallback
}

// Les textes du back office priment ; le catalogue local apporte visuel, chiffres et catégories
function fromApi(project, index) {
  const key = slugify(project.title)
  const slug = aliases.get(key) ?? key
  const local = bySlug.get(slug)

  return {
    ...local,
    slug,
    apiId: project._id,
    title: project.title || local?.title,
    subtitle: filled(project.shortDesc, local?.subtitle),
    description: filled(project.description, local?.description),
    challenge: filled(project.challenge, local?.challenge),
    solution: filled(project.solution, local?.solution),
    impact: filled(project.impact, local?.impact),
    features: filled(project.features, local?.features ?? []),
    stack: filled(project.techStack, local?.stack ?? []),
    link: project.links?.live ?? project.links?.demo ?? local?.link ?? project.links?.github,
    repo: repoFromLink(project.links?.github) ?? local?.repo,
    image: local?.image ?? project.image,
    year:
      local?.year ??
      (project.createdAt ? String(new Date(project.createdAt).getFullYear()) : ''),
    role: local?.role ?? (project.collaborators?.length ? 'Équipe' : 'Solo'),
    categories: local?.categories ?? ['web'],
    featured: Boolean(local?.featured || project.featured),
    order: local?.order ?? catalog.length + index,
  }
}

function merge(api, github) {
  const fromBackOffice = api.map(fromApi)
  const known = new Set(fromBackOffice.map((project) => project.slug))
  const localOnly = [...bySlug.values()].filter((project) => !known.has(project.slug))

  return [...fromBackOffice, ...localOnly]
    .sort((a, b) => a.order - b.order)
    .map((project) => ({
      ...project,
      id: project.slug,
      stars: repoByFullName(github, project.repo)?.stars ?? 0,
    }))
}

export function useProjects() {
  const [api, setApi] = useState(apiProjects)
  const github = useGithub()

  useEffect(() => {
    if (apiProjects) return undefined
    let cancelled = false
    loadApiProjects().then((data) => {
      if (!cancelled) setApi(data)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return useMemo(() => merge(api ?? [], github), [api, github])
}

export function findProject(projects, key) {
  return projects.find((project) => project.slug === key || project.apiId === key)
}
