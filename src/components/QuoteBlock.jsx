import Reveal from './Reveal.jsx'
import StarMotif from './StarMotif.jsx'
import { QUOTE } from '../data/content.js'

export default function QuoteBlock() {
  return (
    <section className="quote">
      <div className="shell">
        <Reveal y={0}>
          <StarMotif size={30} className="quote-star" stroke="currentColor" strokeWidth={0.8} />
        </Reveal>
        <Reveal as="blockquote" className="quote-text">
          {QUOTE.parts.map((p, i) =>
            p.em ? (
              <span className="emphasis" key={i}>{p.t}</span>
            ) : (
              <span key={i}>{p.t}</span>
            ),
          )}
        </Reveal>
        <Reveal className="quote-attr" delay={0.15}>{QUOTE.attr}</Reveal>
      </div>
    </section>
  )
}
