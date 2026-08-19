import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import './FinalCTA.css'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onContact: () => void
}

export default function FinalCTA({ onContact }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const btn = btnRef.current
    if (!section || !btn) return

    const ctx = gsap.context(() => {
      // 1. Text & Headline Reveal Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.fromTo(
        '.fcta-tag-anim',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
        .fromTo(
          '.fcta-line-1',
          { yPercent: 120, rotateX: -30, opacity: 0 },
          { yPercent: 0, rotateX: 0, opacity: 1, duration: 1.1, ease: 'power4.out' },
          '-=0.5'
        )
        .fromTo(
          '.fcta-line-2',
          { yPercent: 120, rotateX: -30, opacity: 0 },
          { yPercent: 0, rotateX: 0, opacity: 1, duration: 1.1, ease: 'power4.out' },
          '-=0.85'
        )
        .fromTo(
          btn,
          { opacity: 0, scale: 0.85, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'back.out(1.8)' },
          '-=0.6'
        )
        .fromTo(
          '.fcta-sub-anim',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        )

      // 2. High-Precision Magnetic Button Physics
      const xTo = gsap.quickTo(btn, 'x', { duration: 0.35, ease: 'power2.out' })
      const yTo = gsap.quickTo(btn, 'y', { duration: 0.35, ease: 'power2.out' })

      const onMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        xTo(x * 0.35)
        yTo(y * 0.35)
      }

      const onMouseLeave = () => {
        xTo(0)
        yTo(0)
      }

      btn.addEventListener('mousemove', onMouseMove)
      btn.addEventListener('mouseleave', onMouseLeave)

      return () => {
        btn.removeEventListener('mousemove', onMouseMove)
        btn.removeEventListener('mouseleave', onMouseLeave)
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="final-cta"
      className="fcta-award-section"
      aria-label="Start a project with Inspire Zest"
    >
      <div className="fcta-container">
        {/* Tag */}
        <div className="fcta-tag fcta-tag-anim" aria-hidden="true">
          <Sparkles size={13} className="text-cyan-400" />
          <span>07 — INITIATE COLLABORATION</span>
        </div>

        {/* Big Kinetic Headline */}
        <div className="fcta-headline" aria-label="Let's build something great together.">
          <div className="fcta-overflow-wrap">
            <span className="fcta-line-1 font-display">HAVE AN AMBITIOUS VISION?</span>
          </div>
          <div className="fcta-overflow-wrap">
            <span className="fcta-line-2 font-display fcta-highlight">
              LET'S BUILD SOMETHING GREAT.
            </span>
          </div>
        </div>

        {/* Magnetic High-Impact Button */}
        <button
          ref={btnRef}
          className="fcta-magnetic-btn"
          onClick={onContact}
          data-cursor="go"
          aria-label="Start a project with Inspire Zest"
        >
          <span>START A PROJECT NOW</span>
          <ArrowUpRight size={22} className="fcta-btn-icon" aria-hidden="true" />
        </button>

        <p className="fcta-subtext fcta-sub-anim">
          Tell us about your objectives. We will deliver a strategic tech proposal & roadmap within 24
          hours.
        </p>
      </div>

      {/* Ambient Glows */}
      <div className="fcta-glow-mesh" aria-hidden="true" />
    </section>
  )
}
