const BLOB =
  'M595.3,300.0 C595.2,325.4 590.9,351.7 584.0,376.1 C577.0,400.5 566.7,425.0 553.3,446.3 C540.0,467.6 522.7,487.7 503.8,503.8 C485.0,519.9 462.3,532.7 440.2,542.8 C418.0,553.0 394.3,559.5 370.9,564.7 C347.6,569.8 323.8,573.3 300.0,573.8 C276.2,574.3 251.4,573.4 228.3,567.7 C205.1,562.1 181.6,552.6 161.3,540.2 C141.1,527.7 123.0,510.5 106.9,493.1 C90.9,475.6 77.7,455.7 65.2,435.5 C52.8,415.3 41.1,394.4 32.0,371.8 C23.0,349.2 14.2,324.8 11.0,300.0 C7.8,275.2 7.7,247.9 12.8,223.0 C17.8,198.2 28.3,172.7 41.4,150.7 C54.5,128.7 72.2,108.2 91.1,91.1 C110.0,74.1 132.1,59.0 154.7,48.4 C177.4,37.8 202.7,30.4 226.9,27.3 C251.1,24.3 276.6,26.4 300.0,30.1 C323.4,33.7 345.5,41.8 367.2,49.4 C388.8,56.9 409.0,65.4 429.8,75.2 C450.6,85.0 472.2,94.5 491.9,108.1 C511.5,121.8 532.3,137.7 547.7,157.0 C563.1,176.3 576.3,200.0 584.3,223.8 C592.2,247.7 595.3,274.6 595.3,300.0 Z'

const CONTOURS = [0.3, 0.55, 0.78, 0.93]

export default function HeroBlob({ className = '' }) {
  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden="true">
      <defs>
        <clipPath id="hero-blob-clip">
          <path d={BLOB} />
        </clipPath>
        <filter
          id="hero-blob-waves"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves="2"
            seed="8"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="38"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      <g clipPath="url(#hero-blob-clip)">
        <path d={BLOB} fill="#fe4619" />
        <g
          filter="url(#hero-blob-waves)"
          fill="none"
          stroke="#d93810"
          strokeWidth="2.5"
          opacity="0.35"
        >
          {CONTOURS.map((scale) => (
            <path
              key={scale}
              d={BLOB}
              transform={`translate(300 300) scale(${scale}) translate(-300 -300)`}
            />
          ))}
        </g>
      </g>
    </svg>
  )
}
