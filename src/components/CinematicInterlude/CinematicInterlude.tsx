import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsap } from '@/hooks/useGsap'
import { useWebGLCapability } from '@/hooks/useWebGLCapability'
import './CinematicInterlude.css'

gsap.registerPlugin(ScrollTrigger)

// Custom GLSL particle morph shader
const vertexShader = `
  attribute float aSize;
  attribute vec3 aTargetPosition;
  uniform float uTime;
  uniform float uMorph;
  uniform float uMouseX;
  uniform float uMouseY;
  varying float vMorph;
  varying vec3 vPos;

  void main() {
    // Morph between TorusKnot sphere and expansive galaxy ribbon
    vec3 mixedPos = mix(position, aTargetPosition, uMorph);
    
    // Wave ripple distortion based on uTime and position
    float wave = sin(uTime * 1.5 + mixedPos.x * 2.0 + mixedPos.y * 1.5) * 0.15;
    mixedPos.z += wave;

    // Mouse influence
    mixedPos.x += (uMouseX * 0.4) * (sin(uTime + mixedPos.z));
    mixedPos.y += (uMouseY * 0.4) * (cos(uTime + mixedPos.z));

    vec4 mvPos = modelViewMatrix * vec4(mixedPos, 1.0);
    gl_PointSize = aSize * (45.0 / -mvPos.z);
    gl_Position = projectionMatrix * mvPos;

    vMorph = uMorph;
    vPos = mixedPos;
  }
`

const fragmentShader = `
  varying float vMorph;
  varying vec3 vPos;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.0, dist);
    
    // Chromatic transition: Purple (#B026FF) -> Cyan (#00D2FF)
    vec3 purple = vec3(0.69, 0.15, 1.0);
    vec3 cyan   = vec3(0.0, 0.82, 1.0);
    vec3 col    = mix(purple, cyan, sin(vPos.x * 2.0 + vPos.z) * 0.5 + 0.5);

    gl_FragColor = vec4(col, alpha * 0.75);
  }
`

function MorphingParticles({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null)
  const matRef    = useRef<THREE.ShaderMaterial>(null)

  const { initialPositions, targetPositions, sizes } = useMemo(() => {
    const init = new Float32Array(count * 3)
    const target = new Float32Array(count * 3)
    const sz = new Float32Array(count)

    // Torus knot geometry for initial state
    const knotGeo = new THREE.TorusKnotGeometry(1.5, 0.4, count / 8, 16)
    const knotPos = knotGeo.attributes.position.array

    for (let i = 0; i < count; i++) {
      // Set initial from knot
      const kIdx = (i % (knotPos.length / 3)) * 3
      init[i * 3]     = knotPos[kIdx]
      init[i * 3 + 1] = knotPos[kIdx + 1]
      init[i * 3 + 2] = knotPos[kIdx + 2]

      // Set target: expansive spiral galaxy
      const theta = Math.random() * Math.PI * 4
      const radius = 1.2 + theta * 0.4
      target[i * 3]     = Math.cos(theta) * radius + (Math.random() - 0.5) * 0.5
      target[i * 3 + 1] = (Math.random() - 0.5) * 2.0
      target[i * 3 + 2] = Math.sin(theta) * radius + (Math.random() - 0.5) * 0.5

      sz[i] = Math.random() * 1.8 + 0.6
    }

    return { initialPositions: init, targetPositions: target, sizes: sz }
  }, [count])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(initialPositions, 3))
    geo.setAttribute('aTargetPosition', new THREE.BufferAttribute(targetPositions, 3))
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    return geo
  }, [initialPositions, targetPositions, sizes])

  const shaderMat = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime:   { value: 0 },
      uMorph:  { value: 0 },
      uMouseX: { value: 0 },
      uMouseY: { value: 0 },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), [])

  useFrame((state, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta
      matRef.current.uniforms.uMouseX.value = state.mouse.x
      matRef.current.uniforms.uMouseY.value = state.mouse.y
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.12
      pointsRef.current.rotation.x += delta * 0.05
    }
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <primitive object={shaderMat} ref={matRef} attach="material" />
    </points>
  )
}

export default function CinematicInterlude() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef  = useRef<HTMLDivElement>(null)
  const { supportsWebGL, particleCount } = useWebGLCapability()

  useGsap(() => {
    // ScrollTrigger scrub morphing animation
    const mat = canvasRef.current?.querySelector('canvas')
    if (sectionRef.current) {
      gsap.to('.ci-bg-text', {
        xPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      })

      gsap.fromTo('.ci-word',
        { yPercent: 120, rotateX: -40, opacity: 0 },
        {
          yPercent: 0, rotateX: 0, opacity: 1,
          stagger: 0.15,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.ci-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    }
  }, [], sectionRef)

  return (
    <section
      ref={sectionRef}
      id="cinematic-interlude"
      className="ci-root scene"
      aria-label="Interactive digital core transition"
    >
      {/* 3D WebGL Canvas */}
      {supportsWebGL && (
        <div ref={canvasRef} className="ci-canvas" aria-hidden="true">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]}>
            <MorphingParticles count={Math.min(particleCount * 2, 4000)} />
          </Canvas>
        </div>
      )}

      {/* Parallax giant kinetic text in background */}
      <div className="ci-bg-text-wrap" aria-hidden="true">
        <div className="ci-bg-text font-display">
          PRECISION · INNOVATION · ELEVATION · FUTURE
        </div>
      </div>

      {/* Foreground cinematic content */}
      <div className="ci-content">
        <span className="ci-tag" aria-hidden="true">02 — THE VISION</span>
        <h2 className="ci-title font-display">
          <div className="ci-wrap"><span className="ci-word">CRAFTING</span></div>
          <div className="ci-wrap"><span className="ci-word text-gradient-brand">DIGITAL</span></div>
          <div className="ci-wrap"><span className="ci-word">FUTURE.</span></div>
        </h2>
        <p className="ci-desc">
          Where high-performance engineering meets cinematic visual direction.
        </p>
      </div>

      {/* Ambient background glow */}
      <div className="ci-glow" aria-hidden="true" />
    </section>
  )
}
