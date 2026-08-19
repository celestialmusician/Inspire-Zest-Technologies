import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Cpu, Zap, ShieldCheck, Sparkles } from 'lucide-react'
import './TechParallaxShowcase.css'

gsap.registerPlugin(ScrollTrigger)

export default function TechParallaxShowcase() {
  const containerRef = useRef<HTMLElement>(null)
  const imageRef     = useRef<HTMLImageElement>(null)
  const overlayRef   = useRef<HTMLDivElement>(null)
  const textGroupRef = useRef<HTMLDivElement>(null)
  const chipsRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const image = imageRef.current
    const textGroup = textGroupRef.current
    const chips = chipsRef.current
    if (!container || !image) return

    const isMobile = window.innerWidth < 768

    const ctx = gsap.context(() => {
      // 1. Parallax scrub on the high-res tech image
      gsap.fromTo(
        image,
        { yPercent: -15, scale: 1.15 },
        {
          yPercent: 15,
          scale: 1.0,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

      // 2. Smooth reveal of floating text and chips
      if (textGroup) {
        gsap.fromTo(
          textGroup.querySelectorAll('.parallax-reveal'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      if (chips) {
        gsap.fromTo(
          chips.children,
          { opacity: 0, scale: 0.9, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: container,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="tech-parallax-showcase"
      className="tech-parallax-section"
      aria-label="High Performance Digital Architecture Showcase"
    >
      {/* Parallax Image Frame */}
      <div className="tech-parallax-window">
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2400&auto=format&fit=crop"
          alt="Quantum Microarchitecture Silicon Core"
          className="tech-parallax-img"
          loading="lazy"
          decoding="async"
        />
        {/* Dark specular gradient vignette */}
        <div ref={overlayRef} className="tech-parallax-overlay" aria-hidden="true" />
      </div>

      {/* Floating Keynote Typography & Glass Indicators */}
      <div className="tech-parallax-content">
        <div ref={textGroupRef} className="tech-parallax-text-box">
          <div className="tech-parallax-pill parallax-reveal" aria-hidden="true">
            <Sparkles size={14} className="text-cyan-400" />
            <span>02 — SILICON-GRADE PERFORMANCE</span>
          </div>

          <h2 className="tech-parallax-title font-display parallax-reveal">
            ENGINEERED AT THE <br />
            <span className="tech-parallax-gradient">SPEED OF LIGHT</span>
          </h2>

          <p className="tech-parallax-desc parallax-reveal">
            From distributed microservices to real-time spatial rendering, our software engines are
            built to deliver flawless performance at global scale.
          </p>
        </div>

        {/* Floating Apple-Grade Frosted Glass Metric Pills */}
        <div ref={chipsRef} className="tech-parallax-chips-row" role="list">
          <div className="tech-parallax-chip" role="listitem">
            <div className="tech-chip-icon">
              <Cpu size={16} className="text-cyan-400" />
            </div>
            <div className="tech-chip-info">
              <span className="tech-chip-val">Sub-10ms</span>
              <span className="tech-chip-label">Edge Execution</span>
            </div>
          </div>

          <div className="tech-parallax-chip" role="listitem">
            <div className="tech-chip-icon">
              <Zap size={16} className="text-purple-400" />
            </div>
            <div className="tech-chip-info">
              <span className="tech-chip-val">60 FPS</span>
              <span className="tech-chip-label">Cinematic Motion</span>
            </div>
          </div>

          <div className="tech-parallax-chip" role="listitem">
            <div className="tech-chip-icon">
              <ShieldCheck size={16} className="text-emerald-400" />
            </div>
            <div className="tech-chip-info">
              <span className="tech-chip-val">99.99%</span>
              <span className="tech-chip-label">Fault Tolerance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
