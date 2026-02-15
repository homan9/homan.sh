import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getMdxSource } from "@/lib/mdx";
import PersonalTokenScene from "@/visualizations/personal-token/PersonalTokenScene";
import AboutLink from "@/components/about-link";
import type { Metadata } from "next";
import type { MDXComponents } from "mdx/types";

export const metadata: Metadata = {
  title: "about",
};

const fontSize = "1rem";
const fontWeight = 450;
const letterSpacing = "-0.025em";
const lineHeight = "1.3rem";
const color = "rgba(17, 17, 17, 0.43)";

function getAboutComponents(): MDXComponents {
  return {
    p: ({ children }) => {
      const arr = React.Children.toArray(children);
      const isSoloLink =
        arr.length === 1 &&
        React.isValidElement(arr[0]) &&
        (arr[0] as React.ReactElement<{ href?: string }>).props.href != null;

      if (isSoloLink) return <>{children}</>;

      return (
        <p style={{ fontSize, fontWeight, letterSpacing, lineHeight, color }}>
          {children}
        </p>
      );
    },
    a: ({ href, children }) => {
      return <AboutLink href={href ?? "#"}>{children}</AboutLink>;
    },
    hr: () => (
      <hr
        style={{
          border: "none",
          borderTop: "1px solid rgba(0, 0, 0, 0.08)",
          margin: "2rem 0",
        }}
      />
    ),
  };
}

const components = getAboutComponents();

export default async function AboutPage() {
  const { content } = await getMdxSource("about.mdx");

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
        style={{
          width: "100%",
          maxWidth: 450,
          padding: "6rem 1.5rem 6rem",
        }}
      >
        <PersonalTokenScene fill />

        <div style={{ marginTop: "2rem" }}>
          <MDXRemote source={content} components={components} />
        </div>
      </div>
    </div>
  );
}
