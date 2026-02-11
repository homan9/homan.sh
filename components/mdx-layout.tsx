import React from "react";
import { GeistMono } from "geist/font/mono";
import MetadataText from "@/components/metadata-text";

type MdxLayoutProps = {
  title?: string;
  date?: string;
  children: React.ReactNode;
};

export default function MdxLayout({ title, date, children }: MdxLayoutProps) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        background: "#fff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 550,
          padding: "9rem 1.5rem 6rem",
        }}
      >
        {title && (
          <h1
            className={GeistMono.className}
            style={{
              fontSize: "4rem",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              color: "#111",
              lineHeight: 1.1,
              marginBottom: date ? "0.5rem" : "2rem",
              textAlign: "center",
            }}
          >
            {title}
          </h1>
        )}
        {date && (
          <MetadataText
            as="p"
            style={{ marginBottom: "2rem", textAlign: "center" }}
          >
            {date}
          </MetadataText>
        )}
        <article>{children}</article>
      </div>
    </div>
  );
}
