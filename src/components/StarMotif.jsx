import starImg from '../images/star.png'

/**
 * 8-point khatim star ornament. Used in dividers, timeline nodes, the quote
 * accent, the footer badge, etc. Renders the bundled star.png. Keeps the same
 * `size` / `className` props the old SVG version exposed so every existing
 * caller works without a change. (`stroke`/`strokeWidth` are accepted but
 * ignored — the PNG carries its own colour.)
 */
export default function StarMotif({ size = 22, className = '', stroke, strokeWidth }) {
  return (
    <img
      src={starImg}
      className={`star-img ${className}`}
      style={{ width: size, height: size }}
      alt=""
      aria-hidden="true"
      draggable="false"
    />
  )
}
