import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { label: 'Accueil', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'À propos', to: '/about' },
  { label: 'Projets', to: '/projects' },
  { label: 'Blogs', to: '/blog' },
  { label: 'FAQ', to: '/faq' },
]

function Logo() {
  return (
    <NavLink to="/" className="flex items-center gap-2.5">
      <span className="flex size-10 items-center justify-center rounded-full bg-primary">
        <svg viewBox="0 0 24 24" className="size-4.5 fill-white" aria-hidden="true">
          <path d="M12 2c1.25 4.7 3.55 7 8.25 8.25-4.7 1.25-7 3.55-8.25 8.25C10.75 13.8 8.45 11.5 3.75 10.25 8.45 9 10.75 6.7 12 2z" />
        </svg>
      </span>
      <span className="text-xl font-bold text-ink">
        Oktav<span className="text-primary">.</span>
      </span>
    </NavLink>
  )
}

function DesktopLink({ to, label }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `border-b-2 pb-0.5 text-[15px] font-medium transition-colors hover:text-primary ${
          isActive ? 'border-primary text-primary' : 'border-transparent text-ink'
        }`
      }
    >
      {label}
    </NavLink>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="mx-auto max-w-site px-6 pt-6">
      <nav className="relative flex items-center justify-between rounded-full bg-white py-3 pr-3 pl-6 shadow-soft">
        <Logo />

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <DesktopLink to={link.to} label={link.label} />
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full bg-ink px-8 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-primary lg:block"
        >
          Me contacter
        </a>

        <button
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex size-10 items-center justify-center rounded-full bg-ink text-white lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-2" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="mt-3 flex flex-col gap-1 rounded-card bg-white p-4 shadow-soft lg:hidden">
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-field px-4 py-2.5 text-sm font-medium transition-colors hover:bg-card ${
                  isActive ? 'text-primary' : 'text-ink'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href="#contact"
            className="mt-2 rounded-full bg-ink px-6 py-3 text-center text-sm font-semibold text-white"
          >
            Me contacter
          </a>
        </div>
      )}
    </header>
  )
}
