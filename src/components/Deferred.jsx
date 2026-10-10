import { startTransition, Suspense, useEffect, useRef, useState } from 'react'
import { MOUNT_ALL_EVENT, mountAllRequested } from '../lib/mountAll'

// File de montage : une section à la fois, pendant les temps morts du navigateur.
// Chaque montage reste une petite tâche, au lieu d'un gros rendu d'un seul bloc.
const queue = []
let scheduled = false

// Sans interaction, le montage de fond démarre quelques secondes après le chargement :
// le premier affichage garde tout le processeur
const pageReady = new Promise((resolve) => {
  const start = () => setTimeout(resolve, 6000)
  if (document.readyState === 'complete') start()
  else window.addEventListener('load', start, { once: true })
})

async function scheduleNext() {
  if (scheduled || queue.length === 0) return
  scheduled = true
  await pageReady
  const idle = window.requestIdleCallback ?? ((callback) => setTimeout(callback, 200))
  idle(
    () => {
      scheduled = false
      queue.shift()?.()
      setTimeout(scheduleNext, 60)
    },
    { timeout: 3000 },
  )
}

// Allège le premier rendu de l'accueil : la section est montée à l'approche de l'écran,
// à la première interaction (voir App), ou en tâche de fond quelques secondes après.
// Tout le contenu est donc dans la page en quelques secondes : accessible au clavier,
// à Ctrl+F et aux lecteurs d'écran. (Pas de `content-visibility` : les sections hors
// écran apparaîtraient vides pendant un défilement rapide.)
export default function Deferred({ children, minHeight = 800 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(
    () => mountAllRequested() || Boolean(window.location.hash),
  )

  useEffect(() => {
    if (visible) return undefined
    const show = () => startTransition(() => setVisible(true))

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show()
      },
      { rootMargin: '1400px 0px' },
    )
    observer.observe(ref.current)

    queue.push(show)
    scheduleNext()

    window.addEventListener(MOUNT_ALL_EVENT, show)
    return () => {
      observer.disconnect()
      const index = queue.indexOf(show)
      if (index !== -1) queue.splice(index, 1)
      window.removeEventListener(MOUNT_ALL_EVENT, show)
    }
  }, [visible])

  if (!visible) return <div ref={ref} style={{ minHeight }} aria-hidden="true" />

  return <Suspense fallback={<div style={{ minHeight }} aria-hidden="true" />}>{children}</Suspense>
}
