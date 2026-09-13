export function AdminCard({ children, className = '' }) {
  return (
    <div className={`rounded-card bg-white p-6 shadow-soft ${className}`}>
      {children}
    </div>
  )
}

export function AdminInput({ label, hint, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>
      <input
        className="w-full rounded-field border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-faint transition-colors focus:border-primary focus:outline-none"
        {...props}
      />
      {hint && <span className="mt-1 block text-xs text-faint">{hint}</span>}
    </label>
  )
}

export function AdminTextarea({ label, hint, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>
      <textarea
        rows="8"
        className="w-full resize-y rounded-field border border-line bg-white px-4 py-3 font-mono text-sm text-ink placeholder:text-faint transition-colors focus:border-primary focus:outline-none"
        {...props}
      />
      {hint && <span className="mt-1 block text-xs text-faint">{hint}</span>}
    </label>
  )
}

export function AdminCheckbox({ label, ...props }) {
  return (
    <label className="flex items-center gap-3 text-sm font-semibold text-ink">
      <input type="checkbox" className="size-4 accent-primary" {...props} />
      {label}
    </label>
  )
}

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  dark: 'bg-ink text-white hover:bg-primary',
  ghost:
    'border-2 border-ink text-ink hover:border-primary hover:text-primary',
}

export function AdminButton({ variant = 'primary', className = '', ...props }) {
  return (
    <button
      className={`rounded-full px-6 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    />
  )
}

export function AdminAlert({ tone = 'error', children }) {
  if (!children) return null

  return (
    <p
      className={`rounded-field px-5 py-4 text-sm font-semibold ${
        tone === 'error'
          ? 'bg-primary/10 text-primary'
          : 'bg-ink/5 text-ink'
      }`}
    >
      {children}
    </p>
  )
}

export function AdminListRow({ children }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-card bg-white p-5 shadow-soft">
      {children}
    </div>
  )
}
