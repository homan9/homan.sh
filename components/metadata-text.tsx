import { GeistMono } from "geist/font/mono";

type MetadataTextProps = {
  children: React.ReactNode;
  as?: "span" | "p" | "div";
  className?: string;
  style?: React.CSSProperties;
};

const baseStyle: React.CSSProperties = {
  fontSize: "1rem",
  fontWeight: 380,
  letterSpacing: 0,
  color: "rgba(17, 17, 17, 0.45)",
  lineHeight: 1.3,
};

export default function MetadataText({
  children,
  as: Tag = "span",
  className,
  style,
}: MetadataTextProps) {
  return (
    <Tag
      className={`${GeistMono.className}${className ? ` ${className}` : ""}`}
      style={{ ...baseStyle, ...style }}
    >
      {children}
    </Tag>
  );
}
