import { useEffect, useMemo, useState } from 'react'
import PageTransition from '../components/PageTransition.jsx'
import Masthead from '../components/Masthead.jsx'
import AdminPodcasts from '../components/AdminPodcasts.jsx'
import AdminArticles from '../components/AdminArticles.jsx'
import AdminInbox from '../components/AdminInbox.jsx'
import { supabase, adminSignIn, adminSignOut } from '../lib/supabase.js'
import { useTable } from '../lib/api.js'

export default function Admin() {
  const [session, setSession] = useState(null)
  const [tab, setTab] = useState('podcasts')

  // Live session tracking: keeps `session` in sync if Supabase refreshes the
  // token or the user signs out from another tab.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  // Unread inbox count for the tab pill — only meaningful once signed in,
  // since RLS hides outreach from anon.
  const [outreach] = useTable('outreach')
  const unread = useMemo(() => session ? outreach.filter((o) => !o.read).length : 0, [outreach, session])

  if (!session) return <Gate onAuthed={() => { /* state will sync via subscription */ }} />

  return (
    <PageTransition>
      <div className="shell">
        <Masthead
          immediate
          index="00"
          arabic="لوحة التحكم"
          kicker="Admin · HIKMA AI"
          title={<>Content <em>Studio</em></>}
          lede="Publish new podcast episodes and articles. Changes sync to every visitor of the live site."
        />

        <div className="admin-tabs" role="tablist">
          <Tab id="podcasts" tab={tab} setTab={setTab}>Podcasts</Tab>
          <Tab id="articles" tab={tab} setTab={setTab}>Articles</Tab>
          <Tab id="inbox" tab={tab} setTab={setTab}>
            Inbox
            {unread > 0 && <span className="admin-tab-badge" aria-label={`${unread} unread`}>{unread}</span>}
          </Tab>
          <button className="admin-logout" onClick={() => adminSignOut()}>Sign out</button>
        </div>

        {tab === 'podcasts' && <AdminPodcasts />}
        {tab === 'articles' && <AdminArticles />}
        {tab === 'inbox' && <AdminInbox />}
      </div>
    </PageTransition>
  )
}

function Tab({ id, tab, setTab, children }) {
  const active = tab === id
  return (
    <button
      role="tab"
      aria-selected={active}
      className={`admin-tab ${active ? 'is-active' : ''}`}
      onClick={() => setTab(id)}
    >
      {children}
    </button>
  )
}

function Gate({ onAuthed }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    setBusy(true)
    const { ok, error } = await adminSignIn(pw)
    setBusy(false)
    if (!ok) {
      setErr(humanizeError(error))
      setPw('')
    } else {
      onAuthed?.()
    }
  }

  return (
    <PageTransition>
      <div className="shell admin-gate">
        <div className="admin-gate-card">
          <span className="admin-gate-kicker">حكمة · Admin</span>
          <h1 className="admin-gate-title">Content Studio</h1>
          <p className="admin-gate-lede">
            Restricted area. Enter the editor password to continue.
          </p>
          <form className="admin-gate-form" onSubmit={submit}>
            <label className="admin-gate-label" htmlFor="admin-pw">Password</label>
            <input
              id="admin-pw"
              type="password"
              autoFocus
              autoComplete="current-password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setErr('') }}
              className={err ? 'is-error' : ''}
              disabled={busy}
            />
            {err && <p className="admin-gate-err">{err}</p>}
            <button type="submit" className="admin-gate-btn" disabled={busy || !pw}>
              {busy ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </PageTransition>
  )
}

function humanizeError(error) {
  if (!error) return 'Sign-in failed.'
  const msg = String(error.message || '').toLowerCase()
  if (msg.includes('invalid')) return 'Incorrect password.'
  if (msg.includes('fetch')) return 'Cannot reach the server. Check your connection.'
  return error.message || 'Sign-in failed.'
}
