import { useEffect, useState } from 'react'
import { adminRequest, fetchLanding } from '../../lib/api'
import {
  AdminAlert,
  AdminButton,
  AdminCard,
  AdminInput,
  AdminTextarea,
} from './AdminUI'

const emptyForm = {
  work: '',
  name: '',
  shortabout: '',
  image: '',
  overtext: '',
  seeall: '',
  firsttext: '',
  secondtext: '',
  footerWork: '',
  footerName: '',
  footerContact: '',
}

export default function AdminLanding({ token }) {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchLanding()
      .then((data) => {
        setForm({
          work: data.hero?.work ?? '',
          name: data.hero?.name ?? '',
          shortabout: data.hero?.shortabout ?? '',
          image: data.hero?.image ?? '',
          overtext: data.selectedWork?.overtext ?? '',
          seeall: data.selectedWork?.seeall ?? '',
          firsttext: data.cta?.firsttext ?? '',
          secondtext: data.cta?.secondtext ?? '',
          footerWork: data.footer?.work ?? '',
          footerName: data.footer?.name ?? '',
          footerContact: data.footer?.contact ?? '',
        })
      })
      .catch(() => setForm(emptyForm))
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('saving')
    setError('')
    setSaved(false)

    try {
      await adminRequest('/landing', {
        method: 'PUT',
        token,
        body: {
          hero: {
            work: form.work,
            name: form.name,
            shortabout: form.shortabout,
            image: form.image,
          },
          selectedWork: {
            overtext: form.overtext,
            seeall: form.seeall,
          },
          cta: {
            firsttext: form.firsttext,
            secondtext: form.secondtext,
          },
          footer: {
            work: form.footerWork,
            name: form.footerName,
            contact: form.footerContact,
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
      <h2 className="text-2xl font-bold">Page d&apos;accueil (landing)</h2>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
        <h3 className="mt-2 font-bold text-primary">Hero</h3>
        <AdminInput
          label="Titre principal *"
          required
          value={form.work}
          onChange={(event) => setForm({ ...form, work: event.target.value })}
        />
        <AdminInput
          label="Nom"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
        />
        <AdminTextarea
          label="Petite intro"
          rows="3"
          className="font-sans"
          value={form.shortabout}
          onChange={(event) =>
            setForm({ ...form, shortabout: event.target.value })
          }
        />
        <AdminInput
          label="Image (URL) *"
          required
          value={form.image}
          onChange={(event) => setForm({ ...form, image: event.target.value })}
        />

        <h3 className="mt-4 font-bold text-primary">Travaux sélectionnés</h3>
        <AdminInput
          label="Sur-titre *"
          required
          value={form.overtext}
          onChange={(event) => setForm({ ...form, overtext: event.target.value })}
        />
        <AdminInput
          label="Texte du bouton « voir tout »"
          value={form.seeall}
          onChange={(event) => setForm({ ...form, seeall: event.target.value })}
        />

        <h3 className="mt-4 font-bold text-primary">Appel à l&apos;action</h3>
        <AdminInput
          label="Premier texte *"
          required
          value={form.firsttext}
          onChange={(event) =>
            setForm({ ...form, firsttext: event.target.value })
          }
        />
        <AdminInput
          label="Second texte *"
          required
          value={form.secondtext}
          onChange={(event) =>
            setForm({ ...form, secondtext: event.target.value })
          }
        />

        <h3 className="mt-4 font-bold text-primary">Footer</h3>
        <AdminInput
          label="Titre *"
          required
          value={form.footerWork}
          onChange={(event) =>
            setForm({ ...form, footerWork: event.target.value })
          }
        />
        <AdminInput
          label="Nom *"
          required
          value={form.footerName}
          onChange={(event) =>
            setForm({ ...form, footerName: event.target.value })
          }
        />
        <AdminInput
          label="Contact"
          value={form.footerContact}
          onChange={(event) =>
            setForm({ ...form, footerContact: event.target.value })
          }
        />

        <AdminAlert>{error}</AdminAlert>
        <AdminAlert tone="success">
          {saved ? 'Landing enregistrée.' : ''}
        </AdminAlert>

        <AdminButton type="submit" disabled={status === 'saving'}>
          {status === 'saving' ? 'Enregistrement...' : 'Enregistrer'}
        </AdminButton>
      </form>
    </AdminCard>
  )
}
