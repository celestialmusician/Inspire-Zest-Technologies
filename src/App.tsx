import { useState, useRef } from 'react'
import { useLenis } from '@/hooks/useLenis'
import { ThemeProvider } from '@/context/ThemeContext'
import CustomCursor from '@/components/CustomCursor'
import GlobalBackground from '@/components/GlobalBackground'
import Navigation from '@/components/Navigation'
import LoadingScreen from '@/components/LoadingScreen'
import PortalOpeningHero from '@/components/PortalOpeningHero'
import AccordionHero from '@/components/AccordionHero'
import Intro from '@/components/Intro'
import Services from '@/components/Services'
import TechnologyNetwork from '@/components/TechnologyNetwork'
import Projects from '@/components/Projects'
import About from '@/components/About'
import Process from '@/components/Process'
import Growth from '@/components/Growth'
import WhyUs from '@/components/WhyUs'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [showContact, setShowContact] = useState(false)

  // Initialize Lenis + ScrollTrigger sync
  useLenis()

  const handleLoad = () => {
    setLoaded(true)
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)
  }

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <ThemeProvider>
      {/* Site-wide interactive background canvas */}
      <GlobalBackground />

      {/* Grain overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Loading screen */}
      {!loaded && <LoadingScreen onComplete={handleLoad} />}

      {/* Main content */}
      <div
        id="app-root"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: loaded ? 'auto' : 'none',
        }}
      >
        <Navigation />
        <ScrollProgress />
        <FloatingWhatsApp />

        <main id="main-content" tabIndex={-1}>
          <PortalOpeningHero />
          <AccordionHero />
          <Intro />
          <Services />
          <TechnologyNetwork />
          <Projects />
          <About />
          <Process />
          <Growth />
          <WhyUs />
          <Testimonials />
          <FAQ />
          <FinalCTA onContact={scrollToContact} />
          <Contact />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  )
}
