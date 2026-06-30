import { useRef, useState } from 'react'
import RichTextEditor from './RichTextEditor.jsx'
import { useTable } from '../lib/api.js'
import { uploadImage } from '../lib/supabase.js'

/**
 * Article composer. Rows live in Supabase `articles`; banner images live in
 * the `media` storage bucket. Field naming = snake_case (read_time, etc.) to
 * match Postgres. Body is rich HTML written by RichTextEditor.
 */
export default function AdminArticles() {
  const [articles, { insert, update, remove, loading }] = useTable('articles')
  const [editing, setEditing] = useState(null)   // article id, 'new', or null

  const startNew = () => setEditing('new')
  const startEdit = (id) => setEditing(id)
  const close = () => setEditing(null)

  const save = async (draft) => {
    try {
      if (editing === 'new') {
        await insert({ ...draft })
      } else {
        await update(editing, { ...draft, updated_at: new Date().toISOString() })
      }
      close()
    } catch (err) {
      alert(`Could not save: ${err.message}`)
    }
  }

  const onDelete = async (id) => {
    if (!window.confirm('Delete this article?')) return
    try { await remove(id) } catch (err) { alert(`Could not delete: ${err.message}`) }
  }

  const current = editing === 'new'
    ? null
    : (editing != null ? articles.find((a) => a.id === editing) : null)

  return (
    <div className="admin-pane">
      {editing == null ? (
        <section className="admin-section">
          <div className="admin-section-head">
            <h2 className="admin-section-title">
              Articles
              <span className="admin-count">{loading ? '…' : articles.length}</span>
            </h2>
            <button className="admin-btn admin-btn-primary" onClick={startNew}>+ New article</button>
          </div>

          {articles.length === 0 && !loading ? (
            <p className="admin-empty">No articles yet. Click <em>New article</em> to write your first.</p>
          ) : (
            <ul className="admin-list">
              {articles.map((a) => (
                <li key={a.id} className="admin-list-item">
                  {a.cover && <img className="admin-list-thumb" src={a.cover} alt="" />}
                  <div className="admin-list-body">
                    <div className="admin-list-meta">{a.tag || 'Article'} · {a.date}</div>
                    <h3 className="admin-list-title">{a.title || 'Untitled'}</h3>
                    <p className="admin-list-blurb">{a.excerpt || strip(a.body).slice(0, 160)}</p>
                  </div>
                  <div className="admin-list-actions">
                    <button className="admin-btn" onClick={() => startEdit(a.id)}>Edit</button>
                    <button className="admin-btn admin-btn-danger" onClick={() => onDelete(a.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : (
        <ArticleForm
          initial={current}
          onSave={save}
          onCancel={close}
          mode={editing === 'new' ? 'new' : 'edit'}
        />
      )}
    </div>
  )
}

function ArticleForm({ initial, onSave, onCancel, mode }) {
  const [draft, setDraft] = useState(() => initial ? { ...initial } : blank())
  const [busy, setBusy] = useState(false)
  const fileRef = useRef(null)

  const update = (patch) => setDraft((d) => ({ ...d, ...patch }))

  const pickBanner = () => fileRef.current?.click()
  const onBanner = async (e) => {
    const f = e.target.files?.[0]
    e.target.value = ''
    if (!f) return
    setBusy(true)
    try {
      const url = await uploadImage(f, 'banners')
      update({ cover: url })
    } catch (err) {
      alert(`Image upload failed: ${err.message}`)
    } finally {
      setBusy(false)
    }
  }

  const valid = draft.title.trim() && draft.body && draft.body.trim()

  const handleSave = async () => {
    setBusy(true)
    await onSave(draft)
    setBusy(false)
  }

  return (
    <section className="admin-section">
      <div className="admin-section-head">
        <h2 className="admin-section-title">{mode === 'new' ? 'New Article' : 'Edit Article'}</h2>
        <div className="admin-actions">
          <button className="admin-btn" onClick={onCancel} disabled={busy}>Cancel</button>
          <button
            className="admin-btn admin-btn-primary"
            disabled={!valid || busy}
            onClick={handleSave}
          >
            {busy ? 'Saving…' : (mode === 'new' ? 'Publish' : 'Save changes')}
          </button>
        </div>
      </div>

      <div className="admin-grid-2">
        <label className="admin-field">
          <span>Title</span>
          <input value={draft.title || ''} onChange={(e) => update({ title: e.target.value })} placeholder="Article title" />
        </label>
        <label className="admin-field">
          <span>Tag (e.g. Essay, Field Notes)</span>
          <input value={draft.tag || ''} onChange={(e) => update({ tag: e.target.value })} placeholder="Essay" />
        </label>
      </div>

      <div className="admin-grid-3">
        <label className="admin-field">
          <span>Author</span>
          <input value={draft.author || ''} onChange={(e) => update({ author: e.target.value })} placeholder="Maha Jouini" />
        </label>
        <label className="admin-field">
          <span>Author role</span>
          <input value={draft.role || ''} onChange={(e) => update({ role: e.target.value })} placeholder="Founder · HIKMA AI" />
        </label>
        <label className="admin-field">
          <span>Read time</span>
          <input value={draft.read_time || ''} onChange={(e) => update({ read_time: e.target.value })} placeholder="8 min read" />
        </label>
      </div>

      <label className="admin-field">
        <span>Excerpt (1–2 sentences shown on the card)</span>
        <textarea rows={2} value={draft.excerpt || ''} onChange={(e) => update({ excerpt: e.target.value })} />
      </label>

      <div className="admin-banner-row">
        <div className="admin-field admin-field-banner">
          <span>Banner image</span>
          {draft.cover ? (
            <div className="admin-banner-preview">
              <img src={draft.cover} alt="Banner preview" />
              <div className="admin-banner-actions">
                <button className="admin-btn" onClick={pickBanner} disabled={busy}>{busy ? 'Uploading…' : 'Replace'}</button>
                <button className="admin-btn admin-btn-danger" onClick={() => update({ cover: '' })} disabled={busy}>Remove</button>
              </div>
            </div>
          ) : (
            <button className="admin-btn admin-banner-pick" onClick={pickBanner} disabled={busy}>
              {busy ? 'Uploading…' : 'Upload banner image'}
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={onBanner} />
        </div>
      </div>

      <div className="admin-field">
        <span>Body</span>
        <RichTextEditor value={draft.body || ''} onChange={(html) => update({ body: html })} />
      </div>
    </section>
  )
}

function blank() {
  return {
    title: '', tag: 'Essay', author: '', role: '', read_time: '5 min read',
    excerpt: '', cover: '', body: '',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  }
}

function strip(html) {
  if (!html) return ''
  const div = document.createElement('div')
  div.innerHTML = html
  return (div.textContent || '').replace(/\s+/g, ' ').trim()
}
