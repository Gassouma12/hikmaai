/**
 * Fixed, full-viewport Arabic geometric texture that sits behind the entire
 * app at very low opacity. Two interlocking layers:
 *  - a fine girih (8-point star) tessellation
 *  - a larger rotating khatim medallion grid
 * Purely decorative; hidden from assistive tech.
 */
export default function ArabicTexture() {
  return (
    <div className="arabic-texture" aria-hidden="true">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* ── Fine 8-point star tessellation ── */}
          <pattern id="girih" width="120" height="120" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="#dcd6c6" strokeWidth="0.8">
              {/* centre star (two overlapping squares) */}
              <path d="M36 36 L84 36 L84 84 L36 84 Z" />
              <path d="M60 24 L96 60 L60 96 L24 60 Z" />
              <rect x="51" y="51" width="18" height="18" transform="rotate(45 60 60)" />
              {/* corner stars — shared across tiles for a seamless field */}
              <path d="M-24 -24 L24 -24 L24 24 L-24 24 Z" />
              <path d="M0 -36 L36 0 L0 36 L-36 0 Z" />
              <path d="M96 -24 L144 -24 L144 24 L96 24 Z" />
              <path d="M120 -36 L156 0 L120 36 L84 0 Z" />
              <path d="M-24 96 L24 96 L24 144 L-24 144 Z" />
              <path d="M0 84 L36 120 L0 156 L-36 120 Z" />
              <path d="M96 96 L144 96 L144 144 L96 144 Z" />
              <path d="M120 84 L156 120 L120 156 L84 120 Z" />
            </g>
          </pattern>

          {/* ── Larger medallion lattice ── */}
          <pattern id="khatim" width="320" height="320" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="#dcd6c6" strokeWidth="0.7" transform="translate(160 160)">
              <circle r="92" />
              <circle r="60" />
              {Array.from({ length: 8 }).map((_, i) => {
                const a = (i * Math.PI) / 4
                const x = Math.cos(a) * 92
                const y = Math.sin(a) * 92
                return <line key={i} x1="0" y1="0" x2={x.toFixed(1)} y2={y.toFixed(1)} />
              })}
              {/* rotated squares forming a central khatim */}
              <rect x="-46" y="-46" width="92" height="92" />
              <rect x="-46" y="-46" width="92" height="92" transform="rotate(45)" />
            </g>
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#girih)" />
        <rect width="100%" height="100%" fill="url(#khatim)" opacity="0.5" />
      </svg>
    </div>
  )
}
