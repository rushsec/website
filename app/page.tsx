import Link from 'next/link'
import { getWriteups } from '@/lib/mdx'
import { getTools } from '@/lib/github'
import Container from '@/components/Container'
import Section from '@/components/Section'
import WriteupCard from '@/components/WriteupCard'
import ToolCard from '@/components/ToolCard'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata = {
  title: "RushSec — Cybersecurity Labs & Tools"
}

export default async function Home() {
  const writeups = await getWriteups()
  const latestWriteups = writeups.slice(0, 3)
  const tools = await getTools()
  const featuredTools = tools.slice(0, 3)

  return (
    <Container className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <ScrollReveal delay={0}>
          <div className="mb-6 font-mono text-muted flex items-center">
            <span>{'>'} rushsec</span>
            <span className="ml-2 inline-block w-2 h-5 bg-accent animate-blink"></span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-primary leading-tight mb-6">
            Security research,<br />
            one writeup at a time.
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p className="text-lg text-muted max-w-2xl mb-10">
            CTF writeups, lab notes, defensive tools, and security research. All content covers systems I own or have permission to test.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <div className="flex flex-wrap gap-4">
            <Link href="/writeups" className="bg-accent text-white hover:bg-accent/90 px-6 py-3 rounded-lg font-medium transition-colors">
              Read writeups
            </Link>
            <Link href="/tools" className="border border-border text-primary hover:border-accent/50 px-6 py-3 rounded-lg font-medium transition-colors">
              View tools
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Latest Writeups */}
      <Section number="01" label="latest writeups">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {latestWriteups.map(writeup => (
            <WriteupCard key={writeup.slug} writeup={writeup} />
          ))}
        </div>
        <Link href="/writeups" className="text-accent hover:underline font-medium">
          View all writeups &rarr;
        </Link>
      </Section>

      {/* Featured Tools */}
      <Section number="02" label="tools">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {featuredTools.map(tool => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
        <Link href="/tools" className="text-accent hover:underline font-medium">
          View all tools &rarr;
        </Link>
      </Section>

      {/* About Strip */}
      <Section number="03" label="about">
        <p className="text-lg text-muted max-w-3xl mb-6">
          I'm Rashu, a cybersecurity student and researcher. I break things to learn how to defend them.
        </p>
        <Link href="/about" className="text-accent hover:underline font-medium">
          More about me &rarr;
        </Link>
      </Section>

      {/* Contact Strip */}
      <section className="pt-12 border-t border-border">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Get in touch</h2>
        <div className="flex gap-6">
          <Link href="mailto:rashu@rushsec.dev" className="text-muted hover:text-primary transition-colors">Email</Link>
          <Link href="https://github.com/rushdv" className="text-muted hover:text-primary transition-colors">GitHub</Link>
        </div>
      </section>
    </Container>
  )
}
