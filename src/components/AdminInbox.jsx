import { useMemo, useState } from 'react'
import { useTable } from '../lib/api.js'

/**
 * Inbox of inbound outreach from the public contact form. Rows live in the
 * Supabase `outreach` table. RLS lets anon INSERT (so the public form works
 * without sign-in) but only authenticated users can SELECT/UPDATE/DELETE.
 */
export default function AdminInbox() {
  const [outreach, { update, remove, loading }] = useTable('outreach')
  const [filter, setFilter] = useState('all')
  const [openId, setOpenId] = useState(null)

  const visible = useMemo(
    () => filter === 'unread' ? outreach.filter((o) => !o.read) : outreach,
    [outreach, filter],
  )
  const unread = useMemo(() => outreach.filter((o) => !o.read).length, [outreach])

  const markRead = async (id, read = true) => {
    try { await update(id, { read }) } catch (e) { alert(e.message) }
  }
  const onDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return
    try { await remove(id) } catch (e) { alert(e.message); return }
    if (openId === id) setOpenId(null)
  }
  const markAllRead = async () => {
    for (const o of outreach.filter((o) => !o.read)) {
      try { await update(o.id, { read: true }) } catch (e) { /* keep going */ }
    }
  }
  const clearAll = async () => {
    if (!window.confirm('Delete ALL messages? This cannot be undone.')) return
    for (const o of outreach) {
      try { await remove(o.id) } catch (e) { /* keep going */ }
    }
    setOpenId(null)
  }

  const open = (entry) => {
    setOpenId(entry.id)
    if (!entry.read) markRead(entry.id, true)
  }

  return (
    <div className="admin-pane">
      <section className="admin-section">
        <div className="admin-section-head">
          <h2 className="admin-section-title">
            Outreach
            <span className="admin-count">{loading ? '…' : outreach.length}</span>
            {unread > 0 && <span className="admin-count admin-count-unread">{unread} unread</span>}
          </h2>
          <div className="admin-actions">
            <div className="admin-segmented" role="tablist" aria-label="Filter">
              <button
                className={`admin-seg ${filter === 'all' ? 'is-active' : ''}`}
                onClick={() => setFilter('all')}
              >All</button>
              <button
                className={`admin-seg ${filter === 'unread' ? 'is-active' : ''}`}
                onClick={() => setFilter('unread')}
              >Unread</button>
            </div>
            {unread > 0 && (
              <button className="admin-btn" onClick={markAllRead}>Mark all read</button>
            )}
            {outreach.length > 0 && (
              <button className="admin-btn admin-btn-danger" onClick={clearAll}>Clear all</button>
            )}
          </div>
        </div>

        {visible.length === 0 && !loading ? (
          <p className="admin-empty">
            {filter === 'unread' ? 'No unread messages.' : 'No messages yet. Submissions from the contact form will appear here.'}
          </p>
        ) : (
          <ul className="inbox-list">
            {visible.map((o) => (
              <li key={o.id} className={`inbox-row ${!o.read ? 'is-unread' : ''} ${openId === o.id ? 'is-open' : ''}`}>
                <button className="inbox-row-head" onClick={() => open(o)}>
                  <span className={`inbox-dot ${!o.read ? 'is-unread' : ''}`} aria-hidden="true" />
                  <span className="inbox-name">{o.name || 'Anonymous'}</span>
                  <span className="inbox-purpose">{labelPurpose(o.purpose)}</span>
                  <span className="inbox-snippet">{(o.message || '').slice(0, 110)}{o.message && o.message.length > 110 ? '…' : ''}</span>
                  <span className="inbox-date">{fmt(o.created_at)}</span>
                </button>

                {openId === o.id && (
                  <div className="inbox-detail">
                    <div className="inbox-detail-meta">
                      <a className="inbox-detail-email" href={`mailto:${o.email}?subject=Re: HIKMA outreach`}>{o.email}</a>
                      {Array.isArray(o.attachments) && o.attachments.length > 0 && (
                        <span className="inbox-attachments">
                          📎 {o.attachments.length} attachment{o.attachments.length > 1 ? 's' : ''}: {o.attachments.map((a) => a.name).join(', ')}
                        </span>
                      )}
                    </div>
                    <div className="inbox-message">{o.message}</div>
                    <div className="inbox-detail-actions">
                      <a className="admin-btn admin-btn-primary" href={`mailto:${o.email}?subject=Re: HIKMA outreach`}>
                        Reply via email
                      </a>
                      <button className="admin-btn" onClick={() => markRead(o.id, !o.read)}>
                        Mark {o.read ? 'unread' : 'read'}
                      </button>
                      <button className="admin-btn admin-btn-danger" onClick={() => onDelete(o.id)}>Delete</button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

function labelPurpose(p) {
  if (p === 'podcast') return 'Podcast'
  if (p === 'partnership') return 'Partnership'
  return p || ''
}

function fmt(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const now = new Date()
  const sameDay = d.toDateString() === now.toDateString()
  return sameDay
    ? d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    : d.toLocaleDateString([], { month: 'short', day: 'numeric' })
}
