'use client'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-concierge-black flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated loading spinner */}
        <div className="mb-8">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 border-2 border-concierge-charcoal rounded-full"></div>
            <div className="absolute inset-0 border-2 border-transparent border-t-concierge-silver rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Loading text */}
        <h2 className="title-cursive text-3xl md:text-4xl mb-4 text-concierge-white opacity-85">
          Concierge
        </h2>
        <p className="subhead-sans text-sm text-concierge-white opacity-60">
          Preparing your experience...
        </p>
      </div>
    </div>
  )
}