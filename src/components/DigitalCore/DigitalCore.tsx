import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { DeviceTier } from '@/hooks/useWebGLCapability'

interface Props {
  tier: DeviceTier
}

// Particle vertex shader
const vertexShader = `
  attribute float aSize;
  attribute float aSpeed;
  uniform float uTime;
  uniform float uScroll;
  varying float vOpacity;

  void main() {
    vec3 pos = position;

    // Gentle orbital drift
    float angle = uTime * aSpeed * 0.3;
    pos.x += sin(angle + pos.z * 0.5) * 0.05;
    pos.y += cos(angle + pos.x * 0.5) * 0.05;

    // Scroll: fragment particles outward
    pos *= (1.0 + uScroll * 1.5);
    pos.z += uScroll * -3.0;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (35.0 / -mvPos.z);
    gl_Position = projectionMatrix * mvPos;

    vOpacity = 1.0 - smoothstep(0.0, 1.0, uScroll);
  }
`

const fragmentShader = `
  varying float vOpacity;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d) * vOpacity;
    gl_FragColor = vec4(0.96, 0.96, 0.94, alpha * 0.4);
  }
`

export default function DigitalCore({ tier }: Props) {
  const meshRef      = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const matRef       = useRef<THREE.ShaderMaterial>(null)
  const { mouse }    = useThree()

  const particleCount = tier === 'high' ? 3000 : tier === 'normal' ? 1500 : 600

  // Core geometry: subdivided icosahedron
  const coreGeo = useMemo(() => new THREE.IcosahedronGeometry(1.2, tier === 'high' ? 3 : 2), [tier])
  const coreMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: 0x050505,
    wireframe: true,
  }), [])

  // Wireframe overlay
  const wireMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: 0x666660,
    wireframe: true,
    transparent: true,
    opacity: 0.75,
  }), [])

  // Particles around the core
  const { positions, sizes, speeds } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const sizes     = new Float32Array(particleCount)
    const speeds    = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      // Distribute on sphere + slight randomness
      const theta  = Math.random() * Math.PI * 2
      const phi    = Math.acos(2 * Math.random() - 1)
      const r      = 1.5 + Math.random() * 1.2

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      sizes[i]  = Math.random() * 2 + 0.5
      speeds[i] = Math.random() * 0.5 + 0.2
    }
    return { positions, sizes, speeds }
  }, [particleCount])

  const particleGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aSize',    new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('aSpeed',   new THREE.BufferAttribute(speeds, 1))
    return geo
  }, [positions, sizes, speeds])

  const shaderMat = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime:   { value: 0 },
      uScroll: { value: 0 },
    },
    transparent: true,
    depthWrite: false,
  }), [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    // Update shader uniforms
    if (shaderMat.uniforms) {
      shaderMat.uniforms.uTime.value = t
    }

    // Core slow rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.08
      meshRef.current.rotation.x += delta * 0.04
      // Mouse influence (subtle)
      meshRef.current.rotation.y += mouse.x * 0.003
      meshRef.current.rotation.x += mouse.y * 0.003
    }

    // Particles opposite rotation
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= delta * 0.04
      particlesRef.current.rotation.x -= delta * 0.02
    }
  })

  return (
    <group position={[1.5, 0, 0]}>
      {/* Ambient light */}
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={0.4} color="#B026FF" />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color="#0099FF" />

      {/* Core mesh */}
      <mesh ref={meshRef} geometry={coreGeo} material={wireMat} />

      {/* Inner solid */}
      <mesh geometry={new THREE.IcosahedronGeometry(0.85, 1)} material={coreMat} />

      {/* Particles */}
      <points ref={particlesRef} geometry={particleGeo} material={shaderMat} />
    </group>
  )
}
