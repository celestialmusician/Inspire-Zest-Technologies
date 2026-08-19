import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getLenis } from '@/hooks/useLenis'
import './PortalOpeningHero.css'

gsap.registerPlugin(ScrollTrigger)

// ─── Component ───────────────────────────────────────────────────────────────
export default function PortalOpeningHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef    = useRef<HTMLDivElement>(null)
  const wmWrapRef    = useRef<HTMLDivElement>(null)
  const wmLeftRef    = useRef<HTMLSpanElement>(null)
  const wmRightRef   = useRef<HTMLSpanElement>(null)
  const overlayRef   = useRef<HTMLDivElement>(null)
  const hintRef      = useRef<HTMLButtonElement>(null)
  const ctasRef      = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  // ── Interactive Mouse Parallax & 3D Tilt (Desktop only) ────────────────
  useEffect(() => {
    const stage = stickyRef.current
    if (!stage || window.innerWidth < 768) return

    const xTiltTo = gsap.quickTo(wmWrapRef.current, 'rotationY', { duration: 0.6, ease: 'power2.out' })
    const yTiltTo = gsap.quickTo(wmWrapRef.current, 'rotationX', { duration: 0.6, ease: 'power2.out' })
    const xMoveTo = gsap.quickTo(wmWrapRef.current, 'x', { duration: 0.8, ease: 'power2.out' })
    const yMoveTo = gsap.quickTo(wmWrapRef.current, 'y', { duration: 0.8, ease: 'power2.out' })

    const spotXTo = gsap.quickTo(spotlightRef.current, 'x', { duration: 0.35, ease: 'power1.out' })
    const spotYTo = gsap.quickTo(spotlightRef.current, 'y', { duration: 0.35, ease: 'power1.out' })

    const handleMouseMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect()
      const xNorm = (e.clientX - rect.left) / rect.width - 0.5
      const yNorm = (e.clientY - rect.top) / rect.height - 0.5

      xTiltTo(xNorm * 16)
      yTiltTo(-yNorm * 14)
      xMoveTo(xNorm * 22)
      yMoveTo(yNorm * 18)

      spotXTo(e.clientX)
      spotYTo(e.clientY)
    }

    const handleMouseLeave = () => {
      xTiltTo(0)
      yTiltTo(0)
      xMoveTo(0)
      yMoveTo(0)
    }

    stage.addEventListener('mousemove', handleMouseMove)
    stage.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      stage.removeEventListener('mousemove', handleMouseMove)
      stage.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // ── GSAP Scroll-driven animation ─────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isMobile = window.innerWidth < 768

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger:       container,
        start:         'top top',
        end:           'bottom bottom',
        scrub:         isMobile ? 0.35 : 1.1,
        pin:           stickyRef.current,
        anticipatePin: 1,
      },
    })

    // ── 1. Wordmark: tighten tracking + solid contrast glow ──────────────
    tl.fromTo(
      wmLeftRef.current,
      {
        scale: 1.0,
        letterSpacing: '0.04em',
        color: '#FFFFFF',
        transformOrigin: 'left center',
        textShadow: '0 4px 30px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.8)',
      },
      {
        scale:         isMobile ? 1.02 : 1.05,
        letterSpacing: '-0.01em',
        color:         '#00F5A0',
        textShadow:    '0 4px 30px rgba(0,0,0,0.98), 0 0 40px rgba(0,245,160,0.85), 0 0 15px rgba(0,245,160,0.5)',
        ease:          'power2.inOut',
      },
      0,
    ).fromTo(
      wmRightRef.current,
      {
        scale: 1.0,
        letterSpacing: '0.04em',
        color: '#FFFFFF',
        transformOrigin: 'left center',
        webkitTextStroke: '2px #FFFFFF',
        textShadow: '0 4px 30px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.8)',
      },
      {
        scale:           isMobile ? 1.02 : 1.05,
        letterSpacing:   '-0.01em',
        color:           '#00F0FF',
        webkitTextStroke: '1px #00F0FF',
        textShadow:      '0 4px 30px rgba(0,0,0,0.98), 0 0 40px rgba(0,240,255,0.85), 0 0 15px rgba(0,240,255,0.5)',
        ease:            'power2.inOut',
      },
      0,
    )

    // ── 2. Duotone tint fades in gently ──────────────────────────────────
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 0.35, ease: 'power1.inOut' },
      0,
    )

    // ── 3. Scroll hint fades out as user begins scrolling ─────────────────
    tl.to(
      hintRef.current,
      { opacity: 0, y: 16, ease: 'power1.out' },
      0,
    )

    // ── 4. CTAs animate in tandem with the wordmark ───────────────────────
    tl.fromTo(
      ctasRef.current,
      { scale: 1.0, opacity: 1, transformOrigin: 'left center' },
      { scale: isMobile ? 1.02 : 1.05, opacity: 1, ease: 'power2.inOut' },
      0,
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      tl.kill()
    }
  }, [])

  // ── Scroll to next section helper ────────────────────────────────────────
  const scrollToNext = () => {
    const lenis = getLenis()
    const container = containerRef.current
    if (!container) return
    const targetY = container.offsetTop + container.offsetHeight
    if (lenis) {
      lenis.scrollTo(targetY, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' })
    }
  }

  const scrollToWork = () => {
    const el = document.getElementById('projects')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <section
      ref={containerRef}
      id="portal-opening"
      className="portal-op-container"
      aria-label="InspireZest Technologies — Hero"
    >
      <div ref={stickyRef} className="portal-op-stage">

        {/* ── Layer 1: Interactive Mouse Spotlight (Desktop only) ── */}
        <div ref={spotlightRef} className="portal-op-spotlight" aria-hidden="true" />

        {/* ── Layer 2: Edge vignette + duotone overlay ── */}
        <div className="portal-op-veil" aria-hidden="true" />
        <div ref={overlayRef} className="portal-op-duotone" aria-hidden="true" />

        {/* ── Layer 3: Unified Content Box (Wordmark + CTAs) with 3D Parallax ── */}
        <div ref={wmWrapRef} className="portal-op-content" aria-label="InspireZest">
          <div className="portal-op-wordmark">
            <span ref={wmLeftRef} className="portal-op-wm-span portal-op-wm-span--left">
              INSPIRE
            </span>
            <span ref={wmRightRef} className="portal-op-wm-span portal-op-wm-span--right">
              ZEST
            </span>
          </div>

          {/* ── Layer 4: CTAs (Naturally below wordmark) ── */}
          <div ref={ctasRef} className="portal-op-ctas" aria-label="Call to action">
            <button
              className="portal-op-btn-primary"
              onClick={scrollToWork}
              data-cursor="view"
              aria-label="Explore our work"
            >
              EXPLORE OUR WORK
              <span className="portal-op-btn-arrow" aria-hidden="true"> →</span>
            </button>
            <button
              className="portal-op-btn-secondary"
              onClick={scrollToContact}
              data-cursor="go"
              aria-label="Start a project with us"
            >
              START A PROJECT
            </button>
          </div>
        </div>

        {/* ── Layer 5: Clickable Interactive Scroll hint ── */}
        <button
          ref={hintRef}
          className="portal-op-hint"
          onClick={scrollToNext}
          aria-label="Scroll to explore"
        >
          <span className="portal-op-line" />
          <span className="portal-op-text">SCROLL OR CLICK TO EXPLORE ↴</span>
          <span className="portal-op-line" />
        </button>
      </div>
    </section>
  )
}
