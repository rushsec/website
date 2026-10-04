# RushSec Website

Personal cybersecurity website publishing CTF writeups, lab notes, defensive tools, and security research.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and MDX.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a Writeup

1. Create a new `.mdx` file in `content/writeups/`:

```mdx
---
title: "Your Writeup Title"
date: "2026-01-15"
description: "A one-sentence summary of the writeup."
category: "CTF"        # CTF | Web | Network | Forensics | Offensive | Defensive
difficulty: "Medium"   # Easy | Medium | Hard | Insane
tags: ["tag1", "tag2"]
published: true
---

> **Scope & Authorization**: This writeup covers [platform/context]. All testing was performed on systems I own or have explicit authorization to test.

## Reconnaissance

Your content here...

## Exploitation

More content...
```

2. The file name becomes the URL slug: `my-writeup.mdx` → `/writeups/my-writeup`
3. Set `published: false` to hide a draft.

## Adding a Tool

Edit `content/tools/tools.json` and add an entry:

```json
{
  "name": "tool-name",
  "slug": "tool-name",
  "description": "One-line purpose of the tool.",
  "language": "Python",
  "status": "stable",
  "repo": "https://github.com/rushsec/tool-name",
  "stars": 0,
  "lastUpdate": "2026-01-01"
}
```

Status options: `stable`, `in-progress`, `archived`.

GitHub stars and last update are fetched automatically at build time if the repo is public.

## Project Structure

```
app/              → Pages and routes (Next.js App Router)
components/       → Reusable UI components
content/
  writeups/       → MDX writeup files
  tools/          → Tool data (JSON)
lib/              → Utilities, types, MDX processing
public/           → Static assets (logo, icon)
```

## Deploy

Deploy to Vercel:

```bash
npm run build
```

Or connect your GitHub repo to [Vercel](https://vercel.com) for automatic deployments.

Optionally set `GITHUB_TOKEN` environment variable for higher GitHub API rate limits.

## Legal

All content is for education and covers systems the author owns or is authorized to test.

MIT License — see [LICENSE](./LICENSE).