import { useEffect } from 'react'
import { pageMeta, SITE_NAME, SITE_URL } from '../data/seo'

function setMeta(selector, attribute, value) {
  const element = document.head.querySelector(selector)
  if (element) element.setAttribute(attribute, value)
}

// Titre et description de la page courante (onglet, partage, moteurs de recherche)
export function usePageMeta({ title, description = pageMeta.home.description } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — ${pageMeta.home.title}`
    document.title = fullTitle
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('link[rel="canonical"]', 'href', `${SITE_URL}${window.location.pathname}`)
  }, [title, description])
}
