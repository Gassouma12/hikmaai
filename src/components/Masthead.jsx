import Reveal from './Reveal.jsx'

/**
 * Editorial section header. Renders an index numeral + bilingual kicker,
 * a large serif title, and an optional lede. Used at the top of pages and
 * major sections to give the site a consistent "indexed manuscript" rhythm.
 */
export default function Masthead({
  index,
  arabic,
  kicker,
  title,
  lede,
  align = 'left',
  immediate = false,
  className = '',
}) {
  return (
    <header className={`masthead masthead--${align} ${className}`}>
      <Reveal immediate={immediate} className="masthead-meta">
        {index && <span className="masthead-index">{index}</span>}
        <span className="masthead-rule" />
        <span className="masthead-kicker">
          {arabic && <span className="masthead-arabic">{arabic}</span>}
          {kicker}
        </span>
      </Reveal>

      <Reveal immediate={immediate} as="h1" className="masthead-title" delay={0.08}>
        {title}
      </Reveal>

      {lede && (
        <Reveal immediate={immediate} as="p" className="masthead-lede" delay={0.16}>
          {lede}
        </Reveal>
      )}
    </header>
  )
}
