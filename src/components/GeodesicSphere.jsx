/* Glowing wireframe "knowledge orb" — gold geodesic globe with teal-glowing
   nodes and a soft halo. The hero centrepiece, inspired by the reference.
   Decorative; hidden from assistive tech. */

const NODES = [
  { x: 30, y: 180 }, { x: 330, y: 180 },
  { x: 64, y: 180 }, { x: 296, y: 180 },
  { x: 105, y: 180 }, { x: 255, y: 180 },
  { x: 180, y: 180 },
  { x: 180, y: 30 }, { x: 180, y: 330 },
  { x: 92, y: 122 }, { x: 268, y: 122 },
  { x: 92, y: 238 }, { x: 268, y: 238 },
  { x: 132, y: 78 }, { x: 228, y: 78 },
  { x: 132, y: 282 }, { x: 228, y: 282 },
  { x: 150, y: 150 }, { x: 210, y: 210 },
]

export default function GeodesicSphere() {
  return (
    <div className="orb" aria-hidden="true">
      <span className="orb-halo" />
      <svg className="orb-svg" viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="orbWire" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#a8862a" />
          </linearGradient>
        </defs>

        <g className="orb-wire" fill="none" stroke="url(#orbWire)" strokeWidth="1">
          {/* sphere outline + meridians (longitude) */}
          <circle cx="180" cy="180" r="150" strokeWidth="1.4" />
          <ellipse cx="180" cy="180" rx="116" ry="150" />
          <ellipse cx="180" cy="180" rx="75" ry="150" />
          <ellipse cx="180" cy="180" rx="30" ry="150" />
          <line x1="180" y1="30" x2="180" y2="330" />
          {/* latitudes (flattened ellipses for perspective) */}
          <ellipse cx="180" cy="180" rx="150" ry="26" />
          <ellipse cx="180" cy="122" rx="139" ry="19" />
          <ellipse cx="180" cy="238" rx="139" ry="19" />
          <ellipse cx="180" cy="78" rx="112" ry="13" />
          <ellipse cx="180" cy="282" rx="112" ry="13" />
          <ellipse cx="180" cy="48" rx="66" ry="8" />
          <ellipse cx="180" cy="312" rx="66" ry="8" />
          {/* a few chords to suggest geodesic triangulation */}
          <line x1="92" y1="122" x2="180" y2="180" opacity="0.5" />
          <line x1="268" y1="238" x2="180" y2="180" opacity="0.5" />
          <line x1="132" y1="78" x2="228" y2="282" opacity="0.35" />
        </g>

        <g className="orb-nodes">
          {NODES.map((n, i) => (
            <circle
              key={i}
              className="orb-node"
              cx={n.x}
              cy={n.y}
              r="3.4"
              style={{ animationDelay: `${(i % 7) * 0.45}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
