import { Suspense } from "react";

import MuxVideo from "@/components/mux-video";
import ProfileHeader from "@/components/profile-header";
import Section from "@/components/ui/section";
import SectionHeader from "@/components/ui/section-header";
import VillagerList from "@/components/villager-list";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "homan",
};

function ListPlaceholder({ rows = 3 }: { rows?: number }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {Array.from({ length: rows }).map((_, i) => (
        <li
          key={i}
          className="list-group-item"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "10px 24px",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "rgba(17, 17, 17, 0.04)",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              width: 80 + i * 24,
              height: 14,
              borderRadius: 4,
              background: "rgba(17, 17, 17, 0.04)",
            }}
          />
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
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
      {/* Page container with dashed side borders */}
      <div
        className="page-container"
        style={{
          width: "100%",
          maxWidth: 500,
          paddingBottom: 64,
        }}
      >
        {/* Profile Header */}
        <ProfileHeader />

        {/* Hero Video */}
        <MuxVideo
          playbackId="sRSav025sTwnTudTDIV4H005vB8edzrJ6YslyHFWbfehY"
          title="homan"
          thumbnailTime={0}
        />

        {/* Village Section */}
        <Section id="village">
          <SectionHeader
            title="Village"
            caption="a curated group who can buy and trade shares of me amongst themselves."
          />
          <Suspense fallback={<ListPlaceholder rows={4} />}>
            <VillagerList />
          </Suspense>
        </Section>
      </div>
    </div>
  );
}
