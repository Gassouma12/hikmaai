import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import Masthead from '../components/Masthead.jsx'
import CountUp from '../components/CountUp.jsx'
import mahaPhoto from '../images/maha.jpeg'
import { FOUNDER } from '../data/content.js'

export default function About() {
  return (
    <PageTransition>
      <div className="shell">
        <Masthead
          immediate
          index="✦"
          arabic="المؤسِّسة"
          kicker="The Founder"
          title={<>An ancient lineage, <em>a modern mission</em></>}
          lede="HIKMA AI exists to reconnect technology with wisdom. Our story does not begin in Silicon Valley — it begins centuries earlier, in the libraries and academies that first taught the world how to think."
        />
      </div>

      {/* ─── Founder ─── */}
      <section className="section founder">
        <div className="shell founder-inner">
          <Reveal className="founder-figure" y={0}>
            <div className="founder-frame">
              <span className="corner tl" />
              <span className="corner br" />
              <img className="founder-photo" src={mahaPhoto} alt="Maha Jouini, Founder & Director of HIKMA AI" />
            </div>
            <div className="founder-folio">01</div>
            <motion.div
              className="founder-badge"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <div className="founder-badge-title">Founder &amp; Director</div>
              <div className="founder-badge-name">HIKMA AI</div>
            </motion.div>
          </Reveal>

          <div className="founder-content">
            <Reveal as="span" className="founder-thesis">{FOUNDER.thesis}</Reveal>
            <Reveal className="kicker" delay={0.05}>{FOUNDER.label}</Reveal>
            <Reveal as="h2" className="founder-name" delay={0.1}>
              {FOUNDER.name[0]} {FOUNDER.name[1]}
            </Reveal>
            <Reveal className="founder-roles" delay={0.15}>
              {FOUNDER.roles.map((r) => (
                <span className="role-tag" key={r}>{r}</span>
              ))}
            </Reveal>
            <Reveal as="p" className="founder-quote" delay={0.2}>{FOUNDER.quote}</Reveal>
            <Reveal as="p" className="founder-bio" delay={0.25}>{FOUNDER.bio}</Reveal>
            <Reveal className="founder-stats" delay={0.3}>
              {FOUNDER.stats.map((s) => (
                <div className="stat-item" key={s.label}>
                  <div className="stat-num"><CountUp value={s.num} /></div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
