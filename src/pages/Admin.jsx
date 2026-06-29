import { useMemo, useState } from 'react'
import PageTransition from '../components/PageTransition.jsx'
import Masthead from '../components/Masthead.jsx'
import AdminPodcasts from '../components/AdminPodcasts.jsx'
import AdminArticles from '../components/AdminArticles.jsx'
import AdminInbox from '../components/AdminInbox.jsx'
import { useStorage } from '../lib/storage.js'

const PASSWORD = 'MahaHikma123'
const AUTH_KEY = 'hikma:admin-auth'

export default function Admin() {
  // Auth persists in sessionStorage so a refresh keeps you logged in but a
  // fresh tab doesn't.
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === 'ok')
  const [tab, setTab] = useState('podcasts')

  // Subscribed here so the unread pill updates live when the inbox marks
  // messages as read in the sibling tab.
  const [outreach] = useStorage('outreach', [])
  const unread = useMemo(() => outreach.filter((o) => !o.read).length, [outreach])

  if (!authed) return <Gate onAuth={() => { sessionStorage.setItem(AUTH_KEY, 'ok'); setAuthed(true) }} />

  return (
    <PageTransition>
      <div className="shell">
        <Masthead
          immediate
          index="00"
          arabic="لوحة التحكم"
          kicker="Admin · HIKMA AI"
          title={<>Content <em>Studio</em></>}
          lede="Publish new podcast episodes and articles. Changes are saved to this browser only — connect a backend to sync across devices."
        />

        <div className="admin-tabs" role="tablist">
          <Tab id="podcasts" tab={tab} setTab={setTab}>Podcasts</Tab>
          <Tab id="articles" tab={tab} setTab={setTab}>Articles</Tab>
          <Tab id="inbox" tab={tab} setTab={setTab}>
            Inbox
            {unread > 0 && <span className="admin-tab-badge" aria-label={`${unread} unread`}>{unread}</span>}
          </Tab>
          <button
            className="admin-logout"
            onClick={() => { sessionStorage.removeItem(AUTH_KEY); setAuthed(false) }}
          >
            Sign out
          </button>
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

function Gate({ onAuth }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (pw === PASSWORD) { setErr(false); onAuth() }
    else { setErr(true); setPw('') }
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
              onChange={(e) => { setPw(e.target.value); setErr(false) }}
              className={err ? 'is-error' : ''}
            />
            {err && <p className="admin-gate-err">Incorrect password.</p>}
            <button type="submit" className="admin-gate-btn">Sign in</button>
          </form>
        </div>
      </div>
    </PageTransition>
  )
}
