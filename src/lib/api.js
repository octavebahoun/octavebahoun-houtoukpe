const API_URL = 'https://octavebahoun-houtoukpe.onrender.com/api'

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mwlkdobw'

async function request(path) {
  const response = await fetch(`${API_URL}${path}`)
  if (!response.ok) throw new Error(`API ${response.status}`)
  return response.json()
}

export const fetchProjects = () => request('/projects')
export const fetchBlog = () => request('/blog')
export const fetchCerts = () => request('/certs')
