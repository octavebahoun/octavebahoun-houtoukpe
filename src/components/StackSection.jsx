import { stack, stackMarquee } from '../data/stack'
import { Reveal, Stagger, StaggerItem } from './Reveal'
import { Accent } from './ui/Bits'
import { SectionHeading } from './ui/SectionHeading'
import { TechIcon } from './ui/TechIcon'

function LogoRow({ reverse = false }) {
  const items = reverse ? [...stackMarquee].reverse() : stackMarquee
  return (
    <div className="mask-fade-x flex overflow-hidden">
      <div
        className="flex w-max animate-marquee gap-3 pr-3 hover:[animation-play-state:paused]"
        style={{ animationDirection: reverse ? 'reverse' : 'normal', animationDuration: '48s' }}
      >
        {[...items, ...items].map((tool, index) => (
          <span
            key={`${tool.name}-${index}`}
            className="flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-ink"
          >
            <TechIcon icon={tool.icon} className="size-[18px]" />
            {tool.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function StackSection({ index = '04' }) {
  return (
    <section className="py-16 sm:py-24 lg:py-28" aria-labelledby="stack-title">
      <div className="container-site">
        <SectionHeading
          index={index}
          label="Stack"
          title={
            <span id="stack-title">
              Mes outils de <Accent>tous les jours</Accent>
            </span>
          }
          description="Des outils choisis pour durer : open source quand c'est possible, éprouvés en production, et remplaçables si le projet l'exige."
        />
      </div>

      <Reveal className="mt-14 space-y-3" aria-hidden="true">
        <LogoRow />
        <LogoRow reverse />
      </Reveal>

      <div className="container-site">
        <Stagger className="mt-14 grid gap-4 lg:grid-cols-3">
          {stack.map((group) => (
            <StaggerItem key={group.name} className="rounded-card border border-line bg-surface p-7">
              <h3 className="text-xl font-bold tracking-tight">{group.name}</h3>
              <p className="mt-1 text-sm text-faint">{group.note}</p>
              <ul className="mt-6 grid grid-cols-2 gap-2">
                {group.tools.map((tool) => (
                  <li
                    key={tool.name}
                    className="flex items-center gap-2.5 rounded-xl bg-paper/70 px-3 py-2.5 text-sm font-medium text-ink"
                  >
                    <TechIcon icon={tool.icon} className="size-4 shrink-0" />
                    <span className="truncate">{tool.name}</span>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
