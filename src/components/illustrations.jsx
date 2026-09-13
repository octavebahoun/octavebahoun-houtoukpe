function Dots({ id }) {
  return (
    <>
      <defs>
        <pattern id={id} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#242424" />
        </pattern>
      </defs>
      <rect width="520" height="300" fill={`url(#${id})`} />
    </>
  )
}

export function NeuralIllustration() {
  const layers = [
    { x: 90, ys: [90, 150, 210] },
    { x: 260, ys: [60, 120, 180, 240] },
    { x: 430, ys: [90, 150, 210] },
  ]

  const links = []
  for (let l = 0; l < layers.length - 1; l += 1) {
    for (const y1 of layers[l].ys) {
      for (const y2 of layers[l + 1].ys) {
        links.push([layers[l].x, y1, layers[l + 1].x, y2])
      }
    }
  }
  const activeLinks = [2, 5, 9, 14]

  return (
    <svg viewBox="0 0 520 300" className="w-full" aria-hidden="true">
      <Dots id="dots-neural" />

      {links.map(([x1, y1, x2, y2], index) => {
        const active = activeLinks.includes(index)
        return (
          <line
            key={`${x1}-${y1}-${x2}-${y2}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={active ? '#fe4619' : '#2e2e2e'}
            strokeWidth={active ? 2.5 : 1.5}
            strokeLinecap="round"
            strokeDasharray={active ? '3 13' : undefined}
            className={active ? 'animate-dash' : undefined}
          />
        )
      })}

      {layers.map((layer, layerIndex) =>
        layer.ys.map((y, nodeIndex) => (
          <g key={`${layer.x}-${y}`}>
            <circle
              cx={layer.x}
              cy={y}
              r="15"
              fill="#fe4619"
              className="animate-node"
              style={{ animationDelay: `${(layerIndex + nodeIndex) * 0.35}s` }}
            />
            <circle cx={layer.x} cy={y} r="10" fill="#161616" stroke="#333" />
          </g>
        )),
      )}
    </svg>
  )
}

export function LlmIllustration() {
  const lines = [200, 140, 230, 180, 110]

  return (
    <svg viewBox="0 0 520 300" className="w-full" aria-hidden="true">
      <Dots id="dots-llm" />

      <rect x="30" y="46" width="290" height="208" rx="16" fill="#111" stroke="#2a2a2a" />
      <circle cx="56" cy="72" r="5" fill="#fe4619" />
      <circle cx="74" cy="72" r="5" fill="#3a3a3a" />
      <circle cx="92" cy="72" r="5" fill="#3a3a3a" />
      <line x1="30" y1="92" x2="320" y2="92" stroke="#2a2a2a" />

      {lines.map((width, index) => (
        <rect
          key={width}
          x="52"
          y={116 + index * 26}
          width={width}
          height="10"
          rx="5"
          fill={index === 1 ? '#fe4619' : '#2e2e2e'}
          className="animate-fade-line"
          style={{ animationDelay: `${index * 0.25}s` }}
        />
      ))}
      <rect x="52" y="246" width="10" height="14" rx="2" fill="#fe4619" className="animate-blink" />

      <path
        d="M320,150 H370"
        fill="none"
        stroke="#fe4619"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="3 13"
        className="animate-dash"
      />

      <rect x="370" y="86" width="120" height="128" rx="14" fill="#161616" stroke="#2e2e2e" />
      <rect x="388" y="106" width="60" height="9" rx="4" fill="#fe4619" />
      <rect x="388" y="126" width="84" height="8" rx="4" fill="#2e2e2e" />
      <rect x="388" y="144" width="70" height="8" rx="4" fill="#2e2e2e" />
      <rect x="388" y="162" width="84" height="8" rx="4" fill="#2e2e2e" />
      <rect x="388" y="180" width="48" height="8" rx="4" fill="#2e2e2e" />
    </svg>
  )
}

export function RagIllustration() {
  const vectors = Array.from({ length: 26 }, (_, index) => ({
    x: 300 + (index % 7) * 28 + ((index * 37) % 13),
    y: 62 + Math.floor(index / 7) * 44 + ((index * 53) % 17),
  }))
  const query = { x: 350, y: 152 }
  const nearest = vectors
    .map((vector) => ({
      ...vector,
      distance: (vector.x - query.x) ** 2 + (vector.y - query.y) ** 2,
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3)

  return (
    <svg viewBox="0 0 520 300" className="w-full" aria-hidden="true">
      <Dots id="dots-rag" />

      {[0, 1, 2].map((index) => (
        <g key={index}>
          <rect
            x={40 + index * 6}
            y={92 + index * 44}
            width="120"
            height="38"
            rx="10"
            fill="#161616"
            stroke="#2e2e2e"
          />
          <rect x={54 + index * 6} y={106 + index * 44} width="60" height="8" rx="4" fill="#fe4619" />
          <rect x={54 + index * 6} y={120 + index * 44} width="86" height="6" rx="3" fill="#2e2e2e" />
        </g>
      ))}

      <path
        d="M196,150 H258"
        fill="none"
        stroke="#fe4619"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="3 13"
        className="animate-dash"
      />

      {vectors.map((vector) => (
        <circle key={`${vector.x}-${vector.y}`} cx={vector.x} cy={vector.y} r="4" fill="#2e2e2e" />
      ))}

      {nearest.map((vector) => (
        <line
          key={`n-${vector.x}-${vector.y}`}
          x1={query.x}
          y1={query.y}
          x2={vector.x}
          y2={vector.y}
          stroke="#fe4619"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="3 13"
          className="animate-dash"
        />
      ))}

      {nearest.map((vector) => (
        <circle key={`p-${vector.x}-${vector.y}`} cx={vector.x} cy={vector.y} r="5" fill="#fe4619" />
      ))}

      <circle
        cx={query.x}
        cy={query.y}
        r="16"
        fill="#fe4619"
        className="animate-node"
      />
      <circle cx={query.x} cy={query.y} r="8" fill="#fe4619" />
    </svg>
  )
}

export function DataIllustration() {
  const bars = [40, 70, 55, 95, 75, 120, 100]

  return (
    <svg viewBox="0 0 520 300" className="w-full" aria-hidden="true">
      <Dots id="dots-data" />

      <line x1="60" y1="250" x2="470" y2="250" stroke="#2e2e2e" />
      <line x1="60" y1="60" x2="60" y2="250" stroke="#2e2e2e" />

      {[100, 150, 200].map((y) => (
        <line key={y} x1="60" y1={y} x2="470" y2={y} stroke="#1f1f1f" strokeDasharray="4 8" />
      ))}

      {bars.map((height, index) => (
        <rect
          key={height + index}
          x={86 + index * 52}
          y={250 - height}
          width="30"
          height={height}
          rx="6"
          fill={index === 5 ? '#fe4619' : '#262626'}
          className="animate-bar"
          style={{
            animationDelay: `${index * 0.12}s`,
            transformBox: 'fill-box',
            transformOrigin: 'bottom',
          }}
        />
      ))}

      <path
        d="M86,214 C140,206 180,188 240,178 C300,168 340,138 400,118"
        fill="none"
        stroke="#fe4619"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="420"
        strokeDashoffset="420"
        className="animate-draw"
      />
    </svg>
  )
}

export function DevopsIllustration() {
  const steps = ['Code', 'Build', 'Test', 'Deploy']

  return (
    <svg viewBox="0 0 520 300" className="w-full" aria-hidden="true">
      <Dots id="dots-devops" />

      <path d="M90,140 H430" fill="none" stroke="#333" strokeWidth="2" />
      <path
        d="M90,140 H430"
        fill="none"
        stroke="#fe4619"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="3 13"
        className="animate-dash"
      />

      <circle r="6" fill="#fe4619">
        <animateMotion dur="4s" repeatCount="indefinite" path="M90,140 H430" />
      </circle>

      {steps.map((step, index) => (
        <g key={step}>
          <rect
            x={90 + index * 113 - 45}
            y="100"
            width="90"
            height="80"
            rx="14"
            fill="#161616"
            stroke="#2e2e2e"
          />
          <circle
            cx={90 + index * 113}
            cy="126"
            r="6"
            fill="#fe4619"
            className="animate-node"
            style={{ animationDelay: `${index * 0.4}s` }}
          />
          <text
            x={90 + index * 113}
            y="160"
            fill="#ffffff"
            fontSize="13"
            fontWeight="600"
            textAnchor="middle"
          >
            {step}
          </text>
        </g>
      ))}

      <g>
        <rect x="330" y="222" width="58" height="26" rx="13" fill="#1c1c1c" stroke="#2e2e2e" />
        <text x="359" y="239" fill="#9a9a9a" fontSize="12" fontWeight="600" textAnchor="middle">
          AWS
        </text>
        <rect x="398" y="222" width="92" height="26" rx="13" fill="#1c1c1c" stroke="#2e2e2e" />
        <text x="444" y="239" fill="#9a9a9a" fontSize="12" fontWeight="600" textAnchor="middle">
          Cloudflare
        </text>
      </g>
    </svg>
  )
}

export function DevWebIllustration() {
  const blocks = [140, 120, 150, 96]

  return (
    <svg viewBox="0 0 520 300" className="w-full" aria-hidden="true">
      <Dots id="dots-devweb" />

      <rect x="40" y="46" width="330" height="208" rx="16" fill="#111" stroke="#2a2a2a" />
      <circle cx="66" cy="72" r="5" fill="#fe4619" />
      <circle cx="84" cy="72" r="5" fill="#3a3a3a" />
      <circle cx="102" cy="72" r="5" fill="#3a3a3a" />
      <rect x="150" y="66" width="196" height="12" rx="6" fill="#1c1c1c" />
      <line x1="40" y1="92" x2="370" y2="92" stroke="#2a2a2a" />

      <rect x="64" y="112" width="120" height="14" rx="6" fill="#fe4619" className="animate-fade-line" />
      <rect
        x="64"
        y="136"
        width="220"
        height="8"
        rx="4"
        fill="#2e2e2e"
        className="animate-fade-line"
        style={{ animationDelay: '0.12s' }}
      />

      {blocks.map((width, index) => (
        <rect
          key={width + index}
          x={64 + (index % 2) * 150}
          y={166 + Math.floor(index / 2) * 42}
          width={width}
          height="30"
          rx="8"
          fill="#161616"
          stroke="#2e2e2e"
          className="animate-fade-line"
          style={{ animationDelay: `${0.24 + index * 0.12}s` }}
        />
      ))}

      <rect x="398" y="70" width="82" height="160" rx="16" fill="#161616" stroke="#2e2e2e" />
      <rect
        x="410"
        y="86"
        width="58"
        height="10"
        rx="5"
        fill="#fe4619"
        className="animate-fade-line"
        style={{ animationDelay: '0.4s' }}
      />
      <rect x="410" y="104" width="58" height="7" rx="3" fill="#2e2e2e" />
      <rect x="410" y="120" width="42" height="7" rx="3" fill="#2e2e2e" />
      <rect x="410" y="150" width="58" height="34" rx="8" fill="#111" stroke="#2e2e2e" />
      <rect x="422" y="200" width="34" height="8" rx="4" fill="#fe4619" className="animate-blink" />
    </svg>
  )
}

export function SaasIllustration() {
  const bars = [40, 60, 48, 72, 54]

  return (
    <svg viewBox="0 0 520 300" className="w-full" aria-hidden="true">
      <Dots id="dots-saas" />

      <rect x="40" y="46" width="440" height="208" rx="16" fill="#111" stroke="#2a2a2a" />
      <line x1="150" y1="46" x2="150" y2="254" stroke="#2a2a2a" />

      <rect x="64" y="74" width="62" height="10" rx="5" fill="#fe4619" />
      <rect x="64" y="98" width="62" height="8" rx="4" fill="#2e2e2e" />
      <rect x="64" y="116" width="48" height="8" rx="4" fill="#2e2e2e" />
      <rect x="64" y="134" width="56" height="8" rx="4" fill="#2e2e2e" />

      {[0, 1, 2].map((index) => (
        <g key={index}>
          <rect x={172 + index * 100} y="72" width="86" height="52" rx="10" fill="#161616" stroke="#2e2e2e" />
          <rect
            x={186 + index * 100}
            y="86"
            width={index === 1 ? 40 : 28}
            height="9"
            rx="4"
            fill={index === 1 ? '#fe4619' : '#2e2e2e'}
            className="animate-fade-line"
            style={{ animationDelay: `${index * 0.15}s` }}
          />
          <rect x={186 + index * 100} y="102" width="54" height="7" rx="3" fill="#2e2e2e" />
        </g>
      ))}

      <rect x="172" y="140" width="286" height="94" rx="10" fill="#161616" stroke="#2e2e2e" />

      {bars.map((height, index) => (
        <rect
          key={height + index}
          x={190 + index * 40}
          y={226 - height}
          width="22"
          height={height}
          rx="5"
          fill={index === 3 ? '#fe4619' : '#262626'}
          className="animate-bar"
          style={{
            animationDelay: `${index * 0.12}s`,
            transformBox: 'fill-box',
            transformOrigin: 'bottom',
          }}
        />
      ))}

      <path
        d="M190,200 C230,194 250,176 290,170 C330,164 360,156 430,150"
        fill="none"
        stroke="#fe4619"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="360"
        strokeDashoffset="360"
        className="animate-draw"
      />
    </svg>
  )
}
