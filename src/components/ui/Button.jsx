import { Link } from 'react-router-dom'
import { cx } from '../../lib/cx'
import { prefetchProps } from '../../lib/routes'
import { ArrowUpRight } from '../icons'
import { Magnetic } from './Magnetic'

const variants = {
  primary: {
    base: 'bg-ink text-paper hover:shadow-lift',
    bubble: 'bg-primary text-white',
  },
  accent: {
    base: 'bg-primary-strong text-white hover:bg-primary-strong-hover hover:shadow-lift',
    bubble: 'bg-night text-white',
  },
  ghost: {
    base: 'border border-line bg-surface/60 text-ink hover:border-ink/40',
    bubble: 'bg-card text-ink',
  },
  light: {
    base: 'bg-white text-night hover:shadow-lift',
    bubble: 'bg-primary text-white',
  },
  outline: {
    base: 'border border-white/20 text-white hover:border-white/50',
    bubble: 'bg-white/10 text-white',
  },
}

const sizes = {
  md: { base: 'h-12 gap-3 pl-6 text-[15px]', bubble: 'size-9', bare: 'px-6' },
  lg: { base: 'h-14 gap-4 pl-7 text-base', bubble: 'size-11', bare: 'px-7' },
  sm: { base: 'h-10 gap-2.5 pl-4 text-sm', bubble: 'size-7', bare: 'px-4' },
}

// Texte qui « roule » au survol : la copie du dessous remplace celle du dessus
function RollingLabel({ children }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  )
}

export function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon = <ArrowUpRight className="size-4" />,
  magnetic = true,
  className,
  children,
  ...rest
}) {
  const style = variants[variant]
  const scale = sizes[size]
  const classes = cx(
    'group relative inline-flex shrink-0 items-center rounded-full font-semibold whitespace-nowrap transition-[background-color,border-color,box-shadow] duration-300',
    style.base,
    scale.base,
    icon ? 'pr-1.5' : scale.bare,
    className,
  )

  const content = (
    <>
      <RollingLabel>{children}</RollingLabel>
      {icon && (
        <span
          className={cx(
            'flex items-center justify-center rounded-full transition-transform duration-500 ease-out-expo group-hover:rotate-45',
            style.bubble,
            scale.bubble,
          )}
        >
          {icon}
        </span>
      )}
    </>
  )

  let element
  if (to) {
    element = (
      <Link to={to} className={classes} {...prefetchProps(to)} {...rest}>
        {content}
      </Link>
    )
  } else if (href) {
    const external = /^https?:/.test(href)
    element = (
      <a
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        {...rest}
      >
        {content}
      </a>
    )
  } else {
    element = (
      <button type="button" className={classes} {...rest}>
        {content}
      </button>
    )
  }

  return magnetic ? <Magnetic strength={0.22}>{element}</Magnetic> : element
}

// Lien texte souligné avec flèche
export function TextLink({ to, href, children, className }) {
  const classes = cx(
    'group inline-flex items-center gap-1.5 font-semibold text-ink',
    className,
  )
  const content = (
    <>
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out-expo group-hover:bg-[length:100%_1.5px]">
        {children}
      </span>
      <ArrowUpRight className="size-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={classes}>
      {content}
    </a>
  )
}
