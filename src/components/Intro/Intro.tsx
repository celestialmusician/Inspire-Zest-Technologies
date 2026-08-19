import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Intro.css'

gsap.registerPlugin(ScrollTrigger)

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Cinematic 3D split line reveal
      gsap.fromTo(
        '.cinematic-intro-line',
        { yPercent: 120, rotateX: -30, opacity: 0 },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.cinematic-intro-heading',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.cinematic-intro-card',
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cinematic-intro-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="intro"
      className="cinematic-intro-section"
      aria-label="Who We Are"
    >
      <div ref={containerRef} className="cinematic-intro-container">
        {/* Cinematic Headline */}
        <h2 className="cinematic-intro-heading font-display">
          <div className="cinematic-line-clip">
            <span className="cinematic-intro-line text-titanium">WE HELP TEAMS</span>
          </div>
          <div className="cinematic-line-clip">
            <span className="cinematic-intro-line text-titanium">BUILD THE BUSINESS</span>
          </div>
          <div className="cinematic-line-clip">
            <span className="cinematic-intro-line cinematic-accent-text">
              OF THEIR DREAMS.
            </span>
          </div>
        </h2>

        {/* Split Cards Grid */}
        <div className="cinematic-intro-grid">
          <div className="cinematic-intro-card">
            <div className="cinematic-card-glow" />
            <h3 className="cinematic-card-title font-display">Premier Software Company</h3>
            <p className="cinematic-card-body">
              InspireZest Technologies Pvt. Ltd. is your gateway to innovative and cutting-edge
              software solutions. As a premier software development company based in Kollam, Kerala,
              we take pride in being recognized as the best software company in the region, serving
              clients across India and the Middle East.
            </p>
          </div>

          <div className="cinematic-intro-card">
            <div className="cinematic-card-glow cinematic-card-glow--purple" />
            <h3 className="cinematic-card-title font-display">Excellence & Innovation</h3>
            <p className="cinematic-card-body">
              Our unwavering commitment to excellence, innovation, and customer satisfaction has
              positioned us as a trusted partner for businesses seeking reliable and impactful
              software solutions. We dedicate ourselves to your success with all our resources,
              crafting solutions with utmost perfection.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
