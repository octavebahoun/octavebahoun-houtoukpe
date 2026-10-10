import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { CommandPaletteProvider } from './components/CommandPalette'
import Deferred from './components/Deferred'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { SmoothScroll } from './components/providers/SmoothScroll'
import { ThemeProvider } from './components/providers/ThemeProvider'
import { Toaster } from './components/providers/Toaster'
import { EASE_EXPO } from './lib/easing'
import ScrollProgress from './components/ScrollProgress'
import { requestMountAll } from './lib/mountAll'
import { loaders, prefetch } from './lib/routes'
import { scrollToTarget } from './lib/scroll'
import Home from './pages/Home'

const Services = lazy(loaders.services)
const About = lazy(loaders.about)
const Projects = lazy(loaders.projects)
const ProjectDetail = lazy(loaders.projectDetail)
const Blog = lazy(loaders.blog)
const BlogPost = lazy(loaders.blogPost)
const Faq = lazy(loaders.faq)
const NotFound = lazy(loaders.notFound)
const Admin = lazy(() => import('./pages/Admin'))

// Une fois la page d'accueil posée, on précharge discrètement les projets (le parcours le plus fréquent)
function usePrefetchPages() {
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((callback) => setTimeout(callback, 1500))
    const timeout = setTimeout(() => idle(() => prefetch('/projects/x')), 6000)
    return () => clearTimeout(timeout)
  }, [])
}

// Défile vers l'ancre de l'URL (« /#contact ») une fois la page affichée
function HashScroller() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return undefined
    const timeout = setTimeout(() => scrollToTarget(location.hash.slice(1)), 160)
    return () => clearTimeout(timeout)
  }, [location.key, location.hash])

  return null
}

function PageFallback() {
  return <div className="min-h-screen" aria-busy="true" />
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    // initial={false} : pas de fondu au premier chargement, le contenu est peint tout de suite (LCP) ;
    // les changements de page gardent leur transition
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => scrollToTarget(0, { immediate: true })}>
      <motion.main
        key={location.pathname}
        id="contenu"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10, transition: { duration: 0.25, ease: 'easeIn' } }}
        transition={{ duration: 0.55, ease: EASE_EXPO }}
      >
        <HashScroller />
        <Suspense fallback={<PageFallback />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.main>
    </AnimatePresence>
  )
}

// À la première interaction (touche — Tab, Ctrl+F… —, clic, toucher ou défilement), on monte
// toutes les sections : rien n'apparaît vide au défilement et le clavier atteint tout le contenu
function useInteractionMountAll() {
  useEffect(() => {
    const events = ['keydown', 'pointerdown', 'touchstart', 'wheel', 'scroll']
    const onInteraction = () => {
      requestMountAll()
      events.forEach((name) => window.removeEventListener(name, onInteraction))
    }
    events.forEach((name) => window.addEventListener(name, onInteraction, { passive: true }))
    return () => events.forEach((name) => window.removeEventListener(name, onInteraction))
  }, [])
}

function SiteLayout() {
  usePrefetchPages()
  useInteractionMountAll()

  return (
    <SmoothScroll>
      <CommandPaletteProvider>
        <a
          href="#contenu"
          className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition-transform focus:translate-y-0"
        >
          Aller au contenu
        </a>
        <ScrollProgress />
        <Navbar />
        <AnimatedRoutes />
        <Deferred minHeight={900}>
          <Footer />
        </Deferred>
      </CommandPaletteProvider>
    </SmoothScroll>
  )
}

export default function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
  }, [])

  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <ThemeProvider>
          <Toaster>
            <Routes>
              <Route
                path="/admin"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <div className="theme-light">
                      <Admin />
                    </div>
                  </Suspense>
                }
              />
              <Route path="*" element={<SiteLayout />} />
            </Routes>
          </Toaster>
        </ThemeProvider>
      </MotionConfig>
    </BrowserRouter>
  )
}
