'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const domRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleMediaChange)
    
    return () => mediaQuery.removeEventListener('change', handleMediaChange)
  }, [])

  useEffect(() => {
    if (isReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          if (domRef.current) {
            observer.unobserve(domRef.current)
          }
        }
      },
      { threshold: 0.1 }
    )

    const currentRef = domRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [isReducedMotion])

  const style = isReducedMotion ? {} : {
    transitionDelay: `${delay}ms`
  }

  return (
    <div
      ref={domRef}
      style={style}
      className={cn(
        className,
        isReducedMotion ? "" : "transition-all duration-300 ease-out",
        isVisible || isReducedMotion ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      )}
    >
      {children}
    </div>
  )
}
