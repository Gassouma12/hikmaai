import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import Masthead from '../components/Masthead.jsx'
import StarMotif from '../components/StarMotif.jsx'
import CountUp from '../components/CountUp.jsx'
import { PODCAST, EPISODES } from '../data/content.js'

export default function Media() {
  return (
    <PageTransition>
      <div className="shell">
        <Masthead
          immediate
          index="04"
          arabic={PODCAST.arabic}
          kicker="The Podcast · Knowledge in Motion"
          title={<>The Hikma <em>Dialogues</em></>}
          lede={PODCAST.tagline}
        />
      </div>

      {/* ─── Storytelling intro ─── */}
      <section className="section-tight shell">
        <div className="podcast-intro corner-ticks">
          <div className="podcast-intro-main">
            <div className="media-type"><span className="media-dot" />Long-form conversations · New episode every fortnight</div>
            <p className="podcast-intro-text">{PODCAST.intro}</p>
          </div>
          <div className="podcast-intro-stats">
            {PODCAST.stats.map((s) => (
              <div className="podcast-stat" key={s.label}>
                <div className="podcast-stat-num"><CountUp value={s.num} /></div>
                <div className="podcast-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Episodes ─── */}
      <section className="section-tight shell">
        <div className="episodes-head">
          <h2 className="episodes-title">Episodes</h2>
          <span className="episodes-meta">
            <CountUp value={String(EPISODES.length)} /> of {PODCAST.stats[0].num} · Listen on your platform of choice
          </span>
        </div>

        <div className="episode-list">
          {EPISODES.map((ep, i) => (
            <Reveal as="article" className="episode" key={ep.num} delay={(i % 2) * 0.06} y={28}>
              <a className="episode-thumb" href={ep.youtube} aria-label={`Watch episode ${ep.num}: ${ep.title}`}>
                <span className="episode-thumb-motif" aria-hidden="true">
                  <StarMotif size={64} stroke="var(--gold-dim)" strokeWidth={0.6} />
                </span>
                <span className="episode-ep">EP. {ep.num}</span>
                <span className="episode-play" aria-hidden="true">▶</span>
                <span className="episode-duration">{ep.duration}</span>
              </a>

              <div className="episode-body">
                <div className="episode-byline">
                  <span className="episode-guest">{ep.guest}</span>
                  <span className="episode-dot">·</span>
                  <span className="episode-role">{ep.role}</span>
                  <span className="episode-date">{ep.date}</span>
                </div>
                <h3 className="episode-title">{ep.title}</h3>
                <p className="episode-blurb">{ep.blurb}</p>
                <a href={ep.youtube} className="media-link">Watch on YouTube</a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
