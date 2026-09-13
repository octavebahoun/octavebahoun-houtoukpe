import { useCallback, useEffect, useState } from 'react'
import { ADMIN_AUTH_URL, TOKEN_KEY } from '../lib/api'

function readTokenFromUrl() {
  const params = new URLSearchParams(window.location.search)
  const token = params.get('token')
  if (!token) return null

  localStorage.setItem(TOKEN_KEY, token)
  params.delete('token')
  const query = params.toString()
  window.history.replaceState(
    {},
    '',
    `${window.location.pathname}${query ? `?${query}` : ''}`,
  )
  return token
}

function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch {
    return null
  }
}

export function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    const fromUrl = readTokenFromUrl()

    if (fromUrl) {
      setToken(fromUrl)
      setExpired(false)
      return
    }

    if (!token) {
      setExpired(false)
      return
    }

    const payload = decodeToken(token)
    setExpired(Boolean(payload?.exp && payload.exp * 1000 < Date.now()))
  }, [token])

  const login = useCallback(() => {
    window.location.href = ADMIN_AUTH_URL
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
  }, [])

  const user = token ? decodeToken(token) : null

  return { token, user, expired, login, logout }
}
