import { useEffect, useState } from 'react'
import { adminRequest, fetchBlog } from '../../lib/api'
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
  slug: '',
  excerpt: '',
  content: '',
  image: '',
  tags: '',
  published: false,
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function AdminBlog({ token }) {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  async function load() {
    try {
      setItems(await fetchBlog())
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
      slug: item.slug ?? '',
      excerpt: item.excerpt ?? '',
      content: item.content ?? '',
      image: item.image ?? '',
      tags: (item.tags ?? []).join(', '),
      published: !!item.published,
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
      slug: form.slug,
      excerpt: form.excerpt,
      content: form.content,
      image: form.image,
      tags: form.tags
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      published: form.published,
    }

    try {
      if (editingId) {
        await adminRequest(`/blog/${editingId}`, {
          method: 'PUT',
          body: payload,
          token,
        })
      } else {
        await adminRequest('/blog', { method: 'POST', body: payload, token })
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
      await adminRequest(`/blog/${item._id}`, { method: 'DELETE', token })
      await load()
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  if (form) {
    return (
      <AdminCard>
        <h2 className="text-2xl font-bold">
          {editingId ? "Modifier l'article" : 'Nouvel article'}
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
          <AdminInput
            label="Titre *"
            required
            value={form.title}
            onChange={(event) => {
              const title = event.target.value
              setForm({
                ...form,
                title,
                slug: editingId ? form.slug : slugify(title),
              })
            }}
          />
          <AdminInput
            label="Slug *"
            required
            value={form.slug}
            onChange={(event) => setForm({ ...form, slug: event.target.value })}
            hint="Utilisé dans l'URL : /blog/mon-slug"
          />
          <AdminInput
            label="Image (URL)"
            value={form.image}
            onChange={(event) => setForm({ ...form, image: event.target.value })}
            placeholder="/images/blog/mon-article.jpg"
          />
          <AdminInput
            label="Tags"
            value={form.tags}
            onChange={(event) => setForm({ ...form, tags: event.target.value })}
            hint="Séparés par des virgules : IA, Automatisation"
          />
          <AdminTextarea
            label="Extrait"
            rows="3"
            className="font-sans"
            value={form.excerpt}
            onChange={(event) =>
              setForm({ ...form, excerpt: event.target.value })
            }
          />
          <AdminTextarea
            label="Contenu"
            rows="14"
            value={form.content}
            onChange={(event) =>
              setForm({ ...form, content: event.target.value })
            }
            hint="Markdown simple : ## titre, - liste, **gras**, [lien](/url), > encadré"
          />
          <AdminCheckbox
            label="Publié"
            checked={form.published}
            onChange={(event) =>
              setForm({ ...form, published: event.target.checked })
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
          Articles <span className="text-faint">({items.length})</span>
        </h2>
        <AdminButton onClick={startCreate}>Nouvel article</AdminButton>
      </div>

      <AdminAlert>{error}</AdminAlert>

      {items.length === 0 && (
        <AdminCard>
          <p className="text-center">
            Aucun article pour l&apos;instant. Écris le premier !
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
              <p className="truncate text-sm">/blog/{item.slug}</p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                item.published
                  ? 'bg-primary text-white'
                  : 'bg-ink/10 text-ink'
              }`}
            >
              {item.published ? 'Publié' : 'Brouillon'}
            </span>
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
