import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { Sparkles, Menu, X } from 'lucide-react'
import DarkModeToggle from '../ui/DarkModeToggle'

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/certs', label: 'Certs' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { darkMode, toggleDarkMode, toggleRag } = useStore()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="fixed top-5 left-5 z-[60] lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-ivory/80 dark:bg-dark-deep/80 backdrop-blur-xl shadow-lg border border-cobalt/10"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Menu"
      >
        {mobileOpen ? <X className="w-5 h-5 text-cobalt" /> : <Menu className="w-5 h-5 text-cobalt" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-dark/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Navbar pill */}
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500
          ${scrolled
            ? 'py-2 px-4 shadow-xl shadow-cobalt/5'
            : 'py-3 px-6 shadow-lg shadow-cobalt/5'
          }
          bg-ivory/80 dark:bg-dark-deep/80 backdrop-blur-xl rounded-full border border-cobalt/10
        `}
      >
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Logo */}
          <Link to="/" className="text-lg font-extrabold tracking-tight mr-2 lg:mr-4">
            O<span className="text-cobalt">k</span>tav
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                  ${location.pathname === to
                    ? 'bg-cobalt text-white'
                    : 'text-dark dark:text-white/80 hover:bg-cobalt-light dark:hover:bg-cloud'
                  }
                `}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Ask AI button */}
          <button
            onClick={toggleRag}
            className="relative hidden lg:flex items-center gap-2 px-4 py-2 bg-cobalt text-white rounded-full text-sm font-medium hover:bg-cobalt/90 transition-all"
          >
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-amber rounded-full animate-pulse" />
            <Sparkles className="w-4 h-4" />
            Ask AI
          </button>

          {/* Dark mode robot toggle */}
          <DarkModeToggle />
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed top-0 left-0 w-64 h-full z-50 bg-ivory dark:bg-dark-deep shadow-2xl transition-transform duration-500 lg:hidden
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="pt-20 px-6 flex flex-col gap-2">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-4 py-3 rounded-xl text-base font-medium transition-all
                ${location.pathname === to
                  ? 'bg-cobalt text-white'
                  : 'text-dark dark:text-white/80 hover:bg-cobalt-light dark:hover:bg-cloud'
                }
              `}
            >
              {label}
            </Link>
          ))}
          <DarkModeToggle />
          <button
            onClick={() => { toggleRag(); setMobileOpen(false); }}
            className="mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-cobalt text-white rounded-xl text-sm font-medium"
          >
            <Sparkles className="w-4 h-4" />
            Ask AI
          </button>
        </div>
      </div>
    </>
  )
}
