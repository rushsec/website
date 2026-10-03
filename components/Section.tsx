import { cn } from '@/lib/utils'

interface SectionProps {
  number: string
  label: string
  children: React.ReactNode
  className?: string
}

export default function Section({ number, label, children, className }: SectionProps) {
  return (
    <section className={cn("py-16 sm:py-20", className)}>
      <header className="font-mono text-muted text-sm uppercase tracking-wider mb-8">
        {number} / {label}
      </header>
      <div>
        {children}
      </div>
    </section>
  )
}
