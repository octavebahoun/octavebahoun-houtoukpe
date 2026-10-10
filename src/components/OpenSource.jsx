import { now } from '../data/projects'
import { GITHUB_URL, SOURCE_URL } from '../data/profile'
import { cx } from '../lib/cx'
import { daysUntil, formatDate, formatNumber, timeAgo } from '../lib/format'
import { useGithub } from '../lib/github'
import Heatmap from './Heatmap'
import { ArrowUpRight, GitBranch, GitHub, GitMerge, GitPullRequest, Sparkle, Star } from './icons'
import { Reveal, Stagger, StaggerItem } from './Reveal'
import { Accent, StatusDot } from './ui/Bits'
import { Button } from './ui/Button'
import { CountUp } from './ui/CountUp'
import { SectionHeading } from './ui/SectionHeading'

const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  Python: '#3572a5',
  'C++': '#f34b7d',
  PHP: '#4f5d95',
  CSS: '#663399',
  'Jupyter Notebook': '#da5b0b',
  Java: '#b07219',
  Shell: '#89e051',
  Vue: '#41b883',
}

const activityLabels = {
  push: { label: 'Push', Icon: GitBranch },
  merge: { label: 'PR fusionnée', Icon: GitMerge },
  pr: { label: 'PR ouverte', Icon: GitPullRequest },
  repo: { label: 'Nouveau dépôt', Icon: Sparkle },
  release: { label: 'Release', Icon: Star },
}

function Card({ title, children, className }) {
  return (
    <div className={cx('flex h-full flex-col rounded-card border border-line bg-surface p-6 sm:p-7', className)}>
      <h3 className="kicker">{title}</h3>
      {children}
    </div>
  )
}

function Languages({ languages }) {
  return (
    <Card title="Langages (octets de code)">
      <div className="mt-6 flex h-3 overflow-hidden rounded-full bg-card">
        {languages.map((language) => (
          <span
            key={language.name}
            title={`${language.name} ${language.share} %`}
            style={{ width: `${language.share}%`, background: languageColors[language.name] ?? '#8b8a83' }}
          />
        ))}
      </div>
      <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        {languages.map((language) => (
          <li key={language.name} className="flex items-center gap-2">
            <span className="size-2.5 rounded-full" style={{ background: languageColors[language.name] ?? '#8b8a83' }} />
            <span className="truncate font-medium text-ink">{language.name}</span>
            <span className="ml-auto font-mono text-xs text-faint">{language.share}%</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

function Activity({ activity }) {
  return (
    <Card title="Activité récente">
      <ul className="mt-5 space-y-1">
        {activity.slice(0, 5).map((item) => {
          const { label, Icon } = activityLabels[item.kind] ?? activityLabels.push
          return (
            <li key={`${item.kind}-${item.repo}-${item.detail}-${item.date}`}>
              <a
                href={`${GITHUB_URL}/${item.repo}`}
                target="_blank"
                rel="noreferrer"
                className="group -mx-2 flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-card"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-ink">
                    {label} · {item.repo}
                  </span>
                  {item.detail && <span className="block truncate font-mono text-[11px] text-faint">{item.detail}</span>}
                </span>
                <span className="shrink-0 text-xs text-faint">{timeAgo(item.date)}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}

function Now() {
  return (
    <Card title="En ce moment">
      <ul className="mt-5 space-y-4">
        {now.map((item) => {
          const days = item.deadline ? daysUntil(item.deadline) : null
          return (
            <li key={item.title}>
              <a href={item.href} target="_blank" rel="noreferrer" className="group block">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-ink transition-colors group-hover:text-primary">{item.title}</span>
                  <span className="rounded-full bg-card px-2 py-0.5 font-mono text-[10px] text-muted">{item.badge}</span>
                  {days !== null && days >= 0 && (
                    <span className="ml-auto font-mono text-[11px] font-semibold text-primary-ink">
                      J-{days}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm leading-snug">{item.text}</p>
                <p className="mt-1.5 font-mono text-[11px] text-faint">
                  {item.role}
                  {item.deadline && ` · ${item.deadlineLabel} ${formatDate(item.deadline, { day: 'numeric', month: 'short' })}`}
                </p>
              </a>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}

export default function OpenSource() {
  const github = useGithub()
  const { totals } = github

  return (
    <section className="py-16 sm:py-24 lg:py-28" aria-labelledby="oss-title">
      <div className="container-site">
        <SectionHeading
          index="06"
          label="Open source"
          title={
            <span id="oss-title">
              Construit <Accent>en public</Accent>
            </span>
          }
          description="La plupart de mes projets vivent sur GitHub, ce site compris. Les chiffres ci-dessous sont chargés en direct depuis l'API."
        />

        <Reveal className="mt-14 rounded-[28px] border border-line bg-surface p-6 sm:p-9">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="flex items-center gap-2 text-sm font-medium text-ink">
                <StatusDot /> En direct de github.com/octavebahoun
              </p>
              <p className="display mt-3 text-[clamp(2.6rem,5vw,4rem)] text-ink">
                <CountUp value={totals.contributions} />{' '}
                <span className="text-[0.45em] font-semibold tracking-tight text-muted">contributions en 12 mois</span>
              </p>
            </div>
            <dl className="flex gap-8 text-sm">
              <div>
                <dt className="kicker text-[11px]">Série record</dt>
                <dd className="mt-1 text-2xl font-bold text-ink">{totals.longest} j</dd>
              </div>
              <div>
                <dt className="kicker text-[11px]">Série en cours</dt>
                <dd className="mt-1 text-2xl font-bold text-ink">{totals.current} j</dd>
              </div>
              <div>
                <dt className="kicker text-[11px]">Pull requests</dt>
                <dd className="mt-1 text-2xl font-bold text-ink">{formatNumber(totals.pullRequests)}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-8">
            <Heatmap days={github.calendar} />
          </div>
        </Reveal>

        <Stagger className="mt-4 grid gap-4 lg:grid-cols-3">
          <StaggerItem className="h-full max-sm:hidden">
            <Languages languages={github.languages} />
          </StaggerItem>
          <StaggerItem className="h-full max-sm:hidden">
            <Activity activity={github.activity} />
          </StaggerItem>
          <StaggerItem className="h-full">
            <Now />
          </StaggerItem>
        </Stagger>

        <Reveal className="mt-10 flex flex-wrap items-center gap-4">
          <Button href={GITHUB_URL} icon={<GitHub className="size-4" />}>
            Suivre sur GitHub
          </Button>
          <a
            href={SOURCE_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-ink"
          >
            Ce portfolio est open source
            <ArrowUpRight className="size-4 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
