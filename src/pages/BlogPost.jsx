import { motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CtaBand from '../components/CtaBand'
import { ArrowLeft, ArrowUpRight, Link as LinkIcon, LinkedIn, XIcon } from '../components/icons'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import { EASE_EXPO } from '../lib/easing'
import { GITHUB_URL } from '../data/profile'
import { useCopy } from '../hooks/useCopy'
import { usePageMeta } from '../hooks/usePageMeta'
import { usePosts } from '../hooks/usePosts'
import { cx } from '../lib/cx'
import { formatDate, readingTime, slugify } from '../lib/format'
import { scrollToTarget } from '../lib/scroll'
import NotFound from './NotFound'

// Mini-rendu Markdown : **gras**, `code` et [liens](/chemin)
function inline(text) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={index}>{part.slice(1, -1)}</code>
    }
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part)
    if (link) {
      const [, label, href] = link
      const className = 'font-semibold text-primary-ink underline decoration-primary/40 decoration-2 underline-offset-4 hover:decoration-primary'
      return href.startsWith('/') ? (
        <Link key={index} to={href} className={className}>
          {label}
        </Link>
      ) : (
        <a key={index} href={href} target="_blank" rel="noreferrer" className={className}>
          {label}
        </a>
      )
    }
    return part
  })
}

function Content({ content }) {
  let first = true

  return content
    .split(/\n{2,}/)
    .filter((block) => block.trim())
    .map((block, index) => {
      if (block.startsWith('## ')) {
        const title = block.slice(3)
        return (
          <h2 key={index} id={slugify(title)} className="mt-16 scroll-mt-28 text-3xl font-bold tracking-tight">
            {title}
          </h2>
        )
      }
      if (block.startsWith('### ')) {
        return (
          <h3 key={index} className="mt-10 text-2xl font-bold tracking-tight">
            {block.slice(4)}
          </h3>
        )
      }
      if (block.startsWith('> ')) {
        return (
          <blockquote key={index} className="mt-8 rounded-2xl border-l-4 border-primary bg-surface px-6 py-5 text-ink">
            {inline(block.slice(2))}
          </blockquote>
        )
      }
      if (block.startsWith('- ')) {
        const items = block.split('\n').map((line) => line.replace(/^- /, ''))
        return (
          <ul key={index} className="mt-6 space-y-3">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="relative pl-6">
                <span className="absolute top-[0.7em] left-0 size-1.5 rounded-full bg-primary" />
                {inline(item)}
              </li>
            ))}
          </ul>
        )
      }
      if (first) {
        first = false
        return (
          <p key={index} className="mt-8 text-[1.3rem] leading-relaxed text-ink first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:font-serif first-letter:text-[4.2rem] first-letter:leading-[0.8] first-letter:text-primary first-letter:italic">
            {inline(block)}
          </p>
        )
      }
      return (
        <p key={index} className="mt-6">
          {inline(block)}
        </p>
      )
    })
}

function useActiveHeading(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    ids.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [ids])

  return active
}

export default function BlogPost() {
  const { slug } = useParams()
  const posts = usePosts()
  const copy = useCopy()
  const post = posts.find((item) => item.slug === slug)
  const headings = useMemo(
    () =>
      post
        ? post.content.split(/\n{2,}/).filter((block) => block.startsWith('## ')).map((block) => block.slice(3))
        : [],
    [post],
  )
  const ids = useMemo(() => headings.map(slugify), [headings])
  const active = useActiveHeading(ids)

  usePageMeta({ title: post?.title ?? 'Article introuvable', description: post?.excerpt })

  if (!post) return <NotFound />

  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 2)
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const share = [
    { label: 'LinkedIn', Icon: LinkedIn, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { label: 'X', Icon: XIcon, href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}` },
  ]

  return (
    <article>
      <header className="pt-32 sm:pt-40">
        <div className="container-site max-w-4xl">
          <Link to="/blog" className="group inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-ink">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Journal
          </Link>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
            className="kicker mt-10"
          >
            <span className="text-primary">{post.category}</span> · {formatDate(post.date)} · {readingTime(post.content)}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_EXPO, delay: 0.05 }}
            className="display mt-5 text-[clamp(2.4rem,5.6vw,4.4rem)] leading-[0.98]"
          >
            {post.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 flex items-center gap-3"
          >
            <img src="/images/portrait.webp" alt="" className="size-11 rounded-full bg-primary object-cover object-top" />
            <div className="text-sm leading-tight">
              <p className="font-semibold text-ink">{post.author}</p>
              <p className="text-faint">Ingénieur IA & builder open source</p>
            </div>
          </motion.div>
        </div>
      </header>

      <Reveal className="container-site mt-12">
        <img src={post.image} alt="" className="aspect-[16/8] w-full rounded-[28px] border border-line object-cover" />
      </Reveal>

      <div className="container-site mt-16 grid gap-12 lg:grid-cols-[13rem_minmax(0,1fr)_13rem]">
        <aside className="hidden lg:block">
          {headings.length > 0 && (
            <nav aria-label="Sommaire" className="sticky top-28">
              <p className="kicker">Sommaire</p>
              <ol className="mt-5 space-y-1 border-l border-line">
                {headings.map((heading, index) => (
                  <li key={heading}>
                    <button
                      type="button"
                      onClick={() => scrollToTarget(ids[index], { offset: -110 })}
                      className={cx(
                        '-ml-px block border-l-2 py-1.5 pl-4 text-left text-sm transition-colors',
                        active === ids[index] ? 'border-primary font-semibold text-ink' : 'border-transparent text-faint hover:text-ink',
                      )}
                    >
                      {heading}
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </aside>

        <div className="prose-oktav mx-auto w-full max-w-prose">
          <Content content={post.content} />

          <div className="mt-14 flex flex-wrap gap-2 border-t border-line pt-8">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-muted">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-5 rounded-[24px] border border-line bg-surface p-6 sm:p-7">
            <img src="/images/portrait.webp" alt="Oktav Bahoun" className="size-16 rounded-full bg-primary object-cover object-top" />
            <div className="min-w-52 flex-1">
              <p className="font-bold text-ink">Oktav Bahoun</p>
              <p className="mt-1 text-[15px]">J&apos;écris sur ce que je construis et ce que j&apos;apprends, en open source.</p>
            </div>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5"
            >
              Suivre sur GitHub <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <p className="kicker">Partager</p>
            <div className="mt-5 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => copy(url, 'Lien copié')}
                className="flex items-center gap-3 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/30"
              >
                <LinkIcon className="size-4" /> Copier le lien
              </button>
              {share.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/30"
                >
                  <Icon className="size-4" /> {label}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="py-24 sm:py-32">
          <div className="container-site">
            <p className="kicker">À lire aussi</p>
            <Stagger className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((item) => (
                <StaggerItem key={item.slug}>
                  <Link to={`/blog/${item.slug}`} className="group grid grid-cols-[8rem_1fr] items-center gap-5 rounded-[24px] border border-line bg-surface p-4 sm:grid-cols-[11rem_1fr]">
                    <img src={item.image} alt="" loading="lazy" className="aspect-square w-full rounded-2xl object-cover" />
                    <div>
                      <p className="font-mono text-xs text-faint">{formatDate(item.date)}</p>
                      <h3 className="mt-2 text-lg font-bold tracking-tight transition-colors group-hover:text-primary-ink sm:text-xl">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      <CtaBand />
    </article>
  )
}
