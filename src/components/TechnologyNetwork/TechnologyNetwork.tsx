import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, Cpu, Layers } from 'lucide-react'
import './TechnologyNetwork.css'

gsap.registerPlugin(ScrollTrigger)

interface TechBadge {
  name: string
  category: string
  color: string
  icon: string
}

const TECH_ROW_1: TechBadge[] = [
  { name: 'Python', category: 'Backend & AI', color: '#3776AB', icon: '🐍' },
  { name: 'Django', category: 'Web Framework', color: '#092E20', icon: '⚡' },
  { name: 'React 19', category: 'Frontend UI', color: '#00F0FF', icon: '⚛️' },
  { name: 'Next.js 15', category: 'Fullstack SSR', color: '#FFFFFF', icon: '▲' },
  { name: 'Flutter', category: 'Mobile Apps', color: '#02569B', icon: '📱' },
  { name: 'PyTorch', category: 'Neural Networks', color: '#EE4C2C', icon: '🔥' },
  { name: 'TypeScript', category: 'Type Safety', color: '#3178C6', icon: '🔷' },
  { name: 'Node.js', category: 'Microservices', color: '#339933', icon: '🟢' },
]

const TECH_ROW_2: TechBadge[] = [
  { name: 'AWS Cloud', category: 'Infrastructure', color: '#FF9900', icon: '☁️' },
  { name: 'Three.js / WebGL', category: '3D Spatial', color: '#B026FF', icon: '🌐' },
  { name: 'PostgreSQL', category: 'Relational DB', color: '#4169E1', icon: '🐘' },
  { name: 'Docker', category: 'Containerization', color: '#2496ED', icon: '🐳' },
  { name: 'Tailwind CSS', category: 'Design Systems', color: '#38B2AC', icon: '🎨' },
  { name: 'GSAP Motion', category: '60fps Animation', color: '#00F5A0', icon: '✨' },
  { name: 'Redis Cache', category: 'High Speed IO', color: '#DC382D', icon: '⚡' },
  { name: 'GraphQL', category: 'API Protocol', color: '#E10098', icon: '◈' },
]

export default function TechnologyNetwork() {
  const sectionRef = useRef<HTMLElement>(null)
  const marquee1Ref = useRef<HTMLDivElement>(null)
  const marquee2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const m1 = marquee1Ref.current
    const m2 = marquee2Ref.current
    if (!section || !m1 || !m2) return

    const ctx = gsap.context(() => {
      // 1. Entrance animation
      gsap.fromTo(
        '.tech-header-anim',
        { opacity: 0, y: 30, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // 2. Velocity-Responsive Marquee Scrub via ScrollTrigger
      let lastScrollY = window.scrollY
      let velocity = 1

      const updateMarquee = () => {
        const currentScrollY = window.scrollY
        const delta = Math.abs(currentScrollY - lastScrollY)
        lastScrollY = currentScrollY

        // Boost velocity on fast scroll, smoothly decay back to base speed
        velocity += (delta * 0.08 - velocity) * 0.1
        velocity = Math.max(1, Math.min(velocity, 6))
      }

      window.addEventListener('scroll', updateMarquee, { passive: true })

      // Continuous infinite ticker
      let pos1 = 0
      let pos2 = 0

      const ticker = gsap.ticker.add(() => {
        pos1 -= 0.8 * velocity
        pos2 += 0.8 * velocity

        // Reset positions smoothly
        if (m1) {
          if (pos1 <= -m1.scrollWidth / 2) pos1 = 0
          m1.style.transform = `translate3d(${pos1}px, 0, 0)`
        }
        if (m2) {
          if (pos2 >= 0) pos2 = -m2.scrollWidth / 2
          m2.style.transform = `translate3d(${pos2}px, 0, 0)`
        }

        // Return velocity to 1
        velocity += (1 - velocity) * 0.05
      })

      return () => {
        window.removeEventListener('scroll', updateMarquee)
        gsap.ticker.remove(ticker)
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="technology"
      className="tech-marquee-section"
      aria-label="Inspire Zest Technology Stack"
    >
      <div className="tech-marquee-container">
        {/* Section Header */}
        <div className="tech-header-block">
          <div className="tech-tag tech-header-anim" aria-hidden="true">
            <Sparkles size={13} className="text-cyan-400" />
            <span>05 — ARCHITECTURAL STRENGTH</span>
          </div>
          <h2 className="tech-heading font-display tech-header-anim">
            BUILT ON <span className="tech-title-gradient">PROVEN TECHNOLOGY</span>
          </h2>
          <p className="tech-desc tech-header-anim">
            We employ cutting-edge, battle-tested frameworks engineered for raw performance, bank-grade
            security, and infinite horizontal scalability.
          </p>
        </div>

        {/* Marquee Row 1 (Leftward) */}
        <div className="marquee-wrapper" aria-hidden="true">
          <div ref={marquee1Ref} className="marquee-track">
            {[...TECH_ROW_1, ...TECH_ROW_1, ...TECH_ROW_1].map((tech, idx) => (
              <div key={`${tech.name}-${idx}`} className="tech-badge-card" data-cursor="explore">
                <span className="tech-badge-icon">{tech.icon}</span>
                <div className="tech-badge-info">
                  <span className="tech-badge-name font-display">{tech.name}</span>
                  <span className="tech-badge-cat">{tech.category}</span>
                </div>
                <div
                  className="tech-badge-glow"
                  style={{ background: tech.color }}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Row 2 (Rightward) */}
        <div className="marquee-wrapper marquee-wrapper--reverse" aria-hidden="true">
          <div ref={marquee2Ref} className="marquee-track">
            {[...TECH_ROW_2, ...TECH_ROW_2, ...TECH_ROW_2].map((tech, idx) => (
              <div key={`${tech.name}-${idx}`} className="tech-badge-card" data-cursor="explore">
                <span className="tech-badge-icon">{tech.icon}</span>
                <div className="tech-badge-info">
                  <span className="tech-badge-name font-display">{tech.name}</span>
                  <span className="tech-badge-cat">{tech.category}</span>
                </div>
                <div
                  className="tech-badge-glow"
                  style={{ background: tech.color }}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Feature Cards */}
        <div className="tech-pillars-grid">
          <div className="tech-pillar-card">
            <Cpu size={28} className="text-cyan-400 mb-3" />
            <h3 className="tech-pillar-title font-display">Modern AI & Microservices</h3>
            <p className="tech-pillar-desc">
              Decoupled, event-driven microservices designed with LLM integrations and automated
              background task workers.
            </p>
          </div>
          <div className="tech-pillar-card">
            <Layers size={28} className="text-purple-400 mb-3" />
            <h3 className="tech-pillar-title font-display">Zero Downtime Deployments</h3>
            <p className="tech-pillar-desc">
              Automated CI/CD pipelines, container orchestration, and multi-region CDN caching for
              lightning-fast response times.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
