import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import { ArrowRight, MessageCircle } from 'lucide-react'

export default function CtaSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cobalt to-blue-700 dark:from-cobalt dark:to-dark-deep" />
          <div className="absolute inset-0 opacity-10">
            <svg viewBox="0 0 800 400" className="w-full h-full">
              <circle cx="100" cy="50" r="200" fill="white" opacity="0.05" />
              <circle cx="700" cy="350" r="250" fill="white" opacity="0.03" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative px-8 py-16 lg:px-16 lg:py-20 text-center text-white">
            <h2 className="text-3xl lg:text-5xl font-extrabold mb-4">
              Prêt à collaborer ?
            </h2>
            <p className="text-lg text-white/70 italic mb-10 max-w-xl mx-auto">
              Que ce soit pour un projet freelance ou simplement échanger sur la tech, je suis là.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/about">
                <Button
                  variant="cta"
                  className="text-base px-8 py-4"
                >
                  En savoir plus
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href="mailto:oktav@example.com">
                <Button
                  className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20 hover:-translate-y-0.5 text-base px-8 py-4"
                >
                  Me contacter
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
