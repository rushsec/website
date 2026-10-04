export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'stable':
      return 'text-accent bg-accent/10 border-accent/25'
    case 'in-progress':
      return 'text-amber-400 bg-amber-400/10 border-amber-400/20'
    case 'archived':
      return 'text-muted bg-muted/10 border-muted/20'
    default:
      return 'text-muted bg-muted/10 border-muted/20'
  }
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'Easy':
      return 'text-accent bg-accent/10 border-accent/30'
    case 'Medium':
      return 'text-amber-400 bg-amber-400/10 border-amber-400/25'
    case 'Hard':
      return 'text-accent-red bg-accent-red/10 border-accent-red/30'
    case 'Insane':
      return 'text-accent-red bg-accent-red/15 border-accent-red/40 font-semibold'
    default:
      return 'text-muted bg-muted/10 border-muted/20'
  }
}
