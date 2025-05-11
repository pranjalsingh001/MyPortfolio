"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

// Shape types for the raining effect
type ShapeType = "square" | "circle" | "triangle" | "diamond"
type ShapeConfig = {
  type: ShapeType
  size: number
  color: string
  x: number
  y: number
  rotation: number
  speed: number
  delay: number
}

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const containerWidth = window.innerWidth
    const containerHeight = window.innerHeight

    // Clear any existing shapes
    container.innerHTML = ""

    // Create shapes
    const shapes: ShapeConfig[] = []
    const shapeCount = Math.min(30, Math.floor((containerWidth * containerHeight) / 25000))

    const shapeTypes: ShapeType[] = ["square", "circle", "triangle", "diamond"]
    const colors = ["#00c8ff", "#b026ff", "#ff2d92", "#00ff9d"]

    for (let i = 0; i < shapeCount; i++) {
      const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)]
      const size = Math.random() * 30 + 10
      const x = Math.random() * containerWidth
      const y = -size - Math.random() * containerHeight
      const rotation = Math.random() * 360
      const speed = Math.random() * 3 + 1
      const delay = Math.random() * 10
      const color = colors[Math.floor(Math.random() * colors.length)]

      shapes.push({ type, size, color, x, y, rotation, speed, delay })
    }

    // Create and animate shapes
    shapes.forEach((shape) => {
      const element = document.createElement("div")
      element.className = "absolute"

      // Set shape style based on type
      switch (shape.type) {
        case "square":
          element.style.width = `${shape.size}px`
          element.style.height = `${shape.size}px`
          element.style.backgroundColor = "transparent"
          element.style.border = `2px solid ${shape.color}`
          element.style.boxShadow = `0 0 10px ${shape.color}`
          break
        case "circle":
          element.style.width = `${shape.size}px`
          element.style.height = `${shape.size}px`
          element.style.backgroundColor = "transparent"
          element.style.border = `2px solid ${shape.color}`
          element.style.borderRadius = "50%"
          element.style.boxShadow = `0 0 10px ${shape.color}`
          break
        case "triangle":
          element.style.width = "0"
          element.style.height = "0"
          element.style.borderLeft = `${shape.size / 2}px solid transparent`
          element.style.borderRight = `${shape.size / 2}px solid transparent`
          element.style.borderBottom = `${shape.size}px solid ${shape.color}`
          element.style.filter = `drop-shadow(0 0 5px ${shape.color})`
          break
        case "diamond":
          element.style.width = `${shape.size}px`
          element.style.height = `${shape.size}px`
          element.style.backgroundColor = "transparent"
          element.style.border = `2px solid ${shape.color}`
          element.style.transform = "rotate(45deg)"
          element.style.boxShadow = `0 0 10px ${shape.color}`
          break
      }

      // Set initial position
      element.style.left = `${shape.x}px`
      element.style.top = `${shape.y}px`
      element.style.transform += ` rotate(${shape.rotation}deg)`

      // Add to container
      container.appendChild(element)

      // Animate with GSAP
      gsap.to(element, {
        y: containerHeight + shape.size,
        rotation: `+=${Math.random() * 360}`,
        duration: 10 / shape.speed,
        delay: shape.delay,
        ease: "none",
        repeat: -1,
        onRepeat: () => {
          // Reset position when it goes off screen
          gsap.set(element, {
            x: Math.random() * containerWidth,
            y: -shape.size,
            rotation: Math.random() * 360,
          })
        },
      })
    })

    // Add parallax effect to background
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX / containerWidth
      const mouseY = e.clientY / containerHeight

      gsap.to(container, {
        duration: 1,
        x: (0.5 - mouseX) * 20,
        y: (0.5 - mouseY) * 20,
        ease: "power2.out",
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-darker to-[#1a1f35]"></div>

      {/* Glow effects */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-300px] left-[-200px] w-[600px] h-[600px] rounded-full bg-neon-purple blur-[80px] animate-float-slow"></div>
        <div className="absolute bottom-[-200px] right-[-100px] w-[400px] h-[400px] rounded-full bg-neon-blue blur-[80px] animate-float-reverse"></div>
        <div className="absolute top-[40%] right-[15%] w-[300px] h-[300px] rounded-full bg-neon-pink blur-[80px] animate-float"></div>
        <div className="absolute bottom-[25%] left-[10%] w-[350px] h-[350px] rounded-full bg-neon-green blur-[80px] animate-float-slow-reverse"></div>
      </div>

      {/* Animated shapes container */}
      <div ref={containerRef} className="absolute inset-0 overflow-hidden"></div>
    </div>
  )
}
