import { useEffect, useState } from 'react'
import { fetchBlog } from '../lib/api'
import { fallbackPosts } from '../lib/fallbackPosts'

const imageBySlug = {
  'video-remix-studio': '/images/blog/video-remix-studio.jpg',
  'scholaris-veille-n8n': '/images/blog/scholaris.jpg',
  'waaloge-retour-experience': '/images/blog/waaloge.jpg',
}

function normalize(post) {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? '',
    content: post.content ?? '',
    category: post.tags?.[0] ?? 'Article',
    tags: post.tags ?? [],
    date: post.publishedAt ?? post.createdAt ?? '',
    author: 'Oktav Bahoun',
    image: post.image || imageBySlug[post.slug] || '/images/blog/video-remix-studio.jpg',
  }
}

// Une seule requête par session, partagée par toutes les pages
let cache = null
let request = null

function loadPosts() {
  request ??= fetchBlog()
    .then((data) =>
      Array.isArray(data) && data.length > 0
        ? data.filter((post) => post.published !== false).map(normalize)
        : fallbackPosts,
    )
    .catch(() => fallbackPosts)
    .then((posts) => {
      cache = posts
      return posts
    })
  return request
}

export function usePosts() {
  const [posts, setPosts] = useState(cache ?? fallbackPosts)

  useEffect(() => {
    if (cache) return undefined
    let cancelled = false
    loadPosts().then((data) => {
      if (!cancelled) setPosts(data)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return posts
}
