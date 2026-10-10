import { AnimatePresence, motion } from 'motion/react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { CAL_URL, EMAIL, GITHUB_URL, LINKEDIN_URL, MALT_URL, SOURCE_URL } from '../data/profile'
import { useCopy } from '../hooks/useCopy'
import { usePosts } from '../hooks/usePosts'
import { useProjects } from '../hooks/useProjects'
import { cx } from '../lib/cx'
import { goTo } from '../lib/navigation'
import {
  ArrowRight,
  ArrowUpRight,
  Book,
  Calendar,
  Code,
  Copy,
  GitHub,
  Layers,
  Moon,
  Search,
  Sparkle,
  Sun,
} from './icons'
import { useTheme } from './providers/ThemeProvider'
import { Kbd } from './ui/Bits'

const PaletteContext = createContext({ open: () => {} })

function normalize(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

const pages = [
  { label: 'Accueil', path: '/', keywords: 'home accueil' },
  { label: 'Projets', path: '/projects', keywords: 'portfolio realisations travaux' },
  { label: 'Services', path: '/services', keywords: 'offres tarifs prix freelance' },
  { label: 'À propos', path: '/about', keywords: 'bio parcours cv histoire' },
  { label: 'Blog', path: '/blog', keywords: 'articles journal notes' },
  { label: 'FAQ', path: '/faq', keywords: 'questions aide' },
  { label: 'Contact', path: '/#contact', keywords: 'email message ecrire devis' },
]

function Palette({ onClose }) {
  const navigate = useNavigate()
  const copy = useCopy()
  const { theme, toggle } = useTheme()
  const projects = useProjects()
  const posts = usePosts()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const listId = useId()

  const items = useMemo(() => {
    const go = (path) => () => goTo(navigate, path)
    const open = (url) => () => window.open(url, '_blank', 'noopener,noreferrer')

    return [
      ...pages.map((page) => ({
        group: 'Navigation',
        label: page.label,
        keywords: page.keywords,
        icon: <ArrowRight className="size-4" />,
        run: go(page.path),
      })),
      ...projects.map((project) => ({
        group: 'Projets',
        label: project.title,
        hint: project.subtitle,
        keywords: `${project.stack?.join(' ')} ${project.categories?.join(' ')}`,
        icon: <Layers className="size-4" />,
        run: go(`/projects/${project.slug}`),
      })),
      ...posts.map((post) => ({
        group: 'Articles',
        label: post.title,
        keywords: post.tags.join(' '),
        icon: <Book className="size-4" />,
        run: go(`/blog/${post.slug}`),
      })),
      {
        group: 'Actions',
        label: "Copier l'adresse email",
        hint: EMAIL,
        keywords: 'mail contact',
        icon: <Copy className="size-4" />,
        run: () => copy(EMAIL, 'Email copié'),
      },
      {
        group: 'Actions',
        label: theme === 'dark' ? 'Passer en thème clair' : 'Passer en thème sombre',
        keywords: 'theme mode dark light sombre clair',
        icon: theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />,
        run: () => toggle(),
      },
      {
        group: 'Actions',
        label: 'Réserver un appel de 30 min',
        keywords: 'rdv rendez-vous cal calendrier',
        icon: <Calendar className="size-4" />,
        run: open(CAL_URL),
      },
      {
        group: 'Liens',
        label: 'GitHub',
        hint: '@octavebahoun',
        keywords: 'code open source',
        icon: <GitHub className="size-4" />,
        run: open(GITHUB_URL),
      },
      {
        group: 'Liens',
        label: 'Code source de ce site',
        keywords: 'repo github portfolio',
        icon: <Code className="size-4" />,
        run: open(SOURCE_URL),
      },
      {
        group: 'Liens',
        label: 'LinkedIn',
        keywords: 'reseau pro',
        icon: <ArrowUpRight className="size-4" />,
        run: open(LINKEDIN_URL),
      },
      {
        group: 'Liens',
        label: 'Malt',
        keywords: 'freelance mission',
        icon: <ArrowUpRight className="size-4" />,
        run: open(MALT_URL),
      },
    ]
  }, [projects, posts, theme, toggle, copy, navigate])

  const results = useMemo(() => {
    const terms = normalize(query).split(/\s+/).filter(Boolean)
    if (!terms.length) return items
    return items.filter((item) => {
      const haystack = normalize(`${item.label} ${item.hint ?? ''} ${item.keywords ?? ''} ${item.group}`)
      return terms.every((term) => haystack.includes(term))
    })
  }, [items, query])

  useEffect(() => {
    const previous = document.activeElement
    inputRef.current?.focus()
    window.__lenis?.stop()
    return () => {
      window.__lenis?.start()
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [])

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' })
  }, [active])

  function run(item) {
    onClose()
    // laisse la palette se fermer avant de naviguer
    requestAnimationFrame(() => item.run())
  }

  function handleKeyDown(event) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((index) => (index + 1) % Math.max(results.length, 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((index) => (index - 1 + results.length) % Math.max(results.length, 1))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      if (results[active]) run(results[active])
    } else if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
    } else if (event.key === 'Tab') {
      event.preventDefault()
    }
  }

  let lastGroup = null

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="absolute inset-0 bg-night/40 backdrop-blur-[6px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Palette de commandes"
        initial={{ opacity: 0, y: -12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        className="relative w-full max-w-xl overflow-hidden rounded-[22px] border border-line bg-surface shadow-lift"
      >
        <div className="flex items-center gap-3 border-b border-line px-5">
          <Search className="size-5 text-faint" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setActive(0)
            }}
            onKeyDown={handleKeyDown}
            placeholder="Rechercher une page, un projet, une action…"
            className="h-14 w-full bg-transparent text-[15px] text-ink placeholder:text-faint focus:outline-none"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
            aria-autocomplete="list"
          />
          <Kbd>esc</Kbd>
        </div>

        <div
          ref={listRef}
          id={listId}
          role="listbox"
          data-lenis-prevent
          className="max-h-[min(60vh,420px)] overflow-y-auto overscroll-contain p-2"
        >
          {results.length === 0 && (
            <p className="px-4 py-10 text-center text-sm">
              Rien trouvé pour « {query} ». Essayez « IA », « SaaS » ou « contact ».
            </p>
          )}

          {results.map((item, index) => {
            const header = item.group !== lastGroup ? item.group : null
            lastGroup = item.group
            return (
              <div key={`${item.group}-${item.label}`}>
                {header && <p className="kicker px-3 pt-3 pb-1.5 text-[11px]">{header}</p>}
                <div
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={index === active}
                  data-index={index}
                  onMouseMove={() => setActive(index)}
                  onClick={() => run(item)}
                  className={cx(
                    'flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] transition-colors',
                    index === active ? 'bg-card text-ink' : 'text-muted',
                  )}
                >
                  <span
                    className={cx(
                      'flex size-8 shrink-0 items-center justify-center rounded-lg border border-line transition-colors',
                      index === active ? 'bg-primary text-white border-primary' : 'bg-surface',
                    )}
                  >
                    {item.icon}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-medium text-ink">{item.label}</span>
                  {item.hint && (
                    <span className="hidden max-w-[45%] truncate text-xs text-faint sm:block">
                      {item.hint}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-3 text-xs text-faint">
          <span className="flex items-center gap-2">
            <Sparkle className="size-3.5 text-primary" />
            Oktav.
          </span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd> naviguer
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd>↵</Kbd> ouvrir
            </span>
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function CommandPaletteProvider({ children }) {
  const [isOpen, setOpen] = useState(false)
  const open = useCallback(() => setOpen(true), [])

  useEffect(() => {
    function onKeyDown(event) {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName) || event.target.isContentEditable
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
      } else if (event.key === '/' && !typing) {
        event.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const value = useMemo(() => ({ open }), [open])

  return (
    <PaletteContext.Provider value={value}>
      {children}
      <AnimatePresence>{isOpen && <Palette onClose={() => setOpen(false)} />}</AnimatePresence>
    </PaletteContext.Provider>
  )
}

// eslint-disable-next-line react/only-export-components
export function useCommandPalette() {
  return useContext(PaletteContext)
}
