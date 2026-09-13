import BookingBand from '../components/BookingBand'
import ContactSection from '../components/ContactSection'
import FaqSection from '../components/FaqSection'
import Marquee from '../components/Marquee'
import PageHeader from '../components/PageHeader'
import ServicesPanels from '../components/ServicesPanels'

export default function Services() {
  return (
    <>
      <PageHeader title="Services" crumb="Services" />
      <Marquee />

      <section className="mx-auto max-w-site px-6 py-20">
        <p className="flex items-center justify-center gap-3 text-sm font-semibold text-ink">
          <span className="h-px w-8 bg-primary" />
          Ma Spécialisation
        </p>

        <h2 className="mt-4 text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          <span className="text-primary">Services</span> & Expertise
        </h2>

        <div className="mt-14">
          <ServicesPanels />
        </div>
      </section>

      <Marquee />
      <BookingBand />
      <ContactSection />
      <FaqSection limit={4} />
      <Marquee />
    </>
  )
}
