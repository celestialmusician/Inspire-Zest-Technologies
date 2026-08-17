import { useRef, useEffect } from 'react'
import './Footer.css'

const NAV_COLS = [
  {
    label: 'Services',
    links: ['Web Development', 'Mobile Apps', 'ERP & Software', 'Digital Marketing', 'Branding'],
  },
  {
    label: 'Company',
    links: ['About', 'Work', 'Process', 'Contact'],
  },
]

const SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn',  href: '#' },
  { label: 'Facebook',  href: '#' },
  { label: 'YouTube',   href: '#' },
]

export default function Footer() {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return
    const card = cardRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      card.style.setProperty('--mouse-x', `${x}px`)
      card.style.setProperty('--mouse-y', `${y}px`)
    }

    card.addEventListener('mousemove', handleMouseMove)
    return () => card.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <footer className="footer" aria-label="Site footer">
      <div ref={cardRef} className="footer-glass-card">
        {/* Animated ambient top glass light sweep */}
        <div className="footer-glass-glow" aria-hidden="true" />
        {/* Interactive cursor spotlight */}
        <div className="footer-cursor-spotlight" aria-hidden="true" />

        {/* Top section */}
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo text-gradient-brand">INSPIREZEST</span>
            <p className="footer-tagline">LET'S MAKE<br />SOMETHING<br />MATTER.</p>
          </div>

          <div className="footer-nav">
            {NAV_COLS.map((col) => (
              <div key={col.label} className="footer-nav-col">
                <span className="footer-nav-label">{col.label}</span>
                <ul role="list">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="footer-nav-link">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="footer-nav-col">
              <span className="footer-nav-label">Connect</span>
              <ul role="list">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      className="footer-nav-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`InspireZest on ${s.label}`}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-location" aria-label="Location">
            KOLLAM · KERALA · INDIA
          </div>
          <div className="footer-copy">
            Copyright © {new Date().getFullYear()} All rights reserved | InspireZest Technologies Pvt Ltd
          </div>
        </div>

        {/* Huge backdrop watermark */}
        <div className="footer-watermark font-display" aria-hidden="true">
          INSPIREZEST
        </div>
      </div>
    </footer>
  )
}
