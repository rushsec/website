import React from 'react'
import { cn } from '@/lib/utils'

interface TagProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'exploit' | 'defense' | 'warning'
  className?: string
}

export default function Tag({ children, variant = 'default', className }: TagProps) {
  const text = typeof children === 'string' ? children.trim() : ''
  const lower = text.toLowerCase()

  const isExploit = 
    variant === 'exploit' || 
    (variant === 'default' && (
      lower === 'offensive' || 
      lower === 'exploit' || 
      lower === 'red-team' ||
      lower.startsWith('cve')
    ))

  const isDefense = 
    variant === 'defense' || 
    (variant === 'default' && (
      lower === 'defensive' || 
      lower === 'defense' || 
      lower === 'blue-team'
    ))

  let variantClasses = "bg-surface border border-border text-muted"

  if (isExploit || variant === 'warning') {
    // Red accent for offensive/exploit tags. Explicit text label enforced.
    variantClasses = "border border-accent-red/35 text-accent-red bg-accent-red/10"
  } else if (isDefense || variant === 'accent') {
    // Green accent for defensive/primary accent. Explicit text label enforced.
    variantClasses = "border border-accent/35 text-accent bg-accent/10"
  }

  // Ensure red and green tags always carry an explicit text label (never color alone)
  let displayContent = children
  if (isExploit && text) {
    const upper = text.toUpperCase()
    if (!upper.includes('EXPLOIT') && !upper.includes('OFFENSIVE') && !upper.includes('RED-TEAM') && !upper.includes('CVE')) {
      displayContent = `EXPLOIT: ${upper}`
    } else {
      displayContent = upper
    }
  } else if (isDefense && text) {
    const upper = text.toUpperCase()
    if (!upper.includes('DEFENSE') && !upper.includes('DEFENSIVE')) {
      displayContent = `DEFENSE: ${upper}`
    } else {
      displayContent = upper
    }
  } else if (variant === 'accent' && text) {
    displayContent = text.toUpperCase()
  }

  return (
    <span className={cn(
      "font-mono text-xs rounded-full px-2.5 py-0.5 inline-flex items-center",
      variantClasses,
      className
    )}>
      {displayContent}
    </span>
  )
}
