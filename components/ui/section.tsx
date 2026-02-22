import React from "react";

type SectionProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export default function Section({ children, style }: SectionProps) {
  return (
    <section
      className="section"
      style={{
        paddingTop: 64,
        ...style,
      }}
    >
      {children}
    </section>
  );
}
