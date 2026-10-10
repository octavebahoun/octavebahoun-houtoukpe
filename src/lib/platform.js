// Libellé du raccourci de la palette, adapté au système (⌘K sur Mac, Ctrl K ailleurs)
const isMac =
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)

export const shortcutLabel = isMac ? '⌘K' : 'Ctrl K'
