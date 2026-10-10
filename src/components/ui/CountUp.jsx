import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { formatNumber } from '../../lib/format'

// Compteur animé à l'entrée dans l'écran. Le texte animé est écrit directement
// dans un nœud que React ne gère pas, pour éviter un re-rendu à chaque image.
export function CountUp({ value, duration = 1.6, suffix = '', className }) {
  const ref = useRef(null)
  const from = useRef(0)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()
  const label = `${formatNumber(value)}${suffix}`

  useLayoutEffect(() => {
    if (ref.current && !inView && !reduced) ref.current.textContent = `0${suffix}`
  }, [inView, reduced, suffix])

  useEffect(() => {
    const node = ref.current
    if (!node || (!inView && !reduced)) return undefined

    if (reduced) {
      node.textContent = label
      return undefined
    }

    const controls = animate(from.current, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        from.current = latest
        node.textContent = `${formatNumber(Math.round(latest))}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, reduced, value, duration, suffix, label])

  return (
    <span className={className}>
      <span className="sr-only">{label}</span>
      <span ref={ref} aria-hidden="true" />
    </span>
  )
}
