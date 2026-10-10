import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { plans } from '../data/pricing'
import { CAL_URL, EMAIL, LINKEDIN_URL, MALT_URL, profile } from '../data/profile'
import { useCopy } from '../hooks/useCopy'
import { FORMSPREE_ENDPOINT } from '../lib/api'
import { cx } from '../lib/cx'
import { ArrowUpRight, Calendar, Check, Copy, Send } from './icons'
import { Reveal } from './Reveal'
import { EASE_EXPO } from '../lib/easing'
import { Accent, StatusDot } from './ui/Bits'
import { LiveClock } from './ui/LiveClock'
import { SectionHeading } from './ui/SectionHeading'

const interests = [
  'Ingénierie IA',
  'Agents & automatisation',
  'Développement web',
  'Application SaaS',
  'Stage',
  'Autre',
]

const budgets = ['< 1 000 €', '1 000 – 5 000 €', '5 000 – 10 000 €', '> 10 000 €', 'À définir']

const initialForm = {
  name: '',
  email: '',
  phone: '',
  interest: '',
  budget: '',
  country: '',
  message: '',
}

const fieldClass =
  'w-full rounded-field border border-line bg-paper/60 px-4 py-3.5 text-[15px] text-ink placeholder:text-faint transition-[border-color,box-shadow] focus:border-primary focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_14%,transparent)] focus:outline-none'

function Field({ label, htmlFor, optional, children, className }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 flex items-center justify-between text-sm font-semibold text-ink">
        {label}
        {optional && <span className="font-mono text-[11px] font-normal text-faint">facultatif</span>}
      </label>
      {children}
    </div>
  )
}

function ChoiceGroup({ legend, name, options, value, onChange, required }) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-ink">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = value === option
          return (
            <label
              key={option}
              className={cx(
                'relative cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary',
                checked
                  ? 'border-ink bg-ink text-paper'
                  : 'border-line bg-surface text-muted hover:border-ink/30 hover:text-ink',
              )}
            >
              <input
                type="radio"
                name={name}
                value={option}
                checked={checked}
                required={required}
                onChange={() => onChange(option)}
                className="sr-only"
              />
              {checked && <Check className="mr-1.5 -ml-0.5 inline size-3.5" />}
              {option}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export default function ContactSection({ index = '10' }) {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const copy = useCopy()

  function update(field) {
    return (event) => setForm((current) => ({ ...current, [field]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
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
    <section id="contact" className="scroll-mt-24 py-24 sm:py-32" aria-labelledby="contact-title">
      <div className="container-site">
        <SectionHeading
          index={index}
          label="Contact"
          title={
            <span id="contact-title">
              Un projet ? <Accent>Parlons-en.</Accent>
            </span>
          }
          description="Mission freelance, stage, collaboration open source ou simple question : quelques lignes suffisent. Je réponds sous 24 h."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
          <Reveal>
            <form
              onSubmit={handleSubmit}
              className="grid gap-7 rounded-[28px] border border-line bg-surface p-6 sm:p-9"
            >
              <ChoiceGroup
                legend="Je viens pour…"
                name="interest"
                options={interests}
                value={form.interest}
                onChange={(interest) => setForm((current) => ({ ...current, interest }))}
                required
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Votre nom" htmlFor="name">
                  <input id="name" required autoComplete="name" value={form.name} onChange={update('name')} placeholder="Awa Dossou" className={fieldClass} />
                </Field>
                <Field label="Email" htmlFor="email">
                  <input id="email" type="email" required autoComplete="email" value={form.email} onChange={update('email')} placeholder="awa@entreprise.com" className={fieldClass} />
                </Field>
                <Field label="Téléphone" htmlFor="phone" optional>
                  <input id="phone" type="tel" autoComplete="tel" value={form.phone} onChange={update('phone')} placeholder="+229 …" className={fieldClass} />
                </Field>
                <Field label="Pays" htmlFor="country">
                  <input id="country" required autoComplete="country-name" value={form.country} onChange={update('country')} placeholder="Bénin, France…" className={fieldClass} />
                </Field>
              </div>

              <ChoiceGroup
                legend="Budget estimé"
                name="budget"
                options={budgets}
                value={form.budget}
                onChange={(budget) => setForm((current) => ({ ...current, budget }))}
                required
              />

              <Field label="Votre message" htmlFor="message">
                <textarea
                  id="message"
                  required
                  rows="5"
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Le contexte, l'objectif, les délais… quelques lignes suffisent."
                  className={cx(fieldClass, 'resize-none')}
                />
              </Field>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group inline-flex h-14 items-center gap-3 rounded-full bg-primary pr-2 pl-7 font-semibold text-white transition-[background-color,box-shadow] hover:bg-primary-hover hover:shadow-lift disabled:cursor-wait disabled:opacity-70"
                >
                  {status === 'sending' ? 'Envoi en cours…' : 'Envoyer le message'}
                  <span className="flex size-10 items-center justify-center rounded-full bg-night text-white transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-rotate-12">
                    <Send className="size-4" />
                  </span>
                </button>
                <p className="text-sm text-faint">Vos données servent uniquement à vous répondre.</p>
              </div>

              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.p
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE_EXPO }}
                    className="flex items-center gap-3 rounded-field bg-primary/10 px-5 py-4 text-sm font-semibold text-primary-ink"
                    role="status"
                  >
                    <Check className="size-4" /> Message envoyé ! Je vous réponds sous 24 h.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-field bg-card px-5 py-4 text-sm font-semibold text-ink"
                    role="alert"
                  >
                    Oups, l&apos;envoi a échoué. Écrivez-moi directement à{' '}
                    <a href={`mailto:${EMAIL}`} className="text-primary-ink underline">
                      {EMAIL}
                    </a>
                    .
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-[28px] bg-night p-7 text-white sm:p-8">
              <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-20 size-64 rounded-full bg-primary/30 blur-[80px]" />
              <p className="relative flex items-center gap-2.5 text-sm font-semibold">
                <StatusDot /> Réponse sous 24 h
              </p>
              <p className="relative mt-2 text-sm text-white/55">{profile.availability}.</p>

              <div className="relative mt-7 space-y-2">
                <button
                  type="button"
                  onClick={() => copy(EMAIL, 'Email copié')}
                  className="group flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-left transition-colors hover:border-white/25"
                >
                  <Copy className="size-4 text-primary" />
                  <span className="min-w-0 flex-1 truncate text-[15px] font-medium">{EMAIL}</span>
                  <span className="font-mono text-[11px] text-white/40 group-hover:text-white/70">copier</span>
                </button>
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 transition-colors hover:border-white/25"
                >
                  <Calendar className="size-4 text-primary" />
                  <span className="flex-1 text-[15px] font-medium">Réserver 30 min — gratuit</span>
                  <ArrowUpRight className="size-4 text-white/40 transition-transform group-hover:rotate-45 group-hover:text-white" />
                </a>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Malt', href: MALT_URL },
                    { label: 'LinkedIn', href: LINKEDIN_URL },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium transition-colors hover:border-white/25"
                    >
                      {link.label}
                      <ArrowUpRight className="size-3.5 text-white/40 group-hover:text-white" />
                    </a>
                  ))}
                </div>
              </div>

              <p className="relative mt-7 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-white/45">
                {profile.cities.map((city) => (
                  <span key={city.label}>
                    {city.label} <LiveClock timeZone={city.timeZone} className="text-white/85" />
                  </span>
                ))}
              </p>
            </div>

            <div className="rounded-[28px] border border-line bg-surface p-7 sm:p-8">
              <p className="kicker">Modes de collaboration</p>
              <ul className="mt-5 divide-y divide-line">
                {plans.map((plan) => (
                  <li key={plan.name} className="flex items-baseline justify-between gap-4 py-3">
                    <span className="font-semibold text-ink">{plan.name}</span>
                    <span className="text-right text-sm">
                      {plan.prefix && <span className="text-faint">{plan.prefix} </span>}
                      <span className="font-semibold text-ink">{plan.price}</span>
                      {plan.unit && <span className="text-faint"> {plan.unit}</span>}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                to="/services#tarifs"
                className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink"
              >
                Comparer les formules
                <ArrowUpRight className="size-3.5 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
