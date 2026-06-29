import { useEffect, useState } from 'react'

/**
 * Tiny localStorage-backed React state hook. No backend yet, so admin-added
 * podcasts/articles live in the browser only. Storage keys are namespaced under
 * `hikma:`. Returns `[value, setValue]` like useState.
 */
export function useStorage(key, fallback) {
  const fullKey = `hikma:${key}`
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(fullKey)
      return raw ? JSON.parse(raw) : fallback
    } catch {
      return fallback
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(fullKey, JSON.stringify(value))
    } catch {
      /* quota exceeded etc. — silently no-op */
    }
  }, [fullKey, value])

  return [value, setValue]
}

/** Extract the YouTube video id from a URL (watch?v=, youtu.be/, /embed/). */
export function youtubeId(url) {
  if (!url) return null
  try {
    const u = new URL(url)
    if (u.hostname === 'youtu.be') return u.pathname.slice(1) || null
    if (u.hostname.endsWith('youtube.com')) {
      if (u.pathname === '/watch') return u.searchParams.get('v')
      if (u.pathname.startsWith('/embed/')) return u.pathname.split('/')[2]
      if (u.pathname.startsWith('/shorts/')) return u.pathname.split('/')[2]
    }
  } catch {
    /* fall through */
  }
  // Accept a raw 11-char id too.
  const m = String(url).match(/^[A-Za-z0-9_-]{11}$/)
  return m ? m[0] : null
}

/** youtubeId(...) → official thumbnail URL (high-quality default). */
export function youtubeThumb(id) {
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null
}
