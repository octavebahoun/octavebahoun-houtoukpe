// Chargement à la demande des pages, partagé par le routeur et le préchargement
export const loaders = {
  services: () => import('../pages/Services'),
  about: () => import('../pages/About'),
  projects: () => import('../pages/Projects'),
  projectDetail: () => import('../pages/ProjectDetail'),
  blog: () => import('../pages/Blog'),
  blogPost: () => import('../pages/BlogPost'),
  faq: () => import('../pages/Faq'),
  notFound: () => import('../pages/NotFound'),
}

function loaderFor(path = '') {
  const clean = path.split('#')[0]
  if (clean === '/services') return loaders.services
  if (clean === '/about') return loaders.about
  if (clean === '/projects') return loaders.projects
  if (clean.startsWith('/projects/')) return loaders.projectDetail
  if (clean === '/blog') return loaders.blog
  if (clean.startsWith('/blog/')) return loaders.blogPost
  if (clean === '/faq') return loaders.faq
  return null
}

// Précharge la page visée dès que l'intention est claire (survol, focus, toucher)
export function prefetch(path) {
  loaderFor(path)?.().catch(() => {})
}

export function prefetchProps(path) {
  const handler = () => prefetch(path)
  return { onMouseEnter: handler, onFocus: handler, onTouchStart: handler }
}
