import React, { useState, useRef, useCallback } from 'react'
import './ThrowableDeck.css'

export interface DeckCardItem {
  id: string
  title: string
  category: string
  year: string
  description: string
  technologies: string[]
  imageBg: string
  metrics?: string
}

const DEFAULT_CARDS: DeckCardItem[] = [
  {
    id: 'sleeve-01',
    title: 'AURA SPATIAL OS',
    category: '01 / Digital Products',
    year: '2026',
    description: 'Spatial computing interface designed for web3 mixed reality headsets with real-time particle audio visualizers.',
    technologies: ['React', 'Three.js', 'WebGL', 'WebXR'],
    imageBg: 'linear-gradient(135deg, #0A0C0E 0%, #101317 40%, #00F5A0 100%)',
    metrics: '100k+ Active Users · 60fps',
  },
  {
    id: 'sleeve-02',
    title: 'NEURAL CLOUD ENGINE',
    category: '02 / Enterprise Technology',
    year: '2026',
    description: 'High-frequency telemetry dashboard with automated anomaly detection and distributed node synchronization.',
    technologies: ['TypeScript', 'Golang', 'GraphQL', 'Tailwind'],
    imageBg: 'linear-gradient(135deg, #0A0C0E 0%, #0066FF 50%, #00F0FF 100%)',
    metrics: '99.99% Uptime · 2.4ms Latency',
  },
  {
    id: 'sleeve-03',
    title: 'QUANTUM KINETIC BRAND',
    category: '03 / Growth & Branding',
    year: '2025',
    description: 'Generative brand design system and automated multi-channel campaign engine with real-time conversions analytics.',
    technologies: ['GSAP', 'Next.js', 'Figma API', 'Vite'],
    imageBg: 'linear-gradient(135deg, #0A0C0E 0%, #7B2CBF 50%, #00F5A0 100%)',
    metrics: '+340% Conversion · 4.8x ROI',
  },
  {
    id: 'sleeve-04',
    title: 'HYPER-SPEED DEX UI',
    category: '04 / Fintech Architecture',
    year: '2025',
    description: 'Ultra-low latency decentralized exchange trading interface engineered with sub-millisecond DOM rendering.',
    technologies: ['Rust', 'WebAssembly', 'Canvas2D', 'CSS3'],
    imageBg: 'linear-gradient(135deg, #0A0C0E 0%, #E8913C 50%, #0066FF 100%)',
    metrics: '$2.4B Volume · Sub-ms',
  },
]

export default function ThrowableDeck() {
  const [cards, setCards] = useState<DeckCardItem[]>(DEFAULT_CARDS)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isThrowing, setIsThrowing] = useState(false)
  const [throwDir, setThrowDir] = useState<number>(0)
  const deckRef = useRef<HTMLDivElement>(null)
  const dragStartPos = useRef({ x: 0, y: 0 })

  const throwCard = useCallback((direction: number) => {
    if (isThrowing || cards.length === 0) return
    setIsThrowing(true)
    setThrowDir(direction)

    setTimeout(() => {
      setCards((prev) => {
        const copy = [...prev]
        const top = copy.shift()
        if (top) copy.push(top)
        return copy
      })
      setDragOffset({ x: 0, y: 0 })
      setIsThrowing(false)
      setIsDragging(false)
      setThrowDir(0)
    }, 320)
  }, [isThrowing, cards.length])

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isThrowing) return
    setIsDragging(true)
    dragStartPos.current = { x: e.clientX, y: e.clientY }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isThrowing) return
    const dx = e.clientX - dragStartPos.current.x
    const dy = e.clientY - dragStartPos.current.y
    setDragOffset({ x: dx, y: dy })
  }

  const handlePointerUp = () => {
    if (!isDragging) return
    const threshold = 45
    if (Math.abs(dragOffset.x) > threshold) {
      throwCard(dragOffset.x > 0 ? 1 : -1)
    } else {
      setDragOffset({ x: 0, y: 0 })
      setIsDragging(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      throwCard(-1)
    } else if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault()
      throwCard(1)
    }
  }

  return (
    <div className="tdeck-wrapper">
      <div className="tdeck-header">
        <span className="tdeck-tag">CATALOGUE SLEEVE DECK</span>
        <h3 className="tdeck-title font-display">PHYSICAL WORK DECK</h3>
        <p className="tdeck-subtitle">
          Interactive sleeve stack. Drag or swipe cards horizontally to throw sleeves off the deck and cycle projects.
        </p>
      </div>

      <div
        ref={deckRef}
        className="tdeck-container"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="region"
        aria-label="Interactive project card deck. Press arrow keys to throw cards."
      >
        <div className="tdeck-stack">
          {cards.map((card, index) => {
            const isTop = index === 0
            const offsetScale = 1 - (cards.length - 1 - index) * 0.04
            const offsetY = (cards.length - 1 - index) * -12
            const offsetRotate = (index % 2 === 0 ? 1 : -1) * (cards.length - 1 - index) * 2.5

            let cardStyle: React.CSSProperties = {
              zIndex: index + 1,
              transform: `translate3d(0px, ${offsetY}px, 0px) scale(${offsetScale}) rotate(${offsetRotate}deg)`,
              opacity: index > 2 ? 0.4 : 1,
            }

            if (isTop) {
              if (isThrowing) {
                const throwX = throwDir * 600
                const throwRot = throwDir * 35
                cardStyle = {
                  zIndex: 99,
                  transform: `translate3d(${throwX}px, ${dragOffset.y - 40}px, 0px) scale(1.05) rotate(${throwRot}deg)`,
                  opacity: 0,
                  transition: 'transform 0.32s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.32s ease-in',
                }
              } else if (isDragging) {
                const dragRot = dragOffset.x * 0.08
                cardStyle = {
                  zIndex: 99,
                  transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0px) scale(1.04) rotate(${dragRot}deg)`,
                  cursor: 'grabbing',
                  transition: 'none',
                }
              }
            }

            return (
              <div
                key={card.id}
                className={`tdeck-card ${isTop ? 'tdeck-card--top' : ''}`}
                style={cardStyle}
                onPointerDown={isTop ? handlePointerDown : undefined}
                onPointerMove={isTop ? handlePointerMove : undefined}
                onPointerUp={isTop ? handlePointerUp : undefined}
                onPointerCancel={isTop ? handlePointerUp : undefined}
              >
                <div className="tdeck-card-media" style={{ background: card.imageBg }}>
                  <div className="tdeck-card-badge">{card.year}</div>
                  <div className="tdeck-card-num">{card.category}</div>
                </div>

                <div className="tdeck-card-body">
                  <h4 className="tdeck-card-title">{card.title}</h4>
                  <p className="tdeck-card-desc">{card.description}</p>

                  <div className="tdeck-card-footer">
                    <div className="tdeck-card-tags">
                      {card.technologies.map((tech) => (
                        <span key={tech} className="tdeck-card-pill">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {card.metrics && (
                      <span className="tdeck-card-metrics">{card.metrics}</span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="tdeck-controls">
          <button
            className="tdeck-btn"
            onClick={() => throwCard(-1)}
            aria-label="Throw card left"
          >
            ← PREV
          </button>

          <div className="tdeck-dots">
            {DEFAULT_CARDS.map((c) => (
              <span
                key={c.id}
                className={`tdeck-dot ${c.id === cards[cards.length - 1].id ? 'tdeck-dot--active' : ''}`}
              />
            ))}
          </div>

          <button
            className="tdeck-btn"
            onClick={() => throwCard(1)}
            aria-label="Throw card right"
          >
            NEXT →
          </button>
        </div>

        <div className="tdeck-hint">
          <span>✦ THROW SLEEVE OR USE ARROW KEYS TO FLIP CATALOGUE ✦</span>
        </div>
      </div>
    </div>
  )
}


