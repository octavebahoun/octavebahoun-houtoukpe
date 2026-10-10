import { cx } from '../../lib/cx'

export function Chip({ children, className, tone = 'default' }) {
  const tones = {
    default: 'border-line bg-surface text-ink',
    soft: 'border-transparent bg-card text-ink',
    night: 'border-white/10 bg-white/5 text-white/80',
    accent: 'border-primary/25 bg-primary/10 text-primary-ink',
  }
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[13px] font-medium whitespace-nowrap',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Kbd({ children, className }) {
  return (
    <kbd
      className={cx(
        'inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-line bg-surface px-1.5 font-mono text-[11px] font-medium text-muted shadow-[0_1px_0_var(--line)]',
        className,
      )}
    >
      {children}
    </kbd>
  )
}

export function StatusDot({ className, color = 'bg-emerald-500' }) {
  return (
    <span className={cx('relative inline-flex size-2', className)} aria-hidden="true">
      <span className={cx('absolute inset-0 animate-ping-soft rounded-full', color)} />
      <span className={cx('relative inline-flex size-2 rounded-full', color)} />
    </span>
  )
}

export function Accent({ children, className }) {
  return <span className={cx('accent', className)}>{children}</span>
}
