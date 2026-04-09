import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Button from '../../components/ui/Button'
import { useMouseTilt } from '../../hooks/useMouseTilt'
import { useScrollAnim } from '../../hooks/useScrollAnim'

const projects = [
  {
    id: 1,
    title: "Koki's by Juju",
    desc: 'Site éditorial — HTML/CSS, Vanilla JS',
    tags: ['HTML/CSS', 'Vanilla JS', 'Editorial'],
    gradient: 'from-cobalt to-blue-400',
    slug: 'kokis-by-juju',
  },
  {
    id: 2,
    title: 'LE TWIN',
    desc: 'Plateforme React — Laravel Sanctum, Framer Motion',
    tags: ['React', 'Laravel Sanctum', 'Framer Motion'],
    gradient: 'from-amber to-orange-400',
    slug: 'le-twin',
  },
  {
    id: 3,
    title: 'StudyNotes',
    desc: 'App PWA — React, Node.js, Groq IA',
    tags: ['React', 'Node.js', 'Groq', 'PWA'],
    gradient: 'from-emerald-500 to-teal-400',
    slug: 'studynotes',
  },
]

function ProjectCard({ project, index }) {
  const { ref, style, handlers } = useMouseTilt(12)
  const { ref: animRef } = useScrollAnim('fadeUp')

  return (
    <div
      ref={(node) => {
        ref.current = node
        animRef.current = node
      }}
      style={style}
      {...handlers}
      className="group cursor-pointer"
    >
      <div className="relative rounded-2xl overflow-hidden shadow-xl border border-cobalt/5 bg-white dark:bg-dark-deep transition-shadow duration-300 hover:shadow-2xl hover:shadow-cobalt/10">
        {/* Banner */}
        <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-white/80 text-xs font-mono">0{index + 1}</span>
          </div>
          {/* Floating icon */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <ArrowUpRight className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <h3 className="text-lg font-bold">{project.title}</h3>
          <p className="text-sm text-text-secondary dark:text-white/50">{project.desc}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-0.5 bg-cobalt-light dark:bg-cloud text-cobalt rounded-full text-xs font-mono">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SelectedWork() {
  const { ref: titleRef } = useScrollAnim('fadeUp')

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-4">
            Découvrez moi à travers{' '}
            <span className="text-cobalt">mes projets</span> !
          </h2>
          <div className="w-20 h-1 bg-amber mx-auto rounded-full" />
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-12">
          <Link to="/projects">
            <Button variant="outline" className="gap-2">
              Voir tous les projets <ArrowUpRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
