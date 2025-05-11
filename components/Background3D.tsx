"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useRef, useState } from "react"
import { Environment, Float, Preload } from "@react-three/drei"
import type * as THREE from "three" // Import THREE
import { type Mesh, MathUtils } from "three"

// Geometric shapes components
const Cube = ({ position, color, speed = 1, ...props }) => {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2 * speed
      meshRef.current.rotation.y += delta * 0.3 * speed

      // Slight floating effect
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.002
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        {...props}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.7}
          emissive={color}
          emissiveIntensity={hovered ? 2 : 0.5}
        />
      </mesh>
    </Float>
  )
}

const Sphere = ({ position, color, speed = 1, ...props }) => {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.003
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        {...props}
      >
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.6}
          emissive={color}
          emissiveIntensity={hovered ? 2 : 0.5}
        />
      </mesh>
    </Float>
  )
}

const Torus = ({ position, color, speed = 1, ...props }) => {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2 * speed
      meshRef.current.rotation.y += delta * 0.3 * speed
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        {...props}
      >
        <torusGeometry args={[0.5, 0.2, 16, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.7}
          emissive={color}
          emissiveIntensity={hovered ? 2 : 0.5}
        />
      </mesh>
    </Float>
  )
}

const Cone = ({ position, color, speed = 1, ...props }) => {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3 * speed
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        {...props}
      >
        <coneGeometry args={[0.5, 1, 16]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.7}
          emissive={color}
          emissiveIntensity={hovered ? 2 : 0.5}
        />
      </mesh>
    </Float>
  )
}

// Mouse follower for interactive effect
const MouseLight = () => {
  const { viewport, mouse } = useThree()
  const lightRef = useRef<THREE.PointLight>(null)

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = MathUtils.lerp(lightRef.current.position.x, (mouse.x * viewport.width) / 2, 0.1)
      lightRef.current.position.y = MathUtils.lerp(lightRef.current.position.y, (mouse.y * viewport.height) / 2, 0.1)
    }
  })

  return <pointLight ref={lightRef} distance={6} intensity={2} color="#00c8ff" />
}

// Scene component
const Scene = () => {
  const shapes = [
    { type: "cube", position: [-5, 2, -5], color: "#00c8ff", speed: 0.8 },
    { type: "sphere", position: [4, -2, -3], color: "#b026ff", speed: 1.2 },
    { type: "torus", position: [-3, -3, -2], color: "#ff2d92", speed: 0.9 },
    { type: "cone", position: [5, 3, -4], color: "#00ff9d", speed: 1.1 },
    { type: "cube", position: [7, -1, -6], color: "#00c8ff", speed: 0.7 },
    { type: "sphere", position: [-6, -2, -5], color: "#b026ff", speed: 1.3 },
    { type: "torus", position: [2, 4, -3], color: "#ff2d92", speed: 1 },
    { type: "cone", position: [-4, 3, -7], color: "#00ff9d", speed: 0.8 },
  ]

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <MouseLight />

      {shapes.map((shape, index) => {
        switch (shape.type) {
          case "cube":
            return <Cube key={index} position={shape.position} color={shape.color} speed={shape.speed} />
          case "sphere":
            return <Sphere key={index} position={shape.position} color={shape.color} speed={shape.speed} />
          case "torus":
            return <Torus key={index} position={shape.position} color={shape.color} speed={shape.speed} />
          case "cone":
            return <Cone key={index} position={shape.position} color={shape.color} speed={shape.speed} />
          default:
            return null
        }
      })}

      <Environment preset="night" />
      <Preload all />
    </>
  )
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-gradient-to-br from-darker to-[#1a1f35]">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-300px] left-[-200px] w-[600px] h-[600px] rounded-full bg-neon-purple blur-[80px] animate-float-slow"></div>
        <div className="absolute bottom-[-200px] right-[-100px] w-[400px] h-[400px] rounded-full bg-neon-blue blur-[80px] animate-float-reverse"></div>
        <div className="absolute top-[40%] right-[15%] w-[300px] h-[300px] rounded-full bg-neon-pink blur-[80px] animate-float"></div>
        <div className="absolute bottom-[25%] left-[10%] w-[350px] h-[350px] rounded-full bg-neon-green blur-[80px] animate-float-slow-reverse"></div>
      </div>

      <Canvas className="touch-none" camera={{ position: [0, 0, 10], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  )
}
