import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { anchorHandler } from '../lib/navigation'
import { scrollToTarget } from '../lib/scroll'
import { ArrowUpRight } from './icons'
import { EASE_EXPO } from '../lib/easing'
import { services } from './servicesData'
import { Spotlight } from './ui/Spotlight'

const num = (index) => String(index + 1).padStart(2, '0')

// Carte d'appel à l'action qui complète la grille complète (page Services)
function CustomCard() {
  const navigate = useNavigate()
  return (
    <a
      href="/#contact"
      onClick={anchorHandler(navigate, '/#contact')}
      className="group flex min-h-[250px] flex-col justify-between rounded-card bg-primary-strong p-6 text-white transition-[background-color,box-shadow] duration-300 hover:bg-primary-strong-hover hover:shadow-lift"
    >
      <span className="font-mono text-xs tracking-[0.12em] text-white/70 uppercase">Sur mesure</span>
      <span>
        <span className="block text-2xl font-bold tracking-tight">Un besoin qui n&apos;entre dans aucune case ?</span>
        <span className="mt-2 block text-sm text-white/80">On en parle, et on trouve la bonne approche.</span>
      </span>
      <span className="flex items-center justify-between">
        <span className="text-[13px] font-semibold">Me contacter</span>
        <span className="flex size-10 items-center justify-center rounded-full bg-night text-white transition-transform duration-500 ease-out-expo group-hover:rotate-45">
          <ArrowUpRight className="size-[17px]" />
        </span>
      </span>
    </a>
  )
}

export default function ServicesPanels({ limit }) {
  const visible = limit ? services.slice(0, limit) : services
  const [active, setActive] = useState(0)
  const featured = visible[active] ?? visible[0]
  const featuredCard = useRef(null)
  const wide = useMediaQuery('(min-width: 640px)')

  // La carte choisie s'affiche en grand dans le panneau du haut : si ce panneau
  // est hors de l'écran (mobile, bas de grille), on y ramène la vue
  function feature(index) {
    setActive(index)
    requestAnimationFrame(() => {
      const card = featuredCard.current
      if (!card) return
      const { top } = card.getBoundingClientRect()
      if (top < 64 || top > window.innerHeight * 0.5) scrollToTarget(card, { offset: -100 })
    })
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <article
        ref={featuredCard}
        aria-live="polite"
        className="relative flex flex-col overflow-hidden rounded-card bg-night p-6 text-white sm:col-span-2 sm:min-h-[520px] sm:p-10 lg:row-span-2"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-24 size-80 rounded-full bg-primary/25 blur-[90px]"
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={featured.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: EASE_EXPO }}
            className="relative flex flex-1 flex-col"
          >
            <div className="flex items-center gap-3.5">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                {featured.icon}
              </span>
              <span className="font-mono text-xs tracking-[0.12em] text-primary uppercase">
                {num(active)} — En vedette
              </span>
            </div>

            <h3 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {featured.title}
            </h3>
            <p className="mt-3 max-w-lg text-white/60">{featured.description}</p>

            {/* Illustration décorative : pas montée sur mobile (page plus courte, chargement plus léger) */}
            {wide && (
              <div className="mt-7 min-h-[200px] flex-1 overflow-hidden rounded-2xl border border-white/5 bg-black/30 [&_svg]:h-full [&_svg]:w-full">
                {featured.visual}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {featured.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[13px] font-medium text-white/85"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </article>

      {visible.map((service, index) =>
        index === active ? null : (
          <motion.div key={service.title} layout transition={{ duration: 0.5, ease: EASE_EXPO }}>
            <Spotlight
              as="button"
              type="button"
              onClick={() => feature(index)}
              aria-label={`Mettre « ${service.title} » en vedette`}
              className="group grid h-full w-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-card border border-line bg-surface p-4 text-left transition-[border-color,box-shadow] duration-300 hover:border-ink/15 hover:shadow-soft sm:flex sm:flex-col sm:items-stretch sm:justify-between sm:gap-6 sm:p-6 lg:min-h-[250px]"
            >
              <div className="flex items-start justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-500 ease-out-expo group-hover:scale-110 group-hover:-rotate-6">
                  {service.icon}
                </span>
                <span className="font-mono text-xs text-faint max-sm:hidden">{num(index)}</span>
              </div>

              {/* Sur mobile : une ligne compacte (icône, titre, flèche) */}
              <div>
                <h3 className="text-lg font-bold tracking-tight sm:text-xl">{service.title}</h3>
                <p className="mt-2 text-sm max-sm:hidden">{service.description}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-ink max-sm:hidden">Voir le détail</span>
                <span className="flex size-10 items-center justify-center rounded-full bg-card text-ink transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:bg-primary group-hover:text-white">
                  <ArrowUpRight className="size-[17px]" />
                </span>
              </div>
            </Spotlight>
          </motion.div>
        ),
      )}

      {!limit && <CustomCard />}
    </div>
  )
}
