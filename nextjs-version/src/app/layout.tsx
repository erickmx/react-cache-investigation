import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'React Cache Investigation - Next.js',
  description: 'Next.js application for testing React caching behaviors',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body style={{ backgroundColor: '#0a0e17', color: '#e8e6e3', fontFamily: "'Exo 2', sans-serif" }}>{children}</body>
    </html>
  )
}
