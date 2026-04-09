import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { useMouseTilt } from '../hooks/useMouseTilt'
import Badge from '../components/ui/Badge'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: 'StudyNotes',
    desc: 'Application PWA de prise de notes intelligente alimentée par IA (Groq). Permet aux étudiants de créer, organiser et retrouver leurs notes grâce au NLP. Sync offline-first, export PDF.',
    stack: ['React', 'Node.js', 'Groq', 'PWA'],
    gradient: 'from-emerald-500 to-teal-400',
    slug: 'studynotes',
    link: '#',
  },
  {
    id: 2,
    title: 'LE TWIN',
    desc: 'Plateforme communautaire moderne avec authentification Laravel Sanctum, animations fluides via Framer Motion. Dashboard utilisateur, feed temps réel, messagerie.',
    stack: ['React', 'Laravel Sanctum', 'Framer Motion'],
    gradient: 'from-amber to-orange-400',
    slug: 'le-twin',
    link: '#',
  },
  {
    id: 3,
    title: 'Excellence Team',
    desc: 'Site vitrine immersif avec scène Three.js 3D, animations avancées Framer Motion. Design premium pour une équipe de consulting.',
    stack: ['React', 'Three.js', 'Framer Motion'],
    gradient: 'from-purple-500 to-pink-400',
    slug: 'excellence-team',
    link: '#',
  },
  {
    id: 4,
    title: "Koki's by Juju",
    desc: 'Site éditorial au design soigné, HTML/CSS vanilla et JavaScript pur. Mise en page magazine, galerie, animations CSS subtiles.',
    stack: ['HTML/CSS', 'Vanilla JS', 'Editorial'],
    gradient: 'from-cobalt to-blue-400',
    slug: 'kokis-by-juju',
    link: '#',
  },
]

function ProjectItem({ project, index }) {
  const cardRef = useRef(null)
  const infoRef = useRef(null)
  const isEven = index % 2 === 0
  const { ref: tiltRef, style, handlers } = useMouseTilt(8)

  useEffect(() => {
    if (!cardRef.current || !infoRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current.closest('.project-row'),
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    tl.fromTo(cardRef.current,
      { opacity: 0, x: isEven ? -80 : 80 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
      0
    ).fromTo(infoRef.current,
      { opacity: 0, x: isEven ? 80 : -80 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
      0.15
    )

    return () => tl.scrollTrigger?.kill()
  }, [isEven])

  return (
    <div className="project-row relative py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>
          {/* Card */}
          <div className="flex-1 w-full" ref={cardRef}>
            <div
              ref={(node) => { tiltRef.current = node }}
              style={style}
              {...handlers}
              className="group relative rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-dark-deep border border-cobalt/5"
            >
              <div className={`h-56 lg:h-72 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/5" />
                <div className="absolute top-6 left-6">
                  <span className="text-white/60 text-sm font-mono">0{project.id}</span>
                </div>
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowUpRight className="w-6 h-6 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/40 to-transparent">
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-6" ref={infoRef}>
            <span className="text-xs font-mono text-amber font-bold tracking-widest uppercase">Projet 0{project.id}</span>
            <h3 className="text-3xl lg:text-4xl font-extrabold">{project.title}</h3>
            <p className="text-text-sec dark:text-white/50 leading-relaxed text-lg">
              {project.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <a
              href={project.link}
              className="inline-flex items-center gap-2 text-cobalt font-semibold hover:text-amber transition-colors group/link"
            >
              Voir le détail
              <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const containerRef = useRef(null)
  const riverRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    // Header animation
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      )
    }

    // River draw on scroll via stroke-dashoffset
    if (riverRef.current) {
      const paths = riverRef.current.querySelectorAll('.river-path')
      paths.forEach((path) => {
        const len = path.getTotalLength()
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      })
    }

    // Floating leaves/particles on the river
    const particles = document.querySelectorAll('.river-particle')
    particles.forEach((p, i) => {
      gsap.to(p, {
        x: `+=${20 + Math.random() * 40}`,
        y: `+=${10 + Math.random() * 15}`,
        rotation: Math.random() * 360,
        duration: 3 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.4,
      })
    })
  }, [])

  return (
    <div className="bg-ivory dark:bg-dark-deep relative overflow-hidden">
      {/* Page header */}
      <div ref={headerRef} className="pt-32 pb-20 px-6 text-center relative z-10">
        <h1 className="text-5xl lg:text-7xl font-extrabold mb-4">
          Mes <span className="text-cobalt">Projets</span>
        </h1>
        <p className="text-lg text-text-sec dark:text-white/50 italic max-w-2xl mx-auto">
          Chaque projet est une histoire — de la conception au déploiement.
        </p>
        <div className="w-20 h-1 bg-amber mx-auto mt-6 rounded-full" />
      </div>

      {/* ===== RIVER SVG — full width, serpentine top→bottom ===== */}
      <div
        ref={riverRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 3600"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* River gradient cobalt → amber */}
            <linearGradient id="riverGrad" x1="720" y1="0" x2="720" y2="3600" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="35%" stopColor="#7c3aed" />
              <stop offset="70%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            {/* River shimmer */}
            <linearGradient id="riverShimmer" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="50%" stopColor="white" stopOpacity="0.15" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            {/* Blur filter */}
            <filter id="riverBlur">
              <feGaussianBlur stdDeviation="12" />
            </filter>
          </defs>

          {/* Wide blurred river (outer glow) */}
          <path
            className="river-path"
            d="M 200,-50
               C 400,100  600,200  720,400
               C 840,600  1000,700  1100,900
               C 1200,1100 1000,1300 800,1400
               C 600,1500  300,1500  250,1700
               C 200,1900  400,2100  600,2200
               C 800,2300  1100,2400 1150,2600
               C 1200,2800 900,3000  700,3100
               C 500,3200  300,3400  400,3600
               L 500,3650
               C 400,3450  600,3250  800,3150
               C 1000,3050 1300,2850 1250,2650
               C 1200,2450 900,2350  700,2250
               C 500,2150  100,1950  150,1750
               C 200,1550  500,1550  700,1450
               C 900,1350 1100,1150 1000,950
               C 900,750  740,650  620,450
               C 500,250  300,100  100,-50 Z"
            fill="url(#riverGrad)"
            opacity="0.07"
            filter="url(#riverBlur)"
          />

          {/* Main river body */}
          <path
            className="river-path"
            d="M 200,-50
               C 400,100  600,200  720,400
               C 840,600  1000,700  1100,900
               C 1200,1100 1000,1300 800,1400
               C 600,1500  300,1500  250,1700
               C 200,1900  400,2100  600,2200
               C 800,2300  1100,2400 1150,2600
               C 1200,2800 900,3000  700,3100
               C 500,3200  300,3400  400,3600
               L 500,3650
               C 400,3450  600,3250  800,3150
               C 1000,3050 1300,2850 1250,2650
               C 1200,2450 900,2350  700,2250
               C 500,2150  100,1950  150,1750
               C 200,1550  500,1550  700,1450
               C 900,1350 1100,1150 1000,950
               C 900,750  740,650  620,450
               C 500,250  300,100  100,-50 Z"
            fill="url(#riverGrad)"
            opacity="0.12"
          />

          {/* River center line */}
          <path
            className="river-path"
            d="M 720,400
               C 840,600  1000,700  1100,900
               C 1200,1100 1000,1300 800,1400
               C 600,1500  300,1500  250,1700
               C 200,1900  400,2100  600,2200
               C 800,2300  1100,2400 1150,2600
               C 1200,2800 900,3000  700,3100
               C 500,3200  300,3400  400,3600"
            stroke="url(#riverGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.25"
          />

          {/* Shimmer overlay on river */}
          <path
            className="river-path"
            d="M 200,-50
               C 400,100  600,200  720,400
               C 840,600  1000,700  1100,900
               C 1200,1100 1000,1300 800,1400
               C 600,1500  300,1500  250,1700
               C 200,1900  400,2100  600,2200
               C 800,2300  1100,2400 1150,2600
               C 1200,2800 900,3000  700,3100
               C 500,3200  300,3400  400,3600
               L 500,3650
               C 400,3450  600,3250  800,3150
               C 1000,3050 1300,2850 1250,2650
               C 1200,2450 900,2350  700,2250
               C 500,2150  100,1950  150,1750
               C 200,1550  500,1550  700,1450
               C 900,1350 1100,1150 1000,950
               C 900,750  740,650  620,450
               C 500,250  300,100  100,-50 Z"
            fill="url(#riverShimmer)"
            opacity="0.08"
          />
        </svg>

        {/* Floating particles on the river */}
        <div className="river-particle absolute" style={{ top: '11%', left: '55%' }}>
          <div className="w-2 h-2 rounded-full bg-cobalt/30" />
        </div>
        <div className="river-particle absolute" style={{ top: '25%', left: '75%' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500/25" />
        </div>
        <div className="river-particle absolute" style={{ top: '39%', left: '55%' }}>
          <div className="w-2 h-2 rounded-full bg-amber/25" />
        </div>
        <div className="river-particle absolute" style={{ top: '47%', left: '20%' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-cobalt/20" />
        </div>
        <div className="river-particle absolute" style={{ top: '61%', left: '42%' }}>
          <div className="w-2 h-2 rounded-full bg-orange-400/25" />
        </div>
        <div className="river-particle absolute" style={{ top: '72%', left: '80%' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-amber/20" />
        </div>
        <div className="river-particle absolute" style={{ top: '86%', left: '50%' }}>
          <div className="w-2 h-2 rounded-full bg-cobalt/25" />
        </div>
      </div>

      {/* Projects */}
      <div ref={containerRef} className="relative z-10">
        {projects.map((p, i) => (
          <ProjectItem key={p.id} project={p} index={i} />
        ))}
      </div>
    </div>
  )
}
