import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useWebGLCapability } from '@/hooks/useWebGLCapability'
import { useIsTouch, usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import './GlobalBackground.css'

gsap.registerPlugin(ScrollTrigger)

// GLSL Shader for interactive quantum particles with top-to-bottom motion
const vertexShader = `
  attribute float aSize;
  attribute float aAlpha;
  attribute float aSpeed;
  uniform float uTime;
  uniform float uScrollProgress;
  uniform vec2 uMouse;
  varying float vAlpha;
  varying vec3 vPos;

  void main() {
    vec3 pos = position;

    // Continuous downward ambient waterfall flow + scroll offset
    float fallOffset = mod(uTime * aSpeed * 0.4 + uScrollProgress * 6.0, 16.0);
    pos.y = pos.y - fallOffset;
    if (pos.y < -8.0) {
      pos.y += 16.0;
    }

    // Subtle horizontal wave
    pos.x += sin(uTime * 0.4 + pos.y * 0.5) * 0.15;
    pos.z += cos(uTime * 0.3 + pos.x * 0.5) * 0.15;

    // 3D Mouse repulsion
    vec2 m = uMouse * 4.0;
    float dist = distance(pos.xy, m);
    if (dist < 2.0) {
      float force = (2.0 - dist) / 2.0;
      vec2 dir = normalize(pos.xy - m);
      pos.xy += dir * force * 0.4;
      pos.z += force * 0.6;
    }

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (35.0 / -mvPos.z);
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

    // Glowing Neon Cyan (#00F0FF) to Ultra Violet (#BF5AF2) & Emerald (#30D158)
    vec3 cyan    = vec3(0.0, 0.94, 1.0);
    vec3 violet  = vec3(0.75, 0.35, 0.95);
    vec3 emerald = vec3(0.18, 0.82, 0.34);
    
    vec3 col = mix(cyan, violet, sin(vPos.y * 0.5 + vPos.x) * 0.5 + 0.5);
    col = mix(col, emerald, cos(vPos.z * 0.8) * 0.3 + 0.3);

    gl_FragColor = vec4(col, alpha * 0.65);
  }
`

function BackgroundParticles({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null)
  const matRef    = useRef<THREE.ShaderMaterial>(null)
  const scrollRef = useRef(0)

  const { positions, sizes, alphas, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz  = new Float32Array(count)
    const al  = new Float32Array(count)
    const sp  = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 16
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10

      sz[i] = Math.random() * 1.8 + 0.6
      al[i] = Math.random() * 0.7 + 0.3
      sp[i] = Math.random() * 1.5 + 0.5
    }

    return { positions: pos, sizes: sz, alphas: al, speeds: sp }
  }, [count])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1))
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1))
    return geo
  }, [positions, sizes, alphas, speeds])

  const shaderMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uScrollProgress: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  )

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll > 0) {
        scrollRef.current = window.scrollY / maxScroll
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useFrame((state, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta
      matRef.current.uniforms.uScrollProgress.value = scrollRef.current
      matRef.current.uniforms.uMouse.value.set(state.mouse.x, state.mouse.y)
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015
    }
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

  const orbCyanRef    = useRef<HTMLDivElement>(null)
  const orbPurpleRef  = useRef<HTMLDivElement>(null)
  const orbBlueRef    = useRef<HTMLDivElement>(null)
  const gridTrackRef  = useRef<HTMLDivElement>(null)
  const laserBeamsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      // 1. GSAP ScrollTrigger-driven background light orb choreography from top to bottom
      gsap.to(orbCyanRef.current, {
        y: '120vh',
        x: '30vw',
        scale: 1.3,
        ease: 'none',
        scrollTrigger: {
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      })

      gsap.to(orbPurpleRef.current, {
        y: '-80vh',
        x: '-25vw',
        scale: 1.4,
        ease: 'none',
        scrollTrigger: {
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        },
      })

      gsap.to(orbBlueRef.current, {
        y: '60vh',
        scale: 1.2,
        ease: 'none',
        scrollTrigger: {
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.8,
        },
      })

      // 2. Animated Infinite Cybernetic Grid Scroll Scrub
      if (gridTrackRef.current) {
        gsap.to(gridTrackRef.current, {
          backgroundPositionY: '800px',
          ease: 'none',
          scrollTrigger: {
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        })
      }
    })

    return () => ctx.revert()
  }, [reduced])

  // Mouse parallax on orbs
  useEffect(() => {
    if (isTouch || reduced) return

    const xCyan   = gsap.quickTo(orbCyanRef.current, 'x', { duration: 1.6, ease: 'power2.out' })
    const yCyan   = gsap.quickTo(orbCyanRef.current, 'y', { duration: 1.6, ease: 'power2.out' })
    const xPurple = gsap.quickTo(orbPurpleRef.current, 'x', { duration: 2.0, ease: 'power2.out' })
    const yPurple = gsap.quickTo(orbPurpleRef.current, 'y', { duration: 2.0, ease: 'power2.out' })

    const handleMouse = (e: MouseEvent) => {
      const x = e.clientX - window.innerWidth / 2
      const y = e.clientY - window.innerHeight / 2
      xCyan(x * 0.2)
      yCyan(y * 0.2)
      xPurple(-x * 0.15)
      yPurple(-y * 0.15)
    }

    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [isTouch, reduced])

  return (
    <div className="gb-root" aria-hidden="true">
      {/* 1. Three.js interactive 3D WebGL particle rainfall */}
      {supportsWebGL && !reduced && (
        <div className="gb-canvas">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
            <BackgroundParticles count={Math.min(particleCount, 1600)} />
          </Canvas>
        </div>
      )}

      {/* 2. Floating Chromatic Aurora Light Orbs */}
      <div ref={orbCyanRef} className="gb-orb gb-orb--cyan" />
      <div ref={orbPurpleRef} className="gb-orb gb-orb--purple" />
      <div ref={orbBlueRef} className="gb-orb gb-orb--blue" />

      {/* 3. Top-to-Bottom Glowing Laser Beams */}
      <div ref={laserBeamsRef} className="gb-laser-beams">
        <div className="gb-beam gb-beam--1" />
        <div className="gb-beam gb-beam--2" />
        <div className="gb-beam gb-beam--3" />
      </div>

      {/* 4. Perspective Cybernetic Grid Mesh with Scroll Motion */}
      <div ref={gridTrackRef} className="gb-grid-overlay" />

      {/* 5. Vignette & Depth Mask */}
      <div className="gb-vignette" />
    </div>
  )
}
