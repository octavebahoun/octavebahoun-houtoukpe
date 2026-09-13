import { Link } from 'react-router-dom'

export default function PageHeader({ title, crumb }) {
  return (
    <div className="mx-auto max-w-site px-6 pt-16 pb-14 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
        {title}
      </h1>
      <p className="mt-4 text-sm font-medium">
        <Link to="/" className="text-ink transition-colors hover:text-primary">
          Accueil
        </Link>
        <span className="mx-2 text-faint">/</span>
        <span className="text-primary">{crumb}</span>
      </p>
    </div>
  )
}
