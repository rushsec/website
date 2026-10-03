'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Container from './Container'

const LogoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none" className="h-8 w-8">
    <path d="M100 25 L155 45 V90 C155 125 130 148 100 160 C70 148 45 125 45 90 V45 Z" stroke="#ff5a1f" strokeWidth="5" strokeLinejoin="round" />
    <path d="M78 66 L104 90 L78 114" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M110 66 L136 90 L110 114" stroke="#ff5a1f" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  
  const navLinks = [
    { href: '/writeups', label: 'Writeups' },
    { href: '/tools', label: 'Tools' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <LogoIcon />
            <span className="font-semibold text-lg tracking-wide text-primary">RushSec</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname.startsWith(link.href)
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={cn("text-sm font-medium transition-colors", active ? "text-accent" : "text-muted hover:text-primary")}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
          
          <div className="hidden md:flex items-center">
            <a href="https://github.com/rushsec" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </div>
          
          <button 
            className="md:hidden p-2 text-muted hover:text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col">
          <div className="flex justify-end p-4">
            <button 
              className="p-2 text-muted hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" x2="6" y1="6" y2="18" />
                <line x1="6" x2="18" y1="6" y2="18" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-grow gap-8 text-xl">
            {navLinks.map((link) => {
              const active = pathname.startsWith(link.href)
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={cn("font-medium transition-colors", active ? "text-accent" : "text-muted hover:text-primary")}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            })}
            <a 
              href="https://github.com/rushsec" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted hover:text-primary transition-colors flex items-center gap-2 mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              GitHub
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
