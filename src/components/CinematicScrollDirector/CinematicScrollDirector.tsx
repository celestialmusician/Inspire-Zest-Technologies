import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CinematicScrollDirector.css'

gsap.registerPlugin(ScrollTrigger)

export default function CinematicScrollDirector() {
  const flareRef = useRef<HTMLDivElement>(null)
  const topMatteRef = useRef<HTMLDivElement>(null)
  const botMatteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // 1. Dynamic Anamorphic Flare responding to scroll velocity
      let lastScroll = window.scrollY
      let flareOpacityTo = gsap.quickTo(flareRef.current, 'opacity', { duration: 0.35, ease: 'power2.out' })
      let flareScaleTo = gsap.quickTo(flareRef.current, 'scaleX', { duration: 0.35, ease: 'power2.out' })

      const handleScroll = () => {
        const currentScroll = window.scrollY
        const velocity = Math.abs(currentScroll - lastScroll)
        lastScroll = currentScroll

        const intensity = Math.min(velocity / 60, 1)
        flareOpacityTo(intensity * 0.7)
        flareScaleTo(0.6 + intensity * 0.8)
      }

      window.addEventListener('scroll', handleScroll, { passive: true })

      // 2. Cinematic 3D Camera Depth Transitions for all main sections
      const sections = document.querySelectorAll(
        '#hero, #tech-parallax-showcase, #growth, #intro, #services, #projects, #technology, #about, #process, #why-us, #testimonials, #faq, #final-cta, #contact, .footer-award'
      )

      sections.forEach((section) => {
        // Entry & Exit 3D Camera Dolly
        gsap.fromTo(
          section,
          {
            scale: 0.94,
            rotateX: 3,
            transformPerspective: 1400,
            transformOrigin: 'center top',
            filter: 'blur(6px)',
            opacity: 0.8,
          },
          {
            scale: 1,
            rotateX: 0,
            filter: 'blur(0px)',
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 90%',
              end: 'top 25%',
              scrub: 1.2,
            },
          }
        )

        // Exit parallax recession into deep space
        gsap.to(section, {
          scale: 0.96,
          rotateX: -2.5,
          filter: 'blur(4px)',
          opacity: 0.65,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: section,
            start: 'bottom 40%',
            end: 'bottom -10%',
            scrub: 1.2,
          },
        })
      })

      // 3. Multi-layer Floating Depth Parallax on Cards & Glass Bezels
      const cards = document.querySelectorAll(
        '.stats-card, .cinematic-intro-card, .apple-service-card, .tech-badge-card, .about-card, .cinematic-step-card, .why-card, .tst-featured-card, .faq-item, .contact-offices-card, .contact-form'
      )

      cards.forEach((card, index) => {
        const speed = (index % 3 === 0 ? 25 : index % 3 === 1 ? -20 : 15)
        gsap.fromTo(
          card,
          { y: speed },
          {
            y: -speed,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="cinematic-director-root" aria-hidden="true">
      {/* Dynamic Anamorphic Lens Flare Line */}
      <div ref={flareRef} className="cinematic-anamorphic-flare" />

      {/* Subtle Cinematic Vignette Matte Borders */}
      <div ref={topMatteRef} className="cinematic-matte cinematic-matte--top" />
      <div ref={botMatteRef} className="cinematic-matte cinematic-matte--bottom" />
    </div>
  )
}
