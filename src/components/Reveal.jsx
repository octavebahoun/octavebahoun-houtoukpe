import { motion } from 'motion/react'
import { Children, cloneElement, isValidElement } from 'react'
import { EASE_EXPO } from '../lib/easing'

export function Reveal({ children, className, delay = 0, y = 28, as = 'div', amount }) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px', amount }}
      transition={{ duration: 0.8, ease: EASE_EXPO, delay }}
    >
      {children}
    </Component>
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

export function StaggerItem({ children, className, delay = 0, as = 'div' }) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.75, ease: EASE_EXPO, delay }}
    >
      {children}
    </Component>
  )
}

// Révélation « rideau » : le bloc remonte depuis un masque
export function RevealMask({ children, className, delay = 0, as = 'div' }) {
  const Component = motion[as]
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}>
      <Component
        className={className}
        variants={{
          hidden: { clipPath: 'inset(0 0 100% 0)', y: 40 },
          visible: { clipPath: 'inset(0 0 -20% 0)', y: 0 },
        }}
        transition={{ duration: 1, ease: EASE_EXPO, delay }}
      >
        {children}
      </Component>
    </motion.div>
  )
}
