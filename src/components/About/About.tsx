import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Target, Globe, Cpu } from 'lucide-react'
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
        { yPercent: 120, rotateX: -25, opacity: 0 },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
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
        { opacity: 0, y: 35, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="about-section scene" aria-label="About InspireZest Technologies">
      <div className="about-container">
        {/* Header */}
        <h2 className="about-headline font-display">
          <div className="about-wrap">
            <span className="about-line text-titanium">THE BEST IT</span>
          </div>
          <div className="about-wrap">
            <span className="about-line about-title-highlight">SOLUTIONS COMPANY</span>
          </div>
        </h2>

        {/* 3-Card Grid */}
        <div className="about-grid">
          {/* Card 1: Our Mission */}
          <div className="about-card">
            <div className="about-icon-wrap">
              <Target size={22} className="text-cyan-400" />
            </div>
            <h3 className="about-card-title font-display">Our Mission</h3>
            <p className="about-card-desc">
              At Inspirezest Technologies, our mission is to be the catalyst for your business success. We strive to provide the best-in-class software solutions that not only meet but exceed your expectations, delivering cutting-edge technologies and fostering growth.
            </p>
          </div>

          {/* Card 2: Our Vision */}
          <div className="about-card">
            <div className="about-icon-wrap">
              <Cpu size={22} className="text-purple-400" />
            </div>
            <h3 className="about-card-title font-display">Our Vision</h3>
            <p className="about-card-desc">
              Our vision at InspireZest is to be the catalyst for positive change in the business landscape, driving innovation and transformation. We aspire to be recognized globally as a trusted partner, renowned for our creativity, expertise, and dedication.
            </p>
          </div>

          {/* Card 3: Global Presence */}
          <div className="about-card">
            <div className="about-icon-wrap">
              <Globe size={22} className="text-emerald-400" />
            </div>
            <h3 className="about-card-title font-display">Global Presence</h3>
            <p className="about-card-desc">
              Operating from dual hubs — <strong>2nd Floor, Velayudha Mansion, SN College Junction, Kollam, Kerala, India</strong> and <strong>M26, Mussafah, Abu Dhabi, UAE</strong> — serving clients across diverse industries worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}


