import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects, type Project } from '@/data/projects'
import { ExternalLink, Sparkles, Layers, ArrowUpRight } from 'lucide-react'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const mm = gsap.matchMedia()

    // Desktop: Pinned horizontal scroll showcase
    mm.add('(min-width: 1024px)', () => {
      const getScrollDistance = () => Math.max(0, track.scrollWidth - window.innerWidth)

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          pinSpacing: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${self.progress})`
            }
          },
        },
      })

      return () => {
        tween.kill()
      }
    })

    // Mobile & Tablet: Native vertical scroll flow
    mm.add('(max-width: 1023px)', () => {
      gsap.set(track, { clearProps: 'all' })
    })

    // Refresh triggers after assets/images settle
    const refreshST = () => ScrollTrigger.refresh()
    window.addEventListener('load', refreshST)
    window.addEventListener('resize', refreshST)

    const t = setTimeout(refreshST, 500)

    return () => {
      clearTimeout(t)
      window.removeEventListener('load', refreshST)
      window.removeEventListener('resize', refreshST)
      mm.revert()
    }
  }, [])



  return (
    <section
      ref={sectionRef}
      id="projects"
      className="apple-projects-section"
      aria-label="Apple-Grade Portfolio Showcase"
    >
      {/* Top Hairline Progress */}
      <div className="apple-proj-progress" aria-hidden="true">
        <div ref={progressBarRef} className="apple-proj-progress-bar" />
      </div>

      {/* Horizontal Track */}
      <div ref={trackRef} className="apple-proj-track">
        {/* Intro Slide */}
        <div className="apple-proj-intro">
          <h2 className="apple-proj-heading font-display">
            PORTFOLIO <br />
            <span className="apple-title-gradient">SHOWCASE</span>
          </h2>
          <p className="apple-proj-desc">
            Explore our curated flagship engineering builds. Scalable platforms, spatial 3D
            architectures, and high-conversion commerce ecosystems.
          </p>
          <div className="apple-proj-scroll-hint" aria-hidden="true">
            <span className="apple-hint-bar" />
            <span>SCROLL TO EXPLORE →</span>
          </div>
        </div>

        {/* Project Cards with Full-Bleed 4K Tech Imagery */}
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} total={projects.length} />
        ))}

        {/* Outro Card */}
        <div className="apple-proj-outro">
          <div className="apple-outro-card">
            <Layers size={36} className="text-cyan-400 mb-3" />
            <h3 className="apple-outro-title font-display">Have a flagship idea?</h3>
            <p className="apple-outro-desc">
              Let's engineer your next digital breakthrough with Apple-grade precision and speed.
            </p>
            <a
              href="#contact"
              className="apple-outro-btn"
              data-cursor="go"
              aria-label="Start a project with Inspire Zest"
            >
              <span>Start a Project</span>
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  total,
}: {
  project: Project
  index: number
  total: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card || window.innerWidth < 1024) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    const rotX = -(y / rect.height) * 12
    const rotY = (x / rect.width) * 12

    gsap.to(card, {
      rotateX: rotX,
      rotateY: rotY,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000,
    })
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power2.out',
    })
  }

  return (
    <article
      ref={cardRef}
      className="apple-project-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="view"
      aria-label={`Project ${index + 1} of ${total}: ${project.title}`}
    >
      {/* Full-Bleed 4K Tech Image */}
      <div className="apple-card-image-bg">
        <img
          src={project.image}
          alt={project.title}
          className="apple-card-img"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget
            target.src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop'
          }}
        />
        <div className="apple-card-image-vignette" aria-hidden="true" />
      </div>

      {/* Top Meta Bar */}
      <div className="apple-card-top">
        <span className="apple-card-counter font-display">
          0{index + 1} / 0{total}
        </span>
        <span className="apple-card-cat-pill">{project.category}</span>
        <span className="apple-card-year font-display">{project.year}</span>
      </div>

      {/* Bottom Frosted Glass Info Overlay */}
      <div className="apple-card-glass-bottom">
        <div className="apple-card-main-info">
          <span className="apple-card-client-tag" style={{ color: project.accentColor }}>
            {project.client}
          </span>
          <h3 className="apple-card-title font-display">{project.title}</h3>
          <p className="apple-card-description">{project.description}</p>

          <div className="apple-card-impact-tag">
            <Sparkles size={14} style={{ color: project.accentColor }} aria-hidden="true" />
            <span>{project.impact}</span>
          </div>
        </div>

        {/* Tech Stack & Launch */}
        <div className="apple-card-foot">
          <div className="apple-tech-pills">
            {project.technologies.map((t) => (
              <span key={t} className="apple-tech-tag">
                {t}
              </span>
            ))}
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="apple-launch-link"
            aria-label={`Open live project for ${project.title}`}
          >
            <span>Live Experience</span>
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  )
}
