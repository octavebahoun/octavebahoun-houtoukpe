import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { catalog } from '../data/projects'
import { EMAIL, profile, SOURCE_URL } from '../data/profile'
import { useCopy } from '../hooks/useCopy'
import { FORMSPREE_ENDPOINT } from '../lib/api'
import { anchorHandler } from '../lib/navigation'
import { scrollToTarget } from '../lib/scroll'
import { socials } from '../lib/socials'
import { ArrowUp, ArrowUpRight, Copy, Send } from './icons'
import { Button } from './ui/Button'
import { LiveClock } from './ui/LiveClock'

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Projets', to: '/projects' },
  { label: 'Services', to: '/services' },
  { label: 'À propos', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'FAQ', to: '/faq' },
]

const featured = catalog.filter((project) => project.featured).slice(0, 5)

function Column({ title, children }) {
  return (
    <div>
      <h3 className="kicker text-white/40">{title}</h3>
      <ul className="mt-5 space-y-2.5 text-[15px]">{children}</ul>
    </div>
  )
}

function FooterLink({ to, href, children }) {
  const className =
    'group inline-flex items-center gap-1.5 text-white/70 transition-colors hover:text-white'
  if (to) {
    return (
      <li>
        <Link to={to} className={className}>
          {children}
        </Link>
      </li>
    )
  }
  return (
    <li>
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
        <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
      </a>
    </li>
  )
}

function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('sending')
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, type: 'newsletter' }),
      })
      if (!response.ok) throw new Error('Formspree error')
      setEmail('')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      <h3 className="kicker text-white/40">Journal</h3>
      <p className="mt-5 text-[15px] text-white/60">
        Un email quand je publie un article ou un projet. Pas plus.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 pl-5 focus-within:border-white/30"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="vous@exemple.com"
          aria-label="Votre email"
          className="w-full min-w-0 bg-transparent text-[15px] text-white placeholder:text-white/35 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="S'abonner"
          disabled={status === 'sending'}
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-transform hover:scale-105 disabled:opacity-60"
        >
          <Send className="size-4" />
        </button>
      </form>
      <p className="mt-3 min-h-5 text-sm" aria-live="polite">
        {status === 'success' && <span className="text-primary">Inscription confirmée, merci !</span>}
        {status === 'error' && <span className="text-white/70">L&apos;inscription a échoué, réessayez plus tard.</span>}
      </p>
    </div>
  )
}

export default function Footer() {
  const navigate = useNavigate()
  const copy = useCopy()
  const wordmark = useRef(null)
  const { scrollYProgress } = useScroll({ target: wordmark, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['35%', '0%'])

  return (
    <footer className="mt-24 px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="relative overflow-hidden rounded-[32px] bg-night text-white sm:rounded-[40px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]"
        />

        <div className="container-site relative pt-20 sm:pt-24">
          <div className="flex flex-wrap items-end justify-between gap-10">
            <h2 className="display max-w-3xl text-[clamp(2.6rem,6.5vw,5.5rem)] text-white">
              Un projet, une idée,
              <br />
              une <span className="accent">question</span> ?
            </h2>

            <div className="flex flex-col items-start gap-3">
              <Button
                href="/#contact"
                onClick={anchorHandler(navigate, '/#contact')}
                variant="accent"
                size="lg"
              >
                Démarrer un projet
              </Button>
              <button
                type="button"
                onClick={() => copy(EMAIL, 'Email copié')}
                className="group flex items-center gap-2 pl-2 text-[15px] text-white/60 transition-colors hover:text-white"
              >
                <Copy className="size-4" />
                {EMAIL}
              </button>
            </div>
          </div>

          <div className="mt-20 grid gap-12 border-t border-white/10 pt-14 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.4fr]">
            <Column title="Navigation">
              {navLinks.map((link) => (
                <FooterLink key={link.to} to={link.to}>
                  {link.label}
                </FooterLink>
              ))}
            </Column>

            <Column title="Projets phares">
              {featured.map((project) => (
                <FooterLink key={project.slug} to={`/projects/${project.slug}`}>
                  {project.title}
                </FooterLink>
              ))}
            </Column>

            <Column title="Réseaux">
              {socials.map((social) => (
                <FooterLink key={social.label} href={social.href}>
                  {social.label}
                </FooterLink>
              ))}
              <FooterLink href={SOURCE_URL}>Code source du site</FooterLink>
            </Column>

            <Newsletter />
          </div>
        </div>

        <div ref={wordmark} className="relative mt-16 overflow-hidden">
          <motion.p
            aria-hidden="true"
            style={{ y }}
            className="display bg-linear-to-b from-white/20 to-white/[0.02] bg-clip-text text-center text-[24vw] leading-[0.78] tracking-[-0.06em] text-transparent select-none"
          >
            Oktav<span className="text-primary [-webkit-text-fill-color:currentColor]">.</span>
          </motion.p>
        </div>

        <div className="container-site relative flex flex-col gap-3 border-t border-white/10 py-6 text-[13px] text-white/50 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-8">
          <p>
            © {new Date().getFullYear()} {profile.fullName}
          </p>
          <p className="flex items-center gap-4 font-mono text-xs">
            {profile.cities.map((city) => (
              <span key={city.label}>
                {city.label} <LiveClock timeZone={city.timeZone} className="text-white/80" />
              </span>
            ))}
          </p>
          <p className="flex items-center gap-5">
            <a href={SOURCE_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
              Conçu & codé par Oktav — open source
            </a>
            <button
              type="button"
              onClick={() => scrollToTarget(0)}
              className="flex items-center gap-1.5 whitespace-nowrap text-white/70 transition-colors hover:text-white"
            >
              Haut de page
              <ArrowUp className="size-3.5" />
            </button>
          </p>
        </div>
      </div>
    </footer>
  )
}
