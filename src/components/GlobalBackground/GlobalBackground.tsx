import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useWebGLCapability } from '@/hooks/useWebGLCapability'
import { useIsTouch, usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import './GlobalBackground.css'

gsap.registerPlugin(ScrollTrigger)

// GLSL Shader for global interactive background particles with Scroll Warp
const vertexShader = `
  attribute float aSize;
  attribute float aAlpha;
  uniform float uTime;
  uniform float uScrollSpeed;
  uniform vec2 uMouse;
  varying float vAlpha;
  varying vec3 vPos;

  void main() {
    vec3 pos = position;

    // Continuous ambient drift + Scroll acceleration
    pos.z += sin(uTime * 0.3 + pos.x) * 0.1;
    pos.y += cos(uTime * 0.2 + pos.z) * 0.1;

    // 3D Mouse interaction
    vec2 m = uMouse * 4.0;
    float dist = distance(pos.xy, m);
    if (dist < 1.8) {
      float force = (1.8 - dist) / 1.8;
      vec2 dir = normalize(pos.xy - m);
      pos.xy += dir * force * 0.35;
      pos.z += force * 0.5;
    }

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    
    // Warp particle size during scroll
    float warpSize = aSize * (32.0 / -mvPos.z) * (1.0 + uScrollSpeed * 0.08);
    gl_PointSize = clamp(warpSize, 1.0, 60.0);
    gl_Position = projectionMatrix * mvPos;

    vAlpha = aAlpha;
    vPos = pos;
  }
`

const fragmentShader = `
  varying float vAlpha;
  varying vec3 vPos;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;

    // Apple Pro Neon Cyan (#00F0FF) to Titanium Silver / Violet (#BF5AF2)
    vec3 cyan   = vec3(0.0, 0.94, 1.0);
    vec3 violet = vec3(0.75, 0.35, 0.95);
    vec3 col    = mix(cyan, violet, sin(vPos.x * 1.5 + vPos.z) * 0.5 + 0.5);

    gl_FragColor = vec4(col, alpha * 0.5);
  }
`

function BackgroundParticles({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null)
  const matRef    = useRef<THREE.ShaderMaterial>(null)
  const scrollVelRef = useRef(0)

  const { positions, sizes, alphas } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz  = new Float32Array(count)
    const al  = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 14
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8

      sz[i] = Math.random() * 1.6 + 0.6
      al[i] = Math.random() * 0.6 + 0.2
    }

    return { positions: pos, sizes: sz, alphas: al }
  }, [count])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1))
    return geo
  }, [positions, sizes, alphas])

  const shaderMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uScrollSpeed: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  )

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const currentY = window.scrollY
      const delta = Math.abs(currentY - lastY)
      lastY = currentY
      scrollVelRef.current = Math.min(delta * 0.08, 8.0)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useFrame((state, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta * (1.0 + scrollVelRef.current * 0.2)
      matRef.current.uniforms.uScrollSpeed.value = scrollVelRef.current
      matRef.current.uniforms.uMouse.value.set(state.mouse.x, state.mouse.y)
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02 * (1.0 + scrollVelRef.current * 0.15)
      pointsRef.current.rotation.x += delta * 0.01
    }

    // Decay scroll velocity smoothly
    scrollVelRef.current += (0 - scrollVelRef.current) * 0.06
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <primitive object={shaderMat} ref={matRef} attach="material" />
    </points>
  )
}

export default function GlobalBackground() {
  const { supportsWebGL, particleCount } = useWebGLCapability()
  const isTouch = useIsTouch()
  const reduced = usePrefersReducedMotion()

  const glowPurpleRef = useRef<HTMLDivElement>(null)
  const glowCyanRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isTouch || reduced) return

    const xPurple = gsap.quickTo(glowPurpleRef.current, 'x', { duration: 1.2, ease: 'power2.out' })
    const yPurple = gsap.quickTo(glowPurpleRef.current, 'y', { duration: 1.2, ease: 'power2.out' })
    const xCyan   = gsap.quickTo(glowCyanRef.current, 'x', { duration: 1.8, ease: 'power2.out' })
    const yCyan   = gsap.quickTo(glowCyanRef.current, 'y', { duration: 1.8, ease: 'power2.out' })

    const handleMouse = (e: MouseEvent) => {
      const x = e.clientX - window.innerWidth / 2
      const y = e.clientY - window.innerHeight / 2
      xPurple(x * 0.3)
      yPurple(y * 0.3)
      xCyan(-x * 0.25)
      yCyan(-y * 0.25)
    }

    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [isTouch, reduced])

  return (
    <div className="gb-root" aria-hidden="true">
      {/* Three.js interactive WebGL particle field with scroll warp */}
      {supportsWebGL && !reduced && (
        <div className="gb-canvas">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
            <BackgroundParticles count={Math.min(particleCount, 1500)} />
          </Canvas>
        </div>
      )}

      {/* Interactive mouse-tracking ambient glow orbs */}
      <div ref={glowPurpleRef} className="gb-glow gb-glow--purple" />
      <div ref={glowCyanRef} className="gb-glow gb-glow--cyan" />

      {/* Subtle modern background grid mesh */}
      <div className="gb-grid-overlay" />
    </div>
  )
}
