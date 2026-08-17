import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
    // On mobile skip every other frame to halve memory usage
    if (isMobile && i % 2 === 0) continue
    urls.push(`${FRAME_BASE}${pad(i)}.png`)
  }
  return urls
}

/** Map a 0-based scrub index (from GSAP) to a frame 1–240 index */
function scrubToFrameIndex(scrub: number, totalFrames: number): number {
  const idx = Math.round(scrub * (totalFrames - 1))
  return Math.max(0, Math.min(totalFrames - 1, idx))
}

/** Cover-fit draw — centres the image and fills the canvas without distortion */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
) {
  const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
  const sw    = img.naturalWidth  * scale
  const sh    = img.naturalHeight * scale
  const sx    = (cw - sw) / 2
  const sy    = (ch - sh) / 2
  ctx.drawImage(img, sx, sy, sw, sh)
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function PortalOpeningHero() {
  const containerRef  = useRef<HTMLDivElement>(null)
  const stickyRef     = useRef<HTMLDivElement>(null)
  const canvasRef     = useRef<HTMLCanvasElement>(null)
  const wmLeftRef     = useRef<HTMLSpanElement>(null)
  const wmRightRef    = useRef<HTMLSpanElement>(null)
  const overlayRef    = useRef<HTMLDivElement>(null)
  const hintRef       = useRef<HTMLDivElement>(null)
  const ctasRef       = useRef<HTMLDivElement>(null)

  // Runtime state kept in refs to avoid re-renders
  const framesRef      = useRef<HTMLImageElement[]>([])
  const loadedRef      = useRef<boolean[]>([])
  const currentIdxRef  = useRef(-1)
  const isMobileRef    = useRef(false)

  // ── Draw a single frame ─────────────────────────────────────────────────
  // NOTE: canvas.width / canvas.height are always physical pixels (= CSS px * DPR).
  // We do NOT call ctx.scale() anywhere — all drawing uses physical pixel coords
  // so drawCover receives consistent values and the image is always centred.
  const drawFrame = useCallback((frameIdx: number, force = false) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = framesRef.current[frameIdx]
    if (!img || !loadedRef.current[frameIdx]) return

    // Skip repaint if same frame (unless forced after resize)
    if (!force && currentIdxRef.current === frameIdx) return
    currentIdxRef.current = frameIdx

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawCover(ctx, img, canvas.width, canvas.height)
  }, [])

  // ── Resize canvas to match pixel-perfect display size ──────────────────
  // Only set canvas.width / canvas.height — no ctx.scale() call.
  // ctx.scale() is additive across calls and would corrupt the coordinate
  // system after the first resize (doubling, then tripling, etc.).
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    canvas.width  = Math.round(canvas.offsetWidth  * dpr)
    canvas.height = Math.round(canvas.offsetHeight * dpr)

    // Redraw whatever frame is currently shown so the canvas isn't blank
    const idx = currentIdxRef.current
    if (idx >= 0) {
      currentIdxRef.current = -1          // clear cache so drawFrame actually runs
      drawFrame(idx, true)
    }
  }, [drawFrame])

  // ── Preload all frames ──────────────────────────────────────────────────
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
      drawFrame(0)
    }
    first.src = urls[0]

    // Then load the rest progressively
    for (let i = 1; i < urls.length; i++) {
      const img = new Image()
      const idx = i
      img.onload = () => {
        loaded[idx] = true
        images[idx] = img
      }
      img.src = urls[i]
    }
  }, [drawFrame])

  // ── Canvas resize listener ──────────────────────────────────────────────
  useEffect(() => {
    resizeCanvas()
    const ro = new ResizeObserver(resizeCanvas)
    if (canvasRef.current) ro.observe(canvasRef.current)
    return () => ro.disconnect()
  }, [resizeCanvas])

  // ── GSAP scroll-driven animation ────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isMobile    = window.innerWidth < 768
    const frameCount  = isMobile ? Math.ceil(TOTAL_FRAMES / 2) : TOTAL_FRAMES

    // Proxy object for GSAP to tween
    const proxy = { progress: 0 }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger:       container,
        start:         'top top',
        end:           'bottom bottom',
        scrub:         1,
        pin:           stickyRef.current,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p        = self.progress
          const frameIdx = scrubToFrameIndex(p, frameCount)
          drawFrame(frameIdx)
          // Keep proxy in sync for any tweens below
          proxy.progress = p
        },
      },
    })

    // ── Wordmark: tighten tracking + glow as portal reveals ─────────────
    tl.fromTo(
      wmLeftRef.current,
      { scale: 1.0, letterSpacing: '0.06em', color: '#FFFFFF' },
      {
        scale:         isMobile ? 1.06 : 1.1,
        letterSpacing: '-0.01em',
        color:         '#00F5A0',
        textShadow:    '0 0 40px rgba(0,245,160,0.9)',
        ease:          'power2.inOut',
      },
      0,
    ).fromTo(
      wmRightRef.current,
      { scale: 1.0, letterSpacing: '0.06em', webkitTextStroke: '2.5px #FFFFFF' },
      {
        scale:           isMobile ? 1.06 : 1.1,
        letterSpacing:   '-0.01em',
        webkitTextStroke: '2.5px #00F0FF',
        textShadow:      '0 0 40px rgba(0,240,255,0.9)',
        ease:            'power2.inOut',
      },
      0,
    )

    // ── Vignette overlay darkens slightly ────────────────────────────────
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 0.45, ease: 'power1.inOut' },
      0,
    )

    // ── Scroll hint fades out as animation starts ─────────────────────────
    tl.to(
      hintRef.current,
      { opacity: 0, y: 18, ease: 'power1.out' },
      0,
    )

    // ── CTAs fade in near the end of the sequence ─────────────────────────
    tl.fromTo(
      ctasRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, ease: 'power3.out' },
      0.72,
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      tl.kill()
    }
  }, [drawFrame])

  // ── CTAs ─────────────────────────────────────────────────────────────────
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

        {/* ── Layer 2: Edge vignette + duotone overlay ── */}
        <div className="portal-op-veil" aria-hidden="true" />
        <div ref={overlayRef} className="portal-op-duotone" aria-hidden="true" />

        {/* ── Layer 3: Wordmark ── */}
        <div className="portal-op-wordmark" aria-label="InspireZest">
          <span ref={wmLeftRef} className="portal-op-wm-span portal-op-wm-span--left">
            INSPIRE
          </span>
          <span ref={wmRightRef} className="portal-op-wm-span portal-op-wm-span--right">
            ZEST
          </span>
        </div>

        {/* ── Layer 4: CTAs (appear late in animation) ── */}
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

        {/* ── Layer 5: Scroll hint ── */}
        <div ref={hintRef} className="portal-op-hint" aria-hidden="true">
          <span className="portal-op-line" />
          <span className="portal-op-text">SCROLL TO REVEAL ↴</span>
          <span className="portal-op-line" />
        </div>
      </div>
    </section>
  )
}
