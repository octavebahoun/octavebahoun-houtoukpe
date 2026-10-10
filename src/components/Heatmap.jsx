import { useInView } from 'motion/react'
import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { cx } from '../lib/cx'
import { formatDate, formatNumber } from '../lib/format'

const LEVELS = [
  'bg-ink/[0.06]',
  'bg-primary/30',
  'bg-primary/55',
  'bg-primary/80',
  'bg-primary',
]

// Écran tactile : pas de survol, on invite à toucher une case
const touchScreen = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

const MONTHS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']

function level(count, max) {
  if (count === 0) return 0
  const ratio = count / max
  if (ratio < 0.12) return 1
  if (ratio < 0.3) return 2
  if (ratio < 0.55) return 3
  return 4
}

function toWeeks(days) {
  const weeks = []
  let week = []
  const first = new Date(`${days[0].date}T12:00:00`)
  for (let pad = 0; pad < first.getDay(); pad += 1) week.push(null)
  for (const day of days) {
    week.push(day)
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
  }
  if (week.length) weeks.push([...week, ...Array(7 - week.length).fill(null)])
  return weeks
}

const Grid = memo(function Grid({ weeks, max, visible, onHover }) {
  return (
    <div className="flex gap-[3px] lg:gap-1" onMouseLeave={() => onHover(null)}>
      {weeks.map((week, column) => (
        <div key={column} className="flex flex-col gap-[3px] lg:gap-1">
          {week.map((day, row) =>
            day ? (
              <span
                key={day.date}
                title={`${day.count} contribution${day.count > 1 ? 's' : ''} · ${formatDate(day.date)}`}
                onMouseEnter={() => onHover(day)}
                onClick={() => onHover(day)}
                className={cx(
                  'size-[11px] rounded-[3px] transition-transform hover:scale-125 lg:size-[15px] lg:rounded-[4px]',
                  LEVELS[level(day.count, max)],
                  visible ? 'animate-cell' : 'opacity-0',
                )}
                style={visible ? { animationDelay: `${column * 14 + row * 20}ms` } : undefined}
              />
            ) : (
              <span key={`empty-${row}`} className="size-[11px] lg:size-[15px]" />
            ),
          )}
        </div>
      ))}
    </div>
  )
})

export default function Heatmap({ days }) {
  const ref = useRef(null)
  const scroller = useRef(null)
  const visible = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(null)
  const weeks = useMemo(() => toWeeks(days), [days])
  const max = useMemo(() => Math.max(...days.map((day) => day.count), 1), [days])

  // Sur petit écran, on montre d'abord les semaines les plus récentes
  useEffect(() => {
    if (scroller.current) scroller.current.scrollLeft = scroller.current.scrollWidth
  }, [])

  const months = useMemo(() => {
    const labels = []
    let previous = -1
    weeks.forEach((week, column) => {
      const firstDay = week.find(Boolean)
      if (!firstDay) return
      const month = new Date(`${firstDay.date}T12:00:00`).getMonth()
      if (month !== previous) {
        labels.push({ column, label: MONTHS[month] })
        previous = month
      }
    })
    return labels.filter((item, index) => index === 0 || item.column - labels[index - 1].column > 2)
  }, [weeks])

  return (
    <div ref={ref}>
      <div
        className="no-scrollbar overflow-x-auto pb-2 max-lg:[mask-image:linear-gradient(to_right,transparent,#000_48px)]"
        ref={scroller}
        data-lenis-prevent-horizontal
      >
        <div className="w-max [--step:14px] lg:[--step:19px]">
          <div className="relative mb-2 h-4 pl-8 font-mono text-[10px] text-faint">
            {months.map((month) => (
              <span key={`${month.label}-${month.column}`} className="absolute" style={{ left: `calc(2rem + ${month.column} * var(--step))` }}>
                {month.label}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="flex w-6 flex-col justify-between py-[14px] font-mono text-[10px] text-faint lg:py-5" aria-hidden="true">
              <span>lun</span>
              <span>mer</span>
              <span>ven</span>
            </div>
            <Grid weeks={weeks} max={max} visible={visible} onHover={setHovered} />
          </div>
        </div>
      </div>

      <p className="mt-2 font-mono text-[11px] text-faint lg:hidden" aria-hidden="true">
        ← Faites glisser pour remonter l&apos;année
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-faint">
        <p className="min-h-4 font-mono" aria-live="polite">
          {hovered
            ? `${formatNumber(hovered.count)} contribution${hovered.count > 1 ? 's' : ''} le ${formatDate(hovered.date)}`
            : touchScreen
              ? 'Touchez une case pour voir le détail'
              : 'Survolez une case pour voir le détail'}
        </p>
        <div className="flex items-center gap-1.5 font-mono">
          moins
          {LEVELS.map((className) => (
            <span key={className} className={cx('size-[11px] rounded-[3px]', className)} />
          ))}
          plus
        </div>
      </div>
    </div>
  )
}
