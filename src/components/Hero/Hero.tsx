import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas } from '@react-three/fiber'
import DigitalCore from '@/components/DigitalCore'
import { useWebGLCapability } from '@/hooks/useWebGLCapability'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

const WORDS = ['WE BUILD', 'DIGITAL', 'EXPERIENCES.']

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headingRef  = useRef<HTMLDivElement>(null)
  const subRef      = useRef<HTMLParagraphElement>(null)
  const ctasRef     = useRef<HTMLDivElement>(null)
  const overlayRef  = useRef<HTMLDivElement>(null)
  const canvasRef   = useRef<HTMLDivElement>(null)
  const { supportsWebGL, tier } = useWebGLCapability()

  // Initial reveal animation (after loading screen) + Mouse Parallax
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })
      tl.fromTo(
        '.hero-label',
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(
        '.hero-word',
        { yPercent: 120, rotateX: -45, skewX: -6, opacity: 0 },
        { yPercent: 0, rotateX: 0, skewX: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power4.out' },
        '-=0.5'
      )
      .fromTo(subRef.current,
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(ctasRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.4)' },
        '-=0.5'
      )

      // Subtle mouse parallax tracking on heading
      const xTo = gsap.quickTo('.hero-content', 'x', { duration: 0.6, ease: 'power2.out' })
      const yTo = gsap.quickTo('.hero-content', 'y', { duration: 0.6, ease: 'power2.out' })

      const handleMouse = (e: MouseEvent) => {
        const cx = window.innerWidth / 2
        const cy = window.innerHeight / 2
        const dx = (e.clientX - cx) / cx
        const dy = (e.clientY - cy) / cy
        xTo(dx * 18)
        yTo(dy * 12)
      }
      window.addEventListener('mousemove', handleMouse)
      return () => window.removeEventListener('mousemove', handleMouse)
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Scroll-driven exit
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
          pin: false,
        }
      })
      tl.to('.hero-word', {
        yPercent: -40,
        opacity: 0,
        rotateX: 30,
        stagger: 0.05,
        ease: 'none',
      }, 0)
      .to(subRef.current, { opacity: 0, y: -30, filter: 'blur(6px)', ease: 'none' }, 0)
      .to(ctasRef.current, { opacity: 0, y: -20, ease: 'none' }, 0)
      .to(canvasRef.current, {
        scale: 1.15,
        ease: 'none',
      }, 0)
      .to(overlayRef.current, {
        opacity: 1,
        ease: 'none',
      }, 0)
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const scrollToWork = () => {
    const el = document.getElementById('projects')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero"
      aria-label="InspireZest Technologies — Hero"
    >
      {/* 3D Canvas */}
      <div ref={canvasRef} className="hero-canvas" aria-hidden="true">
        {supportsWebGL ? (
          <Canvas
            camera={{ position: [0, 0, 5], fov: 55 }}
            dpr={tier === 'high' ? [1, 2] : [1, 1.5]}
            gl={{ antialias: tier !== 'low', alpha: true }}
          >
            <DigitalCore tier={tier} />
          </Canvas>
        ) : (
          <div className="hero-canvas-fallback" aria-hidden="true" />
        )}
      </div>

      {/* Gradient overlay (darkens as scroll progresses) */}
      <div ref={overlayRef} className="hero-exit-overlay" aria-hidden="true" />

      {/* Content */}
      <div className="hero-content">
        {/* Scene label */}
        <span className="hero-label" aria-hidden="true">01 — DIGITAL STUDIO</span>

        {/* Main heading */}
        <div ref={headingRef} className="hero-heading" aria-label="We build digital experiences.">
          {WORDS.map((word, i) => (
            <div key={i} className="hero-word-wrap" aria-hidden="true">
              <span className="hero-word font-display">{word}</span>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <p ref={subRef} className="hero-sub">
          Technology, design and digital growth solutions<br className="hero-br" />
          for businesses ready to move forward.
        </p>

        {/* CTAs */}
        <div ref={ctasRef} className="hero-ctas">
          <button
            className="hero-btn-primary"
            onClick={scrollToWork}
            data-cursor="view"
            aria-label="Explore our work"
          >
            EXPLORE OUR WORK
            <span className="hero-btn-arrow" aria-hidden="true"> →</span>
          </button>
          <button
            className="hero-btn-secondary"
            onClick={scrollToContact}
            data-cursor="go"
            aria-label="Start a project with us"
          >
            START A PROJECT
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-hint" aria-hidden="true">
        <span className="hero-scroll-text">SCROLL</span>
        <div className="hero-scroll-line" />
      </div>

      {/* Location tag */}
      <div className="hero-location" aria-hidden="true">
        KOLLAM · KERALA · IN
      </div>
    </section>
  )
}
