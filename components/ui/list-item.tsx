import React from "react";
import Link from "next/link";

type BaseListItemProps = {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  passive?: boolean;
  onClick?: () => void;
  expandedContent?: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * Base list item used across all lists in the design system.
 *
 * - Applies a dashed border-top to visually separate rows.
 * - Uses the `.list-group-item` class so that when any sibling
 *   in the parent `<List>` is hovered, all *other* items dim
 *   and only the hovered item stays fully visible (spotlight effect).
 *
 * Wrap your custom row content as `children`. If you pass `href`,
 * the entire item becomes a link. Pass `external` for links that
 * should open in a new tab. Pass `onClick` for interactive items
 * that expand in-place rather than navigating.
 *
 * Use `expandedContent` to render additional content (e.g. a SubMenu)
 * below the main row but within the same `<li>` element.
 */
export default function BaseListItem({
  children,
  href,
  external = false,
  passive = false,
  onClick,
  expandedContent,
  style,
}: BaseListItemProps) {
  const inner = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "12px 24px",
        ...style,
      }}
    >
      {children}
    </div>
  );

  const linkStyle: React.CSSProperties = {
    textDecoration: "none",
    color: "inherit",
    display: "block",
  };

  const clickableStyle: React.CSSProperties = {
    ...linkStyle,
    cursor: "pointer",
    background: "none",
    border: "none",
    width: "100%",
    font: "inherit",
    textAlign: "inherit",
    padding: 0,
  };

  let row: React.ReactNode;

  if (href) {
    row = external ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={linkStyle}
      >
        {inner}
      </a>
    ) : (
      <Link href={href} style={linkStyle}>
        {inner}
      </Link>
    );
  } else if (onClick) {
    row = (
      <button type="button" onClick={onClick} style={clickableStyle}>
        {inner}
      </button>
    );
  } else {
    row = inner;
  }

  return (
    <li className={passive ? "list-group-passive" : "list-group-item"}>
      {row}
      {expandedContent}
    </li>
  );
}
