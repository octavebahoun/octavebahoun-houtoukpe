import { ArrowUpRight, Calendar } from './icons'

export const CAL_URL = 'https://cal.com/octave-bahoun-mf6wgj'

export default function BookingBand() {
  return (
    <section className="mx-auto max-w-site px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-6 rounded-card bg-primary px-8 py-8 sm:px-10">
        <div className="flex items-center gap-5">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
            <Calendar className="size-6" />
          </span>
          <div>
            <p className="text-xl font-bold text-white">
              Parlons de votre projet
            </p>
            <p className="mt-1 text-white/80">
              Réservez un créneau de 30 minutes dans mon agenda — c&apos;est
              gratuit.
            </p>
          </div>
        </div>

        <a
          href={CAL_URL}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-3 rounded-full bg-ink py-2 pr-2 pl-7 font-semibold whitespace-nowrap text-white transition-colors hover:bg-white hover:text-ink"
        >
          Prendre un RDV
          <span className="flex size-10 items-center justify-center rounded-full bg-primary text-white">
            <ArrowUpRight className="size-4" />
          </span>
        </a>
      </div>
    </section>
  )
}
