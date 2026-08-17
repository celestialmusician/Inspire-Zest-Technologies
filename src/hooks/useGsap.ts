import { useEffect, useRef, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGsap<T extends Element>(
  callback: (ctx: gsap.Context) => void,
  deps: unknown[] = [],
  scopeRef?: RefObject<T | null>
) {
  const contextRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    const ctx = gsap.context(callback, scopeRef?.current || undefined)
    contextRef.current = ctx
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return contextRef
}
