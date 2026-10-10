import { lazy } from 'react'
import Deferred from '../components/Deferred'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import ProofBar from '../components/ProofBar'
import { Reveal } from '../components/Reveal'
import ServicesPanels from '../components/ServicesPanels'
import { Accent } from '../components/ui/Bits'
import { Button } from '../components/ui/Button'
import { SectionHeading } from '../components/ui/SectionHeading'
import { usePageMeta } from '../hooks/usePageMeta'

// Sections sous la ligne de flottaison : chargées et rendues à l'approche du scroll
const AboutMe = lazy(() => import('../components/AboutMe'))
const WorkStack = lazy(() => import('../components/WorkStack'))
const AgentPipeline = lazy(() => import('../components/AgentPipeline'))
const OpenSource = lazy(() => import('../components/OpenSource'))
const Timeline = lazy(() => import('../components/Timeline'))
const BlogTeaser = lazy(() => import('../components/BlogTeaser'))
const FaqSection = lazy(() => import('../components/FaqSection'))
const ContactSection = lazy(() => import('../components/ContactSection'))

export default function Home() {
  usePageMeta()

  return (
    <>
      <Hero />
      <ProofBar />
      <Marquee />

      <section className="py-24 sm:py-32" aria-labelledby="services-title">
        <div className="container-site">
          <SectionHeading
            index="02"
            label="Services"
            title={
              <span id="services-title">
                Ce que je <Accent>construis</Accent>
              </span>
            }
            description="De l'agent IA au SaaS complet : je conçois, je code et je mets en production. Cliquez sur une carte pour la mettre en avant."
          />

          <Reveal delay={0.1} className="mt-14">
            <ServicesPanels limit={6} />
          </Reveal>

          <Reveal className="mt-12 flex justify-center">
            <Button to="/services" variant="ghost" size="lg">
              Services & tarifs
            </Button>
          </Reveal>
        </div>
      </section>

      <Deferred minHeight={1000}>
        <AboutMe withLink />
      </Deferred>
      <Deferred minHeight={4200}>
        <WorkStack />
      </Deferred>
      <Deferred minHeight={1300}>
        <AgentPipeline />
      </Deferred>
      <Deferred minHeight={1300}>
        <OpenSource />
      </Deferred>
      <Deferred minHeight={1700}>
        <Timeline />
      </Deferred>
      <Deferred minHeight={900}>
        <BlogTeaser />
      </Deferred>
      <Deferred minHeight={800}>
        <FaqSection limit={5} />
      </Deferred>
      <Deferred minHeight={1300}>
        <ContactSection />
      </Deferred>
    </>
  )
}
