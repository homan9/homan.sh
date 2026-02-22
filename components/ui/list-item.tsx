import React from "react";
import Link from "next/link";

type BaseListItemProps = {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  passive?: boolean;
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
 * should open in a new tab.
 */
export default function BaseListItem({
  children,
  href,
  external = false,
  passive = false,
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

  return (
    <li className={passive ? "list-group-passive" : "list-group-item"}>
      {href ? (
        external ? (
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
        )
      ) : (
        inner
      )}
    </li>
  );
}
