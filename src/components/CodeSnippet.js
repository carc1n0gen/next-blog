import Highlight, { defaultProps } from "prism-react-renderer";


export default function CodeSnippet({ children }) {
  const className = children.props.className || "";
  const code = children.props.children.trim();
  const language = className.replace(/language-/, "");

  return (
    <Highlight {...defaultProps} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
