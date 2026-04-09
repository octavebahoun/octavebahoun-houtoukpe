import { useState } from 'react'
import { useStore } from '../../store/useStore'

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useStore()
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    setIsAnimating(true)
    toggleDarkMode()
    setTimeout(() => setIsAnimating(false), 600)
  }

  return (
    <button
      onClick={handleClick}
      className="relative w-14 h-14 flex items-center justify-center rounded-full hover:bg-cobalt-light dark:hover:bg-cloud transition-colors duration-300 flex-shrink-0"
      aria-label="Toggle dark mode"
    >
      <svg
        viewBox="0 0 80 80"
        width="52"
        height="52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-transform duration-500 ${isAnimating ? 'scale-110' : 'scale-100'}`}
      >
        {/* ====== GLOW behind robot ====== */}
        <circle
          cx="40" cy="40" r="32"
          className="transition-all duration-500"
          fill={darkMode ? '#2563EB' : '#F59E0B'}
          opacity="0.1"
        />

        {/* ====== ANTENNA ====== */}
        <line x1="40" y1="12" x2="40" y2="22" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
        <circle
          cx="40" cy="10" r="3"
          className={`transition-all duration-500 ${darkMode ? 'opacity-30' : ''}`}
          fill={darkMode ? '#2563EB' : '#F59E0B'}
        >
          {!darkMode && (
            <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" />
          )}
        </circle>

        {/* ====== HEAD ====== */}
        <rect
          x="20" y="22" width="40" height="30" rx="8"
          fill="currentColor"
          className="transition-colors duration-500"
          stroke="#2563EB"
          strokeWidth="2"
        />

        {/* ====== EARS ====== */}
        <rect x="14" y="30" width="6" height="10" rx="3" fill="#2563EB" opacity="0.3" />
        <rect x="60" y="30" width="6" height="10" rx="3" fill="#2563EB" opacity="0.3" />

        {/* ====== EYES ====== */}
        {/* Left eye */}
        <g className="transition-all duration-300">
          {darkMode ? (
            <>
              {/* Closed eye left */}
              <path
                d="M28 36 Q31 40 34 36"
                stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round"
                fill="none"
              >
                <animate attributeName="d" values="M28 36 Q31 40 34 36;M28 36 Q31 40 34 36" dur="0.3s" fill="freeze" />
              </path>
            </>
          ) : (
            <>
              {/* Open eye left */}
              <ellipse cx="31" cy="36" rx="4" ry="4.5" fill="#2563EB" />
              <ellipse cx="31" cy="36" rx="2" ry="2.5" fill="white" opacity="0.8" />
              <circle cx="32.5" cy="34.5" r="1" fill="white" />
            </>
          )}
        </g>

        {/* Right eye */}
        <g className="transition-all duration-300">
          {darkMode ? (
            <>
              {/* Closed eye right */}
              <path
                d="M46 36 Q49 40 52 36"
                stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round"
                fill="none"
              />
            </>
          ) : (
            <>
              {/* Open eye right */}
              <ellipse cx="49" cy="36" rx="4" ry="4.5" fill="#2563EB" />
              <ellipse cx="49" cy="36" rx="2" ry="2.5" fill="white" opacity="0.8" />
              <circle cx="50.5" cy="34.5" r="1" fill="white" />
            </>
          )}
        </g>

        {/* ====== MOUTH ====== */}
        {darkMode ? (
          /* Sleeping: small "o" mouth */
          <ellipse cx="40" cy="45" rx="2" ry="1.5" fill="#2563EB" opacity="0.5" />
        ) : (
          /* Awake: smile */
          <path d="M34 45 Q40 50 46 45" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" fill="none" />
        )}

        {/* ====== BODY ====== */}
        <rect
          x="26" y="54" width="28" height="16" rx="6"
          fill="currentColor"
          className="transition-colors duration-500"
          stroke="#2563EB"
          strokeWidth="2"
          opacity="0.6"
        />

        {/* Body detail — chest light */}
        <circle
          cx="40" cy="62" r="3"
          className="transition-all duration-500"
          fill={darkMode ? '#1a2d42' : '#DBEAFE'}
          stroke="#2563EB"
          strokeWidth="1"
        >
          {!darkMode && (
            <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
          )}
        </circle>

        {/* ====== ZZZ (dark mode only) ====== */}
        <g className={`transition-opacity duration-500 ${darkMode ? 'opacity-100' : 'opacity-0'}`}>
          <text x="60" y="28" fontSize="10" fontWeight="800" fill="#2563EB" fontFamily="Inter, system-ui" opacity="0.8">
            Z
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite" />
          </text>
          <text x="66" y="20" fontSize="8" fontWeight="800" fill="#2563EB" fontFamily="Inter, system-ui" opacity="0.5">
            z
            <animate attributeName="opacity" values="0.5;0.2;0.5" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
          </text>
          <text x="70" y="14" fontSize="6" fontWeight="800" fill="#2563EB" fontFamily="Inter, system-ui" opacity="0.3">
            z
            <animate attributeName="opacity" values="0.3;0.1;0.3" dur="1.5s" begin="0.6s" repeatCount="indefinite" />
          </text>
        </g>

        {/* ====== STAR sparkles (light mode only) ====== */}
        <g className={`transition-opacity duration-500 ${darkMode ? 'opacity-0' : 'opacity-100'}`}>
          <path d="M62 22 L63 19 L64 22 L67 23 L64 24 L63 27 L62 24 L59 23 Z" fill="#F59E0B" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
          </path>
          <path d="M16 18 L16.5 16 L17 18 L19 18.5 L17 19 L16.5 21 L16 19 L14 18.5 Z" fill="#F59E0B" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
          </path>
        </g>
      </svg>
    </button>
  )
}
