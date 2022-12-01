import { MDXRemote } from 'next-mdx-remote'
import CodeSnippet from 'components/CodeSnippet'


const components = {
  pre: CodeSnippet
}


export default function Home({ post }) {
  return (
    <article className="post">
      <header className="post-title">
        <h1>{post.title}</h1>
        <span className="post-meta">
          posted by {post.author}
          <span className="post-meta-sep"></span>
          {post.date}
        </span>
      </header>
      <section>
        <MDXRemote {...post.contentMdx} components={components} />
      </section>
      {/* <footer>
        
      </footer> */}
    </article>
  )
}


export async function getStaticProps({ params: { year, month, day, slug } }) {
  const { getPost } = await import('lib/posts')
  const post = await getPost(year, month, day, slug)

  return {
    props: {
      post,
    }
  }
}


export async function getStaticPaths() {
  const { getAllPostPaths } = await import('lib/posts')
  return {
    paths: await getAllPostPaths(),
    fallback: false,
  }
}
