import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zive',
  description: 'Creative Front-End Developer & Designer Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} modern-bg`}>
        {/* Background blobs */}
        <div className="blob-gradient bg-blue-500/30" style={{ top: '10%', right: '15%' }}></div>
        <div className="blob-gradient bg-purple-500/20" style={{ bottom: '15%', left: '10%' }}></div>
        
        {/* Grid background */}
        <div className="grid-bg fixed inset-0"></div>
        
        {/* Noise texture */}
        <div className="noise-bg fixed inset-0"></div>
        
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}