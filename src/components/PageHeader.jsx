import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { EASE_EXPO } from '../lib/easing'

export default function PageHeader({ crumb, title, description, aside, count }) {
  return (
    <section className="pt-32 pb-14 sm:pt-40 sm:pb-20">
      <div className="container-site">
        <motion.nav
          aria-label="Fil d'Ariane"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_EXPO }}
          className="kicker flex items-center gap-2"
        >
          <Link to="/" className="transition-colors hover:text-ink">
            Accueil
          </Link>
          <span className="text-line">/</span>
          <span className="text-primary-ink">{crumb}</span>
        </motion.nav>

        <h1 className="display mt-6 text-[clamp(3.6rem,11vw,10rem)] leading-[0.85] tracking-[-0.055em]">
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.1, ease: EASE_EXPO, delay: 0.05 }}
            >
              {title}
            </motion.span>
          </span>
          {count !== undefined && (
            <motion.sup
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="ml-2 align-top font-mono text-[0.16em] font-medium tracking-normal text-primary-ink"
            >
              ({count})
            </motion.sup>
          )}
        </h1>

        {(description || aside) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_EXPO, delay: 0.25 }}
            className="mt-10 flex flex-wrap items-end justify-between gap-8 border-t border-line pt-8"
          >
            {description && <p className="max-w-2xl text-lg sm:text-xl">{description}</p>}
            {aside}
          </motion.div>
        )}
      </div>
    </section>
  )
}
