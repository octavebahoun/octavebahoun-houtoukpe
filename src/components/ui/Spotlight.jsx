import { useRef } from 'react'
import { cx } from '../../lib/cx'

// Carte avec un halo qui suit le curseur (variables CSS, sans re-rendu React)
export function Spotlight({
  as: Component = 'div',
  className,
  children,
  color = 'var(--primary)',
  size = 420,
  ...rest
}) {
  const ref = useRef(null)

  function handleMove(event) {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    node.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    node.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <Component
      ref={ref}
      onPointerMove={handleMove}
      className={cx('group/spot relative isolate overflow-hidden', className)}
      {...rest}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(${size}px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, ${color} 16%, transparent), transparent 70%)`,
        }}
      />
      {children}
    </Component>
  )
}
