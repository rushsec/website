import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SkipToContent from '@/components/SkipToContent'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://rushsec.dev'),
  title: 'RushSec — Cybersecurity Labs & Tools',
  description: 'CTF writeups, lab notes, offensive and defensive security tools, and research by Md. Shihab Shahriar Rashu.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'RushSec — Cybersecurity Labs & Tools',
    description: 'CTF writeups, lab notes, offensive and defensive security tools, and research.',
    url: 'https://rushsec.dev',
    siteName: 'RushSec',
    images: [{ url: '/og/home' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RushSec — Cybersecurity Labs & Tools',
    description: 'CTF writeups, lab notes, offensive and defensive security tools, and research.',
    images: ['/og/home'],
  },
}

export const viewport: Viewport = {
  themeColor: '#050a08',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        <SkipToContent />
        <Header />
        <main id="main-content" className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
