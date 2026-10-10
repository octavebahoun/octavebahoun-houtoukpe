import { useCallback, useSyncExternalStore } from 'react'

// Suit une media query, ex. « (min-width: 640px) ». Sert à ne pas monter du tout
// les décors que le CSS masquerait de toute façon (moins de travail au chargement mobile).
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    [query],
  )
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches)
}
