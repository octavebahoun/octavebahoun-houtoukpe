import { Link } from 'react-router-dom'
import { usePosts } from '../hooks/usePosts'
import { formatDate } from '../lib/format'
import { Sparkle } from './icons'
import { Reveal, Stagger, StaggerItem } from './Reveal'

export default function BlogTeaser() {
  const posts = usePosts()
  const recent = posts.slice(0, 3)

  return (
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

      <Stagger className="mt-12 grid gap-8 lg:grid-cols-3">
        {recent.map((post) => (
          <StaggerItem key={post.slug}>
            <Link to={`/blog/${post.slug}`} className="group block">
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
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.1} className="mt-12 text-center">
        <Link
          to="/blog"
          className="inline-block rounded-full border-2 border-ink px-8 py-3.5 font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
        >
          Voir tous les articles
        </Link>
      </Reveal>
    </section>
  )
}
