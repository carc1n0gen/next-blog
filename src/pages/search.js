import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { useMemo } from 'react'
import { MDXRemote } from 'next-mdx-remote'


export default function Search({ posts = [] }) {
  const router = useRouter()
  const searchWords = router.query.q || ''
  const filteredPosts = useMemo(() => {
    return posts.filter(
      post => searchWords !== '' && post.title.toLowerCase().includes(searchWords.toLowerCase())
    )
  }, [posts, searchWords])

  if (filteredPosts.length === 0) {
    return (
      <div className="card">
        <Head>
          <title>Search | Carson&apos;s Blog</title>
        </Head>
        <p>There is nothing here.</p>
      </div>
    )
  }

  return filteredPosts.map(post => (
    <article className="post" key={post.url}>
      <Head>
        <title>Search | Carson&apos;s Blog</title>
      </Head>
      <header className="post-title">
        <Link href={post.url}><h1>{post.title}</h1></Link>
      </header>
      <section>
        <MDXRemote {...post.excerptMdx} />
        <Link href={post.url}>Read more...</Link>
        <p></p>
      </section>
      <footer>
        <span className="post-meta">
          posted by {post.author}
          <span className="post-meta-sep"></span>
          {post.date}
        </span>
      </footer>
    </article>
  ))
}


export async function getStaticProps() {
  const { getAllPosts } = await import('lib/posts')
  const posts = await getAllPosts()

  return {
    props: {
      posts: posts
    }
  }
}
