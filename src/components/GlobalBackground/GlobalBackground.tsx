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
  const aurora1Ref = useRef<HTMLDivElement>(null)
  const aurora2Ref = useRef<HTMLDivElement>(null)
  const aurora3Ref = useRef<HTMLDivElement>(null)

  // 1. GSAP Liquid Aurora Morphing & Scroll-Reactive Physics
  useEffect(() => {
    if (reduced) return

    const a1 = aurora1Ref.current
    const a2 = aurora2Ref.current
    const a3 = aurora3Ref.current

    const ctx = gsap.context(() => {
      // Fluid liquid blob morphing and pulsing
      if (a1 && a2 && a3) {
        gsap.to(a1, {
          x: '+=120',
          y: '-=100',
          scale: 1.25,
          rotate: 180,
          duration: 16,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
        gsap.to(a2, {
          x: '-=140',
          y: '+=110',
          scale: 1.3,
          rotate: -140,
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2,
        })
        gsap.to(a3, {
          x: '+=90',
          y: '+=130',
          scale: 1.18,
          rotate: 90,
          duration: 18,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 4,
        })
      }

      // Parallax scroll reaction for liquid light fields
      if (a1) {
        gsap.to(a1, {
          y: '90vh',
          ease: 'none',
          scrollTrigger: { start: 'top top', end: 'bottom bottom', scrub: 1.4 },
        })
      }
      if (a2) {
        gsap.to(a2, {
          y: '-70vh',
          ease: 'none',
          scrollTrigger: { start: 'top top', end: 'bottom bottom', scrub: 1.8 },
        })
      }
      if (a3) {
        gsap.to(a3, {
          y: '50vh',
          ease: 'none',
          scrollTrigger: { start: 'top top', end: 'bottom bottom', scrub: 1.6 },
        })
      }
    })

    return () => ctx.revert()
  }, [reduced])


  // 2. Interactive Cyber Wave Matrix & Particle Stardust Canvas
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

    // Interactive mouse coordinates with inertia
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2, speed: 0 }
    let lastMouseX = width / 2
    let lastMouseY = height / 2

    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX
      mouse.targetY = e.clientY
    }
    if (!isTouch) {
      window.addEventListener('mousemove', onMouseMove, { passive: true })
    }

    // Spark / Stardust burst particles
    interface Spark {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      alpha: number
      color: string
      life: number
      maxLife: number
    }
    const sparks: Spark[] = []
    const sparkColors = ['#00F5D4', '#38BDF8', '#BF5AF2', '#FF2E93', '#FFFFFF']

    let time = 0

    // Grid wave properties
    const cols = isTouch ? 22 : 42
    const rows = isTouch ? 14 : 26

    const render = () => {
      time += 0.02

      // Smooth mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.08
      mouse.y += (mouse.targetY - mouse.y) * 0.08

      const dx = mouse.targetX - lastMouseX
      const dy = mouse.targetY - lastMouseY
      mouse.speed = Math.sqrt(dx * dx + dy * dy)
      lastMouseX = mouse.targetX
      lastMouseY = mouse.targetY

      // Spawn interactive sparks on cursor movement
      if (!isTouch && mouse.speed > 2 && Math.random() < 0.35) {
        sparks.push({
          x: mouse.targetX + (Math.random() - 0.5) * 20,
          y: mouse.targetY + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          size: Math.random() * 2.2 + 0.8,
          alpha: 0.9,
          color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
          life: 0,
          maxLife: Math.random() * 40 + 30,
        })
      }

      ctx.clearRect(0, 0, width, height)

      // ── A. Render Kinetic Undulating Cyber Grid Matrix ──
      const cellWidth = width / cols
      const cellHeight = height / rows

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const baseX = i * cellWidth
          const baseY = j * cellHeight

          // Dual sine-wave mathematical displacement
          const wave1 = Math.sin(i * 0.32 + time * 0.8) * Math.cos(j * 0.28 + time * 0.7)
          const wave2 = Math.sin((i + j) * 0.25 - time * 0.6)

          // Mouse proximity gravity ripple
          const distToMouse = Math.sqrt((baseX - mouse.x) ** 2 + (baseY - mouse.y) ** 2)
          const mouseRippleRadius = 260
          let mouseForce = 0
          if (distToMouse < mouseRippleRadius) {
            mouseForce = Math.cos((distToMouse / mouseRippleRadius) * Math.PI * 0.5) * 14
          }

          const posX = baseX + wave2 * 4
          const posY = baseY + wave1 * 8 - mouseForce

          // Dynamic point alpha & color styling
          const baseAlpha = 0.08 + (wave1 + 1) * 0.06
          const proximityBoost = distToMouse < mouseRippleRadius ? (1 - distToMouse / mouseRippleRadius) * 0.55 : 0
          const finalAlpha = Math.min(baseAlpha + proximityBoost, 0.75)

          const dotRadius = distToMouse < mouseRippleRadius ? 1.8 + (1 - distToMouse / mouseRippleRadius) * 1.6 : 1.1

          ctx.beginPath()
          ctx.arc(posX, posY, dotRadius, 0, Math.PI * 2)

          if (proximityBoost > 0.15) {
            ctx.fillStyle = `rgba(0, 245, 212, ${finalAlpha})`
            ctx.shadowColor = '#00F5D4'
            ctx.shadowBlur = 8
          } else if ((i + j) % 7 === 0) {
            ctx.fillStyle = `rgba(191, 90, 242, ${finalAlpha})`
            ctx.shadowBlur = 0
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${finalAlpha})`
            ctx.shadowBlur = 0
          }

          ctx.fill()
          ctx.shadowBlur = 0
        }
      }

      // ── B. Render Interactive Glowing Sparks ──
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.life++
        s.x += s.vx
        s.y += s.vy
        s.alpha = (1 - s.life / s.maxLife) * 0.8

        if (s.life >= s.maxLife) {
          sparks.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = s.color
        ctx.globalAlpha = s.alpha
        ctx.shadowColor = s.color
        ctx.shadowBlur = 6
        ctx.fill()
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1
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
    <div className="genz-bg-root" aria-hidden="true">
      {/* 1. Deep Space Obsidian Base */}
      <div className="genz-space-base" />

      {/* 2. Liquid Neon Aurora Gradient Blobs */}
      <div ref={aurora1Ref} className="genz-aurora genz-aurora--cyan" />
      <div ref={aurora2Ref} className="genz-aurora genz-aurora--magenta" />
      <div ref={aurora3Ref} className="genz-aurora genz-aurora--violet" />

      {/* 3. Interactive Kinetic Wave Matrix Canvas */}
      <canvas ref={canvasRef} className="genz-wave-canvas" />

      {/* 4. Contrast Mask to guarantee 100% text clarity & zero overwrite */}
      <div className="genz-vignette-mask" />
    </div>
  )
}

