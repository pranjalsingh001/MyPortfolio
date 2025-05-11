"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter } from "lucide-react"

const socialLinks = [
  { icon: Github, href: "https://github.com/pranjalsingh001", color: "var(--neon-blue)" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/pranjal-singh-0b3799315", 
  color: "var(--neon-purple)" },
  { icon: Twitter, href: "#", color: "var(--neon-pink)" },
]

export default function SocialLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="fixed bottom-8 left-8 z-50 flex flex-col space-y-4"
    >
      {socialLinks.map((link, index) => (
        <motion.a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-darker/60 backdrop-blur-md flex items-center justify-center border border-white/10 text-white transition-all duration-200"
          whileHover={{
            y: -5,
            scale: 1.05,
            boxShadow: `0 10px 25px -5px ${link.color}`,
            borderColor: link.color,
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + index * 0.1 }}
        >
          <link.icon className="w-5 h-5" />
        </motion.a>
      ))}
    </motion.div>
  )
}
