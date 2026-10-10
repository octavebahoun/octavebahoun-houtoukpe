import { AnimatePresence, motion } from 'motion/react'
import { cx } from '../lib/cx'
import { Moon, Sun } from './icons'
import { useTheme } from './providers/ThemeProvider'

export default function ThemeToggle({ className }) {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        toggle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
      }}
      aria-label={dark ? 'Passer en thème clair' : 'Passer en thème sombre'}
      title={dark ? 'Thème clair' : 'Thème sombre'}
      className={cx(
        'relative flex size-10 items-center justify-center overflow-hidden rounded-full border border-line bg-surface text-ink transition-colors hover:border-ink/30',
        className,
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 18, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -18, rotate: 90, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 24 }}
          className="flex"
        >
          {dark ? <Moon className="size-[18px]" /> : <Sun className="size-[18px]" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
