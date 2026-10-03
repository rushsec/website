'use client'

import { useEffect, useState } from 'react'
import { TOCHeading } from '@/lib/types'
import { cn } from '@/lib/utils'

export default function TOC({ headings }: { headings: TOCHeading[] }) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0px 0px -80% 0px' }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  if (!headings.length) return null

  return (
    <nav aria-label="Table of contents" className="sticky top-24 hidden lg:block">
      <h4 className="font-mono text-sm text-primary mb-4 uppercase tracking-wider">Contents</h4>
      <ul className="space-y-2 border-l border-border text-sm">
        {headings.map((heading) => {
          const isActive = activeId === heading.id
          
          return (
            <li 
              key={heading.id} 
              className={cn(
                "transition-colors",
                heading.level === 3 ? "ml-4" : heading.level === 4 ? "ml-8" : "",
                isActive ? "border-l-2 border-accent -ml-[1px]" : ""
              )}
            >
              <a 
                href={`#${heading.id}`}
                className={cn(
                  "block py-1 px-4 hover:text-primary transition-colors",
                  isActive ? "text-primary" : "text-muted"
                )}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(heading.id)
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                    setActiveId(heading.id)
                  }
                }}
              >
                {heading.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
