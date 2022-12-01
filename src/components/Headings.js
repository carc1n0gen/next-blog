
function getAnchor(text) {
  if (Array.isArray(text)) {
    return text.join(' ').toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/[ ]/g, '-');
  }

  return text.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/[ ]/g, '-');
}


export function h1({ children }) {
  const anchor = getAnchor(children);

  return (
    <h1 id={anchor}>
      {children}
      <a href={`#${anchor}`} className="heading-anchor">
        <i className="fas fa-link" aria-hidden="true"></i>
        <span className="sr-only">link to this heading</span>
      </a>
    </h1>
  )
}


export function h2({ children }) {
  const anchor = getAnchor(children);

  return (
    <h2 id={anchor}>
      {children}
      <a href={`#${anchor}`} className="heading-anchor">
        <i className="fas fa-link" aria-hidden="true"></i>
        <span className="sr-only">link to this heading</span>
      </a>
    </h2>
  )
}


export function h3({ children }) {
  const anchor = getAnchor(children);

  return (
    <h3 id={anchor}>
      {children}
      <a href={`#${anchor}`} className="heading-anchor">
        <i className="fas fa-link" aria-hidden="true"></i>
        <span className="sr-only">link to this heading</span>
      </a>
    </h3>
  )
}


export function h4({ children }) {
  const anchor = getAnchor(children);

  return (
    <h4 id={anchor}>
      {children}
      <a href={`#${anchor}`} className="heading-anchor">
        <i className="fas fa-link" aria-hidden="true"></i>
        <span className="sr-only">link to this heading</span>
      </a>
    </h4>
  )
}


export function h5({ children }) {
  const anchor = getAnchor(children);

  return (
    <h5 id={anchor}>
      {children}
      <a href={`#${anchor}`} className="heading-anchor">
        <i className="fas fa-link" aria-hidden="true"></i>
        <span className="sr-only">link to this heading</span>
      </a>
    </h5>
  )
}


export function h6({ children }) {
  const anchor = getAnchor(children);

  return (
    <h6 id={anchor}>
      {children}
      <a href={`#${anchor}`} className="heading-anchor">
        <i className="fas fa-link" aria-hidden="true"></i>
        <span className="sr-only">link to this heading</span>
      </a>
    </h6>
  )
}
