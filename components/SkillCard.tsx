"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface SkillCardProps {
  category: {
    title: string
    icon: string
    color: string
    skills: string[]
    imagePrompt: string
  }
  index: number
}

export default function SkillCard({ category, index }: SkillCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const isEven = index % 2 === 0

  return (
    <div ref={ref} className={`relative skill-card ${isEven ? "md:ml-0" : "md:mr-0"}`}>
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute left-0 md:left-1/2 w-6 h-6 rounded-full bg-darker border-2 z-10 transform -translate-x-1/2 md:-translate-x-1/2"
        style={{ borderColor: category.color, top: "2rem" }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute inset-1 rounded-full"
          style={{ backgroundColor: category.color }}
        />
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{
          opacity: 0,
          x: isEven ? -50 : 50,
          y: 20,
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                x: 0,
                y: 0,
              }
            : {
                opacity: 0,
                x: isEven ? -50 : 50,
                y: 20,
              }
        }
        transition={{
          duration: 0.7,
          ease: [0.19, 1, 0.22, 1],
        }}
        className={`relative md:w-[90%] ${
          isEven ? "md:ml-16" : "md:mr-16 md:ml-auto"
        } bg-darker/40 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10`}
      >
        {/* Glassmorphism effect */}
        <div
          className="absolute inset-0 opacity-30 rounded-xl"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${category.color}20, transparent 70%)`,
          }}
        />

        <div className="p-6 md:p-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Image placeholder */}
            <div className="w-full md:w-1/3 aspect-square rounded-lg overflow-hidden bg-darker/60 border border-white/10 flex items-center justify-center">
              <div
                className="w-16 h-16 text-4xl flex items-center justify-center rounded-full"
                style={{ backgroundColor: `${category.color}30` }}
              >
                {category.icon}
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <h3 className="text-2xl md:text-3xl font-orbitron font-bold mb-4" style={{ color: category.color }}>
                {category.title}
              </h3>

              <ul className="space-y-3">
                {category.skills.map((skill, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }} />
                    <span className="text-white/90">{skill}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Border glow effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            boxShadow: `0 0 20px ${category.color}40`,
            border: `1px solid ${category.color}30`,
          }}
        />
      </motion.div>
    </div>
  )
}
