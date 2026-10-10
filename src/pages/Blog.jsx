import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import CtaBand from '../components/CtaBand'
import { ArrowUpRight, Search } from '../components/icons'
import PageHeader from '../components/PageHeader'
import { Reveal } from '../components/Reveal'
import { EASE_EXPO } from '../lib/easing'
import { pageMeta } from '../data/seo'
import { usePageMeta } from '../hooks/usePageMeta'
import { usePosts } from '../hooks/usePosts'
import { cx } from '../lib/cx'
import { formatDate, readingTime } from '../lib/format'

function Featured({ post }) {
  return (
    <Reveal>
      <Link
        to={`/blog/${post.slug}`}
        className="group grid grid-cols-1 overflow-hidden rounded-[28px] border border-line bg-surface lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-card lg:aspect-auto">
          <img
            src={post.image}
            alt=""
            className="size-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
          />
          <span className="absolute top-5 left-5 rounded-full bg-primary px-3 py-1 font-mono text-[11px] font-semibold text-white">
            À la une
          </span>
        </div>
        <div className="flex flex-col p-7 sm:p-10">
          <p className="font-mono text-xs text-faint">
            {formatDate(post.date)} · {readingTime(post.content)}
          </p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight transition-colors group-hover:text-primary-ink sm:text-4xl">
            {post.title}
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed">{post.excerpt}</p>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                {tag}
              </span>
            ))}
          </div>
          <span className="mt-auto flex items-center gap-2 pt-10 font-semibold text-ink">
            Lire l&apos;article
            <span className="flex size-10 items-center justify-center rounded-full bg-primary text-white transition-transform duration-500 ease-out-expo group-hover:rotate-45">
              <ArrowUpRight className="size-4" />
            </span>
          </span>
        </div>
      </Link>
    </Reveal>
  )
}

function PostCard({ post, ref }) {
  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.55, ease: EASE_EXPO }}
    >
      <Link to={`/blog/${post.slug}`} className="group block">
        <div className="aspect-[16/10] overflow-hidden rounded-[22px] border border-line bg-card">
          <img
            src={post.image}
            alt=""
            loading="lazy"
            className="size-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
          />
        </div>
        <p className="mt-5 font-mono text-xs text-faint">
          {post.category} · {formatDate(post.date)}
        </p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight transition-colors group-hover:text-primary-ink">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[15px]">{post.excerpt}</p>
      </Link>
    </motion.article>
  )
}

export default function Blog() {
  usePageMeta(pageMeta.blog)
  const posts = usePosts()
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState(null)
  const tags = useMemo(() => [...new Set(posts.flatMap((post) => post.tags))], [posts])

  const searching = query.trim() || tag
  const filtered = posts.filter((post) => {
    const text = `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase()
    return (!tag || post.tags.includes(tag)) && text.includes(query.trim().toLowerCase())
  })
  const [featured, ...rest] = posts

  return (
    <>
      <PageHeader
        crumb="Blog"
        title="Journal"
        count={posts.length}
        description="Ce que je construis, ce qui casse, ce que j'en retiens. Des retours d'expérience techniques, écrits pour être utiles."
      />

      <section className="pb-12" aria-label="Articles">
        <div className="container-site">
          {!searching && featured && <Featured post={featured} />}

          <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
            <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
              <button
                type="button"
                onClick={() => setTag(null)}
                className={cx(
                  'shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                  !tag ? 'border-ink bg-ink text-paper' : 'border-line text-muted hover:text-ink',
                )}
              >
                Tout
              </button>
              {tags.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTag(item === tag ? null : item)}
                  className={cx(
                    'shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                    item === tag ? 'border-ink bg-ink text-paper' : 'border-line text-muted hover:text-ink',
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
            <label className="flex h-11 w-full items-center gap-3 rounded-full border border-line bg-surface px-4 focus-within:border-primary sm:w-72">
              <Search className="size-4 text-faint" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Rechercher un article"
                aria-label="Rechercher un article"
                className="w-full bg-transparent text-[15px] text-ink placeholder:text-faint focus:outline-none"
              />
            </label>
          </div>

          <motion.div layout className="mt-10 grid gap-x-6 gap-y-14 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {(searching ? filtered : rest).map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </AnimatePresence>
          </motion.div>

          {searching && filtered.length === 0 && (
            <p className="mt-6 rounded-card border border-line bg-surface p-10 text-center">
              Aucun article ne correspond à votre recherche.
            </p>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
