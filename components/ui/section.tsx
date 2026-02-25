import React from "react";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export default function Section({ id, children, style }: SectionProps) {
  return (
    <section
      id={id}
      className="section"
      style={{
        paddingTop: 64,
        ...(id ? { scrollMarginTop: "3rem" } : {}),
        ...style,
      }}
    >
      {children}
    </section>
  );
}
