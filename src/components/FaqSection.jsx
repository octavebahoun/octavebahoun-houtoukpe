import { useNavigate } from 'react-router-dom'
import { CAL_URL } from '../data/profile'
import { anchorHandler } from '../lib/navigation'
import FaqAccordion from './FaqAccordion'
import { Reveal } from './Reveal'
import { Accent } from './ui/Bits'
import { Button, TextLink } from './ui/Button'
import { Kicker } from './ui/SectionHeading'

export default function FaqSection({ limit, index = '09' }) {
  const navigate = useNavigate()

  return (
    <section className="py-24 sm:py-32" aria-labelledby="faq-title">
      <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal y={16}>
            <Kicker index={index}>FAQ</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="faq-title" className="display mt-5 text-[clamp(2.4rem,5vw,4.2rem)]">
              Questions <Accent>fréquentes</Accent>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-sm text-[17px]">
              Vous ne trouvez pas votre réponse ? Écrivez-moi, je réponds sous 24 h.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/#contact" onClick={anchorHandler(navigate, '/#contact')}>
                Poser ma question
              </Button>
              <TextLink href={CAL_URL}>Ou réserver un appel</TextLink>
            </div>
            {limit && (
              <p className="mt-8">
                <TextLink to="/faq">Toutes les questions</TextLink>
              </p>
            )}
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <FaqAccordion limit={limit} />
        </Reveal>
      </div>
    </section>
  )
}
