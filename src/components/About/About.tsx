import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsap } from '@/hooks/useGsap'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useGsap(() => {
    gsap.fromTo('.about-line',
      { yPercent: 120, rotateX: -35, skewY: 2, opacity: 0 },
      {
        yPercent: 0,
        rotateX: 0,
        skewY: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.about-headline',
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    gsap.fromTo('.about-col',
      { opacity: 0, y: 35, filter: 'blur(5px)' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)',
        stagger: 0.14,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-columns',
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    gsap.fromTo('.about-stat-card',
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1, y: 0, scale: 1,
        stagger: 0.12,
        duration: 0.8,
        ease: 'back.out(1.6)',
        scrollTrigger: {
          trigger: '.about-stats-row',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    )
  }, [], sectionRef)

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about scene"
      aria-label="About InspireZest"
    >
      <div className="about-container">
        <div className="about-tag-row">
          <span className="about-tag" aria-hidden="true">08 — ABOUT</span>
        </div>

        <div className="about-headline" role="heading" aria-level={2} aria-label="We build what comes next">
          <div className="about-wrap"><span className="about-line font-display">WE DON'T</span></div>
          <div className="about-wrap"><span className="about-line font-display">JUST BUILD</span></div>
          <div className="about-wrap about-wrap--dim"><span className="about-line font-display">SOFTWARE.</span></div>
        </div>

        <div className="about-divider" aria-hidden="true" />

        <div className="about-columns">
          <div className="about-col">
            <h3 className="about-col-title">Our purpose</h3>
            <p>
              InspireZest Technologies exists to help businesses compete in a digital world.
              We believe technology should be accessible, purposeful, and built to last.
            </p>
          </div>
          <div className="about-col">
            <h3 className="about-col-title">Our approach</h3>
            <p>
              We combine technical precision with creative thinking. Every engagement starts
              with a clear understanding of your goals, and every deliverable is measured
              against those goals.
            </p>
          </div>
          <div className="about-col">
            <h3 className="about-col-title">Our base</h3>
            <p>
              Based in Kollam, Kerala, India. We work with clients across India and
              internationally, building digital products that perform in competitive markets.
            </p>
          </div>
        </div>

        {/* Continuous Scroll Metric Cards */}
        <div className="about-stats-row mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
          <div className="about-stat-card p-6 bg-white/[0.02] rounded-xl border border-white/10 backdrop-blur-md">
            <span className="text-3xl md:text-4xl font-bold font-display text-gradient-brand">100%</span>
            <span className="block mt-1 text-xs text-gray-400 uppercase tracking-widest">Client Satisfaction</span>
          </div>
          <div className="about-stat-card p-6 bg-white/[0.02] rounded-xl border border-white/10 backdrop-blur-md">
            <span className="text-3xl md:text-4xl font-bold font-display text-gradient-brand">15+</span>
            <span className="block mt-1 text-xs text-gray-400 uppercase tracking-widest">Tech Capabilities</span>
          </div>
          <div className="about-stat-card p-6 bg-white/[0.02] rounded-xl border border-white/10 backdrop-blur-md">
            <span className="text-3xl md:text-4xl font-bold font-display text-gradient-brand">24/7</span>
            <span className="block mt-1 text-xs text-gray-400 uppercase tracking-widest">Digital Operations</span>
          </div>
        </div>
      </div>
    </section>
  )
}
