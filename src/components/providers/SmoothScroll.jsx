import Lenis from 'lenis'
import { useEffect } from 'react'

// Défilement fluide (Lenis respecte automatiquement « réduire les animations »).
// L'instance est exposée sur window.__lenis pour les défilements programmés (lib/scroll.js).
// Sur écran tactile, le défilement natif est déjà fluide : Lenis n'y apporterait qu'une
// boucle d'animation permanente, on s'en passe (lib/scroll.js se replie sur window.scrollTo).
export function SmoothScroll({ children }) {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined
    const instance = new Lenis({
      autoRaf: true,
      lerp: 0.11,
      stopInertiaOnNavigate: true,
    })
    window.__lenis = instance
    return () => {
      instance.destroy()
      window.__lenis = undefined
    }
  }, [])

  return children
}
