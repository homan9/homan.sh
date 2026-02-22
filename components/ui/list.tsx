import React from "react";

type ListProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export default function List({ children, style }: ListProps) {
  return (
    <ul className="list-group" style={style}>
      {children}
    </ul>
  );
}
