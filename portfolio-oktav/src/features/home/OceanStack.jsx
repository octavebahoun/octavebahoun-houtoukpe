import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const techs = [
  { name: 'React', icon: '⚛️' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Python', icon: '🐍' },
  { name: 'Three.js', icon: '🔺' },
  { name: 'Laravel', icon: '🔴' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Groq IA', icon: '🤖' },
  { name: 'Framer', icon: '💎' },
  { name: 'GSAP', icon: '✨' },
  { name: 'Tailwind', icon: '🌊' },
  { name: 'Vite', icon: '⚡' },
]

function Wave({ d, color, speed, delay }) {
  const pathRef = useRef(null)

  useEffect(() => {
    if (!pathRef.current) return
    const el = pathRef.current
    gsap.fromTo(el,
      { attr: { d } },
      {
        attr: {
          d: d.replace(/Q\s*([\d.]+)\s*([\d.]+)\s*([\d.]+)\s*([\d.]+)/g, (m, x1, y1, x2, y2) => {
            return `Q ${parseFloat(x1) + 30} ${parseFloat(y1) - 10} ${x2} ${y2}`
          })
        },
        duration: speed,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay,
      }
    )
  }, [d, speed, delay])

  return (
    <path
      ref={pathRef}
      d={d}
      fill={color}
      opacity="0.15"
    />
  )
}

function Boat({ tech, x, delay }) {
  const boatRef = useRef(null)

  useEffect(() => {
    if (!boatRef.current) return
    const el = boatRef.current
    gsap.fromTo(el,
      { y: 0, rotation: 0 },
      {
        y: -15,
        rotation: 5,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay,
      }
    )
    gsap.to(el, {
      x: `+=${Math.random() * 40 - 20}`,
      duration: 6 + Math.random() * 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: delay + 1,
    })
  }, [delay])

  return (
    <g ref={boatRef} transform={`translate(${x}, 0)`}>
      {/* Boat hull */}
      <path d="M-25,5 Q-20,18 0,18 Q20,18 25,5 L20,-5 L-20,-5 Z" fill="#2563EB" opacity="0.9" />
      {/* Mast */}
      <line x1="0" y1="-5" x2="0" y2="-35" stroke="#1a1a2e" strokeWidth="2" />
      {/* Sail */}
      <path d="M0,-33 Q15,-20 0,-7 Z" fill="#F59E0B" opacity="0.8" />
      {/* Tech label */}
      <rect x="-28" y="-55" width="56" height="18" rx="9" fill="#DBEAFE" opacity="0.9" />
      <text x="0" y="-42" textAnchor="middle" fontSize="9" fontWeight="700" fill="#2563EB" fontFamily="monospace">
        {tech.icon} {tech.name}
      </text>
    </g>
  )
}

export default function OceanStack() {
  const svgRef = useRef(null)
  const starsRef = useRef(null)

  useEffect(() => {
    // Star twinkle
    if (starsRef.current?.children) {
      Array.from(starsRef.current.children).forEach((star, i) => {
        gsap.fromTo(star,
          { opacity: 0.2 },
          {
            opacity: 1,
            duration: 1 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 3,
          }
        )
      })
    }

    // Moon glow
    const moon = document.getElementById('moon')
    if (moon) {
      gsap.fromTo(moon,
        { attr: { r: 28 } },
        {
          attr: { r: 32 },
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        }
      )
    }
  }, [])

  const waves = [
    {
      d: 'M0,120 Q180,80 360,120 T720,120 T1080,120 T1440,120 V200 H0 Z',
      color: '#2563EB',
      speed: 3,
      delay: 0,
    },
    {
      d: 'M0,140 Q200,110 400,140 T800,140 T1200,140 T1600,140 V200 H0 Z',
      color: '#1e40af',
      speed: 4,
      delay: 0.5,
    },
    {
      d: 'M0,160 Q220,130 440,160 T880,160 T1320,160 T1760,160 V200 H0 Z',
      color: '#1e3a8a',
      speed: 3.5,
      delay: 1,
    },
  ]

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-4">
            Mon <span className="text-cobalt">Skills Stack</span>
          </h2>
          <p className="text-text-secondary dark:text-white/50 italic">
            Chaque techno est un bateau qui navigue sur l'océan du savoir
          </p>
        </div>

        {/* Ocean SVG Scene */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-cobalt/10">
          <svg
            ref={svgRef}
            viewBox="0 0 1440 350"
            className="w-full"
            style={{ background: 'linear-gradient(180deg, #0d1b2a 0%, #1a2d42 40%, #1e3a8a 100%)' }}
          >
            {/* Stars */}
            <g ref={starsRef}>
              {Array.from({ length: 40 }).map((_, i) => (
                <circle
                  key={i}
                  cx={Math.random() * 1440}
                  cy={Math.random() * 120}
                  r={Math.random() * 1.5 + 0.5}
                  fill="white"
                />
              ))}
            </g>

            {/* Moon */}
            <circle id="moon" cx="1300" cy="60" r="30" fill="#F59E0B" opacity="0.8" />
            <circle cx="1310" cy="52" r="28" fill="#0d1b2a" />

            {/* Boats on waves */}
            <g transform="translate(0, 110)">
              {techs.map((tech, i) => (
                <Boat
                  key={tech.name}
                  tech={tech}
                  x={80 + i * 115}
                  delay={i * 0.3}
                />
              ))}
            </g>

            {/* Waves */}
            {waves.map((w, i) => (
              <Wave key={i} {...w} />
            ))}

            {/* Search status text */}
            <text
              x="720"
              y="310"
              textAnchor="middle"
              fontSize="14"
              fill="rgba(255,255,255,0.5)"
              fontFamily="Inter, system-ui"
              fontStyle="italic"
            >
              ⚓ En recherche de nouvelles opportunités
            </text>
          </svg>
        </div>
      </div>
    </section>
  )
}
