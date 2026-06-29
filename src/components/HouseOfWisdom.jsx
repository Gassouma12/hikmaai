import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Reveal from './Reveal.jsx'
import StarMotif from './StarMotif.jsx'
import CountUp from './CountUp.jsx'
import { BAYT_AL_HIKMA, TIMBUKTU } from '../data/content.js'

/**
 * "The House of Wisdom" — paired editorial chapters for Baghdad and Timbuktu.
 * A bilingual cover banner, scroll-progress arabesque line, scholars grid,
 * timeline, and a closing reflection. Each chapter is self-contained and
 * reusable on any page.
 */
export default function HouseOfWisdom() {
  return (
    <div className="hw-wrap">
      <Reveal className="hw-prologue" y={20}>
        <span className="hw-prologue-kicker">سلسلة بيت الحكمة · The Unbroken Thread</span>
        <h2 className="hw-prologue-title">Two cities. One conversation.</h2>
        <p className="hw-prologue-text">
          Before Silicon Valley was a forest, Baghdad and Timbuktu were the two great poles
          of a single intellectual world — held together not by empire, but by translation,
          by trade routes of ideas, and by a stubborn refusal to let knowledge belong to one
          civilisation alone.
        </p>
      </Reveal>

      <Chapter
        index="01"
        data={BAYT_AL_HIKMA}
        accent="amber"
        showStats={false}
      />

      <div className="hw-bridge" aria-hidden="true">
        <span className="hw-bridge-line" />
        <span className="hw-bridge-arabic">إلى الجنوب · westward, then southward</span>
        <span className="hw-bridge-line" />
      </div>

      <Chapter
        index="02"
        data={TIMBUKTU}
        accent="sand"
        showStats
        crisis={TIMBUKTU.crisis}
        subjects={TIMBUKTU.subjects}
        manuscriptsTitle={TIMBUKTU.manuscriptsTitle}
        manuscriptsBody={TIMBUKTU.manuscriptsBody}
        custodianQuote={TIMBUKTU.custodianQuote}
        custodianAttr={TIMBUKTU.custodianAttr}
      />
    </div>
  )
}

function Chapter({
  index,
  data,
  accent,
  showStats,
  crisis,
  subjects,
  manuscriptsTitle,
  manuscriptsBody,
  custodianQuote,
  custodianAttr,
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // The vertical arabesque rail fills as the chapter scrolls past.
  const rail = useSpring(scrollYProgress, { stiffness: 80, damping: 28, restDelta: 0.001 })
  // Cover banner Arabic word drifts slowly with scroll.
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section className={`hw-chapter hw-chapter--${accent}`} ref={ref}>
      {/* Cover banner */}
      <Reveal className="hw-cover" y={30}>
        <motion.span
          className="hw-cover-bgword"
          aria-hidden="true"
          style={{ y: bgY }}
        >
          {data.arabic}
        </motion.span>
        <div className="hw-cover-meta">
          <span className="hw-cover-index">{index}</span>
          <span className="hw-cover-rule" />
          <span className="hw-cover-era">{data.era}</span>
        </div>
        <h3 className="hw-cover-city">
          <span className="hw-cover-arabic">{data.arabic}</span>
          <span className="hw-cover-roman">{data.city}</span>
        </h3>
        <p className="hw-cover-subtitle">{data.subtitle}</p>
      </Reveal>

      {/* Optional stat row (Timbuktu) */}
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

      {/* Body with scroll-progress arabesque rail down the left */}
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

          {/* Subjects (Timbuktu) */}
          {subjects && (
            <Reveal className="hw-subjects" y={16}>
              <div className="hw-subjects-kicker">Curriculum at Sankore</div>
              <div className="hw-subjects-grid">
                {subjects.map((s) => (
                  <span className="hw-subject" key={s}>{s}</span>
                ))}
              </div>
            </Reveal>
          )}

          {/* Scholars grid */}
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

          {/* Manuscripts panel (Timbuktu only) */}
          {manuscriptsTitle && (
            <Reveal className="hw-manuscripts" y={20}>
              <h4 className="hw-section-title-plain">{manuscriptsTitle}</h4>
              <p>{manuscriptsBody}</p>
            </Reveal>
          )}

          {/* Westward intro (Baghdad only) */}
          {data.westwardTitle && (
            <Reveal className="hw-westward" y={20}>
              <h4 className="hw-section-title-plain">{data.westwardTitle}</h4>
              <p>{data.westwardIntro}</p>
            </Reveal>
          )}

          {/* Timeline */}
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

          {/* Crisis panel (Timbuktu) */}
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

          {/* Closing reflection */}
          <Reveal className="hw-closing" y={20}>
            <span className="hw-closing-mark" aria-hidden="true">✦</span>
            <p>{data.closing}</p>
          </Reveal>

          {custodianQuote && (
            <Reveal className="hw-custodian" y={20}>
              <p>{custodianQuote.replace(/^“|”$/g, '')}</p>
              <span className="hw-custodian-attr">{custodianAttr}</span>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
