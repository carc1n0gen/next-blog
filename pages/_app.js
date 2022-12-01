import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import 'styles/globals.css'


function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [currentRoute, setCurrentRoute] = useState(router.pathname)
  const [searchValue, setSearchValue] = useState(router.query.q || '')
  const [isSearchInvalid, setIsSearchInvalid] = useState(false)
  const isBlogPage = useMemo(() => {
    return router.pathname !== '/archive' && router.pathname !== '/contact'
  }, [router.pathname])

  const onSubmit = useCallback((event) => {
    event.preventDefault()

    if (searchValue.length < 3) {
      setIsSearchInvalid(true)
      return
    }

    setIsSearchInvalid(false)
    router.push(`/search?q=${searchValue}`)
  }, [router, searchValue])

  useEffect(() => {
    if (currentRoute !== router.pathname) {
      setCurrentRoute(router.pathname)
      setSearchValue(router.query.q || '')
      setIsSearchInvalid(false)
    }
  }, [currentRoute, router.pathname, router.query.q])

  return (
    <>
      <header className="site-header">
        <div className="container">
          <Link href="/"><h1 className="site-title">Carson&apos;s Blog</h1></Link>
          <p>Somewhat coherent tutorials about web stuff and things.</p>
        </div>
        <nav className="site-nav">
          <div className="container nav-wrapper">
            <Link href="/" className={isBlogPage ? 'active' : null}>Blog</Link>
            <Link href="/archive" className={router.pathname === '/archive' ? 'active' : null}>Archive</Link>
            <Link href="/contact" className={router.pathname === '/contact' ? 'active' : null}>Contact</Link>
            <form className="site-search" action="/search" onSubmit={onSubmit}>
              <input type="text" id="q" name="q" className={`site-search-input ${isSearchInvalid ? 'invalid' : ''}`} placeholder="Search for posts" aria-label="Search" value={searchValue} onChange={({ target }) => setSearchValue(target.value)} />
              <span className="search-feedback">Search query must be at least three characters.</span>
              <button type="submit" className="site-search-submit"><i className="fas fa-search"></i><span className="site-search-submit-text"> Search</span></button>
            </form>
          </div>
        </nav>
      </header>
      <main className="container site-content">
        <Component {...pageProps} />
      </main>
      <footer className="site-footer">
        &copy; Carson
        <Link href="https://twitter.com/carc1n0gen" className="footer-social-link"><i className="fab fa-twitter" aria-hidden="true"></i><span className="sr-only">twitter</span></Link>
        <Link href="https://github.com/carc1n0gen" className="footer-social-link"><i className="fab fa-github" aria-hidden="true"></i><span className="sr-only">github</span></Link>
        <Link href="https://blog.carsonevans.ca/feed.xml" className="footer-social-link"><i className="fa fa-rss" aria-hidden="true"></i><span className="sr-only">feed</span></Link>
      </footer>
      <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    </>
  )
}


export default MyApp
