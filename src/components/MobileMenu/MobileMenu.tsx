import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import ThemeSwitch from '@/components/ThemeSwitch'
import './MobileMenu.css'

interface Link {
  label: string
  href: string
}

interface Props {
  open: boolean
  links: Link[]
  onClose: () => void
  onNavigate: (href: string) => void
}

export default function MobileMenu({ open, links, onClose, onNavigate }: Props) {
  const rootRef    = useRef<HTMLDivElement>(null)
  const itemsRef   = useRef<HTMLUListElement>(null)
  const tlRef      = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      tlRef.current = gsap.timeline({ paused: true })
        .to(rootRef.current, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.6,
          ease: 'power3.inOut',
        })
        .fromTo(
          '.mm-item',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out' },
          '-=0.2'
        )
        .fromTo(
          '.mm-footer',
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          '-=0.2'
        )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      tlRef.current?.play()
    } else {
      document.body.style.overflow = ''
      tlRef.current?.reverse()
    }
  }, [open])

  return (
    <div
      ref={rootRef}
      className={`mm-root ${open ? 'mm-root--open' : ''}`}
      aria-hidden={!open}
      aria-modal="true"
      role="dialog"
      aria-label="Navigation menu"
    >
      {/* Close */}
      <button className="mm-close" onClick={onClose} aria-label="Close menu">
        ✕
      </button>

      <nav>
        <ul ref={itemsRef} className="mm-list" role="list">
          {links.map((l, i) => (
            <li key={l.href} className="mm-item">
              <button
                className="mm-link"
                onClick={() => onNavigate(l.href)}
                tabIndex={open ? 0 : -1}
              >
                <span className="mm-num">0{i + 1}</span>
                {l.label}
              </button>
            </li>
          ))}
          <li className="mm-item">
            <button
              className="mm-link mm-link--cta"
              onClick={() => onNavigate('#contact')}
              tabIndex={open ? 0 : -1}
            >
              <span className="mm-num">—</span>
              Let's Talk →
            </button>
          </li>
        </ul>
      </nav>

      <div className="mm-footer">
        <div className="mm-theme-row">
          <span className="mm-theme-label">THEME:</span>
          <ThemeSwitch />
        </div>
        <p>Kollam · Kerala · India</p>
        <p className="mm-footer-copy">Copyright © {new Date().getFullYear()} All rights reserved | InspireZest Technologies Pvt Ltd</p>
      </div>
    </div>
  )
}
