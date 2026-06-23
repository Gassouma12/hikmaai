import StarMotif from './StarMotif.jsx'

/** Horizontal ornamental rule with a centred star — a section separator. */
export default function StarDivider({ className = '' }) {
  return (
    <div className={`star-divider ${className}`} aria-hidden="true">
      <span className="rule" />
      <StarMotif size={16} className="star" />
      <span className="dot" />
      <StarMotif size={22} className="star star-mid" />
      <span className="dot" />
      <StarMotif size={16} className="star" />
      <span className="rule" />
    </div>
  )
}
