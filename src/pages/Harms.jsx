import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import Masthead from '../components/Masthead.jsx'
import { HARMS, HARMS_INTRO } from '../data/content.js'

export default function Harms() {
  return (
    <PageTransition>
      <div className="shell">
        <Masthead
          immediate
          index="03"
          arabic="الأضرار"
          kicker="Why This Cannot Wait"
          title={<>The Harms <em>Are Real</em></>}
          lede={HARMS_INTRO}
        />
      </div>

      <section className="section-tight shell">
        <div className="harms-list">
          {HARMS.map((h, i) => (
            <Reveal className="harm-row" key={h.tag} y={30}>
              <div className="harm-aside">
                <span className="harm-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="harm-tag">{h.tag}</span>
              </div>
              <div className="harm-body">
                <h3 className="harm-title">{h.title}</h3>
                <p className="harm-text">{h.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
