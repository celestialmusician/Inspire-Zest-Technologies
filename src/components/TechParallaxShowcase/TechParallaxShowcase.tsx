import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles } from 'lucide-react'
import './TechParallaxShowcase.css'

gsap.registerPlugin(ScrollTrigger)

export default function TechParallaxShowcase() {
  const containerRef = useRef<HTMLElement>(null)
  const windowRef    = useRef<HTMLDivElement>(null)
  const imageRef     = useRef<HTMLImageElement>(null)
  const textGroupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const windowEl = windowRef.current
    const image = imageRef.current
    const textGroup = textGroupRef.current
    if (!container || !image || !windowEl) return

    const ctx = gsap.context(() => {
      // 1. Smooth background parallax
      gsap.fromTo(
        image,
        { yPercent: -14, scale: 1.15 },
        {
          yPercent: 14,
          scale: 1.02,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },

        }
      )

      // 2. Kinetic Split-Text & Typography Reveal
      if (textGroup) {
        gsap.fromTo(
          textGroup.querySelectorAll('.parallax-reveal'),
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.14,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="tech-parallax-showcase"
      className="tech-parallax-section"
      aria-label="High Performance Digital Architecture Showcase"
    >
      {/* Background Parallax Window */}
      <div ref={windowRef} className="tech-parallax-window">
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2400&auto=format&fit=crop"
          alt="Quantum Microarchitecture & Robotics"
          className="tech-parallax-img"
          loading="lazy"
          decoding="async"
        />
        <div className="tech-parallax-overlay" aria-hidden="true" />
      </div>

      {/* Centered Keynote Typography */}
      <div className="tech-parallax-content">
        <div ref={textGroupRef} className="tech-parallax-text-box">
          <div className="tech-badge parallax-reveal">
            <Sparkles size={14} className="text-cyan-400" />
            <span>ENGINEERING EXCELLENCE</span>
          </div>

          <h2 className="tech-parallax-title font-display parallax-reveal">
            ENGINEERED AT THE <br />
            <span className="tech-parallax-gradient">SPEED OF LIGHT</span>
          </h2>

          <p className="tech-parallax-desc parallax-reveal">
            From distributed cloud microservices to intelligent web and mobile systems, our software engines are built to deliver flawless performance at global scale.
          </p>
        </div>
      </div>
    </section>
  )
}

