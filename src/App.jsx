import { gsap } from 'gsap'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import QuickInfoBar from './components/QuickInfoBar/QuickInfoBar'
import AboutSection from './components/AboutSection/AboutSection'
import RoomsSection from './components/RoomsSection/RoomsSection'
import RestaurantSection from './components/RestaurantSection/RestaurantSection'
import LocationSection from './components/LocationSection/LocationSection'
import ReviewsSection from './components/ReviewsSection/ReviewsSection'
import Footer from './components/Footer/Footer'
import MobileNav from './components/MobileNav/MobileNav'

// Respect prefers-reduced-motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.globalTimeline.timeScale(20)
}

function App() {
  return (
    <div id="app">
      <Header />
      <Hero />
      <QuickInfoBar />
      <AboutSection />
      <RoomsSection />
      <RestaurantSection />
      <LocationSection />
      <ReviewsSection />
      <Footer />
      <MobileNav />
    </div>
  )
}

export default App
