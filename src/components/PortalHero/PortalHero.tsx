import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsap } from '@/hooks/useGsap'
import './PortalHero.css'

gsap.registerPlugin(ScrollTrigger)

export default function PortalHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef    = useRef<HTMLDivElement>(null)
  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)
  const wmLeftRef    = useRef<HTMLSpanElement>(null)
  const wmRightRef   = useRef<HTMLSpanElement>(null)
  const bgImgRef     = useRef<HTMLDivElement>(null)
  const dotLeftRef   = useRef<HTMLDivElement>(null)
  const dotRightRef  = useRef<HTMLDivElement>(null)

  useGsap(() => {
    const container = containerRef.current
    if (!container) return

    // Master ScrollTrigger timeline bound 100% to scroll position
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        pin: stickyRef.current,
        anticipatePin: 1,
      },
    })

    // 1. Uncover panels outward to left and right
    tl.to(
      leftPanelRef.current,
      { xPercent: -102, ease: 'power2.inOut' },
      0
    ).to(
      rightPanelRef.current,
      { xPercent: 102, ease: 'power2.inOut' },
      0
    )

    // 2. Wordmark signature move: grows, tightens tracking, and halves separate
    tl.to(
      wmLeftRef.current,
      {
        xPercent: -45,
        letterSpacing: '-0.04em',
        scale: 1.22,
        color: '#00F5A0',
        textShadow: '0 0 35px rgba(0, 245, 160, 0.8)',
        ease: 'power2.inOut',
      },
      0
    ).to(
      wmRightRef.current,
      {
        xPercent: 45,
        letterSpacing: '-0.04em',
        scale: 1.22,
        color: '#00F0FF',
        textShadow: '0 0 35px rgba(0, 240, 255, 0.8)',
        ease: 'power2.inOut',
      },
      0
    )

    // 3. Background image settles from overscale down to 1.0
    tl.fromTo(
      bgImgRef.current,
      { scale: 1.2, filter: 'brightness(0.7) contrast(1.1)' },
      { scale: 1.0, filter: 'brightness(0.95) contrast(1.05)', ease: 'power1.out' },
      0
    )

    // 4. Accent dots travel outward to opposite corners
    tl.to(
      dotLeftRef.current,
      { x: -320, y: -220, opacity: 0, scale: 2.5, ease: 'power2.out' },
      0
    ).to(
      dotRightRef.current,
      { x: 320, y: 220, opacity: 0, scale: 2.5, ease: 'power2.out' },
      0
    )
  }, [], containerRef)

  return (
    <section ref={containerRef} id="portal-hero" className="portal-container">
      <div ref={stickyRef} className="portal-stage">
        {/* Layer 1: Full-bleed background visual */}
        <div ref={bgImgRef} className="portal-bg-layer">
          <div className="portal-bg-overlay" />
        </div>

        {/* Layer 2: Radial veil & duotone wash */}
        <div className="portal-veil" />

        {/* Layer 3: Opaque Portal Door Panels (Start CLOSED) */}
        <div ref={leftPanelRef} className="portal-panel portal-panel--left">
          <div className="portal-panel-texture" />
        </div>
        <div ref={rightPanelRef} className="portal-panel portal-panel--right">
          <div className="portal-panel-texture" />
        </div>

        {/* Layer 4: Glowing accent dots at center */}
        <div className="portal-dots-wrap">
          <div ref={dotLeftRef} className="portal-dot portal-dot--amber" />
          <div ref={dotRightRef} className="portal-dot portal-dot--teal" />
        </div>

        {/* Layer 5: Wordmark split into two halves */}
        <div className="portal-wordmark-wrap">
          <span ref={wmLeftRef} className="portal-wm portal-wm--left">
            INSPIRE
          </span>
          <span ref={wmRightRef} className="portal-wm portal-wm--right">
            ZEST
          </span>
        </div>

        {/* Corner Metadata Pins */}
        <div className="portal-meta portal-meta--tl">
          <span className="portal-meta-dot" />
          <span>KOLLAM · KERALA · INDIA</span>
        </div>

        <div className="portal-meta portal-meta--tr">
          <span>EST. 2026 // NEXT-GEN STUDIO</span>
        </div>

        <div className="portal-meta portal-meta--bl">
          <span>01 // PORTAL OPENING</span>
        </div>

        <div className="portal-meta portal-meta--br">
          <span className="portal-scroll-hint">SCROLL TO UNLOCK ↴</span>
        </div>
      </div>
    </section>
  )
}
