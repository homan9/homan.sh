"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

let initialized = false;

function ensureInit() {
  if (initialized) return;
  mermaid.initialize({
    startOnLoad: false,
    theme: "neutral",
    fontFamily: "sans-serif",
    securityLevel: "loose",
    themeVariables: {
      fontSize: "14px",
    },
  });
  initialized = true;
}

let counter = 0;

export default function Mermaid({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ensureInit();

    const id = `mermaid-${counter++}`;

    let cancelled = false;

    mermaid
      .render(id, chart.trim())
      .then(({ svg }) => {
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to render diagram");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error) {
    return (
      <pre
        style={{
          fontSize: 14,
          color: "rgba(17, 17, 17, 0.4)",
          fontWeight: 450,
          letterSpacing: "-0.025em",
        }}
      >
        {error}
      </pre>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        margin: "2rem 0",
        display: "flex",
        justifyContent: "center",
        overflow: "auto",
      }}
    />
  );
}
