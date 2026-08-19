import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code2, Users, FolderCheck, Trophy, Sparkles } from 'lucide-react'
import './Growth.css'

gsap.registerPlugin(ScrollTrigger)

interface StatItem {
  id: string
  number: number
  prefix?: string
  suffix: string
  label: string
  sublabel: string
  icon: typeof Code2
  color: string
  glowColor: string
}

const STATS: StatItem[] = [
  {
    id: 'code',
    number: 500,
    suffix: 'k+',
    label: 'Lines of Code',
    sublabel: 'Engineered with clean, type-safe architecture & unit tests',
    icon: Code2,
    color: '#00F0FF',
    glowColor: 'rgba(0, 240, 255, 0.25)',
  },
  {
    id: 'clients',
    number: 50,
    suffix: '+',
    label: 'Active Clients',
    sublabel: 'Empowering enterprise brands across India & Middle East',
    icon: Users,
    color: '#00F5A0',
    glowColor: 'rgba(0, 245, 160, 0.25)',
  },
  {
    id: 'projects',
    number: 120,
    suffix: '+',
    label: 'Completed Projects',
    sublabel: 'From high-conversion e-commerce to complex ERP portals',
    icon: FolderCheck,
    color: '#B026FF',
    glowColor: 'rgba(176, 38, 255, 0.25)',
  },
  {
    id: 'uptime',
    number: 99.8,
    suffix: '%',
    label: 'Client Satisfaction',
    sublabel: 'Delivering exceptional reliability, speed, and 24/7 support',
    icon: Trophy,
    color: '#FFB800',
    glowColor: 'rgba(255, 184, 0, 0.25)',
  },
]

export default function Growth() {
  const sectionRef = useRef<HTMLElement>(null)
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // 1. Header & Tag Reveal
      gsap.fromTo(
        '.stats-header-anim',
        { opacity: 0, y: 35, rotateX: -20 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // 2. Card Entrances with 3D Depth
      gsap.fromTo(
        '.stats-card',
        { opacity: 0, y: 50, scale: 0.92, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // 3. Scroll-Triggered Animated Number Counters
      STATS.forEach((stat, i) => {
        const el = numbersRef.current[i]
        if (!el) return

        const counterObj = { val: 0 }
        const isDecimal = stat.number % 1 !== 0

        gsap.to(counterObj, {
          val: stat.number,
          duration: 2.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: () => {
            el.textContent = isDecimal
              ? counterObj.val.toFixed(1)
              : Math.floor(counterObj.val).toString()
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="growth"
      className="stats-section"
      aria-label="Inspire Zest Performance Metrics"
    >
      <div className="stats-container">
        {/* Section Header */}
        <div className="stats-header">
          <h2 className="stats-title font-display stats-header-anim">
            SCALE POWERED BY <span className="stats-title-gradient">PRECISION</span>
          </h2>
          <p className="stats-desc stats-header-anim">
            We don't just write code — we build scalable digital infrastructure that drives measurable
            revenue, customer loyalty, and technological supremacy.
          </p>
        </div>

        {/* 4-Column Neon Glass Cards Grid */}
        <div className="stats-grid" role="list" aria-label="Key Performance Indicators">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.id}
                className="stats-card"
                role="listitem"
                style={
                  {
                    '--card-accent': stat.color,
                    '--card-glow': stat.glowColor,
                  } as React.CSSProperties
                }
                data-cursor="explore"
              >
                {/* Glowing Corner Indicator */}
                <div className="stats-card-glow" aria-hidden="true" />
                <div className="stats-card-border" aria-hidden="true" />

                {/* Top Icon Badge */}
                <div className="stats-card-icon-wrap" aria-hidden="true">
                  <Icon size={24} style={{ color: stat.color }} />
                </div>

                {/* Live Number Counter */}
                <div className="stats-card-number-row">
                  {stat.prefix && <span className="stats-card-prefix">{stat.prefix}</span>}
                  <span
                    ref={(el) => {
                      numbersRef.current[idx] = el
                    }}
                    className="stats-card-digits font-display"
                  >
                    0
                  </span>
                  <span className="stats-card-suffix font-display" style={{ color: stat.color }}>
                    {stat.suffix}
                  </span>
                </div>

                {/* Label & Description */}
                <h3 className="stats-card-label font-display">{stat.label}</h3>
                <p className="stats-card-sublabel">{stat.sublabel}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
