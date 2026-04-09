import { useState, useRef, useCallback } from 'react'

export function useMouseTilt(intensity = 15) {
  const ref = useRef(null)
  const [style, setStyle] = useState({})
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotateX = (0.5 - y) * intensity
    const rotateY = (x - 0.5) * intensity
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
    })
  }, [intensity])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
    setStyle({ transition: 'transform 0.3s ease-out' })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out',
    })
  }, [])

  return {
    ref,
    style,
    isHovering,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  }
}
