import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
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

function HighlightWord({ word, progress, range }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <motion.span style={{ opacity }} className="transition-none">
      {word}{' '}
    </motion.span>
  )
}

// Les mots s'allument au fil du défilement
export function ScrollHighlight({ text, className }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.45'],
  })
  const words = text.split(' ')

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <HighlightWord
            key={`${word}-${index}`}
            word={word}
            progress={scrollYProgress}
            range={[index / words.length, (index + 1) / words.length]}
          />
        ))}
      </span>
    </p>
  )
}
