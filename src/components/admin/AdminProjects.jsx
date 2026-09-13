import { useEffect, useState } from 'react'
import { adminRequest, fetchProjects } from '../../lib/api'
import {
  AdminAlert,
  AdminButton,
  AdminCard,
  AdminCheckbox,
  AdminInput,
  AdminListRow,
  AdminTextarea,
} from './AdminUI'

const emptyForm = {
  title: '',
  shortDesc: '',
  description: '',
  image: '',
  techStack: '',
  live: '',
  github: '',
  featured: false,
}

export default function AdminProjects({ token }) {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  async function load() {
    try {
      setItems(await fetchProjects())
    } catch {
      setItems([])
    }
  }

  useEffect(() => {
    load()
  }, [])

  function startCreate() {
    setForm(emptyForm)
    setEditingId(null)
    setError('')
  }

  function startEdit(item) {
    setForm({
      title: item.title ?? '',
      shortDesc: item.shortDesc ?? '',
      description: item.description ?? '',
      image: item.image ?? '',
      techStack: (item.techStack ?? []).join(', '),
      live: item.links?.live ?? '',
      github: item.links?.github ?? '',
      featured: !!item.featured,
    })
    setEditingId(item._id)
    setError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('saving')
    setError('')

    const payload = {
      title: form.title,
      shortDesc: form.shortDesc,
      description: form.description,
      image: form.image,
      techStack: form.techStack
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      links: { live: form.live, github: form.github },
      featured: form.featured,
    }

    try {
      if (editingId) {
        await adminRequest(`/projects/${editingId}`, {
          method: 'PUT',
          body: payload,
          token,
        })
      } else {
        await adminRequest('/projects', { method: 'POST', body: payload, token })
      }

      setForm(null)
      setEditingId(null)
      await load()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setStatus('')
    }
  }

  async function handleDelete(item) {
    if (!window.confirm(`Supprimer « ${item.title} » ?`)) return

    try {
      await adminRequest(`/projects/${item._id}`, { method: 'DELETE', token })
      await load()
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  if (form) {
    return (
      <AdminCard>
        <h2 className="text-2xl font-bold">
          {editingId ? 'Modifier le projet' : 'Nouveau projet'}
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
          <AdminInput
            label="Titre *"
            required
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
          />
          <AdminInput
            label="Description courte *"
            required
            value={form.shortDesc}
            onChange={(event) =>
              setForm({ ...form, shortDesc: event.target.value })
            }
          />
          <AdminInput
            label="Image (URL) *"
            required
            value={form.image}
            onChange={(event) => setForm({ ...form, image: event.target.value })}
            placeholder="/images/projects/mon-projet.jpg"
          />
          <AdminTextarea
            label="Description complète"
            rows="5"
            className="font-sans"
            value={form.description}
            onChange={(event) =>
              setForm({ ...form, description: event.target.value })
            }
          />
          <AdminInput
            label="Technologies"
            value={form.techStack}
            onChange={(event) =>
              setForm({ ...form, techStack: event.target.value })
            }
            hint="Séparées par des virgules : React, Node.js, MongoDB"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminInput
              label="Lien du site"
              value={form.live}
              onChange={(event) => setForm({ ...form, live: event.target.value })}
            />
            <AdminInput
              label="Lien GitHub"
              value={form.github}
              onChange={(event) =>
                setForm({ ...form, github: event.target.value })
              }
            />
          </div>
          <AdminCheckbox
            label="Mettre en avant"
            checked={form.featured}
            onChange={(event) =>
              setForm({ ...form, featured: event.target.checked })
            }
          />

          <AdminAlert>{error}</AdminAlert>

          <div className="flex flex-wrap gap-3">
            <AdminButton type="submit" disabled={status === 'saving'}>
              {status === 'saving' ? 'Enregistrement...' : 'Enregistrer'}
            </AdminButton>
            <AdminButton
              type="button"
              variant="ghost"
              onClick={() => setForm(null)}
            >
              Annuler
            </AdminButton>
          </div>
        </form>
      </AdminCard>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">
          Projets <span className="text-faint">({items.length})</span>
        </h2>
        <AdminButton onClick={startCreate}>Nouveau projet</AdminButton>
      </div>

      <AdminAlert>{error}</AdminAlert>

      {items.length === 0 && (
        <AdminCard>
          <p className="text-center">
            Aucun projet pour l&apos;instant. Crée le premier !
          </p>
        </AdminCard>
      )}

      {items.map((item) => (
        <AdminListRow key={item._id}>
          <div className="flex min-w-0 items-center gap-4">
            {item.image && (
              <img
                src={item.image}
                alt=""
                className="size-14 shrink-0 rounded-xl object-cover"
              />
            )}
            <div className="min-w-0">
              <p className="truncate font-bold text-ink">{item.title}</p>
              <p className="truncate text-sm">{item.shortDesc}</p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {item.featured && (
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                En avant
              </span>
            )}
            <AdminButton variant="ghost" onClick={() => startEdit(item)}>
              Modifier
            </AdminButton>
            <button
              type="button"
              onClick={() => handleDelete(item)}
              className="text-sm font-semibold text-primary underline"
            >
              Supprimer
            </button>
          </div>
        </AdminListRow>
      ))}
    </div>
  )
}
