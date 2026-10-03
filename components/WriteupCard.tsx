import { Writeup } from '@/lib/types'
import { formatDate, getDifficultyColor, cn } from '@/lib/utils'
import Card from './Card'
import Tag from './Tag'

export default function WriteupCard({ writeup }: { writeup: Writeup }) {
  const { slug, frontmatter, readingTime } = writeup
  return (
    <Card href={`/writeups/${slug}`} className="flex flex-col h-full">
      <div className="flex gap-2 mb-4 flex-wrap">
        <Tag>{frontmatter.category}</Tag>
        <span className={cn("font-mono text-xs rounded-full px-3 py-1 border", getDifficultyColor(frontmatter.difficulty))}>
          {frontmatter.difficulty}
        </span>
      </div>
      <h3 className="text-lg font-semibold group-hover:text-accent transition-colors mb-2">
        {frontmatter.title}
      </h3>
      <p className="text-muted text-sm flex-grow mb-4">
        {frontmatter.description}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
        <div className="text-muted text-sm font-mono flex items-center gap-3">
          <span>{formatDate(frontmatter.date)}</span>
          <span>•</span>
          <span>{readingTime}</span>
        </div>
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {frontmatter.tags.slice(0, 3).map(tag => (
              <Tag key={tag} variant="default">{tag}</Tag>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
