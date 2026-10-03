import { getTools } from '@/lib/github'
import Container from '@/components/Container'
import Section from '@/components/Section'
import ToolCard from '@/components/ToolCard'

export const metadata = {
  title: 'Tools — RushSec',
  description: 'Open-source defensive and security tools.'
}

export default async function ToolsPage() {
  let tools: any[] = []
  try {
    tools = await getTools()
  } catch (e) {}

  return (
    <Container className="py-24">
      <Section number="01" label="tools" className="mb-12">
        <h1 className="text-4xl font-semibold text-primary mb-4">Tools</h1>
        <p className="text-lg text-muted max-w-2xl">
          Open-source scripts and tools for offensive testing and defensive operations.
        </p>
      </Section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {tools.map(tool => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

      <p className="text-sm text-muted border-t border-border pt-8 text-center">
        All tools are open-source and intended for use on systems you own or have permission to test.
      </p>
    </Container>
  )
}
