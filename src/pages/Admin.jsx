import { useState } from 'react'
import AdminAbout from '../components/admin/AdminAbout'
import AdminBlog from '../components/admin/AdminBlog'
import AdminCerts from '../components/admin/AdminCerts'
import AdminLanding from '../components/admin/AdminLanding'
import AdminProjects from '../components/admin/AdminProjects'
import { GitHub } from '../components/icons'
import { useAuth } from '../hooks/useAuth'

const tabs = [
  { id: 'projects', label: 'Projets' },
  { id: 'blog', label: 'Blog' },
  { id: 'certs', label: 'Certifications' },
  { id: 'about', label: 'À propos' },
  { id: 'landing', label: 'Landing' },
]

export default function Admin() {
  const { token, user, expired, login, logout } = useAuth()
  const [tab, setTab] = useState('projects')

  if (!token || expired) {
    return (
      <div className="bg-grid flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md rounded-card bg-white p-10 text-center shadow-soft">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-white">
            <GitHub className="size-6" />
          </span>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight">
            Back office
          </h1>
          <p className="mt-3">
            Connecte-toi avec ton compte GitHub administrateur pour gérer le
            contenu du portfolio.
          </p>

          <button
            type="button"
            onClick={login}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-ink px-6 py-3.5 font-semibold text-white transition-colors hover:bg-primary"
          >
            <GitHub className="size-5" />
            Se connecter avec GitHub
          </button>

          {expired && (
            <p className="mt-4 text-sm font-semibold text-primary">
              Session expirée, reconnecte-toi.
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-grid min-h-screen px-6 py-10">
      <div className="mx-auto max-w-site">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-card bg-white p-6 shadow-soft">
          <div>
            <p className="text-sm text-faint">Back office</p>
            <h1 className="text-2xl font-extrabold tracking-tight">
              Portfolio d&apos;Oktav
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm">
              @{user?.username ?? 'admin'}
            </span>
            <button
              type="button"
              onClick={logout}
              className="rounded-full border-2 border-ink px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
            >
              Déconnexion
            </button>
          </div>
        </header>

        <nav className="mt-6 flex flex-wrap gap-2">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                tab === item.id
                  ? 'bg-primary text-white'
                  : 'bg-white text-ink hover:text-primary'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <main className="mt-8">
          {tab === 'projects' && <AdminProjects token={token} />}
          {tab === 'blog' && <AdminBlog token={token} />}
          {tab === 'certs' && <AdminCerts token={token} />}
          {tab === 'about' && <AdminAbout token={token} />}
          {tab === 'landing' && <AdminLanding token={token} />}
        </main>
      </div>
    </div>
  )
}
