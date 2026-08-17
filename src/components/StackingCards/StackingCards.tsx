import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsap } from '@/hooks/useGsap'
import './StackingCards.css'

gsap.registerPlugin(ScrollTrigger)

export interface StackingCardItem {
  id: string
  num: string
  title: string
  category: string
  year: string
  description: string
  tags: string[]
  metrics: string
  accentColor: string
  bgGradient: string
}

const STACK_CARDS: StackingCardItem[] = [
  {
    id: 'sc-01',
    num: '01',
    title: 'AURA SPATIAL OS PLATFORM',
    category: 'DIGITAL PRODUCTS & SPATIAL UX',
    year: '2026',
    description: 'Next-generation spatial computing operating environment engineered for WebXR devices with zero-latency particle canvas visualizers.',
    tags: ['React', 'Three.js', 'WebGL', 'WebXR', 'GSAP'],
    metrics: '100K+ ACTIVE USERS · 60 FPS PERFORMANCE',
    accentColor: '#00F5A0',
    bgGradient: 'linear-gradient(135deg, #0A0C0E 0%, #101317 40%, #00F5A0 100%)',
  },
  {
    id: 'sc-02',
    num: '02',
    title: 'NEURAL TELEMETRY CLOUD',
    category: 'ENTERPRISE TECHNOLOGY & INFRASTRUCTURE',
    year: '2026',
    description: 'High-frequency cloud infrastructure dashboard providing real-time distributed node telemetry, AI anomaly detection, and automated scaling.',
    tags: ['TypeScript', 'Golang', 'GraphQL', 'Tailwind', 'Docker'],
    metrics: '99.99% UPTIME · 2.4MS AVERAGE LATENCY',
    accentColor: '#0066FF',
    bgGradient: 'linear-gradient(135deg, #0A0C0E 0%, #051428 50%, #0066FF 100%)',
  },
  {
    id: 'sc-03',
    num: '03',
    title: 'QUANTUM GENERATIVE BRAND',
    category: 'GROWTH STRATEGY & IDENTITY',
    year: '2025',
    description: 'Automated brand identity engine and multi-touchpoint kinetic marketing suite powered by real-time conversion analytics.',
    tags: ['Figma API', 'Next.js', 'CSS Modules', 'Vite'],
    metrics: '+340% CONVERSION RATE · 4.8X ROI',
    accentColor: '#7B2CBF',
    bgGradient: 'linear-gradient(135deg, #0A0C0E 0%, #1A0B2E 50%, #7B2CBF 100%)',
  },
  {
    id: 'sc-04',
    num: '04',
    title: 'HYPER-SPEED DEX TRADING UI',
    category: 'FINTECH ARCHITECTURE & DOMAIN OPTIMIZATION',
    year: '2025',
    description: 'Decentralized exchange terminal with sub-millisecond DOM rendering, instant orderbook execution, and responsive canvas charts.',
    tags: ['Rust', 'WebAssembly', 'Canvas2D', 'CSS3'],
    metrics: '$2.4B TRADING VOLUME · SUB-MS LATENCY',
    accentColor: '#00F0FF',
    bgGradient: 'linear-gradient(135deg, #0A0C0E 0%, #031B24 50%, #00F0FF 100%)',
  },
]

export default function StackingCards() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGsap(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.stacking-card')
    if (cards.length === 0) return

    cards.forEach((card, index) => {
      // Don't scale the last card as there's no card sliding over it
      if (index === cards.length - 1) return

      const nextCard = cards[index + 1]

      gsap.to(card, {
        scale: 0.9 + index * 0.015,
        filter: 'brightness(0.5) contrast(1.1)',
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: nextCard,
          start: 'top 85%',
          end: 'top 15%',
          scrub: true,
        },
      })
    })
  }, [], containerRef)

  return (
    <div ref={containerRef} className="stacking-section">
      <div className="stacking-header">
        <span className="stacking-tag">STICKY STACKING PORTFOLIO</span>
        <h3 className="stacking-title font-display">STACKING WORK DECK</h3>
        <p className="stacking-subtitle">
          Scroll down through the portfolio. As you scroll, each card pins stickily at the top while the next card slides up to cover it like a deck of physical cards.
        </p>
      </div>

      <div className="stacking-cards-container">
        {STACK_CARDS.map((card, i) => (
          <article
            key={card.id}
            className="stacking-card"
            style={{
              top: `calc(90px + ${i * 22}px)`,
              zIndex: i + 1,
            }}
          >
            <div className="stacking-card-inner" style={{ borderTopColor: card.accentColor }}>
              {/* Background gradient & texture */}
              <div className="stacking-card-bg" style={{ background: card.bgGradient }} />

              {/* Card Content Header */}
              <div className="stacking-card-top">
                <div className="stacking-card-meta">
                  <span className="stacking-card-num" style={{ color: card.accentColor }}>
                    {card.num}
                  </span>
                  <span className="stacking-card-cat">{card.category}</span>
                </div>
                <span className="stacking-card-year">{card.year}</span>
              </div>

              {/* Card Body */}
              <div className="stacking-card-body">
                <h4 className="stacking-card-heading">{card.title}</h4>
                <p className="stacking-card-desc">{card.description}</p>
              </div>

              {/* Card Footer */}
              <div className="stacking-card-footer">
                <div className="stacking-card-tags">
                  {card.tags.map((t) => (
                    <span key={t} className="stacking-card-tag" style={{ borderColor: `${card.accentColor}40`, color: card.accentColor }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="stacking-card-metrics" style={{ color: card.accentColor }}>
                  {card.metrics}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
