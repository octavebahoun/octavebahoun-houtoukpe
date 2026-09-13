import { ArrowUpRight } from './icons'
import { services } from './servicesData'

function NodeMotif({ className = '' }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      width="240"
      height="240"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <circle cx="40" cy="60" r="8" />
      <circle cx="110" cy="30" r="8" />
      <circle cx="150" cy="90" r="10" />
      <circle cx="90" cy="120" r="8" />
      <circle cx="40" cy="150" r="8" />
      <circle cx="160" cy="160" r="8" />
      <path d="M46 64 104 34M116 34 143 84M148 98 96 116M84 118 46 146M96 122 154 156M110 38 90 112" />
    </svg>
  )
}

export default function ServicesPanels({ limit }) {
  const visible = limit ? services.slice(0, limit) : services
  const [featured, ...rest] = visible

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:[grid-auto-rows:minmax(232px,auto)]">
      <article className="relative flex flex-col justify-between overflow-hidden rounded-card bg-ink p-8 sm:col-span-2 sm:p-10 lg:row-span-2">
        <NodeMotif className="pointer-events-none absolute -right-6 -bottom-7 text-primary opacity-15" />

        <div className="relative">
          <div className="flex items-center gap-3.5">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
              {featured.icon}
            </span>
            <span className="text-sm font-semibold tracking-wide text-primary">
              01 — Service phare
            </span>
          </div>

          <h3 className="mt-6 text-3xl font-bold text-white">{featured.title}</h3>
          <p className="mt-4 max-w-md text-white/60">{featured.description}</p>
        </div>

        <div className="relative mt-8 flex items-end justify-between gap-4">
          <div className="flex flex-wrap gap-2.5">
            {featured.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-white">
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      </article>

      {rest.map((service, index) => (
        <article
          key={service.title}
          className="group flex flex-col justify-between gap-4 rounded-card bg-card p-6 transition-colors hover:bg-soft"
        >
          <div className="flex items-start justify-between">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {service.icon}
            </span>
            <span className="text-[15px] font-bold text-faint">
              {String(index + 2).padStart(2, '0')}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-ink">{service.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm text-muted">
              {service.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-ink">
              En savoir plus
            </span>
            <span className="flex size-10 items-center justify-center rounded-full bg-white text-ink transition-colors group-hover:bg-primary group-hover:text-white">
              <ArrowUpRight className="size-[17px]" />
            </span>
          </div>
        </article>
      ))}
    </div>
  )
}
