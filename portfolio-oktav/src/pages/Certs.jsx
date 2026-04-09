import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight, Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const certCategories = [
  {
    name: 'Algorithme',
    icon: '🧮',
    certs: [
      { title: 'Algorithme et Programmation', org: 'Certification', date: '2025', color: 'from-cobalt to-blue-500' },
    ],
  },
  {
    name: 'Python',
    icon: '🐍',
    certs: [
      { title: 'Python Essentials', org: 'Certification Python', date: '2025', color: 'from-yellow-500 to-amber' },
      { title: 'Python Avancé', org: 'Certification Python', date: '2025', color: 'from-amber to-orange-500' },
    ],
  },
  {
    name: 'Frontend',
    icon: '🎨',
    certs: [
      { title: 'Responsive Web Design', org: 'freeCodeCamp', date: '2025', color: 'from-emerald-500 to-teal-400' },
    ],
  },
  {
    name: 'Web',
    icon: '🌐',
    certs: [
      { title: 'Programmation Web', org: 'Certification Web', date: '2025', color: 'from-purple-500 to-pink-400' },
    ],
  },
  {
    name: 'Machine Learning',
    icon: '🤖',
    certs: [
      { title: 'Machine Learning A', org: 'ML Certification', date: '2025', color: 'from-rose-500 to-red-400' },
      { title: 'Machine Learning B', org: 'ML Certification', date: '2025', color: 'from-red-400 to-orange-400' },
    ],
  },
  {
    name: 'SQL',
    icon: '🗄️',
    certs: [
      { title: 'SQL Fundamentals', org: 'Certification SQL', date: '2025', color: 'from-cyan-500 to-blue-400' },
    ],
  },
  {
    name: 'HackerRank',
    icon: '🏆',
    certs: [
      { title: 'Problem Solving Badge', org: 'HackerRank', date: '2025', color: 'from-green-600 to-emerald-500' },
      { title: 'JavaScript Badge', org: 'HackerRank', date: '2025', color: 'from-yellow-400 to-amber' },
      { title: 'Python Badge', org: 'HackerRank', date: '2025', color: 'from-blue-500 to-cobalt' },
    ],
  },
]

function CertCarousel({ certs }) {
  const [current, setCurrent] = useState(0)

  if (certs.length <= 1) {
    return (
      <div className={`rounded-2xl bg-gradient-to-br ${certs[0].color} p-8 lg:p-12 text-white min-h-[300px] flex flex-col justify-center`}>
        <Award className="w-12 h-12 mb-4 opacity-80" />
        <h3 className="text-2xl font-bold mb-2">{certs[0].title}</h3>
        <p className="text-white/70">{certs[0].org} · {certs[0].date}</p>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className={`rounded-2xl bg-gradient-to-br ${certs[current].color} p-8 lg:p-12 text-white min-h-[300px] flex flex-col justify-center transition-all duration-500`}>
        <Award className="w-12 h-12 mb-4 opacity-80" />
        <h3 className="text-2xl font-bold mb-2">{certs[current].title}</h3>
        <p className="text-white/70">{certs[current].org} · {certs[current].date}</p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + certs.length) % certs.length)}
          className="w-10 h-10 rounded-full bg-cobalt-light dark:bg-cloud flex items-center justify-center hover:bg-cobalt hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          {certs.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === current ? 'bg-cobalt w-6' : 'bg-cobalt/30 hover:bg-cobalt/50'
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % certs.length)}
          className="w-10 h-10 rounded-full bg-cobalt-light dark:bg-cloud flex items-center justify-center hover:bg-cobalt hover:text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

function CertSlide({ category, index, isActive }) {
  const slideRef = useRef(null)

  useEffect(() => {
    if (!slideRef.current || !isActive) return

    gsap.fromTo(slideRef.current,
      { opacity: 0, x: 60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power3.out',
      }
    )
  }, [isActive])

  return (
    <div ref={slideRef} className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Left: info */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{category.icon}</span>
          <div>
            <h2 className="text-3xl lg:text-4xl font-extrabold">{category.name}</h2>
            <p className="text-text-secondary dark:text-white/50">
              {category.certs.length} certification{category.certs.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <div className="w-16 h-1 bg-amber rounded-full" />
      </div>

      {/* Right: carousel / card */}
      <div>
        <CertCarousel certs={category.certs} />
      </div>
    </div>
  )
}

export default function Certs() {
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <div className="bg-ivory dark:bg-dark-deep">
      {/* Page header */}
      <div className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-5xl lg:text-7xl font-extrabold mb-4">
          <span className="text-cobalt">Certifications</span>
        </h1>
        <p className="text-lg text-text-secondary dark:text-white/50 italic max-w-2xl mx-auto">
          Les preuves concrètes de mes compétences techniques.
        </p>
      </div>

      {/* Full-screen slides */}
      <div className="relative">
        {certCategories.map((cat, i) => (
          <div
            key={cat.name}
            className={`transition-all duration-700 ${
              i === activeSlide ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
            }`}
          >
            <div className="min-h-[70vh] flex items-center px-6 lg:px-20">
              <CertSlide category={cat} index={i} isActive={i === activeSlide} />
            </div>
          </div>
        ))}
      </div>

      {/* Side dots nav */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
        {certCategories.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => setActiveSlide(i)}
            title={cat.name}
            className={`rounded-full transition-all duration-300 ${
              i === activeSlide
                ? 'w-3 h-3 bg-cobalt'
                : 'w-3 h-3 bg-cobalt/30 hover:bg-cobalt/60'
            }`}
          />
        ))}
      </div>

      {/* Bottom nav */}
      <div className="flex justify-center gap-4 pb-12 px-6">
        <button
          onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
          disabled={activeSlide === 0}
          className="px-6 py-3 rounded-full bg-cobalt-light dark:bg-cloud text-cobalt font-medium disabled:opacity-30 hover:bg-cobalt hover:text-white transition-all"
        >
          ← Précédent
        </button>
        <button
          onClick={() => setActiveSlide((prev) => Math.min(certCategories.length - 1, prev + 1))}
          disabled={activeSlide === certCategories.length - 1}
          className="px-6 py-3 rounded-full bg-cobalt text-white font-medium disabled:opacity-30 hover:bg-cobalt/80 transition-all"
        >
          Suivant →
        </button>
      </div>
    </div>
  )
}
