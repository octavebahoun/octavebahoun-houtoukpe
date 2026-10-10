export function formatDate(value, options) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString(
    'fr-FR',
    options ?? { day: 'numeric', month: 'long', year: 'numeric' },
  )
}

export function readingTime(content = '') {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.round(words / 200))} min de lecture`
}

const numberFormat = new Intl.NumberFormat('fr-FR')

// Espace insécable classique : l'espace fine (U+202F) manque dans certaines polices
export function formatNumber(value) {
  return numberFormat.format(value).replace(/\u202f/g, '\u00a0')
}

const relative = new Intl.RelativeTimeFormat('fr-FR', { numeric: 'auto' })

const UNITS = [
  ['year', 31536000],
  ['month', 2592000],
  ['week', 604800],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
]

export function timeAgo(value) {
  const seconds = (new Date(value).getTime() - Date.now()) / 1000
  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size) {
      return relative.format(Math.round(seconds / size), unit)
    }
  }
  return "à l'instant"
}

// Jours restants avant une date (0 = aujourd'hui, négatif = passée)
export function daysUntil(value) {
  const target = new Date(`${value}T23:59:59`)
  return Math.ceil((target.getTime() - Date.now()) / 86400000)
}

export function slugify(value) {
  return (value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
