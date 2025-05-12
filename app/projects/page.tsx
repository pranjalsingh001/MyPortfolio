"use client"

import { useState, useRef, useEffect } from "react"
  import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft, ArrowRightCircle, ArrowLeftCircle, ExternalLink } from "lucide-react"
import SkillsMarquee from "@/components/SkillsMarquee"

// Project data
const projects = [
  {
    title: "Currency Converter",
    description:
      "A responsive web app that allows users to convert between 150+ currencies in real-time using exchange rate APIs. Features historical data, dark mode, and offline support.",
    image: "/images/currency-converter.png",
    color: "var(--neon-blue)",
    tags: ["react", "CSS", "JavaScript", "ExchangeRate API"],
  },
  {
    title: "Wordle Clone",
    description:
      "A fun, browser-based Wordle clone built with React. Users can guess 5-letter words with daily puzzles, animations, and keyboard feedback.",
    image: "/images/wordle-clone.png",
    color: "var(--neon-green)",
    tags: ["React", "JavaScript", "CSS Animations", "Game Logic"],
  },
  {
    title: "Resume Builder",
    description:
      "A customizable resume builder that generates professional resumes with live previews. Supports multiple themes, section reordering, and PDF export.",
    image: "/images/resume-builder.png",
    color: "var(--neon-purple)",
    tags: ["JavaScript", "Tailwind CSS", "HTML to PDF", "Form Validation"],
  },
  {
    title: "Blockchain Learning Platform",
    description:
      "An interactive learning platform that teaches blockchain concepts in simple terms. Includes lessons, quizzes, and Web3 project walkthroughs.",
    image: "/images/blockchain-platform.png",
    color: "var(--neon-orange)",
    tags: ["Next.js", "Tailwind CSS", "Web3.js", "Markdown"],
  },
  {
    title: "World Atlas",
    description:
      "A data-driven world atlas app with interactive maps, country info, and stats. Uses REST APIs to fetch real-time population, GDP, and weather data.",
    image: "/images/world-atlas.png",
    color: "var(--neon-cyan)",
    tags: ["React", "Leaflet.js", "REST API", "OpenWeatherMap"],
  },
];

export default function ProjectsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right
  const [isFlipping, setIsFlipping] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goToNextProject()
      } else if (e.key === "ArrowLeft") {
        goToPrevProject()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const goToProject = (index: number) => {
    if (isFlipping || index === currentIndex) return

    setIsFlipping(true)
    setDirection(index > currentIndex ? 1 : -1)

    setTimeout(() => {
      setCurrentIndex(index)
      setIsFlipping(false)
    }, 100) // Match this with animation duration
  }

  const goToNextProject = () => {
    if (isFlipping) return
    const nextIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1
    goToProject(nextIndex)
  }

  const goToPrevProject = () => {
    if (isFlipping) return
    const prevIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1
    goToProject(prevIndex)
  }

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
            Featured Projects
          </h1>
          <div className="h-1 w-36 mx-auto bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-full mb-6 animate-gradient"></div>
        </motion.div>

        {/* Tech Stack Marquee */}
        <SkillsMarquee className="mb-12" />

        {/* Projects Flipbook with Side Navigation */}
        <div ref={containerRef} className="max-w-5xl mx-auto relative perspective-1000 min-h-[600px] flex">
          {/* Side Navigation Bar */}
          <div className="hidden md:block w-64 mr-6">
            <div className="sticky top-32 bg-darker/40 backdrop-blur-xl rounded-xl border border-white/10 p-4 flex flex-col gap-3">
              <h3 className="text-lg font-orbitron font-bold text-white/80 mb-2 px-2">Projects</h3>
              {projects.map((project, index) => (
                <button
                  key={index}
                  onClick={() => goToProject(index)}
                  className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-300 flex items-center ${currentIndex === index
                      ? "bg-darker border-l-4"
                      : "bg-darker/60 border-l-4 border-transparent hover:border-white/30"
                    }`}
                  style={{
                    borderLeftColor: currentIndex === index ? project.color : "",
                    boxShadow: currentIndex === index ? `0 0 15px ${project.color}30` : "",
                  }}
                >
                  <span
                    className={`text-sm font-medium flex-1 ${currentIndex === index ? "text-white" : "text-white/50"}`}
                  >
                    {project.title}
                  </span>
                  {currentIndex === index && (
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: project.color, boxShadow: `0 0 5px ${project.color}` }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Main Project Display */}
          <div className="flex-1 relative">
            {/* Project Counter */}
            <div className="absolute top-0 right-0 bg-darker/40 backdrop-blur-xl px-4 py-2 rounded-lg text-white/70 z-10">
              Project {currentIndex + 1} / {projects.length}
            </div>

            {/* Navigation Buttons */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20">
              <button
                onClick={goToPrevProject}
                className="p-2 bg-darker/60 backdrop-blur-xl rounded-full border border-white/10 text-white/70 hover:text-white transition-all duration-200"
                disabled={isFlipping}
              >
                <ArrowLeftCircle className="w-8 h-8" />
              </button>
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20">
              <button
                onClick={goToNextProject}
                className="p-2 bg-darker/60 backdrop-blur-xl rounded-full border border-white/10 text-white/70 hover:text-white transition-all duration-200"
                disabled={isFlipping}
              >
                <ArrowRightCircle className="w-8 h-8" />
              </button>
            </div>

            {/* Project Cards */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{
                  rotateY: direction === 1 ? -90 : 90,
                  opacity: 0,
                }}
                animate={{
                  rotateY: 0,
                  opacity: 1,
                }}
                exit={{
                  rotateY: direction === 1 ? 90 : -90,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                className="w-full bg-darker/40 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10"
                style={{
                  boxShadow: `0 0 30px ${projects[currentIndex].color}20`,
                  borderColor: `${projects[currentIndex].color}30`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="relative p-6 md:p-8">
                  {/* Glassmorphism effect */}
                  <div
                    className="absolute inset-0 opacity-30 rounded-xl"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${projects[currentIndex].color}20, transparent 70%)`,
                    }}
                  />

                  <div className="relative z-1">
                    <div className="project-image w-full h-48 md:h-64 rounded-lg overflow-hidden mb-6 group">
                      <motion.img
                        src={projects[currentIndex].image}
                        alt={projects[currentIndex].title}
                        className="w-full h-full object-cover transition-transform duration-200"
                        whileHover={{ scale: 1.05 }}
                      />
                    </div>

                    <h3
                      className="text-2xl md:text-3xl font-orbitron font-bold mb-4"
                      style={{ color: projects[currentIndex].color }}
                    >
                      {projects[currentIndex].title}
                    </h3>

                    <p className="text-white/80 mb-6">{projects[currentIndex].description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {projects[currentIndex].tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs rounded-full bg-darker/60 border border-white/10"
                          style={{ color: projects[currentIndex].color }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <motion.a
                        href="#"
                        whileHover={{
                          y: -3,
                          boxShadow: `0 10px 25px -5px ${projects[currentIndex].color}`,
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="px-6 py-3 rounded-lg bg-gradient-to-r from-darker to-darker border border-white/10 text-white flex items-center gap-2 transition-all duration-200"
                        style={{
                          borderColor: `${projects[currentIndex].color}50`,
                        }}
                      >
                        Explore Project{" "}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </motion.a>

                      <motion.a
                        href="#"
                        whileHover={{
                          y: -3,
                          boxShadow: `0 10px 25px -5px ${projects[currentIndex].color}`,
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="px-6 py-3 rounded-lg bg-transparent border border-white/10 text-white flex items-center gap-2 transition-all duration-200 inline-flex"
                        style={{
                          borderColor: `${projects[currentIndex].color}50`,
                        }}
                      >
                        Live Demo <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </div>

                  {/* Scanlines effect */}
                  <div className="scanlines absolute inset-0 pointer-events-none z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-80 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-scanline"></div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile project navigation */}
            <div className="md:hidden mt-8 flex justify-center gap-4">
              <button
                onClick={goToPrevProject}
                className="px-4 py-2 bg-darker/60 backdrop-blur-xl rounded-lg border border-white/10 text-white/70 hover:text-white flex items-center gap-2 transition-all duration-200"
                disabled={isFlipping}
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>

              <button
                onClick={goToNextProject}
                className="px-4 py-2 bg-darker/60 backdrop-blur-xl rounded-lg border border-white/10 text-white/70 hover:text-white flex items-center gap-2 transition-all duration-200"
                disabled={isFlipping}
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile project dots navigation */}
            <div className="md:hidden mt-4 flex justify-center gap-2">
              {projects.map((project, index) => (
                <button
                  key={index}
                  onClick={() => goToProject(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? "bg-white scale-125" : "bg-white/30"
                    }`}
                  style={{
                    backgroundColor: currentIndex === index ? project.color : "",
                    boxShadow: currentIndex === index ? `0 0 8px ${project.color}` : "",
                  }}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            {/* Keyboard instructions */}
            <div className="m-4 text-center text-white/20 text-sm">Use arrow keys or swipe to navigate projects</div>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(176, 38, 255, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="px-6 py-3 border-2 border-neon-purple text-white rounded-lg font-medium flex items-center gap-2 transition-all duration-200"
              onClick={() => router.push("/skills")}
            >
              Explore Skills <ArrowRight className="ml-1" />
            </motion.button>

          </div>
        </div>
      </div>
    </div>
  )
}
