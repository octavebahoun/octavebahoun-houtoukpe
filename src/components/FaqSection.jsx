import { Link } from 'react-router-dom'
import FaqAccordion from './FaqAccordion'
import { Mail, Sparkle } from './icons'

export default function FaqSection({ limit }) {
  return (
    <section className="mx-auto max-w-site px-6 py-20">
      <p className="flex items-center justify-center gap-3 text-sm font-semibold text-ink">
        <span className="h-px w-8 bg-primary" />
        FAQ
      </p>

      <h2 className="mt-4 text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
        Des questions ?{' '}
        <span className="font-medium text-primary italic">Réponses ici</span>
        <Sparkle className="ml-2 inline-block size-4 -translate-y-3 text-ink" />
      </h2>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.8fr_1fr]">
        <div>
          <FaqAccordion limit={limit} />

          {limit && (
            <div className="mt-8 text-center">
              <Link
                to="/faq"
                className="inline-block rounded-full border-2 border-ink px-8 py-3.5 font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
              >
                Toutes les questions
              </Link>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6 self-start">
          <div className="overflow-hidden rounded-card bg-ink">
            <div className="p-8 text-center">
              <span className="mx-auto flex size-14 items-center justify-center">
                <svg viewBox="0 0 48 48" className="size-14" aria-hidden="true">
                  <path
                    d="M6 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H16l-8 6V10z"
                    fill="#fe4619"
                  />
                  <circle cx="14" cy="16" r="2" fill="#fff" />
                  <circle cx="20" cy="16" r="2" fill="#fff" />
                  <circle cx="26" cy="16" r="2" fill="#fff" />
                  <path
                    d="M28 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4h-4l-6 5v-5h-2a4 4 0 0 1-4-4v-2"
                    fill="#fff"
                  />
                </svg>
              </span>

              <p className="mt-4 text-xl font-bold text-white">
                Une question différente ?
              </p>
              <p className="mt-3 text-white/60">
                Des réponses rapides, garanties.
              </p>

              <a
                href="#contact"
                className="mt-6 inline-block rounded-full bg-primary px-7 py-3 font-semibold text-white transition-colors hover:bg-primary-hover"
              >
                Me contacter
              </a>
            </div>

            <div className="h-24 bg-primary" />
          </div>

          <div className="flex items-center gap-4 rounded-card bg-white p-6 shadow-soft">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">
              <Mail />
            </span>
            <div>
              <p className="text-sm">Votre projet, ma priorité</p>
              <p className="font-bold text-ink">Réponse sous 24 h</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
