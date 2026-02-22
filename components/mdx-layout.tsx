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
        }}
      >
        <div className="essay-article">
          <article>{children}</article>
        </div>
      </div>
    </div>
  );
}
