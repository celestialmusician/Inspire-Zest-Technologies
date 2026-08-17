import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGsap } from '@/hooks/useGsap'
import { testimonials } from '@/data/testimonials'
import './Testimonials.css'

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useGsap(() => {
    gsap.fromTo('.tst-content',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      }
    )
  }, [], sectionRef)

  const goto = (i: number) => {
    gsap.to('.tst-quote', {
      opacity: 0,
      y: -15,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setActive(i)
        gsap.fromTo('.tst-quote',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
        )
      }
    })
  }

  const t = testimonials[active]

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="tst scene"
      aria-label="Client testimonials"
    >
      <div className="tst-container">
        <span className="tst-tag" aria-hidden="true">12 — TESTIMONIALS</span>

        {/* Placeholder notice */}
        <div className="tst-placeholder-notice" role="note">
          <span>↳ Placeholder — replace with real client testimonials</span>
        </div>

        <div className="tst-content">
          <div className="tst-quote" aria-live="polite">
            <div className="tst-quote-mark" aria-hidden="true">"</div>
            <blockquote className="tst-quote-text">
              {t.quote}
            </blockquote>
            <div className="tst-author">
              <span className="tst-author-name">{t.name}</span>
              <span className="tst-author-role">{t.role}, {t.company}</span>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="tst-nav" role="tablist" aria-label="Select testimonial">
            {testimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={`Testimonial ${i + 1}`}
                className={`tst-dot ${i === active ? 'tst-dot--active' : ''}`}
                onClick={() => goto(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
