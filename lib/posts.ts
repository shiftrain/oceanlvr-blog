
import fs from 'fs'
import { join } from 'path'
import getAllFilesRecursively from './files'
import { formatSlug } from './mdx'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'


const root: string = process.cwd()
const dataDirectory = join(root, 'data')

export async function getSourceBySlug(type: string, slug: string) {
  const mdxPath = join(dataDirectory, type, `${slug}.mdx`)
  const mdPath = join(dataDirectory, type, `${slug}.md`)
  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, 'utf8')
    : fs.readFileSync(mdPath, 'utf8')
  const { data, content } = matter(source)

  const mdxSource = await serialize(content, {
    scope: data
  })

  return {
    mdxSource,
    frontMatter: data,
  }
}

export function getSources(type: string): string[] {
  const prefixPaths = join(dataDirectory, type)
  const files = getAllFilesRecursively(prefixPaths)
  return files.map((file: string) => file.slice(prefixPaths.length + 1))
}

const dateSortDesc = (a: string, b: string) => (a > b ? -1 : 1)

export async function getAllFilesFrontMatter(folder: string) {
  const prefixPaths = join(dataDirectory, folder)

  const files = getAllFilesRecursively(prefixPaths)

  const allFrontMatter: { [key: string]: any, id: string }[] = []

  files.forEach((file: string) => {
    // Replace is needed to work on Windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/')
    const source = fs.readFileSync(file, 'utf8')
    const { data } = matter(source)
    if (data.draft !== true) {
      allFrontMatter.push({ ...data, id: formatSlug(fileName) })
    }
  })

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
}