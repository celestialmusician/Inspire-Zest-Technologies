import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useIsTouch, usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import './CustomCursor.css'

export type CursorState = 'default' | 'view' | 'explore' | 'open' | 'drag' | 'go'

export default function CustomCursor() {
  const isTouch   = useIsTouch()
  const reduced   = usePrefersReducedMotion()
  const dotRef    = useRef<HTMLDivElement>(null)
  const ringRef   = useRef<HTMLDivElement>(null)
  const labelRef  = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (isTouch || reduced) return

    const xDot  = gsap.quickTo(dotRef.current, 'x', { duration: 0.08, ease: 'power3.out' })
    const yDot  = gsap.quickTo(dotRef.current, 'y', { duration: 0.08, ease: 'power3.out' })
    const xRing = gsap.quickTo(ringRef.current, 'x', { duration: 0.35, ease: 'power3.out' })
    const yRing = gsap.quickTo(ringRef.current, 'y', { duration: 0.35, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)
    }

    const setState = (state: CursorState) => {
      const labels: Record<CursorState, string> = {
        default: '',
        view:    'VIEW',
        explore: 'EXPLORE',
        open:    'OPEN',
        drag:    'DRAG',
        go:      'LET\'S GO',
      }
      if (labelRef.current) labelRef.current.textContent = labels[state]
      if (ringRef.current) ringRef.current.setAttribute('data-state', state)
    }

    const onEnter = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('[data-cursor="view"]'))         setState('view')
      else if (el.closest('[data-cursor="explore"]')) setState('explore')
      else if (el.closest('[data-cursor="open"]'))    setState('open')
      else if (el.closest('[data-cursor="drag"]'))    setState('drag')
      else if (el.closest('[data-cursor="go"]'))      setState('go')
      else if (el.closest('button, a, input, select, textarea')) setState('explore')
      else setState('default')
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
    }
  }, [isTouch, reduced])

  if (isTouch || reduced) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" data-state="default" aria-hidden="true">
        <span ref={labelRef} className="cursor-label" />
      </div>
    </>
  )
}
