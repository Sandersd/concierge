import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Concierge - Your Personal AI Travel Assistant',
  description: 'Ultra-premium AI travel concierge service for discerning travelers',
  keywords: ['AI', 'travel', 'concierge', 'luxury', 'personal assistant'],
  openGraph: {
    title: 'Concierge - Your Personal AI Travel Assistant',
    description: 'Ultra-premium AI travel concierge service',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-concierge-black text-concierge-white overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}