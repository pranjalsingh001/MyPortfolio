"use client"

import { useRef, useEffect } from "react"

interface MarqueeProps {
  items: string[]
  direction?: "left" | "right"
  speed?: number
  className?: string
}

export default function Marquee({ items, direction = "left", speed = 50, className = "" }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !innerRef.current) return

    const container = containerRef.current
    const inner = innerRef.current

    // Clone the inner content to create a seamless loop
    const clone = inner.cloneNode(true)
    container.appendChild(clone)

    // Calculate animation duration based on content width and speed
    const width = inner.offsetWidth
    const duration = width / speed

    // Apply animation
    const elements = container.children
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement
      element.style.animationDuration = `${duration}s`
      element.style.animationDirection = direction === "left" ? "normal" : "reverse"
    }
  }, [direction, speed])

  return (
    <div
      className={`w-full overflow-hidden bg-darker/40 backdrop-blur-xl py-4 ${className}`}
      style={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)" }}
    >
      <div ref={containerRef} className="flex whitespace-nowrap">
        <div ref={innerRef} className="flex items-center space-x-8 animate-marquee">
          {items.map((item, index) => (
            <div key={index} className="text-lg font-medium text-white/70">
              <span className="text-neon-blue">#</span> {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
