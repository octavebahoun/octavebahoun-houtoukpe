import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { profile } from '../data/profile'
import { Reveal } from './Reveal'
import { Kicker } from './ui/SectionHeading'
import { TextLink } from './ui/Button'
import { WordsReveal } from './ui/TextReveal'

const statement =
  "Je m'appelle Octave — Oktav pour tout le monde. Étudiant ingénieur à CY Tech, co-fondateur et directeur technique d'Excellence Team, je transforme des idées en produits qui tournent : SaaS, agents IA, plateformes. En open source dès que c'est possible."

const facts = [
  { label: 'Formation', value: 'CY Tech — ING1 Informatique' },
  { label: 'Excellence Team', value: 'Co-fondateur & directeur technique' },
  { label: 'Langues', value: profile.spokenLanguages.map((language) => language.name).join(', ') },
  { label: 'Entre', value: 'Pau ⇄ Cotonou' },
]

export default function AboutMe({ withLink = false, index = '03' }) {
  const frame = useRef(null)
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section className="py-16 sm:py-24 lg:py-28" aria-labelledby="about-title">
      <div className="container-site grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-20">
        <Reveal className="relative">
          <div
            ref={frame}
            className="relative mx-auto aspect-[3/4] max-w-md overflow-hidden rounded-[28px] bg-card max-sm:aspect-[5/4] lg:max-w-none"
          >
            <motion.img
              src="/images/oktav-portrait.webp"
              alt="Octave en tenue traditionnelle béninoise, un ordinateur portable à la main"
              loading="lazy"
              style={{ y: imageY }}
              className="absolute inset-0 h-[116%] w-full -translate-y-[8%] object-cover object-top dark:brightness-[0.8] dark:saturate-[0.95]"
            />
            {/* En thème sombre, le fond clair de la photo est adouci par un vignettage */}
            <div
              aria-hidden="true"
              className="absolute inset-0 hidden bg-[radial-gradient(ellipse_at_50%_38%,transparent_42%,rgb(10_10_9/0.62)_100%)] dark:block"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night/60 to-transparent" />
            <div className="absolute right-4 bottom-4 left-4 flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full bg-white/90 px-4 py-2 text-[13px] font-semibold text-night backdrop-blur">
                Directeur technique · Excellence Team
              </span>
              <span className="rounded-full bg-primary-strong px-3 py-2 font-mono text-[11px] font-semibold text-white">
                LOKOSSA → PAU
              </span>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col justify-center">
          <Reveal y={16}>
            <Kicker index={index}>À propos</Kicker>
          </Reveal>

          <h2 id="about-title" className="sr-only">
            Qui est Oktav Bahoun ?
          </h2>

          <WordsReveal
            text={statement}
            className="mt-7 text-[clamp(1.55rem,2.7vw,2.35rem)] leading-[1.25] font-semibold tracking-tight text-ink"
          />

          <Reveal delay={0.1}>
            <figure className="mt-10 border-l-2 border-primary pl-6">
              <blockquote className="font-serif text-2xl leading-snug text-ink italic sm:text-[1.7rem]">
                « {profile.quote} »
              </blockquote>
              <figcaption className="kicker mt-3">Ma règle de travail</figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {facts.map((fact) => (
                <div key={fact.label} className="bg-surface p-5">
                  <dt className="kicker text-[11px]">{fact.label}</dt>
                  <dd className="mt-1.5 text-[15px] font-semibold text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {withLink && (
            <Reveal delay={0.2} className="mt-8">
              <TextLink to="/about">Mon parcours complet</TextLink>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
