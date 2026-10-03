import { cn } from '@/lib/utils'
import Link from 'next/link'

interface CardProps {
  children: React.ReactNode
  className?: string
  href?: string
}

export default function Card({ children, className, href }: CardProps) {
  const baseClasses = cn("bg-surface border border-border rounded-lg p-6 group", className)
  
  if (href) {
    return (
      <Link href={href} className={cn(baseClasses, "block hover:border-accent/50 transition-colors duration-200")}>
        {children}
      </Link>
    )
  }
  
  return (
    <div className={baseClasses}>
      {children}
    </div>
  )
}
