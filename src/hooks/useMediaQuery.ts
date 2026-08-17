import { useState, useEffect } from 'react'

const breakpoints = {
  sm:  640,
  md:  768,
  lg:  1024,
  xl:  1280,
  '2xl': 1536,
} as const

type Breakpoint = keyof typeof breakpoints

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mq = window.matchMedia(query)
    setMatches(mq.matches)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])

  return matches
}

export function useBreakpoint(bp: Breakpoint): boolean {
  return useMediaQuery(`(min-width: ${breakpoints[bp]}px)`)
}

export function useIsMobile(): boolean {
  return !useMediaQuery('(min-width: 768px)')
}

export function useIsTouch(): boolean {
  return useMediaQuery('(hover: none) and (pointer: coarse)')
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
