import React, { type ReactNode } from "react";
import { GeistMono } from "geist/font/mono";
import Mermaid from "@/components/mermaid";
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

const marginBottom = "1.1rem";
const fontSize = "0.9rem";
const fontWeight = 460;
const letterSpacing = "-0.01em";
const lineHeight = "1.21rem";
const color = "rgba(17, 17, 17, 0.93)";

export function getMDXComponents(overrides: MDXComponents = {}): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1
        id={slugify(children)}
        className="mdx-h1"
        style={{
          scrollMarginTop: "3rem",
          fontSize,
          fontWeight: 580,
          letterSpacing: "-0.02em",
          color: "rgba(17, 17, 17, 1.0)",
          marginBottom: "1.1rem",
          lineHeight: 1.2,
          textAlign: "left",
        }}
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <div
        className="mdx-h2-wrapper"
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 12,
          marginTop: "4rem",
          marginBottom,
        }}
      >
        <h2
          id={slugify(children)}
          style={{
            scrollMarginTop: "3rem",
            fontSize,
            fontWeight: 540,
            letterSpacing: "-0.03em",
            color: "#111",
            lineHeight: 1.3,
            flexShrink: 0,
          }}
          {...props}
        >
          {children}
        </h2>
        <span
          style={{
            flex: 1,
            borderBottomWidth: "var(--dashed-border-width)",
            borderBottomStyle: "dashed",
            borderBottomColor: "var(--dashed-border-color)",
            alignSelf: "center",
            minWidth: 12,
          }}
        />
      </div>
    ),
    h3: ({ children, ...props }) => (
      <h3
        id={slugify(children)}
        style={{
          scrollMarginTop: "3rem",
          fontSize,
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
          color,
          marginBottom,
        }}
        {...props}
      >
        {children}
      </p>
    ),
    a: ({ href, children, ...props }) => {
      const isHash = href?.startsWith("#");
      const isInternal = href?.startsWith("/");
      const isExternal = !isHash && !isInternal;
      return (
        <a
          href={href ?? "#"}
          {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
          className={isHash ? undefined : "link-readmore"}
          {...props}
        >
          {children}
        </a>
      );
    },
    sup: ({ children, ...props }) => <sup {...props}>{children}</sup>,
    section: ({ children, className, ...props }) => {
      if (className?.includes("footnotes")) {
        return (
          <section
            className={className}
            style={{
              fontSize: 14,
              fontWeight: 480,
              letterSpacing: "-0.03em",
              lineHeight: "20px",
              color: "rgba(17, 17, 17, 0.6)",
            }}
            {...props}
          >
            <style>{`
              .footnotes > h2 { display: none; }
              .footnotes > .mdx-h2-wrapper { display: none !important; }
              .footnotes ol { padding-left: 1.25rem !important; list-style-type: decimal !important; margin-bottom: 0 !important; }
              .footnotes li { font-size: 14px !important; font-weight: 480 !important; letter-spacing: -0.03em !important; line-height: 20px !important; color: rgba(17,17,17,0.4) !important; margin-bottom: 0.5rem !important; }
              .footnotes li p { font-size: 14px !important; font-weight: 480 !important; letter-spacing: -0.03em !important; line-height: 20px !important; color: rgba(17,17,17,0.4) !important; margin-bottom: 0.25rem !important; }
              a[id^="user-content-fnref"] { scroll-margin-top: 5rem; }
            `}</style>
            {children}
          </section>
        );
      }
      return (
        <section className={className} {...props}>
          {children}
        </section>
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
          color,
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
          color: "rgba(17, 17, 17, 0.4)",
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
          borderTopWidth: "var(--dashed-border-width)",
          borderTopStyle: "dashed",
          borderTopColor: "var(--dashed-border-color)",
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
    pre: ({ children, ...props }) => {
      if (React.isValidElement(children)) {
        const child = children as React.ReactElement<{
          className?: string;
          children?: string;
        }>;
        if (child.props.className === "language-mermaid") {
          return <Mermaid chart={child.props.children ?? ""} />;
        }
      }
      return (
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
      );
    },
    strong: ({ children, ...props }) => (
      <strong style={{ fontWeight: 560, color: "#111" }} {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em
        style={{ fontWeight: 520, color: "rgba(17, 17, 17, 0.5)" }}
        {...props}
      >
        {children}
      </em>
    ),
    table: ({ children, ...props }) => (
      <div
        style={{
          overflowX: "auto",
          marginBottom: "2rem",
          marginTop: "2rem",
          borderRadius: 4,
          background: "rgba(17, 17, 17, 0.015)",
          border: "1px solid rgba(17, 17, 17, 0.05)",
        }}
      >
        <table
          style={{
            width: "100%",
            fontFamily: `${GeistMono.style.fontFamily}, monospace`,
            fontSize,
            fontWeight: 400,
            letterSpacing: "0",
            lineHeight: "1.2",
          }}
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead
        style={{
          borderBottom: "1px solid rgba(17, 17, 17, 0.08)",
        }}
        {...props}
      >
        {children}
      </thead>
    ),
    th: ({ children, ...props }) => (
      <th
        style={{
          padding: "0.6rem 1rem",
          textAlign: "left",
          fontSize: 14,
          fontWeight: 400,
          letterSpacing: "0.02em",
          color: "rgba(17, 17, 17, 0.5)",
          whiteSpace: "nowrap",
          borderRight: "1px solid rgba(17, 17, 17, 0.06)",
        }}
        {...props}
      >
        {children}
      </th>
    ),
    tbody: ({ children, ...props }) => (
      <tbody {...props}>
        <style>{`
          tbody tr:last-child { border-bottom: none !important; }
          th:last-child, td:last-child { border-right: none !important; }
        `}</style>
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }) => (
      <tr
        style={{
          borderBottom: "1px solid rgba(17, 17, 17, 0.04)",
        }}
        {...props}
      >
        {children}
      </tr>
    ),
    td: ({ children, ...props }) => (
      <td
        style={{
          padding: "0.5rem 1rem",
          color: "rgba(17, 17, 17, 0.85)",
          whiteSpace: "nowrap",
          borderRight: "1px solid rgba(17, 17, 17, 0.06)",
        }}
        {...props}
      >
        {children}
      </td>
    ),
    Caption: ({ children }) => (
      <p
        style={{
          fontSize,
          fontWeight: 480,
          letterSpacing,
          lineHeight,
          color: "rgba(17, 17, 17, 0.37)",
          marginBottom,
        }}
      >
        {children}
      </p>
    ),
    ...overrides,
  };
}
