import AboutMe from '../components/AboutMe'
import CtaBand from '../components/CtaBand'
import HeroBlob from '../components/HeroBlob'
import { Bolt, Code, Heart, Sparkle } from '../components/icons'
import PageHeader from '../components/PageHeader'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import StackSection from '../components/StackSection'
import Timeline from '../components/Timeline'
import { Accent } from '../components/ui/Bits'
import { Button } from '../components/ui/Button'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Spotlight } from '../components/ui/Spotlight'
import { GITHUB_URL, profile } from '../data/profile'
import { usePageMeta } from '../hooks/usePageMeta'

const principles = [
  {
    Icon: Bolt,
    title: 'Livrer, puis itérer',
    text: "Un prototype qui tourne vaut mieux qu'une maquette parfaite. On met en ligne tôt, on apprend vite, on améliore souvent.",
  },
  {
    Icon: Code,
    title: 'Open source par défaut',
    text: "Ce que j'apprends, je le partage : la plupart de mes projets sont publics, ce site compris. Le code se lit, se critique, se forke.",
  },
  {
    Icon: Sparkle,
    title: "L'IA utile, pas décorative",
    text: "Un LLM n'est qu'un composant. Je l'utilise quand il résout un vrai problème — avec des replis déterministes quand il se trompe.",
  },
  {
    Icon: Heart,
    title: 'Les détails qu’on ressent',
    text: "Un temps de chargement, une animation, un message d'erreur clair : c'est là que se joue la confiance d'un utilisateur.",
  },
]

export default function About() {
  usePageMeta({
    title: 'À propos',
    description:
      "Le parcours d'Octave Précieux Bahoun-Houtoukpe : de l'INSTI Lokossa à CY Tech, co-fondateur et directeur technique d'Excellence Team, ingénierie IA et open source.",
  })

  return (
    <>
      <PageHeader
        crumb="À propos"
        title="À propos"
        description={`${profile.fullName}, dit Oktav. Étudiant ingénieur, builder et co-fondateur — entre le Bénin et la France.`}
        aside={
          <Button href={GITHUB_URL} variant="ghost">
            Mon GitHub
          </Button>
        }
      />

      <AboutMe index="01" />

      <section className="py-24 sm:py-32" aria-labelledby="principles-title">
        <div className="container-site">
          <SectionHeading
            index="02"
            label="Principes"
            title={
              <span id="principles-title">
                Ce qui guide mon <Accent>travail</Accent>
              </span>
            }
            description="Quatre règles simples, appliquées à chaque projet — du hackathon de 48 h au SaaS en production."
          />
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2">
            {principles.map((principle, index) => (
              <StaggerItem key={principle.title} className="h-full">
                <Spotlight className="h-full rounded-card border border-line bg-surface p-7 sm:p-9">
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <principle.Icon className="size-6" />
                    </span>
                    <span className="font-mono text-xs text-faint">0{index + 1}</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-bold tracking-tight">{principle.title}</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed">{principle.text}</p>
                </Spotlight>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Timeline index="03" />
      <StackSection index="04" />

      <section className="py-24 sm:py-32" aria-labelledby="beyond-title">
        <div className="container-site">
          <SectionHeading
            index="05"
            label="Hors du code"
            title={
              <span id="beyond-title">
                Le reste du <Accent>temps</Accent>
              </span>
            }
          />
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            <Reveal className="rounded-card border border-line bg-surface p-7">
              <p className="kicker">Langues</p>
              <ul className="mt-6 space-y-4">
                {profile.spokenLanguages.map((language) => (
                  <li key={language.name} className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-ink">{language.name}</span>
                    <span className="rounded-full bg-card px-3 py-1 text-sm">{language.level}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08} className="rounded-card border border-line bg-surface p-7">
              <p className="kicker">Centres d&apos;intérêt</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <span key={interest} className="rounded-full border border-line px-4 py-2 font-semibold text-ink">
                    {interest}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-[15px]">Ce qui m&apos;occupe quand l&apos;éditeur est fermé.</p>
            </Reveal>

            <Reveal delay={0.16} className="relative overflow-hidden rounded-card bg-night p-7 text-white">
              <HeroBlob className="pointer-events-none absolute -right-20 -bottom-24 w-72 opacity-40" />
              <p className="kicker relative text-white/45">Certification</p>
              <p className="relative mt-6 text-3xl font-bold text-white">Python</p>
              <p className="relative mt-1 text-white/60">Kaggle · 2026</p>
              <p className="relative mt-8 text-[15px] text-white/60">
                Et l&apos;essentiel du reste appris en construisant : documentation, open source,
                hackathons.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
