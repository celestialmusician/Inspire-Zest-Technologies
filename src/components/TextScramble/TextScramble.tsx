import { useEffect, useRef, useState, useCallback } from 'react'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#________0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

interface TextScrambleProps {
  text: string
  className?: string
  triggerOnScroll?: boolean
  triggerOnHover?: boolean
  speed?: number
  as?: keyof React.JSX.IntrinsicElements
  onComplete?: () => void
}

export default function TextScramble({
  text,
  className = '',
  triggerOnScroll = true,
  triggerOnHover = true,
  speed = 30,
  as: Component = 'span',
  onComplete,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text)
  const elementRef = useRef<HTMLElement>(null)
  const isScramblingRef = useRef(false)
  const intervalRef = useRef<number | null>(null)

  const scramble = useCallback(() => {
    if (isScramblingRef.current) return
    isScramblingRef.current = true

    let iteration = 0
    const targetLength = text.length

    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = window.setInterval(() => {
      setDisplayText(() =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) {
              return text[index]
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join('')
      )

      if (iteration >= targetLength) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        isScramblingRef.current = false
        setDisplayText(text)
        if (onComplete) onComplete()
      }

      iteration += 1 / 2
    }, speed)
  }, [text, speed, onComplete])

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    if (triggerOnScroll) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              scramble()
            }
          })
        },
        { threshold: 0.2 }
      )
      observer.observe(el)
      return () => observer.disconnect()
    }
  }, [scramble, triggerOnScroll])

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      scramble()
    }
  }

  const Tag = Component as any

  return (
    <Tag
      ref={elementRef}
      className={`text-scramble-item ${className}`}
      onMouseEnter={handleMouseEnter}
      style={{ willChange: 'contents' }}
    >
      {displayText}
    </Tag>
  )
}
