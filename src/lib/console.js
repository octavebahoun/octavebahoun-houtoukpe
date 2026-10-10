import { EMAIL, SOURCE_URL } from '../data/profile'

// Un petit mot pour les curieux qui ouvrent la console
export function greet() {
  if (typeof window === 'undefined' || window.__oktavGreeted) return
  window.__oktavGreeted = true

  const title = 'font: 800 22px system-ui; color: #fe4619;'
  const body = 'font: 13px ui-monospace, monospace; color: inherit;'

  console.log('%cOktav.%c\n\nTu lis la console ? On devrait parler.', title, body)
  console.log(
    `%c→ ${EMAIL}\n→ Code source : ${SOURCE_URL}\n→ Astuce : Ctrl/⌘ + K pour tout explorer au clavier.`,
    body,
  )
}
