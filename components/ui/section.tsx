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
        paddingTop: 48,
        paddingBottom: 48,
        ...style,
      }}
    >
      {children}
    </section>
  );
}
