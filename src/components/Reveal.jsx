import { Children, cloneElement, isValidElement } from 'react'
import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

export function Reveal({ children, className, delay = 0, y = 28 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

export function Stagger({ children, className, delay = 0, stagger = 0.08 }) {
  return (
    <div className={className}>
      {Children.map(children, (child, index) =>
        isValidElement(child) && child.type === StaggerItem
          ? cloneElement(child, { delay: delay + index * stagger })
          : child,
      )}
    </div>
  )
}

export function StaggerItem({ children, className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}
