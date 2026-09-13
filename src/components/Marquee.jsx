import { Sparkle } from './icons'

const items = [
  'Ingénierie IA',
  'Applications Web',
  'Automatisation',
  'Open Source',
  'APIs & Backend',
]

export default function Marquee() {
  return (
    <div className="overflow-hidden bg-ink py-6">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((group) => (
          <div key={group} className="flex shrink-0 items-center">
            {items.map((item) => (
              <span
                key={item}
                className="flex items-center gap-12 px-6 text-2xl font-semibold whitespace-nowrap text-white lg:text-3xl"
              >
                {item}
                <Sparkle className="size-5 text-primary" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
