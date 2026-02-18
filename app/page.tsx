import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { GeistMono } from "geist/font/mono";
import MuxVideo from "@/components/mux-video";
import FloatingPill from "@/components/floating-pill";
import OnchainView from "@/components/onchain-view";
import VillagerList from "@/components/villager-list";
import { getInvitations } from "@/lib/firestore";
import type { Metadata } from "next";

const VILLAGE_ADDRESS = "0xA2C7d149fD50A277313F2349A558fdD59FCC6bCA";
const avatarSize = 36;

export const metadata: Metadata = {
  title: "homan's token",
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  padding: "0.5rem 1.5rem",
  margin: "0 -1.5rem",
  width: "calc(100% + 3rem)",
  borderRadius: 6,
  transition: "background 0.15s ease",
  textDecoration: "none",
  color: "inherit",
};

const nameStyle: React.CSSProperties = {
  fontSize: "1.125rem",
  fontWeight: 500,
  letterSpacing: "-0.04em",
  color: "#111",
};

const pendingBadge: React.CSSProperties = {
  fontSize: "1rem",
  fontWeight: 500,
  color: "rgba(17, 17, 17, 0.65)",
  marginLeft: "auto",
  background: "rgba(17, 17, 17, 0.06)",
  borderRadius: 4,
  padding: "0.15rem 0.5rem",
};

async function Invitations() {
  const invitations = await getInvitations();

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {invitations.map((invitation) => (
        <li key={invitation.id}>
          <Link
            href={`/invitation/${invitation.id}`}
            style={{ ...rowStyle, opacity: 0.5 }}
            className="villager-row"
          >
            {invitation.profilePicSrc ? (
              <Image
                src={invitation.profilePicSrc}
                alt={invitation.displayName}
                width={avatarSize}
                height={avatarSize}
                style={{
                  borderRadius: "50%",
                  filter: "grayscale(1) contrast(1.1)",
                }}
              />
            ) : (
              <div
                style={{
                  width: avatarSize,
                  height: avatarSize,
                  borderRadius: "50%",
                  background: "#e4e4e7",
                }}
              />
            )}
            <span style={nameStyle}>{invitation.displayName}</span>
            <span style={pendingBadge}>invited</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ListPlaceholder() {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {[1, 2, 3].map((i) => (
        <li
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.5rem 1.25rem",
            margin: "0 -1.25rem",
            width: "calc(100% + 2.5rem)",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(17, 17, 17, 0.04)",
            }}
          />
          <div
            style={{
              width: 100 + i * 20,
              height: 16,
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
      <FloatingPill label="about" href="/about" />
      {/* Hero Video */}
      <div
        style={{
          width: "100%",
          maxWidth: 800,
          padding: "9rem 1.5rem 3rem",
        }}
      >
        <MuxVideo
          playbackId="ZMuRudvD1mCpVRlcVtuvgMTUY9hDg00977IxmWxLr28Y"
          title="homan"
        />
      </div>

      <p
        className={GeistMono.className}
        style={{
          fontSize: "1rem",
          fontWeight: 400,
          color: "rgba(17, 17, 17, 0.4)",
          textAlign: "center",
          margin: "0 0 2rem",
        }}
      >
        0 outstanding shares
      </p>

      <div
        style={{
          width: "100%",
          maxWidth: 550,
          padding: "0 1.5rem 6rem",
        }}
      >
        <OnchainView contractAddress={VILLAGE_ADDRESS}>
          <Suspense fallback={<ListPlaceholder />}>
            <VillagerList />
          </Suspense>
        </OnchainView>

        {/* Invitations (not yet in the village) */}
        <div style={{ marginTop: "1rem", padding: "0 1.5rem" }}>
          <Suspense fallback={<ListPlaceholder />}>
            <Invitations />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
