// Plugin Vite : après le build, écrit une copie de index.html par route
// (dist/projects/gentube.html…) avec son titre, sa description et son image de partage.
// Les robots de LinkedIn, WhatsApp ou X n'exécutent pas le JavaScript : sans ce
// pré-rendu, toutes les pages afficheraient l'aperçu de l'accueil.
// Vercel sert ces fichiers sans l'extension grâce à `cleanUrls` (vercel.json).
import { createHash } from 'node:crypto'
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

// Pages techniques : jamais indexées (page 404 servie par Vercel, back office)
function withNoIndex(html, title, description) {
  let page = html.replace(/<title>[^<]*<\/title>/, `<title>${escape(title)} — ${SITE_NAME}</title>`)
  page = setAttribute(page, /(<meta\s+name="description"\s+content=")[^"]*(")/, description)
  page = page.replace(/\s*<link\s+rel="canonical"[^>]*>/, '')
  return page.replace('</head>', '  <meta name="robots" content="noindex, nofollow" />\n  </head>')
}

// Chaque script en ligne de index.html doit être autorisé par son empreinte dans la CSP
// de vercel.json, sinon le navigateur le bloquerait en production : on vérifie au build.
async function checkInlineScripts(html, root) {
  const vercel = JSON.parse(await readFile(resolve(root, 'vercel.json'), 'utf8'))
  const csp = vercel.headers
    .flatMap((rule) => rule.headers)
    .find((header) => header.key === 'Content-Security-Policy')?.value ?? ''
  for (const [, body] of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
    const hash = `sha256-${createHash('sha256').update(body).digest('base64')}`
    if (!csp.includes(`'${hash}'`)) {
      throw new Error(`Script en ligne non autorisé par la CSP : ajoutez '${hash}' à script-src dans vercel.json`)
    }
  }
}

export function prerenderMeta() {
  let outDir
  let root

  return {
    name: 'oktav-prerender-meta',
    apply: 'build',
    configResolved(config) {
      root = config.root
      outDir = resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      const html = await readFile(resolve(outDir, 'index.html'), 'utf8')
      await checkInlineScripts(html, root)
      const routes = getRoutes()
      for (const route of routes) {
        const file = resolve(outDir, `${route.path.slice(1)}.html`)
        await mkdir(dirname(file), { recursive: true })
        await writeFile(file, withMeta(html, route))
      }
      // 404.html : servie par Vercel avec le statut 404 pour toute adresse inconnue ;
      // l'application s'y charge et affiche sa page « introuvable »
      await writeFile(
        resolve(outDir, '404.html'),
        withNoIndex(html, 'Page introuvable', "Cette page n'existe pas ou a été déplacée."),
      )
      await writeFile(
        resolve(outDir, 'admin.html'),
        withNoIndex(html, 'Back office', 'Espace d’administration du portfolio.'),
      )
      console.log(`  pré-rendu des balises de partage : ${routes.length} pages (+ 404, admin)`)
    },
  }
}
