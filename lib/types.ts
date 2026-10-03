export type Category = 'CTF' | 'Web' | 'Network' | 'Forensics' | 'Defensive'
export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Insane'
export type ToolStatus = 'stable' | 'in-progress' | 'archived'

export interface WriteupFrontmatter {
  title: string
  date: string
  description: string
  category: Category
  difficulty: Difficulty
  tags: string[]
  published: boolean
}

export interface Writeup {
  slug: string
  frontmatter: WriteupFrontmatter
  content: string
  readingTime: string
}

export interface Tool {
  name: string
  slug: string
  description: string
  language: string
  status: ToolStatus
  repo: string
  stars?: number
  lastUpdate?: string
}

export interface TOCHeading {
  id: string
  text: string
  level: number
}
