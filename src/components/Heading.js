function getAnchor(text) {
  if (Array.isArray(text)) {
    return text.join(' ').toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/[ ]/g, '-')
  }

  return text.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/[ ]/g, '-')
}


export default function Heading({ as: Component, children }) {
  const anchor = getAnchor(children)

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
