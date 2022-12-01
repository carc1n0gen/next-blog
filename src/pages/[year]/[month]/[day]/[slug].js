import { MDXRemote } from 'next-mdx-remote'
import Head from 'next/head'
import CodeSnippet from 'components/CodeSnippet'
import Heading from 'components/Heading'


const components = {
  pre: CodeSnippet,
  h1: props => <Heading as="h1" {...props} />,
  h2: props => <Heading as="h2" {...props} />,
  h3: props => <Heading as="h3" {...props} />,
  h4: props => <Heading as="h4" {...props} />,
  h5: props => <Heading as="h5" {...props} />,
  h6: props => <Heading as="h6" {...props} />
}


export default function Home({ post }) {
  return (
    <article className="post">
      <Head>
        <title>{post.title} | Carson's Blog</title>
      </Head>
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
