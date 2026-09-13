import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FORMSPREE_ENDPOINT } from '../lib/api'
import { socials } from '../lib/socials'
import { ArrowUpRight } from './icons'

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'À propos', to: '/about' },
  { label: 'Projets', to: '/projects' },
  { label: 'Blogs', to: '/blog' },
  { label: 'FAQ', to: '/faq' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubscribe(event) {
    event.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
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
    <footer className="pt-20">
      <div className="mx-auto max-w-site px-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Restons{' '}
            <span className="font-medium text-primary italic">connectés</span>
          </h2>

          <a
            href="#contact"
            className="flex items-center gap-5 rounded-full bg-primary py-1.5 pr-1.5 pl-7 font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            Me contacter
            <span className="flex size-11 items-center justify-center rounded-full bg-ink text-white">
              <ArrowUpRight />
            </span>
          </a>
        </div>

        <div className="mt-12 grid gap-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary">
                <svg viewBox="0 0 24 24" className="size-4.5 fill-white" aria-hidden="true">
                  <path d="M12 2c1.25 4.7 3.55 7 8.25 8.25-4.7 1.25-7 3.55-8.25 8.25C10.75 13.8 8.45 11.5 3.75 10.25 8.45 9 10.75 6.7 12 2z" />
                </svg>
              </span>
              <span className="text-xl font-bold text-ink">
                Oktav<span className="text-primary">.</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs">
              Ingénieur IA & automatisation freelance. Je construis des produits
              web et des systèmes IA utiles, ouverts et soignés.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-ink"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-primary">Navigation</h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-primary">Contact</h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="mailto:octavebahoun@gmail.com"
                  className="transition-colors hover:text-primary"
                >
                  octavebahoun@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/octavebahoun"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  github.com/octavebahoun
                </a>
              </li>
              <li>Cotonou, Bénin</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-primary">
              Recevez les dernières infos
            </h3>
            <form
              className="mt-5 flex items-center gap-2 rounded-full bg-card p-1.5 pl-5"
              onSubmit={handleSubscribe}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Votre email"
                aria-label="Votre email"
                className="w-full bg-transparent text-[15px] text-ink placeholder:text-faint focus:outline-none"
              />
              <button
                type="submit"
                aria-label="S'abonner"
                disabled={status === 'sending'}
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink text-primary transition-colors hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                <ArrowUpRight className="size-4" />
              </button>
            </form>

            {status === 'success' && (
              <p className="mt-3 text-sm font-semibold text-primary">
                Inscription confirmée, merci !
              </p>
            )}

            {status === 'error' && (
              <p className="mt-3 text-sm font-semibold text-ink">
                L&apos;inscription a échoué, réessaie plus tard.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-16 bg-ink py-5">
        <div className="mx-auto flex max-w-site flex-wrap items-center justify-between gap-3 px-6 text-sm text-white/70">
          <p>
            Copyright © 2026 <span className="text-primary">Oktav</span>. Tous
            droits réservés.
          </p>
          <p>Conditions d&apos;utilisation | Confidentialité</p>
        </div>
      </div>
    </footer>
  )
}
