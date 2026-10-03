import { cn } from '@/lib/utils'

interface TagProps {
  children: React.ReactNode
  variant?: 'default' | 'accent'
}

export default function Tag({ children, variant = 'default' }: TagProps) {
  return (
    <span className={cn(
      "font-mono text-xs rounded-full px-3 py-1",
      variant === 'default' ? "bg-surface border border-border" : "border border-accent/30 text-accent bg-accent/10"
    )}>
      {children}
    </span>
  )
}
