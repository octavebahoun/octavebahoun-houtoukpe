import { useState } from 'react'
import { Link } from 'react-router-dom'
import BookingBand from '../components/BookingBand'
import ContactSection from '../components/ContactSection'
import FaqSection from '../components/FaqSection'
import { ArrowUpRight, Sparkle } from '../components/icons'
import Marquee from '../components/Marquee'
import PageHeader from '../components/PageHeader'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import { usePosts } from '../hooks/usePosts'
import { formatDate } from '../lib/format'

function PostCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group rounded-card bg-card p-6 transition-colors hover:bg-soft"
    >
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="aspect-[16/8] w-full rounded-2xl object-cover object-top"
        />
        <span className="absolute inset-0 m-auto flex size-12 items-center justify-center rounded-full bg-primary text-white transition-transform group-hover:scale-110">
          <ArrowUpRight />
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <span className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-white">
          {post.category}
        </span>
        <span className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-white">
          {formatDate(post.date)}
        </span>
      </div>

      <h3 className="mt-4 text-2xl font-bold tracking-tight transition-colors group-hover:text-primary">
        {post.title}
      </h3>
      <p className="mt-3">{post.excerpt}</p>
    </Link>
  )
}

function SidebarTitle({ children }) {
  return (
    <h3 className="flex items-center gap-3 font-bold text-ink">
      <span className="h-5 w-1 rounded-full bg-primary" />
      {children}
    </h3>
  )
}

export default function Blog() {
  const posts = usePosts()
  const [query, setQuery] = useState('')

  const filtered = posts.filter((post) =>
    `${post.title} ${post.tags.join(' ')}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  )

  const recent = posts.slice(0, 3)
  const tags = [...new Set(posts.flatMap((post) => post.tags))]

  return (
    <>
      <PageHeader title="Blog" crumb="Blog" />
      <Marquee />

      <section className="mx-auto max-w-site px-6 py-20">
        <Reveal>
          <p className="flex items-center justify-center gap-3 text-sm font-semibold text-ink">
            <span className="h-px w-8 bg-primary" />
            Actus & Blog
          </p>

          <h2 className="mt-4 text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
            Mes derniers{' '}
            <span className="font-medium text-primary italic">articles</span>
            <Sparkle className="ml-2 inline-block size-4 -translate-y-3 text-ink" />
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.8fr_1fr]">
          <Stagger className="flex flex-col gap-8">
            {filtered.map((post) => (
              <StaggerItem key={post.slug}>
                <PostCard post={post} />
              </StaggerItem>
            ))}

            {filtered.length === 0 && (
              <p className="rounded-card bg-card p-8 text-center">
                Aucun article ne correspond à « {query} ».
              </p>
            )}
          </Stagger>

          <Reveal delay={0.12} className="flex flex-col gap-10">
            <div>
              <SidebarTitle>Recherche</SidebarTitle>
              <div className="mt-4 flex items-center gap-3 rounded-field bg-card px-5 py-3.5">
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Rechercher un article"
                  aria-label="Rechercher un article"
                  className="w-full bg-transparent text-[15px] text-ink placeholder:text-faint focus:outline-none"
                />
                <svg
                  viewBox="0 0 24 24"
                  className="size-5 shrink-0 fill-none stroke-current stroke-2 text-ink"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <div>
              <SidebarTitle>Tags populaires</SidebarTitle>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setQuery(tag)}
                    className="rounded-full bg-card px-4 py-2 text-sm transition-colors hover:bg-primary hover:text-white"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <SidebarTitle>Articles récents</SidebarTitle>
              <div className="mt-4 flex flex-col gap-4">
                {recent.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="group flex items-center gap-4"
                  >
                    <img
                      src={post.image}
                      alt=""
                      loading="lazy"
                      className="size-16 shrink-0 rounded-xl object-cover object-top"
                    />
                    <div>
                      <p className="font-semibold leading-snug text-ink transition-colors group-hover:text-primary">
                        {post.title}
                      </p>
                      <p className="mt-1 text-sm text-faint">
                        {formatDate(post.date)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

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
          </Reveal>
        </div>
      </section>

      <BookingBand />
      <ContactSection />
      <FaqSection limit={4} />
      <Marquee />
    </>
  )
}
