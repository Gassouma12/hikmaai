import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import Masthead from '../components/Masthead.jsx'
import StarMotif from '../components/StarMotif.jsx'
import StarDivider from '../components/StarDivider.jsx'
import HouseOfWisdom from '../components/HouseOfWisdom.jsx'
import { PHILOSOPHERS } from '../data/content.js'

export default function Philosophy() {
  const trackRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 60%', 'end 60%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 })

  return (
    <PageTransition>
      <div className="shell">
        <Masthead
          immediate
          align="center"
          index="05"
          arabic="الفلسفة"
          kicker="Wisdom Across Civilizations"
          title={<>The Philosophers <em>Behind the Vision</em></>}
        />
        <Reveal immediate as="p" className="timeline-desc" delay={0.18}>
          AI did not emerge from a vacuum. HIKMA situates today’s questions within a millennia-long
          conversation about knowledge, reason, and what it means to be human.
        </Reveal>
      </div>

      <section className="section shell">
        <div className="timeline" ref={trackRef}>
          <div className="timeline-line-track" aria-hidden="true">
            <motion.div className="timeline-line-fill" style={{ scaleY }} />
          </div>

          {PHILOSOPHERS.map((p, i) => {
            const left = i % 2 === 0
            return (
              <div className="tl-item" key={p.name}>
                {left ? (
                  <Reveal className="tl-left" y={30}><TlBody p={p} /></Reveal>
                ) : (
                  <div className="tl-left tl-empty" />
                )}

                <div className="tl-center">
                  <span className={`tl-node ${p.highlight ? 'highlight' : ''}`}>
                    <StarMotif size={20} stroke="currentColor" strokeWidth={1} />
                  </span>
                </div>

                {!left ? (
                  <Reveal className="tl-right" y={30}><TlBody p={p} /></Reveal>
                ) : (
                  <div className="tl-right tl-empty" />
                )}
              </div>
            )
          })}
        </div>
      </section>

      <StarDivider />

      {/* ─── House of Wisdom (Baghdad + Timbuktu) ─── */}
      <section className="section shell">
        <Masthead
          align="center"
          index="✦"
          arabic="بيت الحكمة"
          kicker="The House of Wisdom"
          title={<>Where the <em>Conversation</em> Began</>}
          lede="Two cities anchored a millennium of inquiry — translating, arguing, and building the methods on which all later science rests. To understand AI ethics today, start here."
        />
        <HouseOfWisdom />
      </section>
    </PageTransition>
  )
}

function TlBody({ p }) {
  return (
    <>
      <div className="tl-era">{p.era}</div>
      <div className="tl-name">{p.name}</div>
      {p.arabic && <div className="tl-arabic">{p.arabic}</div>}
      <p className="tl-text">{p.desc}</p>
    </>
  )
}
