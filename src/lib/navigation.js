import { scrollToTarget } from './scroll'

// Navigue vers une route, en gérant les ancres (« /#contact ») d'une page à l'autre
export function goTo(navigate, path) {
  const [pathname, hash] = path.split('#')
  const target = pathname || '/'

  if (hash && window.location.pathname === target) {
    scrollToTarget(hash)
    return
  }

  navigate(hash ? `${target}#${hash}` : target)
}

// Gestionnaire de clic pour les liens d'ancre, à brancher sur <a href="/#contact">
export function anchorHandler(navigate, path) {
  return (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
    event.preventDefault()
    goTo(navigate, path)
  }
}
