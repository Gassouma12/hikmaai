import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'
import Reveal from './Reveal.jsx'
import StarMotif from './StarMotif.jsx'
import CountUp from './CountUp.jsx'
import { BAYT_AL_HIKMA, TIMBUKTU } from '../data/content.js'
import baghImg from '../images/bagh.png'
import timImg from '../images/tim.png'

/**
 * Two side-by-side cards (Baghdad + Timbuktu) on the Philosophy page. Each
 * card shows a faint background image and a "click for more" affordance.
 * Clicking expands the chosen card full-width with the full chapter content,
 * while the other card collapses to a slim "Switch" tile. Clicking the slim
 * tile swaps the active chapter.
 */
export default function HouseOfWisdom() {
  // null = both cards visible (initial state); 'baghdad' | 'timbuktu' = expanded.
  const [active, setActive] = useState(null)

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

      <motion.div className="hw-deck" layout transition={LAYOUT_T}>
        {cards.map((c) => {
          const isActive = active === c.key
          const isCollapsed = active !== null && !isActive
          return (
            <motion.button
              key={c.key}
              type="button"
              layout
              transition={LAYOUT_T}
              onClick={() => setActive(isActive ? null : c.key)}
              aria-expanded={isActive}
              className={`hw-card hw-card--${c.accent} ${isActive ? 'is-active' : ''} ${isCollapsed ? 'is-collapsed' : ''}`}
              style={{ backgroundImage: `url(${c.image})` }}
            >
              <span className="hw-card-shade" aria-hidden="true" />
              <motion.span layout="position" className="hw-card-meta">
                <span className="hw-card-arabic">{c.data.arabic}</span>
                <span className="hw-card-rule" />
                <span className="hw-card-era">{c.data.era}</span>
              </motion.span>
              <motion.h3 layout="position" className="hw-card-title">{c.data.city}</motion.h3>
              <motion.p layout="position" className="hw-card-subtitle">{c.data.subtitle}</motion.p>

              {!isActive && (
                <motion.span
                  layout="position"
                  className="hw-card-cta"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                >
                  <span className="hw-card-cta-text">{isCollapsed ? 'Switch chapter' : 'Click to enter'}</span>
                  <span className="hw-card-cta-arrow" aria-hidden="true">→</span>
                </motion.span>
              )}

              {isActive && (
                <motion.span
                  layout="position"
                  className="hw-card-close"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
                >
                  Collapse <span aria-hidden="true">×</span>
                </motion.span>
              )}

              {/* Expanded content lives inside the card so layout animation carries it. */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    className="hw-card-content"
                    key="content"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.25, ease: [0.23, 1, 0.32, 1] } }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ChapterBody
                      data={c.data}
                      accent={c.accent}
                      subjects={c.subjects}
                      crisis={c.crisis}
                      showStats={c.key === 'timbuktu'}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}

const LAYOUT_T = { duration: 0.55, ease: [0.23, 1, 0.32, 1] }

function ChapterBody({ data, accent, subjects, crisis, showStats }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rail = useSpring(scrollYProgress, { stiffness: 80, damping: 28, restDelta: 0.001 })

  return (
    <div className={`hw-chapter hw-chapter--${accent}`} ref={ref}>
      {showStats && (
        <div className="hw-stats">
          {data.stats.map((s, i) => (
            <Reveal className="hw-stat" key={s.label} delay={i * 0.06} y={18}>
              <span className="hw-stat-num"><CountUp value={s.num} /></span>
              <span className="hw-stat-label">{s.label}</span>
            </Reveal>
          ))}
        </div>
      )}

      <div className="hw-body-grid">
        <div className="hw-rail" aria-hidden="true">
          <span className="hw-rail-track" />
          <motion.span className="hw-rail-fill" style={{ scaleY: rail }} />
          <span className="hw-rail-star">
            <StarMotif size={18} stroke="currentColor" strokeWidth={0.9} />
          </span>
        </div>

        <div className="hw-body">
          <Reveal as="p" className="hw-lede" y={20}>{data.lede}</Reveal>

          {data.body.map((p, i) => (
            <Reveal as="p" className="hw-p" key={i} delay={i * 0.04} y={20}>{p}</Reveal>
          ))}

          {data.pullquote && (
            <Reveal className="hw-pullquote" y={20}>
              <span className="hw-pullquote-mark" aria-hidden="true">“</span>
              <p>{data.pullquote.replace(/^“|”$/g, '')}</p>
              {data.pullattr && <span className="hw-pullquote-attr">{data.pullattr}</span>}
            </Reveal>
          )}

          {subjects && (
            <Reveal className="hw-subjects" y={16}>
              <div className="hw-subjects-kicker">Curriculum at Sankore</div>
              <div className="hw-subjects-grid">
                {subjects.map((s) => <span className="hw-subject" key={s}>{s}</span>)}
              </div>
            </Reveal>
          )}

          <Reveal className="hw-section-title" y={14}>
            <span className="hw-section-arabic">العلماء</span>
            <h4>{accent === 'amber' ? 'The scholars who built the bridge' : 'The scholars who made it possible'}</h4>
          </Reveal>
          <div className="hw-scholars">
            {data.scholars.map((s, i) => (
              <Reveal className="hw-scholar" key={s.name} delay={(i % 2) * 0.07} y={20}>
                <span className="hw-scholar-mark"><StarMotif size={14} stroke="currentColor" strokeWidth={1.1} /></span>
                <h5 className="hw-scholar-name">{s.name}</h5>
                <div className="hw-scholar-field">{s.field}</div>
                <p className="hw-scholar-text">{s.text}</p>
              </Reveal>
            ))}
          </div>

          {data.manuscriptsTitle && (
            <Reveal className="hw-manuscripts" y={20}>
              <h4 className="hw-section-title-plain">{data.manuscriptsTitle}</h4>
              <p>{data.manuscriptsBody}</p>
            </Reveal>
          )}

          {data.westwardTitle && (
            <Reveal className="hw-westward" y={20}>
              <h4 className="hw-section-title-plain">{data.westwardTitle}</h4>
              <p>{data.westwardIntro}</p>
            </Reveal>
          )}

          <Reveal className="hw-section-title" y={14}>
            <span className="hw-section-arabic">الزمن</span>
            <h4>{accent === 'amber' ? 'The river of learning, in dates' : 'The city through time'}</h4>
          </Reveal>
          <ol className="hw-timeline">
            {data.timeline.map((t, i) => (
              <Reveal as="li" className="hw-tl-item" key={t.year} delay={i * 0.05} y={16}>
                <span className="hw-tl-dot" aria-hidden="true" />
                <span className="hw-tl-year">{t.year}</span>
                <span className="hw-tl-text">{t.text}</span>
              </Reveal>
            ))}
          </ol>

          {crisis && (
            <Reveal className="hw-crisis" y={20}>
              <span className="hw-crisis-kicker">{crisis.title}</span>
              <p className="hw-crisis-body">{crisis.body}</p>
              <div className="hw-crisis-stats">
                {crisis.stats.map((s) => (
                  <div className="hw-crisis-stat" key={s.label}>
                    <div className="hw-crisis-num"><CountUp value={s.num} /></div>
                    <div className="hw-crisis-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal className="hw-closing" y={20}>
            <span className="hw-closing-mark" aria-hidden="true">✦</span>
            <p>{data.closing}</p>
          </Reveal>

          {data.custodianQuote && (
            <Reveal className="hw-custodian" y={20}>
              <p>{data.custodianQuote.replace(/^“|”$/g, '')}</p>
              <span className="hw-custodian-attr">{data.custodianAttr}</span>
            </Reveal>
          )}
        </div>
      </div>
    </div>
  )
}
