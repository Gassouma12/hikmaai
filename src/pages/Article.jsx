import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import StarDivider from '../components/StarDivider.jsx'
import { ARTICLES } from '../data/content.js'

export default function Article() {
  const { id } = useParams()
  const article = useMemo(() => ARTICLES.find((a) => String(a.id) === String(id)), [id])

  if (!article) return <NotFound />

  // Reading-time estimate from total words (200 wpm). Falls back to the
  // article's stored readTime if present.
  const words = article.body.reduce((n, p) => n + p.split(/\s+/).length, 0)
  const readMinutes = article.readTime || `${Math.max(1, Math.round(words / 200))} min read`

  // Next article (wraps around) for the "Keep reading" card at the bottom.
  const idx = ARTICLES.findIndex((a) => a.id === article.id)
  const next = ARTICLES[(idx + 1) % ARTICLES.length]

  return (
    <PageTransition>
      <article className="article">
        {/* Hero */}
        <header className="article-hero shell">
          <Reveal immediate className="article-crumb">
            <Link to="/media" className="article-back">
              <span aria-hidden="true">←</span> Back to Voices
            </Link>
          </Reveal>

          <Reveal immediate>
            <span className="article-tag">{article.tag}</span>
          </Reveal>

          <Reveal immediate as="h1" className="article-title" delay={0.08}>
            {article.title}
          </Reveal>

          <Reveal immediate as="p" className="article-deck" delay={0.16}>
            {article.excerpt}
          </Reveal>

          <Reveal immediate className="article-byline" delay={0.22}>
            <div className="article-author">
              <div className="article-author-avatar" aria-hidden="true">
                {article.author.split(' ').map((w) => w[0]).slice(0, 2).join('')}
              </div>
              <div>
                <div className="article-author-name">{article.author}</div>
                <div className="article-author-role">{article.role}</div>
              </div>
            </div>
            <div className="article-meta">
              <span>{article.date}</span>
              <span className="article-meta-dot">·</span>
              <span>{readMinutes}</span>
            </div>
          </Reveal>
        </header>

        {/* Cover image, full-bleed up to ~1100px */}
        <div className="article-cover-wrap shell">
          <Reveal className="article-cover" y={20}>
            <img src={article.cover} alt="" />
          </Reveal>
        </div>

        {/* Body */}
        <div className="article-body shell">
          {article.body.map((p, i) => (
            <Reveal as="p" className="article-p" key={i} delay={0.04} y={18}>
              {p}
            </Reveal>
          ))}

          <StarDivider className="article-divider" />

          <Reveal className="article-signoff" y={12}>
            <span className="article-signoff-name">{article.author}</span>
            <span className="article-signoff-role">{article.role}</span>
          </Reveal>
        </div>

        {/* Keep reading */}
        <section className="article-next shell">
          <span className="article-next-kicker">Keep reading</span>
          <Link to={`/media/articles/${next.id}`} className="article-next-card">
            <div className="article-next-media">
              <img src={next.cover} alt="" loading="lazy" />
            </div>
            <div className="article-next-body">
              <span className="article-next-tag">{next.tag}</span>
              <h3 className="article-next-title">{next.title}</h3>
              <p className="article-next-excerpt">{next.excerpt}</p>
              <span className="article-next-cta">Continue <span aria-hidden="true">→</span></span>
            </div>
          </Link>
        </section>
      </article>
    </PageTransition>
  )
}

function NotFound() {
  return (
    <PageTransition>
      <div className="shell article-missing">
        <h1>Article not found</h1>
        <p>This piece may have been moved or unpublished.</p>
        <Link to="/media" className="article-back">← Back to Voices</Link>
      </div>
    </PageTransition>
  )
}
