// Logo Simple Icons : couleur de marque, ou couleur du texte si la marque est trop sombre
function luminance(hex) {
  const [r, g, b] = [0, 2, 4].map((offset) => {
    const channel = parseInt(hex.slice(offset, offset + 2), 16) / 255
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function TechIcon({ icon, className = 'size-6', mono = false }) {
  if (!icon) return null
  const dark = luminance(icon.hex) < 0.06
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={mono || dark ? 'currentColor' : `#${icon.hex}`}
      role="img"
      aria-label={icon.title}
    >
      <path d={icon.path} />
    </svg>
  )
}
