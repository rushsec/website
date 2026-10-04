import { Tool } from '@/lib/types'
import { getStatusColor, formatDate, cn } from '@/lib/utils'
import Tag from './Tag'

export default function ToolCard({ tool }: { tool: Tool }) {
  const isOffensive = tool.category === 'offensive' || tool.name === 'netprobe'

  return (
    <a 
      href={tool.repo} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block group h-full"
    >
      <div className={cn(
        "bg-surface border border-border rounded-lg p-6 transition-colors duration-200 h-full flex flex-col relative",
        isOffensive ? "hover:border-accent-red/40" : "hover:border-accent/40"
      )}>
        <div className="absolute top-6 right-6 text-muted group-hover:text-primary transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </div>
        
        <div className="flex items-center gap-3 mb-3 pr-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted group-hover:text-primary transition-colors" aria-hidden="true">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          <h3 className={cn(
            "text-lg font-semibold transition-colors",
            isOffensive ? "group-hover:text-primary" : "group-hover:text-accent"
          )}>
            {tool.name}
          </h3>
          {isOffensive ? (
            <Tag variant="exploit">OFFENSIVE</Tag>
          ) : (
            <Tag variant="defense">DEFENSE</Tag>
          )}
        </div>
        
        <p className="text-muted text-sm mb-4 flex-grow leading-relaxed">
          {tool.description}
        </p>
        
        <div className="flex flex-wrap items-center gap-3 mt-auto font-mono text-xs pt-3 border-t border-border/40">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
            <span className="text-primary">{tool.language}</span>
          </div>
          <div className={cn("px-2 py-0.5 rounded-full border uppercase tracking-wider text-[11px]", getStatusColor(tool.status))}>
            {tool.status}
          </div>
          {tool.stars !== undefined && (
            <div className="flex items-center gap-1 text-muted">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span>{tool.stars}</span>
            </div>
          )}
          {tool.lastUpdate && (
            <div className="text-muted ml-auto text-[11px]">
              {formatDate(tool.lastUpdate)}
            </div>
          )}
        </div>
      </div>
    </a>
  )
}
