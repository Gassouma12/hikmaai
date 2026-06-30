import { useState } from 'react'
import { useTable } from '../lib/api.js'
import { youtubeId, youtubeThumb } from '../lib/storage.js'

/**
 * Podcast episode editor. Rows live in Supabase `episodes` table; realtime
 * updates flow back via useTable. Field naming follows Postgres snake_case
 * (video_id, created_at). The public Media page maps these to the legacy
 * camelCase fields the existing episode card expects.
 */
export default function AdminPodcasts() {
  const [episodes, { insert, remove, loading }] = useTable('episodes')
  const [draft, setDraft] = useState(blank())
  const [busy, setBusy] = useState(false)
  const id = youtubeId(draft.youtube)
  const formValid = id && draft.title.trim() && draft.blurb.trim()

  const submit = async (e) => {
    e.preventDefault()
    if (!formValid || busy) return
    setBusy(true)
    try {
      const nextNum = String((episodes?.length || 0) + 1).padStart(2, '0')
      await insert({
        num: nextNum,
        title: draft.title,
        blurb: draft.blurb,
        guest: draft.guest || null,
        role: draft.role || null,
        duration: draft.duration || null,
        date: today(),
        youtube: draft.youtube,
        video_id: id,
      })
      setDraft(blank())
    } catch (err) {
      alert(`Could not publish: ${err.message}`)
    } finally {
      setBusy(false)
    }
  }

  const onDelete = async (epId) => {
    if (!window.confirm('Delete this episode?')) return
    try { await remove(epId) } catch (err) { alert(`Could not delete: ${err.message}`) }
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
            <button type="submit" className="admin-btn admin-btn-primary" disabled={!formValid || busy}>
              {busy ? 'Publishing…' : 'Publish episode'}
            </button>
            <button type="button" className="admin-btn" onClick={() => setDraft(blank())} disabled={busy}>
              Reset
            </button>
          </div>
        </form>
      </section>

      <section className="admin-section">
        <h2 className="admin-section-title">
          Published Episodes
          <span className="admin-count">{loading ? '…' : episodes.length}</span>
        </h2>
        {episodes.length === 0 && !loading ? (
          <p className="admin-empty">No episodes yet. Publish your first above.</p>
        ) : (
          <ul className="admin-list">
            {episodes.map((ep) => (
              <li key={ep.id} className="admin-list-item">
                <img className="admin-list-thumb" src={youtubeThumb(ep.video_id)} alt="" />
                <div className="admin-list-body">
                  <div className="admin-list-meta">EP. {ep.num} · {ep.date}</div>
                  <h3 className="admin-list-title">{ep.title}</h3>
                  <p className="admin-list-blurb">{ep.blurb}</p>
                  {ep.guest && <div className="admin-list-byline">with {ep.guest}{ep.role ? ` · ${ep.role}` : ''}</div>}
                </div>
                <button className="admin-btn admin-btn-danger" onClick={() => onDelete(ep.id)}>Delete</button>
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
