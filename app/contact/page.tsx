"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Send, Mail, Phone, MapPin } from "lucide-react"

import { useToast } from "@/hooks/use-toast"
import Input from "@/components/ui/Input" // Adjust the path based on your project structure

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    })

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
            Get In Touch
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-darker/40 backdrop-blur-xl rounded-xl border border-white/10 p-6 md:p-8 relative overflow-hidden"
          >
            {/* Glassmorphism effect */}
            <div className="absolute inset-0 opacity-30 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20" />

            <div className="relative z-10">
              <h2 className="text-2xl font-orbitron font-bold mb-6 text-white">Send a Message</h2>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-darker/60 border-white/10 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all duration-200"
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-darker/60 border-white/10 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all duration-200"
                  />
                </div>

                <div>
                  <Input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-darker/60 border-white/10 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all duration-200"
                  />
                </div>

                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-darker/60 border-white/10 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue resize-none transition-all duration-200"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink transition-all duration-200 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Border glow effect */}
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                boxShadow: "0 0 20px rgba(0, 200, 255, 0.2)",
                border: "1px solid rgba(0, 200, 255, 0.1)",
              }}
            />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-darker/40 backdrop-blur-xl rounded-xl border border-white/10 p-6 md:p-8 relative overflow-hidden">
              {/* Glassmorphism effect */}
              <div className="absolute inset-0 opacity-30 rounded-xl bg-gradient-to-br from-neon-pink/20 to-neon-green/20" />

              <div className="relative z-10">
                <h2 className="text-2xl font-orbitron font-bold mb-6 text-white">Contact Information</h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-neon-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Email</h3>
                      <p className="text-white/70">pranjal@example.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-neon-purple" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Phone</h3>
                      <p className="text-white/70">+91 98765 43210</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-neon-pink/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-neon-pink" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Location</h3>
                      <p className="text-white/70">New Delhi, India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Border glow effect */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  boxShadow: "0 0 20px rgba(255, 45, 146, 0.2)",
                  border: "1px solid rgba(255, 45, 146, 0.1)",
                }}
              />
            </div>

            <div className="bg-darker/40 backdrop-blur-xl rounded-xl border border-white/10 p-6 md:p-8 relative overflow-hidden">
              {/* Glassmorphism effect */}
              <div className="absolute inset-0 opacity-30 rounded-xl bg-gradient-to-br from-neon-green/20 to-neon-blue/20" />

              <div className="relative z-10">
                <h2 className="text-2xl font-orbitron font-bold mb-6 text-white">Let's Connect</h2>
                <p className="text-white/70 mb-6">
                  Follow me on social media to stay updated with my latest projects and tech insights. I'm always open
                  to new opportunities and collaborations.
                </p>
                <p className="text-white/70">Looking forward to working with you on your next exciting project!</p>
              </div>

              {/* Border glow effect */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  boxShadow: "0 0 20px rgba(0, 255, 157, 0.2)",
                  border: "1px solid rgba(0, 255, 157, 0.1)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
