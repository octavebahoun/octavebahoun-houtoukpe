import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { EASE_EXPO } from '../lib/easing'
import { Button } from '../components/ui/Button'
import { usePageMeta } from '../hooks/usePageMeta'

const suggestions = [
  { label: 'Accueil', to: '/' },
  { label: 'Projets', to: '/projects' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/#contact' },
]

export default function NotFound() {
  usePageMeta({ title: 'Page introuvable' })
  const { pathname } = useLocation()
  const [lines, setLines] = useState(0)

  useEffect(() => {
    if (lines >= 3) return undefined
    const timeout = setTimeout(() => setLines((count) => count + 1), lines === 0 ? 500 : 420)
    return () => clearTimeout(timeout)
  }, [lines])

  return (
    <section className="flex min-h-[85vh] items-center pt-32 pb-16">
      <div className="container-site grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_EXPO }}
            className="display text-[clamp(7rem,22vw,16rem)] leading-[0.8] tracking-[-0.06em] text-ink"
          >
            4<span className="accent">0</span>4
          </motion.p>
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">Cette page n&apos;existe pas (encore).</h1>
          <p className="mt-4 max-w-md text-lg">
            Le lien est peut-être cassé, ou la page a déménagé. Pas de panique, voici quelques pistes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/">Retour à l&apos;accueil</Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_EXPO, delay: 0.15 }}
          className="overflow-hidden rounded-[24px] border border-white/10 bg-night font-mono text-[13px] text-white/80 shadow-lift"
        >
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-white/40">oktav — zsh</span>
          </div>
          <div className="space-y-2 p-5 leading-relaxed">
            <p>
              <span className="text-primary">~</span> cd <span className="break-all text-white">{pathname}</span>
            </p>
            {lines > 0 && (
              <p className="text-white/55">cd: aucun fichier ou dossier de ce nom : {pathname}</p>
            )}
            {lines > 1 && (
              <p>
                <span className="text-primary">~</span> ls ./pages
              </p>
            )}
            {lines > 2 && (
              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
                {suggestions.map((item) => (
                  <Link key={item.to} to={item.to} className="text-white underline decoration-primary decoration-2 underline-offset-4 hover:text-primary">
                    {item.label.toLowerCase()}/
                  </Link>
                ))}
              </div>
            )}
            <span className="inline-block h-4 w-2 translate-y-1 animate-blink bg-primary" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
