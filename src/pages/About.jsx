import AboutMe from '../components/AboutMe'
import BookingBand from '../components/BookingBand'
import ContactSection from '../components/ContactSection'
import { Eye, Lightbulb, Pencil, ClipboardCheck, Rocket } from '../components/icons'
import JourneySection from '../components/JourneySection'
import Marquee from '../components/Marquee'
import PageHeader from '../components/PageHeader'
import { Reveal } from '../components/Reveal'

const process = [
  {
    number: '01',
    Icon: Lightbulb,
    title: 'Recherche & cadrage',
    text: "Comprendre le besoin réel, les utilisateurs et les contraintes avant d'écrire la moindre ligne de code.",
  },
  {
    number: '02',
    Icon: Pencil,
    title: 'Conception & prototypage',
    text: 'Maquettes, architecture et prototype rapide : on valide la direction avant de construire.',
  },
  {
    number: '03',
    Icon: ClipboardCheck,
    title: 'Tests & itération',
    text: 'Mise en production progressive, tests, retours utilisateurs et améliorations continues.',
  },
]

export default function About() {
  return (
    <>
      <PageHeader title="À propos" crumb="À propos" />
      <Marquee />

      <section className="mx-auto max-w-site px-6 pt-20">
        <Reveal>
          <img
            src="/images/about-banner.jpg"
            alt="Profil GitHub d'Octave Bahoun-Houtoukpe"
            className="aspect-[16/7] w-full rounded-card object-cover object-top"
          />
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          <Reveal delay={0.05}>
            <span className="flex size-12 items-center justify-center rounded-full bg-primary text-white">
              <Rocket />
            </span>
            <h2 className="mt-5 text-2xl font-bold">Ma vision</h2>
            <p className="mt-3">
              Rendre l&apos;IA utile et accessible : des outils simples qui
              résolvent de vrais problèmes, du Bénin au reste du monde.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <span className="flex size-12 items-center justify-center rounded-full bg-primary text-white">
              <Eye />
            </span>
            <h2 className="mt-5 text-2xl font-bold">Ma mission</h2>
            <p className="mt-3">
              Concevoir et livrer des produits web & IA soignés, en open source
              quand c&apos;est possible, avec une exigence de qualité à chaque
              étape.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mt-20">
        <AboutMe />
      </div>

      <section className="mx-auto max-w-site px-6 py-20">
        <Reveal>
          <p className="flex items-center justify-center gap-3 text-sm font-semibold text-ink">
            <span className="h-px w-8 bg-primary" />
            Ma Méthode
          </p>

          <h2 className="mt-4 text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
            Ma <span className="font-medium text-primary italic">Méthode</span>{' '}
            de travail
          </h2>
        </Reveal>

        <div className="relative mt-16 grid gap-12 sm:grid-cols-3">
          <span className="absolute top-7 right-[16%] left-[16%] hidden border-t-2 border-dashed border-line sm:block" />

          {process.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.12} className="relative text-center">
              <span className="relative inline-flex">
                <span className="flex size-14 items-center justify-center rounded-full bg-primary text-white">
                  <step.Icon />
                </span>
                <span className="absolute -right-2 -bottom-1 flex size-7 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
                  {step.number}
                </span>
              </span>

              <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <JourneySection />

      <Marquee />
      <BookingBand />
      <ContactSection />
      <Marquee />
    </>
  )
}
