"use client";

import React from "react";
import { GeistMono } from "geist/font/mono";
import MuxVideo from "@/components/mux-video";

export type SubMenuRow = {
  label: string;
  value: string;
  type?: "text" | "link" | "solo-link" | "video";
  href?: string;
};

type SubMenuProps = {
  rows: SubMenuRow[];
  onCollapse?: () => void;
};

const rowPadding = "12px 24px";

const dashedBorderTop: React.CSSProperties = {
  borderTopWidth: "var(--dashed-border-width)",
  borderTopStyle: "dashed",
  borderTopColor: "var(--dashed-border-color)",
};

const dashedSeparator: React.CSSProperties = {
  flex: 1,
  borderBottomWidth: "var(--dashed-border-width)",
  borderBottomStyle: "dashed",
  borderBottomColor: "var(--dashed-border-color)",
  alignSelf: "center",
  minWidth: 20,
};

const labelStyle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 500,
  color: "rgba(17, 17, 17, 0.38)",
  letterSpacing: "-0.02em",
  flexShrink: 0,
};

const valueStyle: React.CSSProperties = {
  fontSize: "1rem",
  fontWeight: 440,
  color: "rgba(17, 17, 17, 1.0)",
  letterSpacing: "0",
  flexShrink: 0,
  textAlign: "right",
};

function ChevronUp() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

function TextRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: rowPadding,
        ...dashedBorderTop,
      }}
    >
      <span style={labelStyle}>{label}</span>
      <span style={dashedSeparator} />
      <span className={GeistMono.className} style={valueStyle}>
        {value}
      </span>
    </div>
  );
}

function LinkRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: rowPadding,
        ...dashedBorderTop,
      }}
    >
      <span style={labelStyle}>{label}</span>
      <span style={dashedSeparator} />
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={GeistMono.className}
        style={{
          ...valueStyle,
          textDecoration: "underline",
          textDecorationColor: "rgba(17, 17, 17, 0.2)",
          textUnderlineOffset: "3px",
          transition: "color 0.15s ease, text-decoration-color 0.15s ease",
          cursor: "pointer",
        }}
      >
        {value}
      </a>
    </div>
  );
}

function SoloLinkRow({ value, href }: { value: string; href: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: rowPadding,
        ...dashedBorderTop,
      }}
    >
      <a
        href={href}
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
          e.currentTarget.style.textDecorationColor = "rgba(17, 17, 17, 0.15)";
          e.currentTarget.style.textUnderlineOffset = "3px";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "rgba(17, 17, 17, 0.35)";
          e.currentTarget.style.textDecoration = "none";
        }}
      >
        {value}
      </a>
    </div>
  );
}

function VideoRow({ label, videoId }: { label: string; videoId: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        padding: rowPadding,
        ...dashedBorderTop,
      }}
    >
      <span style={labelStyle}>{label}</span>
      <MuxVideo playbackId={videoId} title={label} />
    </div>
  );
}

function CollapseRow({ onCollapse }: { onCollapse: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: rowPadding,
        ...dashedBorderTop,
      }}
    >
      <button
        onClick={onCollapse}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
          padding: "5px 12px 5px 10px",
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          color: "rgba(17, 17, 17, 0.4)",
          background: "rgba(17, 17, 17, 0.03)",
          border: "1px solid rgba(17, 17, 17, 0.06)",
          borderRadius: 6,
          cursor: "pointer",
          transition: "background 0.15s ease, color 0.15s ease",
          lineHeight: 1,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(17, 17, 17, 0.06)";
          e.currentTarget.style.color = "rgba(17, 17, 17, 0.7)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(17, 17, 17, 0.03)";
          e.currentTarget.style.color = "rgba(17, 17, 17, 0.4)";
        }}
      >
        <ChevronUp />
        collapse
      </button>
    </div>
  );
}

export default function SubMenu({ rows, onCollapse }: SubMenuProps) {
  return (
    <div
      style={{
        borderBottomWidth: "var(--dashed-border-width)",
        borderBottomStyle: "dashed",
        borderBottomColor: "var(--dashed-border-color)",
        paddingBottom: 12,
      }}
    >
      {rows.map((row, i) => {
        if (row.type === "video") {
          return <VideoRow key={i} label={row.label} videoId={row.value} />;
        }
        if (row.type === "solo-link" && row.href) {
          return <SoloLinkRow key={i} value={row.value} href={row.href} />;
        }
        if (row.type === "link" && row.href) {
          return (
            <LinkRow
              key={i}
              label={row.label}
              value={row.value}
              href={row.href}
            />
          );
        }
        return <TextRow key={i} label={row.label} value={row.value} />;
      })}
      {onCollapse && <CollapseRow onCollapse={onCollapse} />}
    </div>
  );
}
