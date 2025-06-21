import fs from 'fs'
import path from 'path'

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
}

function parseFrontmatter(fileContent: string) {
  // 'frontmatterRegex' is never reassigned. Use 'const' instead.
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  // 'match' is never reassigned. Use 'const' instead.
  const match = frontmatterRegex.exec(fileContent)
  // 'frontMatterBlock' is never reassigned. Use 'const' instead.
  const frontMatterBlock = match![1]
  // 'content' is never reassigned. Use 'const' instead.
  const content = fileContent.replace(frontmatterRegex, '').trim()
  // 'frontMatterLines' is never reassigned. Use 'const' instead.
  const frontMatterLines = frontMatterBlock.trim().split('\n')
  // 'metadata' is never reassigned. Use 'const' instead.
  const metadata: Partial<Metadata> = {}

  frontMatterLines.forEach((line) => {
    // 'key' and 'valueArr' are never reassigned. Use 'const' instead.
    const [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim() // 'value' is reassigned below, so 'let' is correct here.
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    metadata[key.trim() as keyof Metadata] = value
  })

  return { metadata: metadata as Metadata, content }
}

function getMDXFiles(dir: string) { // Added type annotation for 'dir'
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: string) { // Added type annotation for 'filePath'
  // 'rawContent' is never reassigned. Use 'const' instead.
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir: string) { // Added type annotation for 'dir'
  // 'mdxFiles' is never reassigned. Use 'const' instead.
  const mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    // 'metadata' and 'content' are never reassigned. Use 'const' instead.
    const { metadata, content } = readMDXFile(path.join(dir, file))
    // 'slug' is never reassigned. Use 'const' instead.
    const slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'app', 'blog', 'posts'))
}

export function formatDate(date: string, includeRelative = false) {
  // 'currentDate' is never reassigned. Use 'const' instead.
  const currentDate = new Date()
  // 'date' is reassigned, so 'let' is appropriate here.
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  // 'targetDate' is never reassigned. Use 'const' instead.
  const targetDate = new Date(date)

  // All these variables are never reassigned. Use 'const' instead.
  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  const daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = '' // 'formattedDate' is reassigned, so 'let' is correct here.

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  // 'fullDate' is never reassigned. Use 'const' instead.
  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}