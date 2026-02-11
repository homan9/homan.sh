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
        minHeight: "100vh",
        justifyContent: "center",
        background: "#fff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 598,
          padding: "9rem 1.5rem 6rem",
        }}
      >
        <article>{children}</article>
      </div>
    </div>
  );
}
