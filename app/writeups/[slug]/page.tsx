import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { getWriteup, getWriteupSlugs, getWriteups, extractHeadings } from '@/lib/mdx'
import { formatDate } from '@/lib/utils'
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
  } catch (e) {
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

  let allWriteups: any[] = []
  try {
    allWriteups = await getWriteups()
  } catch (e) {}

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

  return (
    <Container className="py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <article className="lg:col-span-8">
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-semibold text-primary mb-4">{writeup.frontmatter.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-muted mb-6">
              <time dateTime={writeup.frontmatter.date}>{formatDate(writeup.frontmatter.date)}</time>
              <span>&bull;</span>
              <span>{writeup.readingTime}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              <Tag variant="accent">{writeup.frontmatter.category}</Tag>
              <Tag>{writeup.frontmatter.difficulty}</Tag>
              {writeup.frontmatter.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            
            <div className="border border-border bg-surface p-4 rounded-lg mb-8">
              <p className="text-sm text-muted">
                <strong>Scope Note:</strong> This writeup covers systems I own or have permission to test. Do not attempt these techniques on targets without explicit authorization.
              </p>
            </div>
          </header>

          <div className="prose prose-invert prose-pre:bg-transparent prose-pre:p-0 max-w-none">
            {/* @ts-ignore */}
            <MDXRemote source={writeup.content} options={mdxOptions} components={components} />
          </div>

          <nav className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-4">
            {prev ? (
              <Link href={`/writeups/${prev.slug}`} className="group flex flex-col">
                <span className="text-sm text-muted mb-1">&larr; Previous</span>
                <span className="text-primary font-medium group-hover:text-accent transition-colors">{prev.frontmatter.title}</span>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/writeups/${next.slug}`} className="group flex flex-col sm:text-right">
                <span className="text-sm text-muted mb-1">Next &rarr;</span>
                <span className="text-primary font-medium group-hover:text-accent transition-colors">{next.frontmatter.title}</span>
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
