"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SkillsMarquee from "@/components/SkillsMarquee"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Skill categories with their respective skills
const skillCategories = [
  {
    title: "Frontend Development",
    icon: "🔷",
    color: "var(--neon-blue)",
    skills: [
      "React.js (Hooks, Context API)",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "GSAP Animations",
      "HTML5 & CSS3",
      "Bootstrap",
      "Responsive Design & Accessibility",
    ],
    imagePrompt: "Glowing React logo in glass card, soft neon blue",
  },
  {
    title: "Backend & Database",
    icon: "🟩",
    color: "var(--neon-green)",
    skills: ["Node.js & Express.js", "REST APIs", "MongoDB + Mongoose", "Postman for API testing"],
    imagePrompt: "Green Node.js hex logo in cyber-themed grid background",
  },
  {
    title: "Web3 & Blockchain",
    icon: "🌐",
    color: "var(--neon-purple)",
    skills: ["Solidity (basic smart contract writing)", "Web3.js Integration", "Metamask wallet setup"],
    imagePrompt: "3D polygonal Solidity logo floating with Ethereum vibe",
  },
  {
    title: "Dev Tools & Workflow",
    icon: "🛠",
    color: "var(--neon-pink)",
    skills: ["Git & GitHub", "VS Code", "Postman", "Vite", "CLI"],
    imagePrompt: "VS Code blue logo with matrix code background",
  },
  {
    title: "UI/UX & Animation",
    icon: "🎨",
    color: "var(--neon-blue)",
    skills: [
      "Figma (UI design & prototyping)",
      "Framer Motion (animations in React)",
      "Lottie JSON animations",
      "CSS Grid & Flexbox (modern layout systems)",
    ],
    imagePrompt: "Colorful Figma logo over UI wireframe",
  },
]

export default function SkillsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

 useEffect(() => {
    if (containerRef.current && timelineRef.current && cardsRef.current) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      })

      // Animate the timeline progress
      timeline.to(timelineRef.current, {
        height: "100%",
        duration: 1,
        ease: "none",
      })

      // Enhanced overlap effect for skill cards
      const cards = gsap.utils.toArray(".skill-card") as HTMLElement[]

      // Set initial positions, z-index, and opacity
      cards.forEach((card, i) => {
        gsap.set(card, {
          zIndex: cards.length - i,
          y: i > 0 ? 40 : 0,
          opacity: i > 0 ? 0.6 : 1,
          scale: i > 0 ? 0.95 : 1,
        })
      })

      // Create scroll triggers for each card (except the first one)
      cards.forEach((card, i) => {
        if (i > 0) {
          ScrollTrigger.create({
            trigger: card,
            start: "top bottom-=200",
            end: "top center",
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress

              // Current card animation (overlap effect)
              gsap.to(card, {
                y: 40 * (1 - progress),
                opacity: 0.6 + 0.4 * progress,
                scale: 0.95 + 0.05 * progress,
                zIndex: cards.length - i, // Update zIndex dynamically
                duration: 0.1,
              })

              // Previous card animation (push it up and reduce opacity)
              if (i > 0) {
                const prevCard = cards[i - 1]
                gsap.to(prevCard, {
                  y: -60 * progress,
                  opacity: 1 - 0.3 * progress,
                  scale: 1 - 0.05 * progress,
                  zIndex: cards.length - (i - 1), // Adjust zIndex as well
                  duration: 0.1,
                })
              }
            },
          })
        }
      })
    }

    // Clean up scroll triggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
            My Skills & Expertise
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8">
            I specialize in crafting visually rich, smooth, and scalable web applications with a creative touch. My
            expertise blends futuristic UI, smooth animations, backend logic, and emerging technologies.
          </p>

          {/* Skills Marquee */}
          <SkillsMarquee className="mb-16" />
        </motion.div>

        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* Timeline */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink opacity-30 transform md:-translate-x-1/2">
            <div
              ref={timelineRef}
              className="w-full bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink h-0"
            />
          </div>

          {/* Skill Categories */}
          <div ref={cardsRef} className="space-y-32 md:space-y-64">
            {skillCategories.map((category, index) => (
              <SkillCard key={index} category={category} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

type SkillCategory = {
  title: string
  icon: string
  color: string
  skills: string[]
  imagePrompt: string
}

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05])
  const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 2 : -2, 0])

  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={cardRef}
      className={`relative skill-card ${isEven ? "md:ml-0" : "md:mr-0"}`}
      style={{
        zIndex: skillCategories.length - index,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Timeline dot */}
      <motion.div
        style={{
          opacity,
          top: "2rem",
          borderColor: category.color,
          boxShadow: `0 0 10px ${category.color}`,
        }}
        className="absolute left-0 md:left-1/2 w-6 h-6 rounded-full bg-darker border-2 z-10 transform -translate-x-1/2 md:-translate-x-1/2"
      >
        <motion.div
          style={{ opacity, backgroundColor: category.color }}
          className="absolute inset-1 rounded-full"
        />
      </motion.div>

      {/* Card */}
      <motion.div
        style={{ y, opacity, scale, rotateX: rotate }}
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
                style={{
                  backgroundColor: `${category.color}30`,
                  boxShadow: `0 0 20px ${category.color}40`,
                }}
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
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: category.color,
                        boxShadow: `0 0 5px ${category.color}`,
                      }}
                    />
                    <span className="text-white/90">{skill}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Border glow effect */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            boxShadow: `0 0 20px ${category.color}40`,
            border: `1px solid ${category.color}30`,
          }}
        />
      </motion.div>
    </motion.div>
  )
}
