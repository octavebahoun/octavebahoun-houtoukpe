import { useEffect, useState } from 'react'
import { fetchProjects } from '../lib/api'
import { fallbackProjects } from '../lib/fallbackProjects'
import { enrichWithGithub } from '../lib/github'

const imageByTitle = {
  contravo: '/images/projects/contravo.jpg',
  waaloge: '/images/projects/waaloge.jpg',
  studynotes: '/images/projects/studynotes.jpg',
  study: '/images/projects/studynotes.jpg',
  vault: '/images/projects/vault.jpg',
  'vaut-bibliotheque': '/images/projects/vault.jpg',
  mecano: '/images/projects/mecano.jpg',
  webgarage: '/images/projects/mecano.jpg',
  jarvis: '/images/projects/jarvis.jpg',
  'code-to-vector': '/images/projects/code-to-vector.jpg',
  'cv-generator': '/images/projects/cv-generator.jpg',
}

function slugify(value) {
  return (value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function repoFromLink(link) {
  const match = /github\.com\/([^/]+\/[^/]+)/.exec(link ?? '')
  return match ? match[1].replace(/\.git$/, '') : undefined
}

function normalize(project) {
  const key = slugify(project.title)

  return {
    id: project._id,
    title: project.title,
    subtitle: project.shortDesc ?? '',
    description: project.description ?? '',
    stack: project.techStack ?? [],
    year: project.createdAt
      ? String(new Date(project.createdAt).getFullYear())
      : '',
    role: project.collaborators?.length ? 'Équipe' : 'Solo',
    link: project.links?.demo ?? project.links?.github ?? '#',
    repo: repoFromLink(project.links?.github),
    image: imageByTitle[key] ?? '/images/projects/jarvis.jpg',
  }
}

export function useProjects() {
  const [projects, setProjects] = useState(fallbackProjects)

  useEffect(() => {
    let cancelled = false

    async function load() {
      let list = fallbackProjects

      try {
        const data = await fetchProjects()
        if (Array.isArray(data) && data.length > 0) {
          list = data.map(normalize)
        }
      } catch {
        list = fallbackProjects
      }

      const enriched = await enrichWithGithub(list)
      if (!cancelled) setProjects(enriched)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return projects
}
