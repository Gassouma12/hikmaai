import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import Marquee from '../components/Marquee.jsx'
import QuoteBlock from '../components/QuoteBlock.jsx'
import Masthead from '../components/Masthead.jsx'
import StarDivider from '../components/StarDivider.jsx'
import Reveal from '../components/Reveal.jsx'
import CountUp from '../components/CountUp.jsx'
import MeshHero from '../components/MeshHero.jsx'
import { BaytAlHikmaScene, TimbuktuScene } from '../components/HeritageScenes.jsx'
import { LIBRARIES, HERITAGE_STATS, VISION, VISION_INTRO } from '../data/content.js'

const SCENES = [BaytAlHikmaScene, TimbuktuScene]

export default function Home() {
  return (
    <PageTransition>
      {/* ─── HERO (animated mesh gradient) ─── */}
      <MeshHero />

      <Marquee />

      {/* ─── OUR HERITAGE ─── */}
      <section className="section shell">
        <Masthead
          align="center"
          index="✦"
          arabic="الإرث الفكري"
          kicker="The Intellectual Legacy"
          title={<>Our <em>Heritage</em></>}
        />
        <Reveal as="h2" className="heritage-statement">
          Before Silicon Valley existed, our ancestors built the{' '}
          <em>first knowledge ecosystems</em> the world had ever seen.
        </Reveal>

        <div className="arch-cards">
          {LIBRARIES.map((lib, i) => {
            const Scene = SCENES[i]
            return (
              <Reveal className="arch-card" key={lib.name} delay={i * 0.12} y={36}>
                <div className="arch-card-media"><Scene /></div>
                <div className="arch-card-body">
                  <div className="arch-card-loc">{lib.location}</div>
                  <h3 className="arch-card-title">{lib.name}</h3>
                  <div className="arch-card-arabic">{lib.arabic}</div>
                  <p className="arch-card-desc">{lib.desc}</p>
                  <Link to="/philosophy" className="arch-card-btn">Learn More</Link>
                </div>
              </Reveal>
            )
          })}
        </div>

        <div className="heritage-stats">
          {HERITAGE_STATS.map((s, i) => (
            <Reveal className="count-item" key={s.label} delay={i * 0.07} y={0}>
              <span className="count-num"><CountUp value={s.num} /></span>
              <span className="count-label">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <StarDivider />

      {/* ─── VISION ─── */}
      <section className="section shell">
        <Masthead
          align="center"
          index="✦"
          arabic="الرؤية"
          kicker="Core Objectives"
          title={<>The HIKMA <em>Vision</em></>}
          lede={VISION_INTRO}
        />
        <div className="pillars">
          {VISION.map((v, i) => (
            <Reveal className="pillar" key={v.num} delay={(i % 3) * 0.08}>
              <span className="pillar-n">{v.num}</span>
              <h3 className="pillar-title">{v.title}</h3>
              <p className="pillar-text">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <QuoteBlock />
    </PageTransition>
  )
}
