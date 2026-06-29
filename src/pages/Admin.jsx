import { useState } from 'react'
import PageTransition from '../components/PageTransition.jsx'
import Masthead from '../components/Masthead.jsx'
import AdminPodcasts from '../components/AdminPodcasts.jsx'
import AdminArticles from '../components/AdminArticles.jsx'

const PASSWORD = 'MahaHikma123'
const AUTH_KEY = 'hikma:admin-auth'

export default function Admin() {
  // Auth persists in sessionStorage so a refresh keeps you logged in but a
  // fresh tab doesn't.
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === 'ok')
  const [tab, setTab] = useState('podcasts')

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
          <button
            role="tab"
            aria-selected={tab === 'podcasts'}
            className={`admin-tab ${tab === 'podcasts' ? 'is-active' : ''}`}
            onClick={() => setTab('podcasts')}
          >
            Podcasts
          </button>
          <button
            role="tab"
            aria-selected={tab === 'articles'}
            className={`admin-tab ${tab === 'articles' ? 'is-active' : ''}`}
            onClick={() => setTab('articles')}
          >
            Articles
          </button>
          <button
            className="admin-logout"
            onClick={() => { sessionStorage.removeItem(AUTH_KEY); setAuthed(false) }}
          >
            Sign out
          </button>
        </div>

        {tab === 'podcasts' ? <AdminPodcasts /> : <AdminArticles />}
      </div>
    </PageTransition>
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
