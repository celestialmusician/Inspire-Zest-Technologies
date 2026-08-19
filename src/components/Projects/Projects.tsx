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

    const isMobile = window.innerWidth < 1024

    const ctx = gsap.context(() => {
      if (!isMobile) {
        // Desktop horizontal scroll calculation
        const scrollDistance = track.scrollWidth - window.innerWidth

        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${scrollDistance}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressBarRef.current) {
                progressBarRef.current.style.transform = `scaleX(${self.progress})`
              }
            },
          },
        })

        pinTl.to(track, {
          x: () => -scrollDistance,
          ease: 'none',
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="horizontal-projects-section"
      aria-label="Featured Client Projects"
    >
      {/* Scroll Progress Bar for Pinned Track */}
      <div className="proj-scroll-progress" aria-hidden="true">
        <div ref={progressBarRef} className="proj-scroll-progress-bar" />
      </div>

      {/* Horizontal Track (Desktop) / Vertical Stack (Mobile) */}
      <div ref={trackRef} className="proj-horizontal-track">
        {/* Intro Card inside Track */}
        <div className="proj-intro-slide">
          <div className="proj-tag" aria-hidden="true">
            <Sparkles size={13} className="text-cyan-400" />
            <span>04 — FEATURED WORK</span>
          </div>
          <h2 className="proj-main-heading font-display">
            CASE STUDIES & <br />
            <span className="proj-title-gradient">FLAGSHIP</span> BUILDS
          </h2>
          <p className="proj-intro-desc">
            Explore how we engineered robust, transformative digital systems that delivered explosive
            growth and technological competitive advantage.
          </p>
          <div className="proj-scroll-prompt" aria-hidden="true">
            <span className="proj-prompt-line" />
            <span>SCROLL TO EXPLORE PORTFOLIO →</span>
          </div>
        </div>

        {/* Project Cards */}
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} total={projects.length} />
        ))}

        {/* Outro Card */}
        <div className="proj-outro-slide">
          <div className="proj-outro-card">
            <Layers size={40} className="text-cyan-400 mb-4" />
            <h3 className="proj-outro-title font-display">HAVE A VISION IN MIND?</h3>
            <p className="proj-outro-desc">
              Let's engineer your next digital breakthrough. We take custom projects from concept to
              market-defining launch.
            </p>
            <a
              href="#contact"
              className="proj-outro-btn"
              data-cursor="go"
              aria-label="Start a project with Inspire Zest"
            >
              <span>DISCUSS YOUR PROJECT</span>
              <ArrowUpRight size={18} />
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

  // 3D Card Tilt on Hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card || window.innerWidth < 1024) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    const rotX = -(y / rect.height) * 14
    const rotY = (x / rect.width) * 14

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
      className="project-slide-card"
      style={
        {
          '--p-accent': project.accentColor,
          '--p-gradient': project.gradient,
        } as React.CSSProperties
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="view"
      aria-label={`Project ${index + 1} of ${total}: ${project.title}`}
    >
      {/* Background Neon Ambient Wash */}
      <div className="proj-card-bg-gradient" aria-hidden="true" />
      <div className="proj-card-border" aria-hidden="true" />

      {/* Top Meta Bar */}
      <div className="proj-card-top-bar">
        <span className="proj-card-index font-display">
          0{index + 1} / 0{total}
        </span>
        <span className="proj-card-category">{project.category}</span>
        <span className="proj-card-year font-display">{project.year}</span>
      </div>

      {/* Main Project Content */}
      <div className="proj-card-body">
        <span className="proj-card-client" style={{ color: project.accentColor }}>
          {project.client}
        </span>
        <h3 className="proj-card-heading font-display">{project.title}</h3>
        <p className="proj-card-summary">{project.description}</p>

        {/* Impact Badge */}
        <div className="proj-card-impact-pill">
          <Sparkles size={14} style={{ color: project.accentColor }} aria-hidden="true" />
          <span>{project.impact}</span>
        </div>
      </div>

      {/* Tech Stack & Launch Link */}
      <div className="proj-card-footer">
        <div className="proj-tech-pill-group">
          {project.technologies.map((tech) => (
            <span key={tech} className="proj-tech-tag">
              {tech}
            </span>
          ))}
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="proj-launch-btn"
          aria-label={`Visit live site for ${project.title}`}
        >
          <span>LIVE EXPERIENCE</span>
          <ExternalLink size={15} aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}
