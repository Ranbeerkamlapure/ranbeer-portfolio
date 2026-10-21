import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uChrome;
  uniform vec3 uIce;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    float fresnel = pow(1.0 - max(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0), 2.2);
    float bands = sin((vPosition.y * 4.0 + uTime * 0.6) + sin(vPosition.x * 3.0 + uTime * 0.4)) * 0.5 + 0.5;
    vec3 base = mix(uChrome * 0.35, uIce * 0.55, bands * 0.35);
    vec3 color = mix(base, uIce, fresnel * 0.65);
    float alpha = 0.22 + fresnel * 0.45;
    gl_FragColor = vec4(color, alpha);
  }
`

function ChromeOrb({ reduced }) {
  const matRef = useRef(null)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uChrome: { value: new THREE.Color('#d8e0e8') },
      uIce: { value: new THREE.Color('#a5f3fc') },
    }),
    [],
  )

  useFrame((_, delta) => {
    if (reduced || !matRef.current) return
    matRef.current.uniforms.uTime.value += delta
  })

  return (
    <Sphere args={[1.15, 64, 64]} scale={1.05}>
      <shaderMaterial
        ref={matRef}
        transparent
        depthWrite={false}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </Sphere>
  )
}

export default function ChromeScene() {
  const reduced = usePrefersReducedMotion()
  const wrapRef = useRef(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = wrapRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return undefined

    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  if (reduced) {
    return (
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-50"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 50% 45% at 75% 40%, rgba(165,243,252,0.12), transparent 60%)',
        }}
      />
    )
  }

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
      {visible && (
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0, 3.4], fov: 42 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.35} />
            <directionalLight position={[3, 2, 4]} intensity={0.8} color="#d8e0e8" />
            <ChromeOrb reduced={false} />
          </Suspense>
        </Canvas>
      )}
    </div>
  )
}
