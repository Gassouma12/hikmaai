/** Small 8-point star (khatim) ornament used in dividers, nodes and accents. */
export default function StarMotif({ size = 22, className, stroke = 'currentColor', strokeWidth = 1 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      aria-hidden="true"
    >
      <path d="M12 12 H36 V36 H12 Z" />
      <path d="M24 6 L42 24 L24 42 L6 24 Z" />
    </svg>
  )
}
