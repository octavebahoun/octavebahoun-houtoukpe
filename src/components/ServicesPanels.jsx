import { useState } from 'react'
import ServicesAccordion from './ServicesAccordion'
import { services } from './servicesData'

function Panel({ service, index, active, onSelect }) {
  const isActive = index === active

  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      aria-expanded={isActive}
      className={`relative overflow-hidden rounded-card text-left transition-[flex-grow,background-color] duration-500 ease-out ${
        isActive ? 'flex-[4] bg-ink' : 'flex-[1] bg-card hover:bg-soft'
      }`}
    >
      {isActive ? (
        <div className="flex h-full min-w-0 flex-col p-8">
          <p className="text-2xl font-bold text-white">
            <span className="mr-4">{String(index + 1).padStart(2, '0')}.</span>
            {service.title}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-5 max-w-xl text-white/60">{service.description}</p>

          {service.visual && (
            <div className="mt-6 min-h-0 flex-1 overflow-hidden rounded-t-2xl">
              {service.visual}
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-between py-8">
          <span className="text-xl font-bold text-ink">
            {String(index + 1).padStart(2, '0')}.
          </span>

          <span className="text-lg font-bold whitespace-nowrap text-ink [writing-mode:vertical-rl] rotate-180">
            {service.title}
          </span>

          <span className="flex size-10 items-center justify-center rounded-full bg-white text-ink">
            <svg
              viewBox="0 0 24 24"
              className="size-4 fill-none stroke-current stroke-2"
              aria-hidden="true"
            >
              <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      )}
    </button>
  )
}

export default function ServicesPanels({ limit }) {
  const [active, setActive] = useState(1)
  const visible = limit ? services.slice(0, limit) : services

  return (
    <>
      <div className="hidden h-[560px] gap-3 lg:flex">
        {visible.map((service, index) => (
          <Panel
            key={service.title}
            service={service}
            index={index}
            active={active}
            onSelect={setActive}
          />
        ))}
      </div>

      <div className="lg:hidden">
        <ServicesAccordion limit={limit} />
      </div>
    </>
  )
}
