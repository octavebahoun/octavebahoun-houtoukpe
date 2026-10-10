import Lenis from 'lenis'
import { useEffect } from 'react'

// Défilement fluide (Lenis respecte automatiquement « réduire les animations »).
// L'instance est exposée sur window.__lenis pour les défilements programmés (lib/scroll.js).
export function SmoothScroll({ children }) {
  useEffect(() => {
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
