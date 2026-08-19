import React, { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { getLenis } from '@/hooks/useLenis'
import './ScrollToTop.css'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`scroll-to-top-btn ${visible ? 'scroll-to-top-btn--visible' : ''}`}
      aria-label="Scroll back to top of page"
      data-cursor="pointer"
    >
      <ArrowUp size={18} className="scroll-to-top-icon" />
    </button>
  )
}
