import Link from 'next/link'
import Image from 'next/image'
import { getWriteups } from '@/lib/mdx'
import { getTools } from '@/lib/github'
import Container from '@/components/Container'
import Section from '@/components/Section'
import WriteupCard from '@/components/WriteupCard'
import ToolCard from '@/components/ToolCard'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata = {
  title: "RushSec — Cybersecurity Labs & Tools",
  description: "CTF writeups, lab notes, offensive and defensive security tools, and security research by Md. Shihab Shahriar Rashu."
}

export default async function Home() {
  const writeups = await getWriteups()
  const latestWriteups = writeups.slice(0, 3)
  const tools = await getTools()
  const featuredTools = tools.slice(0, 3)

  return (
    <Container className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="pt-20 pb-16 sm:pt-28 sm:pb-24 border-b border-border/50">
        <ScrollReveal delay={0}>
          <div className="mb-8 inline-flex items-center">
            <Image
              src="/logo.svg"
              alt="RushSec Logo"
              width={260}
              height={68}
              priority
              className="h-14 w-auto"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mb-5 font-mono text-xs text-muted flex items-center tracking-wider">
            <span className="text-accent">&gt;</span>
            <span className="ml-2">rushsec --status active</span>
            <span className="ml-2 inline-block w-2 h-4 bg-accent animate-blink" aria-hidden="true"></span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-primary leading-tight mb-6 max-w-4xl tracking-tight">
            Independent security research, tools, and technical lab notes.
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-base sm:text-lg text-muted max-w-2xl mb-10 leading-relaxed">
            RushSec publishes CTF writeups, lab notes, offensive and defensive security tools, and vulnerability research. All content covers systems the author owns or has permission to test.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={250}>
          <div className="flex flex-wrap gap-4 font-mono text-sm">
            <Link 
              href="/writeups" 
              className="bg-accent text-[#050a08] hover:bg-accent/90 px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
            >
              <span>Read writeups</span>
              <span>&rarr;</span>
            </Link>
            <Link 
              href="/tools" 
              className="border border-border bg-surface/50 text-primary hover:border-accent hover:text-accent px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View tools
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Latest Writeups */}
      <Section number="01" label="writeups">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {latestWriteups.map(writeup => (
            <WriteupCard key={writeup.slug} writeup={writeup} />
          ))}
        </div>
        <Link 
          href="/writeups" 
          className="text-accent hover:underline font-mono text-sm inline-flex items-center gap-1.5"
        >
          <span>View all writeups</span>
          <span>&rarr;</span>
        </Link>
      </Section>

      {/* Featured Tools */}
      <Section number="02" label="tools">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {featuredTools.map(tool => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
        <Link 
          href="/tools" 
          className="text-accent hover:underline font-mono text-sm inline-flex items-center gap-1.5"
        >
          <span>View all tools</span>
          <span>&rarr;</span>
        </Link>
      </Section>

      {/* About Strip */}
      <Section number="03" label="about">
        <div className="bg-surface border border-border rounded-lg p-8 max-w-3xl">
          <p className="text-base text-primary leading-relaxed mb-4">
            RushSec is an independent cybersecurity initiative founded by Md. Shihab Shahriar Rashu. Focused on hands-on penetration testing, digital forensics, and security software development.
          </p>
          <p className="text-sm text-muted leading-relaxed mb-6 font-mono">
            Every experiment, note, and tool is built to understand root-cause vulnerabilities and harden defense.
          </p>
          <Link 
            href="/about" 
            className="text-accent hover:underline font-mono text-sm inline-flex items-center gap-1.5"
          >
            <span>Read full background &amp; timeline</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </Section>

      {/* Contact Strip */}
      <section className="pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-wider text-muted mb-1">04 / contact</h2>
          <p className="text-base font-semibold text-primary">Get in touch for questions or collaboration</p>
        </div>
        <div className="flex items-center gap-4 font-mono text-sm">
          <Link 
            href="mailto:contact@rushsec.dev" 
            className="text-muted hover:text-accent transition-colors border border-border px-4 py-2 rounded-lg bg-surface/50"
          >
            contact@rushsec.dev
          </Link>
          <a 
            href="https://github.com/rushdv" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-muted hover:text-accent transition-colors border border-border px-4 py-2 rounded-lg bg-surface/50"
          >
            GitHub: rushdv
          </a>
        </div>
      </section>
    </Container>
  )
}
