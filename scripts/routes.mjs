// Liste des routes publiques avec leurs métadonnées de partage.
// Source unique pour le pré-rendu des balises (prerender-meta.mjs), les images
// de partage (og-images.py) et le sitemap (sitemap.mjs).
// `node scripts/routes.mjs --json` affiche la liste en JSON.
import { catalog } from '../src/data/projects.js'
import { pageMeta } from '../src/data/seo.js'
import { fallbackPosts } from '../src/lib/fallbackPosts.js'

const pages = ['projects', 'services', 'about', 'blog', 'faq']

export function getRoutes() {
  return [
    ...pages.map((key) => ({
      path: `/${key}`,
      ...pageMeta[key],
      kicker: pageMeta[key].title,
      og: `/og/${key}.jpg`,
      type: 'website',
    })),
    ...catalog.map((project) => ({
      path: `/projects/${project.slug}`,
      title: `${project.title} — étude de cas`,
      description: project.description,
      kicker: 'Étude de cas',
      heading: project.title,
      subheading: project.subtitle,
      cover: project.image,
      og: `/og/project-${project.slug}.jpg`,
      type: 'article',
    })),
    ...fallbackPosts.map((post) => ({
      path: `/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      kicker: 'Journal',
      heading: post.title,
      cover: post.image,
      og: `/og/post-${post.slug}.jpg`,
      type: 'article',
      published: post.date,
    })),
  ]
}

if (process.argv.includes('--json')) {
  console.log(JSON.stringify(getRoutes()))
}
