import { socials } from '../lib/socials'
import { useGithubStats } from '../hooks/useGithubStats'
import { CAL_URL } from './BookingBand'
import HeroBlob from './HeroBlob'
import { ArrowUpRight, Sparkle } from './icons'

const skills = [
  { label: 'React', tone: 'dark' },
  { label: 'Node.js', tone: 'orange' },
  { label: 'Python', tone: 'dark' },
  { label: 'Open Source', tone: 'orange' },
  { label: 'Ingénierie IA', tone: 'dark' },
]

function Pill({ tone = 'orange', children }) {
  return (
    <span
      className={`rounded-full px-5 py-2.5 text-sm font-semibold text-white ${
        tone === 'dark' ? 'bg-ink' : 'bg-primary'
      }`}
    >
      {children}
    </span>
  )
}

export default function Hero() {
  const stats = useGithubStats()

  return (
    <section id="home" className="relative mx-auto max-w-site overflow-hidden px-6 pt-12">
      <div className="relative text-center">
        <p className="flex items-center justify-center gap-3 text-sm font-semibold text-ink">
          <span className="h-px w-8 bg-primary" />
          Bonjour !
        </p>

        <h1 className="mt-5 text-5xl font-extrabold tracking-tight sm:text-6xl">
          Je suis <span className="text-primary">Oktav Bahoun</span>
          <Sparkle className="ml-3 inline-block size-4 -translate-y-3 text-ink" />
        </h1>

        <p className="mt-4 text-lg">Ingénieur IA freelance & open source</p>

        <div className="absolute top-0 right-0 hidden size-28 lg:block">
          <svg viewBox="0 0 100 100" className="size-full animate-spin-slow">
            <defs>
              <path
                id="badge-circle"
                d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
              />
            </defs>
            <text fontSize="11" fontWeight="600" letterSpacing="2.5" fill="#0d0d0d">
              <textPath href="#badge-circle">
                DISPONIBLE • FREELANCE • DISPONIBLE •
              </textPath>
            </text>
          </svg>
          <span className="absolute inset-0 m-auto flex size-11 items-center justify-center rounded-full bg-primary text-white">
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      </div>

      <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
        <div className="order-2 lg:order-1">
          <span className="font-serif text-6xl leading-none text-primary">&ldquo;</span>
          <p className="mt-2 max-w-xs text-lg">
            Oktav transforme les idées en applications web soignées – vivement
            recommandé !
          </p>

          <div className="mt-10 flex items-center gap-4">
            {stats.avatar && (
              <img
                src={stats.avatar}
                alt="Avatar GitHub"
                className="size-12 rounded-full border-2 border-white shadow-soft"
              />
            )}
            <div>
              <p className="font-semibold text-primary">
                {stats.repos} dépôts · {stats.stars} étoiles
              </p>
              <p className="text-sm text-faint">
                {stats.followers} followers GitHub
              </p>
            </div>
          </div>
        </div>

        <div className="relative order-1 mx-auto w-72 sm:w-80 lg:order-2 lg:w-[420px]">
          <HeroBlob className="absolute left-1/2 top-8 aspect-square w-[125%] -translate-x-1/2" />

          <img
            src="/images/profile-cutout.png"
            alt="Oktav Bahoun"
            className="relative w-full"
          />

          <div className="absolute bottom-16 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
            <a
              href="#projects"
              className="flex items-center gap-3 rounded-full bg-ink py-2 pr-2 pl-6 font-semibold whitespace-nowrap text-white"
            >
              Portfolio
              <span className="flex size-9 items-center justify-center rounded-full bg-primary text-white">
                <ArrowUpRight />
              </span>
            </a>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border-2 border-ink bg-white px-6 py-2.5 font-semibold whitespace-nowrap text-ink transition-colors hover:border-primary hover:text-primary"
            >
              Prendre un RDV
            </a>
          </div>
        </div>

        <div className="order-3 flex flex-col items-center gap-3 lg:items-end">
          <div className="flex items-center gap-3">
            {skills.slice(0, 2).map((skill) => (
              <Pill key={skill.label} tone={skill.tone}>
                {skill.label}
              </Pill>
            ))}
          </div>
          <div className="flex items-center gap-3 lg:pr-12">
            <span className="flex size-11 items-center justify-center rounded-full bg-primary text-white">
              <Sparkle />
            </span>
            <Pill tone={skills[2].tone}>{skills[2].label}</Pill>
          </div>
          <div className="flex items-center gap-3">
            {skills.slice(3, 5).map((skill) => (
              <Pill key={skill.label} tone={skill.tone}>
                {skill.label}
              </Pill>
            ))}
          </div>

          <div className="mt-6 text-center lg:text-right">
            <p className="text-sm">Suivez-moi</p>
            <div className="mt-3 flex items-center gap-3 lg:justify-end">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  className="flex size-11 items-center justify-center rounded-full bg-white text-ink shadow-soft transition-colors hover:text-primary"
                >
                  <Icon className="size-4.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
