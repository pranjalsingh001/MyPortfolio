"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const trailsRef = useRef<HTMLDivElement[]>([])
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const maxTrails = 10
  const trailsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only enable custom cursor on non-touch devices and desktop
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
    const isDesktop = window.matchMedia("(min-width: 768px)").matches

    if (!isTouchDevice && isDesktop) {
      setIsVisible(true)

      const handleMouseMove = (e: MouseEvent) => {
        setCursorPosition({ x: e.clientX, y: e.clientY })

        // Move cursor dot immediately with precise positioning
        if (cursorRef.current) {
          gsap.to(cursorRef.current, {
            x: 0,
            y: 0,
            left: e.clientX,
            top: e.clientY,
            duration: 0.1,
            ease: "power2.out",
          })
        }

        // Move cursor ring with slight delay for trailing effect
        if (cursorRingRef.current) {
          gsap.to(cursorRingRef.current, {
            x: 0,
            y: 0,
            left: e.clientX,
            top: e.clientY,
            duration: 0.3,
            ease: "power2.out",
          })
        }

        // Create trail effect
        if (trailsContainerRef.current && Math.random() > 0.6) {
          createTrail(e.clientX, e.clientY)
        }
      }

      const handleMouseEnter = () => {
        if (cursorRef.current && cursorRingRef.current) {
          gsap.to([cursorRef.current, cursorRingRef.current], {
            opacity: 1,
            duration: 0.3,
          })
        }
      }

      const handleMouseLeave = () => {
        if (cursorRef.current && cursorRingRef.current) {
          gsap.to([cursorRef.current, cursorRingRef.current], {
            opacity: 0,
            duration: 0.3,
          })
        }
      }

      const handleMouseDown = () => {
        if (cursorRef.current && cursorRingRef.current) {
          gsap.to(cursorRef.current, {
            scale: 0.8,
            duration: 0.2,
          })
          gsap.to(cursorRingRef.current, {
            scale: 1.2,
            duration: 0.2,
          })
        }
      }

      const handleMouseUp = () => {
        if (cursorRef.current && cursorRingRef.current) {
          gsap.to(cursorRef.current, {
            scale: 1,
            duration: 0.2,
          })
          gsap.to(cursorRingRef.current, {
            scale: 1,
            duration: 0.2,
          })
        }
      }

      // Handle interactive elements
      const handleElementEnter = () => {
        if (cursorRef.current && cursorRingRef.current) {
          gsap.to(cursorRef.current, {
            scale: 0.5,
            backgroundColor: "rgba(14, 165, 233, 0.8)",
            duration: 0.3,
          })
          gsap.to(cursorRingRef.current, {
            scale: 1.5,
            borderColor: "rgba(14, 165, 233, 0.5)",
            duration: 0.3,
          })
        }
      }

      const handleElementLeave = () => {
        if (cursorRef.current && cursorRingRef.current) {
          gsap.to(cursorRef.current, {
            scale: 1,
            backgroundColor: "rgba(14, 165, 233, 0.5)",
            duration: 0.3,
          })
          gsap.to(cursorRingRef.current, {
            scale: 1,
            borderColor: "rgba(14, 165, 233, 0.3)",
            duration: 0.3,
          })
        }
      }

      // Add event listeners
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseenter", handleMouseEnter)
      document.addEventListener("mouseleave", handleMouseLeave)
      document.addEventListener("mousedown", handleMouseDown)
      document.addEventListener("mouseup", handleMouseUp)

      // Add event listeners to interactive elements
      const interactiveElements = document.querySelectorAll('a, button, .nav-card, [role="button"]')
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleElementEnter)
        el.addEventListener("mouseleave", handleElementLeave)
      })

      // Update interactive elements when DOM changes
      const observer = new MutationObserver(() => {
        const newInteractiveElements = document.querySelectorAll('a, button, .nav-card, [role="button"]')
        newInteractiveElements.forEach((el) => {
          el.removeEventListener("mouseenter", handleElementEnter)
          el.removeEventListener("mouseleave", handleElementLeave)
          el.addEventListener("mouseenter", handleElementEnter)
          el.addEventListener("mouseleave", handleElementLeave)
        })
      })

      observer.observe(document.body, { childList: true, subtree: true })

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseenter", handleMouseEnter)
        document.removeEventListener("mouseleave", handleMouseLeave)
        document.removeEventListener("mousedown", handleMouseDown)
        document.removeEventListener("mouseup", handleMouseUp)

        interactiveElements.forEach((el) => {
          el.removeEventListener("mouseenter", handleElementEnter)
          el.removeEventListener("mouseleave", handleElementLeave)
        })

        observer.disconnect()
      }
    }
  }, [])

  const createTrail = (x: number, y: number) => {
    if (!trailsContainerRef.current) return

    const trail = document.createElement("div")
    trail.className =
      "absolute w-2 h-2 rounded-full bg-neon-blue opacity-70 mix-blend-screen blur-sm pointer-events-none z-[9997] transform -translate-x-1/2 -translate-y-1/2"
    trail.style.left = `${x}px`
    trail.style.top = `${y}px`

    // Random size and color
    const size = Math.random() * 10 + 5
    const hue = Math.floor(Math.random() * 60) + 180 // Blue to cyan range

    trail.style.width = `${size}px`
    trail.style.height = `${size}px`
    trail.style.backgroundColor = `hsla(${hue}, 80%, 60%, 0.7)`

    trailsContainerRef.current.appendChild(trail)

    // Animate and remove
    gsap.to(trail, {
      opacity: 0,
      scale: 0.5,
      duration: 1,
      onComplete: () => {
        if (trail.parentNode) {
          trail.parentNode.removeChild(trail)
        }
      },
    })

    // Limit the number of trails
    const trails = trailsContainerRef.current.children
    if (trails.length > maxTrails) {
      trailsContainerRef.current.removeChild(trails[0])
    }
  }

  if (!isVisible) return null

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-5 h-5 rounded-full bg-primary/50 pointer-events-none mix-blend-screen blur-[2px] z-[9999] transform -translate-x-1/2 -translate-y-1/2 opacity-0"
        style={{ left: cursorPosition.x, top: cursorPosition.y }}
      />
      <div
        ref={cursorRingRef}
        className="fixed w-10 h-10 rounded-full border-2 border-primary/30 pointer-events-none z-[9998] transform -translate-x-1/2 -translate-y-1/2 opacity-0"
        style={{ left: cursorPosition.x, top: cursorPosition.y }}
      />
      <div ref={trailsContainerRef} className="fixed inset-0 pointer-events-none z-[9997] overflow-hidden" />
    </>
  )
}
