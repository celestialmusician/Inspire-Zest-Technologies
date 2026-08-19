import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getLenis } from '@/hooks/useLenis'
import './ScrollProgress.css'

gsap.registerPlugin(ScrollTrigger)

interface NavSection {
  id: string
  label: string
  short: string
}

const SECTIONS: NavSection[] = [
  { id: 'hero',                   label: '01', short: 'HERO' },
  { id: 'tech-parallax-showcase', label: '02', short: 'SILICON' },
  { id: 'growth',                 label: '03', short: 'METRICS' },
  { id: 'intro',                  label: '04', short: 'MANIFESTO' },
  { id: 'services',               label: '05', short: 'SERVICES' },
  { id: 'projects',               label: '06', short: 'PORTFOLIO' },
  { id: 'technology',             label: '07', short: 'STACK' },
  { id: 'about',                  label: '08', short: 'FOUNDATION' },
  { id: 'process',                label: '09', short: 'ROADMAP' },
  { id: 'why-us',                 label: '10', short: 'WHY US' },
  { id: 'testimonials',           label: '11', short: 'REVIEWS' },
  { id: 'faq',                    label: '12', short: 'FAQ' },
  { id: 'final-cta',              label: '13', short: 'CONTACT' },
]

export default function ScrollProgress() {
  const topLaserRef     = useRef<HTMLDivElement>(null)
  const verticalFillRef = useRef<HTMLDivElement>(null)
  const percentRef      = useRef<HTMLSpanElement>(null)
  const [activeId, setActiveId] = useState<string>('hero')
  const [percent, setPercent]   = useState<number>(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Top Hairline & Vertical Progress Fill
      ScrollTrigger.create({
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const p = Math.round(self.progress * 100)
          setPercent(p)

          if (topLaserRef.current) {
            topLaserRef.current.style.transform = `scaleX(${self.progress})`
          }
          if (verticalFillRef.current) {
            verticalFillRef.current.style.transform = `scaleY(${self.progress})`
          }
          if (percentRef.current) {
            percentRef.current.textContent = `${String(p).padStart(2, '0')}%`
          }
        },
      })

      // 2. Section Active State Detection
      SECTIONS.forEach((sec) => {
        const el = document.getElementById(sec.id)
        if (!el) return

        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 55%',
          onEnter: () => setActiveId(sec.id),
          onEnterBack: () => setActiveId(sec.id),
        })
      })
    })

    return () => ctx.revert()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(el, { offset: 0, duration: 1.4 })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const activeSection = SECTIONS.find((s) => s.id === activeId) || SECTIONS[0]

  return (
    <>
      {/* 1. Top Cinematic Laser Progress Hairline */}
      <div className="scroll-top-laser-wrapper" aria-hidden="true">
        <div ref={topLaserRef} className="scroll-top-laser-fill" />
      </div>

      {/* 2. Floating Cybernetic Side-HUD Navigator */}
      <nav className="scroll-hud-rail" aria-label="Page scroll progress and section navigator">
        {/* Dynamic Percentage & Current Section Indicator */}
        <div className="scroll-hud-header">
          <span ref={percentRef} className="scroll-hud-percent font-display">
            {String(percent).padStart(2, '0')}%
          </span>
          <span className="scroll-hud-active-label font-display">{activeSection.short}</span>
        </div>

        {/* Vertical Glowing Track */}
        <div className="scroll-hud-track-wrap">
          <div className="scroll-hud-track">
            <div ref={verticalFillRef} className="scroll-hud-track-fill" />
          </div>

          {/* Interactive Section Nodes */}
          <div className="scroll-hud-nodes">
            {SECTIONS.map((sec) => {
              const isActive = activeId === sec.id
              return (
                <button
                  key={sec.id}
                  className={`scroll-hud-node ${isActive ? 'scroll-hud-node--active' : ''}`}
                  onClick={() => scrollTo(sec.id)}
                  aria-label={`Scroll to section: ${sec.short}`}
                  title={`${sec.label} — ${sec.short}`}
                >
                  <span className="scroll-node-dot" />
                  <span className="scroll-node-tooltip font-display">
                    {sec.label} · {sec.short}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>
    </>
  )
}
