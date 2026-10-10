import { useSyncExternalStore } from 'react'
import snapshot from '../data/github.json'
import { GITHUB_USER } from '../data/profile'
import { hiddenRepos } from '../data/projects'

// Données GitHub : l'instantané (src/data/github.json) s'affiche immédiatement,
// puis une version fraîche est chargée une fois par session (3 appels API max).

const CACHE_KEY = 'oktav-github-v3'
const TTL = 30 * 60 * 1000

let state = readCache() ?? snapshot
let started = false
const listeners = new Set()

function readCache() {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY))
    if (cached && Date.now() - cached.savedAt < TTL) return cached.data
  } catch {
    // stockage indisponible (navigation privée) : on garde l'instantané
  }
  return null
}

function writeCache(data) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data }))
  } catch {
    // quota ou stockage bloqué : sans gravité
  }
}

function emit(next) {
  state = next
  listeners.forEach((listener) => listener())
}

async function getJson(url) {
  const response = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } })
  if (!response.ok) throw new Error(`${response.status}`)
  return response.json()
}

export function toActivity(events) {
  const seen = new Set()
  const items = []
  const sorted = [...events].sort((a, b) => b.created_at.localeCompare(a.created_at))

  for (const event of sorted) {
    const repo = event.repo.name.split('/')[1]
    if (hiddenRepos.includes(repo.toLowerCase())) continue
    const { payload } = event
    let item = null

    if (event.type === 'PushEvent') {
      item = { kind: 'push', repo, detail: payload.ref?.replace('refs/heads/', '') }
    } else if (event.type === 'PullRequestEvent') {
      const merged = payload.action === 'merged' || payload.pull_request?.merged
      item = { kind: merged ? 'merge' : 'pr', repo, detail: `#${payload.number}` }
    } else if (event.type === 'CreateEvent' && payload.ref_type === 'repository') {
      item = { kind: 'repo', repo, detail: null }
    } else if (event.type === 'ReleaseEvent') {
      item = { kind: 'release', repo, detail: payload.release?.tag_name }
    }

    if (!item) continue
    const key = `${item.kind}:${item.repo}:${item.detail}`
    if (seen.has(key)) continue
    seen.add(key)
    items.push({ ...item, date: event.created_at })
    if (items.length === 6) break
  }

  return items
}

function streaks(days) {
  let longest = 0
  let run = 0
  for (const day of days) {
    run = day.count > 0 ? run + 1 : 0
    longest = Math.max(longest, run)
  }

  let current = 0
  const reversed = [...days].reverse()
  const start = reversed[0]?.count === 0 ? 1 : 0
  for (const day of reversed.slice(start)) {
    if (day.count === 0) break
    current += 1
  }

  return { longest, current }
}

async function refresh() {
  const base = `https://api.github.com/users/${GITHUB_USER}`
  const [user, repos, events, calendar] = await Promise.allSettled([
    getJson(base),
    getJson(`${base}/repos?per_page=100&sort=pushed`),
    getJson(`${base}/events/public?per_page=60`),
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`).then(
      (response) => (response.ok ? response.json() : Promise.reject(new Error('calendar'))),
    ),
  ])

  const next = { ...state, totals: { ...state.totals } }

  if (user.status === 'fulfilled') {
    next.user = {
      ...next.user,
      followers: user.value.followers,
      following: user.value.following,
      publicRepos: user.value.public_repos,
      avatar: user.value.avatar_url,
    }
  }

  if (repos.status === 'fulfilled' && Array.isArray(repos.value)) {
    const own = repos.value.filter(
      (repo) => !repo.fork && !hiddenRepos.includes(repo.name.toLowerCase()),
    )
    next.repos = own.map((repo) => ({
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      homepage: repo.homepage || null,
      pushedAt: repo.pushed_at,
    }))
    next.totals.stars = own.reduce((sum, repo) => sum + repo.stargazers_count, 0)
  }

  if (events.status === 'fulfilled' && Array.isArray(events.value)) {
    const activity = toActivity(events.value)
    if (activity.length) next.activity = activity
  }

  if (calendar.status === 'fulfilled' && calendar.value?.contributions?.length) {
    next.calendar = calendar.value.contributions.map(({ date, count }) => ({ date, count }))
    next.totals.contributions = calendar.value.total?.lastYear ?? next.totals.contributions
    Object.assign(next.totals, streaks(next.calendar))
  }

  writeCache(next)
  emit(next)
}

function subscribe(listener) {
  listeners.add(listener)
  if (!started && !readCache()) {
    started = true
    // attend que le navigateur soit libre : le premier rendu reste fluide
    const idle = window.requestIdleCallback ?? ((callback) => setTimeout(callback, 1200))
    idle(() => refresh().catch(() => {}), { timeout: 4000 })
  }
  return () => listeners.delete(listener)
}

export function useGithub() {
  return useSyncExternalStore(subscribe, () => state, () => state)
}

export function repoByFullName(data, fullName) {
  if (!fullName) return null
  const key = fullName.toLowerCase()
  return data.repos?.find((repo) => repo.fullName.toLowerCase() === key) ?? null
}
