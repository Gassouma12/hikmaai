/* Faint flowing arabesque used at the hero edges, evoking Arabic calligraphy.
   `side` mirrors it for the opposite edge. Decorative only. */
export default function CalligraphyFlourish({ side = 'left', className = '' }) {
  return (
    <svg
      className={`calligraphy calligraphy--${side} ${className}`}
      viewBox="0 0 220 620"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <g strokeWidth="2.2" strokeLinecap="round">
        {/* main vine */}
        <path d="M150 -10 C70 70 180 150 110 230 C50 300 170 360 110 440 C60 510 160 560 120 630" opacity="0.9" />
        {/* secondary stroke */}
        <path d="M186 30 C120 110 200 180 150 260 C100 340 190 400 140 500" opacity="0.55" />
        {/* curls / offshoots */}
        <path d="M112 150 C90 140 78 158 92 172 C100 180 116 174 112 162" opacity="0.8" />
        <path d="M126 320 C150 312 162 332 146 346 C136 354 120 346 126 334" opacity="0.8" />
        <path d="M110 470 C86 462 74 482 90 496 C100 504 116 496 112 484" opacity="0.7" />
        {/* leaves / teardrops */}
        <path d="M150 90 C168 96 176 116 162 130 C150 118 146 104 150 90 Z" opacity="0.6" />
        <path d="M96 250 C78 256 70 276 84 290 C96 278 100 264 96 250 Z" opacity="0.6" />
        <path d="M150 380 C168 386 176 406 162 420 C150 408 146 394 150 380 Z" opacity="0.55" />
        {/* small accent dots */}
        <circle cx="120" cy="200" r="2.4" fill="currentColor" stroke="none" opacity="0.7" />
        <circle cx="150" cy="350" r="2.4" fill="currentColor" stroke="none" opacity="0.7" />
        <circle cx="118" cy="520" r="2.4" fill="currentColor" stroke="none" opacity="0.6" />
      </g>
    </svg>
  )
}
