import { motion, useInView, useReducedMotion } from 'motion/react'
import { Fragment, useRef } from 'react'
import { cx } from '../../lib/cx'
import { EASE_EXPO } from '../../lib/easing'

// Chaque mot remonte depuis un masque, l'un après l'autre
export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.045,
  animateOnMount = false,
}) {
  const words = text.split(' ')
  const trigger = animateOnMount
    ? { animate: { y: '0%' } }
    : { whileInView: { y: '0%' }, viewport: { once: true, margin: '-40px' } }

  return (
    <span className={cx('inline', className)}>
      <span className="sr-only">{text}</span>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="inline-flex overflow-hidden pb-[0.12em] align-top"
        >
          <motion.span
            className={cx('inline-block', wordClassName)}
            initial={{ y: '110%' }}
            {...trigger}
            transition={{ duration: 0.9, ease: EASE_EXPO, delay: delay + index * stagger }}
          >
            {word}
            {index < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// Les mots s'allument en cascade quand le paragraphe entre à l'écran, puis restent
// pleinement lisibles (opacité de départ 0,5 : contraste AA « grand texte » respecté)
export function WordsReveal({ text, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduced = useReducedMotion()
  const shown = inView || reduced
  const words = text.split(' ')

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <span
              className="inline-block transition-[opacity,transform] duration-700 ease-out-expo"
              style={{
                opacity: shown ? 1 : 0.5,
                transform: shown ? 'none' : 'translateY(0.2em)',
                transitionDelay: shown ? `${index * 22}ms` : '0ms',
              }}
            >
              {word}
            </span>{' '}
          </Fragment>
        ))}
      </span>
    </p>
  )
}
