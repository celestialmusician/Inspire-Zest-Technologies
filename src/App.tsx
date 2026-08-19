import { useState } from 'react'
import { useLenis } from '@/hooks/useLenis'
import CustomCursor from '@/components/CustomCursor'
import GlobalBackground from '@/components/GlobalBackground'
import Navigation from '@/components/Navigation'
import LoadingScreen from '@/components/LoadingScreen'
import PrismaHero from '@/components/PrismaHero'
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
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'

export default function App() {
  const [loaded, setLoaded] = useState(false)

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
    <>
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
        <FloatingWhatsApp />
        <ScrollToTop />


        <main id="main-content" tabIndex={-1}>
          <div id="hero">
            <PrismaHero />
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
    </>
  )
}

