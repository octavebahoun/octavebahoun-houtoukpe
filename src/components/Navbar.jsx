import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { EMAIL } from '../data/profile'
import { cx } from '../lib/cx'
import { anchorHandler } from '../lib/navigation'
import { shortcutLabel } from '../lib/platform'
import { prefetchProps } from '../lib/routes'
import { socials } from '../lib/socials'
import { useCommandPalette } from './CommandPalette'
import { ArrowUpRight, Search } from './icons'
import Logo from './Logo'
import { EASE_EXPO } from '../lib/easing'
import ThemeToggle from './ThemeToggle'
import { Kbd } from './ui/Bits'
import { Button } from './ui/Button'

const links = [
  { label: 'Accueil', to: '/' },
  { label: 'Projets', to: '/projects' },
  { label: 'Services', to: '/services' },
  { label: 'À propos', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'FAQ', to: '/faq' },
]


function DesktopLinks() {
  return (
    <ul className="hidden items-center gap-1 lg:flex">
      {links.map((link) => (
        <li key={link.to}>
          <NavLink
            to={link.to}
            end={link.to === '/'}
            {...prefetchProps(link.to)}
            className={({ isActive }) =>
              cx(
                'relative block rounded-full px-4 py-2 text-[14.5px] font-medium transition-colors',
                isActive ? 'text-ink' : 'text-muted hover:text-ink',
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-card"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                {link.label}
              </>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

function MobileMenu({ onClose }) {
  const navigate = useNavigate()

  useEffect(() => {
    window.__lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.__lenis?.start()
      document.documentElement.style.overflow = ''
    }
  }, [])

  return (
    <motion.div
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.6, ease: EASE_EXPO }}
      className="fixed inset-0 z-40 flex flex-col bg-paper px-6 pt-28 pb-10 lg:hidden"
    >
      <nav className="flex flex-col">
        {links.map((link, index) => (
          <motion.div
            key={link.to}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE_EXPO, delay: 0.12 + index * 0.05 }}
            className="border-b border-line"
          >
            <NavLink
              to={link.to}
              end={link.to === '/'}
              onClick={onClose}
              {...prefetchProps(link.to)}
              className={({ isActive }) =>
                cx(
                  'flex items-center justify-between py-4 text-4xl font-extrabold tracking-tight',
                  isActive ? 'text-primary' : 'text-ink',
                )
              }
            >
              {link.label}
              <span className="kicker" aria-hidden="true">0{index + 1}</span>
            </NavLink>
          </motion.div>
        ))}
      </nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="mt-auto space-y-6"
      >
        <a
          href="/#contact"
          onClick={(event) => {
            onClose()
            anchorHandler(navigate, '/#contact')(event)
          }}
          className="flex h-14 items-center justify-center gap-3 rounded-full bg-ink text-base font-semibold text-paper"
        >
          Démarrer un projet
          <ArrowUpRight className="size-4" />
        </a>
        <div className="flex flex-col items-start gap-4 text-sm min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
          <a href={`mailto:${EMAIL}`} className="font-medium text-ink">
            {EMAIL}
          </a>
          <div className="flex gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex size-10 items-center justify-center rounded-full border border-line text-ink"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Navbar() {
  // Le menu reste lié à la page où il a été ouvert : changer de page le referme
  const [openOn, setOpenOn] = useState(null)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const palette = useCommandPalette()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(latest > 24)
    setHidden(latest > previous && latest > 420)
  })

  const open = openOn === pathname
  const setOpen = (value) => setOpenOn(value ? pathname : null)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <motion.nav
        aria-label="Navigation principale"
        animate={{ y: hidden && !open ? -110 : 0 }}
        transition={{ duration: 0.45, ease: EASE_EXPO }}
        className="relative z-50 mx-auto max-w-[1320px]"
      >
        <div
          className={cx(
            'flex h-16 items-center justify-between gap-4 rounded-full border pr-2 pl-4 transition-[background-color,border-color,box-shadow] duration-500 sm:pl-5',
            scrolled || open
              ? 'border-line bg-surface/80 shadow-soft backdrop-blur-xl backdrop-saturate-150'
              : 'border-transparent bg-transparent',
          )}
        >
          <Logo onClick={() => setOpen(false)} />

          <DesktopLinks />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={palette.open}
              aria-label={`Rechercher (${shortcutLabel})`}
              className="flex h-10 items-center gap-2 rounded-full border border-line bg-surface pr-1.5 pl-3 text-sm text-muted transition-colors hover:border-ink/30 hover:text-ink"
            >
              <Search className="size-4" />
              <span className="hidden xl:inline">Rechercher</span>
              <span className="hidden sm:inline-flex">
                <Kbd>{shortcutLabel}</Kbd>
              </span>
            </button>

            <ThemeToggle />

            <span className="hidden lg:block">
              <Button
                href="/#contact"
                onClick={anchorHandler(navigate, '/#contact')}
                size="sm"
                magnetic={false}
              >
                Me contacter
              </Button>
            </span>

            <button
              type="button"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="relative flex size-10 items-center justify-center rounded-full bg-ink text-paper lg:hidden"
            >
              <span
                className={cx(
                  'absolute h-[1.5px] w-4 bg-current transition-transform duration-300',
                  open ? 'rotate-45' : '-translate-y-[3.5px]',
                )}
              />
              <span
                className={cx(
                  'absolute h-[1.5px] w-4 bg-current transition-transform duration-300',
                  open ? '-rotate-45' : 'translate-y-[3.5px]',
                )}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} />}</AnimatePresence>
    </header>
  )
}
