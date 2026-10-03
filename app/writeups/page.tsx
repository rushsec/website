import { getWriteups } from '@/lib/mdx'
import Container from '@/components/Container'
import Section from '@/components/Section'
import WriteupsList from '@/components/WriteupsList'

export const metadata = {
  title: 'Writeups — RushSec',
  description: 'CTF writeups, lab notes, and security research.'
}

export default async function WriteupsPage() {
  let writeups: any[] = []
  try {
    writeups = await getWriteups()
  } catch (e) {}

  return (
    <Container className="py-24">
      <Section number="01" label="writeups" className="mb-12">
        <h1 className="text-4xl font-semibold text-primary mb-4">Writeups</h1>
        <p className="text-lg text-muted max-w-2xl">
          CTF writeups, lab notes, and security research. Filter by category, difficulty, or search by tags.
        </p>
      </Section>
      <WriteupsList writeups={writeups} />
    </Container>
  )
}
