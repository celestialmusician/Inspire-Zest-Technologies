import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '@/data/services'
import TextScramble from '@/components/TextScramble'
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

    const isMobile = window.innerWidth < 1024

    const ctx = gsap.context(() => {
      // 1. Header entrance
      gsap.fromTo(
        '.apple-srv-header-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
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

      // 2. Apple Stacked Keynote Cards Scrub Animation with Masked Reveal
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]

      cards.forEach((card, index) => {
        // Masked Reveal on image bezel
        const bezel = card.querySelector('.apple-img-bezel')
        if (bezel) {
          gsap.fromTo(
            bezel,
            { clipPath: 'inset(15% 0% 15% 0% round 24px)', opacity: 0.7 },
            {
              clipPath: 'inset(0% 0% 0% 0% round 24px)',
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }

        if (index === cards.length - 1) return // Last card doesn't stack away

        gsap.to(card, {
          scale: isMobile ? 0.95 : 0.92,
          opacity: 0.45,
          yPercent: -4 * index,
          ease: 'none',
          scrollTrigger: {
            trigger: cards[index + 1],
            start: 'top 65%',
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
      className="apple-services-section"
      aria-label="Inspire Zest Core Engineering Services"
    >
      <div className="apple-services-container">
        {/* Section Header */}
        <div className="apple-services-header">
          <h2 className="apple-services-title font-display apple-srv-header-item">
            ENGINEERING WITHOUT <span className="apple-title-gradient">COMPROMISE</span>
          </h2>
          <p className="apple-services-sub apple-srv-header-item">
            Precision-crafted digital platforms, high-performance apps, and enterprise AI systems.
          </p>
        </div>

        {/* Stacked Cards List */}
        <div className="apple-services-stack" role="list" aria-label="Services List">
          {services.map((svc, idx) => {
            const Icon = ICON_MAP[svc.iconType] || Code
            return (
              <div
                key={svc.id}
                ref={(el) => {
                  cardsRef.current[idx] = el
                }}
                className="apple-service-card"
                role="listitem"
                style={
                  {
                    '--svc-accent': svc.accentColor,
                    top: `calc(12vh + ${idx * 24}px)`,
                  } as React.CSSProperties
                }
              >
                {/* Left Side: Typography, Capabilities, CTA */}
                <div className="apple-card-left">
                  <div className="apple-card-badge-row">
                    <span className="apple-card-index font-display">{svc.number}</span>
                    <div className="apple-card-pill">
                      <Icon size={16} style={{ color: svc.accentColor }} />
                      <TextScramble text={svc.title} speed={25} />
                    </div>
                  </div>

                  <h3 className="apple-card-headline font-display">{svc.headline}</h3>
                  <p className="apple-card-desc">{svc.description}</p>

                  {/* Capabilities List */}
                  <div className="apple-card-caps">
                    {svc.capabilities.map((cap) => (
                      <div key={cap} className="apple-cap-item">
                        <CheckCircle2
                          size={15}
                          style={{ color: svc.accentColor, flexShrink: 0 }}
                          aria-hidden="true"
                        />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className="apple-card-cta"
                    onClick={scrollToContact}
                    data-cursor="go"
                    aria-label={`Inquire about ${svc.title}`}
                  >
                    <span>Request Technical Proposal</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </button>
                </div>

                {/* Right Side: Full-Bleed 4K Tech Imagery Showcase with Masked Reveal */}
                <div className="apple-card-right">
                  <div className="apple-img-bezel">
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="apple-service-img"
                      loading="lazy"
                    />
                    <div className="apple-img-glass-overlay" aria-hidden="true">
                      <div className="apple-img-status-pill">
                        <span
                          className="apple-status-dot"
                          style={{ background: svc.accentColor }}
                        />
                        <TextScramble text="PRODUCTION READY" speed={30} />
                      </div>
                    </div>
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
