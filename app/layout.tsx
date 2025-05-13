import type React from "react"
import "./globals.css"
import { Inter, Orbitron } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/Header"
import InteractiveBackground from "@/components/InteractiveBackground"
import CustomCursor from "@/components/CustomCursor"
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "900"],
})

export const metadata = {
  title: "Pranjal Singh - Full Stack Developer",
  description: "Portfolio of Pranjal Singh - Full Stack Developer specializing in modern web applications",
  keywords: "developer, web developer, full stack, react, next.js, javascript, portfolio"
}

export default function RootLayout({children}:{children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${orbitron.variable} font-sans bg-darker text-light min-h-screen overflow-x-hidden`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">


          {/* Interactive background with raining shapes */}
          <InteractiveBackground />

          {/* Header for all pages except homepage */}
          <Header />

          {/* Custom cursor */}
          <CustomCursor />

          {/* Main content */}
          <main className="relative z-10">{children} <Analytics /></main>
        </ThemeProvider>
      </body>
    </html>
  )
}
