import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsap } from '@/hooks/useGsap'
import { useWebGLCapability } from '@/hooks/useWebGLCapability'
import { technologies } from '@/data/technologies'
import { SplineScene } from '@/components/ui/splite'
import './TechnologyNetwork.css'

gsap.registerPlugin(ScrollTrigger)

// ── Network Scene ────────────────────────────────────────────
function NetworkScene({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef  = useRef<THREE.LineSegments>(null)

  const nodeCount = Math.min(technologies.length, count)

  const { positions, linePositions } = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3)
    const linePairs: number[] = []

    for (let i = 0; i < nodeCount; i++) {
      const theta = (i / nodeCount) * Math.PI * 2
      const r     = 1.5 + Math.random() * 0.8
      pos[i * 3]     = Math.cos(theta) * r + (Math.random() - 0.5) * 0.5
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.5
      pos[i * 3 + 2] = Math.sin(theta) * r * 0.5 + (Math.random() - 0.5) * 0.5
    }

    // Connect nearby nodes
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = pos[i*3] - pos[j*3]
        const dy = pos[i*3+1] - pos[j*3+1]
        const dist = Math.sqrt(dx*dx + dy*dy)
        if (dist < 2.2) {
          linePairs.push(
            pos[i*3], pos[i*3+1], pos[i*3+2],
            pos[j*3], pos[j*3+1], pos[j*3+2]
          )
        }
      }
    }

    return {
      positions: pos,
      linePositions: new Float32Array(linePairs),
    }
  }, [nodeCount])

  const pointGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [positions])

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    return g
  }, [linePositions])

  useFrame(({ clock, mouse }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.06 + mouse.x * 0.2
      pointsRef.current.rotation.x = mouse.y * 0.1
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = clock.elapsedTime * 0.06 + mouse.x * 0.2
      linesRef.current.rotation.x = mouse.y * 0.1
    }
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 3, 3]} intensity={0.5} color="#0099FF" />

      <points ref={pointsRef} geometry={pointGeo}>
        <pointsMaterial
          size={0.06}
          color="#F5F5F0"
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>

      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial
          color="#333330"
          transparent
          opacity={0.4}
          linewidth={1}
        />
      </lineSegments>
    </>
  )
}

// ── Component ────────────────────────────────────────────────
export default function TechnologyNetwork() {
  const sectionRef = useRef<HTMLElement>(null)
  const { supportsWebGL, particleCount } = useWebGLCapability()

  useGsap(() => {
    gsap.fromTo('.tech-heading',
      { opacity: 0, y: 30, rotateX: -25 },
      {
        opacity: 1, y: 0, rotateX: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.tech-header-wrapper',
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    gsap.fromTo('.tech-spline-container',
      { opacity: 0, scale: 0.94, y: 25 },
      {
        opacity: 1, scale: 1, y: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.tech-header-wrapper',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    gsap.fromTo('.tech-label',
      { opacity: 0, y: 30, scale: 0.85, rotateY: 15 },
      {
        opacity: 1, y: 0, scale: 1, rotateY: 0,
        stagger: 0.04,
        duration: 0.7,
        ease: 'back.out(1.6)',
        scrollTrigger: {
          trigger: '.tech-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    // Continuous scroll rotation drift
    gsap.to('.tech-canvas', {
      rotateZ: 5,
      y: -25,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      }
    })
  }, [], sectionRef)

  return (
    <section
      ref={sectionRef}
      id="technology"
      className="tech scene"
      aria-label="Technology stack"
    >
      <div className="tech-container">
        {/* Header & Spline 3D Scene Row */}
        <div className="tech-header-wrapper">
          <div className="tech-header-content">
            <div className="tech-header-text">
              <span className="tech-tag" aria-hidden="true">05 — TECHNOLOGY</span>
              <h2 className="tech-heading font-display">OUR STACK</h2>
              <p className="tech-sub">
                Built on proven technology, chosen for your project. Engineered for speed, scalability, and immersive next-gen experiences.
              </p>
            </div>

            {/* Floating Spline 3D Animation next to OUR STACK */}
            <div className="tech-spline-container">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="tech-spline-view"
              />
            </div>
          </div>
        </div>

        {/* Ambient WebGL Canvas Background */}
        {supportsWebGL && (
          <div className="tech-canvas" aria-hidden="true">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              dpr={[1, 1.5]}
              gl={{ antialias: false, alpha: true }}
            >
              <NetworkScene count={particleCount} />
            </Canvas>
          </div>
        )}

        {/* Tech labels grid */}
        <div className="tech-grid" role="list" aria-label="Technologies we use">
          {technologies.map((t) => (
            <div key={t.id} className="tech-label" role="listitem" data-cursor="explore">
              <span className="tech-label-dot" style={{ background: t.color }} aria-hidden="true" />
              <span className="tech-label-name">{t.name}</span>
              <span className="tech-label-cat">{t.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
