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
      return 'text-green-400 bg-green-400/10 border-green-400/20'
    case 'in-progress':
      return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
    case 'archived':
      return 'text-muted bg-muted/10 border-muted/20'
    default:
      return 'text-muted bg-muted/10 border-muted/20'
  }
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'Easy':
      return 'text-green-400 bg-green-400/10 border-green-400/20'
    case 'Medium':
      return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
    case 'Hard':
      return 'text-orange-400 bg-orange-400/10 border-orange-400/20'
    case 'Insane':
      return 'text-red-400 bg-red-400/10 border-red-400/20'
    default:
      return 'text-muted bg-muted/10 border-muted/20'
  }
}
