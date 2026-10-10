import CtaBand from '../components/CtaBand'
import FaqAccordion from '../components/FaqAccordion'
import PageHeader from '../components/PageHeader'
import { Reveal } from '../components/Reveal'
import { Button } from '../components/ui/Button'
import { CAL_URL } from '../data/profile'
import { faqs } from '../data/faq'
import { pageMeta } from '../data/seo'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Faq() {
  usePageMeta(pageMeta.faq)

  return (
    <>
      <PageHeader
        crumb="FAQ"
        title="FAQ"
        count={faqs.length}
        description="Disponibilité, technologies, déroulé d'un projet, stages : tout ce qu'on me demande le plus souvent."
        aside={
          <Button href={CAL_URL} variant="ghost">
            Une autre question ? Appelons-nous
          </Button>
        }
      />
      <section className="pb-8">
        <div className="container-site max-w-4xl">
          <Reveal>
            <FaqAccordion />
          </Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
