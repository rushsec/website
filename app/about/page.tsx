import Container from '@/components/Container'
import Section from '@/components/Section'
import Card from '@/components/Card'

export const metadata = {
  title: 'About — RushSec',
  description: 'About Md. Shihab Shahriar Rashu and the RushSec project.'
}

export default function AboutPage() {
  return (
    <Container className="py-24 space-y-24">
      <Section number="01" label="about">
        <h1 className="text-3xl font-semibold text-primary mb-6">Who I am</h1>
        <div className="space-y-4 text-muted text-lg max-w-3xl">
          <p>
            I'm Md. Shihab Shahriar Rashu, a cybersecurity student and independent security researcher based in Bangladesh. I go by rushdv on GitHub and rushsec across platforms.
          </p>
          <p>
            I focus on penetration testing, network security, digital forensics, and building defensive tools. Everything I publish covers systems I own or have explicit authorization to test.
          </p>
        </div>
      </Section>

      <Section number="02" label="focus areas">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-medium text-primary mb-3">Penetration Testing</h3>
            <p className="text-muted">CTF competitions, HackTheBox, and authorized testing.</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-medium text-primary mb-3">Defensive Security</h3>
            <p className="text-muted">Log analysis, intrusion detection, and incident response.</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-medium text-primary mb-3">Digital Forensics</h3>
            <p className="text-muted">Network traffic analysis, disk forensics, and malware triage.</p>
          </Card>
        </div>
      </Section>

      <Section number="03" label="timeline">
        <div className="border-l-2 border-border pl-6 space-y-8 relative">
          <div className="relative">
            <div className="absolute -left-[29px] top-1.5 w-3 h-3 bg-accent rounded-full"></div>
            <div className="font-mono text-muted text-sm mb-1">2026</div>
            <p className="text-primary">Started publishing CTF writeups and security tools on GitHub.</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[29px] top-1.5 w-3 h-3 bg-border rounded-full"></div>
            <div className="font-mono text-muted text-sm mb-1">2025</div>
            <p className="text-primary">Began focused study of penetration testing and defensive security.</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[29px] top-1.5 w-3 h-3 bg-border rounded-full"></div>
            <div className="font-mono text-muted text-sm mb-1">2024</div>
            <p className="text-primary">First CTF competitions. Started learning networking and Linux security.</p>
          </div>
        </div>
        <p className="text-sm text-muted mt-8">
          Timeline dates are approximate. See PLACEHOLDERS.md for details.
        </p>
      </Section>
    </Container>
  )
}
