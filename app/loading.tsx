export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-darker text-white">
      <div className="w-16 h-16 border-4 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-white/70">Loading...</p>
    </div>
  )
}
