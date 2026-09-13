import { Link } from 'react-router-dom'
import AboutMe from '../components/AboutMe'
import BlogTeaser from '../components/BlogTeaser'
import BookingBand from '../components/BookingBand'
import ContactSection from '../components/ContactSection'
import ExperienceSection from '../components/ExperienceSection'
import FaqSection from '../components/FaqSection'
import FeaturedProjects from '../components/FeaturedProjects'
import Hero from '../components/Hero'
import { Sparkle } from '../components/icons'
import JourneySection from '../components/JourneySection'
import Marquee from '../components/Marquee'
import PricingSection from '../components/PricingSection'
import ServicesPanels from '../components/ServicesPanels'
import ToolsSection from '../components/ToolsSection'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />

      <section className="mx-auto max-w-site px-6 py-20">
        <p className="flex items-center justify-center gap-3 text-sm font-semibold text-ink">
          <span className="h-px w-8 bg-primary" />
          Ma Spécialisation
        </p>

        <h2 className="mt-4 text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          <span className="text-primary">Services</span> & Expertise
          <Sparkle className="ml-2 inline-block size-4 -translate-y-3 text-ink" />
        </h2>

        <div className="mt-14">
          <ServicesPanels limit={4} />
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-block rounded-full border-2 border-ink px-8 py-3.5 font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
          >
            Voir tous les services
          </Link>
        </div>
      </section>

      <AboutMe withLink />
      <ToolsSection />
      <ExperienceSection />
      <FeaturedProjects />
      <JourneySection />
      <PricingSection />
      <BookingBand />
      <ContactSection />
      <BlogTeaser />
      <FaqSection limit={4} />
      <Marquee />
    </>
  )
}
