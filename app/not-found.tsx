import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-darker text-white p-4">
      <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-6 text-neon-blue">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="text-lg text-white/70 mb-8 text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg font-medium text-white"
      >
        Return Home
      </Link>
    </div>
  )
}
