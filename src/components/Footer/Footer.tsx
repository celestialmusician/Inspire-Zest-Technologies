import { useRef, useEffect } from 'react'
import { MapPin, Globe } from 'lucide-react'
import { getLenis } from '@/hooks/useLenis'
import './Footer.css'

const NAV_COLS = [
  {
    label: 'Our Services',
    links: [
      { name: 'Web Development', href: '#services' },
      { name: 'Mobile App Development', href: '#services' },
      { name: 'AI Integrations', href: '#services' },
      { name: 'ERP Development', href: '#services' },
      { name: 'E-Commerce Development', href: '#services' },
      { name: 'Digital Marketing & Branding', href: '#services' },
      { name: 'SEO & Google Ads', href: '#services' },
      { name: 'Logo Designing', href: '#services' },
    ],
  },
  {
    label: 'Navigation',
    links: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Work', href: '#projects' },
      { name: 'Why Choose Us', href: '#why-us' },
      { name: 'Client Testimonials', href: '#testimonials' },
      { name: 'Contact Us', href: '#contact' },
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

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault()
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

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
              BEST ECOMMERCE &amp; WEB DEVELOPMENT <br />
              COMPANY IN KOLLAM, KERALA.
            </p>
            <p className="footer-subtext">
              Innovative and cutting-edge software solutions tailored to meet the evolving needs of
              businesses in the digital era. We dedicate ourselves for your success with all our
              resources.
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
                  <span>2nd Floor, Velayudha Mansion, SN College Junction, Kollam, Kerala, India – 691001</span>
                </div>
                <div className="footer-loc-item">
                  <Globe size={14} className="text-purple-400" />
                  <span>M26, Mussafah, Abu Dhabi, UAE</span>
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
            <button
              type="button"
              onClick={scrollToTop}
              className="footer-back-to-top"
              aria-label="Scroll back to top"
              data-cursor="pointer"
            >
              <span>Back to Top</span>
              <span className="footer-top-arrow" aria-hidden="true">↑</span>
            </button>
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

