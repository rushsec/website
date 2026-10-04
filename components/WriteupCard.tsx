import { Writeup } from '@/lib/types'
import { formatDate, getDifficultyColor, cn } from '@/lib/utils'
import Card from './Card'
import Tag from './Tag'

export default function WriteupCard({ writeup }: { writeup: Writeup }) {
  const { slug, frontmatter, readingTime } = writeup
  const isOffensive = frontmatter.category === 'Offensive' || frontmatter.tags?.some(t => ['exploit', 'rce', 'cve'].includes(t.toLowerCase()))

  return (
    <Card 
      href={`/writeups/${slug}`} 
      className={cn(
        "flex flex-col h-full group relative transition-colors duration-200",
        isOffensive ? "hover:border-accent-red/50" : "hover:border-accent/50"
      )}
    >
      <div className="flex gap-2 mb-4 flex-wrap items-center">
        <Tag variant={frontmatter.category === 'Offensive' ? 'exploit' : frontmatter.category === 'Defensive' ? 'defense' : 'default'}>
          {frontmatter.category}
        </Tag>
        <span className={cn("font-mono text-xs rounded-full px-2.5 py-0.5 border uppercase", getDifficultyColor(frontmatter.difficulty))}>
          {frontmatter.difficulty}
        </span>
        {isOffensive && (
          <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto w-1.5 h-1.5 rounded-full bg-accent-red" title="Offensive focus" />
        )}
      </div>
      <h3 className={cn(
        "text-lg font-semibold transition-colors mb-2",
        isOffensive ? "group-hover:text-primary" : "group-hover:text-accent"
      )}>
        {frontmatter.title}
      </h3>
      <p className="text-muted text-sm flex-grow mb-4">
        {frontmatter.description}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
        <div className="text-muted text-sm font-mono flex items-center gap-2">
          <span>{formatDate(frontmatter.date)}</span>
          <span>•</span>
          <span>{readingTime}</span>
        </div>
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {frontmatter.tags.slice(0, 3).map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
