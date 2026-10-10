import { useEffect, useState } from 'react'
import { adminRequest, fetchCerts } from '../../lib/api'
import {
  AdminAlert,
  AdminButton,
  AdminCard,
  AdminInput,
  AdminListRow,
} from './AdminUI'

const emptyForm = {
  title: '',
  issuer: '',
  credentialId: '',
  credentialUrl: '',
  issueDate: '',
  expiryDate: '',
  image: '',
  tags: '',
}

function toDateInput(value) {
  if (!value) return ''
  return String(value).slice(0, 10)
}

export default function AdminCerts({ token }) {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  async function load() {
    try {
      setItems(await fetchCerts())
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
      issuer: item.issuer ?? '',
      credentialId: item.credentialId ?? '',
      credentialUrl: item.credentialUrl ?? '',
      issueDate: toDateInput(item.issueDate),
      expiryDate: toDateInput(item.expiryDate),
      image: item.image ?? '',
      tags: (item.tags ?? []).join(', '),
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
      issuer: form.issuer,
      credentialId: form.credentialId,
      credentialUrl: form.credentialUrl,
      issueDate: form.issueDate || undefined,
      expiryDate: form.expiryDate || undefined,
      image: form.image,
      tags: form.tags
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    }

    try {
      if (editingId) {
        await adminRequest(`/certs/${editingId}`, {
          method: 'PUT',
          body: payload,
          token,
        })
      } else {
        await adminRequest('/certs', { method: 'POST', body: payload, token })
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
      await adminRequest(`/certs/${item._id}`, { method: 'DELETE', token })
      await load()
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  if (form) {
    return (
      <AdminCard>
        <h2 className="text-2xl font-bold">
          {editingId ? 'Modifier la certification' : 'Nouvelle certification'}
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
          <AdminInput
            label="Titre *"
            required
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
          />
          <AdminInput
            label="Organisme *"
            required
            value={form.issuer}
            onChange={(event) => setForm({ ...form, issuer: event.target.value })}
            placeholder="Coursera, AWS, Google..."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminInput
              label="Date d'obtention"
              type="date"
              value={form.issueDate}
              onChange={(event) =>
                setForm({ ...form, issueDate: event.target.value })
              }
            />
            <AdminInput
              label="Date d'expiration"
              type="date"
              value={form.expiryDate}
              onChange={(event) =>
                setForm({ ...form, expiryDate: event.target.value })
              }
            />
          </div>
          <AdminInput
            label="ID de la certification"
            value={form.credentialId}
            onChange={(event) =>
              setForm({ ...form, credentialId: event.target.value })
            }
          />
          <AdminInput
            label="Lien de vérification"
            value={form.credentialUrl}
            onChange={(event) =>
              setForm({ ...form, credentialUrl: event.target.value })
            }
          />
          <AdminInput
            label="Image / badge (URL)"
            value={form.image}
            onChange={(event) => setForm({ ...form, image: event.target.value })}
          />
          <AdminInput
            label="Tags"
            value={form.tags}
            onChange={(event) => setForm({ ...form, tags: event.target.value })}
            hint="Séparés par des virgules"
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
          Certifications <span className="text-faint">({items.length})</span>
        </h2>
        <AdminButton onClick={startCreate}>
          Nouvelle certification
        </AdminButton>
      </div>

      <AdminAlert>{error}</AdminAlert>

      {items.length === 0 && (
        <AdminCard>
          <p className="text-center">Aucune certification pour l&apos;instant.</p>
        </AdminCard>
      )}

      {items.map((item) => (
        <AdminListRow key={item._id}>
          <div className="min-w-0">
            <p className="truncate font-bold text-ink">{item.title}</p>
            <p className="truncate text-sm">
              {item.issuer}
              {item.issueDate ? ` · ${toDateInput(item.issueDate)}` : ''}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
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
