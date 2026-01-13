import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, MeshTransmissionMaterial, Environment, Stars } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

// Floating geometric shapes
function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null)
  const { mouse } = useThree()

  useFrame(() => {
    if (groupRef.current) {
      // Subtle rotation based on mouse
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.3,
        0.05
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.y * 0.2,
        0.05
      )
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main crystal/gem shape */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 0, 0]} scale={1.5}>
          <octahedronGeometry args={[1, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={16}
            resolution={512}
            transmission={0.95}
            roughness={0.1}
            thickness={0.5}
            ior={1.5}
            chromaticAberration={0.5}
            anisotropy={0.3}
            distortion={0.2}
            distortionScale={0.5}
            temporalDistortion={0.1}
            color="#8B5CF6"
          />
        </mesh>
      </Float>

      {/* Orbiting spheres */}
      <OrbitingSphere radius={3} speed={0.5} size={0.3} color="#06B6D4" offset={0} />
      <OrbitingSphere radius={3.5} speed={0.3} size={0.2} color="#EC4899" offset={Math.PI * 0.5} />
      <OrbitingSphere radius={2.5} speed={0.7} size={0.25} color="#3B82F6" offset={Math.PI} />
      <OrbitingSphere radius={4} speed={0.2} size={0.15} color="#F97316" offset={Math.PI * 1.5} />

      {/* Floating rings */}
      <FloatingRing position={[-2, 1, -1]} rotation={[0.5, 0, 0.3]} />
      <FloatingRing position={[2.5, -0.5, -0.5]} rotation={[-0.3, 0.5, 0]} />

      {/* Scattered particles */}
      <Particles count={200} />
    </group>
  )
}

// Orbiting sphere component
function OrbitingSphere({ radius, speed, size, color, offset }: {
  radius: number
  speed: number
  size: number
  color: string
  offset: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed + offset
      meshRef.current.position.x = Math.cos(t) * radius
      meshRef.current.position.z = Math.sin(t) * radius
      meshRef.current.position.y = Math.sin(t * 2) * 0.5
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 32, 32]} />
      <MeshDistortMaterial
        color={color}
        distort={0.3}
        speed={2}
        roughness={0}
        metalness={0.8}
      />
    </mesh>
  )
}

// Floating ring component
function FloatingRing({ position, rotation }: {
  position: [number, number, number]
  rotation: [number, number, number]
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation[0] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.8, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#8B5CF6"
          emissiveIntensity={0.5}
          metalness={1}
          roughness={0}
        />
      </mesh>
    </Float>
  )
}

// Particle system
function Particles({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return positions
  }, [count])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02
      points.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#8B5CF6"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  )
}

// Animated gradient background plane
function GradientBackground() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current && meshRef.current.material) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      if (material.uniforms) {
        material.uniforms.uTime.value = state.clock.elapsedTime
      }
    }
  })

  const gradientShader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#030305') },
      uColor2: { value: new THREE.Color('#1a0a2e') },
      uColor3: { value: new THREE.Color('#0a1628') },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        float noise = sin(uv.x * 3.0 + uTime * 0.2) * sin(uv.y * 3.0 + uTime * 0.3) * 0.1;

        vec3 color = mix(uColor1, uColor2, uv.y + noise);
        color = mix(color, uColor3, sin(uv.x + uTime * 0.1) * 0.3 + 0.3);

        gl_FragColor = vec4(color, 1.0);
      }
    `,
  }), [])

  return (
    <mesh ref={meshRef} position={[0, 0, -10]} scale={30}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial {...gradientShader} />
    </mesh>
  )
}

export function Scene3D() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, 5, -5]} intensity={1} color="#8B5CF6" />
      <pointLight position={[5, -5, 5]} intensity={0.5} color="#06B6D4" />

      {/* Environment */}
      <Environment preset="night" />
      <Stars radius={100} depth={50} count={1000} factor={4} fade speed={1} />

      {/* Background */}
      <GradientBackground />

      {/* Main content */}
      <FloatingShapes />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={0.8}
        />
        <Vignette
          offset={0.3}
          darkness={0.6}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </>
  )
}
