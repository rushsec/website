import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Writeup, WriteupFrontmatter } from './types'
import { calculateReadingTime } from './utils'

const WRITEUPS_DIR = path.join(process.cwd(), 'content', 'writeups')

export async function getWriteups(): Promise<Writeup[]> {
  if (!fs.existsSync(WRITEUPS_DIR)) return []
  
  const files = fs.readdirSync(WRITEUPS_DIR).filter(f => f.endsWith('.mdx'))
  
  const writeups = files.map(filename => {
    const slug = filename.replace(/\.mdx$/, '')
    const filePath = path.join(WRITEUPS_DIR, filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    const frontmatter = data as WriteupFrontmatter
    
    return {
      slug,
      frontmatter,
      content,
      readingTime: calculateReadingTime(content),
    }
  })
  
  return writeups
    .filter(w => w.frontmatter.published)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
}

export async function getWriteup(slug: string): Promise<Writeup | null> {
  const filePath = path.join(WRITEUPS_DIR, `${slug}.mdx`)
  
  if (!fs.existsSync(filePath)) return null
  
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  const frontmatter = data as WriteupFrontmatter
  
  return {
    slug,
    frontmatter,
    content,
    readingTime: calculateReadingTime(content),
  }
}

export async function getWriteupSlugs(): Promise<string[]> {
  if (!fs.existsSync(WRITEUPS_DIR)) return []
  return fs.readdirSync(WRITEUPS_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''))
}

export function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm
  const headings: { id: string; text: string; level: number }[] = []
  let match
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    headings.push({ id, text, level })
  }
  
  return headings
}

// Validate frontmatter at build time
export function validateFrontmatter(data: Record<string, unknown>, filename: string): WriteupFrontmatter {
  const required = ['title', 'date', 'description', 'category', 'difficulty', 'tags', 'published']
  const validCategories = ['CTF', 'Web', 'Network', 'Forensics', 'Defensive']
  const validDifficulties = ['Easy', 'Medium', 'Hard', 'Insane']
  
  for (const field of required) {
    if (!(field in data)) {
      throw new Error(`Missing required field '${field}' in ${filename}`)
    }
  }
  
  if (!validCategories.includes(data.category as string)) {
    throw new Error(`Invalid category '${data.category}' in ${filename}. Must be one of: ${validCategories.join(', ')}`)
  }
  
  if (!validDifficulties.includes(data.difficulty as string)) {
    throw new Error(`Invalid difficulty '${data.difficulty}' in ${filename}. Must be one of: ${validDifficulties.join(', ')}`)
  }
  
  if (!Array.isArray(data.tags)) {
    throw new Error(`'tags' must be an array in ${filename}`)
  }
  
  return data as unknown as WriteupFrontmatter
}
