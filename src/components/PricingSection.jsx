import { useNavigate } from 'react-router-dom'
import { plans } from '../data/pricing'
import { CAL_URL } from '../data/profile'
import { cx } from '../lib/cx'
import { anchorHandler } from '../lib/navigation'
import { Check, Close } from './icons'
import { Stagger, StaggerItem } from './Reveal'
import { Accent } from './ui/Bits'
import { Button } from './ui/Button'
import { SectionHeading } from './ui/SectionHeading'

export default function PricingSection({ index = '03' }) {
  const navigate = useNavigate()

  return (
    <section id="tarifs" className="scroll-mt-24 py-24 sm:py-32" aria-labelledby="pricing-title">
      <div className="container-site">
        <SectionHeading
          index={index}
          label="Tarifs"
          title={
            <span id="pricing-title">
              Travaillons <Accent>ensemble</Accent>
            </span>
          }
          description="Trois façons de collaborer, selon votre besoin. Chaque projet commence par un appel gratuit de 30 minutes pour cadrer le besoin."
        />

        <Stagger className="mt-14 grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <StaggerItem key={plan.name} className="h-full">
              <article
                className={cx(
                  'relative flex h-full flex-col rounded-[28px] border p-7 sm:p-8',
                  plan.featured ? 'border-transparent bg-night text-white shadow-lift' : 'border-line bg-surface',
                )}
              >
                {plan.featured && (
                  <span className="absolute top-7 right-7 rounded-full bg-primary px-3 py-1 font-mono text-[11px] font-semibold text-white">
                    Le plus demandé
                  </span>
                )}
                <h3 className={cx('text-lg font-bold', plan.featured && 'text-white')}>{plan.name}</h3>
                <p className={cx('mt-3 text-[15px] leading-relaxed', plan.featured ? 'text-white/60' : 'text-muted')}>
                  {plan.pitch}
                </p>
                <p className="mt-8 flex items-baseline gap-2">
                  {plan.prefix && (
                    <span className={cx('text-sm', plan.featured ? 'text-white/50' : 'text-faint')}>{plan.prefix}</span>
                  )}
                  <span className={cx('display text-5xl', plan.featured ? 'text-white' : 'text-ink')}>{plan.price}</span>
                  {plan.unit && <span className={cx('text-sm', plan.featured ? 'text-white/50' : 'text-faint')}>{plan.unit}</span>}
                </p>

                <ul className={cx('mt-8 space-y-3 border-t pt-7 text-[15px]', plan.featured ? 'border-white/10' : 'border-line')}>
                  {plan.features.map((feature) => (
                    <li
                      key={feature.label}
                      className={cx(
                        'flex items-center gap-3',
                        !feature.included && 'line-through decoration-1 opacity-45',
                      )}
                    >
                      <span
                        className={cx(
                          'flex size-5 shrink-0 items-center justify-center rounded-full',
                          feature.included ? 'bg-primary text-white' : plan.featured ? 'bg-white/10' : 'bg-card',
                        )}
                      >
                        {feature.included ? <Check className="size-3" /> : <Close className="size-3" />}
                      </span>
                      <span className={plan.featured ? 'text-white/85' : 'text-ink'}>{feature.label}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-9">
                  {plan.featured ? (
                    <Button href="/#contact" onClick={anchorHandler(navigate, '/#contact')} variant="accent" className="w-full justify-between" magnetic={false}>
                      Discutons de votre projet
                    </Button>
                  ) : (
                    <Button href={CAL_URL} variant="ghost" className="w-full justify-between" magnetic={false}>
                      Réserver un appel
                    </Button>
                  )}
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
