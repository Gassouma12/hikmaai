import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import Masthead from '../components/Masthead.jsx'
import StarMotif from '../components/StarMotif.jsx'
import CountUp from '../components/CountUp.jsx'
import { PODCAST, EPISODES, ARTICLES } from '../data/content.js'
import { useStorage, youtubeId } from '../lib/storage.js'

const PAGE_SIZE = 5

export default function Media() {
  const [tab, setTab] = useState('episodes') // 'episodes' | 'articles'
  const [page, setPage] = useState(1)

  // Merge admin-added entries (localStorage) with the seeded ones.
  const [userEpisodes] = useStorage('episodes', [])
  const [userArticles] = useStorage('articles', [])
  const allEpisodes = useMemo(() => [...userEpisodes, ...EPISODES], [userEpisodes])
  const allArticles = useMemo(() => [...userArticles, ...ARTICLES], [userArticles])

  // Source list + pagination derived together so a tab swap also resets to page 1.
  const list = tab === 'episodes' ? allEpisodes : allArticles
  const pageCount = Math.max(1, Math.ceil(list.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)
  const slice = useMemo(
    () => list.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [list, safePage],
  )

  const switchTab = (next) => {
    if (next === tab) return
    setTab(next)
    setPage(1)
  }

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

      {/* ─── Tabs + paginated list ─── */}
      <section className="section-tight shell">
        <div className="voices-head">
          <h2 className="episodes-title">
            {tab === 'episodes' ? 'Episodes' : 'Articles'}
          </h2>

          <div className="voices-tabs" role="tablist" aria-label="Voices content">
            <button
              role="tab"
              aria-selected={tab === 'episodes'}
              className={`voices-tab ${tab === 'episodes' ? 'is-active' : ''}`}
              onClick={() => switchTab('episodes')}
            >
              Podcast
              <span className="voices-tab-count">{EPISODES.length}</span>
            </button>
            <button
              role="tab"
              aria-selected={tab === 'articles'}
              className={`voices-tab ${tab === 'articles' ? 'is-active' : ''}`}
              onClick={() => switchTab('articles')}
            >
              Articles
              <span className="voices-tab-count">{ARTICLES.length}</span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {tab === 'episodes' ? (
              <EpisodeList items={slice} />
            ) : (
              <ArticleList items={slice} />
            )}
          </motion.div>
        </AnimatePresence>

        {pageCount > 1 && (
          <Pagination page={safePage} pageCount={pageCount} onChange={setPage} />
        )}
      </section>
    </PageTransition>
  )
}

/* ─── Episode list ─── */
function EpisodeList({ items }) {
  return (
    <div className="episode-list">
      {items.map((ep, i) => {
        const vid = ep.videoId || youtubeId(ep.youtube)
        return (
        <Reveal as="article" className="episode" key={ep.num + '-' + i} delay={(i % 2) * 0.06} y={28}>
          {vid ? (
            <div className="episode-thumb episode-thumb-video">
              <iframe
                src={`https://www.youtube.com/embed/${vid}`}
                title={ep.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <span className="episode-ep">EP. {ep.num}</span>
              {ep.duration && <span className="episode-duration">{ep.duration}</span>}
            </div>
          ) : (
            <a className="episode-thumb" href={ep.youtube} aria-label={`Watch episode ${ep.num}: ${ep.title}`}>
              <span className="episode-thumb-motif" aria-hidden="true">
                <StarMotif size={64} stroke="var(--gold-dim)" strokeWidth={0.6} />
              </span>
              <span className="episode-ep">EP. {ep.num}</span>
              <span className="episode-play" aria-hidden="true">▶</span>
              {ep.duration && <span className="episode-duration">{ep.duration}</span>}
            </a>
          )}

          <div className="episode-body">
            <div className="episode-byline">
              <span className="episode-guest">{ep.guest}</span>
              <span className="episode-dot">·</span>
              <span className="episode-role">{ep.role}</span>
              <span className="episode-date">{ep.date}</span>
            </div>
            <h3 className="episode-title">{ep.title}</h3>
            <p className="episode-blurb">{ep.blurb}</p>
            <a href={ep.youtube} className="media-link" target="_blank" rel="noreferrer">Watch on YouTube</a>
          </div>
        </Reveal>
        )
      })}
    </div>
  )
}

/* ─── Article grid ─── */
function ArticleList({ items }) {
  return (
    <div className="article-grid">
      {items.map((a, i) => (
        <Reveal as="div" className="article-card-wrap" key={a.id} delay={(i % 3) * 0.06} y={24}>
          <Link to={`/media/articles/${a.id}`} className="article-card" aria-label={a.title}>
            <div className="article-card-media">
              <img src={a.cover} alt="" loading="lazy" />
              <span className="article-card-tag">{a.tag}</span>
            </div>
            <div className="article-card-body">
              <div className="article-card-meta">
                <span>{a.author}</span>
                <span className="article-card-dot">·</span>
                <span>{a.date}</span>
                <span className="article-card-dot">·</span>
                <span>{a.readTime}</span>
              </div>
              <h3 className="article-card-title">{a.title}</h3>
              <p className="article-card-excerpt">{a.excerpt}</p>
              <span className="article-card-cta">Read article <span aria-hidden="true">→</span></span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  )
}

/* ─── Pagination ─── */
function Pagination({ page, pageCount, onChange }) {
  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        className="pagination-arrow"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        ←
      </button>
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          className={`pagination-num ${n === page ? 'is-active' : ''}`}
          onClick={() => onChange(n)}
          aria-current={n === page ? 'page' : undefined}
        >
          {n}
        </button>
      ))}
      <button
        className="pagination-arrow"
        onClick={() => onChange(page + 1)}
        disabled={page === pageCount}
        aria-label="Next page"
      >
        →
      </button>
    </nav>
  )
}
