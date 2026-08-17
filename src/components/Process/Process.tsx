import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsap } from '@/hooks/useGsap'
import './Process.css'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { num: '01', title: 'Discover',  desc: 'Understand your goals, market, and users.' },
  { num: '02', title: 'Define',    desc: 'Structure a clear strategy and scope.' },
  { num: '03', title: 'Design',    desc: 'Create purposeful, user-centred experiences.' },
  { num: '04', title: 'Develop',   desc: 'Build with precision, speed, and quality.' },
  { num: '05', title: 'Launch',    desc: 'Deploy, test, and prepare for the real world.' },
  { num: '06', title: 'Grow',      desc: 'Measure, refine, and expand what works.' },
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)

  useGsap(() => {
    // Animate the connecting line
    gsap.fromTo('.proc-line-fill',
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 60%',
          scrub: 1,
        }
      }
    )

    // Steps appear
    STEPS.forEach((_, i) => {
      const stepEl = document.querySelector(`.proc-step-${i}`)
      if (!stepEl) return

      gsap.fromTo(stepEl,
        { opacity: 0, x: -35, rotateY: -15 },
        {
          opacity: 1, x: 0, rotateY: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepEl,
            start: 'top 84%',
            toggleActions: 'play none none reverse',
          }
        }
      )

      gsap.fromTo(stepEl.querySelector('.proc-step-dot'),
        { scale: 0, backgroundColor: '#00D2FF' },
        {
          scale: 1,
          duration: 0.6,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: stepEl,
            start: 'top 84%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    })
  }, [], sectionRef)

  return (
    <section
      ref={sectionRef}
      id="process"
      className="proc scene"
      aria-label="How we work"
    >
      <div className="proc-container">
        <div className="proc-header">
          <span className="proc-tag" aria-hidden="true">09 — HOW WE WORK</span>
          <h2 className="proc-heading font-display">THE PROCESS</h2>
        </div>

        <div className="proc-layout">
          {/* Vertical line */}
          <div className="proc-line-track" aria-hidden="true">
            <div className="proc-line-fill" />
          </div>

          {/* Steps */}
          <div className="proc-steps">
            {STEPS.map((s, i) => (
              <div
                key={s.num}
                className={`proc-step proc-step-${i}`}
                aria-label={`Step ${s.num}: ${s.title}`}
              >
                <div className="proc-step-dot" aria-hidden="true" />
                <div className="proc-step-body">
                  <span className="proc-step-num" aria-hidden="true">{s.num}</span>
                  <h3 className="proc-step-title">{s.title}</h3>
                  <p className="proc-step-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
