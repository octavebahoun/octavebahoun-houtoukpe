import { motion } from 'motion/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { prefetchProps } from '../lib/routes'
import { ArrowUpRight, Star } from './icons'
import { EASE_EXPO } from '../lib/easing'

export function ProjectCover({ project, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (failed || !project.image) {
    return (
      <div
        className={`flex items-end bg-night p-6 ${className}`}
        style={{ backgroundImage: `radial-gradient(circle at 25% 20%, ${project.accent ?? '#fe4619'}55, transparent 60%)` }}
      >
        <span className="display text-4xl text-white">{project.title}</span>
      </div>
    )
  }

  return (
    <img
      src={project.image}
      alt={`Aperçu de ${project.title}`}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover object-top ${className}`}
    />
  )
}

// `ref` est transmis par AnimatePresence (mode popLayout) pour mesurer la carte
export default function ProjectCard({ project, index = 0, ref }) {
  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, ease: EASE_EXPO, delay: Math.min(index, 6) * 0.05 }}
    >
      <Link to={`/projects/${project.slug}`} className="group block" {...prefetchProps('/projects/x')}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] border border-line bg-card">
          <ProjectCover
            project={project}
            className="size-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.045]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute top-4 right-4 flex size-11 scale-75 items-center justify-center rounded-full bg-primary text-white opacity-0 shadow-lift transition-all duration-500 ease-out-expo group-hover:scale-100 group-hover:opacity-100">
            <ArrowUpRight className="size-5" />
          </span>
          {project.status && (
            <span className="absolute bottom-4 left-4 rounded-full bg-night/75 px-3 py-1 font-mono text-[11px] text-white backdrop-blur">
              {project.status}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-2xl font-bold tracking-tight transition-colors group-hover:text-primary-ink">
              {project.title}
            </h3>
            <p className="mt-1.5 text-[15px] leading-snug">{project.subtitle}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5 pt-1">
            <span className="font-mono text-xs text-faint">{project.year}</span>
            {project.stars > 0 && (
              <span className="flex items-center gap-1 font-mono text-xs text-faint">
                <Star className="size-3" /> {project.stars}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <span key={tech} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
              {tech}
            </span>
          ))}
        </div>
      </Link>
    </motion.article>
  )
}
