import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getVillagerById } from "@/lib/firestore";
import { getOnchainVillager, formatCap, formatJoinedAt } from "@/lib/village";
import { getAddressUrl } from "@/lib/utils";
import MetadataText from "@/components/metadata-text";
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

function VillagerSkeleton() {
  return (
    <>
      {/* Profile Pic skeleton */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: "8px",
            background: "rgba(17, 17, 17, 0.04)",
          }}
        />
      </div>

      {/* Name skeleton */}
      <div
        style={{
          width: 120,
          height: 20,
          borderRadius: 4,
          background: "rgba(17, 17, 17, 0.04)",
          marginBottom: "0.5rem",
        }}
      />

      {/* Metadata skeleton */}
      <div
        style={{
          width: 100,
          height: 14,
          borderRadius: 4,
          background: "rgba(17, 17, 17, 0.04)",
          marginBottom: "0.35rem",
        }}
      />
      <div
        style={{
          width: 160,
          height: 14,
          borderRadius: 4,
          background: "rgba(17, 17, 17, 0.04)",
          marginBottom: "0.35rem",
        }}
      />
      <div
        style={{
          width: 260,
          height: 14,
          borderRadius: 4,
          background: "rgba(17, 17, 17, 0.04)",
          marginBottom: "0.35rem",
        }}
      />
      <div
        style={{
          width: 80,
          height: 14,
          borderRadius: 4,
          background: "rgba(17, 17, 17, 0.04)",
        }}
      />
    </>
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

  return (
    <>
      {/* Profile Pic */}
      <div style={{ marginBottom: "1.5rem" }}>
        {villager.profilePicSrc ? (
          <Image
            src={villager.profilePicSrc}
            alt={villager.displayName}
            width={96}
            height={96}
            style={{ borderRadius: "8px", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: "8px",
              background: "#e4e4e7",
            }}
          />
        )}
      </div>

      {/* Name */}
      <h1
        style={{
          fontSize: "1.125rem",
          fontWeight: 460,
          letterSpacing: "-0.03em",
          color: "#111",
          marginBottom: "0.25rem",
        }}
      >
        {villager.displayName}
      </h1>

      {/* Metadata */}
      <MetadataText as="div">
        <p>#{villager.id}</p>
        <p>joined_at:{formatJoinedAt(onchain.joinedAt)}</p>
        <p>
          address:
          <a
            href={getAddressUrl(villager.walletAddress)}
            target="_blank"
            rel="noopener noreferrer"
            className="meta-address"
          >
            {villager.walletAddress}
          </a>
        </p>
        <p>equity:0.0/{formatCap(onchain.cap)}</p>
      </MetadataText>
    </>
  );
}

export default async function VillagerPage({ params }: { params: Params }) {
  const { user_id } = await params;

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
        <Suspense fallback={<VillagerSkeleton />}>
          <VillagerContent userId={user_id} />
        </Suspense>
      </div>
    </div>
  );
}
