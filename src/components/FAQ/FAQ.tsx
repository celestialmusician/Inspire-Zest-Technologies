import { useState, useRef } from 'react'
import { Plus, Minus, ArrowUpRight, HelpCircle, MessageSquare } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsap } from '@/hooks/useGsap'
import { FAQS } from '@/data/faqs'
import './FAQ.css'

gsap.registerPlugin(ScrollTrigger)

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openId, setOpenId] = useState<string | null>('services')

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  useGsap(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.fromTo(
      '.faq-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.faq-header',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    gsap.fromTo(
      '.faq-item',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.faq-list',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    gsap.fromTo(
      '.faq-cta-card',
      { opacity: 0, scale: 0.95, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.faq-cta-card',
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [], sectionRef)

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} id="faq" className="faq scene" aria-label="Frequently Asked Questions">
      <div className="faq-container">
        {/* Header */}
        <div className="faq-header">
          <h2 className="faq-heading font-display">
            CLEAR ANSWERS. <span className="faq-heading-highlight">ZERO GUESSWORK.</span>
          </h2>
          <p className="faq-sub">
            Everything you need to know about collaborating with InspireZest Technologies to build and launch your digital products.
          </p>
        </div>

        {/* Layout: Main FAQ Accordion List + Direct Help CTA Card */}
        <div className="faq-layout">
          <div className="faq-list" role="region" aria-label="FAQ Accordion">
            {FAQS.map((faq, index) => {
              const isOpen = openId === faq.id
              const num = String(index + 1).padStart(2, '0')

              return (
                <div
                  key={faq.id}
                  className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
                >
                  <button
                    className="faq-question-btn"
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    id={`faq-btn-${faq.id}`}
                  >
                    <div className="faq-q-left">
                      <span className="faq-num" aria-hidden="true">{num}</span>
                      <div className="faq-q-meta">
                        <span className="faq-category">{faq.category}</span>
                        <span className="faq-question-text">{faq.question}</span>
                      </div>
                    </div>

                    <div className="faq-icon-wrap" aria-hidden="true">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>

                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${faq.id}`}
                    className="faq-answer-collapse"
                    style={{
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                    }}
                  >
                    <div className="faq-answer-inner">
                      <p className="faq-answer-text">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Side Card: Direct Support & Consultation */}
          <aside className="faq-cta-card">
            <div className="faq-cta-glow" aria-hidden="true" />
            <div className="faq-cta-content">
              <div className="faq-cta-icon-box">
                <MessageSquare size={26} color="#00F5A0" />
              </div>
              <h3 className="faq-cta-title">Have a specific question?</h3>
              <p className="faq-cta-desc">
                Need a custom NDA, enterprise architecture consultation, or urgent deployment? Speak directly with our technical leads.
              </p>

              <button
                className="faq-cta-button"
                onClick={scrollToContact}
                data-cursor="explore"
              >
                <span>TALK TO AN ENGINEER</span>
                <ArrowUpRight size={16} />
              </button>

              <div className="faq-cta-footer">
                <span className="faq-cta-dot" />
                <span>TYPICAL RESPONSE TIME: UNDER 2 HOURS</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
