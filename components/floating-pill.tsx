"use client";

import Link from "next/link";

type FloatingPillProps = {
  label: string;
  href: string;
};

export default function FloatingPill({ label, href }: FloatingPillProps) {
  return (
    <Link
      href={href}
      style={{
        position: "fixed",
        top: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.5rem 1.5rem",
        fontSize: "1.125rem",
        fontWeight: 500,
        letterSpacing: "-0.04em",
        color: "#111",
        background: "rgb(247, 247, 245)",
        borderRadius: 999,
        textDecoration: "none",
        transition: "background 0.15s ease",
        boxShadow:
          "0 0 4px rgba(0,0,0,0.03), 0 0 16px rgba(0,0,0,0.04), 0 0 40px rgba(0,0,0,0.03)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgb(242, 242, 240)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgb(247, 247, 245)";
      }}
    >
      {label}
    </Link>
  );
}
