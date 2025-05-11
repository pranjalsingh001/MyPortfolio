"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Home, User, Code2, Cog, Mail, Menu, X, FileText } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { name: "HOME", icon: Home, path: "/" },
  { name: "ABOUT", icon: User, path: "/about" },
  { name: "PROJECTS", icon: Code2, path: "/projects" },
  { name: "SKILLS", icon: Cog, path: "/skills" },
  { name: "RESUME", icon: FileText, path: "/resume" },
  { name: "CONTACT", icon: Mail, path: "/contact" },
]

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isHomePage = pathname === "/"

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavigation = (path: string) => {
    setMobileMenuOpen(false)
    router.push(path)
  }

  if (isHomePage) {
    return null
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "py-2 bg-darker/80 backdrop-blur-xl shadow-lg" : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center"
        >
          <button
            onClick={() => router.push("/")}
            className="font-orbitron text-xl md:text-2xl font-bold text-white flex items-center"
          >
            <span className="text-neon-blue mr-2">PS</span>
            <span className="hidden md:inline">Pranjal Singh</span>
          </button>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="hidden md:flex items-center space-x-8"
        >
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className={`relative px-2 py-1 text-sm font-medium transition-all duration-200 ${
                pathname === item.path ? "text-neon-blue" : "text-white/70 hover:text-white"
              }`}
            >
              <span className="relative z-10">{item.name}</span>
              {pathname === item.path && (
                <motion.span
                  layoutId="navIndicator"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-blue"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.nav>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-darker/60 backdrop-blur-md border border-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="bg-darker/90 backdrop-blur-xl border-t border-white/10 py-4">
              <div className="container mx-auto px-4 flex flex-col space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.path)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      pathname === item.path ? "bg-neon-blue/10 text-neon-blue" : "text-white/70 hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
