import { useRef, useEffect } from 'react'
import { MapPin, Globe } from 'lucide-react'
import './Footer.css'

const NAV_COLS = [
  {
    label: 'Core Services',
    links: [
      { name: 'Web Development & 3D', href: '#services' },
      { name: 'Mobile App Engineering', href: '#services' },
      { name: 'AI & Enterprise Software', href: '#services' },
      { name: 'ERP & Business Systems', href: '#services' },
      { name: 'E-Commerce Solutions', href: '#services' },
      { name: 'Branding & Growth Marketing', href: '#services' },
    ],
  },
  {
    label: 'Navigation',
    links: [
      { name: 'Featured Work', href: '#projects' },
      { name: 'Architecture & Tech', href: '#technology' },
      { name: 'Client Testimonials', href: '#testimonials' },
      { name: 'Contact & Inquiries', href: '#contact' },
    ],
  },
]

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Twitter / X', href: 'https://x.com' },
  { label: 'GitHub', href: 'https://github.com' },
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
    <footer className="footer-award" aria-label="Site footer">
      <div ref={cardRef} className="footer-glass-card">
        {/* Ambient sweep glow */}
        <div className="footer-glass-glow" aria-hidden="true" />
        <div className="footer-cursor-spotlight" aria-hidden="true" />

        {/* Top Section */}
        <div className="footer-top-grid">
          <div className="footer-brand-block">
            <span className="footer-logo font-display">INSPIREZEST</span>
            <p className="footer-tagline font-display">
              ARCHITECTING THE FUTURE <br />
              OF DIGITAL EXPERIENCES.
            </p>
            <p className="footer-subtext">
              Transforming bold business ideas into scalable software platforms, converting brands,
              and category-leading products.
            </p>
          </div>

          <div className="footer-nav-grid">
            {NAV_COLS.map((col) => (
              <div key={col.label} className="footer-nav-col">
                <span className="footer-nav-label">{col.label}</span>
                <ul role="list">
                  {col.links.map((l) => (
                    <li key={l.name}>
                      <a href={l.href} className="footer-nav-link">
                        {l.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="footer-nav-col">
              <span className="footer-nav-label">Global Offices</span>
              <div className="footer-office-loc">
                <div className="footer-loc-item">
                  <MapPin size={14} className="text-cyan-400" />
                  <span>Kollam, Kerala, India</span>
                </div>
                <div className="footer-loc-item">
                  <Globe size={14} className="text-purple-400" />
                  <span>Abu Dhabi, UAE</span>
                </div>
              </div>

              <span className="footer-nav-label" style={{ marginTop: '1.5rem' }}>
                Follow Us
              </span>
              <ul role="list" className="footer-social-list">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      className="footer-nav-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copy">
            © {new Date().getFullYear()} Inspire Zest Technologies Pvt Ltd. All rights reserved.
          </div>
          <div className="footer-legal-links">
            <a href="#portal-opening">Back to Top ↑</a>
          </div>
        </div>

        {/* Huge Watermark */}
        <div className="footer-watermark font-display" aria-hidden="true">
          INSPIRE ZEST
        </div>
      </div>
    </footer>
  )
}
