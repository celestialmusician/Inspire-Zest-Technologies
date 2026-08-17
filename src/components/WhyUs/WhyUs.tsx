import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsap } from '@/hooks/useGsap'
import './WhyUs.css'

gsap.registerPlugin(ScrollTrigger)

const PILLARS = ['Strategy', 'Design', 'Technology', 'Growth']

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null)

  useGsap(() => {
    gsap.fromTo('.why-heading-line',
      { yPercent: 120, rotateX: -35, opacity: 0 },
      {
        yPercent: 0,
        rotateX: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.why-heading',
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        }
      }
    )
    gsap.fromTo('.why-pillar',
      { opacity: 0, y: 35, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        stagger: 0.12,
        duration: 0.8,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.why-pillars',
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        }
      }
    )
  }, [], sectionRef)

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="why scene"
      aria-label="Why InspireZest"
    >
      <div className="why-container">
        <span className="why-tag" aria-hidden="true">11 — WHY INSPIREZEST</span>

        <div className="why-heading" aria-label="One partner. Multiple digital solutions.">
          <div className="why-wrap"><span className="why-heading-line font-display">ONE PARTNER.</span></div>
          <div className="why-wrap why-wrap--dim">
            <span className="why-heading-line font-display">MULTIPLE DIGITAL</span>
          </div>
          <div className="why-wrap why-wrap--dim">
            <span className="why-heading-line font-display">SOLUTIONS.</span>
          </div>
        </div>

        <div className="why-pillars" role="list" aria-label="Our core pillars">
          {PILLARS.map((p, i) => (
            <div key={p} className="why-pillar" role="listitem">
              <span className="why-pillar-num" aria-hidden="true">0{i+1}</span>
              <span className="why-pillar-label">{p}</span>
            </div>
          ))}
        </div>

        <p className="why-body">
          From a single conversation to a complete digital transformation — InspireZest
          brings strategy, design, technology, and growth into one cohesive partnership.
          No handoffs. No gaps. One team, one goal.
        </p>
      </div>
    </section>
  )
}
