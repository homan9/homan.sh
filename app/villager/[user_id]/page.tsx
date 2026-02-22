import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GeistMono } from "geist/font/mono";
import { getVillagerById } from "@/lib/firestore";
import { getOnchainVillager, formatCap, formatJoinedAt } from "@/lib/village";
import { getAddressUrl } from "@/lib/utils";
import SubMenu, { type SubMenuRow } from "@/components/ui/sub-menu";
import type { Metadata } from "next";

type Params = Promise<{ user_id: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { user_id } = await params;
  return { title: `villager #${user_id}` };
}

const avatarSize = 36;

function VillagerSkeleton() {
  return (
    <div>
      {/* Header skeleton */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "12px 24px",
          borderBottomWidth: "var(--dashed-border-width)",
          borderBottomStyle: "dashed",
          borderBottomColor: "var(--dashed-border-color)",
        }}
      >
        <div
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius: "50%",
            background: "rgba(17, 17, 17, 0.04)",
            flexShrink: 0,
          }}
        />
        <div
          style={{
            width: 120,
            height: 16,
            borderRadius: 4,
            background: "rgba(17, 17, 17, 0.04)",
          }}
        />
      </div>

      {/* Row skeletons */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "12px 24px",
            borderBottomWidth: "var(--dashed-border-width)",
            borderBottomStyle: "dashed",
            borderBottomColor: "var(--dashed-border-color)",
          }}
        >
          <div
            style={{
              width: 70 + i * 10,
              height: 14,
              borderRadius: 4,
              background: "rgba(17, 17, 17, 0.04)",
            }}
          />
          <span
            style={{
              flex: 1,
              borderBottomWidth: "var(--dashed-border-width)",
              borderBottomStyle: "dashed",
              borderBottomColor: "var(--dashed-border-color)",
              alignSelf: "center",
              minWidth: 20,
            }}
          />
          <div
            style={{
              width: 60 + i * 15,
              height: 14,
              borderRadius: 4,
              background: "rgba(17, 17, 17, 0.04)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

async function VillagerContent({ userId }: { userId: string }) {
  const [villager, onchain] = await Promise.all([
    getVillagerById(userId),
    getOnchainVillager(Number(userId)),
  ]);

  if (!villager) {
    notFound();
  }

  const rows: SubMenuRow[] = [
    {
      label: "",
      value: villager.walletAddress,
      type: "solo-link",
      href: getAddressUrl(villager.walletAddress),
    },
    { label: "Villager", value: `#${villager.id}` },
    { label: "Cap", value: formatCap(onchain.cap) },
    { label: "Joined on", value: formatJoinedAt(onchain.joinedAt) },
  ];

  if (villager.videoID) {
    rows.push({
      label: `${villager.displayName} <> homan`,
      value: villager.videoID,
      type: "video",
    });
  }

  return (
    <div>
      {/* Header row: avatar + name + equity */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "12px 24px",
        }}
      >
        {villager.profilePicSrc ? (
          <Image
            src={villager.profilePicSrc}
            alt={villager.displayName}
            width={avatarSize}
            height={avatarSize}
            style={{ borderRadius: "50%", flexShrink: 0 }}
          />
        ) : (
          <div
            style={{
              width: avatarSize,
              height: avatarSize,
              borderRadius: "50%",
              background: "#e4e4e7",
              flexShrink: 0,
            }}
          />
        )}

        <span
          style={{
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: "-0.03em",
            color: "#111",
            flexShrink: 0,
          }}
        >
          {villager.displayName}
        </span>

        {/* Dashed separator */}
        <span
          style={{
            flex: 1,
            borderBottomWidth: "var(--dashed-border-width)",
            borderBottomStyle: "dashed",
            borderBottomColor: "var(--dashed-border-color)",
            alignSelf: "center",
            minWidth: 20,
          }}
        />

        <span
          className={GeistMono.className}
          style={{
            fontSize: "1rem",
            fontWeight: 440,
            color: "#111",
            letterSpacing: "0",
            flexShrink: 0,
          }}
        >
          0%
        </span>
      </div>

      {/* Detail rows */}
      <SubMenu rows={rows} />
    </div>
  );
}

export default async function VillagerPage({ params }: { params: Params }) {
  const { user_id } = await params;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#fff",
      }}
    >
      <div
        className="page-container"
        style={{
          width: "100%",
          maxWidth: 500,
        }}
      >
        <Suspense fallback={<VillagerSkeleton />}>
          <VillagerContent userId={user_id} />
        </Suspense>
      </div>
    </div>
  );
}
