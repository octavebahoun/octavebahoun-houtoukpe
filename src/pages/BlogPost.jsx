import { Link, useParams } from 'react-router-dom'
import {
  ArrowUpRight,
  Facebook,
  LinkedIn,
  Sparkle,
  XIcon,
} from '../components/icons'
import Marquee from '../components/Marquee'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import { useGithubStats } from '../hooks/useGithubStats'
import { usePosts } from '../hooks/usePosts'
import { formatDate, readingTime } from '../lib/format'

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function inline(text) {
  return text
    .split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
    .map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="text-ink">
            {part.slice(2, -2)}
          </strong>
        )
      }

      const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part)
      if (link) {
        const [, label, href] = link
        if (href.startsWith('/')) {
          return (
            <Link
              key={index}
              to={href}
              className="font-semibold text-primary underline decoration-2 underline-offset-4"
            >
              {label}
            </Link>
          )
        }
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-primary underline decoration-2 underline-offset-4"
          >
            {label}
          </a>
        )
      }

      return part
    })
}

function Content({ content }) {
  let firstParagraph = true

  return content
    .split(/\n{2,}/)
    .filter((block) => block.trim())
    .map((block, index) => {
      if (block.startsWith('## ')) {
        const title = block.slice(3)
        return (
          <h2
            key={index}
            id={slugify(title)}
            className="mt-12 scroll-mt-24 text-2xl font-bold"
          >
            {title}
          </h2>
        )
      }

      if (block.startsWith('### ')) {
        return (
          <h3 key={index} className="mt-8 text-xl font-bold">
            {block.slice(4)}
          </h3>
        )
      }

      if (block.startsWith('> ')) {
        return (
          <blockquote
            key={index}
            className="mt-6 rounded-2xl border-l-4 border-primary bg-card px-6 py-5"
          >
            {inline(block.slice(2))}
          </blockquote>
        )
      }

      if (block.startsWith('- ')) {
        const items = block.split('\n').map((line) => line.replace(/^- /, ''))
        return (
          <ul key={index} className="mt-5 list-disc space-y-2 pl-6">
            {items.map((item, itemIndex) => (
              <li key={itemIndex}>{inline(item)}</li>
            ))}
          </ul>
        )
      }

      if (firstParagraph) {
        firstParagraph = false
        const letter = block.charAt(0)
        return (
          <p key={index} className="mt-6 flex items-start gap-4">
            <span className="mt-1 flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
              {letter}
            </span>
            <span>{inline(block.slice(1))}</span>
          </p>
        )
      }

      return (
        <p key={index} className="mt-5">
          {inline(block)}
        </p>
      )
    })
}

function headings(content) {
  return content
    .split(/\n{2,}/)
    .filter((block) => block.startsWith('## '))
    .map((block) => block.slice(3))
}

function SidebarTitle({ children }) {
  return (
    <h3 className="flex items-center gap-3 font-bold text-ink">
      <span className="h-5 w-1 rounded-full bg-primary" />
      {children}
    </h3>
  )
}

function RelatedCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group">
      <img
        src={post.image}
        alt={post.title}
        loading="lazy"
        className="aspect-[16/9] w-full rounded-2xl object-cover object-top"
      />
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-primary px-3.5 py-1 text-xs font-medium text-white">
          {post.category}
        </span>
        <span className="rounded-full bg-primary px-3.5 py-1 text-xs font-medium text-white">
          {formatDate(post.date)}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-bold transition-colors group-hover:text-primary">
        {post.title}
      </h3>
    </Link>
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const posts = usePosts()
  const stats = useGithubStats()
  const post = posts.find((item) => item.slug === slug)

  if (!post) {
    return (
      <section className="mx-auto max-w-site px-6 py-24 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Article introuvable
        </h1>
        <p className="mx-auto mt-4 max-w-md">
          Cet article n&apos;existe pas ou a été déplacé.
        </p>
        <Link
          to="/blog"
          className="mt-8 inline-block rounded-full bg-primary px-8 py-3.5 font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          Retour au blog
        </Link>
      </section>
    )
  }

  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 3)
  const toc = headings(post.content)
  const pageUrl = window.location.href

  const shareLinks = [
    {
      label: 'Facebook',
      Icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
    },
    {
      label: 'X',
      Icon: XIcon,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(pageUrl)}`,
    },
    {
      label: 'LinkedIn',
      Icon: LinkedIn,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
    },
  ]

  return (
    <>
      <section className="mx-auto max-w-site px-6 pt-16">
        <Reveal>
          <img
            src={post.image}
            alt={post.title}
            className="aspect-[16/7] w-full rounded-card object-cover object-top"
          />
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-10 max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-white">
            {post.category}
          </span>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-6 flex items-center justify-center gap-3">
            {stats.avatar && (
              <img
                src={stats.avatar}
                alt=""
                className="size-12 rounded-full border-2 border-white object-cover shadow-soft"
              />
            )}
            <div className="text-left">
              <p className="text-sm">
                Écrit par{' '}
                <span className="font-semibold text-primary">
                  {post.author}
                </span>
              </p>
              <p className="text-sm text-faint">
                {formatDate(post.date)} | {readingTime(post.content)}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-site px-6 pt-12 pb-16">
        <div className="grid gap-10 lg:grid-cols-[auto_1fr_300px]">
          <div className="hidden lg:block">
            <p className="text-xs font-semibold tracking-widest text-faint uppercase">
              Partager
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {shareLinks.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Partager sur ${label}`}
                  className="flex size-11 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-ink"
                >
                  <Icon className="size-4.5" />
                </a>
              ))}
            </div>
          </div>

          <article className="max-w-3xl">
            <Content content={post.content} />

            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-card px-4 py-2 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-5 rounded-card bg-card p-6">
              {stats.avatar && (
                <img
                  src={stats.avatar}
                  alt="Oktav Bahoun"
                  className="size-20 rounded-full border-2 border-white object-cover shadow-soft"
                />
              )}
              <div className="min-w-52 flex-1">
                <p className="font-bold text-ink">Oktav Bahoun</p>
                <p className="mt-1 text-sm">
                  Ingénieur IA & automatisation freelance. J&apos;écris sur ce
                  que je construis et ce que j&apos;apprends.
                </p>
              </div>
              <a
                href="https://github.com/octavebahoun"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary"
              >
                Suivre
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </article>

          <aside className="flex flex-col gap-10 self-start">
            <div>
              <SidebarTitle>Tags populaires</SidebarTitle>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-card px-4 py-2 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {toc.length > 0 && (
              <div>
                <SidebarTitle>Table des matières</SidebarTitle>
                <ol className="mt-4 space-y-3">
                  {toc.map((heading, index) => (
                    <li key={heading} className="flex gap-3 text-sm">
                      <span className="font-semibold text-primary">
                        0{index + 1}
                      </span>
                      <a
                        href={`#${slugify(heading)}`}
                        className="transition-colors hover:text-primary"
                      >
                        {heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="relative overflow-hidden rounded-card bg-primary px-8 pt-8 text-center text-white">
              <p className="font-semibold">Besoin d&apos;un dev ?</p>
              <p className="mt-2 text-xl font-bold">
                Un projet IA ou web en tête ?
              </p>
              <a
                href="#contact"
                className="mt-5 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
              >
                Me contacter
              </a>
              <img
                src="/images/profile-cutout.png"
                alt=""
                className="mx-auto mt-6 -mb-20 w-44"
              />
            </div>
          </aside>
        </div>
      </section>

      <Marquee />

      <section className="mx-auto max-w-site px-6 py-20">
        <Reveal>
          <p className="flex items-center justify-center gap-3 text-sm font-semibold text-ink">
            <span className="h-px w-8 bg-primary" />
            Actus & Blog
          </p>

          <h2 className="mt-4 text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
            À lire{' '}
            <span className="font-medium text-primary italic">aussi</span>
            <Sparkle className="ml-2 inline-block size-4 -translate-y-3 text-ink" />
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid gap-8 lg:grid-cols-3">
          {related.map((item) => (
            <StaggerItem key={item.slug}>
              <RelatedCard post={item} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  )
}
