import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import HeroImage from './HeroImage'

export default function HeroSection() {
  const [visible, setVisible] = useState(false)
  const [textStep, setTextStep] = useState(0)

  // Staggered text entrance
  useEffect(() => {
    setTimeout(() => setVisible(true), 200)
    const steps = [1, 2, 3, 4]
    steps.forEach((s, i) => {
      setTimeout(() => setTextStep(s), 400 + i * 300)
    })
  }, [])

  return (
    <section className="min-h-screen flex items-center pt-20 px-6 relative">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text left */}
          <div className={`space-y-6 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            {/* Tag */}
            <div className={`transition-all duration-500 delay-200 ${textStep >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-cobalt-light dark:bg-cloud text-cobalt text-sm font-mono font-medium">
                Fullstack × IA
              </span>
            </div>

            {/* Name */}
            <div className={`transition-all duration-500 delay-500 ${textStep >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                Oktav<br />
                <span className="text-cobalt">Bahoun</span>
              </h1>
            </div>

            {/* Subtitle */}
            <div className={`transition-all duration-500 delay-[800ms] ${textStep >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <p className="text-lg lg:text-xl text-text-sec dark:text-white/60 italic leading-relaxed max-w-md">
                Design & Architecture — Du code au cloud, de l'IA à la data. Portfolio de transition vers le futur.
              </p>
            </div>

            {/* CTA */}
            <div className={`transition-all duration-500 delay-[1100ms] ${textStep >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/projects">
                  <Button variant="primary">Voir mes projets</Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline">Me connaître</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Card photo right — diffusion noise animation */}
          <div className={`flex justify-center lg:justify-end transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <HeroImage />
          </div>
        </div>
      </div>
    </section>
  )
}
