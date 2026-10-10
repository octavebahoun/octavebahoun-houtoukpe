import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useRef } from 'react'
import { cx } from '../../lib/cx'

const finePointer =
  typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

// Attire légèrement l'élément vers le curseur (souris uniquement)
export function Magnetic({ children, strength = 0.3, className }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.5 })

  if (!finePointer || reduced) {
    return <span className={cx('inline-flex', className)}>{children}</span>
  }

  function handleMove(event) {
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY }}
      className={cx('inline-flex', className)}
    >
      {children}
    </motion.span>
  )
}
