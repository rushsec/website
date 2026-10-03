import Link from 'next/link'
import Container from '@/components/Container'

export const metadata = {
  title: '404 — RushSec',
}

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-[60vh] py-24">
      <div className="font-mono text-muted mb-6 text-xl flex items-center">
        <span>{'>'} 404: page not found</span>
        <span className="ml-2 inline-block w-2 h-5 bg-accent animate-blink"></span>
      </div>
      <p className="text-muted text-lg mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/" className="bg-surface border border-border text-primary hover:border-accent/50 px-6 py-3 rounded-lg font-medium transition-colors">
          Back to Home
        </Link>
        <Link href="/writeups" className="bg-accent text-white hover:bg-accent/90 px-6 py-3 rounded-lg font-medium transition-colors">
          Browse Writeups
        </Link>
      </div>
    </Container>
  )
}
