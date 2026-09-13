export async function fetchRepoInfo(repo) {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`)
    if (!response.ok) return null
    return response.json()
  } catch {
    return null
  }
}

export async function enrichWithGithub(projects) {
  return Promise.all(
    projects.map(async (project) => {
      if (!project.repo) return project

      const info = await fetchRepoInfo(project.repo)
      if (!info) return project

      return {
        ...project,
        stars: info.stargazers_count ?? project.stars ?? 0,
        description: project.description || info.description || '',
        stack: project.stack?.length
          ? project.stack
          : [info.language].filter(Boolean),
        link:
          project.link && project.link !== '#'
            ? project.link
            : info.homepage || info.html_url,
      }
    }),
  )
}
