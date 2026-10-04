import Link from 'next/link'
import Container from '@/components/Container'

export const metadata = {
  title: '404 — RushSec',
  description: 'Page not found.',
}

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-[60vh] py-24 text-center">
      <div className="font-mono text-muted mb-6 text-xl flex items-center justify-center tracking-wider">
        <span className="text-accent">&gt;</span>
        <span className="ml-2">404: page not found</span>
        <span className="ml-2 inline-block w-2 h-5 bg-accent animate-blink" aria-hidden="true"></span>
      </div>
      <p className="text-muted text-base mb-8 max-w-md font-mono">
        The requested address does not exist or has been relocated.
      </p>
      <div className="flex flex-wrap justify-center gap-4 font-mono text-sm">
        <Link 
          href="/" 
          className="bg-surface border border-border text-primary hover:border-accent hover:text-accent px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Return Home
        </Link>
        <Link 
          href="/writeups" 
          className="bg-accent text-[#050a08] hover:bg-accent/90 px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Browse Writeups
        </Link>
      </div>
    </Container>
  )
}
