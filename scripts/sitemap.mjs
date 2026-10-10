// Génère public/sitemap.xml à partir des routes publiques (scripts/routes.mjs).
// Usage : node scripts/sitemap.mjs
import { writeFile } from 'node:fs/promises'
import { SITE_URL } from '../src/data/seo.js'
import { getRoutes } from './routes.mjs'

const today = new Date().toISOString().slice(0, 10)
const priority = (path) => {
  if (path === '/') return '1.0'
  if (path === '/projects') return '0.9'
  if (path.split('/').length === 2) return '0.8'
  return '0.7'
}

const routes = [{ path: '/' }, ...getRoutes()]
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${route.published ?? today}</lastmod>
    <priority>${priority(route.path)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

await writeFile(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log(`sitemap.xml : ${routes.length} URL`)
