"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-darker text-white p-4">
      <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-6 text-neon-pink">Error</h1>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Something went wrong</h2>
      <p className="text-lg text-white/70 mb-8 text-center">An error occurred while loading this page.</p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg font-medium text-white"
        >
          Try Again
        </button>
        <Link href="/" className="px-6 py-3 border border-neon-pink rounded-lg font-medium text-white">
          Return Home
        </Link>
      </div>
    </div>
  )
}
