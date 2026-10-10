import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePosts } from '../hooks/usePosts'
import { formatDate, readingTime } from '../lib/format'
import { ArrowUpRight } from './icons'
import { Reveal } from './Reveal'
import { Accent } from './ui/Bits'
import { Button } from './ui/Button'
import { SectionHeading } from './ui/SectionHeading'

export default function BlogTeaser({ index = '08' }) {
  const posts = usePosts()
  const recent = posts.slice(0, 4)
  const [hovered, setHovered] = useState(null)
  // L'aperçu se place sous le curseur, à droite, ou à gauche quand on approche du bord :
  // il ne masque ni le titre de la section ni la ligne survolée
  const [side, setSide] = useState('right')
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 26 })
  const springY = useSpring(y, { stiffness: 260, damping: 26 })

  function handleMove(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    const nextSide = event.clientX - rect.left > rect.width * 0.55 ? 'left' : 'right'
    if (nextSide !== side) setSide(nextSide)
    const left = event.clientX - rect.left
    const top = event.clientY - rect.top
    x.set(left)
    y.set(top)
    // À l'apparition, l'aperçu se pose directement au curseur au lieu de glisser depuis le coin
    if (!hovered) {
      springX.jump(left)
      springY.jump(top)
    }
  }

  return (
    <section className="py-16 sm:py-24 lg:py-28" aria-labelledby="blog-title">
      <div className="container-site">
        <SectionHeading
          index={index}
          label="Journal"
          title={
            <span id="blog-title">
              Notes de <Accent>labo</Accent>
            </span>
          }
          description="Ce que je construis, ce qui casse, ce que j'en retiens. Des retours d'expérience techniques, sans jargon inutile."
          aside={
            <div className="mt-6">
              <Button to="/blog" variant="ghost">
                Tous les articles
              </Button>
            </div>
          }
        />

        <div className="relative mt-14" onPointerMove={handleMove} onPointerLeave={() => setHovered(null)}>
          <ul className="border-t border-line">
            {recent.map((post, postIndex) => (
              <Reveal as="li" key={post.slug} delay={postIndex * 0.06} y={20} className="border-b border-line">
                <Link
                  to={`/blog/${post.slug}`}
                  onPointerEnter={() => setHovered(post)}
                  className="group grid items-center gap-x-8 gap-y-3 py-7 sm:grid-cols-[8.5rem_1fr_auto] sm:py-9"
                >
                  <span className="font-mono text-xs text-faint">{formatDate(post.date, { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  <span>
                    <span className="block text-xl font-bold tracking-tight text-ink transition-transform duration-500 ease-out-expo group-hover:translate-x-2 sm:text-[1.65rem]">
                      {post.title}
                    </span>
                    <span className="mt-2 block text-sm text-faint">
                      {post.category} · {readingTime(post.content)}
                    </span>
                  </span>
                  <span className="hidden size-12 items-center justify-center rounded-full border border-line text-ink transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-white sm:flex">
                    <ArrowUpRight className="size-5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>

          {/* Aperçu flottant qui suit le curseur (souris uniquement) */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                key="preview"
                style={{ x: springX, y: springY }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25 }}
                className="pointer-events-none absolute top-0 left-0 z-20 hidden [@media(pointer:fine)]:lg:block"
              >
                <div
                  className={`translate-y-7 overflow-hidden rounded-2xl border border-line bg-surface shadow-lift ${
                    side === 'right' ? 'translate-x-6' : '-translate-x-[calc(100%+1.5rem)]'
                  }`}
                >
                  <img src={hovered.image} alt="" className="aspect-[16/10] w-72 object-cover" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
