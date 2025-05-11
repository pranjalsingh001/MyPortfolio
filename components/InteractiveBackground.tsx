"use client"

import { useEffect, useRef, useState } from "react"
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
  element?: HTMLDivElement
  animation?: gsap.core.Tween
  isFallen?: boolean
}

export default function InteractiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bottomContainerRef = useRef<HTMLDivElement>(null)
  const [isRaining, setIsRaining] = useState(true)
  const shapesRef = useRef<ShapeConfig[]>([])
  const animationsRef = useRef<gsap.core.Tween[]>([])
  const [showTooltip, setShowTooltip] = useState(true)

  useEffect(() => {
    if (!containerRef.current || !bottomContainerRef.current) return

    const container = containerRef.current
    const bottomContainer = bottomContainerRef.current
    const containerWidth = window.innerWidth
    const containerHeight = window.innerHeight
    const bottomHeight = 100 // Height of the bottom container where shapes collect

    // Clear any existing shapes
    container.innerHTML = ""
    bottomContainer.innerHTML = ""

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

      shapes.push({ type, size, color, x, y, rotation, speed, delay, isFallen: false })
    }

    shapesRef.current = shapes

    // Create and animate shapes
    shapes.forEach((shape, index) => {
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

      // Store element reference
      shapes[index].element = element

      // Animate with GSAP
      const animation = gsap.to(element, {
        y: containerHeight - bottomHeight + shape.size,
        rotation: `+=${Math.random() * 360}`,
        duration: 10 / shape.speed,
        delay: shape.delay,
        ease: "none",
        onComplete: () => {
          // When shape reaches bottom, move it to the bottom container
          if (element.parentNode === container) {
            container.removeChild(element)

            // Create a clone for the bottom container
            const clone = element.cloneNode() as HTMLDivElement
            clone.style.top = "auto"
            clone.style.bottom = "0"
            clone.style.y = "0"

            // Random position within bottom container
            const bottomX = Math.random() * containerWidth
            clone.style.left = `${bottomX}px`

            bottomContainer.appendChild(clone)
            shapes[index].isFallen = true
          }
        },
        onUpdate: function () {
          // If animation is paused, we need to store the current position
          if (!isRaining && this.time() > 0) {
            shapes[index].y = Number.parseFloat(element.style.top || "0") + Number.parseFloat(element.style.y || "0")
          }
        },
      })

      // Store animation reference
      animationsRef.current.push(animation)
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

      gsap.to(bottomContainer, {
        duration: 1,
        x: (0.5 - mouseX) * 10, // Less movement for bottom container
        ease: "power2.out",
      })
    }

    // Toggle rain on click
    const handleClick = () => {
      setIsRaining((prev) => !prev)

      if (isRaining) {
        // Pause all animations
        animationsRef.current.forEach((anim) => {
          anim.pause()
        })
      } else {
        // Resume all animations
        animationsRef.current.forEach((anim) => {
          anim.play()
        })
      }

      // Hide tooltip after first click
      setShowTooltip(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)

    // Hide tooltip after 5 seconds
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(false)
    }, 5000)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)
      clearTimeout(tooltipTimer)

      // Kill all animations
      animationsRef.current.forEach((anim) => {
        anim.kill()
      })
    }
  }, [isRaining])

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

      {/* Bottom container for fallen shapes */}
      <div ref={bottomContainerRef} className="absolute left-0 right-0 bottom-0 h-[100px] overflow-hidden"></div>

      {/* Rain status tooltip
      {showTooltip && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-darker/80 backdrop-blur-xl px-6 py-4 rounded-xl text-white z-50 border border-neon-blue/30 shadow-glow-md text-center max-w-xs">
          <p className="text-lg font-medium mb-2">Interactive Background</p>
          <p className="text-white/70 text-sm">Click anywhere to toggle the raining shapes</p>
        </div>
      )} */}

      {/* Rain status indicator
      <div className="absolute bottom-4 right-4 bg-darker/60 backdrop-blur-xl px-4 py-2 rounded-lg text-white/70 z-10 pointer-events-none">
        {isRaining ? "Click anywhere to pause rain" : "Click anywhere to resume rain"}
      </div> */}
    </div>
  )
}
