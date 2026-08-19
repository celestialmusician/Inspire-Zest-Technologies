import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, Globe, Target, Cpu } from 'lucide-react'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-line',
        { yPercent: 120, rotateX: -30, opacity: 0 },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.about-headline',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.about-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="about-section" aria-label="About InspireZest">
      <div className="about-container">
        <div className="about-tag" aria-hidden="true">
          <Sparkles size={13} className="text-cyan-400" />
          <span>06 — FOUNDATION</span>
        </div>

        <h2 className="about-headline font-display">
          <div className="about-wrap">
            <span className="about-line text-titanium">BORN TO ARCHITECT</span>
          </div>
          <div className="about-wrap">
            <span className="about-line text-titanium">THE DIGITAL FUTURE</span>
          </div>
        </h2>

        <div className="about-grid">
          <div className="about-card">
            <div className="about-icon-wrap">
              <Target size={22} className="text-cyan-400" />
            </div>
            <h3 className="about-card-title font-display">Our Purpose</h3>
            <p className="about-card-desc">
              We empower ambitious enterprises to dominate digital-first landscapes. Through
              meticulous engineering, ultra-fast load times, and spatial aesthetic direction, we
              transform complex visions into category-defining reality.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon-wrap">
              <Cpu size={22} className="text-purple-400" />
            </div>
            <h3 className="about-card-title font-display">Our Approach</h3>
            <p className="about-card-desc">
              Zero shortcuts. Every line of code, motion tween, and backend service is crafted for
              maximum resilience, security, and scalability. We treat web and app design as high art
              backed by deep computer science.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon-wrap">
              <Globe size={22} className="text-emerald-400" />
            </div>
            <h3 className="about-card-title font-display">Global Presence</h3>
            <p className="about-card-desc">
              Operating from dual tech hubs in <strong>Kollam, Kerala (India)</strong> and{' '}
              <strong>Abu Dhabi (UAE)</strong>, serving international clientele across eCommerce,
              hospitality, healthcare, and enterprise fintech.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
