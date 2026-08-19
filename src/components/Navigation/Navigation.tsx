import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getLenis } from '@/hooks/useLenis'
import MobileMenu from '@/components/MobileMenu'
import './Navigation.css'


gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const navRef      = useRef<HTMLElement>(null)
  const [scrolled, setScrolled]       = useState(false)
  const [menuOpen, setMenuOpen]       = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -80px',
        onEnter:     () => setScrolled(true),
        onLeaveBack: () => setScrolled(false),
      })
    })
    return () => ctx.revert()
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (!el) return
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(el, { offset: -80, duration: 1.4 })
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
        aria-label="Main navigation"
      >
        <button
          className="nav-logo"
          onClick={() => scrollTo('#hero')}
          aria-label="InspireZest Technologies — scroll to top"
        >
          INSPIREZEST
        </button>



        {/* Desktop links */}
        <ul className="nav-links" role="list">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <button
                className="nav-link"
                onClick={() => scrollTo(l.href)}
                data-cursor="explore"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right Nav Group */}
        <div className="nav-right">
          <div className="nav-actions">
            {/* CTA */}
            <button
              className="nav-cta"
              onClick={() => scrollTo('#contact')}
              data-cursor="go"
              aria-label="Start a conversation"
            >
              LET'S TALK
              <span className="nav-cta-arrow" aria-hidden="true">→</span>
            </button>
          </div>

          {/* Mobile hamburger */}

          <button
            className={`nav-hamburger ${menuOpen ? 'nav-hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <MobileMenu
        open={menuOpen}
        links={NAV_LINKS}
        onClose={() => setMenuOpen(false)}
        onNavigate={scrollTo}
      />
    </>
  )
}
