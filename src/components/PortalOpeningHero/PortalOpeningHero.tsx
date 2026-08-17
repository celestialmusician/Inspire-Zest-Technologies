import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getLenis } from '@/hooks/useLenis'
import './PortalOpeningHero.css'

gsap.registerPlugin(ScrollTrigger)

// ─── Frame sequence config ───────────────────────────────────────────────────
const TOTAL_FRAMES = 240
const FRAME_BASE   = '/images/hero-section/ezgif-frame-'

/** Zero-pad to 3 digits, e.g. 1 → "001" */
const pad = (n: number) => String(n).padStart(3, '0')

/** Build an ordered array of image URLs for frames 001 → 240 */
function buildFrameUrls(isMobile: boolean): string[] {
  const urls: string[] = []
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    // On mobile skip every other frame to halve memory usage and decode overhead
    if (isMobile && i % 2 === 0) continue
    urls.push(`${FRAME_BASE}${pad(i)}.png`)
  }
  return urls
}

/** Cover-fit draw — aligns image with headroom so top navigation never collides with animation */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
) {
  // Headroom offset so the robot's head and floating parts stay below the top navbar
  const navHeadroom = Math.min(80, Math.round(ch * 0.065))

  const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
  const sw    = img.naturalWidth  * scale
  const sh    = img.naturalHeight * scale
  const sx    = (cw - sw) / 2
  const sy    = (ch - sh) / 2 + navHeadroom

  ctx.fillStyle = '#050505'
  ctx.fillRect(0, 0, cw, ch)
  ctx.drawImage(img, sx, sy, sw, sh)
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function PortalOpeningHero() {
  const containerRef  = useRef<HTMLDivElement>(null)
  const stickyRef     = useRef<HTMLDivElement>(null)
  const canvasRef     = useRef<HTMLCanvasElement>(null)
  const wmWrapRef     = useRef<HTMLDivElement>(null)
  const wmLeftRef     = useRef<HTMLSpanElement>(null)
  const wmRightRef    = useRef<HTMLSpanElement>(null)
  const overlayRef    = useRef<HTMLDivElement>(null)
  const hintRef       = useRef<HTMLButtonElement>(null)
  const ctasRef       = useRef<HTMLDivElement>(null)
  const spotlightRef  = useRef<HTMLDivElement>(null)

  // Runtime state kept in refs to avoid any React re-renders during scroll
  const framesRef      = useRef<HTMLImageElement[]>([])
  const loadedRef      = useRef<boolean[]>([])
  const currentIdxRef  = useRef(-1)
  const isMobileRef    = useRef(false)
  const rafIdRef       = useRef<number | null>(null)
  const nextFrameRef   = useRef<number | null>(null)

  // ── Draw a single frame with RAF batching ─────────────────────────────────
  const performDraw = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = framesRef.current[frameIdx]
    if (!img || !loadedRef.current[frameIdx]) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawCover(ctx, img, canvas.width, canvas.height)
  }, [])

  const drawFrame = useCallback((frameIdx: number, force = false) => {
    if (!force && currentIdxRef.current === frameIdx) return
    currentIdxRef.current = frameIdx
    nextFrameRef.current = frameIdx

    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(() => {
        if (nextFrameRef.current !== null) {
          performDraw(nextFrameRef.current)
        }
        rafIdRef.current = null
      })
    }
  }, [performDraw])

  // ── Resize canvas to match pixel-perfect display size (capped for mobile GPU performance) ──
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    isMobileRef.current = window.innerWidth < 768
    // On high-DPI mobile phones (DPR 3+), cap DPR to 1.5 to save massive fill-rate & maintain 120Hz
    const maxDpr = isMobileRef.current ? 1.5 : 2
    const dpr    = Math.min(window.devicePixelRatio || 1, maxDpr)

    canvas.width  = Math.round(canvas.offsetWidth  * dpr)
    canvas.height = Math.round(canvas.offsetHeight * dpr)

    // Redraw whatever frame is currently shown so the canvas isn't blank
    const idx = currentIdxRef.current
    if (idx >= 0) {
      currentIdxRef.current = -1
      drawFrame(idx, true)
    }
  }, [drawFrame])

  // ── Preload all frames progressively with async decoding ────────────────
  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768
    const urls   = buildFrameUrls(isMobileRef.current)
    const images: HTMLImageElement[] = new Array(urls.length)
    const loaded: boolean[]          = new Array(urls.length).fill(false)

    framesRef.current = images
    loadedRef.current = loaded

    // Load frame 0 first so something is visible immediately
    const first = new Image()
    first.onload = () => {
      loaded[0] = true
      images[0] = first
      drawFrame(0, true)
    }
    first.src = urls[0]

    // Then load the rest progressively
    for (let i = 1; i < urls.length; i++) {
      const img = new Image()
      const idx = i
      img.onload = () => {
        loaded[idx] = true
        images[idx] = img
        // If the browser supports async decode, decode in background thread
        if ('decode' in img) {
          img.decode().catch(() => {})
        }
      }
      img.src = urls[i]
    }

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [drawFrame])

  // ── Canvas resize listener ──────────────────────────────────────────────
  useEffect(() => {
    resizeCanvas()
    const ro = new ResizeObserver(resizeCanvas)
    if (canvasRef.current) ro.observe(canvasRef.current)
    return () => ro.disconnect()
  }, [resizeCanvas])

  // ── Interactive Mouse Parallax & 3D Tilt (Desktop only) ────────────────
  useEffect(() => {
    const stage = stickyRef.current
    if (!stage || window.innerWidth < 768) return

    const xTiltTo = gsap.quickTo(wmWrapRef.current, 'rotationY', { duration: 0.6, ease: 'power2.out' })
    const yTiltTo = gsap.quickTo(wmWrapRef.current, 'rotationX', { duration: 0.6, ease: 'power2.out' })
    const xMoveTo = gsap.quickTo(wmWrapRef.current, 'x', { duration: 0.8, ease: 'power2.out' })
    const yMoveTo = gsap.quickTo(wmWrapRef.current, 'y', { duration: 0.8, ease: 'power2.out' })

    const spotXTo = gsap.quickTo(spotlightRef.current, 'x', { duration: 0.35, ease: 'power1.out' })
    const spotYTo = gsap.quickTo(spotlightRef.current, 'y', { duration: 0.35, ease: 'power1.out' })

    const handleMouseMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect()
      const xNorm = (e.clientX - rect.left) / rect.width - 0.5
      const yNorm = (e.clientY - rect.top) / rect.height - 0.5

      xTiltTo(xNorm * 16)
      yTiltTo(-yNorm * 14)
      xMoveTo(xNorm * 22)
      yMoveTo(yNorm * 18)

      spotXTo(e.clientX)
      spotYTo(e.clientY)
    }

    const handleMouseLeave = () => {
      xTiltTo(0)
      yTiltTo(0)
      xMoveTo(0)
      yMoveTo(0)
    }

    stage.addEventListener('mousemove', handleMouseMove)
    stage.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      stage.removeEventListener('mousemove', handleMouseMove)
      stage.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // ── GSAP Scroll-driven animation with buttery interpolated scrubbing ─────
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isMobile    = window.innerWidth < 768
    const frameCount  = isMobile ? Math.ceil(TOTAL_FRAMES / 2) : TOTAL_FRAMES

    // Tween target object for buttery frame interpolation across RAF
    const frameTracker = { frame: 0 }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger:       container,
        start:         'top top',
        end:           'bottom bottom',
        // Tighter scrub on mobile (0.35s) so it follows touch directly; smooth 1.1s on desktop wheel
        scrub:         isMobile ? 0.35 : 1.1,
        pin:           stickyRef.current,
        anticipatePin: 1,
      },
    })

    // ── 1. Smooth Frame Interpolation ────────────────────────────────────
    tl.to(
      frameTracker,
      {
        frame: frameCount - 1,
        ease:  'none',
        onUpdate: () => {
          const idx = Math.min(frameCount - 1, Math.max(0, Math.round(frameTracker.frame)))
          drawFrame(idx)
        },
      },
      0
    )

    // ── 2. Wordmark: tighten tracking + solid contrast glow as sequence unfolds ─
    tl.fromTo(
      wmLeftRef.current,
      {
        scale: 1.0,
        letterSpacing: '0.04em',
        color: '#FFFFFF',
        transformOrigin: 'left center',
        textShadow: '0 4px 30px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.8)',
      },
      {
        scale:         isMobile ? 1.02 : 1.05,
        letterSpacing: '-0.01em',
        color:         '#00F5A0',
        textShadow:    '0 4px 30px rgba(0,0,0,0.98), 0 0 40px rgba(0,245,160,0.85), 0 0 15px rgba(0,245,160,0.5)',
        ease:          'power2.inOut',
      },
      0,
    ).fromTo(
      wmRightRef.current,
      {
        scale: 1.0,
        letterSpacing: '0.04em',
        color: '#FFFFFF',
        transformOrigin: 'left center',
        webkitTextStroke: '2px #FFFFFF',
        textShadow: '0 4px 30px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.8)',
      },
      {
        scale:           isMobile ? 1.02 : 1.05,
        letterSpacing:   '-0.01em',
        color:           '#00F0FF',
        webkitTextStroke: '1px #00F0FF',
        textShadow:      '0 4px 30px rgba(0,0,0,0.98), 0 0 40px rgba(0,240,255,0.85), 0 0 15px rgba(0,240,255,0.5)',
        ease:            'power2.inOut',
      },
      0,
    )

    // ── 3. Duotone tint fades in gently ──────────────────────────────────
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 0.35, ease: 'power1.inOut' },
      0,
    )

    // ── 4. Scroll hint fades out as user begins scrolling ─────────────────
    tl.to(
      hintRef.current,
      { opacity: 0, y: 16, ease: 'power1.out' },
      0,
    )

    // ── 5. CTAs reveal smoothly near the end of the sequence ──────────────
    tl.fromTo(
      ctasRef.current,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, ease: 'power3.out' },
      0.65,
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      tl.kill()
    }
  }, [drawFrame])

  // ── Scroll to next section helper ────────────────────────────────────────
  const scrollToNext = () => {
    const lenis = getLenis()
    const container = containerRef.current
    if (!container) return
    const targetY = container.offsetTop + container.offsetHeight
    if (lenis) {
      lenis.scrollTo(targetY, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' })
    }
  }

  const scrollToWork = () => {
    const el = document.getElementById('projects')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <section
      ref={containerRef}
      id="portal-opening"
      className="portal-op-container"
      aria-label="InspireZest Technologies — Hero"
    >
      <div ref={stickyRef} className="portal-op-stage">

        {/* ── Layer 1: Canvas frame sequence ── */}
        <canvas
          ref={canvasRef}
          className="portal-op-canvas"
          aria-hidden="true"
        />

        {/* ── Layer 2: Interactive Mouse Spotlight (Desktop only) ── */}
        <div ref={spotlightRef} className="portal-op-spotlight" aria-hidden="true" />

        {/* ── Layer 3: Edge vignette + duotone overlay ── */}
        <div className="portal-op-veil" aria-hidden="true" />
        <div ref={overlayRef} className="portal-op-duotone" aria-hidden="true" />

        {/* ── Layer 4: Unified Content Box (Wordmark + CTAs) with 3D Parallax ── */}
        <div ref={wmWrapRef} className="portal-op-content" aria-label="InspireZest">
          <div className="portal-op-wordmark">
            <span ref={wmLeftRef} className="portal-op-wm-span portal-op-wm-span--left">
              INSPIRE
            </span>
            <span ref={wmRightRef} className="portal-op-wm-span portal-op-wm-span--right">
              ZEST
            </span>
          </div>

          {/* ── Layer 5: CTAs (Naturally below wordmark) ── */}
          <div ref={ctasRef} className="portal-op-ctas" aria-label="Call to action">
            <button
              className="portal-op-btn-primary"
              onClick={scrollToWork}
              data-cursor="view"
              aria-label="Explore our work"
            >
              EXPLORE OUR WORK
              <span className="portal-op-btn-arrow" aria-hidden="true"> →</span>
            </button>
            <button
              className="portal-op-btn-secondary"
              onClick={scrollToContact}
              data-cursor="go"
              aria-label="Start a project with us"
            >
              START A PROJECT
            </button>
          </div>
        </div>

        {/* ── Layer 6: Clickable Interactive Scroll hint ── */}
        <button
          ref={hintRef}
          className="portal-op-hint"
          onClick={scrollToNext}
          aria-label="Scroll to explore"
        >
          <span className="portal-op-line" />
          <span className="portal-op-text">SCROLL OR CLICK TO EXPLORE ↴</span>
          <span className="portal-op-line" />
        </button>
      </div>
    </section>
  )
}
