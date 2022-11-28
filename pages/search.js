import { useRouter } from "next/router"
import Link from 'next/link'
import { useMemo } from "react"
import { MDXRemote } from 'next-mdx-remote'


export default function Search({posts=[]}) {
  const router= useRouter()
  const searchWords = router.query.q || ''
  const filteredPosts = useMemo(() => {
    return posts.filter(
      post => searchWords !== '' && post.title.toLowerCase().includes(searchWords.toLowerCase())
    )
  }, [posts, searchWords])

  if (filteredPosts.length === 0) {
    return (
      <div className="card">
        <p>There is nothing here.</p>
      </div>
    )
  }

  return filteredPosts.map(post => (
    <article className="post" key={post.url}>
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
  const { getAllPosts } = await require('lib/posts')
  const posts = await getAllPosts()

  return {
    props: {
      posts: posts
    }
  }
}
