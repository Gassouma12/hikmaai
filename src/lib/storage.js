import { useEffect, useState } from 'react'

/**
 * localStorage-backed React state hook with cross-instance + cross-tab sync.
 * Multiple components using `useStorage('outreach', [])` stay in lockstep:
 *  • Same-tab updates fire a custom event that every hook subscribes to.
 *  • Other-tab updates arrive via the native `storage` event.
 */
const EVENT = 'hikma-storage-change'

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function useStorage(key, fallback) {
  const fullKey = `hikma:${key}`
  const [value, setValueState] = useState(() => read(fullKey, fallback))

  // Subscribe to same-tab + cross-tab changes.
  useEffect(() => {
    const sync = (e) => {
      if (e instanceof StorageEvent) {
        if (e.key !== fullKey) return
      } else if (e.detail !== fullKey) return
      setValueState(read(fullKey, fallback))
    }
    window.addEventListener('storage', sync)
    window.addEventListener(EVENT, sync)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener(EVENT, sync)
    }
    // fallback intentionally omitted: should be a stable seed value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullKey])

  const setValue = (next) => {
    setValueState((prev) => {
      const resolved = typeof next === 'function' ? next(prev) : next
      try {
        localStorage.setItem(fullKey, JSON.stringify(resolved))
        window.dispatchEvent(new CustomEvent(EVENT, { detail: fullKey }))
      } catch { /* quota etc. */ }
      return resolved
    })
  }

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
