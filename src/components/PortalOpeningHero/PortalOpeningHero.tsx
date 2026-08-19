import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getLenis } from '@/hooks/useLenis'
import { ArrowUpRight, Cpu, Sparkles, ChevronDown } from 'lucide-react'
import './PortalOpeningHero.css'

gsap.registerPlugin(ScrollTrigger)

export default function PortalOpeningHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef    = useRef<HTMLDivElement>(null)
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const contentRef   = useRef<HTMLDivElement>(null)
  const techFrameRef = useRef<HTMLDivElement>(null)
  const badgeRef     = useRef<HTMLDivElement>(null)
  const titleRef     = useRef<HTMLHeadingElement>(null)
  const subtitleRef  = useRef<HTMLParagraphElement>(null)
  const ctasRef      = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  // ── 1. Minimal Ambient Canvas Tech Starfield ──────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const isMobile = window.innerWidth < 768
    const numParticles = isMobile ? 30 : 60

    interface Star {
      x: number
      y: number
      radius: number
      alpha: number
      speed: number
    }

    const stars: Star[] = []
    for (let i = 0; i < numParticles; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.2 + 0.05,
      })
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw subtle specular grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)'
      ctx.lineWidth = 1
      const gridSize = 80
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Draw subtle particles
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        s.y -= s.speed
        if (s.y < 0) s.y = height

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
        ctx.fillStyle = '#FFFFFF'
        ctx.globalAlpha = s.alpha
        ctx.fill()
      }

      ctx.globalAlpha = 1.0
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // ── 2. Interactive 3D Card Tilt & Specular Reflection ─────────────────────
  useEffect(() => {
    const stage = stickyRef.current
    const frame = techFrameRef.current
    if (!stage || !frame || window.innerWidth < 1024) return

    const tiltXTo = gsap.quickTo(frame, 'rotationX', { duration: 0.6, ease: 'power2.out' })
    const tiltYTo = gsap.quickTo(frame, 'rotationY', { duration: 0.6, ease: 'power2.out' })
    const spotXTo = gsap.quickTo(spotlightRef.current, 'x', { duration: 0.4, ease: 'power2.out' })
    const spotYTo = gsap.quickTo(spotlightRef.current, 'y', { duration: 0.4, ease: 'power2.out' })

    const handleMouseMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect()
      const xNorm = (e.clientX - rect.left) / rect.width - 0.5
      const yNorm = (e.clientY - rect.top) / rect.height - 0.5

      tiltXTo(-yNorm * 10)
      tiltYTo(xNorm * 12)
      spotXTo(e.clientX)
      spotYTo(e.clientY)
    }

    const handleMouseLeave = () => {
      tiltXTo(0)
      tiltYTo(0)
    }

    stage.addEventListener('mousemove', handleMouseMove)
    stage.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      stage.removeEventListener('mousemove', handleMouseMove)
      stage.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // ── 3. GSAP Timeline & Apple ScrollTrigger Scrub ──────────────────────────
  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    const frame = techFrameRef.current
    if (!container || !content) return

    const isMobile = window.innerWidth < 768

    const ctx = gsap.context(() => {
      // Entrance Timeline on Load
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      loadTl
        .fromTo(
          badgeRef.current,
          { opacity: 0, y: -20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.2 }
        )
        .fromTo(
          '.hero-split-word',
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, stagger: 0.05, duration: 1.1, ease: 'power4.out' },
          '-=0.5'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          ctasRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          frame,
          { opacity: 0, y: 60, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' },
          '-=0.6'
        )

      // Pinned Apple-style Zoom Scrub on Scroll
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: isMobile ? 0.3 : 0.8,
          pin: stickyRef.current,
          anticipatePin: 1,
        },
      })

      scrubTl
        .to(
          content,
          {
            y: -80,
            opacity: 0,
            scale: 0.92,
            ease: 'power1.in',
          },
          0
        )
        .to(
          frame,
          {
            scale: isMobile ? 1.4 : 1.8,
            z: 300,
            opacity: 0,
            ease: 'power1.in',
          },
          0
        )
    }, container)

    return () => ctx.revert()
  }, [])

  const scrollToProjects = () => {
    const el = document.getElementById('projects')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToNext = () => {
    const lenis = getLenis()
    const container = containerRef.current
    if (!container) return
    const targetY = container.offsetTop + container.offsetHeight
    if (lenis) {
      lenis.scrollTo(targetY, { duration: 1.2 })
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' })
    }
  }

  const titleWords = 'Strategic Digital Marketing & Web Solutions'.split(' ')

  return (
    <section
      ref={containerRef}
      id="portal-opening"
      className="apple-hero-container"
      aria-label="Inspire Zest Technologies — Keynote Hero"
    >
      <div ref={stickyRef} className="apple-hero-stage">
        {/* Layer 1: Minimalist Starfield & Grid */}
        <canvas ref={canvasRef} className="apple-hero-canvas" aria-hidden="true" />

        {/* Layer 2: Interactive Specular Spotlight */}
        <div ref={spotlightRef} className="apple-hero-spotlight" aria-hidden="true" />

        {/* Layer 3: Main Apple Keynote Content Box */}
        <div ref={contentRef} className="apple-hero-content">
          {/* Top Titanium Pill */}
          <div ref={badgeRef} className="apple-pill-badge" data-cursor="explore">
            <span className="apple-badge-dot" aria-hidden="true" />
            <span>INSPIRE ZEST TECHNOLOGIES</span>
            <span className="apple-badge-sep">/</span>
            <span className="apple-badge-dim">PRO ARCHITECTURE</span>
          </div>

          {/* Kinetic Titanium Headline */}
          <h1 ref={titleRef} className="apple-hero-title font-display">
            {titleWords.map((word, i) => (
              <span key={i} className="apple-word-clip">
                <span
                  className={`hero-split-word ${
                    word === 'Marketing' || word === 'Web' || word === 'Solutions'
                      ? 'apple-title-accent'
                      : 'apple-title-titanium'
                  }`}
                >
                  {word}&nbsp;
                </span>
              </span>
            ))}
          </h1>

          {/* Subtext */}
          <p ref={subtitleRef} className="apple-hero-subtext">
            We architect award-winning web platforms, high-converting mobile apps, and enterprise AI
            systems engineered for category leaders worldwide.
          </p>

          {/* Apple-style CTAs */}
          <div ref={ctasRef} className="apple-hero-cta-group">
            <button
              className="apple-btn-white"
              onClick={scrollToProjects}
              data-cursor="view"
              aria-label="Explore Selected Work"
            >
              <span>Explore Selected Work</span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </button>
            <button
              className="apple-btn-glass"
              onClick={scrollToContact}
              data-cursor="go"
              aria-label="Start a Project"
            >
              <span>Start a Project</span>
            </button>
          </div>
        </div>

        {/* Layer 4: 3D Floating Keynote Tech Visual */}
        <div ref={techFrameRef} className="apple-hero-tech-frame">
          <div className="apple-frame-glass-bezel">
            {/* Top Bar of Device Frame */}
            <div className="apple-frame-header">
              <div className="apple-frame-dots">
                <span />
                <span />
                <span />
              </div>
              <span className="apple-frame-title">inspirezest-core.engine // v4.2.0</span>
              <div className="apple-frame-chip">
                <Cpu size={13} className="text-cyan-400" />
                <span>AI OPTIMIZED</span>
              </div>
            </div>

            {/* High-Resolution Tech Showcase Image */}
            <div className="apple-frame-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1400&auto=format&fit=crop"
                alt="Inspire Zest Core Tech Visualization"
                className="apple-frame-img"
                loading="eager"
                decoding="async"
              />
              <div className="apple-frame-overlay-glass" aria-hidden="true">
                <div className="apple-frame-floating-pill">
                  <Sparkles size={14} className="text-cyan-400" />
                  <span>Sub-0.4s Latency · Enterprise Scalability</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Prompt */}
        <button
          className="apple-scroll-prompt"
          onClick={scrollToNext}
          aria-label="Scroll to discover"
        >
          <span>SCROLL TO DISCOVER</span>
          <ChevronDown size={16} className="apple-scroll-arrow" aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
