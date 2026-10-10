import { motion } from 'motion/react'
import { ClipboardCheck, Lightbulb, Pencil, Rocket } from './icons'
import { Stagger, StaggerItem } from './Reveal'
import { EASE_EXPO } from '../lib/easing'
import { Accent } from './ui/Bits'
import { SectionHeading } from './ui/SectionHeading'

const steps = [
  {
    Icon: Lightbulb,
    title: 'Cadrage',
    duration: '1 appel · 30\u00a0min',
    text: "Comprendre le besoin réel, les utilisateurs et les contraintes avant d'écrire la moindre ligne de code.",
  },
  {
    Icon: Pencil,
    title: 'Prototype',
    duration: 'Quelques jours',
    text: "Maquettes, architecture et prototype fonctionnel : on valide la direction avant de construire.",
  },
  {
    Icon: ClipboardCheck,
    title: 'Itérations',
    duration: 'Points réguliers',
    text: "Livraisons courtes, tests, retours : chaque étape est validée avant de passer à la suivante.",
  },
  {
    Icon: Rocket,
    title: 'Mise en production',
    duration: 'Et après',
    text: 'Déploiement, documentation, passation — et un suivi si votre produit doit continuer à évoluer.',
  },
]

export default function ProcessSection({ index = '02' }) {
  return (
    <section className="py-16 sm:py-24 lg:py-28" aria-labelledby="process-title">
      <div className="container-site">
        <SectionHeading
          index={index}
          label="Méthode"
          title={
            <span id="process-title">
              Comment on <Accent>avance</Accent>
            </span>
          }
          description="Une méthode simple, éprouvée sur une quinzaine de projets : vous voyez l'avancement à chaque étape, et rien ne part en production sans votre validation."
        />

        <div className="relative mt-16">
          <div className="absolute top-7 right-[12%] left-[12%] hidden h-px bg-line lg:block" aria-hidden="true">
            <motion.div
              className="h-full origin-left bg-primary"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.6, ease: EASE_EXPO, delay: 0.2 }}
            />
          </div>

          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
            {steps.map((step, stepIndex) => (
              <StaggerItem key={step.title} className="relative">
                <span className="relative z-10 mx-auto flex size-14 items-center justify-center rounded-full border border-line bg-surface text-primary shadow-soft lg:mx-0">
                  <step.Icon className="size-6" />
                </span>
                <div className="mt-6 rounded-card border border-line bg-surface p-6">
                  <p className="flex items-center justify-between font-mono text-xs text-faint">
                    <span className="text-primary-ink">0{stepIndex + 1}</span>
                    {step.duration}
                  </p>
                  <h3 className="mt-4 text-xl font-bold tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed">{step.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
