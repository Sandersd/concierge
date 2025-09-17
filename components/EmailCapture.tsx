'use client'

import { useState } from 'react'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setStatus('error')
      setMessage('Please enter your email address')
      return
    }

    if (!validateEmail(email)) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For now, just simulate success
      setStatus('success')
      setMessage('Thank you! You\'ve been added to our waitlist.')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div id="email-capture" className="w-full max-w-md mx-auto px-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="
              email-input w-full px-6 py-4 
              bg-transparent 
              border border-white/20 
              rounded-lg 
              text-concierge-white 
              placeholder:text-concierge-white/50
              font-sans text-lg
              transition-all duration-300
              focus:border-concierge-silver/50
            "
            disabled={status === 'loading'}
            aria-describedby={message ? 'email-message' : undefined}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="
            join-button w-full px-6 py-4 
            rounded-lg 
            font-sans font-medium text-lg
            text-concierge-white
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-concierge-silver/30
          "
        >
          {status === 'loading' ? (
            <span className="flex items-center justify-center">
              <svg 
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Joining...
            </span>
          ) : (
            'Join Waitlist'
          )}
        </button>

        {message && (
          <div 
            id="email-message"
            className={`
              text-center text-sm px-4 py-2 rounded
              ${status === 'error' 
                ? 'text-red-400 bg-red-900/20 border border-red-400/20' 
                : 'text-green-400 bg-green-900/20 border border-green-400/20'
              }
            `}
            role={status === 'error' ? 'alert' : 'status'}
            aria-live="polite"
          >
            {message}
          </div>
        )}
      </form>

      {/* Privacy notice */}
      <p className="text-xs text-concierge-white/40 text-center mt-6 leading-relaxed">
        We respect your privacy. No spam, ever. 
        <br />
        Unsubscribe at any time.
      </p>
    </div>
  )
}