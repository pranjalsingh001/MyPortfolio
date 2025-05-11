"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Home, User, Code2, Cog, Mail, Menu, X } from "lucide-react"

const navItems = [
  { name: "HOME", icon: Home, path: "/" },
  { name: "ABOUT", icon: User, path: "/about" },
  { name: "PROJECTS", icon: Code2, path: "/projects" },
  { name: "SKILLS", icon: Cog, path: "/skills" },
  { name: "CONTACT", icon: Mail, path: "/contact" },
]

export default function NavBar() {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleNavigation = (path: string) => {
    setMobileMenuOpen(false)
    router.push(path)
  }

  return (
    <>
      {/* Mobile Menu Toggle - Make sure it's visible */}
      <button
        className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-darker/80 backdrop-blur-md flex items-center justify-center border border-white/10 md:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{ boxShadow: "0 0 10px rgba(0, 200, 255, 0.3)" }}
      >
        {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed top-20 right-4 z-50 bg-darker/80 backdrop-blur-md p-6 rounded-xl border border-white/10 md:hidden"
          style={{ boxShadow: "0 0 20px rgba(0, 200, 255, 0.2)" }}
        >
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  pathname === item.path ? "bg-primary/20 text-white" : "text-white/70 hover:bg-white/10"
                }`}
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Desktop Navigation - Make it more visible */}
      <div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 hidden md:block"
        style={{ boxShadow: "0 0 30px rgba(0, 200, 255, 0.3)" }}
      >
        <div className="flex space-x-6 bg-darker/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
          {navItems.map((item, index) => {
            const isActive = pathname === item.path
            const colors = [
              "var(--neon-blue)",
              "var(--neon-purple)",
              "var(--neon-pink)",
              "var(--neon-green)",
              "var(--neon-blue)",
            ]

            return (
              <div key={item.name} className="relative">
                <button
                  className={`w-20 h-20 flex flex-col items-center justify-center rounded-xl transition-all ${
                    isActive
                      ? "bg-darker border border-[color:var(--card-color)]"
                      : "bg-darker/60 border border-white/5"
                  }`}
                  onClick={() => handleNavigation(item.path)}
                  style={
                    {
                      "--card-color": colors[index],
                      boxShadow: isActive ? `0 0 15px ${colors[index]}` : "none",
                    } as React.CSSProperties
                  }
                >
                  <item.icon className={`w-6 h-6 mb-2 ${isActive ? "text-[color:var(--card-color)]" : "text-white"}`} />
                  <span className={`text-xs font-medium ${isActive ? "text-white" : "text-white/80"}`}>
                    {item.name}
                  </span>

                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 w-10 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full transform -translate-x-1/2" />
                  )}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Fallback navigation for mobile - always visible */}
      <div className="fixed top-0 left-0 w-full bg-darker/80 backdrop-blur-md p-2 flex justify-center z-40 md:hidden">
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              className={`p-2 rounded-md ${pathname === item.path ? "text-neon-blue" : "text-white/70"}`}
              onClick={() => handleNavigation(item.path)}
            >
              <item.icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
