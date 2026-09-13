import { CAL_URL } from './BookingBand'
import { ArrowUpRight, Sparkle } from './icons'

const plans = [
  {
    name: 'À la journée',
    price: 'À partir de 100 €',
    unit: '/ jour',
    features: [
      { label: 'Cadrage du besoin', included: true },
      { label: 'Code + documentation', included: true },
      { label: 'Point quotidien', included: true },
      { label: 'Support 7 jours', included: true },
      { label: 'Déploiement', included: false },
      { label: 'Suivi mensuel', included: false },
    ],
  },
  {
    name: 'Mission',
    price: 'Sur devis',
    unit: '',
    cta: 'Discutons de votre projet',
    features: [
      { label: 'Cadrage + maquettes', included: true },
      { label: 'Développement complet', included: true },
      { label: 'Points réguliers', included: true },
      { label: 'Déploiement', included: true },
      { label: 'Documentation', included: true },
      { label: 'Support 30 jours', included: true },
      { label: 'Suivi mensuel', included: false },
      { label: 'Évolutions continues', included: false },
    ],
  },
  {
    name: 'Suivi mensuel',
    price: 'Sur devis',
    unit: '',
    cta: 'Discutons de votre projet',
    features: [
      { label: 'Cadrage + maquettes', included: true },
      { label: 'Développement complet', included: true },
      { label: 'Points hebdomadaires', included: true },
      { label: 'Déploiement', included: true },
      { label: 'Documentation', included: true },
      { label: 'Support prioritaire', included: true },
      { label: 'Suivi mensuel', included: true },
      { label: 'Évolutions continues', included: true },
    ],
  },
]

export default function PricingSection() {
  return (
    <section className="mx-auto max-w-site px-6 py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="flex items-center gap-3 text-sm font-semibold text-ink">
            <span className="h-px w-8 bg-primary" />
            Tarifs
          </p>

          <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Mes modes de{' '}
            <span className="font-medium text-primary italic">
              collaboration
            </span>
            <Sparkle className="ml-2 inline-block size-4 -translate-y-3 text-ink" />
          </h2>
        </div>

        <a
          href={CAL_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-4 rounded-full bg-primary py-1.5 pr-1.5 pl-7 font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          Discutons-en
          <span className="flex size-11 items-center justify-center rounded-full bg-ink text-white">
            <ArrowUpRight />
          </span>
        </a>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.name} className="rounded-card bg-card p-4">
            <div className="rounded-2xl bg-primary p-6 text-white">
              <div className="flex items-center justify-between gap-4">
                <p className="font-semibold">{plan.name}</p>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-primary">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>

              <p className="mt-8 text-4xl font-extrabold">
                {plan.price}{' '}
                <span className="text-base font-medium text-white/70">
                  {plan.unit}
                </span>
              </p>
            </div>

            <ul className="mt-6 space-y-3 px-3 pb-3">
              {plan.features.map((feature) => (
                <li
                  key={feature.label}
                  className={`flex items-center gap-3 text-sm ${
                    feature.included ? 'text-muted' : 'text-faint'
                  }`}
                >
                  <span
                    className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                      feature.included
                        ? 'bg-primary text-white'
                        : 'bg-primary/25 text-white'
                    }`}
                  >
                    ✓
                  </span>
                  {feature.label}
                </li>
              ))}
            </ul>

            {plan.cta && (
              <div className="px-3 pb-4">
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                  {plan.cta}
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
