import { useMemo } from 'react'


export default function Heading({ as: Component, children }) {
  const anchor = useMemo(() => {
    if (Array.isArray(children)) {
      return children.join(' ').toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/[ ]/g, '-')
    }
    return children.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/[ ]/g, '-')
  }, [children])

  return (
    <Component id={anchor}>
      {children}
      <a href={`#${anchor}`} className="heading-anchor">
        <i className="fas fa-link" aria-hidden="true"></i>
        <span className="sr-only">link to this heading</span>
      </a>
    </Component>
  )
}
