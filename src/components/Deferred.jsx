import { Suspense, useEffect, useRef, useState } from 'react'

export const MOUNT_ALL_EVENT = 'oktav:mount-all'

// Monte une section seulement quand elle approche de l'écran : le premier rendu
// de l'accueil reste léger. Une ancre dans l'URL (ex. /#contact) monte tout d'emblée.
export default function Deferred({ children, minHeight = 800 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(() => Boolean(window.location.hash))

  useEffect(() => {
    if (visible) return undefined
    const show = () => setVisible(true)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show()
      },
      { rootMargin: '1400px 0px' },
    )
    observer.observe(ref.current)
    window.addEventListener(MOUNT_ALL_EVENT, show)
    return () => {
      observer.disconnect()
      window.removeEventListener(MOUNT_ALL_EVENT, show)
    }
  }, [visible])

  const placeholder = <div ref={ref} style={{ minHeight }} aria-hidden="true" />
  if (!visible) return placeholder
  return <Suspense fallback={<div style={{ minHeight }} aria-hidden="true" />}>{children}</Suspense>
}
