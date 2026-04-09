export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary: 'bg-cobalt text-white hover:bg-cobalt/90 shadow-lg shadow-cobalt/25',
    cta: 'bg-amber text-dark hover:bg-amber/90 shadow-lg shadow-amber/25 font-bold',
    outline: 'border-2 border-cobalt text-cobalt hover:bg-cobalt hover:text-white',
    ghost: 'text-dark dark:text-white/80 hover:bg-cobalt-light dark:hover:bg-cloud',
  }

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
