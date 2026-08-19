import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, ArrowRight } from 'lucide-react'
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
            <span className="cinematic-intro-line text-titanium">WE DON'T JUST</span>
          </div>
          <div className="cinematic-line-clip">
            <span className="cinematic-intro-line text-titanium">BUILD SOFTWARE.</span>
          </div>
          <div className="cinematic-line-clip">
            <span className="cinematic-intro-line cinematic-accent-text">
              WE ENGINEER WHAT'S NEXT.
            </span>
          </div>
        </h2>

        {/* Split Cards Grid */}
        <div className="cinematic-intro-grid">
          <div className="cinematic-intro-card">
            <div className="cinematic-card-glow" />
            <h3 className="cinematic-card-title font-display">Strategic Architecture</h3>
            <p className="cinematic-card-body">
              InspireZest Technologies operates at the intersection of high-octane engineering and
              cinematic visual craft. Based in Kollam, Kerala and Abu Dhabi, UAE, we build digital
              ecosystems for market category leaders.
            </p>
          </div>

          <div className="cinematic-intro-card">
            <div className="cinematic-card-glow cinematic-card-glow--purple" />
            <h3 className="cinematic-card-title font-display">Measurable Impact</h3>
            <p className="cinematic-card-body">
              Every system we deploy is optimized for extreme throughput, sub-second latency, and
              high conversion rates. No templates, no compromises — pure tailor-made digital
              excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
