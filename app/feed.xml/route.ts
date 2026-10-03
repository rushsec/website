import { getWriteups } from '@/lib/mdx'

const BASE_URL = 'https://rushsec.dev'

export async function GET() {
  let writeups: any[] = []
  try {
    writeups = await getWriteups()
  } catch (e) {}
  
  const items = writeups.map(writeup => `
    <item>
      <title>${escapeXml(writeup.frontmatter.title)}</title>
      <link>${BASE_URL}/writeups/${writeup.slug}</link>
      <description>${escapeXml(writeup.frontmatter.description)}</description>
      <pubDate>${new Date(writeup.frontmatter.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${BASE_URL}/writeups/${writeup.slug}</guid>
      <category>${writeup.frontmatter.category}</category>
    </item>
  `).join('')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>RushSec</title>
    <link>${BASE_URL}</link>
    <description>CTF writeups, lab notes, defensive tools, and security research.</description>
    <language>en-us</language>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
