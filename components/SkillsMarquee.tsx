"use client"

import { useRef, useEffect } from "react"

interface SkillsMarqueeProps {
  className?: string
}

// Tech logos and their colors
const techLogos = [
  { name: "HTML", color: "#E34F26" },
  { name: "CSS", color: "#1572B6" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#000000" },
  { name: "Node.js", color: "#339933" },
  { name: "Express", color: "#000000" },
  { name: "MongoDB", color: "#47A248" },
  { name: "Git", color: "#F05032" },
  { name: "Tailwind CSS", color: "#06B6D4" },
  { name: "GSAP", color: "#88CE02" },
  { name: "Framer Motion", color: "#0055FF" },
  { name: "Three.js", color: "#000000" },
  { name: "Firebase", color: "#FFCA28" },
  { name: "GraphQL", color: "#E10098" },
  { name: "Figma", color: "#F24E1E" },
  { name: "Vercel", color: "#000000" },
]

export default function SkillsMarquee({ className = "" }: SkillsMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const firstGroup = container.children[0] as HTMLElement

    // Clone the first group to create a seamless loop
    const secondGroup = firstGroup.cloneNode(true) as HTMLElement
    container.appendChild(secondGroup)

    // Set animation duration based on content width
    const width = firstGroup.offsetWidth
    const duration = width / 50 // Adjust speed here

    // Apply animation to both groups
    const groups = container.children
    for (let i = 0; i < groups.length; i++) {
      const group = groups[i] as HTMLElement
      group.style.animationDuration = `${duration}s`
    }
  }, [])

  return (
    <div className={`w-full overflow-hidden bg-darker/40 backdrop-blur-xl py-6 ${className}`}>
      <div ref={containerRef} className="flex whitespace-nowrap">
        <div className="flex items-center space-x-12 animate-marquee">
          {techLogos.map((tech, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center bg-darker/60 border border-white/10"
                style={{ boxShadow: `0 0 15px ${tech.color}30` }}
              >
                <div className="text-2xl font-bold" style={{ color: tech.color }}>
                  {tech.name.substring(0, 2)}
                </div>
              </div>
              <span className="mt-2 text-sm text-white/70">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
