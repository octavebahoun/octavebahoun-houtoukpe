export default function Badge({ children, className = '', variant = 'default' }) {
  const variants = {
    default: 'bg-cobalt-light dark:bg-cloud text-cobalt',
    amber: 'bg-amber/20 text-amber',
    dark: 'bg-dark/5 dark:bg-white/5 text-dark dark:text-white/60',
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
