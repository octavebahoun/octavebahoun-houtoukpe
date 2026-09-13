const nodes = [
  { x: 20, y: 122, label: 'Déclencheur' },
  { x: 200, y: 44, label: 'Agent IA' },
  { x: 200, y: 200, label: 'Outils / APIs' },
  { x: 380, y: 122, label: 'Réponse' },
]

const edges = [
  'M140,150 C170,150 170,72 200,72',
  'M140,150 C170,150 170,228 200,228',
  'M320,72 C350,72 350,150 380,150',
  'M320,228 C350,228 350,150 380,150',
]

export default function NodeGraph() {
  return (
    <svg viewBox="0 0 520 300" className="w-full" aria-hidden="true">
      <defs>
        <pattern id="node-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#242424" />
        </pattern>
      </defs>

      <rect width="520" height="300" fill="url(#node-dots)" />

      {edges.map((edge) => (
        <g key={edge}>
          <path d={edge} fill="none" stroke="#333" strokeWidth="2" />
          <path
            d={edge}
            fill="none"
            stroke="#fe4619"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="3 13"
            className="animate-dash"
          />
        </g>
      ))}

      {nodes.map((node, index) => (
        <g key={node.label}>
          <rect
            x={node.x - 6}
            y={node.y - 6}
            width="132"
            height="68"
            rx="16"
            fill="#fe4619"
            className="animate-node"
            style={{ animationDelay: `${index * 0.45}s` }}
          />
          <rect
            x={node.x}
            y={node.y}
            width="120"
            height="56"
            rx="12"
            fill="#161616"
            stroke="#2e2e2e"
          />
          <circle cx={node.x + 24} cy={node.y + 28} r="7" fill="#fe4619" />
          <text
            x={node.x + 42}
            y={node.y + 33}
            fill="#ffffff"
            fontSize="13"
            fontWeight="600"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
