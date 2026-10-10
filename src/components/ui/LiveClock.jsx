import { useEffect, useState } from 'react'

const formatters = new Map()

function timeIn(timeZone) {
  if (!formatters.has(timeZone)) {
    formatters.set(
      timeZone,
      new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone }),
    )
  }
  return formatters.get(timeZone).format(new Date())
}

// Heure locale d'une ville, mise à jour à chaque nouvelle minute
export function LiveClock({ timeZone, className }) {
  const [time, setTime] = useState(() => timeIn(timeZone))

  useEffect(() => {
    let interval
    const sync = () => setTime(timeIn(timeZone))
    const timeout = setTimeout(
      () => {
        sync()
        interval = setInterval(sync, 60_000)
      },
      60_000 - (Date.now() % 60_000),
    )
    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [timeZone])

  return (
    <time className={className} suppressHydrationWarning>
      {time}
    </time>
  )
}
