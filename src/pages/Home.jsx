import { lazy, useEffect } from 'react'
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
const sections = {
  about: () => import('../components/AboutMe'),
  work: () => import('../components/WorkStack'),
  pipeline: () => import('../components/AgentPipeline'),
  openSource: () => import('../components/OpenSource'),
  timeline: () => import('../components/Timeline'),
  blog: () => import('../components/BlogTeaser'),
  faq: () => import('../components/FaqSection'),
  contact: () => import('../components/ContactSection'),
}
const AboutMe = lazy(sections.about)
const WorkStack = lazy(sections.work)
const AgentPipeline = lazy(sections.pipeline)
const OpenSource = lazy(sections.openSource)
const Timeline = lazy(sections.timeline)
const BlogTeaser = lazy(sections.blog)
const FaqSection = lazy(sections.faq)
const ContactSection = lazy(sections.contact)

// Télécharge le code des sections pendant un temps mort : au montage, plus d'attente réseau
function usePreloadSections() {
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((callback) => setTimeout(callback, 1500))
    const cancel = window.cancelIdleCallback ?? clearTimeout
    const handle = idle(() => Object.values(sections).forEach((load) => load().catch(() => {})), {
      timeout: 4000,
    })
    return () => cancel(handle)
  }, [])
}

export default function Home() {
  usePageMeta()
  usePreloadSections()

  return (
    <>
      <Hero />
      <ProofBar />
      <Marquee />

      {/* Sous la ligne de flottaison, même sur grand écran : montée juste après le premier rendu */}
      <Deferred minHeight={1200}>
        <section className="py-16 sm:py-24 lg:py-28" aria-labelledby="services-title">
          <div className="container-site">
            <SectionHeading
              index="02"
              label="Services"
              title={
                <span id="services-title">
                  Ce que je <Accent>construis</Accent>
                </span>
              }
              description="Six de mes huit expertises, de l'agent IA au SaaS complet. Cliquez sur une carte pour l'afficher en grand."
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
      </Deferred>

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
        <Timeline compact />
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
