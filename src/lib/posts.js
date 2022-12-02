import fs from 'fs/promises'
import { join } from 'path'
import matter from 'gray-matter'
import remarkGfm from 'remark-gfm'
import { serialize } from 'next-mdx-remote/serialize'


const POSTS_DIR = join(process.cwd(), 'posts')


export async function getPost(year, month, day, slug) {
  const rawSource = await fs.readFile(join(POSTS_DIR, `${year}-${month}-${day}-${slug}.mdx`), 'utf8')
  const { data, excerpt, content } = matter(rawSource, { excerpt_separator: '{/* excerpt */}' })
  const title = slug.replaceAll('-', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const date = new Date(Date.parse(`${year}-${month}-${day}`))
  const url = `/${year}/${month}/${day}/${slug}`

  return {
    year,
    month,
    day,
    slug,
    date: date.toDateString(),
    url,
    title,
    excerptMdx: await serialize(excerpt),
    contentMdx: await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm]
      }
    }),
    ...data
  }
}


export async function getAllPosts() {
  const files = await fs
    .readdir(POSTS_DIR)

  const posts = await Promise.all(files.map(async (filename) => {
    const year = filename.substring(0, 4)
    const month = filename.substring(5, 7)
    const day = filename.substring(8, 10)
    const [slug] = filename.substring(11).split('.')
    return getPost(year, month, day, slug)
  }))

  return posts.reverse()
}


export async function getRecentPosts() {
  const allPosts = await getAllPosts()
  return allPosts.slice(0, 5)
}


export async function getAllPostPaths() {
  const files = await fs
    .readdir(POSTS_DIR)

  return files.map((filename) => ({
    params: {
      year: filename.substring(0, 4),
      month: filename.substring(5, 7),
      day: filename.substring(8, 10),
      slug: filename.substring(11).split('.')[0]
    }
  }))
}
