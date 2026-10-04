import Link from 'next/link'
import Container from './Container'

const LogoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none" className="h-6 w-6 flex-shrink-0" aria-hidden="true">
    <path d="M60 12 L102 27 V60 C102 86 83 102 60 111 C37 102 18 86 18 60 V27 Z" stroke="#2bd97c" strokeWidth="4.5" strokeLinejoin="round" />
    <path d="M43 43 L63 60 L43 77" stroke="#dce8e1" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M67 43 L87 60 L67 77" stroke="#2bd97c" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40 py-12 mt-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <LogoIcon />
              <span className="font-semibold text-lg tracking-wide text-primary">
                Rush<span className="text-accent">Sec</span>
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              CTF writeups, lab notes, offensive and defensive security tools, and research.
            </p>
          </div>
          
          <div>
            <h4 className="font-mono text-primary text-xs uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              <li><Link href="/writeups" className="text-muted hover:text-accent transition-colors text-sm">Writeups</Link></li>
              <li><Link href="/tools" className="text-muted hover:text-accent transition-colors text-sm">Tools</Link></li>
              <li><Link href="/about" className="text-muted hover:text-accent transition-colors text-sm">About</Link></li>
              <li><Link href="/contact" className="text-muted hover:text-accent transition-colors text-sm">Contact</Link></li>
              <li><a href="/feed.xml" className="text-muted hover:text-accent transition-colors text-sm">RSS Feed</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-mono text-primary text-xs uppercase tracking-wider mb-4">Connect</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="https://github.com/rushsec" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors text-sm flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span>GitHub: rushsec</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/rushdv" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors text-sm flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span>Author: rushdv</span>
                </a>
              </li>
              <li>
                <a href="mailto:contact@rushsec.dev" className="text-muted hover:text-accent transition-colors text-sm flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <span>contact@rushsec.dev</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs font-mono">
            © 2026 RushSec. All rights reserved.
          </p>
          <p className="text-muted text-xs font-mono text-center md:text-right max-w-xl">
            All content is for education and for systems the author owns or is authorized to test.
          </p>
        </div>
      </Container>
    </footer>
  )
}
