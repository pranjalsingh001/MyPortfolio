"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AboutPage() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div
          ref={containerRef}
          className="max-w-6xl mx-auto bg-darker/40 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden"
          style={{ boxShadow: "0 0 30px rgba(0, 200, 255, 0.1)" }}
        >
          <div className="p-6 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Photo Section */}
              <div className="md:col-span-1">
                <motion.div
                  ref={photoRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative w-full aspect-[3/4] rounded-xl overflow-hidden perspective-1000"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-blue via-neon-purple to-neon-pink rounded-xl p-1">
                    <div className="w-full h-full bg-darker rounded-lg overflow-hidden">
                      <img
                        src="/myImg2.jpg"
                        alt="Pranjal Singh"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Glow effect */}
                  <div className="absolute -inset-1 rounded-xl opacity-50 blur-md bg-gradient-to-br from-neon-blue via-neon-purple to-neon-pink"></div>
                </motion.div>
              </div>

              {/* Content Section */}
              <div className="md:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h1 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">Pranjal Singh</h1>

                  <div className="typing-text mb-6 text-neon-blue border-r-2 border-neon-blue overflow-hidden whitespace-nowrap animate-typing">
                    Web Enthusiast
                  </div>

                  <p className="text-white/90 mb-6">
                    Hey! I'm Pranjal Singh — a curious builder who loves turning ideas into real, interactive web <span className="text-neon-pink font-medium">magic</span>. I don’t just create pages; I bring them to life with smooth <span className="text-neon-purple font-medium">logic</span> and a touch of <span className="text-neon-blue font-medium">imagination</span>. Whether it's layouts that feel just right, effects that respond like they’re thinking, or flows that guide you without confusion — I’m always exploring new ways to make the web more <span className="text-neon-pink font-medium">alive</span>, more <span className="text-neon-purple font-medium">human</span>, and way more <span className="text-neon-blue font-medium">fun</span>.
                  </p>

                  <p className="text-white/90">
                    I’m all about that perfect blend of <span className="text-neon-pink font-medium">design</span> and <span className="text-neon-blue font-medium">code</span>, where every pixel has a purpose and every interaction tells a <span className="text-neon-purple font-medium">story</span>. I’m on a mission to make the web not just functional, but also a place where users feel at <span className="text-neon-pink font-medium">home</span>.
                  </p><br />
                  <div className="mb-8">
                    <h2 className="text-xl font-orbitron font-bold mb-4">🎓 Currently:</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div
                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 200, 255, 0.3)" }}
                        transition={{ duration: 0.2 }}
                        className="bg-darker/60 rounded-lg p-4 border border-white/5 hover:border-neon-blue/30 transition-all duration-200"
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-neon-blue text-xl">🚀</div>
                          <div>Building a blockchain learning platform to make Web3 simple.</div>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(176, 38, 255, 0.3)" }}
                        transition={{ duration: 0.2 }}
                        className="bg-darker/60 rounded-lg p-4 border border-white/5 hover:border-neon-purple/30 transition-all duration-200"
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-neon-purple text-xl">💡</div>
                          <div>Solving problems on Codeforces , leetcode & GFG , sharpening my logic.</div>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(255, 45, 146, 0.3)" }}
                        transition={{ duration: 0.2 }}
                        className="bg-darker/60 rounded-lg p-4 border border-white/5 hover:border-neon-pink/30 transition-all duration-200"
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-neon-pink text-xl">🎨</div>
                          <div>Leveling up in advanced frontend frameworks, next-level UI.</div>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 255, 157, 0.3)" }}
                        transition={{ duration: 0.2 }}
                        className="bg-darker/60 rounded-lg p-4 border border-white/5 hover:border-neon-green/30 transition-all duration-200"
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-neon-green text-xl">🔧</div>
                          <div>Experimenting with Blockchain elements & Smart contracts.</div>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-xl font-orbitron font-bold mb-4">⚡ What Drives Me?</h2>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <div className="w-1 h-1 rounded-full bg-neon-blue mt-3"></div>
                        <div>Making web design feel magical with motion, lighting, and immersive effects.</div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1 h-1 rounded-full bg-neon-purple mt-3"></div>
                        <div>Creating not just websites, but experiences that stick with people.</div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1 h-1 rounded-full bg-neon-pink mt-3"></div>
                        <div>Learning, experimenting, and always finding ways to level up.</div>
                      </li>
                    </ul>
                  </div>

                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(176, 38, 255, 0.5)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 py-3 border-2 border-neon-purple text-white rounded-lg font-medium flex items-center gap-2 transition-all duration-200"
                    onClick={() => router.push("/projects")}
                  >
                    Explore Projects <ArrowRight className="ml-1" />
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
