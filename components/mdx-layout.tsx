import React from "react";
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
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        background: "#fff",
      }}
    >
      <div
        className="page-container"
        style={{
          width: "100%",
          maxWidth: 550,
        }}
      >
        <div className="essay-article">
          {title && (
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                letterSpacing: "-0.04em",
                color: "#111",
                lineHeight: 1.2,
                marginBottom: date ? "0.5rem" : "2rem",
                textAlign: "left",
              }}
            >
              {title}
            </h1>
          )}
          {date && (
            <MetadataText
              as="p"
              style={{ marginBottom: "2rem", textAlign: "left" }}
            >
              {date}
            </MetadataText>
          )}
          <article>{children}</article>
        </div>
      </div>
    </div>
  );
}
