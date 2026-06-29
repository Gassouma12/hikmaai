import { useState } from 'react'
import { useStorage, youtubeId, youtubeThumb } from '../lib/storage.js'

/**
 * Podcast episode editor. Adds new episodes to localStorage which the public
 * Media page merges with the seeded EPISODES from content.js. Each episode
 * keeps the same shape as the seed data (num, title, blurb, youtube, etc.)
 * plus a `videoId` for embedding the preview.
 */
export default function AdminPodcasts() {
  const [episodes, setEpisodes] = useStorage('episodes', [])
  const [draft, setDraft] = useState(blank())
  const id = youtubeId(draft.youtube)
  const formValid = id && draft.title.trim() && draft.blurb.trim()

  const submit = (e) => {
    e.preventDefault()
    if (!formValid) return
    const nextNum = String(episodes.length + 1).padStart(2, '0')
    const ep = { ...draft, num: nextNum, videoId: id, date: today(), createdAt: Date.now() }
    setEpisodes([ep, ...episodes])
    setDraft(blank())
  }

  const remove = (createdAt) => {
    if (!window.confirm('Delete this episode?')) return
    setEpisodes(episodes.filter((e) => e.createdAt !== createdAt))
  }

  return (
    <div className="admin-pane">
      <section className="admin-section">
        <h2 className="admin-section-title">New Episode</h2>
        <form className="admin-form" onSubmit={submit}>
          <div className="admin-grid-2">
            <label className="admin-field">
              <span>YouTube URL</span>
              <input
                type="url"
                value={draft.youtube}
                onChange={(e) => setDraft({ ...draft, youtube: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=…"
                required
              />
              {draft.youtube && !id && (
                <small className="admin-hint admin-hint-err">Not a valid YouTube URL.</small>
              )}
            </label>
            <label className="admin-field">
              <span>Title</span>
              <input
                type="text"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                placeholder="Episode title"
                required
              />
            </label>
          </div>

          <div className="admin-grid-2">
            <label className="admin-field">
              <span>Guest (optional)</span>
              <input
                type="text"
                value={draft.guest}
                onChange={(e) => setDraft({ ...draft, guest: e.target.value })}
                placeholder="Dr. Lina Haddad"
              />
            </label>
            <label className="admin-field">
              <span>Guest role (optional)</span>
              <input
                type="text"
                value={draft.role}
                onChange={(e) => setDraft({ ...draft, role: e.target.value })}
                placeholder="Computational Linguist, Beirut"
              />
            </label>
          </div>

          <label className="admin-field">
            <span>Short description</span>
            <textarea
              rows={3}
              value={draft.blurb}
              onChange={(e) => setDraft({ ...draft, blurb: e.target.value })}
              placeholder="A short summary that appears on the episode card."
              required
            />
          </label>

          {id && (
            <div className="admin-preview">
              <div className="admin-preview-label">Preview</div>
              <div className="admin-preview-video">
                <iframe
                  src={`https://www.youtube.com/embed/${id}`}
                  title="Preview"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          <div className="admin-actions">
            <button type="submit" className="admin-btn admin-btn-primary" disabled={!formValid}>
              Publish episode
            </button>
            <button type="button" className="admin-btn" onClick={() => setDraft(blank())}>
              Reset
            </button>
          </div>
        </form>
      </section>

      <section className="admin-section">
        <h2 className="admin-section-title">Published Episodes <span className="admin-count">{episodes.length}</span></h2>
        {episodes.length === 0 ? (
          <p className="admin-empty">No episodes yet. Publish your first above.</p>
        ) : (
          <ul className="admin-list">
            {episodes.map((ep) => (
              <li key={ep.createdAt} className="admin-list-item">
                <img className="admin-list-thumb" src={youtubeThumb(ep.videoId)} alt="" />
                <div className="admin-list-body">
                  <div className="admin-list-meta">EP. {ep.num} · {ep.date}</div>
                  <h3 className="admin-list-title">{ep.title}</h3>
                  <p className="admin-list-blurb">{ep.blurb}</p>
                  {ep.guest && <div className="admin-list-byline">with {ep.guest}{ep.role ? ` · ${ep.role}` : ''}</div>}
                </div>
                <button className="admin-btn admin-btn-danger" onClick={() => remove(ep.createdAt)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

function blank() {
  return { youtube: '', title: '', blurb: '', guest: '', role: '', duration: '' }
}
function today() {
  return new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
