"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import HomeNavBar from "@/components/HomeNavBar"
import SocialLinks from "@/components/SocialLinks"

export default function Home() {
  const router = useRouter()

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Only show these components on homepage */}
      <SocialLinks layout="vertical" />
      <HomeNavBar />

      {/* Main content */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center w-full px-4">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.19, 1, 0.22, 1],
          }}
          className="font-orbitron text-5xl md:text-7xl font-extrabold text-white mt-8 md:mt-0 name"
        >
          PRANJAL SINGH
        </motion.h1>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0.19, 1, 0.22, 1],
          }}
          className="name-reflection font-orbitron text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent transform rotate-x-180 translate-y-5"
        >
          PRANJAL SINGH
        </motion.div>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.7,
            ease: [0.19, 1, 0.22, 1],
          }}
          className="text-xl md:text-2xl mt-4 text-white/80 tracking-wider"
        >
          FULL-STACK DEVELOPER
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.9,
            ease: [0.19, 1, 0.22, 1],
          }}
          className="mt-12 flex justify-center gap-6"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(0, 200, 255, 0.5)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="px-8 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg font-medium text-white flex items-center gap-2 transition-all duration-200"
            onClick={() => router.push("/skills")}
          >
            Explore Skills <ArrowRight className="ml-1" />
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(255, 45, 146, 0.5)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="px-8 py-3 bg-transparent border border-neon-pink rounded-lg font-medium text-white flex items-center gap-2 transition-all duration-200"
            onClick={() => router.push("/projects")}
          >
            View Projects <ArrowRight className="ml-1" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
