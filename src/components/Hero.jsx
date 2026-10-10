import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CAL_URL, profile } from '../data/profile'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { formatNumber } from '../lib/format'
import { useGithub } from '../lib/github'
import { goTo } from '../lib/navigation'
import { shortcutLabel } from '../lib/platform'
import { useCommandPalette } from './CommandPalette'
import HeroBlob from './HeroBlob'
import { ArrowDown, ArrowUpRight, Sparkle } from './icons'
import { EASE_EXPO } from '../lib/easing'
import { Kbd, StatusDot } from './ui/Bits'
import { Button } from './ui/Button'
import { LiveClock } from './ui/LiveClock'

const chips = [
  { label: 'LangGraph', className: 'left-[4%] top-[24%]', depth: 1.4, delay: 0 },
  { label: 'React 19', className: 'left-[30%] top-[6%]', depth: 1.1, delay: 1.2 },
  { label: 'Python', className: 'left-[-3%] top-[54%]', depth: 0.8, delay: 0.6 },
  { label: 'RAG · pgvector', className: 'right-[-3%] top-[46%]', depth: 1.6, delay: 1.8 },
  { label: 'Next.js', className: 'right-[2%] top-[66%]', depth: 0.9, delay: 0.9 },
]

// Animations d'entrée en CSS pur (lettres, histogramme) : rien à calculer en JavaScript
// pendant le premier rendu, le plus coûteux sur mobile
function Letters({ text, delay = 0, className }) {
  return (
    <span className={className} aria-hidden="true">
      {[...text].map((letter, index) => (
        <span key={`${letter}-${index}`} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
          <span className="inline-block animate-rise" style={{ animationDelay: `${delay + index * 0.045}s` }}>
            {letter}
          </span>
        </span>
      ))}
    </span>
  )
}

// Petit terminal qui « tape » les vrais chiffres GitHub
function TerminalCard({ contributions, pullRequests }) {
  const lines = [
    { prompt: true, text: 'git log --since="1 year" --oneline | wc -l' },
    { text: `${formatNumber(contributions)} contributions` },
    { prompt: true, text: 'gh pr list --author @me --state all' },
    { text: `${formatNumber(pullRequests)} pull requests` },
  ]
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(() => (reduced ? lines.length : 0))

  useEffect(() => {
    if (visible >= lines.length) return undefined
    const timeout = setTimeout(() => setVisible((count) => count + 1), visible === 0 ? 1700 : 650)
    return () => clearTimeout(timeout)
  }, [visible, lines.length])

  return (
    <div className="w-[280px] overflow-hidden rounded-2xl border border-white/10 bg-night font-mono text-[11.5px] leading-relaxed text-white/80 shadow-lift sm:w-[310px]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3.5 py-2.5">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-white/60">oktav@github ~</span>
      </div>
      <div className="min-h-[104px] px-3.5 py-3">
        {lines.slice(0, visible).map((line, index) => (
          <p key={index} className={line.prompt ? 'truncate text-white/55' : 'font-semibold text-white'}>
            {line.prompt ? (
              <>
                <span className="text-primary">$</span> {line.text}
              </>
            ) : (
              <>
                <span className="text-emerald-400">✓</span> {line.text}
              </>
            )}
          </p>
        ))}
        <span className="inline-block h-3.5 w-1.5 translate-y-0.5 animate-blink bg-primary" />
      </div>
    </div>
  )
}

function RotatingBadge({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Me contacter"
      className="group relative size-28 rounded-full bg-surface shadow-soft transition-transform duration-500 hover:scale-105 sm:size-32"
    >
      <svg viewBox="0 0 100 100" className="size-full animate-spin-slow text-ink" aria-hidden="true">
        <defs>
          <path id="hero-badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text fontSize="9" fontWeight="600" fill="currentColor" fontFamily="var(--font-mono)">
          {/* textLength ajuste l'espacement pour boucler exactement le cercle */}
          <textPath href="#hero-badge-circle" textLength="228" lengthAdjust="spacing">
            DISPONIBLE · FREELANCE · STAGE ·
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto flex size-12 items-center justify-center rounded-full bg-primary text-white transition-transform duration-500 group-hover:rotate-45">
        <ArrowUpRight className="size-5" />
      </span>
    </button>
  )
}

export default function Hero() {
  const navigate = useNavigate()
  const palette = useCommandPalette()
  const github = useGithub()
  const section = useRef(null)
  const reduced = useReducedMotion()
  // Pastilles, badge et terminal ne s'affichent qu'à partir de 640 px : inutile de les monter avant
  const wide = useMediaQuery('(min-width: 640px)')

  // Parallaxe souris
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 18, mass: 0.6 })
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 18, mass: 0.6 })
  const blobX = useTransform(smoothX, (value) => value * -36)
  const blobY = useTransform(smoothY, (value) => value * -24)
  const portraitX = useTransform(smoothX, (value) => value * 14)
  const portraitY = useTransform(smoothY, (value) => value * 8)

  // Parallaxe au défilement
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] })
  const visualY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])

  function handlePointerMove(event) {
    if (reduced || event.pointerType !== 'mouse') return
    const rect = section.current.getBoundingClientRect()
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const weeks = github.calendar.slice(-182)
  const weekly = []
  for (let index = 0; index < weeks.length; index += 7) {
    weekly.push(weeks.slice(index, index + 7).reduce((sum, day) => sum + day.count, 0))
  }
  const peak = Math.max(...weekly, 1)

  return (
    <section
      ref={section}
      onPointerMove={handlePointerMove}
      className="relative overflow-hidden pt-24 sm:pt-28"
      aria-label="Présentation"
    >
      <div className="container-site grid grid-cols-1 [grid-template-areas:'head'_'body'_'visual'] lg:min-h-[calc(100svh-7rem)] lg:grid-cols-[1fr_1fr] lg:grid-rows-[1fr_auto] lg:gap-x-6 lg:[grid-template-areas:'head_visual'_'body_visual']">
        {/* Nom */}
        <motion.div style={{ y: nameY }} className="relative z-10 flex flex-col justify-end pt-4 [grid-area:head] sm:pt-6 lg:pt-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_EXPO }}
            className="flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/90 py-1.5 pr-4 pl-3 text-[13px] font-medium text-ink">
              <StatusDot />
              {profile.availability}
            </span>
          </motion.div>

          <h1 className="display mt-6 text-[21vw] leading-[0.8] tracking-[-0.055em] sm:text-[17vw] lg:text-[clamp(5rem,10.6vw,11rem)]">
            <span className="sr-only">Oktav Bahoun — {profile.role}</span>
            <Letters text="Oktav" delay={0.1} className="block" />
            <span className="block">
              <Letters text="Bahoun" delay={0.3} />
              <motion.span
                aria-hidden="true"
                className="inline-block text-primary"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.85 }}
              >
                .
              </motion.span>
            </span>
          </h1>
        </motion.div>

        {/* Portrait */}
        <motion.div
          style={{ y: visualY }}
          className="relative mx-auto aspect-[0.92] w-full max-w-[380px] self-end overflow-hidden [grid-area:visual] sm:max-w-[540px] sm:overflow-visible lg:mt-0 lg:max-w-none"
        >
          <motion.div
            style={{ x: blobX, y: blobY }}
            initial={{ scale: 0.6, opacity: 0, rotate: -40 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1.4, ease: EASE_EXPO, delay: 0.35 }}
            className="absolute inset-x-[1%] top-[9%] bottom-[-10%]"
          >
            <div className="size-full animate-[spin_80s_linear_infinite]">
              <HeroBlob className="size-full" />
            </div>
          </motion.div>

          {/* Pas de fondu d'opacité : le portrait est l'élément LCP, il doit être peint tout de suite */}
          <motion.div
            style={{ x: portraitX, y: portraitY }}
            className="group absolute inset-x-[3%] bottom-0"
          >
            <motion.div
              initial={{ y: 60 }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: EASE_EXPO, delay: 0.2 }}
            >
            <img
              src="/images/portrait.webp"
              alt="Portrait d'Octave Bahoun-Houtoukpe"
              width="660"
              height="715"
              className="relative w-full select-none"
            />
            {/* Veste noire par défaut, couleur révélée au survol */}
            <img
              src="/images/portrait-black.webp"
              alt=""
              aria-hidden="true"
              width="660"
              height="715"
              fetchPriority="high"
              className="absolute inset-0 w-full transition-opacity duration-700 ease-out group-hover:opacity-0"
            />
            </motion.div>
          </motion.div>

          {wide && (
            <>
              {chips.map((chip, index) => (
                <Chip key={chip.label} chip={chip} index={index} smoothX={smoothX} smoothY={smoothY} />
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: EASE_EXPO, delay: 1.1 }}
                className="absolute top-[2%] right-[2%] hidden sm:block"
              >
                <RotatingBadge onClick={() => goTo(navigate, '/#contact')} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: EASE_EXPO, delay: 1.25 }}
                className="absolute bottom-[11%] left-[-3%] hidden sm:block lg:left-[0%]"
              >
                <TerminalCard
                  contributions={github.totals.contributions}
                  pullRequests={github.totals.pullRequests}
                />
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Pitch + actions */}
        <motion.div
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: EASE_EXPO, delay: 0.2 }}
          className="relative z-10 pt-6 pb-10 [grid-area:body] sm:pt-8 sm:pb-12 lg:pt-10 lg:pb-14"
        >
          <p className="max-w-xl text-lg leading-relaxed sm:text-xl">
            <strong className="font-semibold text-ink">{profile.role}.</strong> Je conçois des
            agents, des pipelines RAG et des produits SaaS qui tournent en production — de
            Cotonou à Pau.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button to="/projects" size="lg">
              Voir mes projets
            </Button>
            <Button href={CAL_URL} variant="ghost" size="lg" icon={null}>
              Réserver un appel
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-8 items-end gap-[3px]" aria-hidden="true">
                {weekly.map((value, index) => (
                  <span
                    key={index}
                    className="w-[5px] origin-bottom animate-bar rounded-full bg-primary"
                    style={{
                      height: `${Math.max(12, (value / peak) * 100)}%`,
                      opacity: 0.35 + (value / peak) * 0.65,
                      animationDelay: `${1.1 + index * 0.025}s`,
                    }}
                  />
                ))}
              </div>
              <p className="leading-tight">
                <span className="font-semibold text-ink">
                  {formatNumber(github.totals.contributions)} contributions
                </span>
                <br />
                <span className="text-faint">sur GitHub, ces 12 derniers mois</span>
              </p>
            </div>

            <button
              type="button"
              onClick={palette.open}
              className="hidden items-center gap-2 text-faint transition-colors hover:text-ink md:flex"
            >
              <Sparkle className="size-3.5 text-primary" />
              Explorer au clavier <Kbd>{shortcutLabel}</Kbd>
            </button>

            <p className="hidden items-center gap-3 font-mono text-xs text-faint xl:flex">
              {profile.cities.map((city) => (
                <span key={city.label}>
                  {city.label.toUpperCase()}{' '}
                  <LiveClock timeZone={city.timeZone} className="text-ink" />
                </span>
              ))}
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint 2xl:flex"
        aria-hidden="true"
      >
        <span className="kicker text-[10px]">Défiler</span>
        <ArrowDown className="size-4 animate-float" />
      </motion.div>
    </section>
  )
}

function Chip({ chip, index, smoothX, smoothY }) {
  const x = useTransform(smoothX, (value) => value * 60 * chip.depth)
  const y = useTransform(smoothY, (value) => value * 40 * chip.depth)

  return (
    <motion.div
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.95 + index * 0.08 }}
      className={`absolute hidden sm:block ${chip.className}`}
    >
      <span
        className="flex animate-float items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-[13px] font-semibold text-ink shadow-soft"
        style={{ animationDelay: `${chip.delay}s` }}
      >
        <span className="size-1.5 rounded-full bg-primary" />
        {chip.label}
      </span>
    </motion.div>
  )
}
