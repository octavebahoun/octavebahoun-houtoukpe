import FaqSection from '../components/FaqSection'
import Marquee from '../components/Marquee'
import PageHeader from '../components/PageHeader'

export default function Faq() {
  return (
    <>
      <PageHeader title="FAQ" crumb="FAQ" />
      <Marquee />
      <FaqSection />
      <Marquee />
    </>
  )
}
