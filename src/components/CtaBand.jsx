import { useNavigate } from 'react-router-dom'
import { CAL_URL } from '../data/profile'
import { anchorHandler } from '../lib/navigation'
import { Reveal } from './Reveal'
import { Accent } from './ui/Bits'
import { Button } from './ui/Button'

// Appel à l'action compact, en bas des pages intérieures
export default function CtaBand({
  title = (
    <>
      Un projet en <Accent>tête</Accent> ?
    </>
  ),
  text = 'Décrivez-le en quelques lignes : je vous réponds sous 24 h avec une première approche.',
}) {
  const navigate = useNavigate()

  return (
    <section className="py-16 sm:py-24">
      <div className="container-site">
        <Reveal className="relative overflow-hidden rounded-[32px] border border-line bg-surface px-7 py-12 sm:px-14 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -bottom-32 size-96 rounded-full bg-primary/15 blur-[90px]"
          />
          <div className="relative flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="display text-[clamp(2.2rem,4.6vw,3.8rem)]">{title}</h2>
              <p className="mt-4 text-[17px]">{text}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/#contact" onClick={anchorHandler(navigate, '/#contact')} size="lg">
                Démarrer un projet
              </Button>
              <Button href={CAL_URL} variant="ghost" size="lg" icon={null}>
                Réserver un appel
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
