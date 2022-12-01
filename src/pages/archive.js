import Link from 'next/link'
import Head from 'next/head'
import { useMemo } from 'react'


export default function Archive({ posts }) {
  const organizedPosts = useMemo(() => {
    const years = {}
    posts.forEach((post) => {
      if (!years[post.year]) {
        years[post.year] = []
      }

      years[post.year].push(post)
    })

    return years
  }, [posts])

  if (Object.keys(organizedPosts).length === 0) {
    return (
      <div className="card">
        <Head>
          <title>Archive | Carson's Blog</title>
        </Head>
        <p>There is nothing here.</p>
      </div>
    )
  }

  return Object.keys(organizedPosts).reverse().map((year) => (
    <section className="card" key={year}>
      <Head>
        <title>Archive | Carson's Blog</title>
      </Head>
      <h2 className="archive-year" id={`${year}-anchor`}>
        {year}
        <a href={`#${year}-anchor`} className="heading-anchor">
          <i className="fas fa-link" aria-hidden="true"></i>
          <span className="sr-only">link to this heading</span>
        </a>
      </h2>
      <ul>
        {organizedPosts[year].map((post) => (
          <li key={post.url}><Link className="archive-link" href={post.url}>{post.title}</Link></li>
        ))}
      </ul>
    </section>
  ))
}


export async function getStaticProps() {
  const { getAllPosts } = await import('lib/posts')
  const posts = await getAllPosts()

  return {
    props: {
      posts
    }
  }
}
