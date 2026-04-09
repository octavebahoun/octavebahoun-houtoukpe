import HeroSection from '../features/home/HeroSection'
import SelectedWork from '../features/home/SelectedWork'
import OceanStack from '../features/home/OceanStack'
import CtaSection from '../features/home/CtaSection'

export default function Home() {
  return (
    <div className="bg-ivory dark:bg-dark-deep">
      <HeroSection />
      <SelectedWork />
      <OceanStack />
      <CtaSection />
    </div>
  )
}
