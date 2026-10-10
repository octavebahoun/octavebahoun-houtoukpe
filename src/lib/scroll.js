const retrying = new Set()

// Défile vers un élément (ou en haut de page) en passant par Lenis s'il est actif
export function scrollToTarget(target, { offset = -96, immediate = false } = {}) {
  const lenis = window.__lenis
  // Après un changement de page, Lenis peut encore connaître l'ancienne hauteur du document
  lenis?.resize()
  const element =
    typeof target === 'string' ? document.getElementById(target.replace(/^#/, '')) : target

  if (target === 0 || target === 'top') {
    if (lenis) lenis.scrollTo(0, { immediate, force: true })
    else window.scrollTo({ top: 0, behavior: immediate ? 'instant' : 'smooth' })
    return true
  }

  if (!element) {
    // la cible est peut-être dans une section pas encore montée (voir Deferred)
    if (typeof target === 'string' && !retrying.has(target)) {
      retrying.add(target)
      window.dispatchEvent(new Event('oktav:mount-all'))
      setTimeout(() => {
        scrollToTarget(target, { offset, immediate })
        retrying.delete(target)
      }, 120)
    }
    return false
  }

  if (lenis) {
    lenis.scrollTo(element, { offset, immediate, force: true })
  } else {
    const top = element.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top, behavior: immediate ? 'instant' : 'smooth' })
  }
  return true
}
