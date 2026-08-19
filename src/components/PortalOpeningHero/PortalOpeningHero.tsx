import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getLenis } from '@/hooks/useLenis'
import { ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react'
import './PortalOpeningHero.css'

gsap.registerPlugin(ScrollTrigger)

export default function PortalOpeningHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef    = useRef<HTMLDivElement>(null)
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const contentRef   = useRef<HTMLDivElement>(null)
  const titleRef     = useRef<HTMLHeadingElement>(null)
  const subtitleRef  = useRef<HTMLParagraphElement>(null)
  const badgeRef     = useRef<HTMLDivElement>(null)
  const ctasRef      = useRef<HTMLDivElement>(null)
  const statsBarRef  = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  // ── 1. Interactive 3D Canvas Particle Constellation ────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const isMobile = window.innerWidth < 768
    const numParticles = isMobile ? 35 : 75
    const connectionDist = isMobile ? 80 : 130

    let mouseX = width / 2
    let mouseY = height / 2
    let targetMouseX = mouseX
    let targetMouseY = mouseY

    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: string
      alpha: number
      baseAlpha: number
    }

    const colors = ['#00F0FF', '#00F5A0', '#B026FF', '#ffffff']
    const particles: Particle[] = []

    for (let i = 0; i < numParticles; i++) {
      const baseAlpha = Math.random() * 0.6 + 0.2
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: baseAlpha,
        baseAlpha,
      })
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX
      targetMouseY = e.clientY
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    const render = () => {
      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05

      ctx.clearRect(0, 0, width, height)

      // Draw subtle background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)'
      ctx.lineWidth = 1
      const gridSize = 60
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

      // Update & Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        // Wrap around bounds
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Distance to cursor
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distToMouse = Math.sqrt(dx * dx + dy * dy)

        if (distToMouse < 180) {
          p.alpha = Math.min(1, p.baseAlpha + (1 - distToMouse / 180) * 0.6)
          // Gentle push away from cursor
          p.x -= (dx / distToMouse) * 0.8
          p.y -= (dy / distToMouse) * 0.8
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.03
        }

        // Draw particle dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.shadowBlur = 10
        ctx.shadowColor = p.color
        ctx.fill()
        ctx.shadowBlur = 0

        // Connect nearby particles with glowing lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const pdx = p.x - p2.x
          const pdy = p.y - p2.y
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy)

          if (pdist < connectionDist) {
            const lineAlpha = (1 - pdist / connectionDist) * 0.25 * Math.min(p.alpha, p2.alpha)
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = '#00F0FF'
            ctx.globalAlpha = lineAlpha
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1.0
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // ── 2. Interactive Spotlight & 3D Tilt on Desktop ──────────────────────────
  useEffect(() => {
    const stage = stickyRef.current
    if (!stage || window.innerWidth < 768) return

    const spotXTo = gsap.quickTo(spotlightRef.current, 'x', { duration: 0.3, ease: 'power2.out' })
    const spotYTo = gsap.quickTo(spotlightRef.current, 'y', { duration: 0.3, ease: 'power2.out' })
    const tiltXTo = gsap.quickTo(contentRef.current, 'rotationX', { duration: 0.7, ease: 'power2.out' })
    const tiltYTo = gsap.quickTo(contentRef.current, 'rotationY', { duration: 0.7, ease: 'power2.out' })

    const handleMouseMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect()
      const xNorm = (e.clientX - rect.left) / rect.width - 0.5
      const yNorm = (e.clientY - rect.top) / rect.height - 0.5

      spotXTo(e.clientX)
      spotYTo(e.clientY)
      tiltXTo(-yNorm * 12)
      tiltYTo(xNorm * 14)
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

  // ── 3. GSAP Timeline & ScrollTrigger Zoom Scrub ───────────────────────────
  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const badge = badgeRef.current
    const ctas = ctasRef.current
    const statsBar = statsBarRef.current
    if (!container || !content) return

    const isMobile = window.innerWidth < 768

    const ctx = gsap.context(() => {
      // ── Entrance Split-Text Kinetic Reveal on Load ──
      const introTl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      introTl
        .fromTo(
          badge,
          { opacity: 0, y: -20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.2 }
        )
        .fromTo(
          '.hero-word-wrap',
          { yPercent: 120, opacity: 0, rotateX: -40, skewX: -6 },
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            skewX: 0,
            stagger: 0.06,
            duration: 1.1,
          },
          '-=0.5'
        )
        .fromTo(
          subtitle,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          ctas,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
          '-=0.5'
        )
        .fromTo(
          statsBar,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.5'
        )

      // ── Pinned 3D Perspective Zoom Scrub on Scroll ──
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: isMobile ? 0.3 : 0.8,
          pin: stickyRef.current,
          anticipatePin: 1,
        },
      })

      scrollTl
        // 1. Content scales up and rushes past camera with 3D depth
        .to(
          content,
          {
            scale: isMobile ? 1.8 : 2.6,
            z: 400,
            opacity: 0,
            ease: 'power1.in',
          },
          0
        )
        // 2. Canvas particle field stretches into a warp speed perspective
        .to(
          canvasRef.current,
          {
            scale: 1.4,
            opacity: 0.15,
            ease: 'none',
          },
          0
        )
        // 3. Title text shadow intensifies before dissolving
        .to(
          title,
          {
            letterSpacing: '0.08em',
            textShadow: '0 0 60px rgba(0, 240, 255, 0.9), 0 0 100px rgba(176, 38, 255, 0.7)',
            ease: 'none',
          },
          0
        )
    }, container)

    return () => ctx.revert()
  }, [])

  // ── Scroll to Target Helper ───────────────────────────────────────────────
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
      className="hero-section-container"
      aria-label="Inspire Zest Technologies — Hero"
    >
      <div ref={stickyRef} className="hero-sticky-stage">
        {/* Layer 1: Three.js / Canvas Interactive Constellation */}
        <canvas ref={canvasRef} className="hero-particle-canvas" aria-hidden="true" />

        {/* Layer 2: Interactive Mouse Spotlight */}
        <div ref={spotlightRef} className="hero-cursor-spotlight" aria-hidden="true" />

        {/* Layer 3: Ambient Radial Glows & Cyber Grids */}
        <div className="hero-ambient-glow hero-ambient-glow--cyan" aria-hidden="true" />
        <div className="hero-ambient-glow hero-ambient-glow--purple" aria-hidden="true" />
        <div className="hero-vignette" aria-hidden="true" />

        {/* Layer 4: Main 3D Perspective Content Box */}
        <div ref={contentRef} className="hero-3d-content">
          {/* Top Pill Badge */}
          <div ref={badgeRef} className="hero-badge" data-cursor="explore">
            <span className="hero-badge-pulse" aria-hidden="true" />
            <Sparkles className="hero-badge-icon" aria-hidden="true" size={14} />
            <span className="hero-badge-text">INSPIRE ZEST TECHNOLOGIES · NEXT-GEN WEB AGENCY</span>
            <span className="hero-badge-live">LIVE 2025</span>
          </div>

          {/* Kinetic Headline with Split Words */}
          <h1 ref={titleRef} className="hero-headline font-display">
            {titleWords.map((word, i) => (
              <span key={i} className="hero-word-outer">
                <span
                  className={`hero-word-wrap ${
                    word === 'Marketing' || word === 'Web' || word === 'Solutions'
                      ? 'hero-word-highlight'
                      : ''
                  }`}
                >
                  {word}&nbsp;
                </span>
              </span>
            ))}
          </h1>

          {/* Subtitle & Value Prop */}
          <p ref={subtitleRef} className="hero-subtext">
            We architect award-winning digital experiences, bespoke enterprise software, high-converting
            e-commerce platforms, and scalable growth strategies for category leaders worldwide.
          </p>

          {/* CTA Button Group */}
          <div ref={ctasRef} className="hero-cta-group">
            <button
              className="hero-btn-primary"
              onClick={scrollToProjects}
              data-cursor="view"
              aria-label="Explore our work"
            >
              <span>EXPLORE SELECTED WORK</span>
              <ArrowUpRight className="hero-btn-arrow" size={18} aria-hidden="true" />
            </button>
            <button
              className="hero-btn-secondary"
              onClick={scrollToContact}
              data-cursor="go"
              aria-label="Start a project with us"
            >
              <span>START A PROJECT</span>
              <div className="hero-btn-glow" aria-hidden="true" />
            </button>
          </div>

          {/* Key Quick Highlights Bar */}
          <div ref={statsBarRef} className="hero-quick-stats">
            <div className="hero-stat-pill">
              <ShieldCheck size={16} className="text-cyan-400" />
              <span>Awwwards Tier Motion</span>
            </div>
            <div className="hero-stat-divider" aria-hidden="true" />
            <div className="hero-stat-pill">
              <span className="hero-stat-bullet" />
              <span>99.8% System Uptime</span>
            </div>
            <div className="hero-stat-divider" aria-hidden="true" />
            <div className="hero-stat-pill">
              <span className="hero-stat-bullet hero-stat-bullet--purple" />
              <span>Offices in India & UAE</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          className="hero-scroll-hint"
          onClick={scrollToNext}
          aria-label="Scroll down to explore"
        >
          <span className="hero-scroll-mouse">
            <span className="hero-scroll-wheel" />
          </span>
          <span className="hero-scroll-label">SCROLL TO DISCOVER</span>
        </button>
      </div>
    </section>
  )
}
