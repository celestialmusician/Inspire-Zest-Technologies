import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsTouch, usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import './GlobalBackground.css'

gsap.registerPlugin(ScrollTrigger)

export default function GlobalBackground() {
  const isTouch = useIsTouch()
  const reduced = usePrefersReducedMotion()

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const orb1Ref = useRef<HTMLDivElement>(null)
  const orb2Ref = useRef<HTMLDivElement>(null)
  const orb3Ref = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  // 1. GSAP Interactive Cursor Tracking Spotlight & Floating Orbs
  useEffect(() => {
    if (reduced) return

    const spotlight = spotlightRef.current
    const orb1 = orb1Ref.current
    const orb2 = orb2Ref.current
    const orb3 = orb3Ref.current

    const ctx = gsap.context(() => {
      // Ambient Organic Orb Breathing Timelines
      if (orb1 && orb2 && orb3) {
        gsap.to(orb1, {
          x: '+=80',
          y: '-=60',
          scale: 1.15,
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
        gsap.to(orb2, {
          x: '-=90',
          y: '+=80',
          scale: 1.2,
          duration: 15,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.5,
        })
        gsap.to(orb3, {
          x: '+=60',
          y: '+=70',
          scale: 1.1,
          duration: 14,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 3,
        })
      }

      // Parallax scroll reaction for background light fields
      if (orb1) {
        gsap.to(orb1, {
          y: '80vh',
          ease: 'none',
          scrollTrigger: {
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
          },
        })
      }
      if (orb2) {
        gsap.to(orb2, {
          y: '-60vh',
          ease: 'none',
          scrollTrigger: {
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2,
          },
        })
      }
      if (orb3) {
        gsap.to(orb3, {
          y: '40vh',
          ease: 'none',
          scrollTrigger: {
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.8,
          },
        })
      }
    })

    // Mouse Tracking QuickTo for silky smooth spotlight
    if (!isTouch && spotlight) {
      const setX = gsap.quickTo(spotlight, 'x', { duration: 1.2, ease: 'power2.out' })
      const setY = gsap.quickTo(spotlight, 'y', { duration: 1.2, ease: 'power2.out' })

      const handleMouseMove = (e: MouseEvent) => {
        setX(e.clientX)
        setY(e.clientY)
      }

      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        ctx.revert()
      }
    }

    return () => ctx.revert()
  }, [isTouch, reduced])

  // 2. Interactive Constellation & Luminous Particle Grid Canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Particle nodes configuration
    const count = isTouch ? 35 : 75
    interface Node {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      alpha: number
      baseAlpha: number
    }

    const nodes: Node[] = []
    for (let i = 0; i < count; i++) {
      const baseAlpha = Math.random() * 0.45 + 0.15
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 0.6,
        alpha: baseAlpha,
        baseAlpha,
      })
    }

    let mouseX = -1000
    let mouseY = -1000
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    if (!isTouch) {
      window.addEventListener('mousemove', onMouseMove, { passive: true })
    }

    // GSAP Ticker Render Loop (Ultra Smooth 60fps/120fps)
    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw interactive constellation links
      const maxDistance = isTouch ? 90 : 130
      for (let i = 0; i < count; i++) {
        const n1 = nodes[i]

        // Move nodes
        n1.x += n1.vx
        n1.y += n1.vy

        // Bounce on boundaries
        if (n1.x < 0 || n1.x > width) n1.vx *= -1
        if (n1.y < 0 || n1.y > height) n1.vy *= -1

        // Mouse proximity reaction
        if (!isTouch) {
          const dx = mouseX - n1.x
          const dy = mouseY - n1.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            const force = (150 - dist) / 150
            n1.alpha = n1.baseAlpha + force * 0.6
          } else {
            n1.alpha = n1.baseAlpha
          }
        }

        // Draw connections
        for (let j = i + 1; j < count; j++) {
          const n2 = nodes[j]
          const dx = n1.x - n2.x
          const dy = n1.y - n2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.18 * Math.min(n1.alpha, n2.alpha)
            ctx.beginPath()
            ctx.moveTo(n1.x, n1.y)
            ctx.lineTo(n2.x, n2.y)
            ctx.strokeStyle = `rgba(0, 245, 212, ${lineAlpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }

        // Draw glowing particle node
        ctx.beginPath()
        ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(56, 189, 248, ${n1.alpha})`
        ctx.shadowColor = '#00F5D4'
        ctx.shadowBlur = 4
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    gsap.ticker.add(render)

    return () => {
      gsap.ticker.remove(render)
      window.removeEventListener('resize', handleResize)
      if (!isTouch) {
        window.removeEventListener('mousemove', onMouseMove)
      }
    }
  }, [isTouch])

  return (
    <div className="gb-root" aria-hidden="true">
      {/* 1. Deep Obsidian Atmosphere Base */}
      <div className="gb-deep-space" />

      {/* 2. Interactive Cursor Spotlight */}
      {!isTouch && <div ref={spotlightRef} className="gb-cursor-spotlight" />}

      {/* 3. Ambient Plasma Aurora Light Fields (Deep Z-Index) */}
      <div ref={orb1Ref} className="gb-orb gb-orb--cyan" />
      <div ref={orb2Ref} className="gb-orb gb-orb--purple" />
      <div ref={orb3Ref} className="gb-orb gb-orb--indigo" />

      {/* 4. Fine Matrix Perspective Grid */}
      <div ref={gridRef} className="gb-grid-mesh" />

      {/* 5. Interactive GSAP Canvas Constellation */}
      <canvas ref={canvasRef} className="gb-interactive-canvas" />

      {/* 6. Non-Destructive Dark Vignette (Guarantees Content Readability) */}
      <div className="gb-contrast-mask" />
    </div>
  )
}
