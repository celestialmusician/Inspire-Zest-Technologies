import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextScramble from '@/components/TextScramble'
import { Cpu, Zap, ShieldCheck, Sparkles } from 'lucide-react'
import './TechParallaxShowcase.css'

gsap.registerPlugin(ScrollTrigger)

export default function TechParallaxShowcase() {
  const containerRef = useRef<HTMLElement>(null)
  const windowRef    = useRef<HTMLDivElement>(null)
  const imageRef     = useRef<HTMLImageElement>(null)
  const textGroupRef = useRef<HTMLDivElement>(null)
  const chipsRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const windowEl = windowRef.current
    const image = imageRef.current
    const textGroup = textGroupRef.current
    const chips = chipsRef.current
    if (!container || !image || !windowEl) return

    const ctx = gsap.context(() => {
      // 1. Masked Reveal / Clip-Path Wipe Animation on the Showcase Window
      gsap.fromTo(
        windowEl,
        { clipPath: 'polygon(0% 15%, 100% 0%, 100% 85%, 0% 100%)', scale: 0.94, opacity: 0.6 },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            end: 'top 30%',
            scrub: true,
          },
        }
      )

      // 2. Parallax scrub on the high-res tech image
      gsap.fromTo(
        image,
        { yPercent: -18, scale: 1.18 },
        {
          yPercent: 18,
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

      // 3. Kinetic Split-Text & Typography Reveal
      if (textGroup) {
        gsap.fromTo(
          textGroup.querySelectorAll('.parallax-reveal'),
          { opacity: 0, y: 40, rotateX: -25, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            stagger: 0.12,
            duration: 1.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      if (chips) {
        gsap.fromTo(
          chips.children,
          { opacity: 0, scale: 0.9, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'back.out(1.5)',
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
      {/* Masked Clip-Path Reveal Window */}
      <div ref={windowRef} className="tech-parallax-window">
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2400&auto=format&fit=crop"
          alt="Quantum Microarchitecture Silicon Core"
          className="tech-parallax-img"
          loading="lazy"
          decoding="async"
        />
        <div className="tech-parallax-overlay" aria-hidden="true" />
      </div>

      {/* Floating Keynote Typography & Glass Indicators */}
      <div className="tech-parallax-content">
        <div ref={textGroupRef} className="tech-parallax-text-box">
          <div className="tech-parallax-pill parallax-reveal" aria-hidden="true">
            <Sparkles size={14} className="text-cyan-400" />
            <TextScramble text="02 — SILICON-GRADE PERFORMANCE" speed={25} />
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

        {/* Floating Apple-Grade Frosted Glass Metric Pills with Text Scramble */}
        <div ref={chipsRef} className="tech-parallax-chips-row" role="list">
          <div className="tech-parallax-chip" role="listitem" data-cursor="explore">
            <div className="tech-chip-icon">
              <Cpu size={16} className="text-cyan-400" />
            </div>
            <div className="tech-chip-info">
              <span className="tech-chip-val font-display">
                <TextScramble text="Sub-10ms" speed={35} />
              </span>
              <span className="tech-chip-label">Edge Execution</span>
            </div>
          </div>

          <div className="tech-parallax-chip" role="listitem" data-cursor="explore">
            <div className="tech-chip-icon">
              <Zap size={16} className="text-purple-400" />
            </div>
            <div className="tech-chip-info">
              <span className="tech-chip-val font-display">
                <TextScramble text="60 FPS" speed={35} />
              </span>
              <span className="tech-chip-label">Cinematic Motion</span>
            </div>
          </div>

          <div className="tech-parallax-chip" role="listitem" data-cursor="explore">
            <div className="tech-chip-icon">
              <ShieldCheck size={16} className="text-emerald-400" />
            </div>
            <div className="tech-chip-info">
              <span className="tech-chip-val font-display">
                <TextScramble text="99.99%" speed={35} />
              </span>
              <span className="tech-chip-label">Fault Tolerance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
