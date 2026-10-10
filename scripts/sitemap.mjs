// Génère public/sitemap.xml à partir du catalogue de projets et des articles.
// Usage : node scripts/sitemap.mjs
import { writeFile } from 'node:fs/promises'
import { catalog } from '../src/data/projects.js'
import { fallbackPosts } from '../src/lib/fallbackPosts.js'

const SITE = 'https://octave.excellenceteam.site'
const today = new Date().toISOString().slice(0, 10)

const routes = [
  { path: '/', priority: '1.0' },
  { path: '/projects', priority: '0.9' },
  { path: '/services', priority: '0.8' },
  { path: '/about', priority: '0.8' },
  { path: '/blog', priority: '0.7' },
  { path: '/faq', priority: '0.5' },
  ...catalog.map((project) => ({ path: `/projects/${project.slug}`, priority: '0.7' })),
  ...fallbackPosts.map((post) => ({ path: `/blog/${post.slug}`, priority: '0.6', lastmod: post.date })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${SITE}${route.path}</loc>
    <lastmod>${route.lastmod ?? today}</lastmod>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

await writeFile(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log(`sitemap.xml : ${routes.length} URL`)
