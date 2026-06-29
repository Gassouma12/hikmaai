import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal.jsx'
import StarMotif from './StarMotif.jsx'
// CountUp removed inside this component: its useInView listener firing during
// page-level exit animations was preventing AnimatePresence (mode="wait") from
// unmounting the outgoing page. Plain numbers ship faster anyway.
import { BAYT_AL_HIKMA, TIMBUKTU } from '../data/content.js'
import baghImg from '../images/bagh.png'
import timImg from '../images/tim.png'

/**
 * Click-to-expand Baghdad + Timbuktu cards. Geometry transitions are pure CSS
 * (transform/padding/min-height) so they don't fight the page-level
 * AnimatePresence in App.jsx — the previous framer `layout` approach blocked
 * route changes because the layout-tracked elements never finished cleaning up.
 * Only the inner content uses framer for a smooth height+opacity reveal.
 */
export default function HouseOfWisdom() {
  const [active, setActive] = useState(null)
  const deckRef = useRef(null)

  // Click anywhere outside the active card collapses it.
  useEffect(() => {
    if (!active) return
    const handler = (e) => {
      if (deckRef.current && !deckRef.current.contains(e.target)) {
        setActive(null)
      }
    }
    // Use mousedown so we react before any other click handlers.
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [active])

  const cards = [
    { key: 'baghdad',  data: BAYT_AL_HIKMA, image: baghImg, accent: 'amber', subjects: null,             crisis: null },
    { key: 'timbuktu', data: TIMBUKTU,      image: timImg,  accent: 'sand',  subjects: TIMBUKTU.subjects, crisis: TIMBUKTU.crisis },
  ]

  return (
    <div className="hw-wrap">
      <Reveal className="hw-prologue" y={20}>
        <span className="hw-prologue-kicker">سلسلة بيت الحكمة · The Unbroken Thread</span>
        <h2 className="hw-prologue-title">Two cities. One conversation.</h2>
        <p className="hw-prologue-text">
          Before Silicon Valley was a forest, Baghdad and Timbuktu were the two great poles
          of a single intellectual world. Choose a city to enter its story.
        </p>
      </Reveal>

      <div className="hw-deck" ref={deckRef}>
        {cards.map((c) => {
          const isActive = active === c.key
          const isCollapsed = active !== null && !isActive
          const toggle = () => setActive(isActive ? null : c.key)
          return (
            // div with role=button (not <button>) because the card contains
            // headings, lists, and paragraphs — those are invalid inside a
            // real <button> and cause the browser to auto-close the button
            // tag, which then breaks React's reconciliation on route changes.
            <div
              key={c.key}
              role="button"
              tabIndex={0}
              onClick={toggle}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle() } }}
              aria-expanded={isActive}
              className={`hw-card hw-card--${c.accent} ${isActive ? 'is-active' : ''} ${isCollapsed ? 'is-collapsed' : ''}`}
              style={{ backgroundImage: `url(${c.image})` }}
            >
              <span className="hw-card-shade" aria-hidden="true" />
              <span className="hw-card-meta">
                <span className="hw-card-arabic">{c.data.arabic}</span>
                <span className="hw-card-rule" />
                <span className="hw-card-era">{c.data.era}</span>
              </span>
              <h3 className="hw-card-title">{c.data.city}</h3>
              <p className="hw-card-subtitle">{c.data.subtitle}</p>

              {!isActive && (
                <span className="hw-card-cta">
                  <span className="hw-card-cta-text">{isCollapsed ? 'Switch chapter' : 'Click to enter'}</span>
                  <span className="hw-card-cta-arrow" aria-hidden="true">→</span>
                </span>
              )}

              {isActive && (
                <span className="hw-card-close">
                  Collapse <span aria-hidden="true">×</span>
                </span>
              )}

              {/* Only the active chapter mounts. Pre-mounting both broke
                  navigation: useScroll/useSpring inside ChapterBody kept the
                  page-level AnimatePresence (mode="wait") in App.jsx from
                  unmounting the outgoing page. CSS fade-in covers the reveal. */}
              {isActive && (
                <div className="hw-card-content" onClick={(e) => e.stopPropagation()}>
                  <ChapterBody
                    data={c.data}
                    accent={c.accent}
                    subjects={c.subjects}
                    crisis={c.crisis}
                    showStats={c.key === 'timbuktu'}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ChapterBody({ data, accent, subjects, crisis, showStats }) {
  return (
    <div className={`hw-chapter hw-chapter--${accent}`}>
      {showStats && (
        <div className="hw-stats">
          {data.stats.map((s) => (
            <div className="hw-stat" key={s.label}>
              <span className="hw-stat-num">{s.num}</span>
              <span className="hw-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="hw-body-grid">
        <div className="hw-rail" aria-hidden="true">
          <span className="hw-rail-track" />
          <span className="hw-rail-fill" />
          <span className="hw-rail-star">
            <StarMotif size={18} stroke="currentColor" strokeWidth={0.9} />
          </span>
        </div>

        <div className="hw-body">
          <p className="hw-lede">{data.lede}</p>

          {data.body.map((p, i) => (
            <p className="hw-p" key={i}>{p}</p>
          ))}

          {data.pullquote && (
            <div className="hw-pullquote">
              <span className="hw-pullquote-mark" aria-hidden="true">“</span>
              <p>{data.pullquote.replace(/^“|”$/g, '')}</p>
              {data.pullattr && <span className="hw-pullquote-attr">{data.pullattr}</span>}
            </div>
          )}

          {subjects && (
            <div className="hw-subjects">
              <div className="hw-subjects-kicker">Curriculum at Sankore</div>
              <div className="hw-subjects-grid">
                {subjects.map((s) => <span className="hw-subject" key={s}>{s}</span>)}
              </div>
            </div>
          )}

          <div className="hw-section-title">
            <span className="hw-section-arabic">العلماء</span>
            <h4>{accent === 'amber' ? 'The scholars who built the bridge' : 'The scholars who made it possible'}</h4>
          </div>
          <div className="hw-scholars">
            {data.scholars.map((s) => (
              <div className="hw-scholar" key={s.name}>
                <span className="hw-scholar-mark"><StarMotif size={14} stroke="currentColor" strokeWidth={1.1} /></span>
                <h5 className="hw-scholar-name">{s.name}</h5>
                <div className="hw-scholar-field">{s.field}</div>
                <p className="hw-scholar-text">{s.text}</p>
              </div>
            ))}
          </div>

          {data.manuscriptsTitle && (
            <div className="hw-manuscripts">
              <h4 className="hw-section-title-plain">{data.manuscriptsTitle}</h4>
              <p>{data.manuscriptsBody}</p>
            </div>
          )}

          {data.westwardTitle && (
            <div className="hw-westward">
              <h4 className="hw-section-title-plain">{data.westwardTitle}</h4>
              <p>{data.westwardIntro}</p>
            </div>
          )}

          <div className="hw-section-title">
            <span className="hw-section-arabic">الزمن</span>
            <h4>{accent === 'amber' ? 'The river of learning, in dates' : 'The city through time'}</h4>
          </div>
          <ol className="hw-timeline">
            {data.timeline.map((t) => (
              <li className="hw-tl-item" key={t.year}>
                <span className="hw-tl-dot" aria-hidden="true" />
                <span className="hw-tl-year">{t.year}</span>
                <span className="hw-tl-text">{t.text}</span>
              </li>
            ))}
          </ol>

          {crisis && (
            <div className="hw-crisis">
              <span className="hw-crisis-kicker">{crisis.title}</span>
              <p className="hw-crisis-body">{crisis.body}</p>
              <div className="hw-crisis-stats">
                {crisis.stats.map((s) => (
                  <div className="hw-crisis-stat" key={s.label}>
                    <div className="hw-crisis-num">{s.num}</div>
                    <div className="hw-crisis-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="hw-closing">
            <span className="hw-closing-mark" aria-hidden="true">✦</span>
            <p>{data.closing}</p>
          </div>

          {data.custodianQuote && (
            <div className="hw-custodian">
              <p>{data.custodianQuote.replace(/^“|”$/g, '')}</p>
              <span className="hw-custodian-attr">{data.custodianAttr}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
