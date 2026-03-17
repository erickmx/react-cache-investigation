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
      <body>{children}</body>
    </html>
  )
}
