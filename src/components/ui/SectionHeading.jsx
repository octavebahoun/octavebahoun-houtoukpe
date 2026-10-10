import { motion } from 'motion/react'
import { cx } from '../../lib/cx'
import { Reveal } from '../Reveal'
import { EASE_EXPO } from '../../lib/easing'

export function Kicker({ index, children, className, tone = 'default' }) {
  return (
    <p
      className={cx(
        'kicker flex items-center gap-3',
        tone === 'night' && 'text-white/50',
        className,
      )}
    >
      {index && <span className="text-primary">{index}</span>}
      <span className={cx('h-px w-8', tone === 'night' ? 'bg-white/20' : 'bg-line')} />
      {children}
    </p>
  )
}

export function SectionHeading({
  index,
  label,
  title,
  description,
  aside,
  align = 'split',
  tone = 'default',
  className,
}) {
  const centered = align === 'center'

  return (
    <div
      className={cx(
        'grid gap-8',
        !centered && 'lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-end',
        centered && 'justify-items-center text-center',
        className,
      )}
    >
      <div>
        <Reveal y={16}>
          <Kicker index={index} tone={tone} className={cx(centered && 'justify-center')}>
            {label}
          </Kicker>
        </Reveal>
        {/* L'observateur est sur le conteneur : un élément entièrement masqué par
            clip-path n'est jamais considéré comme visible par IntersectionObserver */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}>
          <motion.h2
            variants={{
              hidden: { clipPath: 'inset(0 0 100% 0)', y: 48 },
              visible: { clipPath: 'inset(-10% -5% -25% -5%)', y: 0 },
            }}
            transition={{ duration: 1.1, ease: EASE_EXPO, delay: 0.05 }}
            className={cx(
              'display mt-5 text-[clamp(2.6rem,5.4vw,4.6rem)]',
              tone === 'night' && 'text-white',
            )}
          >
            {title}
          </motion.h2>
        </motion.div>
      </div>

      {(description || aside) && (
        <Reveal delay={0.15} y={20} className={cx(centered && 'max-w-xl')}>
          {description && (
            <p className={cx('text-[17px]', tone === 'night' && 'text-white/60')}>
              {description}
            </p>
          )}
          {aside}
        </Reveal>
      )}
    </div>
  )
}
