import { MARQUEE } from '../data/content.js'

export default function Marquee() {
  // Duplicated track for a seamless loop.
  const items = [...MARQUEE, ...MARQUEE]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span className="marquee-item" key={i}>{item}</span>
        ))}
      </div>
    </div>
  )
}
