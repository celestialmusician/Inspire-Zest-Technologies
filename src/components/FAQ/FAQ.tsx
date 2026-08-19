import { useState, useRef, useMemo, useEffect } from 'react'
import { Plus, Minus, ArrowUpRight, MessageSquare, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsap } from '@/hooks/useGsap'
import { FAQS } from '@/data/faqs'
import './FAQ.css'

gsap.registerPlugin(ScrollTrigger)

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const ctaCardRef = useRef<HTMLElement>(null)
  const [openId, setOpenId] = useState<string | null>('services')
  const [activeCategory, setActiveCategory] = useState<string>('ALL')

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(FAQS.map((f) => f.category.split(' ')[0])))
    return ['ALL', ...cats]
  }, [])

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    if (activeCategory === 'ALL') return FAQS
    return FAQS.filter((f) => f.category.toUpperCase().includes(activeCategory.toUpperCase()))
  }, [activeCategory])

  // GSAP Accordion Toggle with smooth height tween & ScrollTrigger refresh
  const toggleFAQ = (id: string) => {
    const isOpening = openId !== id
    const nextId = isOpening ? id : null
    setOpenId(nextId)

    // Trigger ScrollTrigger refresh after height transition completes
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 350)
  }

  // Scroll Trigger Entrance Animations
  useGsap(() => {
    const section = sectionRef.current
    if (!section) return

    // 1. Header Reveal
    gsap.fromTo(
      '.faq-badge',
      { opacity: 0, scale: 0.9, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.faq-header',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    gsap.fromTo(
      '.faq-heading',
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.faq-header',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    gsap.fromTo(
      '.faq-sub',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.faq-header',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // 2. Category Tabs Stagger
    gsap.fromTo(
      '.faq-filter-btn',
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.faq-filter-bar',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // 3. FAQ Items Stagger Entrance
    gsap.fromTo(
      '.faq-item',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.faq-list',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // 4. Side CTA Card Entrance
    if (ctaCardRef.current) {
      gsap.fromTo(
        ctaCardRef.current,
        { opacity: 0, scale: 0.92, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: ctaCardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }
  }, [], sectionRef)

  // Re-animate items on category filter change
  useEffect(() => {
    if (!listRef.current) return
    const items = listRef.current.querySelectorAll('.faq-item')
    gsap.fromTo(
      items,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.04,
        ease: 'power2.out',
      }
    )
    ScrollTrigger.refresh()
  }, [activeCategory])

  // Mouse 3D Tilt on CTA Card
  useEffect(() => {
    const card = ctaCardRef.current
    if (!card) return

    const xRot = gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power2.out' })
    const yRot = gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power2.out' })

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      xRot(-(y / rect.height) * 10)
      yRot((x / rect.width) * 10)
    }

    const handleMouseLeave = () => {
      xRot(0)
      yRot(0)
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Spotlight mouse effect on FAQ cards
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const rect = target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    target.style.setProperty('--mouse-x', `${x}px`)
    target.style.setProperty('--mouse-y', `${y}px`)
  }

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} id="faq" className="faq scene" aria-label="Frequently Asked Questions">
      <div className="faq-container">
        {/* Header */}
        <div className="faq-header">
          <div className="faq-badge">
            <Sparkles size={14} className="faq-badge-icon" />
            <span>KNOWLEDGE HUB & ARCHITECTURE</span>
          </div>

          <h2 className="faq-heading font-display">
            CLEAR ANSWERS. <span className="faq-heading-highlight">ZERO GUESSWORK.</span>
          </h2>
          <p className="faq-sub">
            Everything you need to know about partnering with InspireZest Technologies to architect, build, and deploy enterprise-grade digital systems.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="faq-filter-bar" role="tablist" aria-label="Filter FAQs by category">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`faq-filter-btn ${activeCategory === cat ? 'faq-filter-btn--active' : ''}`}
              onClick={() => {
                setActiveCategory(cat)
                setOpenId(null)
              }}
            >
              <span>{cat}</span>
              {activeCategory === cat && <div className="faq-filter-indicator" />}
            </button>
          ))}
        </div>

        {/* Layout: Accordion List + 3D Interactive Direct Consultation Box */}
        <div className="faq-layout">
          <div ref={listRef} className="faq-list" role="region" aria-label="FAQ Accordion">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openId === faq.id
              const num = String(index + 1).padStart(2, '0')

              return (
                <div
                  key={faq.id}
                  className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
                  onMouseMove={handleCardMouseMove}
                >
                  <div className="faq-spotlight-overlay" aria-hidden="true" />

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

                    <div className={`faq-icon-wrap ${isOpen ? 'faq-icon-wrap--open' : ''}`} aria-hidden="true">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>

                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${faq.id}`}
                    className={`faq-answer-collapse ${isOpen ? 'faq-answer-collapse--open' : ''}`}
                  >
                    <div className="faq-answer-inner">
                      <div className="faq-answer-line" />
                      <p className="faq-answer-text">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Side Card: Direct Support & Consultation with 3D Tilt */}
          <aside ref={ctaCardRef} className="faq-cta-card">
            <div className="faq-cta-glow" aria-hidden="true" />
            <div className="faq-cta-border-glow" aria-hidden="true" />
            
            <div className="faq-cta-content">
              <div className="faq-cta-badge">
                <span className="faq-cta-pulse" />
                <span>TECHNICAL LEAD ACTIVE</span>
              </div>

              <div className="faq-cta-icon-box">
                <MessageSquare size={28} className="faq-cta-icon" />
              </div>

              <h3 className="faq-cta-title font-display">Have a custom requirement?</h3>
              <p className="faq-cta-desc">
                Need an enterprise NDA, dedicated development squad, custom API integration, or urgent architecture review? Talk directly with our engineers.
              </p>

              <div className="faq-cta-perks">
                <div className="faq-cta-perk">
                  <CheckCircle2 size={15} className="faq-perk-icon" />
                  <span>Custom Scope & Roadmap in 48 hrs</span>
                </div>
                <div className="faq-cta-perk">
                  <CheckCircle2 size={15} className="faq-perk-icon" />
                  <span>NDA & Enterprise IP Protection</span>
                </div>
                <div className="faq-cta-perk">
                  <CheckCircle2 size={15} className="faq-perk-icon" />
                  <span>Fixed-Price & Milestone Options</span>
                </div>
              </div>

              <button
                className="faq-cta-button"
                onClick={scrollToContact}
                data-cursor="explore"
              >
                <span>TALK TO AN ENGINEER</span>
                <ArrowUpRight size={17} className="faq-btn-arrow" />
              </button>

              <div className="faq-cta-footer">
                <span className="faq-cta-dot" />
                <span>AVERAGE RESPONSE TIME: UNDER 2 HOURS</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

