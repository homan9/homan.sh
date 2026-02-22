import { Suspense } from "react";
import MuxVideo from "@/components/mux-video";
import Section from "@/components/ui/section";
import SectionHeader from "@/components/ui/section-header";
import VillagerList from "@/components/villager-list";
import InvitationList from "@/components/invitation-list";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "homan's token",
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
        }}
      >
        {/* Hero Video */}
        <MuxVideo
          playbackId="ZMuRudvD1mCpVRlcVtuvgMTUY9hDg00977IxmWxLr28Y"
          title="homan"
        />

        {/* Village Section */}
        <Section>
          <SectionHeader
            title="Village"
            caption="can freely trade shares of my token amongst themselves."
          />
          <Suspense fallback={<ListPlaceholder rows={4} />}>
            <VillagerList />
          </Suspense>
        </Section>

        {/* Pending Invitations Section */}
        <Section>
          <SectionHeader
            title="Pending invitations"
            caption="i'd be honored to have these people join the village."
          />
          <Suspense fallback={<ListPlaceholder rows={5} />}>
            <InvitationList />
          </Suspense>
        </Section>
      </div>
    </div>
  );
}
