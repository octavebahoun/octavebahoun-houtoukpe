import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'

const STORAGE_KEY = 'oktav-theme'
const ThemeContext = createContext(null)

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function systemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // Suit le système tant que le visiteur n'a pas choisi lui-même
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      if (!readStored()) setTheme(systemPrefersDark() ? 'dark' : 'light')
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  // Bascule avec une révélation circulaire depuis le point cliqué
  const toggle = useCallback(
    (origin) => {
      const next = theme === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // stockage indisponible : le choix vaut pour la session
      }

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!document.startViewTransition || reduced) {
        setTheme(next)
        return
      }

      const x = origin?.x ?? window.innerWidth - 80
      const y = origin?.y ?? 40
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

      const transition = document.startViewTransition(() => {
        flushSync(() => setTheme(next))
        document.documentElement.classList.toggle('dark', next === 'dark')
      })

      transition.ready
        .then(() => {
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: 650, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' },
          )
        })
        .catch(() => {})
    },
    [theme],
  )

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// eslint-disable-next-line react/only-export-components
export function useTheme() {
  return useContext(ThemeContext)
}
