"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { Home, User, Code2, Cog, Mail, FileText } from "lucide-react"
import { motion } from "framer-motion"

const navItems = [
  { name: "HOME", icon: Home, path: "/" },
  { name: "ABOUT", icon: User, path: "/about" },
  { name: "PROJECTS", icon: Code2, path: "/projects" },
  { name: "SKILLS", icon: Cog, path: "/skills" },
  { name: "RESUME", icon: FileText, path: "/resume" },
  { name: "CONTACT", icon: Mail, path: "/contact" },
]

export default function HomeNavBar() {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
     className="fixed bottom-8 inset-x-0 flex justify-center z-50"

    >
      <div className="bg-darker/40 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-glow-md mx-4">
        <div className="flex flex-wrap justify-center items-center gap-4">
          {navItems.map((item, index) => {
            const colors = [
              "var(--neon-blue)",
              "var(--neon-purple)",
              "var(--neon-pink)",
              "var(--neon-green)",
              "var(--neon-blue)",
              "var(--neon-purple)",
            ]

            return (
              <motion.div
                key={item.name}
                className="relative"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.2 }}
                custom={index}
              >
                <motion.button
                  className="w-20 h-20 flex flex-col items-center justify-center rounded-xl transition-all duration-200 bg-darker/60 border border-white/5"
                  onClick={() => handleNavigation(item.path)}
                  whileHover={{
                    boxShadow: `0 10px 25px -5px ${colors[index]}`,
                    borderColor: colors[index],
                  }}
                  style={
                    {
                      "--card-color": colors[index],
                    } as React.CSSProperties
                  }
                >
                  <item.icon className="w-6 h-6 mb-2 text-white" />
                  <span className="text-xs font-medium text-white/80">{item.name}</span>
                </motion.button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
