import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getMdxSource } from "@/lib/mdx";
import { getMDXComponents } from "@/components/mdx-components";
import { getAddressUrl } from "@/lib/utils";
import MetadataText from "@/components/metadata-text";
import type { Metadata } from "next";
import type { TokenOwner } from "@/lib/types";

const components = getMDXComponents();

export const metadata: Metadata = {
  title: "#0: homan",
};

export default async function HomanVillagerPage() {
  const { frontmatter, content } = await getMdxSource("homan.mdx");
  const token = frontmatter as unknown as TokenOwner;

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
          maxWidth: 550,
          padding: "9rem 1.5rem 6rem",
        }}
      >
        {/* Profile Pic */}
        <div style={{ marginBottom: "1.5rem" }}>
          <Image
            src="/homan.png"
            alt="homan"
            width={96}
            height={96}
            style={{ borderRadius: "8px", objectFit: "cover" }}
          />
        </div>

        {/* Token Name + Address */}
        <h1
          style={{
            fontSize: "1.125rem",
            fontWeight: 460,
            letterSpacing: "-0.03em",
            color: "#111",
            marginBottom: "0.25rem",
          }}
        >
          {token.name}
        </h1>

        <MetadataText as="p">
          <a
            href={getAddressUrl(token.personalTokenAddress)}
            target="_blank"
            rel="noopener noreferrer"
            className="meta-address"
          >
            {token.personalTokenAddress}
          </a>
        </MetadataText>

        {/* Metadata */}
        <MetadataText as="div" style={{ marginBottom: "1.5rem" }}>
          <p>legal_name : {token.legalName}</p>
          <p>outstanding_shares : {token.outstandingShares}</p>
        </MetadataText>

        {/* Bio from MDX */}
        <div
          style={{
            fontSize: "1.125rem",
            fontWeight: 420,
            lineHeight: "1.5rem",
            letterSpacing: "-0.03em",
            color: "#111",
          }}
        >
          <MDXRemote source={content} components={components} />
        </div>
      </div>
    </div>
  );
}
