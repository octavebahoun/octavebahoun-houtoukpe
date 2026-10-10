// Plugin Vite : après le build, écrit une copie de index.html par route
// (dist/projects/gentube.html…) avec son titre, sa description et son image de partage.
// Les robots de LinkedIn, WhatsApp ou X n'exécutent pas le JavaScript : sans ce
// pré-rendu, toutes les pages afficheraient l'aperçu de l'accueil.
// Vercel sert ces fichiers sans l'extension grâce à `cleanUrls` (vercel.json).
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { SITE_NAME, SITE_URL } from '../src/data/seo.js'
import { getRoutes } from './routes.mjs'

function escape(value = '') {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function setAttribute(html, pattern, value) {
  if (!pattern.test(html)) throw new Error(`Balise introuvable dans index.html : ${pattern}`)
  return html.replace(pattern, (_, before, after) => `${before}${escape(value)}${after}`)
}

function withMeta(html, route) {
  const title = `${route.title} — ${SITE_NAME}`
  const url = `${SITE_URL}${route.path}`
  const image = `${SITE_URL}${route.og}`
  const meta = (attribute, name) =>
    new RegExp(`(<meta\\s+${attribute}="${name}"\\s+content=")[^"]*(")`)

  let page = html.replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
  page = setAttribute(page, meta('name', 'description'), route.description)
  page = setAttribute(page, /(<link\s+rel="canonical"\s+href=")[^"]*(")/, url)
  page = setAttribute(page, meta('property', 'og:type'), route.type)
  page = setAttribute(page, meta('property', 'og:title'), title)
  page = setAttribute(page, meta('property', 'og:description'), route.description)
  page = setAttribute(page, meta('property', 'og:url'), url)
  page = setAttribute(page, meta('property', 'og:image'), image)
  page = setAttribute(page, meta('name', 'twitter:title'), title)
  page = setAttribute(page, meta('name', 'twitter:description'), route.description)
  page = setAttribute(page, meta('name', 'twitter:image'), image)

  if (route.published) {
    const article = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: route.title,
      description: route.description,
      datePublished: route.published,
      image,
      url,
      author: { '@type': 'Person', name: 'Octave Précieux Bahoun-Houtoukpe', url: SITE_URL },
    }
    page = page.replace(
      '</head>',
      `  <script type="application/ld+json">${JSON.stringify(article).replace(/</g, '\\u003c')}</script>\n  </head>`,
    )
  }

  return page
}

export function prerenderMeta() {
  let outDir

  return {
    name: 'oktav-prerender-meta',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      const html = await readFile(resolve(outDir, 'index.html'), 'utf8')
      const routes = getRoutes()
      for (const route of routes) {
        const file = resolve(outDir, `${route.path.slice(1)}.html`)
        await mkdir(dirname(file), { recursive: true })
        await writeFile(file, withMeta(html, route))
      }
      console.log(`  pré-rendu des balises de partage : ${routes.length} pages`)
    },
  }
}
