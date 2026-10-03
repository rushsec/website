import Link from 'next/link'

export default function SkipToContent() {
  return (
    <Link 
      href="#main-content" 
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded"
    >
      Skip to content
    </Link>
  )
}
