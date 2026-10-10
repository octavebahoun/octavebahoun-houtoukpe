import { motion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { timeline } from '../data/timeline'
import { cx } from '../lib/cx'
import { EASE_EXPO } from '../lib/easing'
import { Accent } from './ui/Bits'
import { SectionHeading } from './ui/SectionHeading'

function Item({ item, index, compact }) {
  const right = index % 2 === 1

  return (
    <li
      className={cx(
        'relative grid gap-4 pl-10 md:grid-cols-2 md:gap-16 md:pl-0',
        index > 0 && 'md:-mt-16',
        compact && 'max-sm:w-[78%] max-sm:shrink-0 max-sm:snap-start max-sm:pl-0',
      )}
    >
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-45% 0px -45% 0px' }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        className={cx(
          'absolute top-7 left-[7px] z-10 size-[15px] rounded-full border-[3px] border-paper md:left-1/2 md:-translate-x-1/2',
          item.highlight ? 'bg-primary' : 'bg-ink',
          compact && 'max-sm:hidden',
        )}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, x: right ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: EASE_EXPO }}
        className={cx(
          right ? 'md:col-start-2' : 'md:col-start-1 md:text-right',
          // Carrousel mobile : pas d'entrée animée, la carte suivante doit rester visible au bord
          compact && 'max-sm:transform-none! max-sm:opacity-100!',
        )}
      >
        <div
          className={cx(
            'rounded-card border bg-surface p-6 transition-shadow duration-500 hover:shadow-soft sm:p-7',
            item.highlight ? 'border-primary/30' : 'border-line',
            compact && 'max-sm:h-full',
          )}
        >
          <div className={cx('flex flex-wrap items-center gap-2', !right && 'md:justify-end')}>
            <span className="font-mono text-xs text-faint">{item.period}</span>
            <span
              className={cx(
                'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                item.highlight ? 'bg-primary-strong text-white' : 'bg-card text-ink',
              )}
            >
              {item.kind}
            </span>
          </div>
          <h3 className="mt-4 text-xl font-bold tracking-tight sm:text-2xl">{item.title}</h3>
          <p className="mt-1 font-semibold text-primary-ink">{item.org}</p>
          <p className={cx('mt-3 text-[15px] leading-relaxed', compact && 'max-sm:hidden')}>{item.text}</p>
          {item.tags?.length > 0 && (
            <div className={cx('mt-4 flex flex-wrap gap-1.5', !right && 'md:justify-end', compact && 'max-sm:hidden')}>
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </li>
  )
}

// compact (accueil) : sur mobile, un carrousel horizontal de cartes réduites aux dates,
// intitulés et organisations — le parcours tient en un écran au lieu de trois
export default function Timeline({ index = '07', compact = false }) {
  const list = useRef(null)
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 70%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section className="py-16 sm:py-24 lg:py-28" aria-labelledby="timeline-title">
      <div className="container-site">
        <SectionHeading
          index={index}
          label="Parcours"
          align="center"
          title={
            <span id="timeline-title">
              De Lokossa à <Accent>Pau</Accent>
            </span>
          }
          description="Une licence au Bénin, un collectif d'ingénieurs co-fondé, des stages, des hackathons — et aujourd'hui le cycle ingénieur en France."
        />

        <div className={cx('relative mx-auto mt-16 max-w-5xl', compact && 'max-sm:mt-10')}>
          <div
            className={cx('absolute top-0 bottom-0 left-[14px] w-px bg-line md:left-1/2', compact && 'max-sm:hidden')}
            aria-hidden="true"
          >
            <motion.div style={{ scaleY: progress }} className="h-full w-full origin-top bg-primary" />
          </div>

          <ol
            ref={list}
            className={cx(
              'relative space-y-6 md:space-y-0',
              compact &&
                'no-scrollbar max-sm:-mx-5 max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:scroll-px-5 max-sm:gap-3 max-sm:space-y-0 max-sm:overflow-x-auto max-sm:px-5 max-sm:pb-1',
            )}
            data-lenis-prevent-horizontal={compact || undefined}
          >
            {timeline.map((item, itemIndex) => (
              <Item key={`${item.org}-${item.title}`} item={item} index={itemIndex} compact={compact} />
            ))}
          </ol>
          {compact && (
            <p className="mt-3 font-mono text-[11px] text-faint sm:hidden" aria-hidden="true">
              Faites glisser pour avancer dans le temps →
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
