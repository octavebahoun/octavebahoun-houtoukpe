const API_URL = 'https://octavebahoun-houtoukpe.onrender.com/api'

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mwlkdobw'
export const ADMIN_AUTH_URL = `${API_URL}/admin/auth/github`
export const TOKEN_KEY = 'oktav_admin_token'

async function request(path) {
  const response = await fetch(`${API_URL}${path}`)
  if (!response.ok) throw new Error(`API ${response.status}`)
  return response.json()
}

export const fetchProjects = () => request('/projects')
export const fetchBlog = () => request('/blog')
export const fetchCerts = () => request('/certs')
export const fetchAbout = () => request('/about')
export const fetchLanding = () => request('/landing')

export async function adminRequest(path, { method = 'GET', body, token } = {}) {
  const response = await fetch(`${API_URL}/admin${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error || `Erreur ${response.status}`)
  }

  return data
}
