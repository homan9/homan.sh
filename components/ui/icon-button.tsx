import React from "react";
import Link from "next/link";

type IconButtonProps = {
  href?: string;
  external?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
  style?: React.CSSProperties;
};

export default function IconButton({
  href,
  external = false,
  onClick,
  children,
  ariaLabel,
  style,
}: IconButtonProps) {
  const sharedStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    borderRadius: "50%",
    border: "none",
    background: "transparent",
    color: "rgba(17, 17, 17, 0.5)",
    cursor: "pointer",
    transition: "background 0.15s ease, color 0.15s ease",
    flexShrink: 0,
    ...style,
  };

  const hoverHandlers = {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.background = "rgba(17, 17, 17, 0.06)";
      e.currentTarget.style.color = "rgba(17, 17, 17, 1)";
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.color = "rgba(17, 17, 17, 0.5)";
    },
  };

  if (href) {
    const linkProps = external
      ? { target: "_blank" as const, rel: "noopener noreferrer" }
      : {};

    const Wrapper = external ? "a" : Link;

    return (
      <Wrapper
        href={href}
        aria-label={ariaLabel}
        style={sharedStyle}
        {...hoverHandlers}
        {...linkProps}
      >
        {children}
      </Wrapper>
    );
  }

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      style={sharedStyle}
      {...hoverHandlers}
    >
      {children}
    </button>
  );
}
