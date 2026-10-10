import CtaBand from '../components/CtaBand'
import FaqSection from '../components/FaqSection'
import Marquee from '../components/Marquee'
import PageHeader from '../components/PageHeader'
import PricingSection from '../components/PricingSection'
import ProcessSection from '../components/ProcessSection'
import { Reveal } from '../components/Reveal'
import ServicesPanels from '../components/ServicesPanels'
import { Button } from '../components/ui/Button'
import { CAL_URL } from '../data/profile'
import { pageMeta } from '../data/seo'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Services() {
  usePageMeta(pageMeta.services)

  return (
    <>
      <PageHeader
        crumb="Services"
        title="Services"
        description="Huit expertises, une seule exigence : des produits qui tournent en production. Je conçois, je code et je déploie — seul ou avec Excellence Team en renfort."
        aside={
          <Button href={CAL_URL} size="lg">
            Réserver un appel
          </Button>
        }
      />

      <section className="pb-16" aria-label="Expertises">
        <div className="container-site">
          <Reveal>
            <ServicesPanels />
          </Reveal>
        </div>
      </section>

      <Marquee
        items={['Cadrer', 'Prototyper', 'Itérer', 'Livrer', 'Documenter', 'Faire évoluer']}
        tone="accent"
      />
      <ProcessSection index="01" />
      <PricingSection index="02" />
      <FaqSection limit={4} index="03" />
      <CtaBand />
    </>
  )
}
