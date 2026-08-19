import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '@/data/services'
import {
  Code,
  Smartphone,
  Cpu,
  Layers,
  ShoppingBag,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import './Services.css'

gsap.registerPlugin(ScrollTrigger)

const ICON_MAP: Record<string, typeof Code> = {
  code: Code,
  smartphone: Smartphone,
  cpu: Cpu,
  layers: Layers,
  'shopping-bag': ShoppingBag,
  'trending-up': TrendingUp,
}

export default function Services() {
  const containerRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isMobile = window.innerWidth < 768

    const ctx = gsap.context(() => {
      // 1. Header entrance
      gsap.fromTo(
        '.srv-header-item',
        { opacity: 0, y: 30, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // 2. Stacked 3D Cards Scrub Animation
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]

      cards.forEach((card, index) => {
        if (index === cards.length - 1) return // Last card doesn't need to shrink

        gsap.to(card, {
          scale: isMobile ? 0.94 : 0.9,
          opacity: 0.35,
          filter: 'blur(4px)',
          yPercent: -5 * index,
          ease: 'none',
          scrollTrigger: {
            trigger: cards[index + 1],
            start: 'top 70%',
            end: 'top 20%',
            scrub: true,
          },
        })
      })
    }, container)

    return () => ctx.revert()
  }, [])

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={containerRef}
      id="services"
      className="stacked-services-section"
      aria-label="Inspire Zest Core Services"
    >
      <div className="services-container">
        {/* Sticky Header Row */}
        <div className="services-header">
          <div className="services-tag srv-header-item" aria-hidden="true">
            <Sparkles size={13} className="text-cyan-400" />
            <span>03 — WHAT WE DO</span>
          </div>
          <h2 className="services-title font-display srv-header-item">
            ENGINEERING THE <span className="services-title-gradient">EXTRAORDINARY</span>
          </h2>
          <p className="services-subtitle srv-header-item">
            Full-lifecycle technology solutions architected for high-growth disruptors and global
            enterprises.
          </p>
        </div>

        {/* Stacked Cards Container */}
        <div className="services-stack-list" role="list" aria-label="Services List">
          {services.map((svc, idx) => {
            const Icon = ICON_MAP[svc.iconType] || Code
            return (
              <div
                key={svc.id}
                ref={(el) => {
                  cardsRef.current[idx] = el
                }}
                className="service-stack-card"
                role="listitem"
                style={
                  {
                    '--svc-accent': svc.accentColor,
                    '--svc-glow': svc.glowColor,
                    top: `calc(10vh + ${idx * 24}px)`,
                  } as React.CSSProperties
                }
              >
                {/* Ambient Radial Card Glow */}
                <div className="service-card-ambient-glow" aria-hidden="true" />

                {/* Left Side: Number, Category & Description */}
                <div className="service-card-left">
                  <div className="service-card-num-row">
                    <span className="service-card-num font-display">{svc.number}</span>
                    <div className="service-card-icon-pill">
                      <Icon size={20} style={{ color: svc.accentColor }} />
                      <span style={{ color: svc.accentColor }}>{svc.title}</span>
                    </div>
                  </div>

                  <h3 className="service-card-headline font-display">{svc.headline}</h3>
                  <p className="service-card-description">{svc.description}</p>

                  <button
                    className="service-card-action"
                    onClick={scrollToContact}
                    data-cursor="go"
                    aria-label={`Get started with ${svc.title}`}
                  >
                    <span>REQUEST CONSULTATION</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </div>

                {/* Right Side: Capabilities Matrix */}
                <div className="service-card-right">
                  <span className="service-matrix-title">CORE CAPABILITIES</span>
                  <div className="service-capabilities-grid">
                    {svc.capabilities.map((cap) => (
                      <div key={cap} className="service-cap-badge">
                        <CheckCircle2
                          size={16}
                          style={{ color: svc.accentColor, flexShrink: 0 }}
                          aria-hidden="true"
                        />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
