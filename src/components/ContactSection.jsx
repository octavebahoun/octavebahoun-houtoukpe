import { useState } from 'react'
import { FORMSPREE_ENDPOINT } from '../lib/api'
import { socials } from '../lib/socials'
import { CAL_URL } from './BookingBand'
import { Calendar, Sparkle } from './icons'

const interests = [
  'Ingénierie IA',
  'Agents & Automatisation',
  'Développement Web',
  'Application SaaS',
  'Autre',
]

const budgets = ['< 1 000 €', '1 000 – 5 000 €', '5 000 – 10 000 €', '> 10 000 €']

const initialForm = {
  name: '',
  email: '',
  phone: '',
  interest: '',
  budget: '',
  country: '',
  message: '',
}

const inputClass =
  'w-full rounded-field border border-line bg-white px-5 py-3.5 text-[15px] text-ink placeholder:text-faint transition-colors focus:border-primary focus:outline-none'

const labelClass = 'mb-2 block text-sm font-semibold text-ink'

export default function ContactSection() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')

  function update(field) {
    return (event) => setForm({ ...form, [field]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) throw new Error('Formspree error')

      setForm(initialForm)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-site px-6 py-20">
      <p className="flex items-center justify-center gap-3 text-sm font-semibold text-ink">
        <span className="h-px w-8 bg-primary" />
        Contact
      </p>

      <h2 className="mt-4 text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
        Parlons de votre{' '}
        <span className="font-medium text-primary italic">prochain projet</span>
        <Sparkle className="ml-2 inline-block size-4 -translate-y-3 text-ink" />
      </h2>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="name">
              Votre nom *
            </label>
            <input
              id="name"
              required
              value={form.name}
              onChange={update('name')}
              placeholder="Ex. Awa Dossou"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="email">
              Email *
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={update('email')}
              placeholder="exemple@gmail.com"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="phone">
              Téléphone *
            </label>
            <input
              id="phone"
              value={form.phone}
              onChange={update('phone')}
              placeholder="+229 ..."
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="interest">
              Je suis intéressé par *
            </label>
            <select
              id="interest"
              required
              value={form.interest}
              onChange={update('interest')}
              className={inputClass}
            >
              <option value="">Choisir</option>
              {interests.map((interest) => (
                <option key={interest} value={interest}>
                  {interest}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="budget">
              Budget estimé *
            </label>
            <select
              id="budget"
              required
              value={form.budget}
              onChange={update('budget')}
              className={inputClass}
            >
              <option value="">Choisir</option>
              {budgets.map((budget) => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="country">
              Pays *
            </label>
            <input
              id="country"
              required
              value={form.country}
              onChange={update('country')}
              placeholder="Bénin"
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="message">
              Votre message *
            </label>
            <textarea
              id="message"
              required
              rows="5"
              value={form.message}
              onChange={update('message')}
              placeholder="Décrivez votre projet en quelques lignes..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="rounded-full bg-primary px-8 py-3.5 font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'sending' ? 'Envoi en cours...' : 'Envoyer le message'}
            </button>

            <a
              href={CAL_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-full border-2 border-ink px-7 py-3 font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
            >
              <Calendar className="size-5" />
              Prendre un RDV
            </a>
          </div>

          {status === 'success' && (
            <p className="rounded-field bg-primary/10 px-5 py-4 text-sm font-semibold text-primary sm:col-span-2">
              Message envoyé ! Je te réponds sous 24 h.
            </p>
          )}

          {status === 'error' && (
            <p className="rounded-field bg-ink/5 px-5 py-4 text-sm font-semibold text-ink sm:col-span-2">
              Oups, l&apos;envoi a échoué. Écris-moi directement à{' '}
              <a
                href="mailto:octavebahoun@gmail.com"
                className="text-primary underline"
              >
                octavebahoun@gmail.com
              </a>
              .
            </p>
          )}
        </form>

        <div className="self-start rounded-card bg-ink p-8">
          <h3 className="text-lg font-bold text-primary">Adresse</h3>
          <p className="mt-3 text-white/60">
            Cotonou, Littoral
            <br />
            Bénin
          </p>

          <h3 className="mt-8 text-lg font-bold text-primary">Contact</h3>
          <p className="mt-3 text-white/60">Email : octavebahoun@gmail.com</p>
          <p className="text-white/60">Malt : malt.fr/profile/octavebahoun</p>

          <h3 className="mt-8 text-lg font-bold text-primary">Disponibilité</h3>
          <p className="mt-3 text-white/60">
            Lundi – Vendredi : 9:00 – 18:00
            <br />
            Samedi – Dimanche : sur rendez-vous
          </p>

          <div className="-mx-8 -mb-8 mt-8 rounded-b-card bg-primary p-8">
            <h3 className="text-lg font-bold text-white">Restons connectés</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex size-11 items-center justify-center rounded-full bg-white text-ink transition-colors hover:text-primary"
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
