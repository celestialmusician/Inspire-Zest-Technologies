import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getLenis } from '@/hooks/useLenis'
import TextScramble from '@/components/TextScramble'
import { ArrowUpRight, Sparkles, ChevronDown } from 'lucide-react'
import './PortalOpeningHero.css'

gsap.registerPlugin(ScrollTrigger)

export default function PortalOpeningHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef    = useRef<HTMLDivElement>(null)
  const bgImgRef     = useRef<HTMLImageElement>(null)
  const contentRef   = useRef<HTMLDivElement>(null)
  const badgeRef     = useRef<HTMLDivElement>(null)
  const titleRef     = useRef<HTMLHeadingElement>(null)
  const subtitleRef  = useRef<HTMLParagraphElement>(null)
  const ctasRef      = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const statsBarRef  = useRef<HTMLDivElement>(null)

  // ── 1. Interactive Mouse Spotlight & Kinetic Camera Parallax ──────────────
  useEffect(() => {
    const stage = stickyRef.current
    const content = contentRef.current
    const bgImg = bgImgRef.current
    if (!stage || !content || window.innerWidth < 1024) return

    const spotXTo = gsap.quickTo(spotlightRef.current, 'x', { duration: 0.4, ease: 'power2.out' })
    const spotYTo = gsap.quickTo(spotlightRef.current, 'y', { duration: 0.4, ease: 'power2.out' })
    const tiltXTo = gsap.quickTo(content, 'rotationX', { duration: 0.6, ease: 'power2.out' })
    const tiltYTo = gsap.quickTo(content, 'rotationY', { duration: 0.6, ease: 'power2.out' })
    const bgMoveXTo = gsap.quickTo(bgImg, 'x', { duration: 0.8, ease: 'power2.out' })
    const bgMoveYTo = gsap.quickTo(bgImg, 'y', { duration: 0.8, ease: 'power2.out' })

    const handleMouseMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect()
      const xNorm = (e.clientX - rect.left) / rect.width - 0.5
      const yNorm = (e.clientY - rect.top) / rect.height - 0.5

      spotXTo(e.clientX)
      spotYTo(e.clientY)
      tiltXTo(-yNorm * 8)
      tiltYTo(xNorm * 10)
      bgMoveXTo(-xNorm * 25)
      bgMoveYTo(-yNorm * 25)
    }

    const handleMouseLeave = () => {
      tiltXTo(0)
      tiltYTo(0)
      bgMoveXTo(0)
      bgMoveYTo(0)
    }

    stage.addEventListener('mousemove', handleMouseMove)
    stage.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      stage.removeEventListener('mousemove', handleMouseMove)
      stage.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // ── 2. GSAP Split-Text Kinetic Typography & Scrub ─────────────────────────
  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    const bgImg = bgImgRef.current
    if (!container || !content) return

    const isMobile = window.innerWidth < 768

    const ctx = gsap.context(() => {
      // 1. Kinetic Entrance Timeline on Load
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      loadTl
        .fromTo(
          bgImg,
          { scale: 1.15, opacity: 0 },
          { scale: 1.04, opacity: 0.7, duration: 1.4, ease: 'power2.out' }
        )
        .fromTo(
          badgeRef.current,
          { opacity: 0, y: -20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 },
          '-=1.0'
        )
        // Split-Text Kinetic Typography Animation
        .fromTo(
          '.hero-split-word',
          { yPercent: 130, rotateX: -45, opacity: 0, filter: 'blur(8px)' },
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            filter: 'blur(0px)',
            stagger: 0.06,
            duration: 1.2,
            ease: 'power4.out',
          },
          '-=0.7'
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
          statsBarRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        )

      // 2. Pinned Fullscreen Parallax & Zoom Scrub on Scroll
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
          bgImg,
          {
            scale: isMobile ? 1.25 : 1.35,
            opacity: 0.25,
            ease: 'none',
          },
          0
        )
        .to(
          content,
          {
            scale: isMobile ? 1.3 : 1.5,
            z: 200,
            opacity: 0,
            y: -50,
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
        {/* Layer 1: Fullscreen High-Resolution Tech Photo Background */}
        <div className="apple-hero-bg-wrapper" aria-hidden="true">
          <img
            ref={bgImgRef}
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2400&auto=format&fit=crop"
            alt="Cybernetic Tech Matrix Background"
            className="apple-hero-bg-image"
            loading="eager"
            decoding="async"
          />
          {/* Cinematic Dark Vignette & Mesh Gradient Overlay */}
          <div className="apple-hero-bg-overlay" />
        </div>

        {/* Layer 2: Interactive Specular Spotlight */}
        <div ref={spotlightRef} className="apple-hero-spotlight" aria-hidden="true" />

        {/* Layer 3: Main Apple Keynote Content Box */}
        <div ref={contentRef} className="apple-hero-content">
          {/* Top Titanium Pill with Text Scramble / Decryption */}
          <div ref={badgeRef} className="apple-pill-badge" data-cursor="explore">
            <span className="apple-badge-dot" aria-hidden="true" />
            <TextScramble text="INSPIRE ZEST TECHNOLOGIES" speed={25} />
            <span className="apple-badge-sep">/</span>
            <TextScramble text="PRO ARCHITECTURE" speed={25} className="apple-badge-dim" />
          </div>

          {/* Kinetic 3D Split-Text Headline */}
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

          {/* Quick Highlight Floating Tray with Text Decryption */}
          <div ref={statsBarRef} className="apple-hero-quick-tray">
            <div className="apple-tray-item">
              <Sparkles size={14} className="text-cyan-400" />
              <TextScramble text="Award-Winning Motion" speed={30} />
            </div>
            <div className="apple-tray-dot" />
            <div className="apple-tray-item">
              <TextScramble text="99.8% System Uptime" speed={30} />
            </div>
            <div className="apple-tray-dot" />
            <div className="apple-tray-item">
              <TextScramble text="India & UAE Hubs" speed={30} />
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
