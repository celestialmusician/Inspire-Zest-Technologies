import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGlobalScrollOrchestration(enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return

    const ctx = gsap.context(() => {
      // 1. Subtle 3D Perspective & Depth Blossom on all Section Containers
      const sectionElements = document.querySelectorAll<HTMLElement>(
        'main > section, main > div > section, main > div#hero'
      )

      sectionElements.forEach((sec) => {
        // Skip hero since it has its own 200vh pinned sequence
        if (sec.id === 'hero' || sec.classList.contains('apple-hero-container')) return

        const container = sec.querySelector<HTMLElement>('[class*="-container"]') || sec

        gsap.fromTo(
          container,
          {
            opacity: 0.85,
            y: 45,
            scale: 0.965,
            rotateX: 1.5,
            transformPerspective: 1200,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 88%',
              end: 'top 35%',
              scrub: 0.6,
            },
          }
        )
      })

      // 2. Parallax Floating Scrub on all Card Grids
      const allCards = document.querySelectorAll<HTMLElement>(
        '.stats-card, .cinematic-intro-card, .about-card, .cinematic-step-card, .why-card, .tech-pillar-card, .faq-item, .contact-offices-card'
      )

      allCards.forEach((card, i) => {
        const offset = (i % 3 - 1) * 18 // subtle alternate floating offsets
        gsap.fromTo(
          card,
          { y: 25 + offset },
          {
            y: -15 - offset,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        )
      })

      // 3. Kinetic Parallax Speed on Section Titles
      const allTitles = document.querySelectorAll<HTMLElement>(
        '.stats-title, .cinematic-intro-heading, .apple-services-title, .apple-proj-heading, .tech-heading, .about-headline, .cinematic-proc-title, .why-heading, .tst-title, .faq-heading, .fcta-headline, .contact-heading'
      )

      allTitles.forEach((title) => {
        gsap.fromTo(
          title,
          { y: 30, opacity: 0.85 },
          {
            y: -10,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: title,
              start: 'top 90%',
              end: 'bottom 20%',
              scrub: 0.8,
            },
          }
        )
      })
    })

    // Refresh ScrollTrigger calculations after all assets are initialized
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 400)

    return () => {
      clearTimeout(refreshTimer)
      ctx.revert()
    }
  }, [enabled])
}
