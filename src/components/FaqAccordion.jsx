import { AnimatePresence, motion } from 'motion/react'
import { useId, useState } from 'react'
import { faqs } from '../data/faq'
import { cx } from '../lib/cx'
import { Plus } from './icons'
import { EASE_EXPO } from '../lib/easing'

export default function FaqAccordion({ limit, defaultOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen)
  const visible = limit ? faqs.slice(0, limit) : faqs
  const id = useId()

  return (
    <div className="divide-y divide-line border-y border-line">
      {visible.map((faq, index) => {
        const open = index === openIndex
        const panelId = `${id}-panel-${index}`
        return (
          <div key={faq.question}>
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? -1 : index)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-faint">{String(index + 1).padStart(2, '0')}</span>
                  <span
                    className={cx(
                      'text-lg font-semibold tracking-tight transition-colors sm:text-xl',
                      open ? 'text-ink' : 'text-ink/80 group-hover:text-ink',
                    )}
                  >
                    {faq.question}
                  </span>
                </span>
                <span
                  className={cx(
                    'flex size-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-out-expo',
                    open ? 'rotate-45 border-primary bg-primary text-white' : 'border-line text-ink group-hover:border-ink/30',
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE_EXPO }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 pl-9 text-[15.5px] leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
