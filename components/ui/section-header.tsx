import React from "react";

type SectionHeaderProps = {
  title: string;
  caption?: string;
};

export default function SectionHeader({ title, caption }: SectionHeaderProps) {
  return (
    <div style={{ marginBottom: 16, padding: "0 24px" }}>
      <h2
        style={{
          fontSize: 16,
          fontWeight: 500,
          color: "#111",
          letterSpacing: "-0.03em",
          lineHeight: 1.4,
          margin: 0,
        }}
      >
        {title}
      </h2>

      {caption && (
        <p
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: "rgba(17, 17, 17, 0.35)",
            letterSpacing: "-0.02em",
            lineHeight: 1.5,
            margin: 0,
            marginTop: 4,
          }}
        >
          {caption}
        </p>
      )}
    </div>
  );
}
