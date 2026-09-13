export function formatDate(value) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function readingTime(content = '') {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.round(words / 200))} min de lecture`
}
