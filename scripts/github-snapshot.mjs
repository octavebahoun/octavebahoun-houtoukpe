// Génère src/data/github.json : instantané des données GitHub affichées sur le site.
// Le site recharge ces données en direct au chargement ; ce fichier sert de
// repli instantané (premier rendu, quota API dépassé, hors ligne).
//
// Usage : GITHUB_TOKEN=xxx node scripts/github-snapshot.mjs
// (le jeton est optionnel mais évite la limite de 60 requêtes/heure)

import { writeFile } from 'node:fs/promises'

const USER = 'octavebahoun'
// dépôts présents sur le compte mais qui ne sont pas des projets d'Oktav (cf. src/data/projects.js)
const HIDDEN = ['agritracebio']
const OUT = new URL('../src/data/github.json', import.meta.url)
const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'oktav-portfolio-snapshot',
  ...(process.env.GITHUB_TOKEN && {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  }),
}

async function get(url) {
  const response = await fetch(url, { headers })
  if (!response.ok) throw new Error(`${response.status} ${url}`)
  return response.json()
}

// même logique que src/lib/github.js (toActivity), dupliquée pour rester un script Node autonome
function toActivity(events) {
  const seen = new Set()
  const items = []
  const sorted = [...events].sort((a, b) =>
    b.created_at.localeCompare(a.created_at),
  )

  for (const event of sorted) {
    const repo = event.repo.name.split('/')[1]
    if (HIDDEN.includes(repo.toLowerCase())) continue
    const { payload } = event
    let item = null

    if (event.type === 'PushEvent') {
      const branch = payload.ref?.replace('refs/heads/', '')
      item = { kind: 'push', repo, detail: branch }
    } else if (event.type === 'PullRequestEvent') {
      const merged = payload.action === 'merged' || payload.pull_request?.merged
      item = {
        kind: merged ? 'merge' : 'pr',
        repo,
        detail: `#${payload.number}`,
      }
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

function toRepo(repo) {
  return {
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    homepage: repo.homepage || null,
    pushedAt: repo.pushed_at,
  }
}

function streaks(days) {
  let longest = 0
  let run = 0
  for (const day of days) {
    run = day.count > 0 ? run + 1 : 0
    longest = Math.max(longest, run)
  }

  // la série en cours tolère un jour vide (aujourd'hui pas encore commencé)
  let current = 0
  const reversed = [...days].reverse()
  const start = reversed[0]?.count === 0 ? 1 : 0
  for (const day of reversed.slice(start)) {
    if (day.count === 0) break
    current += 1
  }

  return { longest, current }
}

const user = await get(`https://api.github.com/users/${USER}`)
const repos = await get(
  `https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`,
)
const own = repos.filter(
  (repo) => !repo.fork && !HIDDEN.includes(repo.name.toLowerCase()),
)

const languages = {}
for (const repo of own) {
  const bytes = await get(repo.languages_url).catch(() => ({}))
  for (const [language, size] of Object.entries(bytes)) {
    languages[language] = (languages[language] ?? 0) + size
  }
}
const totalBytes = Object.values(languages).reduce((sum, size) => sum + size, 0)
const topLanguages = Object.entries(languages)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 6)
  .map(([name, size]) => ({
    name,
    share: Math.round((size / totalBytes) * 1000) / 10,
  }))

const calendarData = await fetch(
  `https://github-contributions-api.jogruber.de/v4/${USER}?y=last`,
).then((response) => response.json())
const calendar = calendarData.contributions.map(({ date, count }) => ({
  date,
  count,
}))

const pullRequests = await get(
  `https://api.github.com/search/issues?q=author:${USER}+type:pr&per_page=1`,
)

const events = await get(
  `https://api.github.com/users/${USER}/events/public?per_page=60`,
)
const activity = toActivity(events)

const snapshot = {
  generatedAt: new Date().toISOString(),
  user: {
    login: user.login,
    name: user.name,
    avatar: user.avatar_url,
    followers: user.followers,
    following: user.following,
    publicRepos: user.public_repos,
    createdAt: user.created_at,
  },
  totals: {
    contributions: calendarData.total?.lastYear ?? 0,
    pullRequests: pullRequests.total_count,
    stars: own.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    ...streaks(calendar),
  },
  languages: topLanguages,
  calendar,
  activity,
  repos: own.map(toRepo),
}

await writeFile(OUT, `${JSON.stringify(snapshot)}\n`)
console.log(
  `github.json : ${snapshot.totals.contributions} contributions, ${own.length} dépôts, ${activity.length} activités`,
)
