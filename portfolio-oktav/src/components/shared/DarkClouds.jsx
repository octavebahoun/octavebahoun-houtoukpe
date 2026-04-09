import { useState, useEffect } from 'react'
import { useStore } from '../../store/useStore'

export default function DarkClouds() {
  const { darkMode } = useStore()
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!darkMode) return
    const handleScroll = () => {
      setOffset({ x: window.scrollY * 0.02, y: window.scrollY * 0.01 })
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [darkMode])

  if (!darkMode) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top-left cloud */}
      <svg
        className="absolute -top-20 -left-20 w-96 h-96 text-cloud"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        viewBox="0 0 400 400"
        fill="currentColor"
        opacity="0.4"
      >
        <path d="M100 150 C100 100 150 50 200 60 C230 40 280 50 300 80 C340 70 380 100 370 140 C400 160 400 210 380 240 C400 270 380 320 340 330 C350 370 310 400 270 380 C240 410 180 400 160 370 C120 390 60 370 50 330 C10 340 -20 300 0 260 C-30 230 -20 170 20 150 C-10 120 10 70 60 60 C80 20 140 10 170 40 C160 10 120 -10 100 10 C90 30 70 20 80 50 C60 60 50 80 70 100 C50 120 40 140 100 150Z" />
      </svg>

      {/* Bottom-right cloud */}
      <svg
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] text-cloud"
        style={{ transform: `translate(${-offset.x * 1.5}px, ${-offset.y * 1.5}px)` }}
        viewBox="0 0 500 500"
        fill="currentColor"
        opacity="0.3"
      >
        <path d="M150 200 C150 130 210 70 280 80 C320 50 390 70 420 110 C470 100 520 140 510 190 C550 220 550 280 520 320 C550 360 520 420 460 430 C480 480 420 520 370 500 C330 540 250 520 230 480 C170 510 90 480 70 430 C20 440 -30 400 0 350 C-40 310 -30 230 30 210 C-10 170 20 100 90 90 C120 30 200 20 240 60 C220 20 160 -10 140 20 C120 50 90 40 110 70 C80 80 70 110 100 130 C70 160 60 190 150 200Z" />
      </svg>

      {/* Mid accent cloud */}
      <svg
        className="absolute top-1/2 -left-16 w-64 h-64 text-cloud"
        style={{ transform: `translate(${offset.x * 0.5}px, ${offset.y * 0.5}px)` }}
        viewBox="0 0 300 300"
        fill="currentColor"
        opacity="0.2"
      >
        <path d="M80 120 C80 80 120 40 170 50 C200 30 250 40 270 80 C310 70 350 110 340 150 C370 170 370 220 340 250 C370 280 340 330 290 340 C310 380 260 410 220 390 C190 420 130 410 110 370 C70 390 20 370 10 330 C-30 340 -70 300 -40 260 C-70 230 -60 170 -10 150 C-40 120 -10 60 60 50 C80 10 130 0 170 30 C150 0 100 -20 80 10 C70 30 50 20 70 50 C40 60 30 90 60 100 C30 130 20 150 80 120Z" />
      </svg>
    </div>
  )
}
