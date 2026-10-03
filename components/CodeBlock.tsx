import React from 'react'
import CopyButton from './CopyButton'

interface CodeBlockProps {
  children: React.ReactNode
  raw?: string
  'data-language'?: string
  [key: string]: unknown
}

export default function CodeBlock({ children, raw, 'data-language': language, ...props }: CodeBlockProps) {
  let textToCopy = raw || ''
  
  if (!textToCopy && children) {
    const extractText = (node: React.ReactNode): string => {
      if (typeof node === 'string' || typeof node === 'number') {
        return String(node)
      }
      if (Array.isArray(node)) {
        return node.map(extractText).join('')
      }
      if (React.isValidElement(node)) {
        return extractText(node.props.children)
      }
      return ''
    }
    textToCopy = extractText(children)
  }

  return (
    <div className="relative group my-6">
      {language && (
        <div className="absolute top-0 right-10 px-2 py-1 text-xs font-mono text-muted rounded-bl-lg bg-surface border-l border-b border-border z-10">
          {language}
        </div>
      )}
      <CopyButton text={textToCopy} />
      <pre {...props} className="bg-surface border border-border rounded-lg p-4 overflow-x-auto text-sm">
        {children}
      </pre>
    </div>
  )
}
