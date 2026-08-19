import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { testimonials } from '@/data/testimonials'
import { Sparkles, Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import './Testimonials.css'

gsap.registerPlugin(ScrollTrigger)

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // 1. Entrance animation
      gsap.fromTo(
        '.tst-header-anim',
        { opacity: 0, y: 30, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // 2. Card entrance
      gsap.fromTo(
        '.tst-featured-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.tst-featured-card',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const switchTestimonial = (newIdx: number) => {
    gsap.to('.tst-quote-anim', {
      opacity: 0,
      y: -15,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setActiveIndex(newIdx)
        gsap.fromTo(
          '.tst-quote-anim',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
        )
      },
    })
  }

  const prev = () => {
    const nextIdx = activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1
    switchTestimonial(nextIdx)
  }

  const next = () => {
    const nextIdx = activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1
    switchTestimonial(nextIdx)
  }

  const active = testimonials[activeIndex]

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="testimonials-award-section"
      aria-label="Client Testimonials and Social Proof"
    >
      <div className="tst-container">
        {/* Section Header */}
        <div className="tst-header">
          <h2 className="tst-title font-display tst-header-anim">
            TRUSTED BY <span className="tst-title-gradient">CATEGORY LEADERS</span>
          </h2>
          <p className="tst-subtitle tst-header-anim">
            Here is what our founding partners and enterprise executives have to say about working with
            Inspire Zest Technologies.
          </p>
        </div>

        {/* Featured Glowing Testimonial Card */}
        <div className="tst-featured-card" data-cursor="drag">
          <div className="tst-card-glow" aria-hidden="true" />
          <Quote className="tst-quote-icon" size={64} aria-hidden="true" />

          {/* Star Rating Row */}
          <div className="tst-rating-row tst-quote-anim" aria-label="5 out of 5 stars">
            {[...Array(active.rating)].map((_, i) => (
              <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
            ))}
            <span className="tst-project-pill">{active.project}</span>
          </div>

          {/* Quote Text */}
          <blockquote className="tst-quote-text tst-quote-anim font-display">
            "{active.quote}"
          </blockquote>

          {/* Author Details & Navigation */}
          <div className="tst-author-bar tst-quote-anim">
            <div className="tst-author-profile">
              <img
                src={active.avatar}
                alt={active.name}
                className="tst-author-avatar"
                loading="lazy"
              />
              <div className="tst-author-info">
                <span className="tst-author-name font-display">{active.name}</span>
                <span className="tst-author-role">
                  {active.role} · <strong className="text-cyan-400">{active.company}</strong>
                </span>
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="tst-nav-controls">
              <button
                className="tst-nav-btn"
                onClick={prev}
                aria-label="Previous testimonial"
                data-cursor="explore"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="tst-nav-dots" role="tablist">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === activeIndex}
                    aria-label={`Testimonial ${i + 1}`}
                    className={`tst-dot ${i === activeIndex ? 'tst-dot--active' : ''}`}
                    onClick={() => switchTestimonial(i)}
                  />
                ))}
              </div>
              <button
                className="tst-nav-btn"
                onClick={next}
                aria-label="Next testimonial"
                data-cursor="explore"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
