import { Link } from 'react-router-dom'
import { useGithubStats } from '../hooks/useGithubStats'
import HeroBlob from './HeroBlob'
import { ArrowUpRight, Mail, MapPin, Sparkle } from './icons'
import { Reveal } from './Reveal'

export default function AboutMe({ withLink = false }) {
  const stats = useGithubStats()

  return (
    <section className="bg-soft py-20">
      <div className="mx-auto grid max-w-site items-center gap-14 px-6 lg:grid-cols-2">
        <Reveal className="relative mx-auto w-72 sm:w-80">
          <HeroBlob className="absolute left-1/2 top-8 aspect-square w-[125%] -translate-x-1/2" />
          <img
            src="/images/profile-cutout.png"
            alt="Oktav Bahoun"
            className="relative w-full"
          />

          <div className="absolute top-12 -left-2 rounded-card bg-white p-4 shadow-soft">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary">
              <svg viewBox="0 0 24 24" className="size-4 fill-white" aria-hidden="true">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </span>
            <p className="mt-2 text-xs text-faint">Dépôts publics</p>
            <p className="text-2xl font-bold text-ink">{stats.repos}+</p>
          </div>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white py-2 pr-5 pl-2 shadow-soft">
            <span className="flex size-9 items-center justify-center rounded-full bg-ink text-white">
              <Sparkle className="size-4" />
            </span>
            <span className="text-sm font-semibold whitespace-nowrap text-ink">
              AI Engineer
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="flex items-center gap-3 text-sm font-semibold text-ink">
            <span className="h-px w-8 bg-primary" />À propos
          </p>

          <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Qui est{' '}
            <span className="font-medium text-primary italic">
              Oktav Bahoun
            </span>{' '}
            ?
            <Sparkle className="ml-2 inline-block size-4 -translate-y-3 text-ink" />
          </h2>

          <p className="mt-5 max-w-lg">
            Étudiant en informatique à CY Tech (Pau) et co-fondateur
            d&apos;Excellence Team. Je conçois des applications web et des
            systèmes IA — de l&apos;idée au déploiement — et je partage
            volontiers ce que j&apos;apprends avec la communauté tech.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6">
            <div>
              <p className="text-4xl font-extrabold text-ink">{stats.repos}</p>
              <p className="mt-1 text-sm">Dépôts GitHub</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-ink">13</p>
              <p className="mt-1 text-sm">Projets livrés</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-ink">5</p>
              <p className="mt-1 text-sm">Communautés tech</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="mailto:octavebahoun@gmail.com"
              className="flex items-center gap-3 rounded-full bg-white py-2 pr-6 pl-2 shadow-soft transition-colors hover:text-primary"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-primary text-white">
                <Mail className="size-4" />
              </span>
              <span className="text-sm font-semibold">
                octavebahoun@gmail.com
              </span>
            </a>
            <span className="flex items-center gap-3 rounded-full bg-white py-2 pr-6 pl-2 shadow-soft">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary text-white">
                <MapPin className="size-4" />
              </span>
              <span className="text-sm font-semibold">Cotonou, Bénin</span>
            </span>
          </div>

          {withLink && (
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-primary underline decoration-2 underline-offset-4 transition-colors hover:text-primary-hover"
            >
              En savoir plus
              <ArrowUpRight className="size-4" />
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  )
}
