import { Tool } from './types'
import toolsData from '@/content/tools/tools.json'

export async function fetchGitHubStats(
  repo: string
): Promise<{ stars: number; lastUpdate: string } | null> {
  try {
    // Extract owner/repo from URL
    const match = repo.match(/github\.com\/([^/]+\/[^/]+)/)
    if (!match) return null

    const response = await fetch(`https://api.github.com/repos/${match[1]}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) return null

    const data = await response.json()
    return {
      stars: data.stargazers_count ?? 0,
      lastUpdate: data.updated_at ?? '',
    }
  } catch {
    return null
  }
}

export async function getTools(): Promise<Tool[]> {
  const tools: Tool[] = (toolsData as Tool[]).map(tool => ({ ...tool }))

  // Fetch GitHub stats for each tool at build time
  const enriched = await Promise.all(
    tools.map(async (tool) => {
      const stats = await fetchGitHubStats(tool.repo)
      return {
        ...tool,
        stars: stats?.stars ?? tool.stars ?? 0,
        lastUpdate: stats?.lastUpdate ?? tool.lastUpdate ?? '',
      }
    })
  )

  return enriched
}
