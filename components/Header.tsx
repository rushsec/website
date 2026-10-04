'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Container from './Container'

const LogoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none" className="h-7 w-7 flex-shrink-0" aria-hidden="true">
    <path d="M60 12 L102 27 V60 C102 86 83 102 60 111 C37 102 18 86 18 60 V27 Z" stroke="#2bd97c" strokeWidth="4.5" strokeLinejoin="round" />
    <path d="M43 43 L63 60 L43 77" stroke="#dce8e1" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M67 43 L87 60 L67 77" stroke="#2bd97c" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <LogoIcon />
            <span className="font-semibold text-lg tracking-wide text-primary">
              Rush<span className="text-accent">Sec</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
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
            <a 
              href="https://github.com/rushsec" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted hover:text-accent transition-colors flex items-center gap-2 text-sm font-mono border border-border px-3 py-1.5 rounded-lg hover:border-accent/40" 
              aria-label="RushSec GitHub Organization"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <span>GitHub</span>
            </a>
          </div>
          
          <button 
            className="md:hidden p-2 text-muted hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-lg flex flex-col p-6 border-b border-border md:hidden">
          <nav className="flex flex-col gap-6 text-lg" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const active = pathname.startsWith(link.href)
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={cn("font-medium transition-colors py-2 border-b border-border/40", active ? "text-accent" : "text-muted hover:text-primary")}
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
              className="text-muted hover:text-accent transition-colors flex items-center gap-2 mt-4 font-mono text-base"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <span>GitHub / rushsec</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
