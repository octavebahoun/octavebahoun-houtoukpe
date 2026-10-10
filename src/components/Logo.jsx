import { Link } from 'react-router-dom'
import { cx } from '../lib/cx'

export function LogoMark({ className = 'size-9' }) {
  return (
    <span
      className={cx(
        'flex shrink-0 items-center justify-center rounded-full bg-primary text-white',
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-[48%] fill-current transition-transform duration-700 ease-out-expo group-hover:rotate-180"
        aria-hidden="true"
      >
        <path d="M12 2c1.25 4.7 3.55 7 8.25 8.25-4.7 1.25-7 3.55-8.25 8.25C10.75 13.8 8.45 11.5 3.75 10.25 8.45 9 10.75 6.7 12 2z" />
      </svg>
    </span>
  )
}

export default function Logo({ className, onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Oktav — accueil"
      className={cx('group flex items-center gap-2.5', className)}
    >
      <LogoMark />
      <span className="text-[19px] font-extrabold tracking-tight text-ink">
        Oktav<span className="text-primary">.</span>
      </span>
    </Link>
  )
}
