import { AnimatePresence, motion } from 'motion/react'
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { Check } from '../icons'

const ToastContext = createContext(() => {})

export function Toaster({ children }) {
  const [toasts, setToasts] = useState([])
  const counter = useRef(0)

  const notify = useCallback((message) => {
    counter.current += 1
    const id = counter.current
    setToasts((current) => [...current.slice(-2), { id, message }])
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, 2600)
  }, [])

  const value = useMemo(() => notify, [notify])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex flex-col items-center gap-2 px-4"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className="pointer-events-auto flex items-center gap-3 rounded-full bg-night py-2 pr-5 pl-2 text-sm font-semibold text-white shadow-lift"
            >
              <span className="flex size-7 items-center justify-center rounded-full bg-primary">
                <Check className="size-4" />
              </span>
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

// eslint-disable-next-line react/only-export-components
export function useToast() {
  return useContext(ToastContext)
}
