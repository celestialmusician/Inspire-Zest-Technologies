import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, Search, Compass, Palette, Code2, Rocket, TrendingUp } from 'lucide-react'
import './Process.css'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num: '01',
    title: 'Discovery & Strategic Audit',
    desc: 'Deep-dive analysis of your core business architecture, target demographic, and market competitors.',
    icon: Search,
  },
  {
    num: '02',
    title: 'Architecture & System Design',
    desc: 'Defining technical stack specifications, database models, and high-conversion UX wireframes.',
    icon: Compass,
  },
  {
    num: '03',
    title: 'Spatial UI / Visual Craft',
    desc: 'World-class visual aesthetics, custom micro-interactions, and 60fps kinetic motion design.',
    icon: Palette,
  },
  {
    num: '04',
    title: 'High-Velocity Engineering',
    desc: 'Writing clean, modern, modular TypeScript/React and robust cloud-native backend APIs.',
    icon: Code2,
  },
  {
    num: '05',
    title: 'Global Launch & Edge CDN',
    desc: 'End-to-end automated testing, performance auditing, and deployment to high-availability global edge networks.',
    icon: Rocket,
  },
  {
    num: '06',
    title: 'Continuous Scale & AI Insights',
    desc: 'Proactive telemetry monitoring, conversion optimization, and continuous feature expansion.',
    icon: TrendingUp,
  },
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Animate vertical progress line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.cinematic-proc-steps',
              start: 'top 70%',
              end: 'bottom 80%',
              scrub: true,
            },
          }
        )
      }

      // Step cards stagger reveal
      gsap.fromTo(
        '.cinematic-proc-card',
        { opacity: 0, x: -30, scale: 0.96 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cinematic-proc-steps',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="process"
      className="cinematic-proc-section"
      aria-label="Engineering Process"
    >
      <div className="cinematic-proc-container">
        <div className="cinematic-proc-header">
          <h2 className="cinematic-proc-title font-display">
            HOW WE BUILD <span className="text-titanium">THE IMPOSSIBLE</span>
          </h2>
          <p className="cinematic-proc-sub">
            A battle-tested 6-phase engineering lifecycle designed to minimize risk and maximize
            market velocity.
          </p>
        </div>

        <div className="cinematic-proc-layout">
          {/* Vertical Glowing Progress Line */}
          <div className="cinematic-proc-track" aria-hidden="true">
            <div ref={lineRef} className="cinematic-proc-line-fill" />
          </div>

          {/* Steps List */}
          <div className="cinematic-proc-steps">
            {STEPS.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.num} className="cinematic-proc-card">
                  <div className="cinematic-proc-node" aria-hidden="true">
                    <span className="cinematic-node-dot" />
                  </div>

                  <div className="cinematic-proc-card-inner">
                    <div className="cinematic-proc-icon-box">
                      <Icon size={18} className="text-cyan-400" />
                      <span className="cinematic-proc-num font-display">{s.num}</span>
                    </div>
                    <div className="cinematic-proc-text">
                      <h3 className="cinematic-proc-card-title font-display">{s.title}</h3>
                      <p className="cinematic-proc-card-desc">{s.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
