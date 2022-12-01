import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote'


export default function Home({recentPosts = []}) {
  return (
    <>
      {recentPosts.map((post) => (
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
      ))}
      <div className="all-link card text-center">
        <Link href="/archive">All posts...</Link>
      </div>
    </>
  )
}


export async function getStaticProps() {
  const { getRecentPosts } = await import('lib/posts')
  const recentPosts = await getRecentPosts();

  return {
    props: {
      recentPosts
    }
  }
}
