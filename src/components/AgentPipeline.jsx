import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { cx } from '../lib/cx'
import { Pause, Play, Terminal } from './icons'
import { Reveal } from './Reveal'
import { EASE_EXPO } from '../lib/easing'
import { Accent } from './ui/Bits'
import { TextLink } from './ui/Button'
import { SectionHeading } from './ui/SectionHeading'

// Les six agents de Video Remix Studio (voir l'article de blog)
const steps = [
  {
    name: 'Intent',
    model: 'Llama 70B',
    fallback: 'repli regex',
    text: '« edit sombre avec flashs » devient un objet structuré : ambiance, personnage, couleur, effets, BPM cible, durée.',
    log: 'intent     mood=dark · effects=[flash] · bpm≈128 · 30 s',
  },
  {
    name: 'Retriever',
    model: 'Llama 8B',
    fallback: 'repli vecteur',
    text: 'Recherche hybride dans LanceDB : embedding SigLIP + filtres objets et couleur. 50 plans candidats.',
    log: 'retriever  50 candidats · SigLIP + filtres couleur',
  },
  {
    name: 'Analyzer',
    model: 'Llama 70B',
    fallback: 'scoring pondéré',
    text: 'Note le style, le mouvement, la couleur et la rareté de chaque plan — et garde les 15 meilleurs.',
    log: 'analyzer   top 15 retenus · score moyen 0,82',
  },
  {
    name: 'Planner',
    model: 'Claude 3.5',
    fallback: 'repli déterministe',
    text: 'Le cœur : ordonne les plans pour raconter, cale chaque coupe sur le beat (calme → 1,8 s, drop → 0,5 s), évite les répétitions.',
    log: 'planner    timeline de 24 plans · coupes calées sur les beats',
  },
  {
    name: 'Editor',
    model: 'DeepSeek',
    fallback: 'template',
    text: 'Une seule commande FFmpeg filter_complex : découpe, recadrage 9:16, vitesse, effets, concaténation, mixage audio.',
    log: 'editor     ffmpeg filter_complex → out.mp4 (9:16, 30 fps)',
  },
  {
    name: 'Validator',
    model: 'Llama 8B',
    fallback: 'métadonnées',
    text: 'ffprobe vérifie durée, fluidité et synchro → score sur 100. Sous 70, retour au Planner (3 essais max).',
    log: 'validator  score 86/100 ✓ synchro OK',
  },
]

const NODE_W = 128
const NODE_H = 62
const GAP = 34
const START_X = 26
const ROW_Y = 150
const centers = steps.map((_, index) => START_X + index * (NODE_W + GAP) + NODE_W / 2)

function Diagram({ active, onSelect }) {
  const loopStart = centers[5]
  const loopEnd = centers[3]

  return (
    <svg viewBox="0 0 1000 330" className="w-full" role="img" aria-label="Schéma du pipeline multi-agent">
      <defs>
        <pattern id="pipeline-dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="rgb(255 255 255 / 0.07)" />
        </pattern>
        <marker id="pipeline-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 10 5 0 10z" fill="#fe4619" />
        </marker>
      </defs>
      <rect width="1000" height="330" fill="url(#pipeline-dots)" />

      {/* Entrée */}
      <text x={centers[0] - NODE_W / 2} y="56" fill="rgb(255 255 255 / 0.45)" fontSize="12" fontFamily="var(--font-mono)">
        $ vrs edit
      </text>
      <text x={centers[0] - NODE_W / 2} y="76" fill="#fff" fontSize="14" fontWeight="600">
        « edit sombre avec flashs »
      </text>
      <path d={`M${centers[0]} 88 V${ROW_Y - 6}`} stroke="rgb(255 255 255 / 0.25)" strokeWidth="1.5" strokeDasharray="3 5" markerEnd="url(#pipeline-arrow)" />

      {/* Boucle de correction */}
      <path
        d={`M${loopStart} ${ROW_Y - 4} C${loopStart} 70, ${loopEnd} 70, ${loopEnd} ${ROW_Y - 4}`}
        fill="none"
        stroke={active === 5 ? '#fe4619' : 'rgb(255 255 255 / 0.18)'}
        strokeWidth="1.5"
        strokeDasharray="5 6"
        className={active === 5 ? 'animate-dash' : undefined}
        markerEnd="url(#pipeline-arrow)"
      />
      <rect x={(loopStart + loopEnd) / 2 - 62} y="74" width="124" height="24" rx="12" fill="#1e1e1c" stroke="rgb(255 255 255 / 0.1)" />
      <text x={(loopStart + loopEnd) / 2} y="90" fill="rgb(255 255 255 / 0.6)" fontSize="11" textAnchor="middle" fontFamily="var(--font-mono)">
        score &lt; 70 → retry
      </text>

      {/* Liaisons */}
      {steps.slice(0, -1).map((step, index) => {
        const x1 = centers[index] + NODE_W / 2
        const x2 = centers[index + 1] - NODE_W / 2
        const lit = active > index
        return (
          <g key={step.name}>
            <line x1={x1} y1={ROW_Y + NODE_H / 2} x2={x2 - 4} y2={ROW_Y + NODE_H / 2} stroke="rgb(255 255 255 / 0.14)" strokeWidth="2" />
            {lit && (
              <line
                x1={x1}
                y1={ROW_Y + NODE_H / 2}
                x2={x2 - 4}
                y2={ROW_Y + NODE_H / 2}
                stroke="#fe4619"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="3 9"
                className="animate-dash"
              />
            )}
          </g>
        )
      })}

      {/* LanceDB : le seul point de rencontre entre l'indexation et les agents */}
      <path d={`M${centers[1]} ${ROW_Y + NODE_H + 4} V258`} stroke="rgb(255 255 255 / 0.22)" strokeWidth="1.5" strokeDasharray="3 5" />
      <g transform={`translate(${centers[1] - 46} 258)`}>
        <ellipse cx="46" cy="8" rx="46" ry="8" fill="#1e1e1c" stroke="rgb(255 255 255 / 0.18)" />
        <path d="M0 8 V40 A46 8 0 0 0 92 40 V8" fill="#1e1e1c" stroke="rgb(255 255 255 / 0.18)" />
        <text x="46" y="33" fill="rgb(255 255 255 / 0.7)" fontSize="12" textAnchor="middle" fontFamily="var(--font-mono)">
          LanceDB
        </text>
      </g>
      <text x={centers[1] + 56} y="290" fill="rgb(255 255 255 / 0.35)" fontSize="11" fontFamily="var(--font-mono)">
        index local · SigLIP 768-d
      </text>

      {/* Sortie */}
      <path d={`M${centers[5]} ${ROW_Y + NODE_H + 4} V250`} stroke="rgb(255 255 255 / 0.25)" strokeWidth="1.5" strokeDasharray="3 5" markerEnd="url(#pipeline-arrow)" />
      <text x={centers[5]} y="276" fill="#fff" fontSize="14" fontWeight="600" textAnchor="middle">
        out.mp4
      </text>
      <text x={centers[5]} y="295" fill="rgb(255 255 255 / 0.45)" fontSize="11" textAnchor="middle" fontFamily="var(--font-mono)">
        9:16 · calé sur les beats
      </text>

      {/* Halo de l'agent actif */}
      <motion.rect
        y={ROW_Y - 7}
        width={NODE_W + 14}
        height={NODE_H + 14}
        rx="21"
        fill="rgb(254 70 25 / 0.14)"
        stroke="rgb(254 70 25 / 0.45)"
        initial={false}
        animate={{ x: centers[active] - NODE_W / 2 - 7 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      />

      {/* Nœuds */}
      {steps.map((step, index) => {
        const x = centers[index] - NODE_W / 2
        const isActive = index === active
        const done = index < active
        return (
          <g
            key={step.name}
            onClick={() => onSelect(index)}
            className="cursor-pointer"
            role="button"
            aria-label={`Agent ${step.name}`}
          >
            <rect
              x={x}
              y={ROW_Y}
              width={NODE_W}
              height={NODE_H}
              rx="15"
              fill={isActive ? '#fe4619' : '#1b1b19'}
              stroke={isActive ? '#fe4619' : done ? 'rgb(254 70 25 / 0.45)' : 'rgb(255 255 255 / 0.12)'}
              style={{ transition: 'fill 0.4s, stroke 0.4s' }}
            />
            <text x={x + 16} y={ROW_Y + 26} fill={isActive ? 'rgb(255 255 255 / 0.75)' : 'rgb(255 255 255 / 0.4)'} fontSize="10.5" fontFamily="var(--font-mono)">
              {String(index + 1).padStart(2, '0')}
            </text>
            <text x={x + 16} y={ROW_Y + 45} fill="#fff" fontSize="15" fontWeight="700">
              {step.name}
            </text>
          </g>
        )
      })}

      {/* Paquet de données qui voyage d'agent en agent */}
      <motion.circle
        r="5"
        cy={ROW_Y + NODE_H / 2}
        fill="#fff"
        initial={false}
        animate={{ cx: centers[active] - NODE_W / 2 - 4 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        style={{ filter: 'drop-shadow(0 0 8px #fe4619)' }}
      />
    </svg>
  )
}

export default function AgentPipeline() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-20%' })
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!playing || !inView || reduced) return undefined
    const timeout = setTimeout(() => setActive((index) => (index + 1) % steps.length), 3200)
    return () => clearTimeout(timeout)
  }, [active, playing, inView, reduced])

  function select(index) {
    setActive(index)
    setPlaying(false)
  }

  const step = steps[active]

  return (
    <section ref={ref} className="px-3 sm:px-4" aria-labelledby="pipeline-title">
      <div className="relative overflow-hidden rounded-[32px] bg-night py-20 text-white sm:rounded-[40px] sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 size-[40rem] translate-x-1/3 -translate-y-1/2 rounded-full bg-primary/15 blur-[140px]"
        />
        <div className="container-site relative">
          <SectionHeading
            index="05"
            label="Sous le capot"
            tone="night"
            title={
              <span id="pipeline-title">
                Comment pense un système <Accent>multi-agent</Accent>
              </span>
            }
            description="Video Remix Studio monte une vidéo à partir d'une phrase. Six agents LangGraph, un état partagé, une boucle de correction — et pas un pixel généré."
          />

          <Reveal delay={0.1} className="mt-14 hidden rounded-3xl border border-white/10 bg-white/[0.02] p-4 md:block lg:p-8">
            <Diagram active={active} onSelect={select} />
          </Reveal>

          {/* Version mobile : liste verticale */}
          <ol className="mt-12 space-y-2 md:hidden">
            {steps.map((item, index) => (
              <li key={item.name}>
                <button
                  type="button"
                  onClick={() => select(index)}
                  className={cx(
                    'flex w-full items-center gap-4 rounded-2xl border px-4 py-3 text-left transition-colors',
                    index === active ? 'border-primary bg-primary text-white' : 'border-white/10 bg-white/[0.03] text-white/70',
                  )}
                >
                  <span className="font-mono text-xs opacity-70">{String(index + 1).padStart(2, '0')}</span>
                  <span className="font-bold">{item.name}</span>
                  <span className="ml-auto font-mono text-[11px] opacity-70">{item.model}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-white/45">
                  Agent {String(active + 1).padStart(2, '0')} / 06
                </span>
                <button
                  type="button"
                  onClick={() => setPlaying((value) => !value)}
                  className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 font-mono text-[11px] text-white/60 transition-colors hover:text-white"
                  aria-label={playing ? 'Mettre en pause la démonstration' : 'Relancer la démonstration'}
                >
                  {playing ? <Pause className="size-3" /> : <Play className="size-3" />}
                  {playing ? 'auto' : 'pause'}
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE_EXPO }}
                >
                  <h3 className="mt-5 text-3xl font-bold tracking-tight text-white">{step.name}</h3>
                  <p className="mt-3 flex flex-wrap gap-2 font-mono text-xs">
                    <span className="rounded-full bg-primary/15 px-3 py-1 text-primary">{step.model}</span>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-white/55">{step.fallback}</span>
                  </p>
                  <p className="mt-5 leading-relaxed text-white/65">{step.text}</p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-7 flex gap-1.5" aria-hidden="true">
                {steps.map((item, index) => (
                  <span key={item.name} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                    {index <= active && (
                      <motion.span
                        className="block h-full origin-left bg-primary"
                        initial={{ scaleX: index < active ? 1 : 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: index === active && playing ? 3.2 : 0.3, ease: 'linear' }}
                      />
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/40 font-mono text-[12.5px]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-white/40">
                <span className="flex items-center gap-2">
                  <Terminal className="size-4" /> vrs — exécution simulée
                </span>
                <span>python 3.12</span>
              </div>
              <div className="min-h-[230px] space-y-1.5 px-5 py-4 leading-relaxed">
                <p className="text-white/50">
                  <span className="text-primary">$</span> vrs edit &quot;edit sombre avec flashs&quot; --duration 30
                </p>
                {steps.slice(0, active + 1).map((item, index) => (
                  <motion.p
                    key={item.name}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: index === active ? 0.1 : 0 }}
                    className={index === active ? 'text-white' : 'text-white/45'}
                  >
                    <span className="text-primary">→</span> {item.log}
                  </motion.p>
                ))}
                <span className="inline-block h-4 w-2 translate-y-1 animate-blink bg-primary" />
              </div>
            </div>
          </div>

          <Reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-white/55">
            <TextLink to="/blog/video-remix-studio" className="text-white">
              Lire le retour d&apos;expérience
            </TextLink>
            <TextLink href="https://github.com/octavebahoun/video-remix-studio" className="text-white">
              Voir le code sur GitHub
            </TextLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
