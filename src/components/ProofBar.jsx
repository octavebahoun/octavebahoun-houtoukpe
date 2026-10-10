import { excellenceTeam } from '../data/profile'
import { useGithub } from '../lib/github'
import { Reveal } from './Reveal'
import { CountUp } from './ui/CountUp'

export default function ProofBar() {
  const github = useGithub()

  const stats = [
    {
      value: github.totals.contributions,
      label: 'contributions GitHub',
      note: '12 derniers mois',
    },
    { value: github.user.publicRepos, label: 'dépôts publics', note: 'sur github.com/octavebahoun' },
    { value: github.totals.pullRequests, label: 'pull requests', note: 'ouvertes & fusionnées' },
    {
      value: excellenceTeam.projects,
      label: 'produits livrés',
      note: 'avec Excellence Team',
      suffix: '',
    },
  ]

  return (
    <section aria-label="Quelques chiffres" className="relative z-10 border-y border-line bg-surface/70 backdrop-blur-sm">
      <div className="container-site grid grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal
            key={stat.label}
            delay={index * 0.08}
            y={16}
            className={`py-8 sm:py-10 ${index % 2 === 1 ? 'pl-5 sm:pl-8' : 'pr-5 sm:pr-8'} ${
              index > 0 ? 'lg:border-l lg:border-line lg:pl-8' : ''
            } ${index === 1 ? 'border-l border-line' : ''} ${index === 3 ? 'border-l border-line' : ''} ${
              index < 2 ? 'border-b border-line lg:border-b-0' : ''
            }`}
          >
            <p className="display text-[clamp(2.4rem,4.4vw,3.75rem)] text-ink">
              <CountUp value={stat.value} />
            </p>
            <p className="mt-2 font-semibold text-ink">{stat.label}</p>
            <p className="kicker mt-1 text-[11px] normal-case tracking-normal">{stat.note}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
