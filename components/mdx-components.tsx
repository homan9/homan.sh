import { type ReactNode } from "react";
import { GeistMono } from "geist/font/mono";
import type { MDXComponents } from "mdx/types";

function slugify(children: ReactNode): string {
  const text = extractText(children);
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node)
    return extractText(
      (node as { props: { children?: ReactNode } }).props.children,
    );
  return "";
}

const marginBottom = "1.2rem";
const fontSize = "16px";
const fontWeight = 450;
const letterSpacing = "-0.025em";
const lineHeight = "1.3rem";

export function getMDXComponents(overrides: MDXComponents = {}): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1
        id={slugify(children)}
        className="mdx-h1"
        style={{
          scrollMarginTop: "3rem",
          fontWeight: 580,
          maxWidth: 900,
          width: "90vw",
          marginLeft: "50%",
          transform: "translateX(-50%)",
          letterSpacing: "-0.065em",
          color: "#111",
          marginBottom: "7rem",
          lineHeight: 1.1,
          textAlign: "center",
        }}
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        id={slugify(children)}
        style={{
          scrollMarginTop: "3rem",
          fontSize: 18,
          fontWeight: 540,
          letterSpacing: "-0.04em",
          color: "rgba(17, 17, 17)",
          marginTop: "3rem",
          marginBottom,
          lineHeight: 1.2,
        }}
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        id={slugify(children)}
        style={{
          scrollMarginTop: "3rem",
          fontSize: "1rem",
          fontWeight: 580,
          letterSpacing: "-0.03em",
          color: "#111",
          marginTop: "1.5rem",
          marginBottom: "0.5rem",
          lineHeight: 1.4,
        }}
        {...props}
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p
        style={{
          fontSize,
          fontWeight,
          letterSpacing,
          lineHeight,
          color: "#111",
          marginBottom,
        }}
        {...props}
      >
        {children}
      </p>
    ),
    a: ({ href, children, ...props }) => {
      return (
        <a
          href={href ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="link-readmore"
          {...props}
        >
          {children}
        </a>
      );
    },
    ul: ({ children, ...props }) => (
      <ul
        style={{
          listStyleType: "disc",
          paddingLeft: "1.5rem",
          marginBottom: "1rem",
        }}
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol
        style={{
          listStyleType: "decimal",
          paddingLeft: "1.5rem",
          marginBottom: "1rem",
        }}
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li
        style={{
          fontSize,
          fontWeight,
          letterSpacing,
          lineHeight,
          color: "#111",
          marginBottom: "0.25rem",
        }}
        {...props}
      >
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        style={{
          borderLeft: "2px solid rgba(17, 17, 17, 0.15)",
          paddingLeft: "1rem",
          margin: "1rem 0",
          color: "rgba(17, 17, 17, 0.7)",
          fontStyle: "italic",
        }}
        {...props}
      >
        {children}
      </blockquote>
    ),
    hr: (props) => (
      <hr
        style={{
          border: "none",
          borderTop: "1px solid rgba(17, 17, 17, 0.1)",
          margin: "2rem 0",
        }}
        {...props}
      />
    ),
    code: ({ children, ...props }) => (
      <code
        style={{
          background: "rgba(17, 17, 17, 0.05)",
          borderRadius: 4,
          padding: "0.15rem 0.4rem",
          fontSize: "0.95em",
          fontFamily: `${GeistMono.style.fontFamily}, monospace`,
          letterSpacing: 0,
        }}
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre
        style={{
          background: "rgba(17, 17, 17, 0.04)",
          borderRadius: 6,
          padding: "1rem",
          overflowX: "auto",
          marginBottom: "1rem",
          fontSize: "0.9rem",
        }}
        {...props}
      >
        {children}
      </pre>
    ),
    strong: ({ children, ...props }) => (
      <strong style={{ fontWeight: 500 }} {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => <em {...props}>{children}</em>,
    ...overrides,
  };
}
