import { useState, useEffect } from 'react'

export type DeviceTier = 'high' | 'normal' | 'mobile' | 'low'

function detectTier(): DeviceTier {
  if (typeof window === 'undefined') return 'normal'

  // Mobile / touch devices
  const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
  if (isTouch) return 'mobile'

  // Check hardware concurrency
  const cores = navigator.hardwareConcurrency ?? 2
  if (cores <= 2) return 'low'

  // Check GPU via canvas
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null
    if (!gl) return 'low'
    const dbgInfo = gl.getExtension('WEBGL_debug_renderer_info')
    if (dbgInfo) {
      const renderer = gl.getParameter(dbgInfo.UNMASKED_RENDERER_WEBGL) as string
      // Simple heuristics for low-end GPU detection
      const lowEndKeywords = ['intel hd graphics 4', 'intel hd 4', 'intel hd 3', 'mesa', 'llvm', 'softpipe']
      if (lowEndKeywords.some(k => renderer.toLowerCase().includes(k))) {
        return cores >= 4 ? 'normal' : 'low'
      }
    }
    return cores >= 8 ? 'high' : 'normal'
  } catch {
    return 'normal'
  }
}

export function useWebGLCapability() {
  const [tier, setTier] = useState<DeviceTier>('normal')
  const [supportsWebGL, setSupportsWebGL] = useState(true)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) {
        setSupportsWebGL(false)
        setTier('low')
        return
      }
      setTier(detectTier())
    } catch {
      setSupportsWebGL(false)
      setTier('low')
    }
  }, [])

  return {
    tier,
    supportsWebGL,
    isHigh:   tier === 'high',
    isNormal: tier === 'normal',
    isMobile: tier === 'mobile',
    isLow:    tier === 'low',
    particleCount: {
      high:   8000,
      normal: 4000,
      mobile: 1500,
      low:    500,
    }[tier],
  }
}
