import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsap } from '@/hooks/useGsap'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { projects } from '@/data/projects'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef  = useRef<HTMLElement>(null)
  const trackRef    = useRef<HTMLDivElement>(null)
  const isMobile    = useIsMobile()

  // Desktop: horizontal scroll driven by vertical scroll
  useGsap(() => {
    if (isMobile) return

    const track = trackRef.current
    if (!track) return

    const totalWidth = track.scrollWidth
    const viewportW  = window.innerWidth

    gsap.to(track, {
      x: -(totalWidth - viewportW),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${totalWidth - viewportW}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    })
  }, [isMobile], sectionRef)

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="proj scene"
      aria-label="Selected work"
    >
      {/* Header (outside scroll track) */}
      <div className="proj-header">
        <span className="proj-tag" aria-hidden="true">07 — SELECTED WORK</span>
        <h2 className="proj-heading font-display">
          SELECTED<br />WORK
        </h2>
        <p className="proj-note" aria-label="Note about project data">
          ↳ Projects shown are illustrative placeholders.
          <br />Real InspireZest portfolio coming soon.
        </p>
      </div>

      {/* Desktop horizontal track */}
      {!isMobile && (
        <div ref={trackRef} className="proj-track horizontal-track" aria-label="Project portfolio">
          {/* Spacer (header area) */}
          <div className="proj-track-spacer" aria-hidden="true" />

          {projects.map((p, i) => (
            <article key={p.id} className="proj-card" aria-label={`Project: ${p.title}`}>
              <div className="proj-card-inner">
                <div
                  className="proj-card-image"
                  style={{ background: GRAD[i % GRAD.length] }}
                  aria-hidden="true"
                >
                  <span className="proj-card-num" aria-hidden="true">0{i+1}</span>
                </div>
                <div className="proj-card-info">
                  <div className="proj-card-meta">
                    <span className="proj-cat">{p.category}</span>
                    <span className="proj-year">{p.year}</span>
                  </div>
                  <h3 className="proj-title">{p.title}</h3>
                  <p className="proj-desc">{p.description}</p>
                  <div className="proj-tech" aria-label="Technologies used">
                    {p.technologies.map((t) => (
                      <span key={t} className="proj-tech-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* End card */}
          <div className="proj-track-end" aria-hidden="true">
            <p>MORE WORK<br />COMING SOON</p>
          </div>
        </div>
      )}

      {/* Mobile vertical list */}
      {isMobile && (
        <div className="proj-list-mobile">
          {projects.map((p, i) => (
            <article key={p.id} className="proj-card" aria-label={`Project: ${p.title}`}>
              <div
                className="proj-card-image proj-card-image--mobile"
                style={{ background: GRAD[i % GRAD.length] }}
                aria-hidden="true"
              >
                <span className="proj-card-num" aria-hidden="true">0{i+1}</span>
              </div>
              <div className="proj-card-info">
                <div className="proj-card-meta">
                  <span className="proj-cat">{p.category}</span>
                  <span className="proj-year">{p.year}</span>
                </div>
                <h3 className="proj-title">{p.title}</h3>
                <p className="proj-desc">{p.description}</p>
                <div className="proj-tech">
                  {p.technologies.map((t) => (
                    <span key={t} className="proj-tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Progress indicator */}
      {!isMobile && (
        <div className="proj-progress" aria-hidden="true">
          {projects.map((_, i) => (
            <div key={i} className={`proj-progress-dot ${i === 0 ? 'active' : ''}`} />
          ))}
        </div>
      )}
    </section>
  )
}

// Gradient placeholders per project
const GRAD = [
  'linear-gradient(135deg, #0d0d10 0%, #1a1a25 100%)',
  'linear-gradient(135deg, #0a0d0a 0%, #101a10 100%)',
  'linear-gradient(135deg, #0d0a10 0%, #1a1025 100%)',
  'linear-gradient(135deg, #0d0d0a 0%, #1a1a10 100%)',
]
