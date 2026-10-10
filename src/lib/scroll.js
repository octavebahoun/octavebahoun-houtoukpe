// Défile vers un élément (ou en haut de page) en passant par Lenis s'il est actif.
// Si la cible n'existe pas encore (section chargée à la demande, voir Deferred),
// on demande le montage de toutes les sections puis on réessaie quelques instants.
export function scrollToTarget(target, { offset = -96, immediate = false, attempts = 20 } = {}) {
  const lenis = window.__lenis
  // Après un changement de page, Lenis peut encore connaître l'ancienne hauteur du document
  lenis?.resize()

  if (target === 0 || target === 'top') {
    if (lenis) lenis.scrollTo(0, { immediate, force: true })
    else window.scrollTo({ top: 0, behavior: immediate ? 'instant' : 'smooth' })
    return true
  }

  const element =
    typeof target === 'string' ? document.getElementById(target.replace(/^#/, '')) : target

  if (!element) {
    if (typeof target === 'string' && attempts > 0) {
      window.dispatchEvent(new Event('oktav:mount-all'))
      setTimeout(() => scrollToTarget(target, { offset, immediate, attempts: attempts - 1 }), 150)
    }
    return false
  }

  const go = () => {
    lenis?.resize()
    if (lenis) {
      lenis.scrollTo(element, { offset, immediate, force: true })
    } else {
      const top = element.getBoundingClientRect().top + window.scrollY + offset
      window.scrollTo({ top, behavior: immediate ? 'instant' : 'smooth' })
    }
  }

  go()
  // Les sections chargées juste avant peuvent encore décaler la cible : on corrige une fois
  if (attempts < 20) setTimeout(go, 700)
  return true
}
