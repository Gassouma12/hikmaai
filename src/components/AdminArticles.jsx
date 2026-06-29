import { useRef, useState } from 'react'
import RichTextEditor from './RichTextEditor.jsx'
import { useStorage } from '../lib/storage.js'

/**
 * Article composer. Admin can:
 *  • List existing user-created articles
 *  • Compose a new one with banner image, metadata, and rich body HTML
 *  • Delete + edit existing ones
 */
export default function AdminArticles() {
  const [articles, setArticles] = useStorage('articles', [])
  const [editing, setEditing] = useState(null) // id being edited, 'new', or null

  const startNew = () => setEditing('new')
  const startEdit = (id) => setEditing(id)
  const close = () => setEditing(null)

  const save = (draft) => {
    if (editing === 'new') {
      const id = (articles.length ? Math.max(...articles.map((a) => a.id)) : 1000) + 1
      const next = { ...draft, id, createdAt: Date.now() }
      setArticles([next, ...articles])
    } else {
      setArticles(articles.map((a) => a.id === editing ? { ...a, ...draft, updatedAt: Date.now() } : a))
    }
    close()
  }

  const remove = (id) => {
    if (!window.confirm('Delete this article?')) return
    setArticles(articles.filter((a) => a.id !== id))
  }

  const current = editing === 'new'
    ? null
    : (editing != null ? articles.find((a) => a.id === editing) : null)

  return (
    <div className="admin-pane">
      {editing == null ? (
        <section className="admin-section">
          <div className="admin-section-head">
            <h2 className="admin-section-title">Articles <span className="admin-count">{articles.length}</span></h2>
            <button className="admin-btn admin-btn-primary" onClick={startNew}>+ New article</button>
          </div>

          {articles.length === 0 ? (
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
                    <button className="admin-btn admin-btn-danger" onClick={() => remove(a.id)}>Delete</button>
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
  const fileRef = useRef(null)

  const update = (patch) => setDraft((d) => ({ ...d, ...patch }))

  const pickBanner = () => fileRef.current?.click()
  const onBanner = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    const r = new FileReader()
    r.onload = () => update({ cover: r.result })
    r.readAsDataURL(f)
    e.target.value = ''
  }

  const valid = draft.title.trim() && draft.body && draft.body.trim()

  return (
    <section className="admin-section">
      <div className="admin-section-head">
        <h2 className="admin-section-title">{mode === 'new' ? 'New Article' : 'Edit Article'}</h2>
        <div className="admin-actions">
          <button className="admin-btn" onClick={onCancel}>Cancel</button>
          <button
            className="admin-btn admin-btn-primary"
            disabled={!valid}
            onClick={() => onSave(draft)}
          >
            {mode === 'new' ? 'Publish' : 'Save changes'}
          </button>
        </div>
      </div>

      <div className="admin-grid-2">
        <label className="admin-field">
          <span>Title</span>
          <input value={draft.title} onChange={(e) => update({ title: e.target.value })} placeholder="Article title" />
        </label>
        <label className="admin-field">
          <span>Tag (e.g. Essay, Field Notes)</span>
          <input value={draft.tag} onChange={(e) => update({ tag: e.target.value })} placeholder="Essay" />
        </label>
      </div>

      <div className="admin-grid-3">
        <label className="admin-field">
          <span>Author</span>
          <input value={draft.author} onChange={(e) => update({ author: e.target.value })} placeholder="Maha Jouini" />
        </label>
        <label className="admin-field">
          <span>Author role</span>
          <input value={draft.role} onChange={(e) => update({ role: e.target.value })} placeholder="Founder · HIKMA AI" />
        </label>
        <label className="admin-field">
          <span>Read time</span>
          <input value={draft.readTime} onChange={(e) => update({ readTime: e.target.value })} placeholder="8 min read" />
        </label>
      </div>

      <label className="admin-field">
        <span>Excerpt (1–2 sentences shown on the card)</span>
        <textarea rows={2} value={draft.excerpt} onChange={(e) => update({ excerpt: e.target.value })} />
      </label>

      <div className="admin-banner-row">
        <div className="admin-field admin-field-banner">
          <span>Banner image</span>
          {draft.cover ? (
            <div className="admin-banner-preview">
              <img src={draft.cover} alt="Banner preview" />
              <div className="admin-banner-actions">
                <button className="admin-btn" onClick={pickBanner}>Replace</button>
                <button className="admin-btn admin-btn-danger" onClick={() => update({ cover: '' })}>Remove</button>
              </div>
            </div>
          ) : (
            <button className="admin-btn admin-banner-pick" onClick={pickBanner}>
              Upload banner image
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={onBanner} />
        </div>
      </div>

      <div className="admin-field">
        <span>Body</span>
        <RichTextEditor value={draft.body} onChange={(html) => update({ body: html })} />
      </div>
    </section>
  )
}

function blank() {
  return {
    title: '', tag: 'Essay', author: '', role: '', readTime: '5 min read',
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
