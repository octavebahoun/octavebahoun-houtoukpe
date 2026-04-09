import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Clock, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const posts = [
  {
    id: 1,
    title: 'Construire un RAG pour mon portfolio — Retours d\'expérience',
    excerpt: 'Comment j\'ai intégré un assistant IA connaissant chaque détail de mon travail. Stack Node.js + Pinecone + Groq.',
    category: 'IA',
    date: '5 Avr 2026',
    readTime: '8 min',
    featured: true,
    color: 'from-cobalt to-blue-600',
  },
  {
    id: 2,
    title: 'Pourquoi j\'ai choisi Render plutôt que Vercel pour le backend',
    excerpt: 'Serverless vs serveur persistant : le match qui a déterminé l\'architecture de mon portfolio.',
    category: 'Fullstack',
    date: '2 Avr 2026',
    readTime: '5 min',
    featured: false,
    color: 'from-amber to-orange-400',
  },
  {
    id: 3,
    title: 'GSAP ScrollTrigger : animer un blob SVG au scroll',
    excerpt: 'Technique pas à pas pour créer l\'effet de rivière organique sur ma page Projects.',
    category: 'Devlog',
    date: '28 Mar 2026',
    readTime: '6 min',
    featured: false,
    color: 'from-emerald-500 to-teal-400',
  },
  {
    id: 4,
    title: 'De la transition dev vers la Data & IA',
    excerpt: 'Réflexions sur mon parcours, ce que j\'ai appris, et où je veux aller.',
    category: 'Réflexion',
    date: '20 Mar 2026',
    readTime: '10 min',
    featured: false,
    color: 'from-purple-500 to-pink-400',
  },
  {
    id: 5,
    title: 'PWA StudyNotes : offline-first avec React',
    excerpt: 'Stratégies de cache, Service Workers et sync pour une app de notes qui fonctionne sans réseau.',
    category: 'Fullstack',
    date: '15 Mar 2026',
    readTime: '7 min',
    featured: false,
    color: 'from-cyan-500 to-blue-400',
  },
  {
    id: 6,
    title: 'Three.js dans un portfolio — bonne ou mauvaise idée ?',
    excerpt: 'Retour sur l\'intégration de scènes 3D pour Excellence Team : perf, fallback, accessibilité.',
    category: 'Devlog',
    date: '10 Mar 2026',
    readTime: '4 min',
    featured: false,
    color: 'from-rose-500 to-red-400',
  },
]

const filters = ['Tout', 'Devlog', 'IA', 'Fullstack', 'Réflexion']

function BlogCard({ post, index, isFeatured }) {
  const cardRef = useRef(null)

  useEffect(() => {
    if (!cardRef.current) return
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        delay: index * 0.1,
      }
    )
  }, [index])

  if (isFeatured) {
    return (
      <article
        ref={cardRef}
        className="group md:col-span-2 rounded-2xl overflow-hidden bg-white dark:bg-dark-deep border border-cobalt/5 shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <div className="grid md:grid-cols-2">
          <div className={`h-64 md:h-auto bg-gradient-to-br ${post.color} relative`}>
            <div className="absolute top-6 left-6">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                ★ Featured
              </span>
            </div>
          </div>
          <div className="p-8 flex flex-col justify-center space-y-4">
            <div className="flex items-center gap-3 text-sm text-text-secondary dark:text-white/40">
              <span className="px-2.5 py-0.5 bg-cobalt-light dark:bg-cloud text-cobalt rounded-full font-mono text-xs">{post.category}</span>
              <span>{post.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
            </div>
            <h3 className="text-2xl font-bold leading-tight group-hover:text-cobalt transition-colors">
              {post.title}
            </h3>
            <p className="text-text-secondary dark:text-white/50 leading-relaxed">
              {post.excerpt}
            </p>
            <a href="#" className="inline-flex items-center gap-2 text-cobalt font-semibold hover:text-amber transition-colors group/link">
              Lire l'article <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article
      ref={cardRef}
      className="group rounded-2xl overflow-hidden bg-white dark:bg-dark-deep border border-cobalt/5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className={`h-40 bg-gradient-to-br ${post.color} relative`}>
        <div className="absolute inset-0 bg-black/5" />
      </div>
      <div className="p-6 space-y-3">
        <div className="flex items-center gap-3 text-xs text-text-secondary dark:text-white/40">
          <span className="px-2.5 py-0.5 bg-cobalt-light dark:bg-cloud text-cobalt rounded-full font-mono">{post.category}</span>
          <span>{post.date}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
        </div>
        <h3 className="text-lg font-bold leading-snug group-hover:text-cobalt transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-text-secondary dark:text-white/50 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
        <a href="#" className="inline-flex items-center gap-1.5 text-cobalt text-sm font-semibold hover:text-amber transition-colors group/link">
          Lire <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </article>
  )
}

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState('Tout')

  const filtered = activeFilter === 'Tout'
    ? posts
    : posts.filter((p) => p.category === activeFilter)

  return (
    <div className="bg-ivory dark:bg-dark-deep">
      {/* Page header */}
      <div className="pt-32 pb-12 px-6 text-center">
        <h1 className="text-5xl lg:text-7xl font-extrabold mb-4">
          Le <span className="text-cobalt">Blog</span>
        </h1>
        <p className="text-lg text-text-secondary dark:text-white/50 italic max-w-2xl mx-auto">
          Devlogs, réflexions IA, et coulisses du code.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 px-6 mb-12">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === f
                ? 'bg-cobalt text-white shadow-lg shadow-cobalt/25'
                : 'bg-cobalt-light dark:bg-cloud text-cobalt hover:bg-cobalt hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-8">
          {filtered.map((post, i) => (
            <BlogCard
              key={post.id}
              post={post}
              index={i}
              isFeatured={post.featured && activeFilter === 'Tout'}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
