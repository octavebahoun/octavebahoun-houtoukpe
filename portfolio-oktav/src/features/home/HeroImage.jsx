import { useEffect, useRef, useState } from 'react'

/**
 * Draws a stylized portrait on a canvas context
 */
function drawPortrait(ctx, w, h) {
  // Background gradient
  const bg = ctx.createLinearGradient(0, 0, w, h)
  bg.addColorStop(0, '#2563EB')
  bg.addColorStop(0.5, '#1e40af')
  bg.addColorStop(1, '#0d1b2a')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)

  // Decorative circles
  ctx.fillStyle = 'rgba(255,255,255,0.05)'
  ctx.beginPath()
  ctx.arc(w * 0.8, h * 0.15, w * 0.2, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(w * 0.15, h * 0.85, w * 0.25, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(w * 0.1, h * 0.12, w * 0.04, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(245,158,11,0.3)'
  ctx.fill()
  ctx.beginPath()
  ctx.arc(w * 0.88, h * 0.75, w * 0.03, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255,255,255,0.15)'
  ctx.fill()

  // Avatar circle
  const cx = w / 2
  const cy = h * 0.42
  const r = w * 0.22

  // Outer ring
  ctx.beginPath()
  ctx.arc(cx, cy, r + 10, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255,255,255,0.06)'
  ctx.fill()

  // Main circle
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255,255,255,0.1)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.15)'
  ctx.lineWidth = 2
  ctx.stroke()

  // Person silhouette
  ctx.fillStyle = 'rgba(255,255,255,0.25)'
  // Head
  ctx.beginPath()
  ctx.arc(cx, cy - r * 0.15, r * 0.35, 0, Math.PI * 2)
  ctx.fill()
  // Body
  ctx.beginPath()
  ctx.ellipse(cx, cy + r * 0.7, r * 0.5, r * 0.4, 0, Math.PI, 0, true)
  ctx.fill()

  // Name text
  ctx.fillStyle = 'rgba(255,255,255,0.9)'
  ctx.font = `bold ${w * 0.085}px Inter, system-ui, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('Oktav', cx, cy + r * 1.5)

  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  ctx.font = `${w * 0.055}px Inter, system-ui, sans-serif`
  ctx.fillText('Bahoun', cx, cy + r * 1.9)

  // Subtitle
  ctx.fillStyle = 'rgba(255,255,255,0.35)'
  ctx.font = `italic ${w * 0.045}px Inter, system-ui, sans-serif`
  ctx.fillText('Fullstack × IA', cx, cy + r * 2.35)

  // Dots animation indicator
  const dotsY = cy + r * 2.75
  for (let i = 0; i < 3; i++) {
    ctx.beginPath()
    ctx.arc(cx + (i - 1) * 16, dotsY, 3, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,255,255,${0.15 + i * 0.1})`
    ctx.fill()
  }
}

/**
 * HeroImage — Canvas-based diffusion noise animation
 * Starts with heavy gaussian noise, progressively reveals the portrait
 */
export default function HeroImage({ className = '' }) {
  const canvasRef = useRef(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const targetRef = useRef(null)

  // Pre-render target image to offscreen canvas
  useEffect(() => {
    const c = document.createElement('canvas')
    c.width = 640
    c.height = 800
    const ctx = c.getContext('2d')
    drawPortrait(ctx, 640, 800)
    targetRef.current = ctx.getImageData(0, 0, 640, 800)
  }, [])

  // Diffusion noise animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !targetRef.current) return

    const ctx = canvas.getContext('2d')
    const w = 640
    const h = 800
    canvas.width = w
    canvas.height = h

    let t = 1000
    const target = targetRef.current.data
    let animId = null

    const animate = () => {
      if (t <= 0) {
        const finalCanvas = document.createElement('canvas')
        finalCanvas.width = w
        finalCanvas.height = h
        const fCtx = finalCanvas.getContext('2d')
        fCtx.putImageData(targetRef.current, 0, 0)
        ctx.drawImage(finalCanvas, 0, 0, w, h)
        setIsRevealed(true)
        return
      }

      const imageData = ctx.createImageData(w, h)
      const data = imageData.data
      const progress = 1 - t / 1000
      const noiseIntensity = t * 1.2

      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * noiseIntensity
        const targetR = target[i]
        const targetG = target[i + 1]
        const targetB = target[i + 2]

        // Start with pure noise, progressively blend into target
        const noiseWeight = 1 - progress
        const targetWeight = progress

        // Add color tint to noise (blue dominant) so it looks intentional
        const noiseR = 37 + noise  // #2563EB red
        const noiseG = 99 + noise  // cobalt green
        const noiseB = 235 + noise // cobalt blue

        data[i]     = Math.min(255, Math.max(0, noiseR * noiseWeight + targetR * targetWeight))
        data[i + 1] = Math.min(255, Math.max(0, noiseG * noiseWeight + targetG * targetWeight))
        data[i + 2] = Math.min(255, Math.max(0, noiseB * noiseWeight + targetB * targetWeight))
        data[i + 3] = 255
      }

      ctx.putImageData(imageData, 0, 0)

      t -= 12

      if (t > 50) {
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'low'
      }

      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animId) cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div className={`relative ${className}`}>
      {/* Glow */}
      <div className="absolute -inset-4 bg-gradient-to-br from-cobalt/30 to-amber/30 rounded-3xl blur-2xl" />

      {/* Card */}
      <div className="relative w-72 lg:w-80 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-cobalt/10 bg-dark">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
          style={{
            imageRendering: isRevealed ? 'auto' : 'pixelated',
            transition: isRevealed ? 'image-rendering 0.5s ease' : 'none',
          }}
        />
      </div>

      {/* Floating badge */}
      <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-dark dark:bg-dark-deeper text-white rounded-xl shadow-lg text-xs font-mono border border-cobalt/20 flex items-center gap-2">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> Disponible freelance
      </div>
    </div>
  )
}
