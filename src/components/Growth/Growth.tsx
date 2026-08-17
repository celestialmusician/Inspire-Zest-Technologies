import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsap } from '@/hooks/useGsap'
import './Growth.css'

gsap.registerPlugin(ScrollTrigger)

const GROWTH_SERVICES = ['SEO', 'Google Ads', 'Social Media', 'Content Strategy', 'Performance Marketing']

export default function Growth() {
  const sectionRef = useRef<HTMLElement>(null)

  useGsap(() => {
    // Kinetic phrase reveal
    gsap.fromTo('.growth-phrase',
      { opacity: 0, y: 50, rotateX: -30, skewY: 2 },
      {
        opacity: 1, y: 0, rotateX: 0, skewY: 0,
        stagger: 0.18,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.growth-phrases',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    // Chart bars with elastic spring bounce
    gsap.fromTo('.growth-bar-fill',
      { scaleY: 0 },
      {
        scaleY: 1,
        stagger: 0.08,
        duration: 1.1,
        ease: 'back.out(2.2)',
        scrollTrigger: {
          trigger: '.growth-chart',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    // Service pills
    gsap.fromTo('.growth-svc',
      { opacity: 0, scale: 0.8, y: 15 },
      {
        opacity: 1, scale: 1, y: 0,
        stagger: 0.07,
        duration: 0.6,
        ease: 'back.out(1.8)',
        scrollTrigger: {
          trigger: '.growth-svcs',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    )
  }, [], sectionRef)

  return (
    <section
      ref={sectionRef}
      id="growth"
      className="growth scene"
      aria-label="Digital growth services"
    >
      <div className="growth-container">
        <div className="growth-header">
          <span className="growth-tag" aria-hidden="true">10 — DIGITAL GROWTH</span>
        </div>

        {/* Phrases */}
        <div className="growth-phrases" aria-label="Get found. Get noticed. Get growing.">
          <div className="growth-phrase font-display">GET FOUND.</div>
          <div className="growth-phrase font-display">GET NOTICED.</div>
          <div className="growth-phrase growth-phrase--accent font-display">GET GROWING.</div>
        </div>

        {/* Illustrative chart */}
        <div className="growth-chart" aria-hidden="true">
          {[35, 55, 45, 72, 60, 88, 78, 95].map((h, i) => (
            <div key={i} className="growth-bar">
              <div
                className="growth-bar-fill"
                style={{
                  height: `${h}%`,
                  background: i === 7 ? 'linear-gradient(to top, #B026FF, #0099FF)' : `rgba(245,245,240,${0.05 + i * 0.03})`
                }}
              />
            </div>
          ))}
        </div>

        {/* Services */}
        <div className="growth-svcs" role="list" aria-label="Growth services">
          {GROWTH_SERVICES.map((s) => (
            <span key={s} className="growth-svc" role="listitem">{s}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
