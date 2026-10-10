import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { useEffect, useRef } from 'react'
import { cx } from '../lib/cx'
import { Sparkle } from './icons'

const defaultItems = [
  'Ingénierie IA',
  'Agents & automatisation',
  'Produits SaaS',
  'Open source',
  'RAG & bases vectorielles',
  'Applications web',
]

// Bandeau qui défile, accélère et change de sens avec le scroll.
// L'animation tourne sur le compositeur (Web Animations API) : le JavaScript
// n'intervient que pendant le défilement, pour ajuster la vitesse.
export default function Marquee({ items = defaultItems, duration = 38, tone = 'night', className }) {
  const reduced = useReducedMotion()
  const track = useRef(null)
  const animation = useRef(null)
  const direction = useRef(1)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [-1500, 0, 1500], [-4, 0, 4], { clamp: false })

  useEffect(() => {
    if (reduced || !track.current?.animate) return undefined
    animation.current = track.current.animate(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }],
      { duration: duration * 1000, iterations: Infinity },
    )
    return () => animation.current?.cancel()
  }, [reduced, duration])

  useMotionValueEvent(factor, 'change', (value) => {
    if (!animation.current) return
    if (value < -0.05) direction.current = -1
    else if (value > 0.05) direction.current = 1
    animation.current.playbackRate = direction.current * (1 + Math.abs(value))
  })

  const night = tone === 'night'

  return (
    <div
      className={cx(
        'relative overflow-hidden py-6 sm:py-7',
        night ? 'bg-night text-white' : 'bg-primary text-white',
        className,
      )}
      aria-hidden="true"
    >
      <div ref={track} className="flex w-max will-change-transform">
        {[0, 1].map((group) => (
          <div key={group} className="flex shrink-0 items-center">
            {items.map((item) => (
              <span
                key={item}
                className="flex items-center gap-10 px-5 text-[clamp(1.6rem,3.2vw,2.6rem)] font-bold tracking-tight whitespace-nowrap"
              >
                {item}
                <Sparkle className={cx('size-6', night ? 'text-primary' : 'text-night')} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
