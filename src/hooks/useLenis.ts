import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance: Lenis | null = null

export function getLenis() {
  return lenisInstance
}

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const isTouch =
      typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)

    // Apple / Awwwards-grade fluid inertia smooth scroll physics
    const lenis = new Lenis({
      lerp: isTouch ? 0.088 : 0.072,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.15,
      syncTouch: true,
      syncTouchLerp: 0.085,
      touchInertiaMultiplier: 28,
      infinite: false,
    })


    lenisRef.current = lenis
    lenisInstance = lenis

    // Sync Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateLenis)
    // lagSmoothing(0) ensures 100% frame-perfect sync with zero hitching across complex DOM elements
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  return lenisRef
}

