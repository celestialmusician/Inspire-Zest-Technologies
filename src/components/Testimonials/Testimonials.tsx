import * as React from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Testimonials.css'

gsap.registerPlugin(ScrollTrigger)

// ─── Types ────────────────────────────────────────────────────────────────────
interface Speaker {
  name: string
  role: string
  src: string
}

// ─── Team / client portraits ─────────────────────────────────────────────────
// Replace these with real photos — drop images in public/images/team/
const SPEAKERS: Speaker[] = [
  { name: 'Alex Johnson',    role: 'CEO & Founder',       src: 'https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/avatar-images/avatar-01.jpg' },
  { name: 'Sarah Chen',      role: 'CTO',                 src: 'https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/avatar-images/avatar-02.jpg' },
  { name: 'Marcus Rivera',   role: 'Lead Designer',       src: 'https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/avatar-images/avatar-03.jpg' },
  { name: 'Emily Watson',    role: 'Product Manager',     src: 'https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/avatar-images/avatar-04.jpg' },
  { name: 'David Kim',       role: 'Senior Developer',    src: 'https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/avatar-images/avatar-05.jpg' },
  { name: 'Lisa Thompson',   role: 'Marketing Director',  src: 'https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/avatar-images/avatar-01.jpg' },
  { name: 'James Wilson',    role: 'UX Researcher',       src: 'https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/avatar-images/avatar-02.jpg' },
  { name: 'Rachel Green',    role: 'Data Scientist',      src: 'https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/avatar-images/avatar-03.jpg' },
  { name: 'Michael Brown',   role: 'DevOps Engineer',     src: 'https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/avatar-images/avatar-04.jpg' },
  { name: 'Anna Davis',      role: 'Content Strategist',  src: 'https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/avatar-images/avatar-05.jpg' },
]

// ─── Deterministic scattered grid layout ─────────────────────────────────────
// One portrait per row, with every third row holding a second one.
// No Math.random → SSR-safe, consistent on every render.
function buildLayout(count: number, cols: number): number[][] {
  const rows: number[][] = []
  let i = 0
  let r = 0
  while (i < count) {
    const row = new Array<number>(cols).fill(-1)
    const a = (r * 2 + (r % 2)) % cols
    row[a] = i++
    if (r % 3 === 0 && i < count) {
      let b = (a + 2) % cols
      if (b === a) b = (a + 1) % cols
      row[b] = i++
    }
    rows.push(row)
    r++
  }
  return rows
}

// ─── Responsive column count ──────────────────────────────────────────────────
function useResponsiveCols(desired: number): number {
  const [cols, setCols] = React.useState(desired)
  React.useEffect(() => {
    const sm = window.matchMedia('(min-width: 640px)')
    const lg = window.matchMedia('(min-width: 1024px)')
    const update = () => {
      if (lg.matches)      setCols(desired)
      else if (sm.matches) setCols(Math.min(desired, 3))
      else                 setCols(Math.min(desired, 2))
    }
    update()
    sm.addEventListener('change', update)
    lg.addEventListener('change', update)
    return () => {
      sm.removeEventListener('change', update)
      lg.removeEventListener('change', update)
    }
  }, [desired])
  return cols
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Testimonials() {
  const rootRef   = React.useRef<HTMLElement>(null)
  const hintRef   = React.useRef<HTMLDivElement>(null)
  const cols      = useResponsiveCols(4)
  const layout    = React.useMemo(() => buildLayout(SPEAKERS.length, cols), [cols])
  const ctxRef    = React.useRef<gsap.Context | null>(null)

  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    ctxRef.current = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.spw-item', root)

      if (reduce) {
        gsap.set(items, { scale: 1 })
        return
      }

      // Scroll hint fades out over the first 40 % of the section
      gsap.to(hintRef.current, {
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=40%',
          scrub: true,
        },
      })

      // Each portrait scales 0 → 1 → 0 as it passes through the viewport
      items.forEach((el) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
          .fromTo(el, { scale: 0 }, { scale: 1, ease: 'power2.out', duration: 0.5 })
          .to(el,                   { scale: 0, ease: 'power2.in',  duration: 0.5 })
      })
    }, root)

    return () => ctxRef.current?.revert()
  }, [cols])

  return (
    <section
      ref={rootRef}
      id="testimonials"
      className="spw-root"
      aria-label="Team — Scroll Portrait Wall"
    >
      {/* ── Scroll hint (fades out on scroll) ── */}
      <div ref={hintRef} className="spw-hint" aria-hidden="true">
        <span className="spw-hint-text">scroll down to see effect</span>
      </div>

      {/* ── Sticky centred title (mix-blend-mode: exclusion) ── */}
      <div className="spw-title-wrap" aria-hidden="true">
        <h2 className="spw-title">Our Team</h2>
        <p className="spw-date">INSPIREZEST TECHNOLOGIES</p>
      </div>

      {/* ── Scattered portrait grid ── */}
      <div className="spw-grid">
        {layout.map((row, ri) => (
          <div key={ri} className="spw-row">
            {row.map((idx, ci) => {
              if (idx === -1) return (
                <div key={ci} className="spw-cell spw-cell--empty" />
              )

              const s      = SPEAKERS[idx]
              const origin = ci < cols / 2 ? 'right bottom' : 'left bottom'

              return (
                <div key={ci} className="spw-cell">
                  <div
                    className="spw-item"
                    style={{ transformOrigin: origin, transform: 'scale(0)' }}
                  >
                    <img
                      src={s.src}
                      alt={s.name}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="spw-img"
                    />
                    <div className="spw-caption">
                      <span className="spw-caption-name">{s.name}</span>
                      <span className="spw-caption-role">({s.role})</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
