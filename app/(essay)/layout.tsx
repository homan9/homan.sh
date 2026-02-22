import React from "react";

export default function EssayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <article className="essay-article">{children}</article>
      </div>
    </div>
  );
}
