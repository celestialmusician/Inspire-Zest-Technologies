import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './LoadingScreen.css'

interface Props {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { val: 0 }

      const tl = gsap.timeline({
        onComplete: () => {
          // Standard minimal slide-up reveal
          gsap.to(rootRef.current, {
            yPercent: -100,
            duration: 0.85,
            ease: 'power3.inOut',
            onComplete,
          })
        },
      })

      // Minimal brand title reveal
      tl.fromTo(
        '.min-ls-brand',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.1
      )

      // Minimal progress fill & counter
      tl.to(
        counter,
        {
          val: 100,
          duration: 1.3,
          ease: 'power2.inOut',
          onUpdate: () => {
            setPercent(Math.floor(counter.val))
          },
        },
        0.2
      )

      tl.to(
        '.min-ls-bar-fill',
        {
          width: '100%',
          duration: 1.3,
          ease: 'power2.inOut',
        },
        0.2
      )

      // Brief hold before exit
      tl.to({}, { duration: 0.2 })
    }, rootRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={rootRef}
      className="min-ls-root"
      aria-live="polite"
      aria-label="Loading InspireZest"
    >
      <div className="min-ls-content">
        {/* Minimal Clean Logo */}
        <div className="min-ls-brand">
          <span className="min-ls-logo">INSPIREZEST</span>
          <span className="min-ls-tagline">DIGITAL EXPERIENCES</span>
        </div>

        {/* Minimal Hairline Progress Bar */}
        <div className="min-ls-bar-track" aria-hidden="true">
          <div className="min-ls-bar-fill" />
        </div>

        {/* Minimal Percentage Counter */}
        <div className="min-ls-counter" aria-hidden="true">
          <span>{percent}%</span>
        </div>
      </div>
    </div>
  )
}
