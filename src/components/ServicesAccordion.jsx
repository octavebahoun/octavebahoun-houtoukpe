import { useState } from 'react'
import { ArrowUpRight } from './icons'
import { services } from './servicesData'

export default function ServicesAccordion({ limit }) {
  const [openIndex, setOpenIndex] = useState(1)
  const visible = limit ? services.slice(0, limit) : services

  return (
    <div className="flex flex-col gap-5">
      {visible.map((service, index) => {
        const open = index === openIndex

        return (
          <div
            key={service.title}
            className={`overflow-hidden rounded-card transition-colors ${
              open ? 'bg-ink' : 'bg-card'
            }`}
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? -1 : index)}
              className="flex w-full items-center gap-6 px-6 py-7 text-left sm:px-10"
            >
              <span
                className={`w-14 text-2xl font-bold sm:w-40 sm:text-3xl ${
                  open ? 'text-white' : 'text-ink'
                }`}
              >
                {String(index + 1).padStart(2, '0')}.
              </span>
              <span
                className={`flex-1 text-2xl font-bold sm:text-3xl ${
                  open ? 'text-white' : 'text-ink'
                }`}
              >
                {service.title}
              </span>
              <span
                className={`flex size-11 shrink-0 items-center justify-center rounded-full transition-colors sm:size-14 ${
                  open ? 'bg-primary text-white' : 'bg-white text-ink'
                }`}
              >
                <ArrowUpRight className="size-5" />
              </span>
            </button>

            {open && (
              <div className="px-6 sm:px-10">
                <div className="flex flex-wrap gap-3 sm:pl-40">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-6 max-w-2xl text-white/60 sm:pl-40">
                  {service.description}
                </p>

                {service.visual && (
                  <div className="mt-8 overflow-hidden rounded-t-2xl sm:pl-40">
                    {service.visual}
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
