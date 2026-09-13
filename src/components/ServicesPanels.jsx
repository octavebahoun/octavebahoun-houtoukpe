import { useState } from 'react'
import { ArrowUpRight } from './icons'
import { services } from './servicesData'

const num = (index) => String(index + 1).padStart(2, '0')

export default function ServicesPanels({ limit }) {
  const visible = limit ? services.slice(0, limit) : services
  const [active, setActive] = useState(0)
  const featured = visible[active] ?? visible[0]

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <article className="relative flex flex-col overflow-hidden rounded-card bg-ink p-8 sm:col-span-2 sm:p-10 lg:row-span-2">
        <div className="flex items-center gap-3.5">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
            {featured.icon}
          </span>
          <span className="text-sm font-semibold tracking-wide text-primary">
            {num(active)} — En vedette
          </span>
        </div>

        <h3 className="mt-5 text-3xl font-bold text-white">{featured.title}</h3>
        <p className="mt-3 max-w-md text-white/60">{featured.description}</p>

        <div className="mt-6 min-h-[180px] flex-1 overflow-hidden rounded-2xl bg-black/25 [&_svg]:h-full [&_svg]:w-full">
          {featured.visual}
        </div>

        <div className="mt-6 flex items-end justify-between gap-4">
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

      {visible.map((service, index) =>
        index === active ? null : (
          <button
            type="button"
            key={service.title}
            onClick={() => setActive(index)}
            aria-label={`Mettre « ${service.title} » en vedette`}
            className="group flex flex-col justify-between gap-4 rounded-card bg-card p-6 text-left transition-colors hover:bg-soft lg:min-h-[240px]"
          >
            <div className="flex items-start justify-between">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {service.icon}
              </span>
              <span className="text-[15px] font-bold text-faint">{num(index)}</span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-ink">{service.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted">
                {service.description}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-ink">
                Mettre en vedette
              </span>
              <span className="flex size-10 items-center justify-center rounded-full bg-white text-ink transition-colors group-hover:bg-primary group-hover:text-white">
                <ArrowUpRight className="size-[17px]" />
              </span>
            </div>
          </button>
        ),
      )}
    </div>
  )
}
