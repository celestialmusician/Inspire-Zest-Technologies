import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsap } from '@/hooks/useGsap'
import './Intro.css'

gsap.registerPlugin(ScrollTrigger)

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null)

  useGsap(() => {
    const lines = gsap.utils.toArray<HTMLElement>('.intro-line')

    lines.forEach((line, i) => {
      gsap.fromTo(line,
        { yPercent: 120, rotateX: -40, skewY: 3, opacity: 0, filter: 'blur(10px)' },
        {
          yPercent: 0,
          rotateX: 0,
          skewY: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.1,
          delay: i * 0.08,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    gsap.fromTo('.intro-body p',
      { opacity: 0, y: 35, filter: 'blur(4px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.intro-body',
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Continuous scroll parallax drift
    gsap.to('.intro-inner', {
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    })
  }, [], sectionRef)

  return (
    <section ref={sectionRef} id="intro" className="intro scene" aria-label="Introduction">
      <div className="intro-inner">
        <div className="intro-tag" aria-hidden="true">
          <span>03</span>
          <span>WHO WE ARE</span>
        </div>

        <div className="intro-headline" role="heading" aria-level={2}>
          <div className="intro-wrap"><span className="intro-line font-display">WE DON'T JUST</span></div>
          <div className="intro-wrap"><span className="intro-line font-display">BUILD SOFTWARE.</span></div>
          <div className="intro-spacer" aria-hidden="true" />
          <div className="intro-wrap intro-wrap--accent">
            <span className="intro-line font-display">WE BUILD</span>
          </div>
          <div className="intro-wrap intro-wrap--accent">
            <span className="intro-line font-display">WHAT COMES NEXT.</span>
          </div>
        </div>

        <div className="intro-body">
          <p>
            InspireZest Technologies is a digital solutions company based in Kollam, Kerala.
            We partner with businesses to design, build, and grow their digital presence — from
            concept to launch, and from launch to scale.
          </p>
          <p>
            Our work spans web development, mobile applications, enterprise software, digital
            marketing, and creative branding. Every project begins with a clear strategy and
            ends with a measurable result.
          </p>
        </div>
      </div>

      {/* Decorative grid lines */}
      <div className="intro-grid" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="intro-grid-line" />
        ))}
      </div>
    </section>
  )
}
