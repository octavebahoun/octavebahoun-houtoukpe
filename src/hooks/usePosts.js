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
    image: imageBySlug[post.slug] ?? '/images/blog/video-remix-studio.jpg',
  }
}

export function usePosts() {
  const [posts, setPosts] = useState(fallbackPosts)

  useEffect(() => {
    let cancelled = false

    fetchBlog()
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setPosts(
            data
              .filter((post) => post.published !== false)
              .map(normalize),
          )
        }
      })
      .catch(() => {
        if (!cancelled) setPosts(fallbackPosts)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return posts
}
