import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, MapPin, Send } from 'lucide-react'
import Button from '../components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  { year: '2020', title: 'Premiers pas en code', desc: 'Découverte de HTML/CSS et fascination pour le web.' },
  { year: '2021', title: 'JavaScript & React', desc: 'Premiers composants, premiers projets personnels.' },
  { year: '2022', title: 'Fullstack', desc: 'Node.js, bases de données, APIs — je construis des apps complètes.' },
  { year: '2023', title: 'Freelance', desc: 'Premiers clients — Koki\'s by Juju, LE TWIN, Excellence Team.' },
  { year: '2024', title: '3D & Animations', desc: 'Three.js, GSAP — le design devient immersif.' },
  { year: '2025', title: 'Machine Learning & IA', desc: 'Python, ML, RAG — la transition commence.' },
  { year: '2026', title: 'Fullstack × IA', desc: 'Ce portfolio — la preuve de compétence avant le saut vers la Data.' },
]

export default function About() {
  const introRef = useRef(null)
  const timelineRef = useRef(null)
  const contactRef = useRef(null)

  useEffect(() => {
    // Intro animation
    if (introRef.current) {
      gsap.fromTo(introRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
    }

    // Timeline stagger
    if (timelineRef.current) {
      const items = timelineRef.current.querySelectorAll('.timeline-item')
      items.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }

    // Contact section
    if (contactRef.current) {
      gsap.fromTo(contactRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
  }, [])

  return (
    <div className="bg-ivory dark:bg-dark-deep">
      {/* Page header */}
      <div className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-5xl lg:text-7xl font-extrabold mb-4">
          À <span className="text-cobalt">propos</span>
        </h1>
        <p className="text-lg text-text-secondary dark:text-white/50 italic max-w-2xl mx-auto">
          Plus que du code — une vision.
        </p>
      </div>

      {/* Bloc 1: Personal intro */}
      <div ref={introRef} className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Photo placeholder */}
          <div className="lg:col-span-2">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-cobalt to-blue-700 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-4xl">
                    👨‍💻
                  </div>
                  <p className="font-bold text-lg">Oktav Bahoun</p>
                  <p className="text-white/60 text-sm italic">Cotonou, Benin</p>
                </div>
              </div>
              {/* Decorative circles */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-white/5" />
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-3 space-y-6">
            <h2 className="text-3xl lg:text-4xl font-extrabold">
              Qui suis-je{' '}
              <span className="text-cobalt">vraiment</span> ?
            </h2>
            <div className="space-y-4 text-text-secondary dark:text-white/50 leading-relaxed text-lg">
              <p>
                Je suis Oktav — un <strong className="text-cobalt">Fullstack Engineer</strong> tombé dans la marmite du web par curiosité, et qui y est resté par passion.
              </p>
              <p>
                Mon approche ? <em>Construire des choses belles ET fonctionnelles.</em> Pas juste du code qui marche — du code qui donne envie de l'utiliser.
              </p>
              <p>
                Aujourd'hui, je fais ma transition vers <strong className="text-amber">l'IA et la Data</strong>. Pas pour abandonner le dev — mais pour le sublimer. Un ingénieur qui comprend l'IA, c'est un super-pouvoir.
              </p>
              <p>
                Basé à <MapPin className="w-4 h-4 inline text-cobalt" /> Cotonou, disponible partout.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bloc 2: Timeline */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-center mb-16">
          Mon <span className="text-cobalt">Parcours</span>
        </h2>

        <div ref={timelineRef} className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-cobalt/20 hidden lg:block" />

          {timeline.map((item, i) => (
            <div
              key={item.year}
              className={`timeline-item relative flex flex-col lg:flex-row items-center gap-6 mb-12 ${
                i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className={`flex-1 ${i % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                <div className={`p-6 rounded-2xl bg-white dark:bg-dark-deep border border-cobalt/5 shadow-md hover:shadow-lg transition-shadow`}>
                  <span className="text-xs font-mono text-amber font-bold">{item.year}</span>
                  <h3 className="text-xl font-bold mt-1 mb-2">{item.title}</h3>
                  <p className="text-sm text-text-secondary dark:text-white/50">{item.desc}</p>
                </div>
              </div>

              {/* Dot */}
              <div className="relative z-10 w-4 h-4 rounded-full bg-cobalt shadow-lg shadow-cobalt/30 flex-shrink-0 hidden lg:block" />

              {/* Empty half */}
              <div className="flex-1 hidden lg:block" />
            </div>
          ))}
        </div>
      </div>

      {/* Status + Contact */}
      <div ref={contactRef} className="max-w-3xl mx-auto px-6 py-16">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-dark to-dark-deep" />
          <div className="relative p-10 lg:p-16 text-center text-white space-y-8">
            {/* Status */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber/20 rounded-full text-amber text-sm font-medium">
              <span className="w-2 h-2 bg-amber rounded-full animate-pulse" />
              Réservé — Disponible pour freelance & projets
            </div>

            <h2 className="text-3xl lg:text-4xl font-extrabold">
              Travaillons ensemble
            </h2>
            <p className="text-white/60 italic max-w-md mx-auto">
              Un projet ? Une idée ? Juste envie de discuter tech ? Je réponds toujours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a href="mailto:oktav@example.com">
                <Button variant="cta" className="gap-2">
                  <Mail className="w-4 h-4" /> oktav@example.com
                </Button>
              </a>
              <Button className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 gap-2">
                <Send className="w-4 h-4" /> WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
