import { useState } from 'react'
import { useLenis } from '@/hooks/useLenis'
import { useGlobalScrollOrchestration } from '@/hooks/useGlobalScrollOrchestration'
import { ThemeProvider } from '@/context/ThemeContext'
import CustomCursor from '@/components/CustomCursor'
import GlobalBackground from '@/components/GlobalBackground'
import Navigation from '@/components/Navigation'
import LoadingScreen from '@/components/LoadingScreen'
import PortalOpeningHero from '@/components/PortalOpeningHero'
import TechParallaxShowcase from '@/components/TechParallaxShowcase'
import Growth from '@/components/Growth'
import Intro from '@/components/Intro'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import TechnologyNetwork from '@/components/TechnologyNetwork'
import About from '@/components/About'
import Process from '@/components/Process'
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

  // Initialize Lenis camera-dolly smooth scroll physics
  useLenis()

  // Initialize site-wide 3D perspective scroll orchestration
  useGlobalScrollOrchestration(loaded)

  const handleLoad = () => {
    setLoaded(true)
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)
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
          <div id="hero">
            <PortalOpeningHero />
          </div>
          <TechParallaxShowcase />
          <Growth />
          <Intro />
          <Services />
          <Projects />
          <TechnologyNetwork />
          <About />
          <Process />
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
