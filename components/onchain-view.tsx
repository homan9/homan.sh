"use client";

import React from "react";
import { GeistMono } from "geist/font/mono";

type OnchainViewProps = {
  contractAddress: string;
  children: React.ReactNode;
};

export default function OnchainView({
  contractAddress,
  children,
}: OnchainViewProps) {
  const basescanUrl = `https://basescan.org/address/${contractAddress}`;

  return (
    <div
      style={{
        borderWidth: "var(--dashed-border-width)",
        borderStyle: "var(--dashed-border-style)",
        borderColor: "var(--dashed-border-color)",
        borderRadius: 0,
        padding: "1.25rem 1.5rem",
        marginBottom: "1.2rem",
      }}
    >
      {children}
      <div
        style={{
          marginTop: "1rem",
          paddingTop: "0.75rem",
          borderTopWidth: "var(--dashed-border-width)",
          borderTopStyle: "var(--dashed-border-style)",
          borderTopColor: "var(--dashed-border-color)",
        }}
      >
        <a
          href={basescanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={GeistMono.className}
          style={{
            fontSize: 13,
            fontWeight: 400,
            color: "rgba(17, 17, 17, 0.35)",
            textDecoration: "none",
            letterSpacing: "0",
            transition: "color 0.15s ease",
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "rgba(17, 17, 17, 0.6)";
            e.currentTarget.style.textDecoration = "underline";
            e.currentTarget.style.textDecorationColor =
              "rgba(17, 17, 17, 0.15)";
            e.currentTarget.style.textUnderlineOffset = "3px";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(17, 17, 17, 0.35)";
            e.currentTarget.style.textDecoration = "none";
          }}
        >
          {contractAddress}
        </a>
      </div>
    </div>
  );
}
