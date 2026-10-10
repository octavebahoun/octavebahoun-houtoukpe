import { useEffect, useState } from 'react'
import { adminRequest, fetchAbout } from '../../lib/api'
import {
  AdminAlert,
  AdminButton,
  AdminCard,
  AdminInput,
  AdminTextarea,
} from './AdminUI'

const emptyForm = {
  bio: '',
  skills: [],
  github: '',
  linkedin: '',
  instagram: '',
  twitter: '',
  facebook: '',
  whatsapp: '',
}

export default function AdminAbout({ token }) {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchAbout()
      .then((data) => {
        setForm({
          bio: data.bio ?? '',
          skills: data.skills ?? [],
          github: data.socialLinks?.github ?? '',
          linkedin: data.socialLinks?.linkedin ?? '',
          instagram: data.socialLinks?.intagram ?? '',
          twitter: data.socialLinks?.twitter ?? '',
          facebook: data.socialLinks?.facebook ?? '',
          whatsapp: data.socialLinks?.whatsapp ?? '',
        })
      })
      .catch(() => setForm(emptyForm))
  }, [])

  function updateSkill(index, field, value) {
    setForm({
      ...form,
      skills: form.skills.map((skill, skillIndex) =>
        skillIndex === index ? { ...skill, [field]: value } : skill,
      ),
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('saving')
    setError('')
    setSaved(false)

    try {
      await adminRequest('/about', {
        method: 'PUT',
        token,
        body: {
          bio: form.bio,
          skills: form.skills.map((skill) => ({
            name: skill.name,
            level: Number(skill.level) || 1,
          })),
          socialLinks: {
            github: form.github,
            linkedin: form.linkedin,
            intagram: form.instagram,
            twitter: form.twitter,
            facebook: form.facebook,
            whatsapp: form.whatsapp,
          },
        },
      })
      setSaved(true)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setStatus('')
    }
  }

  return (
    <AdminCard>
      <h2 className="text-2xl font-bold">Section À propos</h2>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
        <AdminTextarea
          label="Bio *"
          required
          rows="5"
          className="font-sans"
          value={form.bio}
          onChange={(event) => setForm({ ...form, bio: event.target.value })}
        />

        <div>
          <p className="mb-3 text-sm font-semibold text-ink">Compétences</p>

          <div className="flex flex-col gap-3">
            {form.skills.map((skill, index) => (
              <div key={index} className="flex flex-wrap items-end gap-3">
                <div className="min-w-40 flex-1">
                  <AdminInput
                    label="Nom"
                    value={skill.name ?? ''}
                    onChange={(event) =>
                      updateSkill(index, 'name', event.target.value)
                    }
                  />
                </div>
                <div className="w-28">
                  <AdminInput
                    label="Niveau (1-5)"
                    type="number"
                    min="1"
                    max="5"
                    value={skill.level ?? 1}
                    onChange={(event) =>
                      updateSkill(index, 'level', event.target.value)
                    }
                  />
                </div>
                <AdminButton
                  type="button"
                  variant="ghost"
                  onClick={() =>
                    setForm({
                      ...form,
                      skills: form.skills.filter(
                        (_, skillIndex) => skillIndex !== index,
                      ),
                    })
                  }
                >
                  Retirer
                </AdminButton>
              </div>
            ))}
          </div>

          <AdminButton
            type="button"
            variant="ghost"
            className="mt-3"
            onClick={() =>
              setForm({
                ...form,
                skills: [...form.skills, { name: '', level: 3 }],
              })
            }
          >
            Ajouter une compétence
          </AdminButton>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <AdminInput
            label="GitHub"
            value={form.github}
            onChange={(event) => setForm({ ...form, github: event.target.value })}
          />
          <AdminInput
            label="LinkedIn"
            value={form.linkedin}
            onChange={(event) =>
              setForm({ ...form, linkedin: event.target.value })
            }
          />
          <AdminInput
            label="Instagram"
            value={form.instagram}
            onChange={(event) =>
              setForm({ ...form, instagram: event.target.value })
            }
          />
          <AdminInput
            label="Twitter / X"
            value={form.twitter}
            onChange={(event) =>
              setForm({ ...form, twitter: event.target.value })
            }
          />
          <AdminInput
            label="Facebook"
            value={form.facebook}
            onChange={(event) =>
              setForm({ ...form, facebook: event.target.value })
            }
          />
          <AdminInput
            label="WhatsApp"
            value={form.whatsapp}
            onChange={(event) =>
              setForm({ ...form, whatsapp: event.target.value })
            }
          />
        </div>

        <AdminAlert>{error}</AdminAlert>
        <AdminAlert tone="success">
          {saved ? 'Section À propos enregistrée.' : ''}
        </AdminAlert>

        <AdminButton type="submit" disabled={status === 'saving'}>
          {status === 'saving' ? 'Enregistrement...' : 'Enregistrer'}
        </AdminButton>
      </form>
    </AdminCard>
  )
}
