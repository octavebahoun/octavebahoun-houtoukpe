import { useEffect } from 'react'

const SITE = 'Oktav Bahoun'
const DEFAULT_DESCRIPTION =
  "Octave Précieux Bahoun-Houtoukpe (Oktav) conçoit des agents IA, des pipelines RAG et des produits SaaS. Étudiant ingénieur à CY Tech, co-fondateur et directeur technique d'Excellence Team."

function setMeta(selector, attribute, value) {
  const element = document.head.querySelector(selector)
  if (element) element.setAttribute(attribute, value)
}

// Titre et description de la page courante (onglet, partage, moteurs de recherche)
export function usePageMeta({ title, description = DEFAULT_DESCRIPTION } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE}` : `${SITE} — Ingénieur IA & builder open source`
    document.title = fullTitle
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('link[rel="canonical"]', 'href', `https://octave.excellenceteam.site${window.location.pathname}`)
  }, [title, description])
}
