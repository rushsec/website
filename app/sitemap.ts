import { MetadataRoute } from 'next'
import { getWriteupSlugs } from '@/lib/mdx'

const BASE_URL = 'https://rushsec.dev'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let slugs: string[] = []
  try {
    slugs = await getWriteupSlugs()
  } catch (e) {}
  
  const writeupEntries = slugs.map(slug => ({
    url: `${BASE_URL}/writeups/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/writeups`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/tools`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    ...writeupEntries,
  ]
}
