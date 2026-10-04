'use client'

import { useState, useMemo } from 'react'
import { Writeup, Category, Difficulty } from '@/lib/types'
import WriteupCard from './WriteupCard'
import { cn } from '@/lib/utils'

interface WriteupsListProps {
  writeups: Writeup[]
}

const CATEGORIES: ('All' | Category)[] = ['All', 'CTF', 'Web', 'Network', 'Forensics', 'Offensive', 'Defensive']
const DIFFICULTIES: ('All' | Difficulty)[] = ['All', 'Easy', 'Medium', 'Hard', 'Insane']

export default function WriteupsList({ writeups }: WriteupsListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All')
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc'>('date-desc')

  const filteredWriteups = useMemo(() => {
    return writeups
      .filter((writeup) => {
        const matchesSearch = 
          writeup.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          writeup.frontmatter.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          writeup.frontmatter.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

        const matchesCategory = selectedCategory === 'All' || writeup.frontmatter.category === selectedCategory
        const matchesDifficulty = selectedDifficulty === 'All' || writeup.frontmatter.difficulty === selectedDifficulty

        return matchesSearch && matchesCategory && matchesDifficulty
      })
      .sort((a, b) => {
        const dateA = new Date(a.frontmatter.date).getTime()
        const dateB = new Date(b.frontmatter.date).getTime()
        return sortBy === 'date-desc' ? dateB - dateA : dateA - dateB
      })
  }, [writeups, searchQuery, selectedCategory, selectedDifficulty, sortBy])

  return (
    <div className="space-y-8">
      <div className="space-y-6 bg-surface border border-border rounded-lg p-6">
        <div className="relative">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" height="18" viewBox="0 0 24 24" 
            fill="none" stroke="currentColor" strokeWidth="2" 
            strokeLinecap="round" strokeLinejoin="round" 
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search writeups by title, CVE, tool, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-primary placeholder:text-muted/70 text-sm focus:outline-none focus:border-accent transition-colors font-mono"
            aria-label="Search writeups"
          />
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-mono text-xs text-muted mb-2.5 uppercase tracking-wider">Category</h4>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => {
                const isSelected = selectedCategory === cat
                const isOffensive = cat === 'Offensive'
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "font-mono text-xs uppercase tracking-wider px-3 py-1 rounded-full transition-colors border",
                      isSelected 
                        ? (isOffensive 
                            ? "border-accent-red text-accent-red bg-accent-red/10" 
                            : "border-accent text-accent bg-accent/10")
                        : "border-border bg-background text-muted hover:text-primary hover:border-border"
                    )}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs text-muted mb-2.5 uppercase tracking-wider">Difficulty</h4>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTIES.map(diff => {
                const isSelected = selectedDifficulty === diff
                const isHigh = diff === 'Hard' || diff === 'Insane'
                return (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={cn(
                      "font-mono text-xs uppercase tracking-wider px-3 py-1 rounded-full transition-colors border",
                      isSelected 
                        ? (isHigh 
                            ? "border-accent-red text-accent-red bg-accent-red/10" 
                            : "border-accent text-accent bg-accent/10")
                        : "border-border bg-background text-muted hover:text-primary hover:border-border"
                    )}
                  >
                    {diff}
                  </button>
                )
              })}
            </div>
          </div>
          
          <div className="flex items-center gap-3 pt-2">
             <label htmlFor="sort-select" className="font-mono text-xs text-muted uppercase tracking-wider">Sort:</label>
             <select
               id="sort-select"
               value={sortBy}
               onChange={(e) => setSortBy(e.target.value as 'date-desc' | 'date-asc')}
               className="bg-background border border-border rounded px-3 py-1 text-xs text-primary font-mono focus:outline-none focus:border-accent"
             >
               <option value="date-desc">Newest First</option>
               <option value="date-asc">Oldest First</option>
             </select>
          </div>
        </div>
      </div>

      {filteredWriteups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWriteups.map(writeup => (
            <WriteupCard key={writeup.slug} writeup={writeup} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-surface border border-border rounded-lg">
          <p className="text-muted font-mono text-sm">No writeups found matching your query.</p>
        </div>
      )}
    </div>
  )
}
