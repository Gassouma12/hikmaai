import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import Masthead from '../components/Masthead.jsx'
import StarDivider from '../components/StarDivider.jsx'
import CountUp from '../components/CountUp.jsx'
import mahaPhoto from '../images/maha.jpeg'
import { FOUNDER, WHY_HIKMA } from '../data/content.js'

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
            </div>

            <div className="founder-stats">
              {FOUNDER.stats.map((s) => (
                <div className="stat-item" key={s.label}>
                  <div className="stat-num"><CountUp value={s.num} /></div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
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

            {FOUNDER.bioParts.map((p, i) => (
              <Reveal as="p" className="founder-bio" delay={0.25 + i * 0.04} key={i}>{p}</Reveal>
            ))}

            <Reveal className="founder-credentials" delay={0.3}>
              <div className="founder-credentials-kicker">Selected Affiliations</div>
              <ul className="founder-credentials-list">
                {FOUNDER.credentials.map((c) => (
                  <li key={c.role + c.org} className="founder-credential">
                    <span className="founder-credential-role">{c.role}</span>
                    <span className="founder-credential-org">{c.org}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <StarDivider />

      {/* ─── Why I Founded HIKMA ─── */}
      <section className="section manifesto">
        <div className="shell manifesto-inner">
          <Masthead
            align="center"
            index="✦"
            arabic={WHY_HIKMA.arabic}
            kicker={WHY_HIKMA.kicker}
            title={<>{WHY_HIKMA.titlePre} <em>{WHY_HIKMA.titleEm}</em></>}
          />

          <Reveal className="manifesto-opener" y={20}>
            <span className="manifesto-mark" aria-hidden="true">“</span>
            <p>{WHY_HIKMA.opener}</p>
          </Reveal>

          <div className="manifesto-body">
            {WHY_HIKMA.body.map((p, i) => (
              <Reveal as="p" className="manifesto-p" key={i} delay={i * 0.04} y={20}>{p}</Reveal>
            ))}
          </div>

          <Reveal className="manifesto-closing" y={24}>
            <h3 className="manifesto-question">{WHY_HIKMA.closing}</h3>
            <p className="manifesto-signoff">{WHY_HIKMA.signoff}</p>
            <p className="manifesto-attr">— Maha Jouini, Founder</p>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}
