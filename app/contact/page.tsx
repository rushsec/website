import Link from 'next/link'
import Container from '@/components/Container'
import Section from '@/components/Section'
import Card from '@/components/Card'

export const metadata = {
  title: 'Contact — RushSec',
  description: 'Get in touch with RushSec.'
}

export default function ContactPage() {
  return (
    <Container className="py-24">
      <Section number="01" label="contact">
        <h1 className="text-3xl font-semibold text-primary mb-6">Get in touch</h1>
        <p className="text-lg text-muted max-w-2xl mb-10">
          Have a question about a writeup, want to collaborate on a tool, or found an issue? Reach out through any of the channels below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <Card className="p-6 flex items-center hover:border-accent/50 transition-colors">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-primary mb-1">Email</h3>
              <Link href="mailto:rashu@rushsec.dev" className="text-muted hover:text-accent transition-colors block truncate">
                rashu@rushsec.dev (placeholder)
              </Link>
            </div>
          </Card>

          <Card className="p-6 flex items-center hover:border-accent/50 transition-colors">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-primary mb-1">GitHub</h3>
              <Link href="https://github.com/rushdv" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors block truncate">
                github.com/rushdv
              </Link>
            </div>
          </Card>

          <Card className="p-6 flex items-center hover:border-accent/50 transition-colors">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-primary mb-1">Organization</h3>
              <Link href="https://github.com/rushsec" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors block truncate">
                github.com/rushsec
              </Link>
            </div>
          </Card>

          <Card className="p-6 flex items-center hover:border-accent/50 transition-colors">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-primary mb-1">LinkedIn</h3>
              <Link href="#" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors block truncate">
                placeholder link
              </Link>
            </div>
          </Card>
        </div>

        <p className="text-sm text-muted">
          No PGP key is currently published. Check back later.
        </p>
      </Section>
    </Container>
  )
}
