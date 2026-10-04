import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { getWriteup, getWriteupSlugs, getWriteups, extractHeadings } from '@/lib/mdx'
import { formatDate, getDifficultyColor } from '@/lib/utils'
import Container from '@/components/Container'
import Tag from '@/components/Tag'
import TOC from '@/components/TOC'
import CodeBlock from '@/components/CodeBlock'

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: 'github-dark-default', keepBackground: false }],
    ],
  },
}

const components = {
  pre: CodeBlock,
}

export async function generateStaticParams() {
  try {
    const slugs = await getWriteupSlugs()
    return slugs.map(slug => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const writeup = await getWriteup(params.slug)
  if (!writeup) return {}

  const { title, description, date, category, tags } = writeup.frontmatter

  return {
    title: `${title} — RushSec`,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: date,
      tags,
      images: [{ url: `/og/writeups/${params.slug}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/og/writeups/${params.slug}`],
    },
  }
}

export default async function WriteupPage({ params }: { params: { slug: string } }) {
  const writeup = await getWriteup(params.slug)
  if (!writeup) notFound()

  let allWriteups: Awaited<ReturnType<typeof getWriteups>> = []
  try {
    allWriteups = await getWriteups()
  } catch {}

  const currentIndex = allWriteups.findIndex(w => w.slug === params.slug)
  const prev = currentIndex < allWriteups.length - 1 ? allWriteups[currentIndex + 1] : null
  const next = currentIndex > 0 ? allWriteups[currentIndex - 1] : null

  const headings = extractHeadings(writeup.content)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: writeup.frontmatter.title,
    description: writeup.frontmatter.description,
    datePublished: writeup.frontmatter.date,
    author: { '@type': 'Person', name: 'Md. Shihab Shahriar Rashu' },
  }

  const isOffensive = writeup.frontmatter.category === 'Offensive'

  return (
    <Container className="py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <article className="lg:col-span-8">
          <header className="mb-12">
            <div className="flex items-center gap-2 font-mono text-xs text-muted mb-4">
              <Link href="/writeups" className="hover:text-accent transition-colors">
                writeups
              </Link>
              <span>/</span>
              <span className="text-primary truncate">{writeup.slug}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-semibold text-primary mb-4 leading-tight">
              {writeup.frontmatter.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-muted text-sm font-mono mb-6">
              <time dateTime={writeup.frontmatter.date}>{formatDate(writeup.frontmatter.date)}</time>
              <span>•</span>
              <span>{writeup.readingTime}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-8 items-center">
              <Tag variant={isOffensive ? 'exploit' : writeup.frontmatter.category === 'Defensive' ? 'defense' : 'default'}>
                {writeup.frontmatter.category}
              </Tag>
              <span className={`font-mono text-xs rounded-full px-2.5 py-0.5 border uppercase ${getDifficultyColor(writeup.frontmatter.difficulty)}`}>
                {writeup.frontmatter.difficulty}
              </span>
              {writeup.frontmatter.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            
            {/* Scope and Authorization Note with red warning label */}
            <div className="border border-border bg-surface/70 p-4 rounded-lg mb-8 flex items-start gap-3">
              <span className="font-mono text-[10px] text-accent-red border border-accent-red/40 bg-accent-red/10 px-2 py-0.5 rounded font-semibold uppercase tracking-wider flex-shrink-0 mt-0.5">
                WARNING
              </span>
              <p className="text-xs text-muted leading-relaxed font-mono">
                <strong className="text-primary font-semibold">Scope &amp; Authorization:</strong> This writeup covers systems the author owns or has explicit authorization to test. All tools and techniques are published strictly for educational and defensive verification purposes.
              </p>
            </div>
          </header>

          <div className="prose prose-invert max-w-none">
            {/* @ts-ignore */}
            <MDXRemote source={writeup.content} options={mdxOptions} components={components} />
          </div>

          <nav className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-4 font-mono text-sm" aria-label="Adjacent writeup navigation">
            {prev ? (
              <Link href={`/writeups/${prev.slug}`} className="group flex flex-col hover:border-accent/40">
                <span className="text-xs text-muted mb-1">&larr; PREVIOUS</span>
                <span className="text-primary font-sans font-medium group-hover:text-accent transition-colors">{prev.frontmatter.title}</span>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/writeups/${next.slug}`} className="group flex flex-col sm:text-right hover:border-accent/40">
                <span className="text-xs text-muted mb-1">NEXT &rarr;</span>
                <span className="text-primary font-sans font-medium group-hover:text-accent transition-colors">{next.frontmatter.title}</span>
              </Link>
            ) : <div />}
          </nav>
        </article>

        <aside className="hidden lg:block lg:col-span-4">
          <div className="sticky top-24">
            <TOC headings={headings} />
          </div>
        </aside>
      </div>
    </Container>
  )
}
