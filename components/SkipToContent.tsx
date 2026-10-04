import Link from 'next/link'

export default function SkipToContent() {
  return (
    <Link 
      href="#main-content" 
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-accent focus:text-[#050a08] focus:font-semibold focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:outline-none"
    >
      Skip to content
    </Link>
  )
}
