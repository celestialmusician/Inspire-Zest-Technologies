import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsap } from '@/hooks/useGsap'
import './FinalCTA.css'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onContact: () => void
}

export default function FinalCTA({ onContact }: Props) {
  const sectionRef = useRef<HTMLElement>(null)

  useGsap(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      }
    })

    tl.fromTo('.fcta-tag',
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo('.fcta-line1',
      { yPercent: 130, rotateX: -45, skewX: -5, opacity: 0 },
      { yPercent: 0, rotateX: 0, skewX: 0, opacity: 1, duration: 1.2, ease: 'power4.out' },
      '-=0.5'
    )
    .fromTo('.fcta-line2',
      { yPercent: 130, rotateX: -45, skewX: -5, opacity: 0 },
      { yPercent: 0, rotateX: 0, skewX: 0, opacity: 1, duration: 1.2, ease: 'power4.out' },
      '-=0.85'
    )
    .fromTo('.fcta-btn',
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.6)' },
      '-=0.6'
    )
    .fromTo('.fcta-sub',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    )

    // Magnetic button physics
    const btn = document.querySelector('.fcta-btn')
    if (btn) {
      const xTo = gsap.quickTo(btn, 'x', { duration: 0.3, ease: 'power2.out' })
      const yTo = gsap.quickTo(btn, 'y', { duration: 0.3, ease: 'power2.out' })

      btn.addEventListener('mousemove', (e: Event) => {
        const me = e as MouseEvent
        const rect = (btn as HTMLElement).getBoundingClientRect()
        const x = me.clientX - rect.left - rect.width / 2
        const y = me.clientY - rect.top - rect.height / 2
        xTo(x * 0.3)
        yTo(y * 0.3)
      })
      btn.addEventListener('mouseleave', () => {
        xTo(0)
        yTo(0)
      })
    }
  }, [], sectionRef)

  return (
    <section
      ref={sectionRef}
      id="final-cta"
      className="fcta scene"
      aria-label="Start a project"
    >
      <div className="fcta-container">
        <span className="fcta-tag" aria-hidden="true">13 — LET'S BEGIN</span>

        <div className="fcta-headline" aria-label="Have an idea? Let's build it.">
          <div className="fcta-wrap">
            <span className="fcta-line1 font-display">HAVE AN IDEA?</span>
          </div>
          <div className="fcta-wrap fcta-wrap--dim">
            <span className="fcta-line2 font-display">LET'S BUILD IT.</span>
          </div>
        </div>

        <button
          className="fcta-btn"
          onClick={onContact}
          data-cursor="go"
          aria-label="Start a project with InspireZest"
        >
          START A PROJECT
          <span className="fcta-btn-arrow" aria-hidden="true">→</span>
        </button>

        <p className="fcta-sub">
          Tell us what you're building. We'll tell you how we can help.
        </p>
      </div>

      {/* Ambient glow */}
      <div className="fcta-glow" aria-hidden="true" />
    </section>
  )
}
