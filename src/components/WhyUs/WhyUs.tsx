import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsap } from '@/hooks/useGsap'
import { Compass, Palette, Cpu, TrendingUp } from 'lucide-react'
import './WhyUs.css'

gsap.registerPlugin(ScrollTrigger)

const PILLARS = [
  {
    num: '01',
    title: 'Strategy',
    desc: 'Market architecture, high-growth roadmaps, and technical feasibility audits built for enterprise scale.',
    icon: Compass,
    color: '#00F5D4',
  },
  {
    num: '02',
    title: 'Design',
    desc: 'World-class human-computer interaction, Cupertino-grade aesthetics, and conversion-engineered interfaces.',
    icon: Palette,
    color: '#BF5AF2',
  },
  {
    num: '03',
    title: 'Technology',
    desc: 'Fullstack cloud-native web apps, edge architecture, sub-second latency, and rock-solid zero-downtime APIs.',
    icon: Cpu,
    color: '#2997FF',
  },
  {
    num: '04',
    title: 'Growth',
    desc: 'Automated conversion funnels, data telemetry, organic SEO dominancy, and sustained user retention.',
    icon: TrendingUp,
    color: '#30D158',
  },
]

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null)

  useGsap(
    () => {
      gsap.fromTo(
        '.why-heading-line',
        { yPercent: 120, rotateX: -35, opacity: 0 },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.why-heading',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.why-card',
        { opacity: 0, y: 40, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.why-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.why-body-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.why-body-card',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    },
    [],
    sectionRef
  )

  return (
    <section ref={sectionRef} id="why-us" className="why scene" aria-label="Why InspireZest">
      <div className="why-container">
        <div className="why-heading" aria-label="One partner. Multiple digital solutions.">
          <div className="why-wrap">
            <span className="why-heading-line font-display">ONE PARTNER.</span>
          </div>
          <div className="why-wrap why-wrap--dim">
            <span className="why-heading-line font-display">MULTIPLE DIGITAL</span>
          </div>
          <div className="why-wrap why-wrap--dim">
            <span className="why-heading-line font-display">SOLUTIONS.</span>
          </div>
        </div>

        {/* 4 Pillars Glass Card Grid */}
        <div className="why-grid" role="list" aria-label="Our core pillars">
          {PILLARS.map((p) => {
            const Icon = p.icon
            return (
              <div key={p.title} className="why-card" role="listitem">
                <div className="why-card-top">
                  <div
                    className="why-card-icon-wrap"
                    style={{ background: `${p.color}15`, borderColor: `${p.color}35` }}
                  >
                    <Icon size={22} style={{ color: p.color }} />
                  </div>
                  <span className="why-card-num font-display">{p.num}</span>
                </div>
                <h3 className="why-card-title font-display">{p.title}</h3>
                <p className="why-card-desc">{p.desc}</p>
              </div>
            )
          })}
        </div>

        {/* Summary Statement Card */}
        <div className="why-body-card">
          <p className="why-body font-display">
            From a single conversation to a complete digital transformation — <strong>InspireZest</strong>{' '}
            brings strategy, design, technology, and growth into one cohesive partnership. No handoffs.
            No gaps. One team, one goal.
          </p>
        </div>
      </div>
    </section>
  )
}
