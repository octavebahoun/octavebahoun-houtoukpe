import { useEffect, useState } from 'react'

const USER = 'octavebahoun'

const FALLBACK = { repos: 78, stars: 53, followers: 16, avatar: null }

export function useGithubStats() {
  const [stats, setStats] = useState(FALLBACK)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USER}`),
          fetch(`https://api.github.com/users/${USER}/repos?per_page=100`),
        ])
        if (!userRes.ok || !reposRes.ok) return

        const user = await userRes.json()
        const repos = await reposRes.json()
        const stars = repos.reduce(
          (total, repo) => total + repo.stargazers_count,
          0,
        )

        if (!cancelled) {
          setStats({
            repos: user.public_repos,
            stars,
            followers: user.followers,
            avatar: user.avatar_url,
          })
        }
      } catch {
        if (!cancelled) setStats(FALLBACK)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return stats
}
