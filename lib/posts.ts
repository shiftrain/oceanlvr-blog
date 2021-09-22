
import fs from 'fs'
import { join } from 'path'

const postsDirectory = join(process.cwd(), '_posts')

export function getLocalPostSourceBySlug(slug: string): string | null {
  const fullPath = join(postsDirectory, `${slug}.md`)
  return fs.existsSync(fullPath) ? fs.readFileSync(fullPath, 'utf8') : null
}

export function getLocalPostSources(): string[] {
  return fs.existsSync(postsDirectory) ? fs.readdirSync(postsDirectory, 'utf8').map(slug => slug.replace(/\.md/, '')) : []
}