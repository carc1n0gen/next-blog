import Link from 'next/link'
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
        <p>There is nothing here.</p>
      </div>
    )
  }

  return Object.keys(organizedPosts).map((year) => (
    <section className="card" key={year}>
      <h2 className="archive-year" id={`${year}-anchor`}>
        {year}
        <Link href={`#${year}-anchor`} className="heading-anchor">
          <i className="fas fa-link" aria-hidden="true"></i>
          <span className="sr-only">link to this heading</span>
        </Link>
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
